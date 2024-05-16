import ErrorBoundary from "@/error/ErrorBoundary";
import Loading from "@/error/Loading";
import { Suspense, lazy } from "react";

const Notify = lazy(() => import("notiChat/NotifyPage"));

const NotifyPage = () => {
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Notify />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default NotifyPage;
