import ErrorBoundary from "@/error/ErrorBoundary";
import Loading from "@/error/Loading";
import { Suspense, lazy } from "react";

const ScamWarning = lazy(() => import("homeApp/ScamWarning"));

const ScamWarningPage = () => {
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <ScamWarning />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default ScamWarningPage;
