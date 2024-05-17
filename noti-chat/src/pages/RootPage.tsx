import ChatPopover from "@/components/Chat/ChatPopover";
import { Outlet } from "react-router-dom";

const RootPage = () => {
  return (
    <main>
      <Outlet />

      <ChatPopover />
    </main>
  );
};

export default RootPage;
