import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const tempTitle = "Ngày 15/9 trên đường đi học về mình đi qua cầu Định Công - Hà Nội. Mình có nhặt đc chùm chìa khoá này trên nối rẽ lên cầu.";
const tempContact = "Liên hệ sđt 0965024155 để nhận chùm chìa khoá này ạ.";

const PostItemCard = () => {
  return (
    <Card className={cn("w-full h-max rounded-xl flex sm:flex-row flex-col shadow-md")}>
      <div className="md:w-2/12 sm:w-4/12 flex justify-center items-center overflow-hidden cursor-pointer rounded-tl-xl sm:rounded-bl-xl sm:rounded-tr-none rounded-bl-none rounded-tr-xl">
        <img src="https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60" alt="postImage" loading="lazy" className="object-cover w-full h-full hover:scale-125 duration-300" />
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
        <CardFooter className={cn("flex justify-between sm:items-center items-end sm:flex-row flex-col")}>
          <div className="flex justify-center items-center">
            <LocationOnOutlinedIcon />
            <p className="font-medium lg:text-base text-sm">
              Lâm Đồng , Thành phố Đà Lạt
            </p>
          </div>
          
          <div className="flex justify-center items-center">
            <p className="font-semibold lg:text-base text-sm">
              Tin nhặt được
            </p>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};

export default PostItemCard;