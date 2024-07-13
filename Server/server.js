const restartTime = `${
	new Date().getHours() % 12
}:${new Date().getMinutes()}:${new Date().getSeconds()}`;

console.log(`\n${restartTime}\n--- STARTING SERVER ---\n`);

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoURL =
	"mongodb+srv://CorvusDev:LF7nEvHlDe1Smm8l@journeylens-cluster.whnwhvs.mongodb.net/?retryWrites=true&w=majority&appName=JourneyLens-Cluster";

const postRoutes = require("./routes/posts-routes.js");
const userRoutes = require("./routes/users-routes.js");
const HttpError = require("./models/http-error.js");

app.use(bodyParser.json());

// Fixing cors browser errors
app.use(cors());

/* 
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization",
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PATCH, DELETE",
	);
	res.setHeader("Access-Control-Allow-Credentials", "true");

	next();
});
*/

//* API point for getting posts
app.use("/api/posts", postRoutes);

//* API point for getting users
app.use("/api/users", userRoutes);

app.use((req, res, next) => {
	const error = new HttpError("Could not find this route", 404);
	throw error;
});

//* Default error handling
app.use((error, req, res, next) => {
	// forward the res error if there already is one
	if (res.headerSent) {
		return next(error);
	}

	res.status(error.code || 500).json({
		message: error.message || "An unknown error as occurred.",
	});
});

const client = new MongoClient(mongoURL, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

mongoose
	.connect(mongoURL)
	.then(() => {
		app.listen(5000);
	})
	.catch((err) => {
		console.error("ERROR while connecting to backend: " + err);
	});

// BD access password: LF7nEvHlDe1Smm8l
