import axios from "axios";
import {
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";
import api from "@/lib//api";

const initialState = {
    productList: [],
    isLoading: false,
};

export const addNewProduct = createAsyncThunk(
    "/products/addNewProduct",
    async (formData, { rejectWithValue }) => {
        try {
            const result = await api.post(
                "/admin/products/add",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return result?.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchAllProducts = createAsyncThunk(
    "/products/fetchAllProducts",
    async (_, { rejectWithValue }) => {
        try {
            const result = await api.get(
                "/admin/products/get"
            );
            return result?.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const editProduct = createAsyncThunk(
    "/products/editProduct",
    async ({formData, id }, { rejectWithValue }) => {
        try {
            const result = await api.put(
                `/admin/products/edit/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return result?.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    "/products/deleteProduct",
    async (id, { rejectWithValue }) => {
        try {
            const result = await api.delete(
                `/admin/products/delete/${id}`
            );
            return result?.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const adminProductsSlice = createSlice({
    name: "adminProducts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // .addCase(addNewProduct.pending, (state) => {
            //     state.isLoading = true;
            // })
            // .addCase(addNewProduct.fulfilled, (state, action) => {
            //     state.isLoading = false;
            //     state.productList.push(action.payload);
            // })
            // .addCase(addNewProduct.rejected, (state) => {
            //     state.isLoading = false;
            // })
            .addCase(fetchAllProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productList = action.payload;
            })
            .addCase(fetchAllProducts.rejected, (state) => {
                state.isLoading = false;
                state.productList = [];
            })
            // .addCase(editProduct.pending, (state) => {
            //     state.isLoading = true;
            // })
            // .addCase(editProduct.fulfilled, (state, action) => {
            //     state.isLoading = false;
            //     const index = state.productList.findIndex(
            //         (product) => product._id === action.payload._id
            //     );
            //     if (index !== -1) {
            //         state.productList[index] = action.payload;
            //     }
            // })
            // .addCase(editProduct.rejected, (state) => {
            //     state.isLoading = false;
            // })
            // .addCase(deleteProduct.pending, (state) => {
            //     state.isLoading = true;
            // })
            // .addCase(deleteProduct.fulfilled, (state, action) => {
            //     state.isLoading = false;
            //     state.productList = state.productList.filter(
            //         (product) => product._id !== action.payload._id
            //     );
            // })
            // .addCase(deleteProduct.rejected, (state) => {
            //     state.isLoading = false;
            // });
    },
});

export default adminProductsSlice.reducer;
