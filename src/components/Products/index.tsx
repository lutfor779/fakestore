"use client";

import { getProducts } from "@/redux/features/product/productSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import Product from "./Product";

const Products: React.FC = () => {
	const pathName = usePathname();
	const { products } = useAppSelector((state: any) => state.product);
	const [allProducts, setAllProducts] = useState(products);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getProducts());
	}, []);

	useEffect(() => {
		if (products.length > 0) {
			if (pathName === "/") {
				setAllProducts(products.slice(0, 6));
			} else {
				setAllProducts(products);
			}
		}
	}, [pathName, products]);

	return (
		<div className="container mx-auto">
			<h2 className="px-3 text-3xl font-bold text-gray-700 text-center my-5">
				Explore our Products
			</h2>
			{/* products */}
			{allProducts.length > 0 ? (
				<div>
					<div className="flex flex-wrap gap-x-3 gap-y-12 py-6">
						{allProducts.map((item: any) => (
							<Product key={item.id} product={item} />
						))}
					</div>
					{pathName === "/" && (
						<div className="flex justify-center md:justify-end items-center mb-8">
							<Link
								href={"/product"}
								className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded"
							>
								More
							</Link>
						</div>
					)}
				</div>
			) : (
				<Loading />
			)}
		</div>
	);
};

export default Products;
