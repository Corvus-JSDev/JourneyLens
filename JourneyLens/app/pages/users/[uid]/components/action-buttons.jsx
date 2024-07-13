"use client";

import threeDotsIcon from "@icons/three-dots-menu.png";
import style from "./style.module.css";
import UpdatePost from "./modal/editPost/editPost.jsx";
import DeletePostModal from "./modal/deletePost/deletePost.jsx";

function ActionButtons(props) {
	return (
		<div className="absolute top-3 right-3 z-50 dropdown dropdown-end">
			<div
				// We can't use <button> here because Safari has a bug that prevents the button from being focused.
				tabIndex={0}
				role="button"
				className="m-1"
			>
				<img
					className={style.threeDotIcon}
					src={threeDotsIcon.src}
					alt="Open action buttons menu"
				/>
			</div>
			<ul
				tabIndex={0}
				className="dropdown-content z-[1] menu p-3 shadow bg-base-100 rounded-box w-52"
			>
				{/* EDIT Button */}
				<li className="hover:bg-sky-500 hover:rounded-lg hover:text-black">
					<UpdatePost
						target={props.target}
						postTitle={props.postTitle}
						postDesc={props.postDesc}
					/>
				</li>
				{/* DELETE Button */}
				<li className="hover:bg-red-500 hover:rounded-lg hover:text-black">
					<DeletePostModal target={props.target} />
				</li>
			</ul>
		</div>
	);
}

export default ActionButtons;
