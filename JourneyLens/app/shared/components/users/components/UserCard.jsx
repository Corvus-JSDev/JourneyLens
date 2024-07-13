"use client";

import style from "./style.module.css";
import Link from "next/link";
import heartIcon from "@icons/heart.png";
import Image from "next/image";

var user_id = 0;

function UserCard(props) {
	return (
		<Link href={`./pages/users/${props._id}`}>
			<div className={style.userCard}>
				{/* profile picture container */}
				<div className={style.userCard__profilePicture}>
					<img
						src={props.profilePicture}
						alt={`${props.userName}'s profile picture`}
					/>
				</div>

				{/* Info container */}
				<div className={style.userCard__infoSection}>
					{/* Header */}
					<div className={style.infoSection__header}>
						<h1 title="View Profile">{props.userName}</h1>
						<div
							title="Total amount of likes"
							className={style.header__likesContainer}
						>
							{/* 
							<img
								src={heartIcon.src}
								width={15}
								style={{ filter: "invert(100%)" }}
							/>
							<p>{props.totalAmountOfLikes}</p>
						 */}
						</div>
					</div>

					{/* Body */}
					{props.bio === null ? (
						<p>No bio available</p>
					) : props.bio.length < 130 ? (
						<p>{props.bio}</p>
					) : (
						// 130 character limit
						<p>{props.bio.substring(0, 130) + "..."}</p>
					)}

					<p>Posts: {props.numberOfPosts}</p>
				</div>
			</div>
		</Link>
	);
}

export { UserCard, user_id };
