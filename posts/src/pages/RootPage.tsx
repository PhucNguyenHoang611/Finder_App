import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

const RootPage = () => {
  return (
    <main className="p-[20px]">
      <Outlet />

      <Toaster richColors closeButton className="font-montserrat" />
    </main>
  );
};

export default RootPage;
