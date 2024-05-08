import Fallback from "@/error/Fallback";
import ErrorBoundary from "@/error/ErrorBoundary";
import { Suspense, lazy } from "react";

const UserInfo = lazy(() => import("userInfo/UserInfo"));

const UserInfoPage = () => {
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<Fallback />}>
          <UserInfo />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default UserInfoPage;
