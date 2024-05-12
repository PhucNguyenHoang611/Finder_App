/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Alert,
  AlertDescription,
  AlertTitle
} from "@/components/ui/alert";

import {
  Bell,
  // BellDotIcon
} from "lucide-react";
import { Link } from "react-router-dom";
// import { useState } from "react";

const tempList = [1, 2, 3];

const EmptyNotificationsList = () => {
  return (
    <div className="w-full h-[100px] flex justify-center items-center">
      <p className="text-center font-semibold text-slate-500">Không có thông báo nào</p>
    </div>
  );
};

const NotificationDropdownItem = () => {
  const tempMessage = "Đồ của bạn đã được Nguyễn Thanh Sang tìm thấy ở căn tin KTX Khu A.";
  const tempTitle = "Đã tìm được đồ của bạn !";
  return (
    <DropdownMenuItem className="cursor-pointer w-full rounded-lg">
      <Alert className="border-none bg-slate-100">
        <AlertTitle>
          {tempTitle.length > 50 ? tempTitle.substring(0, 50) + "..." : tempTitle}
        </AlertTitle>

        <AlertDescription>
          {tempMessage.length > 50 ? tempMessage.substring(0, 50) + "..." : tempMessage}
        </AlertDescription>
      </Alert>
    </DropdownMenuItem>
  );
};

const NotificationDropdown = () => {
  // const [isLoading, setIsLoading] = useState(false);
  const isLoading = false;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Bell />
        {/* <BellDotIcon className="text-red-500" /> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-6 mr-2 w-[500px]">
        <DropdownMenuLabel>Thông báo</DropdownMenuLabel>

        {tempList.length > 0 && tempList.map((_item, index) => <NotificationDropdownItem key={index} />)}

        {tempList.length === 0 && !isLoading && <EmptyNotificationsList />}

        {isLoading && (
          <div className="w-full flex flex-col justify-center items-center space-y-3 my-2">
            <div className="w-full flex items-center space-x-4 pl-2">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[400px]" />
                <Skeleton className="h-4 w-[300px]" />
              </div>
            </div>

            <div className="w-full flex items-center space-x-4 pl-2">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[400px]" />
                <Skeleton className="h-4 w-[300px]" />
              </div>
            </div>

            <div className="w-full flex items-center space-x-4 pl-2">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[400px]" />
                <Skeleton className="h-4 w-[300px]" />
              </div>
            </div>
          </div>
        )}

        <DropdownMenuSeparator />

        <div className="cursor-pointer flex justify-end items-center my-2 mr-2">
          <Link to="/notifications">
            <p className="font-semibold text-sm text-blue-500 hover:text-blue-600">
              Xem thêm...
            </p>
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;