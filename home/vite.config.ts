import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        presets: ["jotai/babel/preset"]
      }
    }),
    federation({
      name: "home",
      filename: "home.js",
      exposes: {
        "./Home": "./src/pages/Home.tsx",
        "./Signin": "./src/pages/auth/Signin.tsx",
        "./Signup": "./src/pages/auth/Signup.tsx",
        "./ResetPassword": "./src/pages/auth/ResetPassword.tsx",
        "./ResetPasswordConfirm": "./src/pages/auth/ResetPasswordConfirm.tsx",
        "./AboutUs": "./src/pages/AboutUs.tsx",
        "./ScamWarning": "./src/pages/ScamWarning.tsx",
        "./Sidebar": "./src/components/nav/Sidebar.tsx",
        "./Header": "./src/components/nav/Header.tsx",
        "./store": "./src/store.ts",
        "./apiConfig": "./src/config/api.ts",
        "./authMiddleware": "./src/middlewares/auth.ts",
        "./Toaster": "./src/components/ui/sonner.tsx"
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
  // build: {
  //   target: "es2022", // Set your target environment here
  //   outDir: "dist", // The output directory for the build
  //   assetsDir: "assets", // The directory to nest generated assets under
  //   sourcemap: true, // Generate source maps
  // },
});
