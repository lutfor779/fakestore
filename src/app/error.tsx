"use client"; // Error components must be Client Components

import Layout from "@/components/Layout";
import { useEffect } from "react";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<Layout>
			<div className="w-full min-h-[80vh] flex justify-center items-center ">
				<div className="text-center">
					<h2>Something went wrong!</h2>

					<button onClick={() => reset()}>Try again</button>
				</div>
			</div>
		</Layout>
	);
}
