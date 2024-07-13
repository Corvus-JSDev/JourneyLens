import style from "./styles.module.css";

export default function ImageUpload(props) {
	return (
		<div className={style.formControl}>
			<input type="button" />
			<input
				id={props.id}
				style={{ display: "none" }}
				accept=".jpg, .png, .jpeg"
				type="files"
			/>
		</div>
	);
}
