const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error.js");

module.exports = (req, res, next) => {
	let token;
	try {
		token = req.headers.authorization.split(" ")[1];

		if (!token) {
			throw new Error("Invalid token");
		}

		const decodedToken = jwt.verify(
			token,
			"superSecretPassword_Dont_Share",
		);

		req.userData = {
			userID: decodedToken.userID,
		};

		next();
	} catch (error) {
		return next(new HttpError("Auth failed", 401));
	}
};
