import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PostDetailsDialog from "./PostDetailsDialog";

const PostItemCard = ({ post, handleDeletePost }: PostItemCardProps) => {
  const navigate = useNavigate();

  return (
    <Card
      className={cn(
        "w-full h-max rounded-xl flex sm:flex-row flex-col shadow-mdr relative"
      )}
    >
      <div className="absolute top-3 right-3 cursor-pointer p-1 text-white rounded-full bg-red-500">
        <Dialog>
          <DialogTrigger asChild>
            <DeleteOutlineOutlinedIcon />
          </DialogTrigger>
          <DialogContent
            className="sm:max-w-[425px] bg-white"
            style={{ borderRadius: 15 }}
          >
            <DialogHeader>
              <DialogTitle>Xóa bài viết</DialogTitle>
              <DialogDescription>
                Bạn có chắc chắn muốn xóa bài viết này
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  className="rounded-xl"
                  onClick={() => handleDeletePost(post.id)}
                >
                  Xác nhận
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="md:w-3/12 sm:w-4/12 flex justify-center items-center overflow-hidden cursor-pointer rounded-tl-xl sm:rounded-bl-xl sm:rounded-tr-none rounded-bl-none rounded-tr-xl">
        <img
          src={
            post.filePath
              ? post.filePath
              : "https://cdn.vectorstock.com/i/preview-1x/39/63/no-photo-camera-sign-vector-3213963.jpg"
          }
          alt={post.fileName ? post.fileName : "no-image"}
          loading="lazy"
          className="object-cover w-full h-[250px] hover:scale-125 duration-300"
        />
      </div>
      <div className="md:w-9/12 sm:w-8/12 justify-center items-center">
        <CardHeader>
          <CardTitle
            className={cn(
              "xl:text-xl text-base flex flex-col justify-center items-start gap-2"
            )}
          >
            <Badge
              className="w-max"
              style={{
                backgroundColor:
                  post.approved === "ACCEPT"
                    ? "#00cc66"
                    : post.approved === "REJECT"
                    ? "#ff3300"
                    : "#ffcc00"
              }}
            >
              {post.approved === "ACCEPT"
                ? "Đã duyệt"
                : post.approved === "REJECT"
                ? "Không được duyệt"
                : "Đang chờ duyệt"}
            </Badge>
            {post.title ? post.title : "Không có tiêu đề"}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex sm:flex-row flex-col justify-between items-center">
          <p className="lg:text-base text-sm">
            {post.description ? (
              <>
                {post.description.length > 150
                  ? post.description.substring(0, 150) + "..."
                  : post.description}
              </>
            ) : (
              "Không có mô tả"
            )}
          </p>

          {post.approved === "ACCEPT" ? (
            <Button
              className={cn(
                "rounded-xl my-2 bg-white border border-black p-1.5 sm:w-auto w-full text-black text-base font-light hover:bg-transparent"
              )}
              onClick={() => navigate("/post-details/" + post.id)}
            >
              <RemoveRedEyeOutlinedIcon className="mr-3" /> Chi tiết
            </Button>
          ) : (
            <PostDetailsDialog post={post} />
          )}
        </CardContent>

        <CardFooter
          className={cn(
            "flex justify-between md:items-center items-end md:flex-row flex-col"
          )}
        >
          <div className="flex justify-center items-center">
            <LocationOnOutlinedIcon />
            <p className="font-medium xl:text-base text-sm">
              {post.locationDetail
                ? post.locationDetail
                : "Khu vực chưa được cung cấp"}
            </p>
          </div>

          <div className="flex justify-center items-center">
            <p className="font-semibold xl:text-base text-sm">
              {post.postType ? (
                <>
                  {post.postType === "COLLECT"
                    ? "Tin nhặt được"
                    : "Tin cần tìm"}
                </>
              ) : (
                "Loại tin không xác định"
              )}
            </p>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};

export default PostItemCard;
