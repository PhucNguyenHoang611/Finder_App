/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { useMutation } from "@apollo/client";
import { MARK_NOTIFY_AS_READ } from "@/services/graphql/mutations";
import { useEffect } from "react";

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
  notification,
  handleGetAllNotifications
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

    handleGetAllNotifications(false);

    if (
      notification.type === "NEW_COMMENT" ||
      notification.type === "REPLY_COMMENT"
    ) {
      navigate(`/post-details/${notification.postId}`);
    } else {
      navigate(`/my-posts`);
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

const NotificationDropdown = ({
  isLoading,
  signedInUser,
  notifications,
  handleGetAllNotifications,
  notifySocket
}: NotificationDropdownProps) => {
  useEffect(() => {
    if (signedInUser.accessToken) {
      handleGetAllNotifications(true);
    }

    if (notifySocket) {
      notifySocket.on(
        "notifyComment",
        async (_payload: NewCommentNotificationSocket) => {
          console.log("New comment notification received");
          handleGetAllNotifications(false);
        }
      );

      // Listen to reply comment notification
      notifySocket.on(
        "notifyReplyComment",
        async (_payload: ReplyCommentNotificationSocket) => {
          console.log("Reply comment notification received");
          handleGetAllNotifications(false);
        }
      );

      // Listen to approve post notification
      notifySocket.on(
        "notifyApprovePost",
        async (_payload: ApprovePostNotificationSocket) => {
          console.log("Approve post notification received");
          handleGetAllNotifications(false);
        }
      );
    }
  }, [notifySocket]);

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
              handleGetAllNotifications={handleGetAllNotifications}
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
