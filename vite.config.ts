import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  plugins: [react()],
  optimizeDeps: {
    include: ["@emotion/react", "@emotion/styled"],
  },
});
