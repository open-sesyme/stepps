import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../slices/authSlice';
import recognitionReducer from '../slices/recognitionSlice';
import toastSlice from "../slices/toastSlice";
import userReducer from "../slices/userSlice"
import employeeReducer from "../slices/employeeSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        recognition: recognitionReducer,
        toast: toastSlice,
        user: userReducer,
        employee: employeeReducer,
    },
});

export default store;