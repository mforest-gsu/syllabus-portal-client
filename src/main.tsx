import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { LicenseInfo } from "@mui/x-license";

LicenseInfo.setLicenseKey(import.meta.env.VITE_MUI_LICENCE_KEY);

const App = lazy(() => import("app"));
const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <Suspense>
        <App />
      </Suspense>
    </StrictMode>
  );
}
