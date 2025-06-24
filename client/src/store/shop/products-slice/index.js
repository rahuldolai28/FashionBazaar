import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/lib//api";


const initialState = {
    isLoading: null,
    products: [],
};

export const fetchAllFilteredProducts = createAsyncThunk(
    "/products/fetchAllProducts",
    async ({ filterParams, sortParams }, { rejectWithValue }) => {
        try {
            const query = new URLSearchParams({
                ...filterParams,
                sortBy: sortParams,
            });

            const result = await api.get(
                `/shop/products/get?${query}`
            );
            return result?.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const shoppingProductsSlice = createSlice({
    name: "shoppingProducts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllFilteredProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload.data;
            })
            .addCase(fetchAllFilteredProducts.rejected, (state) => {
                state.isLoading = false;
                state.products = [];
            });
    },
});

export default shoppingProductsSlice.reducer;
