import style from "./style.module.css";
import locationIcon from "@icons/location-icon.png";
import heartIcon from "@icons/heart.png";
import ActionButtons from "./action-buttons.jsx";
import MapBoxModal from "./modal/mapModal/mapModel.jsx";

function PostCardContainer(props) {
	return (
		<div>
			{/* img container */}
			<div className={style.post_thumbnail}>
				{/* actual img */}
				<p style={{ position: "absolute" }}>Loading...</p>
				<img
					style={{ position: "relative", zIndex: "10" }}
					src={props.image}
				/>

				{/* Action buttons */}
				{props.userAuth && (
					<ActionButtons
						target={props.id}
						postTitle={props.title}
						postDesc={props.description}
					/>
				)}
			</div>

			{/* Info Section */}
			<div className="px-2">
				{/* Location + Maps Link + Creation Date */}
				<div className="flex justify-between mb-1 w-full opacity-80">
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

					{/* Modal For the Map */}
					{props.linkToMaps && (
						<MapBoxModal
							location={props.location}
							countryOfOrigin={props.countryOfOrigin}
						/>
					)}

					<p className="font-medium">{props.creationDate}</p>
				</div>

				{/* Likes */}
				{/* 				
				<div className="flex gap-2 items-center pl-1 mb-6">
					<img
						src={heartIcon.src}
						width={15}
						style={{ filter: "invert(100%)" }}
						alt="Number of likes"
					/>
					<p>{props.likes}</p>
				</div>
				*/}

				{/* Title + Description + edited */}
				<div className="flex gap-2 mb-3">
					<h1 className="text-3xl">{props.title}</h1>
				</div>
				<p className="w-3/4">{props.description}</p>
				{props.hasBeenEdited && (
					<p style={{ opacity: "0.7", marginTop: "10px" }}>
						Edited
					</p>
				)}
			</div>
		</div>
	);
}

export default PostCardContainer;
