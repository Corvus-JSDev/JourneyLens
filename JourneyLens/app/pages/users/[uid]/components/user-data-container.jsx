import { Bentham } from "next/font/google";
import style from "./style.module.css";
import heartIcon from "@icons/heart.png";
import CreatePostModal from "./modal/createNewPost/CreateNewPost.jsx";

function UserProfileData(props) {
	return (
		<div>
			{/* Misc info*/}
			<div className={style.user_miscInfo_Container}>
				{/* <div className="flex gap-2 items-center">
					<img
						src={heartIcon.src}
						width={15}
						style={{ filter: "invert(100%)" }}
					/>
					<p>{props.totalAmountOfLikes || 0}</p>
				</div> */}

				<div className="flex flex-col items-start mb-5">
					{/* <p>Posts: {props.numberOfPosts || 0}</p> */}
					<p>{props.joinDate}</p>
				</div>
			</div>

			{/* Profile Picture */}
			<div className={style.user_pfpContainer}>
				<img src={props.profilePicture} />
			</div>

			{/* User's name */}
			<div className={style.user_name}>
				<h1>{props.userName}</h1>
				{props.displayFullName && <p>{props.fullName}</p>}
			</div>

			{/* Bio */}
			<div className="mb-8 w-3/4">
				<p style={{ opacity: "0.7" }}>Biography:</p>
				<p style={{ maxWidth: "600px" }}>
					{props.bio ? props.bio : "This user hasn't made a bio"}
				</p>
			</div>

			{/* Add new post btn */}
			{props.userAuth && <CreatePostModal />}
		</div>
	);
}

export default UserProfileData;
