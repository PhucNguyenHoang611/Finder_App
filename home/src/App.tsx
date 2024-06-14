import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.scss";
import RootPage from "@/pages/RootPage";
import ErrorPage from "@/pages/ErrorPage";
import Home from "@/pages/Home";
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import Dashboard from "@/pages/Dashboard";
import ResetPassword from "@/pages/auth/ResetPassword";

import { setAPIBaseUrl } from "@/config/api";
import { DevTools } from "jotai-devtools";
import "jotai-devtools/styles.css";
import { useSignedInUserAtom } from "./store";
import { signInValidate } from "./middlewares/auth";
import { useEffect } from "react";
import ResetPasswordConfirm from "@/pages/auth/ResetPasswordConfirm";
import AboutUs from "@/pages/AboutUs";
import ScamWarning from "@/pages/ScamWarning";
import ForbiddenPage from "@/pages/ForbiddenPage";

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
            index: true
          },
          {
            path: "about-us",
            element: <AboutUs />
          },
          {
            path: "scam-warning",
            element: <ScamWarning />
          }
        ]
      },
      {
        path: "sign-in",
        element: <SignIn />
      },
      {
        path: "sign-up",
        element: <SignUp />
      },
      {
        path: "forgot-password",
        element: <ResetPassword />
      },
      {
        path: "reset-password/:token",
        element: <ResetPasswordConfirm />
      }
    ]
  },
  {
    path: "forbidden",
    element: <ForbiddenPage />
  }
]);

function App() {
  const [signedInUser, setSignedInUser] = useSignedInUserAtom();

  setAPIBaseUrl();

  useEffect(() => {
    if (signedInUser.email) {
      signInValidate(signedInUser, setSignedInUser);
    }
  }, [signedInUser, setSignedInUser]);

  return (
    <>
      <RouterProvider router={router} />
      <DevTools />
    </>
  );
}

export default App;
