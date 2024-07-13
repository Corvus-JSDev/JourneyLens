const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const { check } = require("express-validator");

const postControllers = require("../controllers/posts-controller.js");
const fileUpload = require("../Middleware/file-upload.js");
const checkAuth = require("../Middleware/check-auth.js");

//* Get a single post
router.get("/:pid", postControllers.getPostById);

//* Get all posts from a user
router.get("/user/:uid", postControllers.getAllUserPosts);

// token validation
router.use(checkAuth);

//* Create a new post
router.post(
	"/",
	fileUpload.single("image"),
	[
		check("title").not().isEmpty(),
		check("location.countryOfOrigin").not().isEmpty(),
		check("location.address").not().isEmpty(),
	],
	postControllers.createPost,
);

//* Delete a post
router.delete("/:pid", postControllers.deletePost);

//* Edit post data
router.patch("/:pid", postControllers.editPostData);

module.exports = router;
