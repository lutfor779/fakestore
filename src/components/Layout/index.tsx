import React, { Fragment } from "react";
import Footer from "../Footer";
import Header from "../Header";

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<Fragment>
			<Header />
			<main className="min-h-screen">{children}</main>
			<Footer />
		</Fragment>
	);
};

export default Layout;
