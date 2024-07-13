const HttpError = require("../models/http-error.js");
const DUMMY_PLACES = require("../POST_DUMMY.js");
const POST_DUMMY = require("../POST_DUMMY.js");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const PostSchema = require("../models/post.js");
const mongoose = require("mongoose");
const UserSchema = require("../models/user.js");

function getCurrentDate() {
	// get the date
	const dateObj = new Date();
	let month = dateObj.getUTCMonth();
	const day = dateObj.getUTCDate();
	const year = dateObj.getUTCFullYear();

	// convert monthNumber to the word
	var calenderMonths = [
		"Jan.",
		"Feb.",
		"Mar.",
		"Apr.",
		"May",
		"June",
		"July",
		"Aug.",
		"Sept.",
		"Oct.",
		"Nov.",
		"Dec.",
	];

	month = calenderMonths[month];

	const newDate = `${month}-${day}-${year}`;

	return newDate;
}

//* GET, a single post by its id
const getPostById = async (req, res, next) => {
	const postID = req.params.pid;

	let post;
	try {
		post = await PostSchema.findOne({ postUUID: postID });
	} catch (error) {
		const err = new HttpError(
			`OOPS, something went wrong: ${error}`,
			500,
		);

		return next(err);
	}

	if (!post) {
		return next(
			new HttpError(
				"Could not find a post. Invalid post ID.",
				404,
			),
		);
	}

	res.status(200).json({ post: post.toObject({ getters: true }) });
};

//* GET, all posts from a user by ID
const getAllUserPosts = async (req, res, next) => {
	const userID = req.params.uid;

	let allPosts;
	try {
		allPosts = await PostSchema.find({ creatorUUID: userID });
	} catch (error) {
		return next(
			new HttpError(
				`OOPS, error getting all users posts: ${error}`,
			),
			500,
		);
	}

	if (!allPosts || allPosts.length === 0) {
		return next(
			new HttpError(
				"Could not find users posts. Invalid user ID.",
				404,
			),
		);
	}

	res.json({
		Posts: allPosts.map((post) => {
			return post.toObject({ getters: true });
		}),
	});
};

//* POST, create a new post
const createPost = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);

		return next(
			new HttpError(
				"Invalid inputs passed, please check your data.",
				422,
			),
		);
	}

	const {
		imageFile,
		title,
		description,
		location: { countryOfOrigin, address },
		cords: { latitude, longitude },
		creatorUUID,
	} = req.body;

	const createdPost = new PostSchema({
		image: `/uploads/images/${imageFile}`,
		title,
		description,
		likes: 0,
		location: { countryOfOrigin, address },
		cords: { latitude, longitude },
		creatorUUID,
		creationDate: getCurrentDate(),
		postUUID: uuidv4(),
		hasBeenEdited: false,
	});

	let user;
	try {
		user = await UserSchema.findById(creatorUUID);
	} catch (error) {
		return next(
			new HttpError("Could not find user with provided ID.", 404),
		);
	}
	if (!user) {
		return next(new HttpError("User does not exist", 404));
	}

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();

		await createdPost.save({ session: sess });

		user.posts.push(createdPost);
		user.numberOfPosts++;
		await user.save({ session: sess });

		await sess.commitTransaction();
	} catch (error) {
		const err = new HttpError(
			`ERROR while creating the post: ${error}`,
			500,
		);

		return next(err);
	}

	res.status(201).json({
		message: "The post has been successfully created",
		post: createdPost,
	});
};

//* DELETE a post
const deletePost = async (req, res, next) => {
	const postID = req.params.pid;

	let post;
	let postMongoID;
	try {
		post = await PostSchema.findOne({
			postUUID: postID,
		}).populate("creatorUUID");
		postMongoID = post._id;
	} catch (error) {
		const err = new HttpError(
			`OOPS, theres been an error: ${error}`,
			500,
		);
		return next(err);
	}
	if (!post) {
		return next(
			new HttpError(
				"Could not find place with the provided ID.",
				404,
			),
		);
	}

	let user;
	try {
		user = await UserSchema.findById(post.creatorUUID);
	} catch (error) {
		console.log(error);
		return next(
			new HttpError("Could not find user with provided ID.", 404),
		);
	}
	if (!user) {
		console.log("user value is falsy");
		return next(
			new HttpError("Could not find user with provided ID", 404),
		);
	}

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();

		await post.deleteOne({ session: sess });

		user.posts.pull(postMongoID);
		user.numberOfPosts--;
		await user.save({ session: sess });

		await sess.commitTransaction();
	} catch (error) {
		console.log(error);

		return next(
			new HttpError(
				"There was an error deleting the post, please try again.",
				500,
			),
		);
	}

	res.status(200).json({
		message: `The post with a uuid of ${postID}, has been deleted`,
	});
};

//* Update or edit post data
const editPostData = async (req, res, next) => {
	const postID = req.params.pid;

	const {
		newTitle,
		newDescription,
		newCords: { newLatitude, newLongitude },
	} = req.body;

	let post;
	try {
		post = await PostSchema.findOne({ postUUID: postID });
	} catch (error) {
		const err = new HttpError(
			`OOPS, something went wrong: ${error}`,
			500,
		);

		return next(err);
	}

	post.title = newTitle;
	post.description = newDescription;
	post.cords = { newLatitude, newLongitude };
	post.hasBeenEdited = true;

	if (!post) {
		return next(
			new HttpError(
				"Could not find a post. Invalid post ID.",
				404,
			),
		);
	}

	try {
		await post.save();
		res.status(200).json({
			post: post.toObject({ getters: true }),
		});
	} catch (error) {
		return next(new HttpError(error, 500));
	}
};

exports.getPostById = getPostById;
exports.getAllUserPosts = getAllUserPosts;
exports.createPost = createPost;
exports.deletePost = deletePost;
exports.editPostData = editPostData;
