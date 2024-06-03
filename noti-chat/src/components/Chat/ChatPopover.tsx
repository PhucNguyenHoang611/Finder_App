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
import { GET_DETAIL_CONVERSATION_WITH_ADMIN } from "@/services/graphql/queries";
import { useEffect, useState } from "react";
// import { useState } from "react";

const ChatPopover = () => {
  const signedInUser = useAtomValue(signedInUserAtomWithPersistence);
  const [chatSections, setChatSections] = useState<ChatSection[]>([]);
  const [getDetailConversationWithAdmin] = useLazyQuery(
    GET_DETAIL_CONVERSATION_WITH_ADMIN,
    {
      context: {
        headers: {
          // Authorization:
          //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxNzM5MTIzMCwiZXhwIjoxNzE3Mzk0ODMwfQ.Qv_Dvi3KOZAi47sFuLdaMT7r6PXEYSjqm7ibKInx8yo"
          Authorization: `Bearer ${signedInUser?.accessToken}`
        }
      }
    }
  );

  const handleGetDetailConversationWithAdmin = async () => {
    try {
      const { data } = await getDetailConversationWithAdmin({
        variables: {
          filters: {
            page: 1,
            pageSize: 100
          }
        }
      });

      const resultData = data.getDetailConversationWithAdmin.data.listData;

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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (signedInUser.accessToken) handleGetDetailConversationWithAdmin();
  }, []);

  return (
    <div className="fixed md:right-4 right-2 md:bottom-4 bottom-2">
      <Popover>
        <PopoverTrigger className="bg-black rounded-full text-white md:p-4 p-2">
          <MessageOutlinedIcon />
        </PopoverTrigger>
        <PopoverContent
          side="left"
          className="lg:w-[350px] md:w-[320px] w-[280px] rounded-xl border-none shadow-xl ms:mr-2 mr-1 md:mb-4 mb-2 p-0"
        >
          <ChatBox signedInUser={signedInUser} chatSections={chatSections} />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ChatPopover;
