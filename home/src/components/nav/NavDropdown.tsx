import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  UserCircle2,
  PenSquare,
  KeyRound,
  LogOut
} from "lucide-react";
import { Link } from "react-router-dom";

const NavDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>FD</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-4 mr-2">
        <DropdownMenuItem className="cursor-pointer">
          <UserCircle2 className="mr-2 text-slate-600" />
          <Link to={"/user-info"}>
            Trang cá nhân
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer">
          <PenSquare className="mr-2 text-slate-600" />
          <Link to={"/update-info"}>
            Cập nhật thông tin
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer">
          <KeyRound className="mr-2 text-slate-600" />
          <Link to={"/change-password"}>
            Đổi mật khẩu
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="text-red-500 cursor-pointer">
          <LogOut className="mr-2 text-red-400" />
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavDropdown;