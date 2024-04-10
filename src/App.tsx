import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import RootPage from "@/pages/RootPage";
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import ErrorPage from "@/pages/ErrorPage";
import "./App.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: []
  },
  {
    path: "/sign-in",
    element: <SignIn />
  },
  {
    path: "/sign-up",
    element: <SignUp />
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;