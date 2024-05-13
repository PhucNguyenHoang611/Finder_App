import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";

import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import PreviewPostCard from "./Card/PreviewPostCard";

// { openPreviewDialog, setOpenPreviewDialog }: PreviewPostDialogProps
const PreviewPostDialog = () => {
  return (
    <Dialog>
      <DialogTrigger className={cn("rounded-xl my-2 bg-white border border-black p-1.5 sm:w-auto w-full")}>
        <RemoveRedEyeOutlinedIcon className="mr-2" /> Xem trước khi đăng
      </DialogTrigger>
      <DialogContent className={cn("bg-white overflow-y-auto lg:h-[95%] h-[85%] px-0 pb-0")}>
        <PreviewPostCard />
      </DialogContent>
    </Dialog>
  );
};

export default PreviewPostDialog;