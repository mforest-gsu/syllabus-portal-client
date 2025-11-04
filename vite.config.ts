import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules/@mui/x-internal-exceljs-fork")) {
            return "exceljs";
          }
          if (id.includes("node_modules/@mui/x-data-grid-pr")) {
            return "mui-data-grid-pro";
          }
          if (id.includes("node_modules/@mui/x-data-grid")) {
            return "mui-data-grid";
          }
          if (id.includes("node_modules/@mui") || id.includes("node_modules/@emotion")) {
            return "mui";
          }
          if (id.includes("node_modules/")) {
            return "vendor";
          }
          return "index";
        },
      },
    },
  },
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
    tsconfigPaths(),
  ],
});
