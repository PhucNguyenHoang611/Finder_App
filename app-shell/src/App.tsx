// import Auth from "authApp/Auth";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import UserInfo from "@/pages/UserInfo";
import Signin from "homeApp/Signin";
import Signup from "homeApp/Signup";
import ResetPassword from "homeApp/ResetPassword";
import ResetPasswordConfirm from "homeApp/ResetPasswordConfirm";
import AboutUs from "@/pages/home/AboutUs";
import ScamWarning from "@/pages/home/ScamWarning";
import { useSignedInUserAtom } from "homeApp/store";
import { setAPIBaseUrl } from "homeApp/apiConfig";
import { signInValidate } from "homeApp/authMiddleware";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootPage from "./pages/RootPage";
import ErrorPage from "./pages/ErrorPage";
import ForbiddenPage from "./pages/ForbiddenPage";
import CreatePost from "./pages/posts/CreatePost";
import PostDetails from "./pages/posts/PostDetails";
import PostResultList from "./pages/posts/PostResultList";
import NewsPage from "./pages/posts/NewsPage";
import NotifyPage from "./pages/chat/NotifyPage";
import { useEffect } from "react";
import PrivateRoute from "./pages/PrivateRoute";
import { ToastContainer } from "react-toastify";

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
            path: "/",
            element: <Home />
          },
          {
            path: "/post-details/:postId",
            element: <PostDetails />
          },
          {
            path: "/result-list",
            element: <PostResultList />
          },
          {
            path: "/about-us",
            element: <AboutUs />
          },
          {
            path: "/scam-warning",
            element: <ScamWarning />
          },
          {
            path: "/news",
            element: <NewsPage />
          },
          {
            path: "/create-post",
            element: (
              <PrivateRoute>
                <CreatePost />
              </PrivateRoute>
            )
          },
          {
            path: "/notification",
            element: (
              <PrivateRoute>
                <NotifyPage />
              </PrivateRoute>
            )
          }
        ]
      },
      {
        path: "/*",
        element: (
          <PrivateRoute>
            <UserInfo />
          </PrivateRoute>
        )
      },
      {
        path: "/sign-in",
        element: <Signin />
      },
      {
        path: "/sign-up",
        element: <Signup />
      },
      {
        path: "/forgot-password",
        element: <ResetPassword />
      },
      {
        path: "/reset-password/:token",
        element: <ResetPasswordConfirm />
      }
    ]
  },
  {
    path: "/forbidden",
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
      <ToastContainer />
    </>
  );
}

export default App;
