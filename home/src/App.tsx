import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.scss";
import RootPage from "@/pages/RootPage";
import ErrorPage from "@/pages/ErrorPage";
import PostPage from "./pages/PostPage";
import Home from "./pages/Home";
import FindPage from "./pages/FindPage";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Dashboard from "./pages/Dashboard";
import ResetPassword from "./pages/auth/ResetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
        children: [
          {
            element: <Home />,
            index: true,
          },
          {
            path: "/post",
            element: <PostPage />,
          },
          {
            path: `/filter`,
            element: <FindPage />,
          },
        ],
      },
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
