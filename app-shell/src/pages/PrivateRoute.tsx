/* eslint-disable @typescript-eslint/no-unused-vars */
import { notify } from "@/config/toastConfig";
import { Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const signedInUser = JSON.parse(localStorage.getItem("signedInUser") || "{}");

  if (!signedInUser.accessToken) {
    notify("Vui lòng đăng nhập để tiếp tục !");
    return (
      <>
        <Navigate to="/sign-in" />
        <ToastContainer />
      </>
    );
  }

  return children;
};

export default PrivateRoute;
