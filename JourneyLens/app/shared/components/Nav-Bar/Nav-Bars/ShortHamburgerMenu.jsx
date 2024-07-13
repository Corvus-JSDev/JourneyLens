import style from "../styles.module.css";
import { links } from "../NavLinks.jsx";
import hamburgerMenu from "@icons/hamburger-menu.png";
import Link from "next/link";

const logo =
	"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1200px-Instagram_logo_2016.svg.png";

const NavLinks = links.map((link) => {
	return (
		<li key={link.text}>
			<Link href={link.href}>{link.text}</Link>
		</li>
	);
});

function HamburgerMenu() {
	return (
		<header className={style.HamburgerMenu_Container}>
			<div className="drawer drawer-end">
				<input
					id="my-drawer-4"
					type="checkbox"
					className="drawer-toggle"
				/>
				<div className={style.drawerContent}>
					{/* Page content here */}
					<label
						htmlFor="my-drawer-4"
						className={style.HamburgerMenu_Btn}
					>
						<img
							src={hamburgerMenu.src}
							width={30}
							style={{
								cursor: "pointer",
								filter: "invert(100%)",
							}}
							alt="hamburger menu"
						/>
					</label>

					<div className={style.logo_container}>
						<Link
							href="/"
							style={{ fontSize: "1.3rem", fontWeight: "600" }}
						>
							JourneyLens
						</Link>
					</div>
				</div>

				<div className="drawer-side">
					<label
						htmlFor="my-drawer-4"
						aria-label="close sidebar"
						className="drawer-overlay"
					></label>
					<ul className="p-4 w-3/4 min-h-full menu bg-base-200 text-base-content">
						{/* Sidebar content here */}
						{NavLinks}
					</ul>
				</div>
			</div>
		</header>
	);
}

export default HamburgerMenu;
