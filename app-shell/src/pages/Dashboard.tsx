/* eslint-disable @typescript-eslint/no-unused-vars */
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import ChatPopover from "./chat/ChatPopover";
import { useSignedInUserAtom } from "homeApp/store";

const Dashboard = () => {
  const [signedInUser, _setSignedInUser] = useSignedInUserAtom();

  return (
    <main className="flex justify-start items-start px-10 w-full">
      <section className="min-[1024px]:flex max-[1024px]:hidden w-64 fixed h-lvh">
        <Sidebar />
      </section>
      <section className="min-[1024px]:pl-64 flex justify-center items-center pt-4 w-full">
        <div className="w-11/12 pb-4">
          <Outlet />
        </div>
      </section>

      {signedInUser.email && <ChatPopover />}
    </main>
  );
};

export default Dashboard;
