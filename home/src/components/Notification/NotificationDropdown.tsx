/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { Bell, BellDotIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_NOTIFY_WITH_FILTER } from "@/services/graphql/queries";
import { MARK_NOTIFY_AS_READ } from "@/services/graphql/mutations";
import { useAtomValue } from "jotai";
import { signedInUserAtom } from "@/store";

const EmptyNotificationsList = () => {
  return (
    <div className="w-full h-[100px] flex justify-center items-center">
      <p className="text-center font-semibold text-slate-500">
        Không có thông báo nào
      </p>
    </div>
  );
};

const NotificationDropdownItem = ({
  signedInUser,
  notification
}: NotificationDropdownItemProps) => {
  const navigate = useNavigate();

  const [markNotifyAsRead] = useMutation(MARK_NOTIFY_AS_READ, {
    context: {
      headers: {
        Authorization: `Bearer ${signedInUser.accessToken}`
      }
    }
  });

  const handleNavigateToPost = async () => {
    if (!notification.isRead) {
      try {
        await markNotifyAsRead({
          variables: {
            ids: [notification.id]
          }
        });
      } catch (error) {
        console.log(error);
      }
    }

    if (
      notification.type === "NEW_COMMENT" ||
      notification.type === "REPLY_COMMENT"
    ) {
      navigate(`/post-details/${notification.postId}`);
    } else {
      navigate(`/my-posts/${notification.postId}`);
    }
  };

  const renderNotificationTitle = () => {
    if (notification.type === "NEW_COMMENT") {
      const title1 = "Bình luận mới về bài viết của bạn";

      return title1.length > 50 ? title1.slice(0, 50) + "..." : title1;
    }

    if (notification.type === "REPLY_COMMENT") {
      const title2 = "Phản hồi mới về bình luận của bạn";

      return title2.length > 50 ? title2.slice(0, 50) + "..." : title2;
    }

    if (notification.type === "APPROVE_POST") {
      if ((notification as PostNotification).approved === "ACCEPT") {
        const title3 = "Bài viết của bạn đã được duyệt";

        return title3.length > 50 ? title3.slice(0, 50) + "..." : title3;
      } else {
        const title4 = "Bài viết của bạn đã bị từ chối";

        return title4.length > 50 ? title4.slice(0, 50) + "..." : title4;
      }
    }

    return "";
  };

  const renderNotificationDescription = () => {
    if (notification.type === "NEW_COMMENT") {
      const des1 = `${
        (notification as CommentNotification).senderName
      } đã bình luận vào bài viết: "${notification.postTitle}"`;

      return des1.length > 50 ? des1.slice(0, 50) + "..." : des1;
    }

    if (notification.type === "REPLY_COMMENT") {
      const des2 = `${
        (notification as CommentNotification).senderName
      } đã phản hồi bình luận của bạn: "${
        (notification as CommentNotification).content
      }"`;

      return des2.length > 50 ? des2.slice(0, 50) + "..." : des2;
    }

    if (notification.type === "APPROVE_POST") {
      if ((notification as PostNotification).approved === "ACCEPT") {
        const des3 = `Bài viết của bạn đã được duyệt: "${notification.postTitle}"`;

        return des3.length > 50 ? des3.slice(0, 50) + "..." : des3;
      } else {
        const des4 = `Bài viết của bạn đã bị từ chối: "${notification.postTitle}"`;

        return des4.length > 50 ? des4.slice(0, 50) + "..." : des4;
      }
    }

    return "";
  };

  return (
    <DropdownMenuItem className="cursor-pointer w-full rounded-lg">
      <Alert
        className={`border-none ${
          notification.isRead ? "bg-slate-100" : "bg-slate-300"
        }`}
        onClick={handleNavigateToPost}
      >
        <AlertTitle>{renderNotificationTitle()}</AlertTitle>

        <AlertDescription>{renderNotificationDescription()}</AlertDescription>
      </Alert>
    </DropdownMenuItem>
  );
};

const NotificationDropdown = () => {
  const signedInUser = useAtomValue(signedInUserAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const [getAllNotifications] = useLazyQuery(GET_NOTIFY_WITH_FILTER, {
    context: {
      headers: {
        Authorization: `Bearer ${signedInUser.accessToken}`
      }
    }
  });

  const handleGetAllNotifications = async () => {
    setIsLoading(true);

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

    setIsLoading(false);
  };

  useEffect(() => {
    if (signedInUser.accessToken) {
      handleGetAllNotifications();
    }
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {notifications.length > 0 &&
        notifications.some((item) => !item.isRead) ? (
          <BellDotIcon className="text-red-500" />
        ) : (
          <Bell />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-6 mr-2 w-[500px]">
        <DropdownMenuLabel>Thông báo</DropdownMenuLabel>

        {notifications.length > 0 &&
          !isLoading &&
          notifications.map((item: INotification, index: number) => (
            <NotificationDropdownItem
              key={index}
              signedInUser={signedInUser}
              notification={item}
            />
          ))}

        {notifications.length === 0 && !isLoading && <EmptyNotificationsList />}

        {isLoading && (
          <div className="w-full flex flex-col justify-center items-center space-y-3 my-2">
            <div className="w-full flex items-center space-x-4 pl-2">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[400px]" />
                <Skeleton className="h-4 w-[300px]" />
              </div>
            </div>

            <div className="w-full flex items-center space-x-4 pl-2">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[400px]" />
                <Skeleton className="h-4 w-[300px]" />
              </div>
            </div>

            <div className="w-full flex items-center space-x-4 pl-2">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[400px]" />
                <Skeleton className="h-4 w-[300px]" />
              </div>
            </div>
          </div>
        )}

        <DropdownMenuSeparator />

        <div className="cursor-pointer flex justify-end items-center my-2 mr-2">
          <Link to="/notification">
            <p className="font-semibold text-sm text-blue-500 hover:text-blue-600">
              Xem thêm...
            </p>
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
