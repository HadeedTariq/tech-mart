import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import productsReducer from "./reducers/productsReducer";
import adminReducer from "./reducers/adminReducer";

export const store = configureStore({
  reducer: {
    authReducer,
    productsReducer,
    adminReducer,
  },
});
