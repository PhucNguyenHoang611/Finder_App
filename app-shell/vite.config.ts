import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "app-shell",
      remotes: {
        homeApp: "http://localhost:5001/assets/home.js",
        authApp: "http://localhost:5002/assets/auth.js",
        userInfo: "http://localhost:5003/assets/userInfo.js",
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
    target: "esnext",
    minify: true,
  },
});
