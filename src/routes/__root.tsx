import { lazy } from "react";
import { createRootRouteWithContext } from "@tanstack/react-router";
import type { AuthState } from "app/types";

const RootPage = lazy(() => import("app/pages/RootPage"));
const NotFoundPage = lazy(() => import("app/pages/NotFoundPage"));
const ErrorPage = lazy(() => import("app/pages/ErrorPage"));

interface AppRootRouteWithContext {
  auth: AuthState;
}

export const Route = createRootRouteWithContext<AppRootRouteWithContext>()({
  component: RootPage,
  notFoundComponent: NotFoundPage,
  errorComponent: ErrorPage,
});
