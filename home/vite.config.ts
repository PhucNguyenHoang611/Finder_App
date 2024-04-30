import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "home",
      filename: "home.js",
      exposes: {
        "./Home": "./src/App.tsx",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: true,
  },
  // build: {
  //   target: "es2022", // Set your target environment here
  //   outDir: "dist", // The output directory for the build
  //   assetsDir: "assets", // The directory to nest generated assets under
  //   sourcemap: true, // Generate source maps
  // },
});
