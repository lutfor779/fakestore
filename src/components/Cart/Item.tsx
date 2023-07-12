import React, { memo } from "react";

import {
	addToCart,
	deleteFromCart,
	removeFromCart,
} from "@/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/redux/hook";
import { ProductProps } from "./index";

const Item: React.FC<ProductProps> = (props) => {
	const { image, title, price, quantity, id } = props;

	const dispatch = useAppDispatch();

	const disable = (quantity || 1) <= 1;

	const hacdleIncrement = () => {
		dispatch(addToCart(props));
	};
	const hacdledDecrement = () => {
		dispatch(removeFromCart(props));
	};
	const handleDelete = () => {
		dispatch(deleteFromCart(id));
	};

	return (
		<div className="p-4 bg-white rounded-lg shadow hover:shadow-lg flex items-center justify-between transition-all duration-300">
			<div className="flex items-center justify-start w-2/5">
				<div className="w-16">
					<img src={image} alt={title} className="w-16 h-16 object-contain" />
				</div>
				<h3 title={title} className="font-semibold w-full">
					{title}
				</h3>
			</div>

			<p title="Price" className="text-gray-500">
				${price}
			</p>

			<div title="Quantity" className="flex items-center gap-3">
				<button
					onClick={hacdledDecrement}
					className={`text-5xl ${disable ? "text-gray-300" : "text-gray-500"}`}
					disabled={disable}
				>
					-
				</button>
				<p className="border w-min px-3 py-1 text-xl">{quantity}</p>
				<button onClick={hacdleIncrement} className="text-4xl">
					+
				</button>
			</div>

			<p title="Total" className=" font-semibold">
				${(price * (quantity || 1)).toFixed(2)}
			</p>

			<button onClick={handleDelete} className="text-4xl">
				&#10005;
			</button>
		</div>
	);
};

export default memo(Item);
