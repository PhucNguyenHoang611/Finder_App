import { Route, Routes } from "react-router-dom";
import RootPage from "./pages/RootPage";
import UserInfo from "@/pages/UserInfo";
import UpdateInfo from "@/pages/UpdateInfo";
import ChangePassword from "@/pages/ChangePassword";
import MyPosts from "@/pages/MyPosts";
import RegisterNewsletter from "@/pages/RegisterNewsletter";

const Bootstrap = () => {
  return (
    <Routes>
      <Route path="/" element={<RootPage />}>
        <Route path="user-info" element={<UserInfo />} />
        <Route path="my-posts" element={<MyPosts />} />
        <Route path="update-info" element={<UpdateInfo />} />
        <Route path="register-newsletter" element={<RegisterNewsletter />} />
        <Route path="change-password" element={<ChangePassword />} />
      </Route>
    </Routes>
  );
};

export default Bootstrap;
