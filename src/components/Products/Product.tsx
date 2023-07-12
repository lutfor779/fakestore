"use client";

import { addToCart, clearMessage } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Link from "next/link";
import React, { useMemo } from "react";

type Product = {
	category: string;
	description: string;
	id: number;
	image: string;
	price: number;
	rating: { rate: number; count: number };
	title: string;
};

type ProductProps = {
	product: Product;
};

const Product: React.FC<ProductProps> = ({ product }) => {
	const { message } = useAppSelector((state: any) => state.cart);
	const dispatch = useAppDispatch();

	const handleCart = (product: Product) => {
		dispatch(addToCart(product));
	};

	useMemo(() => {
		if (message) {
			window.alert(message);
			dispatch(clearMessage());
		}
	}, [message]);

	return (
		<div className="max-w-xs mx-auto bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl duration-300 hover:bg-gray-100 transition-all scale-95 hover:scale-100">
			{/* body */}
			<Link href={`/product/${product.id}`}>
				<img
					src={product.image}
					alt={product.title}
					className="h-72 md:h-96 object-contain mx-auto p-3 bg-white w-full"
				/>

				{/* details */}
				<div className="p-4">
					<h2
						title={product.title}
						className="text-2xl font-semibold truncate overflow-x-hidden text-gray-800"
					>
						{product.title}
					</h2>
					<p className="text-gray-600 font-semibold mb-2 capitalize">
						Category: {product.category}
					</p>
					<p className="text-gray-800 line-clamp-3">{product.description}</p>
					<p className="my-4 text-gray-600 font-semibold">
						Rating: {product.rating.rate} ({product.rating.count} reviews)
					</p>

					<hr />
				</div>
			</Link>

			{/* footer */}
			<div className="p-4 pt-0 flex justify-between items-center">
				<p className="text-2xl font-bold text-gray-700"> ${product.price}</p>
				<button
					onClick={() => handleCart(product)}
					className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded"
				>
					Add to Cart
				</button>
			</div>
		</div>
	);
};

export default Product;
