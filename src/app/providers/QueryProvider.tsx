import type { PropsWithChildren } from "react";
import { QueryClient as ReactQuery, QueryClientProvider as ReactQueryProvider } from "@tanstack/react-query";

const queryClient = new ReactQuery();

export function QueryProvider(props: PropsWithChildren) {
  return <ReactQueryProvider client={queryClient}>{props.children}</ReactQueryProvider>;
}
