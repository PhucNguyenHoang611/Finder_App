/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

import MarkChatReadOutlinedIcon from "@mui/icons-material/MarkChatReadOutlined";
import NotificationList from "@/components/Notification/NotificationList";
import { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  GET_NOTIFY_WITH_FILTER,
  GET_NUMBER_OF_NOTIFY_UNREAD
} from "@/services/graphql/queries";
// import { useAtomValue } from "jotai";
// import { signedInUserAtomWithPersistence } from "@/store";
import { MARK_NOTIFY_AS_READ } from "@/services/graphql/mutations";
import ReactPagination from "@/components/ReactPagination";

const UnreadNotificationTab = ({ notifySocket }: NotificationTabProps) => {
  // const signedInUser = useAtomValue(signedInUserAtomWithPersistence);
  const signedInUser = JSON.parse(localStorage.getItem("signedInUser") || "{}");
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>(
    []
  );
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalNotifications, setTotalNotifications] = useState(0);
  const [notifyUnRead, setNotifyUnRead] = useState(0);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value));
    setPage(1);
  };

  const [getAllNotifications] = useLazyQuery(GET_NOTIFY_WITH_FILTER, {
    context: {
      headers: {
        Authorization: `Bearer ${signedInUser.accessToken}`
      }
    }
  });

  const [getNumberOfNotifyUnRead] = useLazyQuery(GET_NUMBER_OF_NOTIFY_UNREAD, {
    context: {
      headers: {
        Authorization: `Bearer ${signedInUser.accessToken}`
      }
    }
  });

  const [markNotifyAsRead] = useMutation(MARK_NOTIFY_AS_READ, {
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

  const handleGetAllNotifications = async (
    p: number,
    pSize: number,
    load: boolean
  ) => {
    if (load) setIsLoading(true);

    try {
      const { data } = await getAllNotifications({
        variables: {
          filters: {
            page: p,
            pageSize: pSize
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

      const unreadNotifications = nList.filter((n) => !n.isRead);

      setNotifications(unreadNotifications);
      setTotalNotifications(unreadNotifications.length);
    } catch (error) {
      console.log(error);
    }

    if (load) setIsLoading(false);
  };

  const handleSelectAll = () => {
    if (selectedNotifications.length === notifications.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(notifications.map((n) => n.id));
    }
  };

  const handleMarkAsRead = async () => {
    try {
      await markNotifyAsRead({
        variables: {
          ids: selectedNotifications
        }
      });

      setSelectedNotifications([]);
      handleGetAllNotifications(page, pageSize, false);
      handleGetNumberOfNotifyUnRead();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAllNotifications(page, pageSize, true);
    handleGetNumberOfNotifyUnRead();
  }, [page, pageSize]);

  useEffect(() => {
    if (notifySocket) {
      // Listen to new comment notification
      notifySocket.on(
        "notifyComment",
        async (_payload: NewCommentNotificationSocket) => {
          handleGetAllNotifications(page, pageSize, false);
          handleGetNumberOfNotifyUnRead();
        }
      );

      // Listen to reply comment notification
      notifySocket.on(
        "notifyReplyComment",
        async (_payload: ReplyCommentNotificationSocket) => {
          handleGetAllNotifications(page, pageSize, false);
          handleGetNumberOfNotifyUnRead();
        }
      );

      // Listen to approve post notification
      notifySocket.on(
        "notifyApprovePost",
        async (_payload: ApprovePostNotificationSocket) => {
          handleGetAllNotifications(page, pageSize, false);
          handleGetNumberOfNotifyUnRead();
        }
      );
    }
  }, [notifySocket]);

  return (
    <div className="flex flex-col justify-center gap-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="select-all"
            className="rounded border-2 border-gray-400"
            checked={
              notifications.length > 0 &&
              selectedNotifications.length === notifications.length
            }
            onClick={handleSelectAll}
          />
          <Label htmlFor="select-all">Chọn tất cả</Label>
          <div className="sm:pl-10 pl-2">
            {notifyUnRead > 0 && (
              <div className="w-auto h-6 flex justify-center items-center bg-red-500 rounded-full sm:p-2 p-4">
                <p className="text-white font-semibold text-center sm:text-sm text-xs">
                  {notifyUnRead} thông báo chưa đọc
                </p>
              </div>
            )}
          </div>
        </div>

        {selectedNotifications.length > 0 && (
          <Button className="rounded-xl gap-1" onClick={handleMarkAsRead}>
            <MarkChatReadOutlinedIcon />
            <p className="xs:block hidden">Đánh dấu là đã đọc</p>
          </Button>
        )}
      </div>

      <NotificationList
        signedInUser={signedInUser}
        isLoading={isLoading}
        notifications={notifications}
        selectedNotifications={selectedNotifications}
        setSelectedNotifications={setSelectedNotifications}
      />

      {notifications.length > 0 && !isLoading && (
        <div className="w-full flex md:flex-row flex-col-reverse justify-between md:items-center items-end md:gap-2 gap-4">
          <ReactPagination
            currentPage={page}
            pageSize={pageSize}
            totalNotifications={totalNotifications}
            onPageChange={handlePageChange}
          />

          <div className="w-[150px] flex flex-col justify-center items-start gap-2">
            <label className="block text-sm font-semibold">
              Số tin mỗi trang
            </label>

            <Select
              value={pageSize.toString()}
              onValueChange={(value: string) => handlePageSizeChange(value)}
            >
              <SelectTrigger className="w-full rounded-xl border-slate-200">
                <SelectValue placeholder="Số thông báo mỗi trang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="15">15</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnreadNotificationTab;

// const updatedNotifications = notifications.filter(
//   (n) => !selectedNotifications.includes(n.id)
// );
// setNotifications(updatedNotifications);
