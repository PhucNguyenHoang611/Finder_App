import ChatPopover from "@/components/Chat/ChatPopover";
import { Outlet } from "react-router-dom";

const RootPage = () => {
  return (
    <main>
      <Outlet />
      <div className="fixed sm:right-4 right-2 sm:bottom-4 bottom-2">
        <ChatPopover />
      </div>
    </main>
  );
};

export default RootPage;
