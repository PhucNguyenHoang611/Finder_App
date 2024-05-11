import ErrorBoundary from "@/error/ErrorBoundary";
import Loading from "@/error/Loading";
import { Suspense, lazy } from "react";

const Header = lazy(() => import("homeApp/Header"));

const HeaderComponent = () => {
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Header />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default HeaderComponent;
