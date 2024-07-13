"use client";

import MainNavigation from "@shared/components/Nav-Bar/MainNavigation.jsx";
import style from "../style.module.css";
import * as yup from "yup";
import { useState } from "react";
import UserInput from "@shared/components/user-input/input.jsx";
import infoIcon from "@icons/information-icon.png";
import Link from "next/link";
import { AuthContent } from "@shared/context/auth-context";
import { useContext } from "react";
// import { ring } from "ldrs";
// ring.register();

const errorMessageStyle = {
	marginTop: "20px",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	textAlign: "left",
	paddingLeft: "5px",
};

export default function LoginPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);
	const [invalidCredentials, setInvalidCredentials] =
		useState(false);
	const [demoErrorMsg, setDemoErrorMsg] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const emailValue = event.target[0].value;
		const passwordValue = event.target[1].value;

		try {
			setIsLoading(true);

			const res = await fetch(
				"https://journylensserver:5000/api/users/login",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: emailValue,
						password: passwordValue,
					}),
				},
			);

			const resData = await res.json();
			console.log(resData);

			if (resData.code === 200) {
				AuthContent.logIN(resData.userUUID, resData.token);
			} else {
				setInvalidCredentials(true);
			}
		} catch (error) {
			setError(true);
		}

		setIsLoading(false);
		// setDemoErrorMsg(true);
	};

	return (
		<>
			{/* nav bar */}
			<MainNavigation />

			{/* login form */}
			<div className="flex overflow-hidden relative bottom-24 flex-col justify-center h-screen">
				<div className="top-12 px-6 pt-5 pb-3 m-auto w-full rounded-lg ring-2 shadow-md bg-neutral-800/80 ring-gray-800/50 lg:max-w-lg">
					<h1 className="text-3xl font-semibold text-center text-white/90">
						Log In
					</h1>
					<form
						className="space-y-4"
						onSubmit={handleSubmit}
					>
						<div>
							<UserInput
								label="Email"
								id="email"
							/>
							<div style={{ margin: "10px 0px" }}></div>
							<UserInput
								label="Password"
								id="password"
							/>
						</div>
						<Link
							href="/pages/contact"
							className="text-xs text-white/90 hover:underline hover:text-blue-600"
						>
							Forget Password?
						</Link>
						<div>
							<button className="text-lg font-bold btn btn-block bg-slate-700 hover:bg-slate-600 text-white/90">
								Login
							</button>
						</div>

						{isLoading ? (
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
						) : (
							<div></div>
						)}
						{error ? (
							<div style={errorMessageStyle}>
								<p style={{ color: "#fc563c" }}>
									Sorry, our servers are having some
									difficulties. Please try again later.
								</p>
							</div>
						) : (
							<div></div>
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

						{invalidCredentials ? (
							<div style={errorMessageStyle}>
								<p style={{ color: "#fc563c" }}>
									Invalid Credentials
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
							opacity: "0.8",
						}}
					>
						<Link href="/pages/auth/SignUp">
							Dont have an account?{" "}
							<span style={{ textDecoration: "underline" }}>
								Sign Up Here!
							</span>{" "}
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}
