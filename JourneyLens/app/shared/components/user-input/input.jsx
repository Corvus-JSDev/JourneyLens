"use client";

import style from "./style.module.css";

/* 
! required props:
label: str
id: str

? optional props:
element: "input" (default) or "textarea"
type: "text" (default) "number" or "file" (only for input elements)
placeholder: str
rows: num (default is 3, also for textarea only)
width: str (default is 100%)
accept: used with file inputs (e.g ".jpg, .png, .jpeg")
value: str or prop 
*/

function UserInput(props) {
	const inputElement =
		props.element === "textarea" ? (
			<textarea
				id={props.id}
				rows={props.rows || 3}
				placeholder={props.placeholder}
				defaultValue={props.value}
			/>
		) : (
			<input
				id={props.id}
				type={props.type || "text"}
				placeholder={props.placeholder}
			/>
		);

	return (
		<div
			className={style.userInputContainer}
			style={{ width: props.width || "100%" }}
		>
			{/* Input Label */}
			{props.label && (
				<label htmlFor={props.id}>{props.label}</label>
			)}

			{/* The input itself */}
			{inputElement}
		</div>
	);
}

export default UserInput;
