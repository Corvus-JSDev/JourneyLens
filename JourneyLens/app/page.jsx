"use client";

import { useState, useEffect } from "react";
import style from "./PageStyle.module.css";
import UsersList from "@shared/components/users/components/UsersList.jsx";
import NavBar from "@shared/components/Nav-Bar/MainNavigation";
import getListOfUsers from "@shared/functions/getUserDataFunction.js";

function HomePage() {
	const [LIST_OF_USERS, setListOfUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		async function getData() {
			try {
				const users = await getListOfUsers();
				setListOfUsers(users);
				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching user data:", error);
				setError(true);
			}
		}
		getData();
	}, []);

	return (
		<>
			<NavBar />
			<div className={style.mainDiv}>
				<div
					style={{
						marginTop: "35px",
						textAlign: "center",
					}}
				>
					<h1
						style={{
							fontSize: "1.8rem",
						}}
					>
						Welcome to JourneyLens
					</h1>
					<p>
						A place to post your pictures of travels around the
						world
					</p>
				</div>

				{isLoading && (
					<div
						style={{
							marginTop: "20px",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<span className="loading loading-spinner loading-lg"></span>
					</div>
				)}

				{error ? (
					<div style={errorMessageStyle}>
						<p style={{ color: "#fc563c" }}>
							Sorry, our servers are having some difficulties.
							Please try again later.
						</p>
					</div>
				) : (
					<UsersList listOfUsers={LIST_OF_USERS} />
				)}
			</div>
		</>
	);
}

export default HomePage;
