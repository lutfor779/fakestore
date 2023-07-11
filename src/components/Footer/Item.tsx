import Link from "next/link";
import React from "react";

interface StoreItem {
	title: string;
	tag: string;
}
interface ItemProps {
	title: string;
	items: StoreItem[];
}

const Item: React.FC<ItemProps> = ({ title, items }) => {
	return (
		<div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-4 lg:mb-0">
			<h4 className="text-lg font-semibold">{title}</h4>

			<ul className="mt-4">
				{items.map((item, index) => (
					<li key={index} className="mb-2">
						<Link href={item.tag} className="hover:text-gray-300">
							{item.title}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Item;
