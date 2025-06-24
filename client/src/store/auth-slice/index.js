import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "@/lib//api";


const initialState = {
    isAuthenticated: false,
    user: null,
    isLoading: true,
};

export const registerUser = createAsyncThunk(
    "auth/register",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await api.post(
                "/auth/register",
                formData,
                {
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error) {
            console.error("Error during registration:", error);
            return rejectWithValue(
                error.response?.data || {
                    success: false,
                    message: "Registration failed",
                }
            );
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/login",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await api.post(
                "/auth/login",
                formData,
                {
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error) {
            console.error("Error during registration:", error);
            return rejectWithValue(
                error.response?.data || {
                    success: false,
                    message: "Registration failed",
                }
            );
        }
    }
);

export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.post(
                "/auth/logout",
                {},
                {
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error) {
            console.error("Error during Logout:", error);
            return rejectWithValue(
                error.response?.data || {
                    success: false,
                    message: "Logout failed",
                }
            );
        }
    }
);

export const checkAuth = createAsyncThunk("auth/checkauth", async () => {
    const response = await api.get(
        "/auth/check-auth",
        {
            withCredentials: true,
            headers: {
                "Cache-Control":
                    "no-cache, no-store, must-revalidate, proxy-revalidate",
                Expires: "0",
            },
        }
    );
    return response.data.user;
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {},
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = false; // in video it is false
                state.user = action.payload; // in video it is action.payload
            })
            .addCase(registerUser.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
            })

            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true; // in video it is false
                state.user = action.payload.user; // in video it is action.payload
            })
            .addCase(loginUser.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
            })

            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
            })
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
            })
            .addCase(logoutUser.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
            });
    },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
