import ErrorBoundary from "@/error/ErrorBoundary";
import Loading from "@/error/Loading";
import { Suspense, lazy } from "react";

const AboutUs = lazy(() => import("homeApp/AboutUs"));

const AboutUsPage = () => {
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <AboutUs />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default AboutUsPage;
