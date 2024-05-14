import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootPage from "@/pages/RootPage";
import ErrorPage from "@/pages/ErrorPage";
import NotificationPage from "@/pages/NotificationPage";
import "@/App.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/notification",
        element: <NotificationPage />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
