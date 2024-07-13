const HttpError = require("../models/http-error.js");
const express = require("express");
const app = express();
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const UserSchema = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const USER_DUMMY = require("../USER_DUMMY.js");
const DUMMY_USER = require("../USER_DUMMY.js");

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

function selectProfilePicture() {
	let randomNumber = Math.floor(Math.random() * 4) + 1;

	let color;
	switch (randomNumber) {
		case 1:
			color = "Red";
			break;

		case 2:
			color = "Blue";
			break;

		case 3:
			color = "Yellow";
			break;

		case 4:
			color = "Green";
			break;

		default:
			color = "Blue";
			break;
	}

	return `/imgs/DefaultProfilePics/${color}Default.png`;
}

//* GET a list of all users
const getListOfAllUsers = async (req, res, next) => {
	let listOfUsers;

	try {
		listOfUsers = await UserSchema.find(
			{},
			"-__v -email -password",
		);
	} catch (error) {
		const msg = `Error while getting list of users: ${error}`;
		return next(new HttpError(msg, 500));
	}

	res.status(200).json({
		FullListOfUsers: listOfUsers.map((user) => user.toObject()),
	});
};

//* Add a new user (sign up)
const userSignUp = async (req, res, next) => {
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
		userName,
		email,
		password,
		fullName,
		displayFullName,
		bio,
	} = req.body;

	let hashedPassword;
	try {
		hashedPassword = await bcrypt.hash(password, 12);
	} catch (error) {
		return next(new HttpError("Error hashing password", 500));
	}

	const createUser = new UserSchema({
		profilePicture: selectProfilePicture(),
		userName,
		email,
		password: hashedPassword,
		fullName: fullName || null,
		displayFullName,
		bio: bio || null,
		joinDate: getCurrentDate(),
		uuid: uuidv4(),
		totalAmountOfLikes: 0,
		numberOfPosts: 0,
		posts: [],
	});

	// check if the entered email is already being used
	let existingUser;
	try {
		existingUser = await UserSchema.findOne({ email: email });
	} catch (error) {
		return next(error);
	}

	if (existingUser) {
		return next(
			new HttpError(
				"422: This email is already registered with an account, please log in",
				422,
			),
		);
	}

	try {
		await createUser.save();
	} catch (error) {
		console.log(error);
		const err = new HttpError(
			"Creating a new user has failed, please try again.",
			500,
		);
		return next(err);
	}

	let token;
	try {
		token = jwt.sign(
			{
				userID: createUser.id,
				email: createUser.email,
			},
			"superSecretPassword_Dont_Share",
			{
				expiresIn: "1h",
			},
		);
	} catch (error) {
		const err = new HttpError(
			"Creating a new user has failed, please try again.",
			500,
		);
		return next(err);
	}

	res.status(201).json({
		message: "A new user has been successfully created.",
		code: 201,
		newUser: createUser,
	});

	/*
	res.status(201).json({
		message: "A new user has been successfully created",
		code: 201,
		newUser: {
			username: createUser.userName,
			email: createUser.email,
			UserID: createUser.id,
		},
	});
	*/
};

//* User Login
const userLogin = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);

		return next(
			new HttpError(
				"401 Invalid inputs passed, please check your data.",
				422,
			),
		);
	}

	const { email, password } = req.body;

	// Check if the user exists
	let existingUser;
	try {
		existingUser = await UserSchema.findOne({ email: email });
	} catch (error) {
		return next(
			new HttpError(
				"401 Log in failed, email does it exist.",
				404,
			),
		);
	}

	// Check if the password is correct
	let isPasswordValid;
	try {
		isPasswordValid = await bcrypt.compare(
			password,
			existingUser.password,
		);
	} catch (error) {
		return next(
			new HttpError("Error while comparing passwords", 500),
		);
	}

	if (!isPasswordValid) {
		return next(
			new HttpError("401 Login Failed. Invalid credentials", 401),
		);
	}

	// Generate a token
	let token;
	try {
		token = jwt.sign(
			{
				userID: existingUser.id,
				email: existingUser.email,
			},
			"superSecretPassword_Dont_Share",
			{
				expiresIn: "1h",
			},
		);
	} catch (error) {
		const err = new HttpError(
			"Logging in has failed, please try again.",
			500,
		);
		return next(err);
	}

	// Response
	res.status(200).json({
		code: 200,
		username: existingUser.userName,
		userUUID: existingUser.uuid,
		message: "Login successful!",
		token: token,
	});
};

exports.getListOfAllUsers = getListOfAllUsers;
exports.userSignUp = userSignUp;
exports.userLogin = userLogin;
