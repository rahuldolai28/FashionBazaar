import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isAuthenticated: false,
    user: null,
    loading: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
    },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;