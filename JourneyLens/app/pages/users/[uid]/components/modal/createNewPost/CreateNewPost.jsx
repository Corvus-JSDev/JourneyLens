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
		background: "rgba(0,0,0,0.85)",
		backdropFilter: "blur(5px)",
	},
	content: {
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		border: "none",
		borderRadius: "15px",
		background: "#1e232b",
		padding: "5px",
		paddingTop: "20px",
		width: "600px",
		height: "fit-content",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		overflow: "hidden",
		boxShadow: "5px 5px 20px rgba(255, 255, 255, 0.15)",
	},
};
const styleForCloseModalBtn = {
	position: "absolute",
	zIndex: "999999",
	top: "15px",
	right: "8px",
	width: "40px",
	borderRadius: "8px",
	overflow: "hidden",
};

Modal.setAppElement(document.querySelector("#PostModalContainer"));

function CreatePostModal() {
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
	const [validCountry, setValidCountry] = useState(true);
	const [validLocation, setValidLocation] = useState(true);
	const [validImage, setValidImage] = useState(true);

	const handleSubmit = async (event) => {
		event.preventDefault();

		//* what is the target location of the input and what is it's value
		const titleValue = event.target[0].value;
		const descValue = event.target[1].value;

		const countryValue = event.target[2].value;
		const locationValue = event.target[3].value;

		const imageValue = event.target[4].value;

		const latitudeValue = event.target[5].value;
		const longitudeValue = event.target[6].value;

		//* input validation
		const titleSchema = yup
			.string()
			.matches(/^[^&\/\\#,+()$~%.'":*?<>{}]*$/)
			.max(45)
			.required();
		const countrySchema = yup
			.string()
			.matches(/^[A-Za-z ]*$/)
			.required();
		const locationSchema = yup
			.string()
			.matches(/^[A-Za-z ]*$/)
			.required();

		//* update the values
		setValidTitle(await titleSchema.isValid(titleValue));
		setValidCountry(await countrySchema.isValid(countryValue));
		setValidLocation(await locationSchema.isValid(locationValue));
		// setValidImage(await ImageSchema.isValid(imageValue));

		//* wait for all the async stuff to finish before trying to submit the form
		const [isValidTitle, isValidCountry, isValidLocation] =
			await Promise.all([
				await titleSchema.isValid(titleValue),
				await countrySchema.isValid(countryValue),
				await locationSchema.isValid(locationValue),
			]);

		// TODO: close the modal when the form is submitted
		//* form submitting
		if (isValidTitle && isValidCountry && isValidLocation) {
			const postObj = {
				title: titleValue,
				description: descValue,
				location: {
					countryOfOrigin: countryValue,
					address: locationValue,
				},
				cords: {
					latitude: latitudeValue,
					longitude: longitudeValue,
				},
				creatorUUID: creatorID,
			};

			console.log(postObj);

			try {
				const formData = new FormData();
				formData.append("image", imageValue);
				await sendRequest(
					"https:localhost:5000/api/posts",
					"POST",
					formData,
					{
						Authorization: "Bearer " + AuthContent.token,
					},
				);

				const response = await fetch(
					"http://localhost:5000/api/posts/",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							...postObj,
						}),
					},
				);

				const data = await response.json();
				console.log(data);
				console.log("post submitted");
			} catch (err) {
				console.error(err);
			}
		} else {
			console.log(" -- form failed -- ");
		}
	};

	const smallInputWidth = "47%";

	return (
		<>
			{/* create post btn */}
			<div className={style.createPostBtn}>
				<button onClick={openModal}>Create New Post</button>
			</div>

			{/* the model itself */}
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

				{/* form */}
				<form
					action=""
					style={{
						display: "flex",
						flexDirection: "column",
						padding: "5px 15px",
					}}
					onSubmit={handleSubmit}
				>
					{/* Title */}
					<UserInput
						id="title"
						label="Title"
						placeholder="i.e. My day at the beach"
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

					{/* Description */}
					<UserInput
						element="textarea"
						id="description"
						label="Description"
						placeholder="(Optional)"
					/>

					{/* Place */}
					<div
						style={{
							width: "100%",
							display: "flex",
							justifyContent: "space-between",
						}}
					>
						<div style={{ width: smallInputWidth }}>
							<UserInput
								id="country"
								label="Country"
								placeholder="i.e. Russia"
							/>
							{!validCountry && (
								<div className={style.errorMessageContainer}>
									<img
										src={infoIcon.src}
										style={{
											width: "15px",
											height: "15px",
										}}
									/>

									<p style={{ color: "red" }}>
										You must enter a country (alphabetic
										only)
									</p>
								</div>
							)}
						</div>

						<div style={{ width: smallInputWidth }}>
							<UserInput
								id="location"
								label="Location"
								placeholder="i.e. Moscow"
							/>
							{!validLocation && (
								<div className={style.errorMessageContainer}>
									<img
										src={infoIcon.src}
										style={{
											width: "15px",
											height: "15px",
										}}
									/>

									<p style={{ color: "red" }}>
										You must enter a location (alphabetic
										only)
									</p>
								</div>
							)}
						</div>
					</div>

					{/* img upload */}
					<UserInput
						type="file"
						id="image"
						accept=".jpg, .png, .jpeg"
						label="Image (png & jpeg/jpg only)"
					/>
					{!validImage && (
						<div className={style.errorMessageContainer}>
							<img
								src={infoIcon.src}
								style={{ width: "15px", height: "15px" }}
							/>

							<p style={{ color: "red" }}>
								You must upload an image
							</p>
						</div>
					)}

					{/* View in map Lon Lat */}
					<h3 style={{ marginTop: "25px", fontWeight: "600" }}>
						View in map functionality
						<span style={{ opacity: "0.7" }}> (optional)</span>
					</h3>
					<p style={{ fontSize: "0.8rem" }}>
						To allow your viewers the ability to view this place
						on a map, we just need two extra things:
					</p>

					<div
						style={{
							width: "100%",
							display: "flex",
							justifyContent: "space-between",
						}}
					>
						<UserInput
							id="latitude"
							label="Latitude"
							type="number"
							width={smallInputWidth}
						/>
						<UserInput
							id="longitude"
							label="Longitude"
							type="number"
							width={smallInputWidth}
						/>
					</div>

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

export default CreatePostModal;
