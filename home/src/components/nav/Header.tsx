/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import SearchBar from "./SearchBar";
import NavDrawer from "./NavDrawer";
import NavDropdown from "./NavDropdown";
import NotificationDropdown from "@/components/Notification/NotificationDropdown";
import { useAtomValue } from "jotai";
import { signedInUserAtom } from "@/store";
import io, { Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_NOTIFY_WITH_FILTER } from "@/services/graphql/queries";

const Header = () => {
  const location = useLocation();
  const signedInUser = useAtomValue(signedInUserAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [notifySocket, setNotifySocket] = useState<Socket | null>(null);

  const [getAllNotifications] = useLazyQuery(GET_NOTIFY_WITH_FILTER, {
    context: {
      headers: {
        Authorization: `Bearer ${signedInUser.accessToken}`
      }
    }
  });

  const handleGetAllNotifications = async (load: boolean) => {
    if (load) setIsLoading(true);

    try {
      const { data } = await getAllNotifications({
        variables: {
          filters: {
            page: 1,
            pageSize: 4
          }
        },
        fetchPolicy: "network-only"
      });
      const resultData = data.getNotifyWithFilter.data;

      const nList: any[] = resultData.listData.map((item: any) => {
        if (item.type === "NEW_COMMENT" || item.type === "REPLY_COMMENT") {
          return {
            id: item.id,
            commentId: item.commentId,
            content: item.content,
            isRead: item.isRead,
            parentCommentId: item.parentCommentId,
            postId: item.postId,
            postTitle: item.postTitle,
            senderAvatar: item.senderAvatar,
            senderId: item.senderId,
            senderName: item.senderName,
            timestamp: new Date(item.timestamp),
            type: item.type
          };
        } else {
          return {
            id: item.id,
            approved: item.approved,
            isRead: item.isRead,
            postId: item.postId,
            postTitle: item.postTitle,
            timestamp: new Date(item.timestamp),
            type: item.type
          };
        }
      });

      setNotifications(nList);
    } catch (error) {
      console.log(error);
    }

    if (load) setIsLoading(false);
  };

  useEffect(() => {
    if (signedInUser.accessToken) {
      const socket: Socket = io(import.meta.env.VITE_SOCKET_NOTIFY_URL, {
        transports: ["websocket"]
      });
      setNotifySocket(socket);

      // Register user to Socket Server
      socket.emit("register", signedInUser.id.toString());

      return () => {
        socket.disconnect();
      };
    }
  }, []);

  return (
    <header
      className="py-2 min-[1024px]:px-10 min-[768px]:px-6 max-[768px]:px-4 w-full flex justify-between items-center fixed bg-[#f4f6f9] shadow-gray-200 shadow-sm"
      style={{ zIndex: 1000 }}
    >
      <div className="flex justify-center items-center">
        {location.pathname !== "/sign-in" &&
        location.pathname !== "/sign-up" ? (
          <NavDrawer />
        ) : null}

        <Link
          to={"/"}
          className="min-[1024px]:flex max-[1024px]:hidden min-[1024px]:ml-6 justify-center items-center"
        >
          <img src="/mainLogo_nt.png" alt="mainLogo" className="w-16" />
          <h1 className="font-bold text-2xl text-center">Finder</h1>
        </Link>
      </div>

      <div className="w-full flex min-[1024px]:justify-center max-[1024px]:justify-end items-center">
        {location.pathname !== "/sign-in" &&
        location.pathname !== "/sign-up" ? (
          <SearchBar />
        ) : null}
      </div>

      <ul className="min-[1024px]:flex max-[1024px]:hidden">
        <li
          className={`${
            signedInUser.email ? "hidden" : "flex"
          } justify-start gap-2 bottom-4`}
        >
          <Link to={"/sign-in"}>
            <Button className="w-30 rounded-xl">Đăng nhập</Button>
          </Link>
          <Link to={"/sign-up"}>
            <Button className="bg-transparent border border-black text-black w-30 rounded-xl">
              Đăng ký
            </Button>
          </Link>
        </li>

        <li
          className={`${
            signedInUser.email ? "flex" : "hidden"
          } justify-center items-center mr-6`}
        >
          <NotificationDropdown
            isLoading={isLoading}
            signedInUser={signedInUser}
            notifications={notifications}
            handleGetAllNotifications={handleGetAllNotifications}
            notifySocket={notifySocket}
          />
        </li>

        <li
          className={`${
            signedInUser.email ? "flex" : "hidden"
          } justify-center items-center`}
        >
          <NavDropdown />
        </li>
      </ul>
    </header>
  );
};

export default Header;
