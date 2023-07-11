import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
	products: any[];
	productsLoading: boolean;
	categories: string[];
}

const initialState: ProductState = {
	productsLoading: true,
	products: [],
	categories: [],
};

const productSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		setProductsLoading: (state, action: PayloadAction<boolean>) => {
			state.productsLoading = action.payload;
		},
		setProducts: (state, action: PayloadAction<any[]>) => {
			state.products = action.payload;
		},
		setCategories: (state, action: PayloadAction<any[]>) => {
			state.categories = action.payload;
		},
		resetProducts: (state) => {
			state.products = [];
		},
	},
});

export const { setProductsLoading, setProducts, setCategories, resetProducts } =
	productSlice.actions;
export default productSlice.reducer;
