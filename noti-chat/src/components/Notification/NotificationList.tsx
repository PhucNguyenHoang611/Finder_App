import { Skeleton } from "@/components/ui/skeleton";
import NotificationCard from "./NotificationCard";

const tempList = [1, 2, 3];

const EmptyNotificationsList = () => {
  return (
    <div className="w-full h-[300px] flex justify-center items-center">
      <p className="text-center font-semibold text-slate-500">
        Không có thông báo nào
      </p>
    </div>
  );
};

const NotificationList = () => {
  // const [isLoading, setIsLoading] = useState(false);
  const isLoading = false;

  return (
    <div className="flex flex-col sm:gap-2 gap-4">
      {tempList.map((item) => (
        <NotificationCard key={item} />
      ))}

      {tempList.length === 0 && !isLoading && <EmptyNotificationsList />}

      {isLoading && (
        <div className="w-full flex flex-col justify-center items-center space-y-3 my-2">
          <div className="w-full flex flex-col justify-center items-start space-y-2 rounded-xl border border-slate-100 p-2">
            <Skeleton className="h-6 w-full rounded-xl" />
            <Skeleton className="h-4 w-[90%] rounded-xl" />
            <Skeleton className="h-8 w-[95%] rounded-xl" />
            <Skeleton className="h-4 w-[90%] rounded-xl" />
          </div>

          <div className="w-full flex flex-col justify-center items-start space-y-2 rounded-xl border border-slate-100 p-2">
            <Skeleton className="h-6 w-full rounded-xl" />
            <Skeleton className="h-4 w-[90%] rounded-xl" />
            <Skeleton className="h-8 w-[95%] rounded-xl" />
            <Skeleton className="h-4 w-[90%] rounded-xl" />
          </div>

          <div className="w-full flex flex-col justify-center items-start space-y-2 rounded-xl border border-slate-100 p-2">
            <Skeleton className="h-6 w-full rounded-xl" />
            <Skeleton className="h-4 w-[90%] rounded-xl" />
            <Skeleton className="h-8 w-[95%] rounded-xl" />
            <Skeleton className="h-4 w-[90%] rounded-xl" />
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationList;
