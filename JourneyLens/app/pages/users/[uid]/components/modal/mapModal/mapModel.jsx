"use client";

import React from "react";
import { useState } from "react";
import CloseBtn from "@icons/close-btn-red-cross.png";
import Modal from "react-modal";
import style from "../../style.module.css";
import locationIcon from "@icons/location-icon.png";
import ReactMapboxGl, {
	Layer,
	Feature,
	Marker,
} from "react-mapbox-gl";
//* Just an FYI, this boxMap add on isn't supported in react 18... but oh well, here we are anyways!

// binding, and setting styles for the modal
Modal.setAppElement(document.querySelector("#MapModalContainer"));
// for some reason setting a class gives an error so enjoy this style hell :)
const stylesForMapModal = {
	overlay: {
		background: "rgba(0,0,0,0.5)",
		backdropFilter: "blur(8px)",
	},
	content: {
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		border: "20px solid #1e232b",
		borderRadius: "15px",
		background: "#1e232b",
		padding: "0",
		maxWidth: "fit-content",
		minWidth: "400px",
		minHeight: "600px",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		overflow: "hidden",
		boxShadow: "5px 5px 20px rgba(255, 255, 255, 0.15)",
	},
};
const styleForCloseModalBtn = {
	width: "40px",
	borderRadius: "8px",
	overflow: "hidden",
	position: "relative",
	top: "5px",
};

// map access token and options
const Map = ReactMapboxGl({
	container: "map", // container ID
	minZoom: 10,
	// pls dont steal my key 👍
	accessToken:
		"pk.eyJ1IjoicGhvdG9zaGFyZWFwcCIsImEiOiJjbHY4cjhuZmUwbXQ2MmlxdmxtcTVlcXVhIn0.KWkIKE6FhN2XhFKweELnyQ",
});

function MapBoxModal(props) {
	// Keeps track if the Map modal is open
	const [mapModal, setMapModal] = useState(false);
	function openModal() {
		setMapModal(true);
		document.querySelector("body").style.overflow = "hidden";
	}
	function closeModal() {
		setMapModal(false);
		document.querySelector("body").style.overflow = "auto";
	}

	return (
		<>
			<button
				style={{
					textDecoration: "underline",
					cursor: "pointer",
				}}
				onClick={openModal}
			>
				View On Map
			</button>

			<Modal
				isOpen={mapModal}
				onRequestClose={closeModal}
				style={stylesForMapModal}
			>
				{/* header */}
				<div className={style.mapModalHeader}>
					<div>
						<h1>Map Viewer</h1>

						<div className={style.location_info}>
							<img
								src={locationIcon.src}
								width={18}
								style={{ filter: "invert(100%)" }}
								alt="This is located at"
							/>
							<p>{props.location},</p>
							<p>{props.countryOfOrigin}</p>
						</div>
					</div>

					<button
						onClick={closeModal}
						style={styleForCloseModalBtn}
						title="Close Map"
					>
						<img
							src={CloseBtn.src}
							alt="close modal button"
						/>
					</button>
				</div>

				{/* Actual map */}
				<Map
					// [longitude, latitude]
					center={[14.249950910024864, 40.83942725340967]}
					style="mapbox://styles/mapbox/streets-v9"
					containerStyle={{
						height: "100%",
						width: "600px",
					}}
				>
					<Layer
						type="symbol"
						id="marker"
						layout={{ "icon-image": "marker-15" }}
					></Layer>
				</Map>

				<div
					style={{
						width: "100%",
						textDecoration: "underline",
						marginTop: "10px",
					}}
				>
					{/* google maps url format is:
					https://www.google.com/maps/place/[insert place],+[inset COG]
					*/}
					<a
						target="_blank"
						href={`https://www.google.com/maps/place/${props.location},+${props.countryOfOrigin}`}
					>
						Open In Google Maps
					</a>
				</div>
			</Modal>
		</>
	);
}

export default MapBoxModal;
