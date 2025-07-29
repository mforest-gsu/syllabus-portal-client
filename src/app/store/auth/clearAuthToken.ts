import type { AuthState } from "app/types";

export default function clearAuthToken(state: AuthState) {
  state.authToken = {
    accessToken: "",
    expiresOn: 0,
  };
  window.localStorage.removeItem("authToken");
}
