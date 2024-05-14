import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MarkChatReadOutlinedIcon from "@mui/icons-material/MarkChatReadOutlined";

import NotificationList from "@/components/Notification/NotificationList";

const AllNotificationTab = () => {
  return (
    <div className="flex flex-col justify-center gap-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="select-all"
            className="rounded border-2 border-gray-400"
          />
          <Label htmlFor="select-all">Chọn tất cả</Label>
        </div>

        <Button className="rounded-xl gap-1">
          <MarkChatReadOutlinedIcon />
          <p className="xs:block hidden">Đánh dấu là đã đọc</p>
        </Button>
      </div>

      <div className="w-full flex sm:justify-end items-center">
        <div className="flex lg:w-[30%] md:w-[40%] sm:w-[50%] w-full justify-between items-center border-2 border-slate-200 rounded-xl px-2">
          <Input
            type="text"
            placeholder="Tìm kiếm thông báo..."
            className="border-none"
          />
          <SearchOutlinedIcon className="text-slate-400" />
        </div>
      </div>

      <NotificationList />
    </div>
  );
};

export default AllNotificationTab;
