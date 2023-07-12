import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Item {
	category: string;
	description: string;
	id: number;
	image: string;
	price: number;
	rating: {
		rate: number;
		count: number;
	};
	title: string;
	quantity?: number;
}

export interface CartState {
	items: Item[];
	loading: boolean;
	message: string | null;
}

const initialState: CartState = {
	items: [],
	loading: false,
	message: null,
};

export const addToCart = createAsyncThunk(
	"cart/addToCart",
	async (data: Item, { getState }) => {
		const state = getState() as { cart: CartState };
		const items = state.cart.items;

		if (items.length > 0) {
			const index = await items.findIndex((i) => i.id === data.id);

			if (index === -1) {
				return [...items, { ...data, quantity: 1 }];
			} else {
				return [
					...items.slice(0, index),
					{ ...items[index], quantity: (items[index].quantity || 0) + 1 },
					...items.slice(index + 1),
				];
			}
		} else {
			return [...items, { ...data, quantity: 1 }];
		}
	}
);

export const removeFromCart = createAsyncThunk(
	"cart/removeFromCart",
	async (data: Item, { getState }) => {
		const state = getState() as { cart: CartState };
		const items = state.cart.items;

		const index = await items.findIndex((i) => i.id === data.id);

		if ((items[index].quantity || 0) > 1) {
			return [
				...items.slice(0, index),
				{ ...items[index], quantity: (items[index].quantity || 1) - 1 },
				...items.slice(index + 1),
			];
		} else {
			return [...items.slice(0, index), ...items.slice(index + 1)];
		}
	}
);

export const deleteFromCart = createAsyncThunk(
	"cart/deleteFromCart",
	async (id: number, { getState }) => {
		const state = getState() as { cart: CartState };
		const items = state.cart.items;

		const remaining = await items.filter((i) => i.id !== id);
		return remaining;
	}
);

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		emptyCart: () => initialState,
		clearMessage: (state) => {
			state.message = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(addToCart.pending, (state) => {
				state.loading = true;
			})
			.addCase(addToCart.fulfilled, (state, action: PayloadAction<Item[]>) => {
				state.loading = false;
				state.items = action.payload;
				state.message = "Product added succesfully!";
			})
			.addCase(addToCart.rejected, (state, action) => {
				state.loading = false;
				state.message = "Something went wrong!";
				console.log(action.error.message);
			})
			.addCase(removeFromCart.pending, (state) => {
				state.loading = true;
			})
			.addCase(
				removeFromCart.fulfilled,
				(state, action: PayloadAction<Item[]>) => {
					state.loading = false;
					state.items = action.payload;
					state.message = "Product removed succesfully!";
				}
			)
			.addCase(removeFromCart.rejected, (state, action) => {
				state.loading = false;
				state.message = "Something went wrong!";
				console.log(action.error.message);
			})
			.addCase(deleteFromCart.pending, (state) => {
				state.loading = true;
			})
			.addCase(
				deleteFromCart.fulfilled,
				(state, action: PayloadAction<Item[]>) => {
					state.loading = false;
					state.items = action.payload;
					state.message = "Product deleted succesfully!";
				}
			)
			.addCase(deleteFromCart.rejected, (state, action) => {
				state.loading = false;
				state.message = "Something went wrong!";
				console.log(action.error.message);
			});
	},
});

export const { emptyCart, clearMessage } = cartSlice.actions;
export default cartSlice.reducer;
