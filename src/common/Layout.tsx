import type React from "react";

import Footer from "./Footer";
import Navbar from "./Navbar";

interface LayoutProps {
	children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
	return (
		<div className="flex flex-col min-h-screen font-body">
			<Navbar />
			<main className="flex-1 bg-dark-surface">{props.children}</main>
			<Footer />
		</div>
	);
};

export default Layout;
