import ErrorBoundary from "@/error/ErrorBoundary";
import Loading from "@/error/Loading";
import { Suspense, lazy } from "react";

const ImportComponent = lazy(() => import("posts/CreatePost"));

const Page = () => {
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <ImportComponent />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default Page;
