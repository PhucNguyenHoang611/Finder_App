import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { useMutation } from "@apollo/client";
import { MARK_NOTIFY_AS_READ } from "@/services/graphql/mutations";
import { useNavigate } from "react-router-dom";

const NotificationCard = ({
  signedInUser,
  notification,
  selectedNotifications,
  setSelectedNotifications
}: NotificationCardProps) => {
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

  const handleSelectNotification = () => {
    setSelectedNotifications((prev) =>
      prev.includes(notification.id)
        ? prev.filter((item) => item !== notification.id)
        : [...prev, notification.id]
    );
  };

  const renderNotificationDescription = () => {
    if (notification.type === "NEW_COMMENT") {
      const des1 = `${
        (notification as CommentNotification).senderName
      } đã bình luận vào bài viết: "${notification.postTitle}"`;

      return des1.length > 200 ? des1.slice(0, 200) + "..." : des1;
    }

    if (notification.type === "REPLY_COMMENT") {
      const des2 = `${
        (notification as CommentNotification).senderName
      } đã phản hồi bình luận của bạn: "${
        (notification as CommentNotification).content
      }"`;

      return des2.length > 200 ? des2.slice(0, 200) + "..." : des2;
    }

    if (notification.type === "APPROVE_POST") {
      if ((notification as PostNotification).approved === "ACCEPT") {
        const des3 = `Bài viết của bạn đã được duyệt: "${notification.postTitle}"`;

        return des3.length > 200 ? des3.slice(0, 200) + "..." : des3;
      } else {
        const des4 = `Bài viết của bạn đã bị từ chối: "${notification.postTitle}"`;

        return des4.length > 200 ? des4.slice(0, 200) + "..." : des4;
      }
    }

    return "";
  };

  return (
    <Card
      className={`rounded-xl cursor-pointer flex sm:flex-row flex-col justify-center items-center p-2 ${
        !notification.isRead ? "bg-gray-200" : ""
      }`}
    >
      <CardHeader className="sm:w-2/3 w-full flex flex-row justify-between items-center p-4">
        <div className="sm:w-full w-1/2 flex flex-col gap-2">
          <Badge
            className="w-max"
            style={{
              backgroundColor:
                notification.type === "NEW_COMMENT"
                  ? "#3399ff"
                  : notification.type === "REPLY_COMMENT"
                  ? "#ffcc00"
                  : notification.type === "APPROVE_POST" &&
                    (notification as PostNotification).approved === "ACCEPT"
                  ? "#00cc66"
                  : "#ff3300"
            }}
          >
            {notification.type === "NEW_COMMENT" && "Bình luận mới"}

            {notification.type === "REPLY_COMMENT" && "Phản hồi mới"}

            {notification.type === "APPROVE_POST" &&
              (notification as PostNotification).approved === "ACCEPT" &&
              "Duyệt bài đăng"}

            {notification.type === "APPROVE_POST" &&
              (notification as PostNotification).approved === "REJECT" &&
              "Từ chối bài đăng"}
          </Badge>

          <CardTitle
            className="sm:text-lg text-md text-pretty hover:text-slate-600"
            onClick={handleNavigateToPost}
          >
            {notification.type === "NEW_COMMENT" &&
              "Bình luận mới về bài viết của bạn"}

            {notification.type === "REPLY_COMMENT" &&
              "Phản hồi mới về bình luận của bạn"}

            {notification.type === "APPROVE_POST" &&
              (notification as PostNotification).approved === "ACCEPT" &&
              "Bài viết của bạn đã được duyệt"}

            {notification.type === "APPROVE_POST" &&
              (notification as PostNotification).approved === "REJECT" &&
              "Bài viết của bạn đã bị từ chối"}
          </CardTitle>

          <CardDescription className="sm:text-md text-sm md:text-nowrap md:truncate">
            {renderNotificationDescription()}
          </CardDescription>
        </div>

        <div className="w-1/2 sm:hidden flex justify-end items-center">
          <Checkbox
            className="rounded border-2 border-gray-400"
            checked={selectedNotifications.includes(notification.id)}
            onClick={handleSelectNotification}
          />
        </div>
      </CardHeader>
      <CardContent className="sm:w-1/3 w-full sm:p-0 p-2 mt-0 flex sm:flex-row sm:justify-between justify-end items-center">
        <div className="flex gap-1 justify-center items-center">
          <AccessTimeOutlinedIcon className="w-2 h-2" />
          <p className="sm:text-base text-sm">
            {notification.timestamp.toLocaleDateString("vi-VN", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit"
            })}
          </p>
        </div>

        <div className="sm:block hidden pr-4">
          <Checkbox
            className="rounded border-2 border-gray-400"
            checked={selectedNotifications.includes(notification.id)}
            onClick={handleSelectNotification}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
