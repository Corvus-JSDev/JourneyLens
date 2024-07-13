import Link from "next/link";

function NotFound() {
	return (
		<div className="text-center absolute-center">
			<h2>Error: 404 Page Not Found</h2>
			<p>It looks like there was an error in the URL, please double check it.</p>
			<Link
				href="/"
				style={{ textDecoration: "underline" }}
			>
				Return Home
			</Link>
		</div>
	);
}

export default NotFound;
