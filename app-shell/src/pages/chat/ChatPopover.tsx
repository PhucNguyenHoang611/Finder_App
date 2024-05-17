import ErrorBoundary from "@/error/ErrorBoundary";
import Loading from "@/error/Loading";
import { Suspense, lazy } from "react";

const ChatBox = lazy(() => import("notiChat/ChatPopover"));

const ChatPopover = () => {
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <ChatBox />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default ChatPopover;
