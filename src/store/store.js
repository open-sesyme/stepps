import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../slices/authSlice';
import recognitionReducer from '../slices/recognitionSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        recognition: recognitionReducer,
    },
});

export default store;