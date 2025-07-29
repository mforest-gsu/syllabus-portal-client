import type { AuthToken } from "app/types";

export default function isValidAuthToken(authToken: AuthToken) {
  const rightNow = Math.floor(new Date().getTime() / 1000);
  return authToken.expiresOn > rightNow;
}
