/* eslint-disable @typescript-eslint/no-explicit-any */
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import CardMUI from "@mui/joy/Card";
import CardMUIContent from "@mui/joy/CardContent";
import CardMUIOverflow from "@mui/joy/CardOverflow";
import Link from "@mui/joy/Link";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";
import SendOutlined from "@mui/icons-material/SendOutlined";
import Face from "@mui/icons-material/Face";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

const images: any[] = [
  "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
  "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
  "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250",
  "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60"
];

export default function PostItemCard() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

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

  return (
    <CardMUI
      variant="outlined"
      className="lg:w-[80%] w-full rounded-xl"
    >
      <CardMUIContent orientation="horizontal" sx={{ alignItems: "center", gap: 1 }}>
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
            src="https://github.com/shadcn.png"
            sx={{ width: 48, height: 48 }}
          />
        </Box>
        <Typography fontWeight="lg" fontFamily="Montserrat">Nguyễn Hoàng Phúc</Typography>
        <IconButton variant="plain" color="neutral" size="sm" sx={{ ml: "auto" }}>
          <MoreHoriz />
        </IconButton>
      </CardMUIContent>

      <CardMUIContent orientation="horizontal" sx={{ alignItems: "center" }}>
        <Typography fontFamily="Montserrat">Tìm người yêu biết nấu ăn, chăm chồng chăm con hehe !!!</Typography>
      </CardMUIContent>

      <CardMUIOverflow>
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {images.length > 0 && images.map((img, index) => (
              <CarouselItem key={index}>
                <Card className="border-0 bg-transparent">
                  <CardContent className="flex items-center justify-center object-cover p-0 w-full h-[500px]">
                    <img src={img} alt="postImage" loading="lazy" />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </CardMUIOverflow>
      <CardMUIContent orientation="horizontal" sx={{ alignItems: "center", mx: -1 }}>
        <Box sx={{ width: 0, display: "flex", gap: 0.5 }}>
          <IconButton variant="plain" color="neutral" size="sm">
            <FavoriteBorder />
          </IconButton>
          <IconButton variant="plain" color="neutral" size="sm">
            <ModeCommentOutlined />
          </IconButton>
          <IconButton variant="plain" color="neutral" size="sm">
            <SendOutlined />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mx: "auto" }}>
          <div className="py-2 text-center text-sm text-muted-foreground">
            {current} / {count}
          </div>
        </Box>
        <Box sx={{ width: 0, display: "flex", flexDirection: "row-reverse" }}>
          <IconButton variant="plain" color="neutral" size="sm">
            <BookmarkBorderRoundedIcon />
          </IconButton>
        </Box>
      </CardMUIContent>
      <CardMUIContent>
        <Link
          component="button"
          underline="none"
          fontFamily="Montserrat"
          fontSize="sm"
          fontWeight="lg"
          textColor="text.primary"
        >
          6.11M Lượt thích
        </Link>
        <Typography fontSize="sm" fontFamily="Montserrat">
          <Link
            component="button"
            color="neutral"
            fontFamily="Montserrat"
            fontWeight="lg"
            textColor="text.primary"
          >
            Nguyễn Hoàng Phúc
          </Link>{" "}
          Sáng sớm thức dậy anh bỗng thấy mình quá đẹp trai hjhj !!!
        </Typography>
        <Link
          component="button"
          underline="none"
          fontFamily="Montserrat"
          fontSize="sm"
          startDecorator="…"
          sx={{ color: "text.tertiary" }}
        >
          Tải thêm
        </Link>
        <Link
          component="button"
          underline="none"
          fontFamily="Montserrat"
          fontSize="10px"
          sx={{ color: "text.tertiary", my: 0.5 }}
        >
          2 ngày trước
        </Link>
      </CardMUIContent>
      <CardMUIContent orientation="horizontal" sx={{ gap: 1 }}>
        <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: -1 }}>
          <Face />
        </IconButton>
        <Input
          variant="plain"
          size="sm"
          placeholder="Thêm bình luận của bạn…"
          sx={{ flex: 1, px: 0, "--Input-focusedThickness": "0px", fontFamily: "Montserrat" }}
        />
        <Link disabled underline="none" role="button" fontFamily="Montserrat">
          Gửi
        </Link>
      </CardMUIContent>
    </CardMUI>
  );
}