const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
	image: { type: String, required: true },
	title: { type: String, required: true },
	description: { type: String },
	likes: { type: Number, required: true },
	location: {
		countryOfOrigin: { type: String },
		address: { type: String },
	},
	cords: {
		latitude: { type: String },
		longitude: { type: String },
	},
	creationDate: { type: String, required: true },
	creatorUUID: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: "User",
	},
	postUUID: { type: String, required: true },
	hasBeenEdited: { type: Boolean },
});

module.exports = mongoose.model("Posts", postSchema);
