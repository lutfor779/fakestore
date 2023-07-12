"use client";

import {
	getCategories,
	getProductsByCategory,
	setCategory,
} from "@/redux/features/product/productSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import NoProducts from "./NoProducts";
import Product from "./Product";

const Products: React.FC = () => {
	const pathName = usePathname();
	const { products, categories, category, productsLoading } = useAppSelector(
		(state: any) => state.product
	);
	const [allProducts, setAllProducts] = useState(products);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getCategories());
		dispatch(getProductsByCategory("all"));
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

	const handleCategoryClick = (data: string) => {
		dispatch(setCategory(data));
		dispatch(getProductsByCategory(data));
	};

	return (
		<div className="container mx-auto">
			<h2 className="px-3 text-3xl font-bold text-gray-700 text-center my-5">
				Explore our Products
			</h2>

			{/* filter */}
			<ul className="flex flex-wrap gap-3 p-3 ">
				{categories.map((item: string) => (
					<li
						key={item}
						className={`px-2 py-1 rounded-md cursor-pointer capitalize ${
							item === category
								? "bg-gray-700 text-white font-semibold"
								: "bg-gray-200"
						}`}
						onClick={() => handleCategoryClick(item)}
					>
						{item}
					</li>
				))}
			</ul>

			{productsLoading ? (
				<Loading />
			) : allProducts.length > 0 ? (
				// all products
				<div>
					<div className="flex flex-wrap gap-x-3 gap-y-12 py-6">
						{allProducts.map((item: any) => (
							<Product key={item.id} product={item} />
						))}
					</div>

					{/* More button */}
					{pathName === "/" && allProducts.length > 5 && (
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
				<NoProducts />
			)}
		</div>
	);
};

export default Products;
