import { lazy } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import AuthPage from "app/pages/AuthPage";
const ErrorPage = lazy(() => import("app/pages/ErrorPage"));

export const Route = createFileRoute("/auth")({
  validateSearch: z.object({
    accessToken: z.string().catch(""),
    expiresIn: z.number().positive().catch(0),
  }),
  component: AuthPage,
  errorComponent: ErrorPage,
});
