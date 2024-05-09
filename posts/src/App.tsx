import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootPage from "@/pages/RootPage";
import ErrorPage from "@/pages/ErrorPage";
import CreatePost from "@/pages/Post/CreatePost";
import PostDetails from "@/pages/Post/PostDetails";
import "@/App.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/create-post",
        element: <CreatePost />
      },
      {
        path: "/post-details",
        element: <PostDetails />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;