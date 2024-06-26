import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "noti-chat",
      filename: "notiChat.js",
      exposes: {
        "./ChatPopover": "./src/components/Chat/ChatPopover.tsx",
        "./NotifyPage": "./src/pages/NotificationPage.tsx"
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
