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
      filename: "remoteEntry.js",
      exposes: {
        
      },
      shared: ["react", "react-dom"]
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname,"./src")
    }
  }
});