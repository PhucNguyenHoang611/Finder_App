import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "notiChat",
      filename: "notiChat.js",
      exposes: {
        "./ChatPopover": "./src/components/Chat/ChatPopover.tsx",
        "./NotifyPage": "./src/pages/NotificationPage.tsx"
      },
      shared: ["react", "react-dom"]
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false
  }
});
