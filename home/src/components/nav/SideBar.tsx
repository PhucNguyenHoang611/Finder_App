/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { GET_NUMBER_OF_NOTIFY_UNREAD } from "@/services/graphql/queries";
import { signedInUserAtom } from "@/store";
import { useLazyQuery } from "@apollo/client";
import { useAtomValue } from "jotai";
import {
  Bell,
  Dog,
  HandHeart,
  PersonStanding,
  PhoneOff,
  TextSearch,
  Upload,
  UsersRound,
  ScanSearch
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import io, { Socket } from "socket.io-client";

const SideBar = () => {
  const location = useLocation();
  const [searchParams, _setSearchParams] = useSearchParams();
  const signedInUser = useAtomValue(signedInUserAtom);
  const [notifyUnRead, setNotifyUnRead] = useState(0);

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
    <nav className="flex justify-center items-start gap-4 w-full h-full">
      <ul className="text-apptext-1 w-full">
        <hr className="text-black border my-2" />

        <li>
          <Link to={"/create-post"}>
            <div
              className={`${
                location.pathname === "/create-post" ? "bg-gray-300" : ""
              } p-2 font-semibold flex gap-2 w-full hover:bg-appbg-2 border border-transparent rounded-xl text-black`}
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
              } p-2 font-semibold flex gap-2 w-full hover:bg-appbg-2 border border-transparent rounded-xl text-black`}
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
              } p-2 font-semibold flex gap-2 w-full hover:bg-appbg-2 border border-transparent rounded-xl text-black`}
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
              } p-2 font-semibold flex gap-2 w-full hover:bg-appbg-2 border border-transparent rounded-xl text-black`}
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
              } p-2 font-semibold flex gap-2 w-full hover:bg-appbg-2 border border-transparent rounded-xl text-black`}
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
              } p-2 font-semibold flex gap-2 w-full hover:bg-appbg-2 border border-transparent rounded-xl text-black`}
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
              } p-2 font-semibold flex gap-2 w-full hover:bg-appbg-2 border border-transparent rounded-xl text-black`}
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
              } p-2 font-semibold flex gap-2 w-full hover:bg-appbg-2 border border-transparent rounded-xl text-black`}
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
              } p-2 font-semibold flex gap-2 w-full hover:bg-appbg-2 border border-transparent rounded-xl text-black`}
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
                  <div className="font-semibold flex gap-2 w-full border border-transparent text-black">
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
    </nav>
  );
};

export default SideBar;
