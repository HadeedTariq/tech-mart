import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/general";

type UserPayload = {
  payload: User;
};
export type AuthReducerState = {
  user: null | User;
  auth: "register" | "login" | null;
};
const initialState: AuthReducerState = {
  user: null,
  auth: null,
};

const authReducer = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    setUser: (state, { payload }: UserPayload) => {
      state.user = payload;
    },
    logoutUser: (state) => {
      state.user = null;
    },
    setAuth: (
      state,
      {
        payload,
      }: {
        payload: AuthReducerState["auth"];
      }
    ) => {
      if (state.auth === "login" && payload === "login") {
        state.auth = null;
        return;
      } else if (state.auth === "register" && payload === "register") {
        state.auth = null;
        return;
      }
      state.auth = payload;
    },
  },
});

export const { setUser, logoutUser, setAuth } = authReducer.actions;
export default authReducer.reducer;
