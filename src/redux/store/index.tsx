import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cart/cartSlice";
import productSlice from "../features/product/productSlice";

export const store: any = configureStore({
	reducer: {
		product: productSlice,
		cart: cartSlice,
	},
	devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
