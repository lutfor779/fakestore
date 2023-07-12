import { emptyCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/redux/hook";
import React, { memo } from "react";
import { ProductProps } from "./index";

const TAX_RATE = 0.1;

interface SubtotalProps {
	subtotal: number;
}

const Subtotal: React.FC<SubtotalProps> = ({ subtotal }) => {
	return (
		<p className="text-lg font-semibold mb-2">
			Subtotal: <span className="text-right">${subtotal.toFixed(2)}</span>
		</p>
	);
};

interface TaxProps {
	subtotal: number;
}

const Tax: React.FC<TaxProps> = ({ subtotal }) => {
	const tax = subtotal * TAX_RATE;

	return (
		<p className="text-lg font-semibold mb-2">
			Tax: <span className="text-right">${tax.toFixed(2)}</span>
		</p>
	);
};

interface TotalProps {
	total: number;
}

const Total: React.FC<TotalProps> = ({ total }) => {
	return (
		<p className="text-xl font-bold mt-8">
			Total: <span className="text-right">${total.toFixed(2)}</span>
		</p>
	);
};

const CheckoutButton: React.FC = () => {
	const dispatch = useAppDispatch();

	const handleClick = () => {
		dispatch(emptyCart());
		window.alert("Your order successfully received!");
	};
	return (
		<button
			onClick={handleClick}
			className="mt-7 bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-5 rounded shadow hover:shadow-lg transition-all duration-300"
		>
			Order
		</button>
	);
};

interface SummaryProps {
	items: ProductProps[];
}

const Summary: React.FC<SummaryProps> = ({ items }) => {
	const calculateSubtotal = () => {
		return items.reduce(
			(sum: number, item: ProductProps) =>
				sum + item.price * (item.quantity || 1),
			0
		);
	};

	const calculateTotal = () => {
		const subtotal = calculateSubtotal();
		const tax = subtotal * TAX_RATE;
		const total = subtotal + tax;
		return total;
	};

	return (
		<div className="p-4 mt-5 text-right">
			<Subtotal subtotal={calculateSubtotal()} />
			<Tax subtotal={calculateSubtotal()} />
			<Total total={calculateTotal()} />
			<CheckoutButton />
		</div>
	);
};

export default memo(Summary);
