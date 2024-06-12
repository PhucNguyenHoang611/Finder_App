/* eslint-disable react-hooks/exhaustive-deps */
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
import UpdatePostDialog from "./UpdatePostDialog";
import { useLazyQuery } from "@apollo/client";
import { GET_POST_BY_ID } from "@/services/graphql/queries";
import { useEffect, useState } from "react";

const PostItemCard = ({
  signedInUser,
  post,
  getAllPosts,
  handleDeletePost
}: PostItemCardProps) => {
  const navigate = useNavigate();
  const [getPostById] = useLazyQuery(GET_POST_BY_ID);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);

  const getPostDetails = async () => {
    try {
      const result = await getPostById({
        variables: {
          id: post.id
        },
        fetchPolicy: "network-only"
      });

      const resultData = result.data.getPostById.data;
      setCurrentPost({
        id: resultData.id,
        title: resultData.title,
        location: resultData.location,
        locationDetail: resultData.locationDetail,
        postType: resultData.postType,
        description: resultData.description,
        contactPhone: resultData.contactPhone,
        authorId: resultData.authorId,
        authorAvatar: resultData.authorAvatar,
        authorDisplayName: resultData.authorDisplayName,
        images: resultData.images,
        itemTypes: resultData.itemTypes,
        createdDate: new Date(resultData.createdDate),
        updatedDate: new Date(resultData.updatedDate),
        viewCount: resultData.viewCount,
        totalComments: resultData.totalComments
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (post.id) {
      getPostDetails();
    }
  }, [post.id]);

  return (
    <Card
      className={cn(
        "w-full h-max rounded-xl flex sm:flex-row flex-col shadow-mdr relative"
      )}
    >
      <div className="absolute top-3 right-3 flex justify-between items-center gap-2">
        {currentPost && (
          <UpdatePostDialog
            signedInUser={signedInUser}
            post={currentPost}
            getAllPosts={getAllPosts}
          />
        )}

        <Dialog>
          <DialogTrigger asChild>
            <DeleteOutlineOutlinedIcon className="cursor-pointer p-1 text-white rounded-full bg-red-500" />
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

      <div className="md:w-3/12 sm:w-4/12 flex justify-center items-center overflow-hidden rounded-tl-xl sm:rounded-bl-xl sm:rounded-tr-none rounded-bl-none rounded-tr-xl">
        <img
          src={
            post.filePath
              ? post.filePath
              : "https://cdn.vectorstock.com/i/preview-1x/39/63/no-photo-camera-sign-vector-3213963.jpg"
          }
          alt={post.fileName ? post.fileName : "no-image"}
          loading="lazy"
          className="object-cover w-full h-[250px]"
        />
      </div>
      <div className="md:w-9/12 sm:w-8/12 justify-center items-center">
        <CardHeader>
          <CardTitle
            className={cn(
              "xl:text-xl md:text-base text-lg flex flex-col justify-center items-start gap-2"
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
        <CardContent className="flex sm:flex-row flex-col justify-between sm:items-center items-start">
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
                "rounded-xl my-2 bg-white border-2 border-black p-1.5 sm:w-auto w-full text-black lg:text-base md:text-sm text-xs hover:bg-transparent"
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
            "flex justify-between md:items-center items-end md:flex-row flex-col gap-2"
          )}
        >
          <div className="flex justify-center items-center">
            <LocationOnOutlinedIcon />
            <p className="font-medium md:text-left text-right xl:text-base md:text-sm text-xs">
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
