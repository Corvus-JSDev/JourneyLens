const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const { check } = require("express-validator");
const cors = require("cors");

const userControllers = require("../controllers/users-controller.js");

//* Get a list of all the users
router.get("/", userControllers.getListOfAllUsers);

//* Register a new user (sign up)
router.post(
	"/signup",
	[
		check("userName").not().isEmpty(),
		check("email").not().isEmpty(),
		check("password").not().isEmpty(),
	],
	userControllers.userSignUp,
);

//* User Log in
router.post(
	"/login",
	[
		check("email").not().isEmpty(),
		check("password").not().isEmpty(),
	],
	userControllers.userLogin,
);

module.exports = router;
