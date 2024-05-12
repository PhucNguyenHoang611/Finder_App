import { Link, useLocation } from "react-router-dom";

import {
  Drawer,
  DrawerContent,
  DrawerTrigger
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

import {
  Bell,
  Bug,
  Dog,
  HandHeart,
  PersonStanding,
  PhoneOff,
  TextSearch,
  Upload,
  UsersRound,
  AlignLeft,
  LogOut
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const NavDrawer = () => {
  const location = useLocation();
  const temp = true;

  return (
    <Drawer direction="left">
      <DrawerTrigger className="lg:hidden">
        <AlignLeft />
      </DrawerTrigger>
      <DrawerContent className="bg-white rounded-none flex flex-col h-full md:w-[35%] sm:w-[55%] w-[75%] mt-24 fixed bottom-0 left-0 md:px-8 sm:px-6 px-4">
        <ul className="text-apptext-1 w-full my-6">
          <hr className="text-black border my-2" />

          <li>
            <Link to={"/create-post"}>
              <div className={`${location.pathname === "/create-post" ? "bg-gray-300" : ""} sm:text-md text-sm p-2 font-semibold flex gap-2 w-full hover:bg-appbg-2 border border-transparent rounded-xl text-black`}>
                <Upload className="text-black" />
                Đăng tin
              </div>
            </Link>
          </li>
          <li>
            <Link to={`/result-list`}>
              <div className={`${location.pathname === "/result-list" ? "bg-gray-300" : ""} sm:text-md text-sm p-2 font-semibold flex gap-2 w-full hover:bg-appbg-2 border border-transparent rounded-xl text-black`}>
                <TextSearch className="text-black" />
                Tin cần tìm
              </div>
            </Link>
          </li>
          <li>
            <Link to={"/result-list"}>
              <div className={`${location.pathname === "/result-list" ? "bg-gray-300" : ""} sm:text-md text-sm p-2 font-semibold flex gap-2 w-full hover:bg-appbg-2 border border-transparent rounded-xl text-black`}>
                <HandHeart className="text-black" />
                Tin nhặt được
              </div>
            </Link>
          </li>
          <li>
            <Link to={"/result-list"}>
              <div className={`${location.pathname === "/result-list" ? "bg-gray-300" : ""} sm:text-md text-sm p-2 font-semibold flex gap-2 w-full hover:bg-appbg-2 border border-transparent rounded-xl text-black`}>
                <Dog className="text-black" />
                Tìm thú cưng
              </div>
            </Link>
          </li>
          <li>
            <Link to={"/result-list"}>
              <div className={`${location.pathname === "/result-list" ? "bg-gray-300" : ""} sm:text-md text-sm p-2 font-semibold flex gap-2 w-full hover:bg-appbg-2 border border-transparent rounded-xl text-black`}>
                <PersonStanding className="text-black" />
                Tìm người
              </div>
            </Link>
          </li>
          <hr className="text-black border my-2" />
          <li>
            <Link to={"/scam"}>
              <div className={`${location.pathname === "/scam" ? "bg-gray-300" : ""} sm:text-md text-sm p-2 font-semibold flex gap-2 w-full hover:bg-appbg-2 border border-transparent rounded-xl text-black`}>
                <PhoneOff className="text-black" />
                Cảnh báo lừa đảo
              </div>
            </Link>
          </li>
          <li>
            <Link to={"/aboutus"}>
              <div className={`${location.pathname === "/aboutus" ? "bg-gray-300" : ""} sm:text-md text-sm p-2 font-semibold flex gap-2 w-full hover:bg-appbg-2 border border-transparent rounded-xl text-black`}>
                <UsersRound className="text-black" />
                Giới thiệu
              </div>
            </Link>
          </li>
          <li>
            <Link to={"/contact"}>
              <div className={`${location.pathname === "/contact" ? "bg-gray-300" : ""} sm:text-md text-sm p-2 font-semibold flex gap-2 w-full hover:bg-appbg-2 border border-transparent rounded-xl text-black`}>
                <Bug className="text-black" />
                Liên hệ chúng tôi
              </div>
            </Link>
          </li>

          <hr className="text-black border my-2" />

          <li>
            <Link to={"/notification"}>
              <div className="flex justify-between items-center w-full gap-2 hover:bg-appbg-2 p-2 rounded-xl">
                <div className={`${location.pathname === "/notification" ? "bg-gray-300" : ""} sm:text-md text-sm font-semibold flex gap-2 w-full border border-transparent text-black`}>
                  <Bell className="text-black" />
                  Thông báo
                </div>

                <div className="w-auto h-6 flex justify-center items-center bg-red-500 rounded-full p-2">
                  <p className="text-white font-bold text-center">999</p>
                </div>
              </div>
            </Link>
          </li>
        </ul>

        <ul className="w-full">
          <li className="flex flex-col justify-center items-center gap-2 w-full">
            <Link to={"/sign-in"} className="w-full flex justify-center items-center">
              <Button className="sm:w-[50%] w-full rounded-xl sm:text-md text-sm">Đăng nhập</Button>
            </Link>
            <Link to={"/sign-up"} className="w-full flex justify-center items-center">
              <Button className="bg-transparent border border-black text-black sm:w-[50%] w-full rounded-xl sm:text-md text-sm">
                Đăng ký
              </Button>
            </Link>
          </li>

          <li className={`${!temp ? "block" : "hidden"}`}>
            <div className="p-2 font-bold flex flex-col justify-center items-start gap-4 w-full sm:text-md text-sm border border-transparent	rounded-xl">
              <Link to={"/user-info"}>
                <div className="flex justify-between items-center gap-2">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>FD</AvatarFallback>
                    </Avatar>

                  {"Nguyễn Hoàng Phúc"}
                </div>
              </Link>

              <div className="flex justify-center items-center gap-1 w-full bg-red-500 p-2 rounded-xl">
                <LogOut className="text-white" />
                <p className="text-white">Đăng xuất</p>
              </div>
            </div>
          </li>
        </ul>
      </DrawerContent>
    </Drawer>
  );
};

export default NavDrawer;