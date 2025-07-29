import type { AuthState, AuthToken } from "app/types";

const defaultAuthToken: AuthToken = {
  accessToken: "",
  expiresOn: 0,
};

export default function initialState(): AuthState {
  const authState: AuthState = {
    apiUrl: import.meta.env.VITE_API_URL,
    authToken: defaultAuthToken,
  };

  try {
    const item = window.localStorage.getItem("authToken");
    authState.authToken = item ? (JSON.parse(item) as AuthToken) : defaultAuthToken;
  } catch {
    authState.authToken = defaultAuthToken;
  }

  return authState;
}
