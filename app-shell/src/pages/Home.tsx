import ErrorBoundary from "@/error/ErrorBoundary";
import Loading from "@/error/Loading";
import { Suspense, lazy } from "react";

const Home = lazy(() => import("homeApp/Home"));

const HomePage = () => {
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Home />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default HomePage;
