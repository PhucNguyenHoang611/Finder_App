import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "user-info",
      filename: "userInfo.js",
      exposes: {
        "./UserInfo": "./src/Bootstrap.tsx",
        "./apolloConfig": "./src/config/apollo.ts"
      },
      shared: [
        "react",
        "react-dom",
        "react-router-dom",
        "jotai",
        "graphql",
        "@apollo/client"
      ]
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false
  }
});
