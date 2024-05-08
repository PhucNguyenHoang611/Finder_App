import ErrorBoundary from "@/error/ErrorBoundary";
import Loading from "@/error/Loading";
import { Suspense, lazy } from "react";

const Sidebar = lazy(() => import("homeApp/Sidebar"));

const SidebarPage = () => {
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Sidebar />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default SidebarPage;
