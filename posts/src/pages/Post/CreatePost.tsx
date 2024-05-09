import CreatePostForm from "@/components/Post/CreatePostForm";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";

const CreatePost = () => {
  return (
    <div className="w-full h-max flex flex-col gap-4">
      <Card className={cn("w-full h-max rounded-xl bg-green-100 border-4 border-green-200")}>
        <CardHeader>
          <CardTitle>Hướng dẫn</CardTitle>
          <CardDescription>
            Đăng tin tìm đồ
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p>
              <b>Tiêu đề: </b>
              Nhập tiêu đề ngắn gọn, thể hiện rõ ràng mục đích
            </p>
            <p className="text-sm">
              <i>*VD: Rơi ví, giấy tờ tuỳ thân mang tên Nguyễn Văn A 1996 rơi ở Cầu Giấy, Hà Nội</i>
            </p>
          </div>

          <div className="w-full flex justify-center items-center">
            <Separator
              className={cn(
                "w-full border-2 border-green-200 bg-green-200"
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p>
              <b>Loại tin: </b>
              Chọn loại tin đang thực hiện
            </p>
          </div>

          <div className="w-full flex justify-center items-center">
            <Separator
              className={cn(
                "w-full border-2 border-green-200 bg-green-200"
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p>
              <b>Danh mục: </b>
              Lựa chọn danh mục đồ vật bị mất hoặc nhặt được
            </p>
          </div>

          <div className="w-full flex justify-center items-center">
            <Separator
              className={cn(
                "w-full border-2 border-green-200 bg-green-200"
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p>
              <b>Khu vực: </b>
              Chọn khu vực rơi đồ hoặc nhặt được
            </p>
            <p className="text-sm">
              <i>*Càng chỉ định khu vực chi tiết thì người khác sẽ tìm thấy bài đăng này nhanh hơn</i>
            </p>
          </div>

          <div className="w-full flex justify-center items-center">
            <Separator
              className={cn(
                "w-full border-2 border-green-200 bg-green-200"
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p>
              <b>Ảnh đại diện bài đăng: </b>
              Chụp ảnh đồ vật bị mất hoặc nhặt được
            </p>
            <p className="text-sm">
              <i>*Lưu ý: Để đảm bảo bảo mật thông tin cá nhân, tất cả ảnh tải lên phải che các mã số (VD: Căn cước công dân phải làm mờ Mã số CCCD và làm mờ ảnh trên CCCD), nếu ảnh tải lên không đảm bảo yếu tố bảo mật thì tin sẽ không được phê duyệt</i>
            </p>
          </div>

          <div className="w-full flex justify-center items-center">
            <Separator
              className={cn(
                "w-full border-2 border-green-200 bg-green-200"
              )}
            />
          </div>
        </CardContent>

        <CardFooter className="flex items-center">
          <p className="font-semibold">Chúc bạn may mắn !</p>
        </CardFooter>
      </Card>
      
      <Card className={cn("w-full h-max rounded-xl")}>
        <CardHeader>
          <CardTitle>Đăng tin mới</CardTitle>
        </CardHeader>
        <CardContent>
          <CreatePostForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePost;