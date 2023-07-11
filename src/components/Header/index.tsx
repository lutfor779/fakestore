import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
	return (
		<header className="bg-gray-900 text-white">
			<nav className="container mx-auto flex items-center justify-between py-4 px-4">
				{/* logo */}
				<Link href="/">
					<p className="text-2xl font-bold">FakeStore</p>
				</Link>

				{/* menu */}
				<ul className="flex items-center space-x-4">
					<li>
						<Link href="/">
							<p className="hover:text-gray-400">Shop</p>
						</Link>
					</li>

					<li>
						<Link href="/cart">
							<p className="hover:text-gray-400">Cart</p>
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
