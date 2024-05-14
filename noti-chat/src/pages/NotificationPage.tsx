import NotificationTabs from "@/components/Notification/NotificationTabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";

const Notification = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center p-[20px]">
      <Alert
        className={cn("rounded-xl bg-red-400 text-white border mb-[20px]")}
      >
        <WarningAmberOutlinedIcon style={{ color: "white" }} />
        <AlertTitle>Chú ý !</AlertTitle>

        <div className="flex gap-1">
          <AlertDescription>Cảnh báo</AlertDescription>
          <AlertDescription>
            <a href="#" className="underline font-medium">
              lừa đảo
            </a>
          </AlertDescription>
        </div>
      </Alert>

      <NotificationTabs />
    </div>
  );
};

export default Notification;
