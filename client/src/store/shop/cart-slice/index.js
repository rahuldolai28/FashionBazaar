import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";

export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ userId, productId, quantity }) => {
        const response = await api.post(`/shop/cart/add`, {
            userId,
            productId,
            quantity,
        });
        return response.data;
    }
);

export const fetchCartItems = createAsyncThunk(
    "cart/fetchCartItems",
    async (userId) => {
        const response = await api.get(`/shop/cart/get/${userId}`);
        return response.data;
    }
);

export const updateCartItem = createAsyncThunk(
    "cart/updateCartItem",
    async ({ userId, productId, quantity }) => {
        const response = await api.put(`/shop/cart/update/${productId}`, {
            userId,
            productId,
            quantity,
        });
        return response.data;
    }
);

export const deleteCartItem = createAsyncThunk(
    "cart/deleteCartItem",
    async ({ userId, productId }) => {
        const response = await api.delete(
            `/shop/cart/delete/${userId}/${productId}`
        );
        return response.data;
    }
);

const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState: {
        cartItems: [],
        isLoading: false,
        totalPrice: 0,
        totalQuantity: 0,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addToCart.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(addToCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data;
            console.log("Payload:", action.payload); // 👀
        });
        builder.addCase(addToCart.rejected, (state) => {
            state.isLoading = false;
            state.cartItems = [];
        });
        builder.addCase(fetchCartItems.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchCartItems.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data;
        });
        builder.addCase(fetchCartItems.rejected, (state) => {
            state.isLoading = false;
            state.cartItems = [];
        });
        builder.addCase(updateCartItem.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateCartItem.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data;
        });
        builder.addCase(updateCartItem.rejected, (state) => {
            state.isLoading = false;
            state.cartItems = [];
        });
        builder.addCase(deleteCartItem.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteCartItem.fulfilled, (state, action) => {
            state.isLoading = false;
            console.log("deleteCartItem payload:", action.payload);
            state.cartItems = action.payload.data;
        });
        builder.addCase(deleteCartItem.rejected, (state) => {
            state.isLoading = false;
            state.cartItems = [];
        });
    },
});

export default shoppingCartSlice.reducer;
