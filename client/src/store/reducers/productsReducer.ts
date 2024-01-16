import { createSlice } from "@reduxjs/toolkit";
import { Products } from "../../types/general";
export type ProductsReducerState = {
  products: Products[];
  cart: Products[];
  categories: readonly string[];
};
const initialState: ProductsReducerState = {
  products: [],
  cart: [],
  categories: [],
};

const productReducer = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    setProductsAndCategories: (
      state,
      {
        payload,
      }: {
        payload: {
          products: Products[];
          categories: any;
        };
      }
    ) => {
      state.products = payload.products;
      state.categories = payload.categories;
    },
    addToCart: (state, { payload }: { payload: Products }) => {
      const isProductAlreadyInCart = state.cart.find(
        (product) => product._id === payload._id
      );
      if (isProductAlreadyInCart) {
        return;
      }
      state.cart = [...state.cart, payload].reverse();
    },
    removeFromCart: (state, { payload }) => {
      const products = state.cart.filter((prod) => prod._id !== payload._id);
      state.cart = products;
    },
  },
});

export const { setProductsAndCategories, addToCart, removeFromCart } =
  productReducer.actions;
export default productReducer.reducer;
