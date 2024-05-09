import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

// { openPreviewDialog, setOpenPreviewDialog }: PreviewPostDialogProps
const PreviewPostDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button type="button" variant="outline" className={cn("rounded-xl my-2")}>
          <RemoveRedEyeOutlinedIcon className="mr-2" /> Xem trước khi đăng
        </Button>
      </DialogTrigger>
      <DialogContent className={cn("rounded-xl bg-white")}>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            Dialog Description
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewPostDialog;