import { RouterProvider as ReactRouterProvider, createRouter as createReactRouter } from "@tanstack/react-router";
import { useAppSelector } from "app/store";
import { routeTree } from "routeTree.gen";

const router = createReactRouter({
  basepath: import.meta.env.BASE_URL,
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
  context: {
    auth: undefined!,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function RouterProvider() {
  const auth = useAppSelector((state) => state.auth);
  return <ReactRouterProvider router={router} context={{ auth }} />;
}
