import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/lib//api";

const initialState = {
    isLoading: null,
    bannerImageList: [],
};

export const getBannerImages = createAsyncThunk(
    "/banner/getBannerImages",
    async (_, { rejectWithValue }) => {
        try {
            const result = await api.get(`/common/banner/get`);
            return result?.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addBannerImage = createAsyncThunk(
    "/banner/addBannerImage",
    async ({ image }, { rejectWithValue }) => {
        try {
            if (!image) return rejectWithValue("Invalid image URL ");

            const result = await api.post(`/common/banner/add`, { image });
            return result?.data;
        } catch (error) {
            return rejectWithValue("Image URL is missing");
        }
    }
);

const commonSlice = createSlice({
    name: "commonSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBannerImages.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBannerImages.fulfilled, (state, action) => {
                state.isLoading = false;
                state.bannerImageList = action.payload.data;
            })
            .addCase(getBannerImages.rejected, (state) => {
                state.isLoading = false;
                state.bannerImageList = [];
            })
            .addCase(addBannerImage.pending, (state) => {
                state.isLoading = true;
            })
            // .addCase(addBannerImage.fulfilled, (state, action) => {
            //     state.isLoading = false;
            //     state.bannerImageListDetails = action.payload.data;
            // })
            // .addCase(addBannerImage.rejected, (state) => {
            //     state.isLoading = false;
            //     state.bannerImageListDetails = [];
            // });
    },
});

export default commonSlice.reducer;
