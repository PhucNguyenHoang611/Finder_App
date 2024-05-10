import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

const tempTitle = "Ngày 15/9 trên đường đi học về mình đi qua cầu Định Công - Hà Nội. Mình có nhặt đc chùm chìa khoá này trên nối rẽ lên cầu.";
const tempContact = "Liên hệ sđt 0965024155 để nhận chùm chìa khoá này ạ.";

const NewsCard = () => {
  return (
    <Card className={cn("w-full h-max rounded-xl flex sm:flex-row flex-col shadow-md")}>
      <div className="md:w-2/12 sm:w-4/12 flex justify-center items-center overflow-hidden cursor-pointer rounded-tl-xl sm:rounded-bl-xl sm:rounded-tr-none rounded-bl-none rounded-tr-xl">
        <img src="https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60" alt="newsImage" loading="lazy" className="object-cover w-full h-full hover:scale-125 duration-300" />
      </div>
      <div className="md:w-10/12 sm:w-8/12 justify-center items-center">
        <CardHeader>
          <CardTitle className={cn("cursor-pointer hover:text-green-700 lg:text-xl text-base")}>Nhặt được ví và một số giấy tờ tên Đỗ Thành Trung</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="lg:text-base text-sm">
            {(tempTitle + " " + tempContact).length > 150 ? (tempTitle + " " + tempContact).substring(0, 150) + "..." : (tempTitle + " " + tempContact)}
          </p>
        </CardContent>
        <CardFooter className={cn("flex md:justify-start justify-end items-center")}>
          <div className="flex justify-center items-center gap-2">
            <AccessTimeOutlinedIcon />
            <p className="font-medium lg:text-base text-sm">
              06 / 11 / 2002
            </p>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};

export default NewsCard;