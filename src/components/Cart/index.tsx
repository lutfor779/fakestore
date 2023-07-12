"use client";

import { clearMessage, emptyCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Loading from "../Loading";
import Item from "./Item";
import Summary from "./summary";

export interface ProductProps {
	category: string;
	description: string;
	id: number;
	image: string;
	price: number;
	rating: {
		rate: number;
		count: number;
	};
	title: string;
	quantity?: number;
}

const DeleteIcon: React.FC = () => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red">
		<path d="M0 0h24v24H0z" fill="none" />
		<path d="M19 6h-3V4.5A2.5 2.5 0 0 0 13.5 2h-3A2.5 2.5 0 0 0 8 4.5V6H5a1 1 0 0 0 0 2h1v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8h1a1 1 0 0 0 0-2zm-9-2h3v1.5a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V4zm4 14a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8h6v10a1 1 0 0 0 1 1h1zM8.5 6a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V7h-4V6zm6.354 10.146a.5.5 0 0 1-.708 0L13 15.707l-1.146 1.147a.5.5 0 1 1-.708-.708L12.293 15l-1.147-1.146a.5.5 0 1 1 .708-.708L13 14.293l1.146-1.147a.5.5 0 0 1 .708.708L13.707 15l1.147 1.146a.5.5 0 0 1 0 .708z" />
	</svg>
);

const MyCart: React.FC = () => {
	const { items, loading, message } = useAppSelector(
		(state: any) => state.cart
	);

	const router = useRouter();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (message) {
			dispatch(clearMessage());
		}
	}, [message]);

	return loading ? (
		<Loading />
	) : (
		<article className="min-h-screen">
			<div className="container mx-auto p-8 bg-gray-100 mt-12 rounded-xl relative">
				<h1 className="text-2xl font-bold mb-8 text-center">
					Your Cart [{items?.length} items]
				</h1>

				{items?.length > 0 && (
					<button
						onClick={() => dispatch(emptyCart())}
						className="h-12 w-12 md:h-16 md:w-16 absolute right-5 top-6 md:top-3"
					>
						<DeleteIcon />
					</button>
				)}

				<div className="grid grid-cols-1 gap-4">
					{items.length > 0 ? (
						items.map((item: ProductProps) => <Item key={item.id} {...item} />)
					) : (
						<div className="min-h-[50vh] flex justify-center items-center">
							<button
								onClick={() => router.push("/product")}
								className="py-3 px-5 rounded shadow text-xl text-white font-semibold bg-gray-500 hover:bg-gray-700"
							>
								Explore products
							</button>
						</div>
					)}
				</div>

				{items.length > 0 && <Summary items={items} />}
			</div>
		</article>
	);
};

export default MyCart;
