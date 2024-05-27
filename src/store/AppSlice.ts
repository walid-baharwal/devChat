import { Conversation } from "@/types/ApiResponse";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IAppState {
  appConversations: Conversation[];
}

const initialState: IAppState = {
  appConversations:[],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppConversations: (state, action: PayloadAction<Conversation[]>) => {
      state.appConversations = action.payload;
    },
  },
});

export const { setAppConversations } = appSlice.actions;
export const appReducer = appSlice.reducer;
