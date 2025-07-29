import authSlice from "app/store/auth/authSlice";

export const { setAuthToken, clearAuthToken } = authSlice.actions;
export default authSlice.reducer;
