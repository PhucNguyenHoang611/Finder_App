import { Link, Outlet } from "react-router-dom";
import SideNav from "@/components/SideNav";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";

const RootPage = () => {
  return (
    <main className="flex flex-col lg:flex-row p-[20px] w-full">
      <section className="flex w-full lg:w-4/12 h-full lg:sticky lg:top-[20px]">
        <SideNav />
      </section>
      <section className="w-full lg:w-8/12 h-full mt-[20px] lg:mt-0 lg:ml-[20px] flex flex-col justify-center items-center">
        <Alert
          className={cn("rounded-xl bg-red-400 text-white border mb-[20px]")}
        >
          <WarningAmberOutlinedIcon style={{ color: "white" }} />
          <AlertTitle>Chú ý !</AlertTitle>

          <div className="flex gap-1">
            <AlertDescription>Cảnh báo</AlertDescription>
            <AlertDescription>
              <Link to="/scam-warning" className="underline font-medium">
                lừa đảo
              </Link>
            </AlertDescription>
          </div>
        </Alert>

        <Outlet />
        <Toaster richColors closeButton className="font-montserrat" />
      </section>
    </main>
  );
};

export default RootPage;
