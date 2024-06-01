/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { GET_NUMBER_OF_NOTIFY_UNREAD } from "@/services/graphql/queries";
import { signedInUserAtom } from "@/store";
import { useLazyQuery } from "@apollo/client";
import { useAtomValue } from "jotai";
import {
  Bell,
  Bug,
  Dog,
  HandHeart,
  PersonStanding,
  PhoneOff,
  TextSearch,
  Upload,
  UsersRound
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

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
      const { data } = await getNumberOfNotifyUnRead();
      const resultData = data.getNumberOfNotifyUnRead.data;

      setNotifyUnRead(resultData.unRead);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (signedInUser.accessToken) {
      handleGetNumberOfNotifyUnRead();
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
        <hr className="text-black border my-2" />
        <li>
          <Link to={"/scam"}>
            <div
              className={`${
                location.pathname === "/scam" ? "bg-gray-300" : ""
              } p-2 font-semibold flex gap-2 w-full hover:bg-appbg-2 border border-transparent rounded-xl text-black`}
            >
              <PhoneOff className="text-black" />
              Cảnh báo lừa đảo
            </div>
          </Link>
        </li>
        <li>
          <Link to={"/aboutus"}>
            <div
              className={`${
                location.pathname === "/aboutus" ? "bg-gray-300" : ""
              } p-2 font-semibold flex gap-2 w-full hover:bg-appbg-2 border border-transparent rounded-xl text-black`}
            >
              <UsersRound className="text-black" />
              Giới thiệu
            </div>
          </Link>
        </li>
        <li>
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
        </li>

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
                    <div className="w-auto h-6 flex justify-center items-center bg-red-500 rounded-full p-2">
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
