/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import CardMUI from "@mui/joy/Card";
import CardMUIContent from "@mui/joy/CardContent";
import CardMUIOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Link from "@mui/joy/Link";
// import IconButton from "@mui/joy/IconButton";
// import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
// import SendOutlined from "@mui/icons-material/SendOutlined";
// import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useLazyQuery } from "@apollo/client";
import { GET_POST_BY_ID } from "@/services/graphql/queries";
import LargeSpinner from "../LargeSpinner";

export default function PostDetailsCard({ post }: PostDetailsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const [postDetail, setPostDetail] = useState<Post | null>(null);
  const [getPostById] = useLazyQuery(GET_POST_BY_ID);

  const handleGetPostDetails = async () => {
    setIsLoading(true);

    await getPostById({
      variables: {
        id: post.id
      }
    })
      .then((result) => {
        const resultData = result.data.getPostById.data;

        const pData: Post = {
          id: resultData.id,
          title: resultData.title,
          location: resultData.location,
          postType: resultData.postType,
          description: resultData.description,
          contactPhone: resultData.contactPhone,
          locationDetail: resultData.locationDetail,
          authorId: resultData.authorId,
          authorAvatar: resultData.authorAvatar,
          authorDisplayName: resultData.authorDisplayName,
          images: resultData.images,
          itemTypes: resultData.itemTypes,
          createdDate: new Date(resultData.createdDate),
          updatedDate: new Date(resultData.updatedDate),
          viewCount: resultData.viewCount,
          totalComments: resultData.totalComments
        };

        setPostDetail(pData);
      })
      .catch((error) => {
        console.log(error);
      });

    setIsLoading(false);
  };

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  useEffect(() => {
    if (post.id) {
      handleGetPostDetails();
    }
  }, [post]);

  return (
    <>
      {isLoading && (
        <div className="w-full h-full flex justify-center items-center">
          <LargeSpinner />
        </div>
      )}

      {!isLoading && (
        <CardMUI
          variant="outlined"
          className="w-full overflow-x-hidden"
          sx={{
            border: 0,
            backgroundColor: "white"
          }}
        >
          <CardMUIContent
            orientation="horizontal"
            sx={{ alignItems: "center", gap: 1 }}
          >
            <Box
              sx={{
                position: "relative",
                width: 48,
                height: 48,
                "&::before": {
                  content: "''",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  m: "-2px",
                  borderRadius: "50%"
                }
              }}
            >
              <Avatar
                size="sm"
                src={postDetail?.authorAvatar}
                sx={{ width: 48, height: 48 }}
              />
            </Box>
            <Typography fontWeight="lg" fontFamily="Montserrat">
              {postDetail?.authorDisplayName
                ? postDetail.authorDisplayName
                : "Tên người đăng"}
            </Typography>
          </CardMUIContent>

          <CardMUIContent
            orientation="horizontal"
            className="text-pretty"
            sx={{
              display: "flex",
              gap: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "start"
            }}
          >
            <Typography
              fontFamily="Montserrat"
              fontSize={20}
              className="font-bold"
            >
              {postDetail?.title ? postDetail.title : "Không có tiêu đề"}
            </Typography>

            <Typography
              fontFamily="Montserrat"
              fontSize={15}
              className="font-semibold"
            >
              <ManageSearchOutlinedIcon className="mr-2" />
              {postDetail?.postType === "LOST"
                ? "Tin cần tìm"
                : "Tin nhặt được"}
            </Typography>

            <Typography
              fontFamily="Montserrat"
              fontSize={15}
              sx={{ marginBottom: 2 }}
              className="font-semibold"
            >
              <ListOutlinedIcon className="mr-2" />
              {postDetail?.itemTypes[0]
                ? "Tìm " + postDetail.itemTypes[0].name
                : "Không có danh mục cụ thể"}
            </Typography>

            <Typography fontFamily="Montserrat">
              {postDetail?.description
                ? postDetail.description
                : "Không có mô tả"}
            </Typography>

            <Typography
              fontFamily="Montserrat"
              fontSize={15}
              sx={{ marginTop: 2 }}
              className="font-medium"
            >
              {postDetail?.contactPhone
                ? "Thông tin liên lạc: " + postDetail.contactPhone
                : "Không có thông tin liên lạc"}
            </Typography>

            <Typography
              fontFamily="Montserrat"
              fontSize={15}
              className="font-medium"
            >
              <FmdGoodOutlinedIcon className="mr-2" />
              {postDetail?.locationDetail
                ? postDetail.locationDetail
                : "Khu vực chưa được cung cấp"}
            </Typography>
          </CardMUIContent>

          <CardMUIOverflow>
            <Carousel setApi={setApi} className="w-full">
              <CarouselContent>
                {postDetail?.images &&
                  postDetail.images.length > 0 &&
                  postDetail.images.map((img: PostImage, index: number) => (
                    <CarouselItem key={index}>
                      <Card className="border-0 bg-transparent">
                        <CardContent className="flex items-center justify-center object-cover p-0 w-full h-[400px]">
                          <Dialog>
                            <DialogTrigger>
                              <img
                                src={img.filePath}
                                alt={img.fileName}
                                loading="lazy"
                                className="cursor-pointer"
                              />
                            </DialogTrigger>
                            <DialogContent
                              className={cn("border-0 rounded-xl p-0")}
                            >
                              <img
                                src={img.filePath}
                                alt={img.fileName}
                                loading="lazy"
                                className="w-full h-full object-cover rounded-xl"
                              />
                            </DialogContent>
                          </Dialog>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}

                {postDetail?.images && postDetail.images.length === 0 && (
                  <CarouselItem>
                    <Card className="border-0 bg-transparent">
                      <CardContent className="flex items-center justify-center object-cover p-0 w-full h-[400px]">
                        <Dialog>
                          <DialogTrigger>
                            <img
                              src={
                                "https://cdn.vectorstock.com/i/preview-1x/39/63/no-photo-camera-sign-vector-3213963.jpg"
                              }
                              alt="postImage"
                              loading="lazy"
                              className="cursor-pointer"
                            />
                          </DialogTrigger>
                          <DialogContent
                            className={cn("border-0 rounded-xl p-0")}
                          >
                            <img
                              src={
                                "https://cdn.vectorstock.com/i/preview-1x/39/63/no-photo-camera-sign-vector-3213963.jpg"
                              }
                              alt="postImage"
                              loading="lazy"
                              className="w-full h-full object-cover rounded-xl"
                            />
                          </DialogContent>
                        </Dialog>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                )}
              </CarouselContent>
            </Carousel>
          </CardMUIOverflow>
          <CardMUIContent
            orientation="horizontal"
            sx={{ alignItems: "center", mx: -1 }}
          >
            <Box
              sx={{ width: 0, display: "flex", gap: 0.5 }}
              className="sm:flex-row flex-col"
            >
              <Link
                component="button"
                underline="none"
                fontFamily="Montserrat"
                fontSize="sm"
                fontWeight="lg"
                textColor="gray"
                className="text-nowrap"
              >
                <ModeCommentOutlined className="mr-1" />0 Bình luận
              </Link>

              <Link
                component="button"
                underline="none"
                fontFamily="Montserrat"
                fontSize="sm"
                fontWeight="lg"
                textColor="gray"
                className="text-nowrap"
              >
                <RemoveRedEyeOutlinedIcon className="mr-1" />0 Lượt xem
              </Link>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                mx: "auto"
              }}
            >
              {count > 0 && (
                <div className="py-2 text-center text-sm text-muted-foreground">
                  {current} / {count}
                </div>
              )}
            </Box>
          </CardMUIContent>
        </CardMUI>
      )}
    </>
  );
}

{
  /* <IconButton variant="plain" color="neutral" size="sm">
  <FavoriteBorder />
</IconButton>
<IconButton variant="plain" color="neutral" size="sm">
  <ModeCommentOutlined />
</IconButton>
<IconButton variant="plain" color="neutral" size="sm">
  <SendOutlined />
</IconButton>

<Box sx={{ width: 0, display: "flex", flexDirection: "row-reverse" }}>
  <IconButton variant="plain" color="neutral" size="sm">
    <BookmarkBorderRoundedIcon />
  </IconButton>
</Box> */
}
