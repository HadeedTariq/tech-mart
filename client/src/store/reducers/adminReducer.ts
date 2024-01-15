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
  allUsers: (Omit<User, "id"> & { _id: string })[];
};

const initialState: AdminReducerState = {
  adminPassword: "",
  adminNotifications: [],
  allUsers: [],
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
    addUsers: (state, { payload }) => {
      state.allUsers = payload;
    },
  },
});

export const { setAdminPassword, addAdminNotifications, addUsers } =
  adminReducer.actions;
export default adminReducer.reducer;
