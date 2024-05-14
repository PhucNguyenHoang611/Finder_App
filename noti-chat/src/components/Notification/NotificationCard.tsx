import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

const NotificationCard = () => {
  const tempTitle = "Đã tìm được đồ của bạn !";
  const tempMessage =
    "Đồ của bạn đã được Nguyễn Thanh Sang tìm thấy ở căn tin KTX Khu A.";

  return (
    <Card className="rounded-xl hover:bg-gray-200 cursor-pointer flex sm:flex-row flex-col justify-center items-center p-2">
      <CardHeader className="sm:w-2/3 w-full flex flex-row justify-between items-center p-4">
        <div className="sm:w-full w-1/2 flex flex-col gap-2">
          <Badge className="w-max">Loại thông báo</Badge>

          <CardTitle className="sm:text-lg text-md text-pretty truncate">
            {tempTitle}
          </CardTitle>
          <CardDescription className="sm:text-md text-sm text-nowrap truncate">
            {tempMessage}
          </CardDescription>
        </div>

        <div className="w-1/2 sm:hidden flex justify-end items-center">
          <Checkbox className="rounded border-2 border-gray-400" />
        </div>
      </CardHeader>
      <CardContent className="sm:w-1/3 w-full sm:p-0 p-2 mt-0 flex sm:flex-row sm:justify-between justify-end items-center">
        <div className="flex gap-1 justify-center items-center">
          <AccessTimeOutlinedIcon className="w-2 h-2" />
          <p className="sm:text-base text-sm">06 / 11 / 2002</p>
        </div>

        <div className="sm:block hidden pr-4">
          <Checkbox className="rounded border-2 border-gray-400" />
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
