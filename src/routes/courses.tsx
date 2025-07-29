import { lazy } from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import isValidAuthToken from "app/utils/isValidAuthToken";

const CoursesPage = lazy(() => import("app/pages/CoursesPage"));

export const Route = createFileRoute("/courses")({
  component: CoursesPage,
  beforeLoad: ({ context }) => {
    if (!isValidAuthToken(context.auth.authToken)) {
      throw redirect({ to: "/login" });
    }
  },
});
