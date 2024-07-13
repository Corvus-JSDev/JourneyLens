import Link from "next/link";
import style from "./styles.module.css";
import { AuthContent } from "@shared/context/auth-context";
const userID = AuthContent._currentValue.userId;
import { useContext } from "react";
import { useEffect } from "react";

export const links = [
	{ href: "/", text: "Home" },
	{ href: "/pages/about", text: "About" },
	{ href: "/pages/auth/Login", text: "Log In" },
	{ href: "/pages/auth/SignUp", text: "Sign Up" },
];
{
}
function NavLinks(props) {
	const auth = useContext(AuthContent);
	let userIsLoggedIn = auth.isUserLoggedIn;
	const profileURL = `/pages/users/${userID}`;

	if (userIsLoggedIn) {
		return (
			<div className={props.className}>
				<Link href={links[1].href}>About</Link>
				<Link href={profileURL}>View Profile</Link>
			</div>
		);
	} else {
		return (
			<div className={props.className}>
				<Link href={links[1].href}>About</Link>
				<Link href={links[2].href}>Log In</Link>
				<Link
					href={links[3].href}
					className={style.navLinkStyleSignup}
				>
					Sign Up
				</Link>
			</div>
		);
	}
}

export default NavLinks;
