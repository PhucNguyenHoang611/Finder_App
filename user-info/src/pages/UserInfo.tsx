import { useNavigate } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { useAtomValue } from "jotai";
import { signedInUserAtomWithPersistence } from "@/store";

const UserInfo = () => {
  const signedInUser = useAtomValue(signedInUserAtomWithPersistence);
  const navigate = useNavigate();

  return (
    <div className="w-full h-max">
      <Card className={cn("w-full h-max rounded-xl")}>
        {/* Card Header */}
        <CardHeader className={cn("flex justify-center items-center")}>
          <CardTitle>Thông tin tài khoản</CardTitle>
        </CardHeader>

        {/* Card Content */}
        <CardContent
          className={cn("flex flex-col justify-center items-center gap-4")}
        >
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="displayName">Họ và tên</Label>
            <Input
              type="text"
              id="displayName"
              placeholder="Họ và tên"
              defaultValue={signedInUser.displayName}
              className={cn("rounded-xl border-slate-300")}
              readOnly
            />
          </div>

          {/* <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="firstName">Tên</Label>
            <Input
              type="text"
              id="firstName"
              placeholder="Tên"
              defaultValue="Phúc"
              className={cn("rounded-xl border-slate-300")}
              readOnly
            />
          </div> */}

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="gender">Giới tính</Label>
            <Input
              type="text"
              id="gender"
              placeholder="Giới tính"
              defaultValue={signedInUser.gender ? "Nam" : "Nữ"}
              className={cn("rounded-xl border-slate-300")}
              readOnly
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="birthDate">Ngày sinh</Label>
            <Input
              type="text"
              id="birthDate"
              placeholder="Ngày sinh"
              defaultValue={new Date(signedInUser.birthDate).toLocaleDateString(
                "vi-VN",
                {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit"
                }
              )}
              className={cn("rounded-xl border-slate-300")}
              readOnly
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="phone">Số điện thoại</Label>
            <Input
              type="text"
              id="phone"
              placeholder="Số điện thoại"
              defaultValue={signedInUser.phone}
              className={cn("rounded-xl border-slate-300")}
              readOnly
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="address">Địa chỉ</Label>
            <Input
              type="text"
              id="address"
              placeholder="Địa chỉ"
              defaultValue={signedInUser.address}
              className={cn("rounded-xl border-slate-300")}
              readOnly
            />
          </div>

          <Button
            className={cn("rounded-xl")}
            onClick={() => navigate("/user/update-info")}
          >
            <Pencil2Icon className="mr-2 w-6 h-6" /> Chỉnh sửa
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserInfo;
