"use client";

import Layout from "@/components/Layout";
import Link from "next/link";

export default function NotFound() {
	return (
		<Layout>
			<div className="w-full min-h-[80vh] flex justify-center items-center ">
				<div className="text-center">
					<h1 className="text-4xl font-bold text-gray-800">404</h1>
					<p className="text-lg text-gray-600">
						The page you are looking for does not exist.
					</p>
					<Link href="/" className="text-blue-500 hover:text-blue-700">
						Go Home
					</Link>
				</div>
			</div>
		</Layout>
	);
}
