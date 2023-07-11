"use client";

import { getProducts } from "@/redux/features/product/productSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
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
