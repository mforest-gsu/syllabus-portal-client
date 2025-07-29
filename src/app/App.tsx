import { QueryProvider, RouterProvider, StoreProvider } from "app/providers";

export function App() {
  return (
    <StoreProvider>
      <QueryProvider>
        <RouterProvider />
      </QueryProvider>
    </StoreProvider>
  );
}
