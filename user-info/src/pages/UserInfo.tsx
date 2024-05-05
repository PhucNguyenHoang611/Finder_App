import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { Pencil2Icon } from "@radix-ui/react-icons";

const UserInfo = () => {
  const navigate = useNavigate();

  return (
    <Card className={cn("w-full h-max rounded-xl")}>
      {/* Card Header */}
      <CardHeader className={cn("flex justify-center items-center")}>
        <CardTitle>Thông tin tài khoản</CardTitle>
      </CardHeader>

      {/* Card Content */}
      <CardContent className={cn("flex flex-col justify-center items-center gap-4")}>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="lastName">Họ</Label>
          <Input
            type="text"
            id="lastName"
            placeholder="Họ"
            defaultValue="Nguyễn Hoàng"
            className={cn("rounded-xl border-slate-300")}
            readOnly />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="firstName">Tên</Label>
          <Input
            type="text"
            id="firstName"
            placeholder="Tên"
            defaultValue="Phúc"
            className={cn("rounded-xl border-slate-300")}
            readOnly />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="phoneNumber">Số điện thoại</Label>
          <Input
            type="text"
            id="phoneNumber"
            placeholder="Số điện thoại"
            defaultValue="0933538901"
            className={cn("rounded-xl border-slate-300")}
            readOnly />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="gender">Giới tính</Label>
          <Input
            type="text"
            id="gender"
            placeholder="Giới tính"
            defaultValue="Nam"
            className={cn("rounded-xl border-slate-300")}
            readOnly />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="yearOfBirth">Năm sinh</Label>
          <Input
            type="text"
            id="yearOfBirth"
            placeholder="Năm sinh"
            defaultValue="2002"
            className={cn("rounded-xl border-slate-300")}
            readOnly />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="address">Địa chỉ</Label>
          <Input
            type="text"
            id="address"
            placeholder="Địa chỉ"
            defaultValue="123/ABC, XYZ"
            className={cn("rounded-xl border-slate-300")}
            readOnly />
        </div>

        <Button className={cn("rounded-xl")} onClick={() => navigate("/update-info")}>
          <Pencil2Icon className="mr-2 w-6 h-6" /> Chỉnh sửa
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserInfo;