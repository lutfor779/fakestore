import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type Product = {
	category: string;
	description: string;
	id: number;
	image: string;
	price: number;
	rating: { rate: number; count: number };
	title: string;
};

interface ProductState {
	products: Product[];
	productsLoading: boolean;
	categories: string[];
	productDetails: Product | null;
}

const initialState: ProductState = {
	productsLoading: true,
	products: [],
	categories: [],
	productDetails: null,
};

export const getProducts = createAsyncThunk("products/getAll", async () => {
	const response = await fetch("https://fakestoreapi.com/products");
	const json = await response.json();

	const categories = json
		.map((item: { category: string }) => item.category)
		.filter(
			(value: string, index: number, array: string[]) =>
				array.indexOf(value) === index
		);

	return { products: json, categories: ["all", ...categories] };
});

export const getProductDetails = createAsyncThunk(
	"products/getDetails",
	async (id: string) => {
		const response = await fetch(`https://fakestoreapi.com/products/${id}`);
		const json = await response.json();

		return json;
	}
);

const productSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		resetProducts: (state) => {
			state.products = [];
		},
		resetProductDetails: (state) => {
			state.productDetails = null;
		},
	},
	extraReducers(builder) {
		builder.addCase(getProducts.pending, (state) => {
			state.productsLoading = true;
		});
		builder.addCase(
			getProducts.fulfilled,
			(
				state,
				action: PayloadAction<{
					products: Product[];
					categories: string[];
				}>
			) => {
				state.productsLoading = false;
				state.products = action.payload.products;
				state.categories = action.payload.categories;
			}
		);
		builder.addCase(getProducts.rejected, (state) => {
			state.productsLoading = false;
		});
		builder.addCase(getProductDetails.pending, (state) => {
			state.productsLoading = true;
		});
		builder.addCase(
			getProductDetails.fulfilled,
			(state, action: PayloadAction<Product>) => {
				state.productsLoading = false;
				state.productDetails = action.payload;
			}
		);
		builder.addCase(getProductDetails.rejected, (state) => {
			state.productsLoading = false;
		});
	},
});

export const { resetProducts, resetProductDetails } = productSlice.actions;
export default productSlice.reducer;
