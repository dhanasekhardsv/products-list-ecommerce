import { configureStore } from "@reduxjs/toolkit";
import { configReducer } from "./config/configSlice";
import { productsReducer } from "./products/productsSlice";

const store = configureStore({
    reducer: {
        config: configReducer,
        products: productsReducer
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({ thunk: true });
    }
})

export default store;