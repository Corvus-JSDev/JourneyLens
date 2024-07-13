"use client";

import Modal from "react-modal";
import style from "../../style.module.css";
import { useState } from "react";
import { AuthContent } from "@shared/context/auth-context";
const creatorID = AuthContent._currentValue.userId;

const stylesForPostModal = {
	overlay: {
		background: "rgba(0,0,0,0.6)",
		backdropFilter: "blur(5px)",
	},
	content: {
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		border: "none",
		borderRadius: "15px",
		background: "#1e232b",
		padding: "20px 25px 20px 25px",
		width: "350px",
		height: "fit-content",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		overflow: "hidden",
		boxShadow: "5px 5px 20px rgba(255, 255, 255, 0.07)",
	},
};
const styleForCloseModalBtn = {
	position: "absolute",
	zIndex: "999999",
	top: "15px",
	right: "8px",
	width: "30px",
	borderRadius: "8px",
	overflow: "hidden",
};

Modal.setAppElement(
	document.querySelector("#DeletePostModalContainer"),
);

function DeletePostModal(props) {
	// Keeps track if the Map modal is open
	const [postModal, setPostModal] = useState(false);
	function openModal() {
		setPostModal(true);
		document.querySelector("body").style.overflow = "hidden";
	}
	function closeModal() {
		setPostModal(false);
		document.querySelector("body").style.overflow = "auto";
	}

	// TODO: Connect this to the backend
	function handelDeletion() {
		console.log(`${props.target} has been deleted`);

		/* 
		{
			Authorization: "Bearer " + AuthContent.token,
		},
		*/

		closeModal();
	}

	return (
		<>
			{/* delete post btn */}
			<button
				onClick={openModal}
				className="w-full font-bold hover:text-black"
			>
				Delete
			</button>

			{/* The actual modal */}
			<Modal
				isOpen={postModal}
				onRequestClose={closeModal}
				style={stylesForPostModal}
				ariaHideApp={false}
			>
				<h1 className="font-bold">Confirm Deletion!</h1>
				<p>Are you sure you want to delete this post?</p>
				<br />

				<button
					className="w-full text-lg font-bold text-black bg-red-500 hover:bg-red-700 btn"
					onClick={handelDeletion}
				>
					Delete
				</button>
				<br />
				<button
					className="w-full text-lg font-semibold text-black btn bg-neutral-500 hover:bg-neutral-600"
					onClick={closeModal}
				>
					Cancel
				</button>
			</Modal>
		</>
	);
}

export default DeletePostModal;
