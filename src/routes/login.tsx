import { lazy } from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import isValidAuthToken from "app/utils/isValidAuthToken";

const LoginPage = lazy(() => import("app/pages/LoginPage"));

export const Route = createFileRoute("/login")({
  beforeLoad: ({ context }) => {
    if (isValidAuthToken(context.auth.authToken)) {
      throw redirect({ to: "/" });
    }
  },
  component: LoginPage,
});
