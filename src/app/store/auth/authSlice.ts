import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import initialState from "app/store/auth/initialState";
import type { AuthToken } from "app/types";

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthToken: (state, action: PayloadAction<AuthToken>) => {
      state.authToken = action.payload;
      window.localStorage.setItem("authToken", JSON.stringify(action.payload));
    },
    clearAuthToken: (state) => {
      state.authToken = {
        accessToken: "",
        expiresOn: 0,
      };
      window.localStorage.removeItem("authToken");
    },
  },
});

export default authSlice;
