import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";
import { ViteMinifyPlugin } from "vite-plugin-minify";
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
  plugins: [
    react(),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: "brotliCompress",
      ext: ".br",
    }),
    ViteMinifyPlugin(),
  ],
  optimizeDeps: {
    include: ["@emotion/react", "@emotion/styled"],
  },
  build: {
    rollupOptions: {
      treeshake: true,
    },
  },
});
