/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams
} from "react-router-dom";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

import {
  Bell,
  Dog,
  HandHeart,
  PersonStanding,
  PhoneOff,
  TextSearch,
  Upload,
  UsersRound,
  AlignLeft,
  LogOut,
  ScanSearch
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSignedInUserAtom } from "@/store";
import { AuthenticateService } from "@/services/api";
import { RESET } from "jotai/utils";
import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_NUMBER_OF_NOTIFY_UNREAD } from "@/services/graphql/queries";
import io, { Socket } from "socket.io-client";

const NavDrawer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, _setSearchParams] = useSearchParams();
  const [signedInUser, setSignedInUser] = useSignedInUserAtom();
  const [notifyUnRead, setNotifyUnRead] = useState(0);

  const handleLogout = async () => {
    await AuthenticateService.authControllerLogout();
    setSignedInUser(RESET);

    navigate("/sign-in");
  };

  const [getNumberOfNotifyUnRead] = useLazyQuery(GET_NUMBER_OF_NOTIFY_UNREAD, {
    context: {
      headers: {
        Authorization: `Bearer ${signedInUser.accessToken}`
      }
    }
  });

  const handleGetNumberOfNotifyUnRead = async () => {
    try {
      const { data } = await getNumberOfNotifyUnRead({
        fetchPolicy: "network-only"
      });
      const resultData = data.getNumberOfNotifyUnRead.data;

      setNotifyUnRead(resultData.unRead);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (signedInUser.accessToken) {
      handleGetNumberOfNotifyUnRead();

      const socket: Socket = io(import.meta.env.VITE_SOCKET_NOTIFY_URL, {
        transports: ["websocket"]
      });

      // Register user to Socket Server
      socket.emit("register", signedInUser.id.toString());

      socket.on(
        "notifyComment",
        async (_payload: NewCommentNotificationSocket) => {
          console.log("New comment notification received from sidebar");
          handleGetNumberOfNotifyUnRead();
        }
      );

      // Listen to reply comment notification
      socket.on(
        "notifyReplyComment",
        async (_payload: ReplyCommentNotificationSocket) => {
          console.log("Reply comment notification received from sidebar");
          handleGetNumberOfNotifyUnRead();
        }
      );

      // Listen to approve post notification
      socket.on(
        "notifyApprovePost",
        async (_payload: ApprovePostNotificationSocket) => {
          console.log("Approve post notification received from sidebar");
          handleGetNumberOfNotifyUnRead();
        }
      );

      return () => {
        socket.disconnect();
      };
    }
  }, []);

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
              <div
                className={`${
                  location.pathname === "/create-post" ? "bg-gray-300" : ""
                } sm:text-md text-sm p-2 font-semibold flex gap-2 w-full hover:bg-appbg-2 border border-transparent rounded-xl text-black`}
              >
                <Upload className="text-black" />
                Đăng tin
              </div>
            </Link>
          </li>
          <li>
            <Link to={`/result-list?filter=lost`}>
              <div
                className={`${
                  location.pathname === "/result-list" &&
                  searchParams.get("filter") === "lost"
                    ? "bg-gray-300"
                    : ""
                } sm:text-md text-sm p-2 font-semibold flex gap-2 w-full hover:bg-appbg-2 border border-transparent rounded-xl text-black`}
              >
                <TextSearch className="text-black" />
                Tin cần tìm
              </div>
            </Link>
          </li>
          <li>
            <Link to={"/result-list?filter=collect"}>
              <div
                className={`${
                  location.pathname === "/result-list" &&
                  searchParams.get("filter") === "collect"
                    ? "bg-gray-300"
                    : ""
                } sm:text-md text-sm p-2 font-semibold flex gap-2 w-full hover:bg-appbg-2 border border-transparent rounded-xl text-black`}
              >
                <HandHeart className="text-black" />
                Tin nhặt được
              </div>
            </Link>
          </li>
          <li>
            <Link to={"/result-list?filter=pet"}>
              <div
                className={`${
                  location.pathname === "/result-list" &&
                  searchParams.get("filter") === "pet"
                    ? "bg-gray-300"
                    : ""
                } sm:text-md text-sm p-2 font-semibold flex gap-2 w-full hover:bg-appbg-2 border border-transparent rounded-xl text-black`}
              >
                <Dog className="text-black" />
                Tìm thú cưng
              </div>
            </Link>
          </li>
          <li>
            <Link to={"/result-list?filter=people"}>
              <div
                className={`${
                  location.pathname === "/result-list" &&
                  searchParams.get("filter") === "people"
                    ? "bg-gray-300"
                    : ""
                } sm:text-md text-sm p-2 font-semibold flex gap-2 w-full hover:bg-appbg-2 border border-transparent rounded-xl text-black`}
              >
                <PersonStanding className="text-black" />
                Tìm người
              </div>
            </Link>
          </li>
          <li>
            <Link to={"/result-list"}>
              <div
                className={`${
                  location.pathname === "/result-list" && !searchParams
                    ? "bg-gray-300"
                    : ""
                } sm:text-md text-sm p-2 font-semibold flex gap-2 w-full hover:bg-appbg-2 border border-transparent rounded-xl text-black`}
              >
                <ScanSearch className="text-black" />
                Tìm kiếm nâng cao
              </div>
            </Link>
          </li>
          <hr className="text-black border my-2" />
          <li>
            <Link to={"/about-us"}>
              <div
                className={`${
                  location.pathname === "/about-us" ? "bg-gray-300" : ""
                } sm:text-md text-sm p-2 font-semibold flex gap-2 w-full hover:bg-appbg-2 border border-transparent rounded-xl text-black`}
              >
                <UsersRound className="text-black" />
                Giới thiệu Finder
              </div>
            </Link>
          </li>
          <li>
            <Link to={"/scam-warning"}>
              <div
                className={`${
                  location.pathname === "/scam-warning" ? "bg-gray-300" : ""
                } sm:text-md text-sm p-2 font-semibold flex gap-2 w-full hover:bg-appbg-2 border border-transparent rounded-xl text-black`}
              >
                <PhoneOff className="text-black" />
                Cảnh báo lừa đảo
              </div>
            </Link>
          </li>
          {/* <li>
            <Link to={"/contact"}>
              <div
                className={`${
                  location.pathname === "/contact" ? "bg-gray-300" : ""
                } sm:text-md text-sm p-2 font-semibold flex gap-2 w-full hover:bg-appbg-2 border border-transparent rounded-xl text-black`}
              >
                <Bug className="text-black" />
                Liên hệ chúng tôi
              </div>
            </Link>
          </li> */}

          {signedInUser.email && (
            <>
              <hr className="text-black border my-2" />

              <li>
                <Link to={"/notification"}>
                  <div
                    className={`${
                      location.pathname === "/notification" ? "bg-gray-300" : ""
                    } flex justify-between items-center w-full hover:bg-appbg-2 rounded-xl p-2`}
                  >
                    <div
                      className={
                        "sm:text-md text-sm font-semibold flex gap-2 w-full border border-transparent text-black"
                      }
                    >
                      <Bell className="text-black" />
                      Thông báo
                    </div>

                    {notifyUnRead > 0 && (
                      <div className="hidden w-auto h-6 flex justify-center items-center bg-red-500 rounded-full p-2">
                        <p className="text-white font-bold text-center">
                          {notifyUnRead}
                        </p>
                      </div>
                    )}
                  </div>
                </Link>
              </li>
            </>
          )}
        </ul>

        <ul className="w-full">
          <li
            className={`${
              signedInUser.email ? "hidden" : "flex"
            } flex-col justify-center items-center gap-2 w-full`}
          >
            <Link
              to={"/sign-in"}
              className="w-full flex justify-center items-center"
            >
              <Button className="sm:w-[50%] w-full rounded-xl sm:text-md text-sm">
                Đăng nhập
              </Button>
            </Link>
            <Link
              to={"/sign-up"}
              className="w-full flex justify-center items-center"
            >
              <Button className="bg-transparent border border-black text-black sm:w-[50%] w-full rounded-xl sm:text-md text-sm">
                Đăng ký
              </Button>
            </Link>
          </li>

          <li className={`${signedInUser.email ? "block" : "hidden"}`}>
            <div className="p-2 font-bold flex flex-col justify-center items-start gap-4 w-full sm:text-md text-sm border border-transparent	rounded-xl">
              <Link to={"/user-info"}>
                <div className="flex justify-between items-center gap-2">
                  <Avatar>
                    <AvatarImage src={signedInUser.avatar} />
                    <AvatarFallback>FD</AvatarFallback>
                  </Avatar>

                  {signedInUser.displayName}
                </div>
              </Link>

              <div
                className="flex justify-center items-center gap-1 w-full bg-red-500 p-2 rounded-xl cursor-pointer"
                onClick={handleLogout}
              >
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
