import { createContext } from "react";

export const AuthContent = createContext({
	isUserLoggedIn: false,
	userId: "",
	token: "",

	LogIN(userID, token) {
		this.isUserLoggedIn = true;
		this.userId = userID;
		this.token = token;
	},

	LogOUT() {
		this.isUserLoggedIn = false;
		this.userId = "0";
		this.token = "none";
	},
});
