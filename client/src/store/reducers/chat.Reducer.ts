import { createSlice } from "@reduxjs/toolkit";
import { Chats } from "../../types/general";

export type ChatReducerState = {
  chats: Chats[];
};
const initialState: ChatReducerState = {
  chats: [],
};

const chatReducer = createSlice({
  name: "chatReducer",
  initialState,
  reducers: {
    addchats: (state, { payload }) => {
      state.chats = payload;
    },
  },
});

export const { addchats } = chatReducer.actions;
export default chatReducer.reducer;
