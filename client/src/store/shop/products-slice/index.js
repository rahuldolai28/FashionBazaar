import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/lib//api";

const initialState = {
    isLoading: null,
    products: [],
    productsDetails: null,
};

export const fetchAllFilteredProducts = createAsyncThunk(
    "/products/fetchAllProducts",
    async ({ filterParams, sortParams }, { rejectWithValue }) => {
        try {
            const query = new URLSearchParams({
                ...filterParams,
                sortBy: sortParams,
            });

            const result = await api.get(`/shop/products/get?${query}`);
            return result?.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchProductDetails = createAsyncThunk(
    "/products/fetchProductDetails",
    async ({ id }, { rejectWithValue }) => {
        try {
            if (!id) return rejectWithValue("Invalid product ID");

            const result = await api.get(`/shop/products/get/${id}`);
            return result?.data;
        } catch (error) {
            return rejectWithValue("Product ID is missing");
        }
    }
);

const shoppingProductsSlice = createSlice({
    name: "shoppingProducts",
    initialState,
    reducers: {
        setProductDetails: (state) =>{
            state.productsDetails = null;
        }
    },
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
            })
            .addCase(fetchProductDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productsDetails = action.payload.data;
            })
            .addCase(fetchProductDetails.rejected, (state) => {
                state.isLoading = false;
                state.productsDetails = [];
            });
    },
});

export default shoppingProductsSlice.reducer;

export const {setProductDetails} = shoppingProductsSlice.actions;