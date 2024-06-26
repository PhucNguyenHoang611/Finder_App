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
        homeApp: "http://localhost:5010/assets/home.js",
        authApp: "http://localhost:5002/assets/auth.js",
        userInfo: "http://localhost:5003/assets/userInfo.js",
        posts: "http://localhost:5004/assets/posts.js",
        notiChat: "http://localhost:5005/assets/notiChat.js"
      },
      shared: ["react", "react-dom", "react-router-dom", "@apollo/client"]
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  build: {
    target: "esnext",
    minify: true,
    cssCodeSplit: false
  }
});
