"use client";

import CloseBtn from "@icons/close-btn-red-cross.png";
import Modal from "react-modal";
import style from "../../style.module.css";
import { useState } from "react";
import * as yup from "yup";
import UserInput from "@shared/components/user-input/input.jsx";
import infoIcon from "@icons/information-icon.png";
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
	document.querySelector("#EditPostModalContainer"),
);

function UpdatePost(props) {
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

	// handle the updating of the warning text
	const [validTitle, setValidTitle] = useState(true);
	const [validDesc, setValidDesc] = useState(true);

	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log(props.target);

		// what is the target location of the input and what is it's value
		const titleValue = event.target[0].value;
		const descValue = event.target[1].value;

		const titleSchema = yup
			.string()
			.matches(/^[^&\/\\#,+()$~%.'":*?<>{}]*$/)
			.max(45);
		const descSchema = yup
			.string()
			.matches(/^[^&\/\\#,+()$~%.'":*?<>{}]*$/);

		// update the values
		setValidTitle(await titleSchema.isValid(titleValue));
		setValidDesc(await descSchema.isValid(descValue));

		//* wait for all the async stuff to finish before trying to submit the form
		const [isValidTitle, isValidDesc] = await Promise.all([
			await titleSchema.isValid(titleValue),
			await descSchema.isValid(descValue),
		]);

		// TODO: add the ability to send this data to the backend
		// TODO: close the modal when the form is submitted
		// form submitting
		if (isValidTitle && isValidDesc) {
			console.log(" -- Form Submitted -- ");

			/* 
			{
				Authorization: "Bearer " + AuthContent.token,
			},
			*/

			titleValue !== ""
				? console.log("Title: " + titleValue)
				: console.log("There is no title");

			descValue !== ""
				? console.log("Desc: " + descValue)
				: console.log("There is no Desc");

			closeModal();
		} else {
			console.log(" -- Form Rejected -- ");
		}
	};

	return (
		<>
			{/* edit post btn */}
			<button
				onClick={openModal}
				className="w-full font-bold hover:text-black"
			>
				Edit
			</button>

			{/* The actual modal */}
			<Modal
				isOpen={postModal}
				onRequestClose={closeModal}
				style={stylesForPostModal}
				ariaHideApp={false}
			>
				{/* close modal btn */}
				<button
					onClick={closeModal}
					style={styleForCloseModalBtn}
					title="Close"
				>
					<img
						src={CloseBtn.src}
						alt="close modal button"
					/>
				</button>

				{/* Form */}
				<form
					action=""
					onSubmit={handleSubmit}
				>
					<h1>Edit Post</h1>

					<UserInput
						label="Title"
						id="title"
						width="300px"
						value={props.postTitle}
					/>
					{!validTitle && (
						<div className={style.errorMessageContainer}>
							<img
								src={infoIcon.src}
								style={{ width: "15px", height: "15px" }}
							/>

							<p style={{ color: "red" }}>
								The title must be alphanumeric and under 45
								characters.
							</p>
						</div>
					)}

					<UserInput
						element="textarea"
						label="Description"
						id="desc"
						width="300px"
						value={props.postDesc}
					/>
					{!validDesc && (
						<div className={style.errorMessageContainer}>
							<img
								src={infoIcon.src}
								style={{ width: "15px", height: "15px" }}
							/>

							<p style={{ color: "red" }}>
								The description must be alphanumeric.
							</p>
						</div>
					)}

					<div
						style={{
							display: "flex",
							justifyContent: "center",
						}}
					>
						<button
							className={style.submitBtn}
							type="submit"
						>
							Submit
						</button>
					</div>
				</form>
			</Modal>
		</>
	);
}

export default UpdatePost;
