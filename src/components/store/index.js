import { configureStore } from '@reduxjs/toolkit'
import formDataReducer from "../redux/formSlice.js";
export const store = configureStore({
    reducer: {
        formData: formDataReducer,
    },
});
