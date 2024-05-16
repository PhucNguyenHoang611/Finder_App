import { Outlet } from "react-router-dom";
import Header from "./home/Header";
import ChatPopover from "./chat/ChatPopover";

const RootPage = () => {
  return (
    <>
      <div className="relative flex flex-col justify-start items-start">
        <div className="pb-14">
          <Header />
        </div>
        <Outlet />
        <ChatPopover />
      </div>
    </>
  );
};

export default RootPage;
