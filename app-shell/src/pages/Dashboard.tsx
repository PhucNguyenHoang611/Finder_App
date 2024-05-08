import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <main className="flex justify-start items-start px-10 w-full">
      <section className="lg:flex w-64 fixed hidden h-lvh">
        <Sidebar />
      </section>
      <section className="lg:pl-64 flex justify-center items-center pt-4 w-full">
        <div className="w-11/12">
          <Outlet />
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
