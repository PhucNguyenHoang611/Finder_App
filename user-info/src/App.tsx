import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootPage from "@/pages/RootPage";
import ErrorPage from "@/pages/ErrorPage";
import "@/App.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;