import ErrorBoundary from "@/error/ErrorBoundary";
import Loading from "@/error/Loading";
import { Suspense, lazy } from "react";

const Forbidden = lazy(() => import("homeApp/Forbidden"));

const ForbiddenPage = () => {
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Forbidden />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default ForbiddenPage;
