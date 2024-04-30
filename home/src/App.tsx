import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.scss";
import RootPage from "@/pages/RootPage";
import ErrorPage from "@/pages/ErrorPage";
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
