import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import PostDetailsCard from "./PostDetailsCard";

const PostDetailsDialog = (props: PostDetailsProps) => {
  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          "rounded-xl my-2 bg-white lg:text-base md:text-sm text-xs font-medium border-2 border-black p-1.5 sm:w-auto w-full"
        )}
      >
        <RemoveRedEyeOutlinedIcon className="mr-2" /> Chi tiết
      </DialogTrigger>
      <DialogContent
        className={cn("bg-white overflow-y-auto lg:h-[80%] h-[75%] px-0")}
        style={{ borderRadius: 10 }}
      >
        <PostDetailsCard post={props.post} />
      </DialogContent>
    </Dialog>
  );
};

export default PostDetailsDialog;
