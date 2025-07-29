import { createFileRoute, redirect } from "@tanstack/react-router";
import isValidAuthToken from "app/utils/isValidAuthToken";

export const Route = createFileRoute("/")({
  beforeLoad: ({ context }) => {
    throw redirect({
      to: isValidAuthToken(context.auth.authToken) ? "/courses" : "/login",
    });
  },
  component: () => null,
});
