"use client";

import MainNavigation from "@shared/components/Nav-Bar/MainNavigation.jsx";
import style from "../style.module.css";
import * as yup from "yup";
import { useEffect, useState } from "react";
import UserInput from "@shared/components/user-input/input.jsx";
import infoIcon from "@icons/information-icon.png";
import Link from "next/link";

const errorMessageStyle = {
	marginTop: "20px",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	textAlign: "left",
	paddingLeft: "5px",
};

export default function LoginPage() {
	const [validEmail, setValidEmail] = useState(true);
	const [validUsername, setValidUsername] = useState(true);
	const [validPasswords, setValidPasswords] = useState(true);

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);
	const [emailInUse, setEmailInUse] = useState(false);
	const [success, setSuccess] = useState(false);
	const [demoErrorMsg, setDemoErrorMsg] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
		// setDemoErrorMsg(true);

		// Gather the values of the inputs
		const fullNameValue = event.target[0].value;
		const emailValue = event.target[1].value;
		const showRealNameValue = event.target[2].checked;
		const usernameValue = event.target[3].value;
		const passwordValue = event.target[4].value;

		// input validation
		const emailSchema = yup.string().email().required();
		const usernameSchema = yup
			.string()
			.matches(/^[^&\/\\#,+()$~%.'":*?<>{}]*$/)
			.min(3)
			.max(45)
			.required();
		const passwordSchema = yup.string().min(6).required();

		// update the values
		setValidEmail(await emailSchema.isValid(emailValue));
		setValidUsername(await usernameSchema.isValid(usernameValue));
		setValidPasswords(await passwordSchema.isValid(passwordValue));

		// wait for all the async stuff to finish before trying to submit the form
		const [isValidUsername, isValidEmail, isValidPassword] =
			await Promise.all([
				await emailSchema.isValid(emailValue),
				await usernameSchema.isValid(usernameValue),
				await passwordSchema.isValid(passwordValue),
			]);
		// form submitting
		if (isValidUsername && isValidEmail && isValidPassword) {
			try {
				setIsLoading(true);

				const response = await fetch(
					"http://journylensserver.com/api/users/signup",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							// TODO: add profile pictures
							userName: usernameValue,
							email: emailValue,
							password: passwordValue,
							fullName: fullNameValue,
							displayFullName: showRealNameValue,
						}),
					},
				);

				const data = await response.json();
				const message = data.message.slice(0, 3);

				if (message === "422") {
					setEmailInUse(true);
				}
				if (data.code === 201) {
					setEmailInUse(false);
					setSuccess(true);
				}
			} catch (err) {
				setError(true);
			}
		}
		setIsLoading(false);
	};

	return (
		<>
			{/* nav bar */}
			<MainNavigation />

			{/* login form */}
			<div className="flex relative bottom-20 flex-col justify-center h-screen">
				<div className="top-32 px-6 pt-5 pb-3 m-auto w-full rounded-lg ring-2 shadow-md bg-neutral-800/80 ring-gray-800/50 lg:max-w-lg">
					<h1 className="text-3xl font-semibold text-center text-white/90">
						Sign Up
					</h1>
					<form
						className="space-y-4"
						onSubmit={handleSubmit}
					>
						<div>
							<UserInput
								label="Full Name"
								id="fullName"
							/>
							<UserInput
								label="Email"
								id="email"
								type="email"
							/>
							{!validEmail && (
								<div className={style.errorMessageContainer}>
									<img
										src={infoIcon.src}
										style={{
											width: "15px",
											height: "15px",
										}}
									/>

									<p style={{ color: "red" }}>
										Please enter a valid email
									</p>
								</div>
							)}
							<div
								style={{
									display: "flex",
									flexDirection: "row-reverse",
									justifyContent: "center",
									marginTop: "10px",
									gap: "10px",
									width: "90%",
								}}
							>
								<label
									htmlFor="showRealName"
									style={{ cursor: "pointer" }}
								>
									Show real name on profile?
								</label>
								<input
									style={{ scale: "1.3", cursor: "pointer" }}
									type="checkbox"
									name="showRealName"
									id="showRealName"
								/>
							</div>

							<div style={{ margin: "10px 0px" }}></div>

							<UserInput
								label="Username"
								id="username"
							/>
							{!validUsername && (
								<div className={style.errorMessageContainer}>
									<img
										src={infoIcon.src}
										style={{
											width: "15px",
											height: "15px",
										}}
									/>

									<p style={{ color: "red" }}>
										Must be alphanumeric, and between 3-45
										characters
									</p>
								</div>
							)}

							<UserInput
								label="Password"
								id="password"
							/>
							{!validPasswords && (
								<div className={style.errorMessageContainer}>
									<img
										src={infoIcon.src}
										style={{
											width: "15px",
											height: "15px",
										}}
									/>

									<p style={{ color: "red" }}>
										Invalid Password
									</p>
								</div>
							)}
							<ul className={style.passwordRequirements}>
								<li>Minimum of 6 characters</li>
							</ul>
						</div>
						<div>
							<button className="mt-3 text-lg font-bold btn btn-block bg-slate-600 hover:bg-slate-500 text-white/90">
								Create Account
							</button>
						</div>

						{isLoading && (
							<div
								style={{
									marginTop: "20px",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<span className="loading loading-spinner loading-lg"></span>
							</div>
						)}
						{error && (
							<div style={errorMessageStyle}>
								<p style={{ color: "#fc563c" }}>
									Sorry, our servers are having some
									difficulties. Please try again later.
								</p>
							</div>
						)}
						{emailInUse && (
							<div style={errorMessageStyle}>
								<p style={{ color: "#fc563c" }}>
									This email is already in use. Please Login
								</p>
							</div>
						)}
						{success && (
							<div style={errorMessageStyle}>
								<p style={{ color: "#30d330" }}>
									Your account has been successfully created.
									You may now login.
								</p>
							</div>
						)}

						{demoErrorMsg ? (
							<div style={errorMessageStyle}>
								<p>
									The login and Sign up features have been
									disabled for this demo. No new accounts can
									be created.
								</p>
							</div>
						) : (
							<div></div>
						)}
					</form>

					<div
						style={{
							display: "flex",
							justifyContent: "center",
							marginTop: "25px",
							marginBottom: "5px",
							opacity: "0.8",
						}}
					>
						<Link href="/pages/auth/Login">
							Already have an account?{" "}
							<span style={{ textDecoration: "underline" }}>
								Login Here!
							</span>{" "}
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}
