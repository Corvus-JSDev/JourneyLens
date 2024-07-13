const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new Schema({
	profilePicture: { type: String },
	userName: { type: String, required: true },
	fullName: { type: String },
	displayFullName: { type: Boolean },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true, minlength: 6 },
	bio: { type: String },
	joinDate: { type: String },
	totalAmountOfLikes: { type: Number },
	numberOfPosts: { type: Number },
	posts: [
		{
			type: mongoose.Types.ObjectId,
			required: true,
			ref: "Posts",
		},
	],
	uuid: { type: String, required: true },
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", UserSchema);
