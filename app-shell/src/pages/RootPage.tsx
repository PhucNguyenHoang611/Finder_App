import { Outlet } from "react-router-dom";
import Header from "./home/Header";

const RootPage = () => {
  return (
    <>
      <div className="flex flex-col justify-start items-start">
        <div className="pb-14">
          <Header />
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default RootPage;
