import Fallback from "@/error/Fallback";
import { Suspense, lazy } from "react";

const UserInfo = lazy(() => import("userInfo/UserInfo"));

const UserInfoPage = () => {
  return (
    <>
      <Suspense fallback={<Fallback />}>
        <UserInfo />
      </Suspense>
    </>
  );
};

export default UserInfoPage;
