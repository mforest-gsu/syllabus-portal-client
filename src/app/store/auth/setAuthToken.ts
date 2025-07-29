import type { AuthSetAuthTokenPayload, AuthState } from "app/types";

export default function setAuthToken(state: AuthState, action: AuthSetAuthTokenPayload) {
  state.authToken = action.payload;
  window.localStorage.setItem("authToken", JSON.stringify(action.payload));
}
