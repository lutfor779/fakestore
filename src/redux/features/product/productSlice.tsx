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
	category: string;
}

const initialState: ProductState = {
	productsLoading: true,
	products: [],
	categories: [],
	productDetails: null,
	category: "all",
};

export const getCategories = createAsyncThunk(
	"products/getCategories",
	async () => {
		const response = await fetch(
			"https://fakestoreapi.com/products/categories"
		);
		const json = await response.json();
		return ["all", ...json];
	}
);

export const getProductDetails = createAsyncThunk(
	"products/getDetails",
	async (id: string) => {
		const response = await fetch(`https://fakestoreapi.com/products/${id}`);
		const json = await response.json();

		return json;
	}
);

export const getProductsByCategory = createAsyncThunk(
	"products/getProductsByCategory",
	async (category: string) => {
		if (category === "all") {
			const response = await fetch("https://fakestoreapi.com/products");
			const json = await response.json();

			return json;
		} else {
			const response = await fetch(
				`https://fakestoreapi.com/products/category/${category}`
			);
			const json = await response.json();

			return json;
		}
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
		setCategory: (state, action: PayloadAction<string>) => {
			state.category = action.payload;
		},
	},
	extraReducers(builder) {
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
		builder.addCase(getCategories.pending, (state) => {
			state.productsLoading = true;
		});
		builder.addCase(
			getCategories.fulfilled,
			(state, action: PayloadAction<string[]>) => {
				state.productsLoading = false;
				state.categories = action.payload;
			}
		);
		builder.addCase(getCategories.rejected, (state) => {
			state.productsLoading = false;
		});
		builder.addCase(getProductsByCategory.pending, (state) => {
			state.productsLoading = true;
		});
		builder.addCase(
			getProductsByCategory.fulfilled,
			(state, action: PayloadAction<Product[]>) => {
				state.productsLoading = false;
				state.products = action.payload;
			}
		);
		builder.addCase(getProductsByCategory.rejected, (state) => {
			state.productsLoading = false;
		});
	},
});

export const { resetProducts, resetProductDetails, setCategory } =
	productSlice.actions;
export default productSlice.reducer;
