"use client";

import style from "./components/style.module.css";
import NavBar from "@shared/components/Nav-Bar/MainNavigation";
import UserProfileData from "./components/user-data-container.jsx";
import DisplayPosts from "./components/postDisplayList";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import getListOfUsers from "@shared/functions/getUserDataFunction.js";
import { AuthContent } from "@shared/context/auth-context";

function UserProfilePage() {
	const [userData, setUserData] = useState({});

	// Find the Id of the current profile by grabbing the last segment of the url
	const segments = usePathname().split("/");
	const profileUserId = segments[segments.length - 1];

	// Get that users data, name, likes, etc
	async function getData() {
		try {
			const res = await getListOfUsers();
			const users = res.FullListOfUsers;

			for (let i = 0; i < users.length; i++) {
				const currentUserIteration = users[i];

				if (profileUserId === currentUserIteration._id) {
					setUserData(currentUserIteration);
					break;
				}
			}
		} catch (error) {
			return console.error("Error fetching user data:", error);
		}
	}

	useEffect(() => {
		getData();
	}, []);

	// Authenticate the user
	const currentUserId = AuthContent._currentValue.userId;

	let isUserAuthenticated = false;
	if (currentUserId === profileUserId) {
		isUserAuthenticated = true;
	}

	return (
		<>
			<link
				href="https://api.mapbox.com/mapbox-gl-js/v1.10.1/mapbox-gl.css"
				rel="stylesheet"
			/>
			<NavBar />
			<div id="MapModalContainer"></div>
			<div id="EditPostModalContainer"></div>
			<div id="PostModalContainer"></div>
			<div id="DeletePostModalContainer"></div>

			<div className={style.user_profile_container}>
				<UserProfileData
					userAuth={isUserAuthenticated}
					{...userData}
				/>
				<DisplayPosts
					userAuth={isUserAuthenticated}
					item={profileUserId}
				/>
			</div>
		</>
	);
}

export default UserProfilePage;
