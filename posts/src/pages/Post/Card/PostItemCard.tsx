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
    <Card className={cn("w-full h-max rounded-xl flex")}>
      <div className="w-2/12 flex justify-center items-center overflow-hidden cursor-pointer rounded-l-xl">
        <img src="https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60" alt="postImage" loading="lazy" className="object-cover w-full h-full hover:scale-125 duration-150" />
      </div>
      <div className="w-10/12 justify-center items-center">
        <CardHeader>
          <CardTitle className={cn("cursor-pointer hover:text-green-700")}>Nhặt được ví và một số giấy tờ tên Đỗ Thành Trung</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            {(tempTitle + " " + tempContact).length > 200 ? (tempTitle + " " + tempContact).substring(0, 200) + "..." : (tempTitle + " " + tempContact)}
          </p>
        </CardContent>
        <CardFooter className={cn("flex justify-between items-center")}>
          <div className="flex justify-center items-center">
            <LocationOnOutlinedIcon />
            <p className="font-medium">
              Lâm Đồng , Thành phố Đà Lạt
            </p>
          </div>
          
          <div className="flex justify-center items-center">
            <p className="font-semibold">
              Tin nhặt được
            </p>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};

export default PostItemCard;