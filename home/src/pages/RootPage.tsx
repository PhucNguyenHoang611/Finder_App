import Header from "@/components/nav/Header";
import { Outlet } from "react-router-dom";

const RootPage = () => {
  return (
    <div className="flex flex-col justify-start items-start">
      <div className="pb-10">
        <Header />
      </div>
      <Outlet />
    </div>
  );
};

export default RootPage;
