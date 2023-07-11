"use client";

import {
	setCategories,
	setProducts,
	setProductsLoading,
} from "@/redux/features/product/productSlice";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading";
import Product from "./Product";

const Products: React.FC = () => {
	const pathName = usePathname();
	const { products } = useSelector((state: any) => state.product);

	const [allProducts, setAllProducts] = useState(products);

	const dispatch = useDispatch();

	useEffect(() => {
		fetch("https://fakestoreapi.com/products")
			.then((res) => res.json())
			.then((json) => {
				const categories = json
					.map((item: { category: string }) => item.category)
					.filter(function (
						value: string,
						index: number,
						array: string | any[]
					) {
						return array.indexOf(value) === index;
					});

				dispatch(setProducts(json));
				dispatch(setProductsLoading(false));
				dispatch(setCategories(["all", ...categories]));
			})
			.catch((err) => dispatch(setProductsLoading(false)));
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
			<p>All products</p>

			{/* products */}
			{allProducts.length > 0 ? (
				<div className="flex flex-wrap gap-x-3 gap-y-11 py-6">
					{allProducts.map((item: any) => (
						<Product key={item.id} product={item} />
					))}
				</div>
			) : (
				<Loading />
			)}
		</div>
	);
};

export default Products;
