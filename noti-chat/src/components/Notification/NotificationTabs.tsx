/* eslint-disable react-hooks/exhaustive-deps */
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AllNotificationTab from "./Tabs/AllNotificationTab";
import UnreadNotificationTab from "./Tabs/UnreadNotificationTab";

import io, { Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { signedInUserAtomWithPersistence } from "@/store";

const NotificationTabs = () => {
  const signedInUser = useAtomValue(signedInUserAtomWithPersistence);
  const [notifySocket, setNotifySocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socket: Socket = io(import.meta.env.VITE_SOCKET_NOTIFY_URL, {
      transports: ["websocket"]
    });
    setNotifySocket(socket);

    // Register user to Socket Server
    socket.emit("register", signedInUser.id.toString());

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="w-full h-max bg-slate-200 p-4 rounded-xl">
      <Tabs defaultValue="all" className="w-full h-max">
        <TabsList className="p-0 bg-slate-200 rounded-xl gap-2">
          <TabsTrigger
            value="all"
            className="bg-white text-black data-[state=active]:bg-black data-[state=active]:text-white shadow-lg rounded-xl font-semibold px-4 py-2"
          >
            Tất cả
          </TabsTrigger>
          <TabsTrigger
            value="unread"
            className="bg-white text-black data-[state=active]:bg-black data-[state=active]:text-white shadow-lg rounded-xl font-semibold px-4 py-2"
          >
            Chưa đọc
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="rounded-xl bg-white shadow-lg p-4">
          <AllNotificationTab notifySocket={notifySocket} />
        </TabsContent>
        <TabsContent
          value="unread"
          className="rounded-xl bg-white shadow-lg p-4"
        >
          <UnreadNotificationTab notifySocket={notifySocket} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationTabs;
