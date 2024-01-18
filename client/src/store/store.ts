import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import productsReducer from "./reducers/productsReducer";
import adminReducer from "./reducers/adminReducer";
import chatReducer from "./reducers/chat.Reducer";

export const store = configureStore({
  reducer: {
    authReducer,
    productsReducer,
    adminReducer,
    chatReducer,
  },
});
