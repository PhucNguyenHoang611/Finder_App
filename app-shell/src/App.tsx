// import "./App.css";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import UserInfo from "@/pages/UserInfo";
import Signin from "homeApp/Signin";
import Signup from "homeApp/Signup";
// import Auth from "authApp/Auth";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootPage from "./pages/RootPage";
import ErrorPage from "./pages/ErrorPage";
// import CreatePost from "./pages/posts/CreatePost";
// import PostDetails from "./pages/posts/PostDetails";
// import PostResultList from "./pages/posts/PostResultList";
// import NewsPage from "./pages/posts/NewsPage";
import PostApp from "./pages/posts/PostApp";

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
            element: <Home />,
          },
          // {
          //   path: "/post-details",
          //   element: <PostDetails />,
          // },
          // {
          //   path: "/result-list",
          //   element: <PostResultList />,
          // },
          // {
          //   path: "/news",
          //   element: <NewsPage />,
          // },
          // {
          //   path: "/create-post",
          //   element: <CreatePost />,
          // },
          {
            path: "/*",
            element: <PostApp />,
          },
        ],
      },
      {
        path: "/*",
        element: <UserInfo />,
      },
      {
        path: "/sign-in",
        element: <Signin />,
      },
      {
        path: "/sign-up",
        element: <Signup />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
