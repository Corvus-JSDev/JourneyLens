import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "JourneyLens",
	description: "Share all the places you visited to share with the world",
};

export default function RootLayout({ children }) {
	return (
		<html
			lang="en"
			data-theme="dim"
			suppressHydrationWarning={true}
		>
			<body className={inter.className}>{children}</body>
		</html>
	);
}
