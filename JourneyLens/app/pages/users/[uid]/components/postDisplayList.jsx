"use client";

import style from "./style.module.css";
import PostCard from "./postCardContainer.jsx";
import { useEffect, useLayoutEffect, useState } from "react";

function PostDisplayList(props) {
	const [statePosts, setPosts] = useState();

	const userID = props.item;
	// console.log("postDisplayList userID:", userID);

	async function getAllUsersPosts(uid) {
		try {
			const response = await fetch(
				`http://localhost:5000/api/posts/user/${uid}`,
			);

			const data = await response.json();
			const usersPosts = data.Posts;

			setPosts(usersPosts);
		} catch (err) {
			console.error(err);
		}
	}

	useEffect(() => {
		getAllUsersPosts(userID);
	}, []);

	let uniquePostId = 0;
	let currentIteration = 0;

	let fullListOfPosts;

	if (statePosts == undefined) {
		fullListOfPosts = "This user has not made any posts.";
	} else {
		fullListOfPosts = statePosts.map((post) => {
			uniquePostId++;
			currentIteration++;

			let mapLink = false;
			if (post.cords.latitude && post.cords.longitude) {
				mapLink = true;
			}

			return (
				<li
					key={uniquePostId}
					style={{ marginBottom: "60px" }}
				>
					<PostCard
						userAuth={props.userAuth}
						id={post.postUUID}
						image={post.image}
						title={post.title}
						description={post.description}
						location={post.location.address}
						countryOfOrigin={post.location.countryOfOrigin}
						linkToMaps={mapLink}
						creationDate={post.creationDate}
						likes={post.likes}
						hasBeenEdited={post.hasBeenEdited}
					/>
				</li>
			);
		});
	}

	return (
		<div>
			<ol>{fullListOfPosts}</ol>
		</div>
	);
}

export default PostDisplayList;
