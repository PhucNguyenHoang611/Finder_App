import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.scss";
import RootPage from "@/pages/RootPage";
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import ErrorPage from "@/pages/ErrorPage";
import ResetPassword from "./pages/auth/ResetPassword";
import PostPage from "./pages/PostPage";
import Home from "./pages/Home";
import FindPage from "./pages/FindPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
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
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
