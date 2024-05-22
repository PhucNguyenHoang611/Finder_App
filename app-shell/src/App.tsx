// import "./App.css";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import UserInfo from "@/pages/UserInfo";
import Signin from "homeApp/Signin";
import Signup from "homeApp/Signup";
import ResetPassword from "homeApp/ResetPassword";
import { useSignedInUserAtom } from "homeApp/store";
import { setAPIBaseUrl } from "homeApp/apiConfig";
import { signInValidate } from "homeApp/authMiddleware";
// import Auth from "authApp/Auth";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootPage from "./pages/RootPage";
import ErrorPage from "./pages/ErrorPage";
import CreatePost from "./pages/posts/CreatePost";
import PostDetails from "./pages/posts/PostDetails";
import PostResultList from "./pages/posts/PostResultList";
import NewsPage from "./pages/posts/NewsPage";
import NotifyPage from "./pages/chat/NotifyPage";
import { useEffect } from "react";

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
            path: "/post-details",
            element: <PostDetails />
          },
          {
            path: "/result-list",
            element: <PostResultList />
          },
          {
            path: "/news",
            element: <NewsPage />
          },
          {
            path: "/create-post",
            element: <CreatePost />
          },
          {
            path: "/notification",
            element: <NotifyPage />
          }
        ]
      },
      {
        path: "/*",
        element: <UserInfo />
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
        path: "/reset-password",
        element: <ResetPassword />
      }
    ]
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

  return <RouterProvider router={router} />;
}

export default App;
