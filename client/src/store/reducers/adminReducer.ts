import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/general";
export type AdminNotifications = {
  isReaded: boolean;
  isAccepted: boolean;
  user: Omit<User, "id"> & { _id: string };
};
export type AdminReducerState = {
  adminPassword: string;
  adminNotifications: AdminNotifications[];
};

const initialState: AdminReducerState = {
  adminPassword: "",
  adminNotifications: [],
};

const adminReducer = createSlice({
  name: "adminReducer",
  initialState,
  reducers: {
    setAdminPassword: (state, { payload }) => {
      state.adminPassword = payload;
    },
    addAdminNotifications: (state, { payload }) => {
      state.adminNotifications = payload;
    },
  },
});

export const { setAdminPassword, addAdminNotifications } = adminReducer.actions;
export default adminReducer.reducer;
