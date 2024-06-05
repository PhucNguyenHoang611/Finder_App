/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  SEND_MESSAGE_TO_ADMIN,
  UPDATE_LAST_READ_WITH_ADMIN
} from "@/services/graphql/mutations";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "@apollo/client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import ChatSection from "./Message/ChatSection";

import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Spinner from "../Spinner";

// const tempToken = "";

const ChatBox = ({
  isLoading,
  signedInUser,
  chatSections,
  countUnread,
  getDetailConversation,
  loadMoreMessages,
  hasMoreSection,
  chatSocket
}: ChatBoxProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [stateString, setStateString] = useState<string>("NOT_AT_BOTTOM");

  const [isAtBottom, setIsAtBottom] = useState<boolean>(false);

  const [messageValue, setMessageValue] = useState<string>("");
  const [sendMessageToAdmin] = useMutation(SEND_MESSAGE_TO_ADMIN, {
    context: {
      headers: {
        Authorization: `Bearer ${signedInUser?.accessToken}` //`Bearer ${tempToken}
      }
    }
  });

  const [updateLastSeen] = useMutation(UPDATE_LAST_READ_WITH_ADMIN, {
    context: {
      headers: {
        Authorization: `Bearer ${signedInUser?.accessToken}` //`Bearer ${tempToken}
      }
    }
  });

  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
      if (stateString === "NEW_MESSAGE") setStateString("NOT_AT_BOTTOM");
    }
  };

  const checkIfAtTop = () => {
    if (containerRef.current) {
      const { scrollTop } = containerRef.current;

      if (scrollTop === 0) loadMoreMessages();
    }
  };

  const checkIfAtBottom = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 1);
      if (stateString === "NEW_MESSAGE") setStateString("NOT_AT_BOTTOM");
    }
  };

  const handleUpdateLastSeen = async () => {
    try {
      await updateLastSeen({
        variables: {
          bodyReq: { lastSeen: new Date() }
        }
      });

      countUnread();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendMessage = async (e: any) => {
    e.preventDefault();

    if (messageValue.trim() === "") return;

    try {
      await sendMessageToAdmin({
        variables: {
          bodyReq: {
            message: messageValue
          }
        }
      });

      setMessageValue("");
      getDetailConversation();

      checkIfAtBottom();
      scrollToBottom();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (signedInUser.accessToken) {
      handleUpdateLastSeen();
    }

    if (chatSocket) {
      chatSocket.on("newMessage", async (_payload: NewMessageSocket) => {
        getDetailConversation();
        if (!isAtBottom) setStateString("NEW_MESSAGE");
        else {
          checkIfAtBottom();
          scrollToBottom();
        }
      });
    }

    scrollToBottom();
    checkIfAtBottom();

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", checkIfAtTop);
      container.addEventListener("scroll", checkIfAtBottom);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", checkIfAtTop);
        container.removeEventListener("scroll", checkIfAtBottom);
      }
    };
  }, []);

  return (
    <Card className="w-full h-full border-none rounded-xl">
      <CardHeader className="flex flex-row justify-center items-center bg-black rounded-t-xl px-2 md:py-4 py-2">
        <div className="w-1/5 flex justify-center items-center">
          <Avatar>
            <AvatarImage src="https://t3.ftcdn.net/jpg/02/03/40/20/360_F_203402061_1nSZ5lt348w8E0suHMggk5pEQ4LGhePZ.jpg" />
            <AvatarFallback>FD</AvatarFallback>
          </Avatar>
        </div>

        <div
          className="w-4/5 flex justify-start items-center"
          style={{ marginTop: 0 }}
        >
          <CardTitle className="lg:text-base md:text-sm text-xs text-white">
            Quản trị viên
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="relative h-[380px] p-1 px-2 overflow-hidden">
        <div
          ref={containerRef}
          className="h-full flex flex-col gap-2 overflow-y-auto"
        >
          {chatSections.length === 0 && (
            <div className="w-full flex justify-center items-center">
              <p className="text-sm text-gray-500">
                Nhắn gì đó để bắt đầu trò chuyện
              </p>
            </div>
          )}

          {!hasMoreSection && !isLoading && (
            <div className="w-full flex justify-center items-center">
              <p className="text-sm text-gray-500">Đã tải toàn bộ tin nhắn</p>
            </div>
          )}

          {isLoading && (
            <div className="w-full flex justify-center items-center py-2">
              <Spinner />
            </div>
          )}

          {chatSections.length > 0 &&
            chatSections.map((item: ChatSection, index: number) => (
              <ChatSection
                key={index}
                signedInUser={signedInUser}
                chatSection={item}
              />
            ))}

          {!isAtBottom && stateString === "NEW_MESSAGE" && (
            <div className="w-full absolute flex justify-center items-center bottom-1">
              <Button
                className="rounded-full lg:text-base md:text-sm text-xs bg-yellow-300 font-bold hover:bg-yellow-400"
                onClick={scrollToBottom}
              >
                <ArrowDropDownOutlinedIcon />
                Tin nhắn mới
              </Button>
            </div>
          )}

          {!isAtBottom && stateString === "NOT_AT_BOTTOM" && (
            <div className="w-full absolute flex justify-end items-center bottom-1 px-5">
              <Button
                className="font-bold bg-transparent hover:bg-transparent"
                onClick={scrollToBottom}
              >
                <ArrowDownwardIcon
                  sx={{
                    backgroundColor: "purple",
                    color: "white",
                    p: 0.5,
                    borderRadius: 999
                  }}
                  fontSize="medium"
                />
              </Button>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </CardContent>

      <CardFooter className="p-2 pb-2 border-t">
        <form onSubmit={handleSendMessage} className="w-full">
          <div className="w-full flex justify-center items-center">
            <div className="w-10/12">
              <Input
                className="border-none w-full"
                placeholder="Nhập tin nhắn..."
                value={messageValue}
                onChange={(e) => setMessageValue(e.target.value)}
              />
            </div>

            <div className="w-2/12 flex justify-end items-center">
              <Button
                type="submit"
                className="bg-transparent text-black hover:bg-transparent"
              >
                <SendOutlinedIcon />
              </Button>
            </div>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
};

export default ChatBox;

{
  /* <div className="w-full flex justify-end items-center">
            <p className="italic text-xs text-gray-500 w-max mr-1 flex gap-1 justify-center items-center">
              <DoneAllOutlinedIcon />
              Đã xem lúc 10:30
            </p>
          </div>

          <TypingMessage /> */
}
