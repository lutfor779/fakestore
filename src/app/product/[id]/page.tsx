"use client";

import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import { addToCart, clearMessage } from "@/redux/features/cart/cartSlice";
import {
	getProductDetails,
	resetProductDetails,
} from "@/redux/features/product/productSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

type Product = {
	category: string;
	description: string;
	id: number;
	image: string;
	price: number;
	rating: { rate: number; count: number };
	title: string;
};

type ProductDetailsProps = {
	params: {
		id: string;
	};
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ params }) => {
	const { productDetails } = useAppSelector((state: any) => state.product);
	const { message } = useAppSelector((state: any) => state.cart);

	const product: Product | null = productDetails;

	const router = useRouter();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getProductDetails(params.id));
	}, [params.id]);

	useMemo(() => {
		if (message) {
			window.alert(message);
			dispatch(clearMessage());
		}
	}, [message]);

	const handleCart = () => {
		product && dispatch(addToCart(product));
	};

	return (
		<Layout>
			<p>{params.id}</p>
			{product ? (
				<div className="container mx-auto bg-gray-50 rounded-lg ">
					<div className="px-4 py-6 flex flex-col md:flex-row">
						{/* image */}
						<div className="p-5  md:w-1/2 flex justify-center items-center bg-white rounded-lg shadow hover:shadow-lg hover:scale-105 transform duration-300 ">
							<img
								src={product.image}
								alt={product.title}
								className=" object-contain max-h-[35vh] md:max-h-[70vh]"
							/>
						</div>

						{/* info */}
						<div className="md:w-1/2 mt-6 md:mt-0 md:ml-8 md:min-h-[65vh]">
							{/* details */}
							<>
								<h2 className="text-2xl font-bold my-3">{product.title}</h2>
								<p className="text-gray-700 mb-4 font-semibold">
									Category: {product.category}
								</p>

								<p className="text-gray-700 my-3 md:my-7">
									{product.description}
								</p>

								{/* rating */}
								<div className="flex items-center mb-4">
									<span className=" text-orange-300 mr-2">&#9733;</span>
									<span className="text-gray-700">
										{product.rating.rate.toFixed(1)} ({product.rating.count}{" "}
										reviews)
									</span>
								</div>

								<div className="text-2xl font-bold mb-4">${product.price}</div>
							</>

							{/* actions */}
							<div className="flex gap-12 justify-between md:justify-start">
								<button
									onClick={handleCart}
									className="bg-gray-500 hover:bg-gray-700 font-bold text-white px-4 py-2 rounded shadow hover:scale-105 transform transition-all duration-300 ease-in-out"
								>
									Add to Cart
								</button>

								<button
									onClick={() => {
										dispatch(resetProductDetails());
										router.back();
									}}
									className="font-bold text-gray-500 px-4 py-2 rounded shadow hover:scale-95 border transform transition-all duration-300 ease-in-out"
								>
									Go back
								</button>
							</div>
						</div>
					</div>
				</div>
			) : (
				<Loading />
			)}
		</Layout>
	);
};

export default ProductDetails;
