import style from "../styles.module.css";
import NavLinks from "../NavLinks.jsx";
import Link from "next/link";
const logo =
	"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1200px-Instagram_logo_2016.svg.png";

function LongNavBar() {
	return (
		<header className={style.longNavBar_Container}>
			<div className="flex gap-3 items-center">
				<Link
					href="/"
					style={{ fontSize: "1.5rem", fontWeight: "600" }}
				>
					JourneyLens
				</Link>
			</div>
			<div className={style.longNavBar_Links_Container}>
				<NavLinks className={style.navLinkStyle} />
			</div>
		</header>
	);
}

export default LongNavBar;
