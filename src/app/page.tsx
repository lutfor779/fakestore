"use client";

import Layout from "@/components/Layout";
import Products from "@/components/Products";
import {
	setCategories,
	setProducts,
	setProductsLoading,
} from "@/redux/features/product/productSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Home() {
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

	return (
		<Layout>
			<Products />
		</Layout>
	);
}
