/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardContent,
  // CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import { SEND_MESSAGE_TO_ADMIN } from "@/services/graphql/mutations";
// import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
// import { formatDistanceToNow } from "date-fns";
// import { vi } from "date-fns/locale";

const TypingMessage = () => {
  return (
    <div className="w-full flex justify-start items-center cursor-pointer">
      <div className="w-max rounded-full bg-slate-200 p-3">
        <div className="flex space-x-1 justify-center items-center">
          <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

const Message = ({ message }: MessageProps) => {
  const [showTime, setShowTime] = useState<boolean>(false);

  return (
    <div className="w-full flex justify-end items-center cursor-pointer">
      <div
        onClick={() => setShowTime(!showTime)}
        className="sm:max-w-[80%] max-w-[90%] flex flex-col justify-center items-start rounded-xl bg-black px-4 py-2"
      >
        <p className="text-white text-pretty break-words font-medium sm:text-base text-sm">
          {message.message}
        </p>
        {showTime && (
          <p className="text-xs text-white mt-1">
            {message.createdDate.toLocaleTimeString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit"
            })}
          </p>
        )}
      </div>
    </div>
  );
};

const IncomingMessage = ({ message }: MessageProps) => {
  const [showTime, setShowTime] = useState<boolean>(false);

  return (
    <div className="w-full flex justify-start items-center cursor-pointer">
      <div
        onClick={() => setShowTime(!showTime)}
        className="sm:max-w-[80%] max-w-[90%] flex flex-col justify-center items-end rounded-xl bg-white border-2 border-black px-4 py-2"
      >
        <p className="text-black text-pretty break-words font-medium sm:text-base text-sm">
          {message.message}
        </p>
        {showTime && (
          <p className="text-xs mt-1">
            {message.createdDate.toLocaleTimeString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit"
            })}
          </p>
        )}
      </div>
    </div>
  );
};

const ChatSection = ({ chatSection }: ChatSectionProps) => {
  return (
    <>
      <div className="w-full flex justify-center items-center">
        <div className="rounded-xl bg-gray-300 text-white text-xs font-medium px-4 py-1">
          {chatSection.createdDate.toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
          })}
        </div>
      </div>
      {chatSection.clusMessages.map((cm: ClusMessage, index: number) => (
        <div key={index} className="w-full flex flex-col gap-2">
          {cm.senderId === 1 &&
            cm.messages.map((m: Message, i: number) => (
              <IncomingMessage key={i} message={m} />
            ))}

          {cm.senderId === 2 &&
            cm.messages.map((m: Message, i: number) => (
              <Message key={i} message={m} />
            ))}
        </div>
      ))}
    </>
  );
};

const ChatBox = ({ signedInUser, chatSections }: ChatBoxProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState<boolean>(false);
  const [messageValue, setMessageValue] = useState<string>("");
  const [sendMessageToAdmin] = useMutation(SEND_MESSAGE_TO_ADMIN, {
    context: {
      headers: {
        Authorization: `Bearer ${signedInUser.accessToken}`
      }
    }
  });

  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const checkIfAtBottom = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 1);
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollToBottom();
    checkIfAtBottom();

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", checkIfAtBottom);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", checkIfAtBottom);
      }
    };
  }, []);

  return (
    <Card className="w-full h-full border-none rounded-xl">
      <CardHeader className="flex flex-row justify-center items-center bg-black rounded-t-xl px-2 py-4">
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
          <CardTitle className="md:text-base text-sm text-white">
            Quản trị viên
          </CardTitle>
          {/* <CardDescription className="md:text-sm text-xs text-white">
            Hoạt động 3 phút trước
          </CardDescription> */}
        </div>
      </CardHeader>

      <CardContent className="relative h-[380px] p-2 overflow-hidden">
        <div
          ref={containerRef}
          className="h-full flex flex-col gap-4 overflow-y-auto"
        >
          {chatSections.length > 0 &&
            chatSections.map((item: ChatSection, index: number) => (
              <ChatSection key={index} chatSection={item} />
            ))}

          <div className="w-full flex justify-end items-center">
            <p className="italic text-xs text-gray-500 w-max mr-1 flex gap-1 justify-center items-center">
              <DoneAllOutlinedIcon />
              Đã xem lúc 10:30
            </p>
          </div>

          <TypingMessage />

          {!isAtBottom && (
            <div className="w-full absolute flex justify-center items-center bottom-1">
              <Button
                className="rounded-full text-sm bg-yellow-300 font-bold hover:bg-yellow-400"
                onClick={scrollToBottom}
              >
                <ArrowDropDownOutlinedIcon />
                Tin nhắn mới
              </Button>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </CardContent>

      <CardFooter className="p-2 pb-2 border-t">
        <form onSubmit={handleSendMessage} className="w-full">
          <div className="w-full flex justify-center items-center">
            {/* <div className="w-1/12 flex justify-center items-center">
              <Button className="bg-transparent text-black hover:bg-transparent">
                <AttachFileOutlinedIcon />
              </Button>
            </div> */}

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
