import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import PostCard from "./Card/PostCard";
import PostItemCard from "./Card/PostItemCard";

const PostDetails = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Alert className={cn("rounded-xl bg-red-400 text-white border mb-[20px]")}>
        <WarningAmberOutlinedIcon style={{ color: "white" }} />
        <AlertTitle>Chú ý !</AlertTitle>

        <div className="flex gap-1">
          <AlertDescription>
            Cảnh báo
          </AlertDescription>
          <AlertDescription>
            <a href="#" className="underline font-medium">lừa đảo</a>
          </AlertDescription>
        </div>
      </Alert>

      <PostCard />
      <PostItemCard />
    </div>
  );
};

export default PostDetails;