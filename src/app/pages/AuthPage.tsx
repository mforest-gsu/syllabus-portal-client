import { useEffect, useState } from "react";
import { Navigate, useRouteContext, useSearch } from "@tanstack/react-router";
import { useAppDispatch, authStore } from "app/store";

export default function AuthPage() {
  const { auth } = useRouteContext({ from: "/auth" });
  const { accessToken, expiresIn } = useSearch({ from: "/auth" });
  const dispatch = useAppDispatch();
  const [processed, setProcessed] = useState(accessToken === auth.authToken.accessToken);

  useEffect(() => {
    if (!processed) {
      dispatch(
        authStore.setAuthToken({
          accessToken: accessToken,
          expiresOn: Math.floor(new Date().getTime() / 1000) + expiresIn,
        })
      );
      setProcessed(true);
    }
  }, [auth, accessToken, expiresIn, dispatch, processed]);

  return processed ? <Navigate to="/" /> : null;
}
