import React from "react";
import Item from "./Item";

interface StoreItem {
	title: string;
	tag: string;
}

const Footer: React.FC = () => {
	const store: StoreItem[] = [
		{
			title: "About Us",
			tag: "/#",
		},
		{
			title: "Contact Us",
			tag: "/#",
		},
		{
			title: "Privacy Policy",
			tag: "/#",
		},
		{
			title: "Terms of Service",
			tag: "/#",
		},
	];

	const categoriesStore: StoreItem[] = [
		{
			title: "Jewelery",
			tag: "/product#categories",
		},
		{
			title: "Electronics",
			tag: "/product#categories",
		},
		{
			title: "Men's Clothing",
			tag: "/product#categories",
		},
		{
			title: "Women's Clothing",
			tag: "/product#categories",
		},
	];

	const supportStore: StoreItem[] = [
		{
			title: "FAQs",
			tag: "/#support",
		},
		{
			title: "Shipping & Returns",
			tag: "/#support",
		},
		{
			title: "Order Tracking",
			tag: "/#support",
		},
	];

	const connectStore: StoreItem[] = [
		{
			title: "Facebook",
			tag: "https://www.facebook.com/lutfor.rahman.dev/",
		},
		{
			title: "LinkedIn",
			tag: "https://www.linkedin.com/in/lutfor779/",
		},
		{
			title: "Github",
			tag: "https://github.com/lutfor779",
		},
	];

	return (
		<footer className="bg-gray-900 text-white py-8">
			<div className="container mx-auto flex flex-wrap">
				<Item title="FakeStore" items={store} />
				<Item title="Categories" items={categoriesStore} />
				<Item title="Support" items={supportStore} />
				<Item title="Connect" items={connectStore} />
			</div>

			<div className="mt-8 text-center">
				<p>&copy; 2023 FakeStore. All rights reserved.</p>
			</div>
		</footer>
	);
};

export default Footer;
