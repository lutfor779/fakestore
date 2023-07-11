import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../features/product/productSlice";

const store = configureStore({
	reducer: {
		product: productSlice,
	},
	devTools: true,
});

export default store;
