/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import ChatBox from "./ChatBox";
import { useAtomValue } from "jotai";
import { signedInUserAtomWithPersistence } from "@/store";
import { useLazyQuery } from "@apollo/client";
import {
  COUNT_UNREAD_MESSAGE_WITH_ADMIN,
  GET_DETAIL_CONVERSATION_WITH_ADMIN
} from "@/services/graphql/queries";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

// const tempToken = "";

const ChatPopover = () => {
  const signedInUser = useAtomValue(signedInUserAtomWithPersistence);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [pageSize, setPageSize] = useState<number>(10);
  const [hasMoreSection, setHasMoreSection] = useState<boolean>(false);

  const [unreadMessage, setUnreadMessage] = useState<number>(0);
  const [chatSocket, setChatSocket] = useState<Socket | null>(null);
  const [chatSections, setChatSections] = useState<ChatSection[]>([]);
  const [getDetailConversationWithAdmin] = useLazyQuery(
    GET_DETAIL_CONVERSATION_WITH_ADMIN,
    {
      context: {
        headers: {
          Authorization: `Bearer ${signedInUser?.accessToken}` //`Bearer ${tempToken}
        }
      }
    }
  );
  const [countUnreadMessageWithAdmin] = useLazyQuery(
    COUNT_UNREAD_MESSAGE_WITH_ADMIN,
    {
      context: {
        headers: {
          Authorization: `Bearer ${signedInUser?.accessToken}` //`Bearer ${tempToken}
        }
      }
    }
  );

  const handleGetDetailConversationWithAdmin = async () => {
    setIsLoading(true);

    try {
      const { data } = await getDetailConversationWithAdmin({
        variables: {
          filters: {
            page: 1,
            pageSize: pageSize
          }
        },
        fetchPolicy: "network-only"
      });

      const resultData = data.getDetailConversationWithAdmin.data.listData;

      if (
        chatSections.length ===
        data.getDetailConversationWithAdmin.data.totalCount
      ) {
        setHasMoreSection(false);
        setIsLoading(false);
      } else setHasMoreSection(true);

      const csList: ChatSection[] = resultData.map((cs: ChatSection) => {
        return {
          id: cs.id,
          clusMessages: cs.clusMessages.map((cm: ClusMessage) => {
            return {
              id: cm.id,
              senderId: cm.senderId,
              messages: cm.messages.map((m: Message) => {
                return {
                  id: m.id,
                  isRead: m.isRead,
                  isEdited: m.isEdited,
                  message: m.message,
                  createdDate: new Date(m.createdDate),
                  updatedDate: new Date(m.updatedDate)
                };
              }),
              createdDate: new Date(cm.createdDate),
              updatedDate: new Date(cm.updatedDate)
            };
          }),
          createdDate: new Date(cs.createdDate),
          updatedDate: new Date(cs.updatedDate)
        };
      });

      setChatSections(csList.reverse());
      handleCountUnreadMessage();
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  const handleCountUnreadMessage = async () => {
    try {
      await countUnreadMessageWithAdmin({
        fetchPolicy: "network-only"
      }).then((res) => {
        const resultData = res.data.countUnreadMessageWithAdmin.data;
        setUnreadMessage(resultData.unreadCount);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoadMoreMessages = async () => {
    if (hasMoreSection) setPageSize((prev) => prev + 10);
  };

  useEffect(() => {
    if (signedInUser.accessToken) {
      handleGetDetailConversationWithAdmin();
    }

    const socket: Socket = io(import.meta.env.VITE_SOCKET_CHAT_URL, {
      transports: ["websocket"]
    });
    setChatSocket(socket);

    // Register user to Socket Server
    socket.emit("register", signedInUser.id.toString());
    socket.on("newMessage", async (_payload: NewMessageSocket) => {
      handleGetDetailConversationWithAdmin();
      handleCountUnreadMessage();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (pageSize > 10 && hasMoreSection) handleGetDetailConversationWithAdmin();
  }, [pageSize]);

  return (
    <div className="fixed md:right-4 right-2 md:bottom-4 bottom-2">
      <Popover>
        <PopoverTrigger className="bg-black rounded-full text-white md:p-4 p-2 relative">
          {unreadMessage > 0 && (
            <div className="absolute w-max h-6 top-[-5px] right-[-5px] rounded-full flex items-center justify-center bg-red-500 md:text-sm text-xs md:px-2 px-1">
              {unreadMessage}
            </div>
          )}

          <MessageOutlinedIcon />
        </PopoverTrigger>
        <PopoverContent
          side="left"
          className="lg:w-[350px] md:w-[320px] w-[280px] rounded-xl border-none shadow-xl ms:mr-2 mr-1 md:mb-4 mb-2 p-0"
        >
          <ChatBox
            isLoading={isLoading}
            signedInUser={signedInUser}
            chatSections={chatSections}
            countUnread={handleCountUnreadMessage}
            getDetailConversation={handleGetDetailConversationWithAdmin}
            loadMoreMessages={handleLoadMoreMessages}
            hasMoreSection={hasMoreSection}
            chatSocket={chatSocket}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ChatPopover;
