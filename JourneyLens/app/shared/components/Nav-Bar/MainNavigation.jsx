"use client";

import { useState, useEffect } from "react";
import style from "./styles.module.css";
import LongNavBar from "./Nav-Bars/LongNavBar.jsx";
import HamburgerMenu from "./Nav-Bars/ShortHamburgerMenu.jsx";

function MainNavigation() {
	// Update the width of the window
	const [windowWidth, setWindowWidth] = useState(1000);

	useEffect(() => {
		function handleResize() {
			setWindowWidth(window.innerWidth);
		}
		handleResize();

		window.addEventListener("resize", handleResize);
	}, []);

	// Handle if the Nav Bar should be long or a hamburger menu
	if (windowWidth >= 670) {
		return (
			<div>
				<LongNavBar />
			</div>
		);
	} else {
		return (
			<div>
				<HamburgerMenu />
			</div>
		);
	}
}

export default MainNavigation;
