import React from "react";
import { useSelector } from "react-redux";

const Products: React.FC = () => {
	const data = useSelector((state: any) => state.product);
	console.log(data);

	return (
		<div>
			<p>All products</p>
		</div>
	);
};

export default Products;
