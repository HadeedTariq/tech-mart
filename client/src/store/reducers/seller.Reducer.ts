import { createSlice } from "@reduxjs/toolkit";
import { Chats } from "../../types/general";

export type ChatBar = {
  message: string;
  username: string;
};
export type SellerReducerState = {
  chats: Chats[];
  chatBar: ChatBar[];
};

const initialState: SellerReducerState = {
  chats: [],
  chatBar: [],
};

const sellerReducer = createSlice({
  name: "sellerReducer",
  initialState,
  reducers: {
    setSellerChats: (state, { payload }: { payload: Chats[] }) => {
      state.chats = payload;
    },
    setSellerChatBar: (state, { payload }: { payload: ChatBar[] }) => {
      state.chatBar = payload;
    },
  },
});

export const { setSellerChats, setSellerChatBar } = sellerReducer.actions;
export default sellerReducer.reducer;
