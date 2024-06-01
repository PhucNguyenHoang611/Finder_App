import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import PreviewPostCard from "./Card/PreviewPostCard";

const PreviewPostDialog = (props: PreviewPostProps) => {
  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          "rounded-xl my-2 bg-white border border-black p-1.5 sm:w-auto w-full"
        )}
      >
        <RemoveRedEyeOutlinedIcon className="mr-2" /> Xem trước khi đăng
      </DialogTrigger>
      <DialogContent
        className={cn("bg-white overflow-y-auto lg:h-[80%] h-[75%] px-0 pb-0")}
      >
        <PreviewPostCard
          author={props.author}
          post={props.post}
          image={props.image}
          itemTypes={props.itemTypes}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PreviewPostDialog;
