/* eslint-disable @typescript-eslint/no-unused-vars */
import ErrorBoundary from "@/error/ErrorBoundary";
import Loading from "@/error/Loading";
import { Suspense, lazy } from "react";

const Chat = lazy(() => import("notiChat/ChatPopover"));

const ChatPage = () => {
  return (
    <div className="fixed sm:right-4 right-2 sm:bottom-4 bottom-2">
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Chat />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default ChatPage;
