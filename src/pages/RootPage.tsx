import SideBar from "@/components/nav/SideBar";
import { Outlet } from "react-router-dom";

const RootPage = () => {
  return (
    <main className="flex justify-start items-start pt-4 px-10">
      <section className="lg:flex w-64 fixed hidden">
        <SideBar />
      </section>
      <section className="lg:pl-64 flex justify-center items-center">
        <div className="w-11/12">
          <Outlet />
        </div>
      </section>
    </main>
  );
};

export default RootPage;
