import React from "react";

const Loading: React.FC = () => {
	return (
		<div className="flex items-center justify-center h-screen">
			<div className="bg-white p-8 rounded-lg shadow-lg -mt-40">
				<h1 className="text-4xl font-bold mb-4 text-gray-800">Loading...</h1>

				{/* spinner */}
				<div className="flex justify-center">
					<div className="animate-spin rounded-full h-16 w-16 border-b-4 border-gray-900"></div>
				</div>
			</div>
		</div>
	);
};

export default Loading;
