import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AllNotificationTab from "./Tabs/AllNotificationTab";
import UnreadNotificationTab from "./Tabs/UnreadNotificationTab";

const NotificationTabs = () => {
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
          <AllNotificationTab />
        </TabsContent>
        <TabsContent
          value="unread"
          className="rounded-xl bg-white shadow-lg p-4"
        >
          <UnreadNotificationTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationTabs;
