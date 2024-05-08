import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootPage from "@/pages/RootPage";
import ErrorPage from "@/pages/ErrorPage";
import UserInfo from "@/pages/UserInfo";
import UpdateInfo from "@/pages/UpdateInfo";
import ChangePassword from "@/pages/ChangePassword";
import MyPosts from "@/pages/MyPosts";
import RegisterNewsletter from "@/pages/RegisterNewsletter";
import "@/App.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "user-info",
        element: <UserInfo />,
      },
      {
        path: "my-posts",
        element: <MyPosts />,
      },
      {
        path: "update-info",
        element: <UpdateInfo />,
      },
      {
        path: "register-newsletter",
        element: <RegisterNewsletter />,
      },
      {
        path: "change-password",
        element: <ChangePassword />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
