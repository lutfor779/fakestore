import {
	addToCart,
	deleteFromCart,
	removeFromCart,
} from "@/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/redux/hook";
import React, { memo } from "react";
import { ProductProps } from "./index";

const Item: React.FC<ProductProps> = (props) => {
	const { image, title, price, quantity, id } = props;
	const dispatch = useAppDispatch();
	const disable = (quantity || 1) <= 1;

	const handleIncrement = () => {
		dispatch(addToCart(props));
	};

	const handleDecrement = () => {
		dispatch(removeFromCart(props));
	};

	const handleDelete = () => {
		dispatch(deleteFromCart(id));
	};

	return (
		<div className="p-4 bg-white rounded-lg shadow hover:shadow-lg flex flex-col md:flex-row items-center justify-between transition-all duration-300">
			<div className="flex items-center justify-start w-full md:w-2/5">
				<div className="w-16">
					{image && (
						<img src={image} alt={title} className="w-16 h-16 object-contain" />
					)}
				</div>
				<h3
					title={title}
					className="font-semibold text-lg w-full mt-2 md:mt-0 md:ml-4"
				>
					{title}
				</h3>
			</div>

			<p title="Price" className="text-gray-500 mt-2 md:mt-0">
				${price}
			</p>

			<div title="Quantity" className="flex items-center gap-3 mt-2 md:mt-0">
				<button
					onClick={handleDecrement}
					className={`text-3xl ${
						disable ? "text-gray-300 cursor-not-allowed" : "text-gray-500"
					}`}
					disabled={disable}
				>
					<span role="img" aria-label="decrement">
						➖
					</span>
				</button>
				<p className="border border-gray-400 rounded-md px-3 py-1 text-xl">
					{quantity}
				</p>
				<button onClick={handleIncrement} className="text-3xl">
					<span role="img" aria-label="increment">
						➕
					</span>
				</button>
			</div>

			<p title="Total" className="font-semibold text-lg mt-2 md:mt-0">
				${(price * (quantity || 1)).toFixed(2)}
			</p>

			<button
				onClick={handleDelete}
				className="text-3xl mt-2 md:mt-0 text-red-500 hover:text-red-600"
			>
				<span role="img" aria-label="delete">
					❌
				</span>
			</button>
		</div>
	);
};

export default memo(Item);
