import { Outlet } from "react-router-dom";
import Header from "@/components/nav/Header";
import { Toaster } from "@/components/ui/sonner";

const RootPage = () => {
  return (
    <div className="flex flex-col justify-start items-start">
      <div className="pb-14">
        <Header />
      </div>
      <Outlet />

      <Toaster richColors closeButton className="font-montserrat" />
    </div>
  );
};

export default RootPage;
