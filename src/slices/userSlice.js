import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchUserStart: (state) => {
            state.loading = true;
            state.currentUser = null;
        },
        fetchUserSuccess: (state, action) => {
            state.error = null;
            state.loading = false;
            state.currentUser = action.payload;
        },
        fetchUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {fetchUserStart, fetchUserSuccess, fetchUserFailure} = userSlice.actions;
export const selectCurrentUser = (state) => state.user.currentUser;

export default userSlice.reducer;