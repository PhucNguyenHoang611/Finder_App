import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "posts",
      filename: "posts.js",
      exposes: {
        "./CreatePost": "./src/pages/Post/CreatePost.tsx",
        "./PostDetails": "./src/pages/Post/PostDetails.tsx",
        "./PostResultList": "./src/pages/Post/PostResultList.tsx",
        "./NewsPage": "./src/pages/News/NewsPage.tsx",
        "./Bootstrap": "./src/Bootstrap.tsx",
        "./apolloConfig": "./src/config/apollo.ts"
      },
      shared: [
        "react",
        "react-dom",
        "react-router-dom",
        "jotai",
        "graphql",
        "@apollo/client",
        "socket.io-client"
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
