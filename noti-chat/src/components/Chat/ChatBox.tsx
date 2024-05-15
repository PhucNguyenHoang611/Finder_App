import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import { useEffect, useRef, useState } from "react";

const messages = [
  "Message 111111111111111111111111",
  "Message 2222",
  "Message 333333333",
  "Message 4444444444444444444444444444444444444444"
];
const incomingMessages = [
  "IMessage 111111111111111111111111",
  "Message 2222",
  "Message 333333333",
  "Message 444444444444444444"
];

const Message = ({ message }: MessageProps) => {
  return (
    <div className="w-full flex justify-end items-center">
      <div className="sm:max-w-[80%] max-w-[90%] rounded-xl bg-black px-4 py-2">
        <p className="text-white text-pretty break-words font-medium sm:text-base text-sm">
          {message}
        </p>
      </div>
    </div>
  );
};

const IncomingMessage = ({ message }: MessageProps) => {
  return (
    <div className="w-full flex justify-start items-center">
      <div className="sm:max-w-[80%] max-w-[90%] rounded-xl bg-white border-2 border-black px-4 py-2">
        <p className="text-black text-pretty break-words font-medium sm:text-base text-sm">
          {message}
        </p>
      </div>
    </div>
  );
};

const ChatBox = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState<boolean>(false);

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
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>FD</AvatarFallback>
          </Avatar>
        </div>

        <div
          className="w-4/5 flex flex-col justify-center items-start"
          style={{ marginTop: 0 }}
        >
          <CardTitle className="md:text-base text-sm text-white">
            Quản trị viên
          </CardTitle>
          <CardDescription className="md:text-sm text-xs text-white">
            Hoạt động 3 phút trước
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="relative h-[400px] p-2 overflow-hidden">
        <div
          ref={containerRef}
          className="h-full flex flex-col gap-2 overflow-y-auto"
        >
          {messages.map((item: string, index: number) => (
            <Message key={index} message={item} />
          ))}

          {incomingMessages.map((item: string, index: number) => (
            <IncomingMessage key={index} message={item} />
          ))}

          {!isAtBottom && (
            <div className="w-full absolute flex justify-center items-center bottom-1">
              <Button
                className="rounded-full bg-yellow-400 font-bold hover:bg-yellow-500"
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
        <div className="w-full flex justify-center items-center">
          <div className="w-1/12 flex justify-center items-center">
            <Button className="bg-transparent text-black hover:bg-transparent">
              <AttachFileOutlinedIcon />
            </Button>
          </div>

          <div className="w-9/12">
            <Input
              className="border-none w-full"
              placeholder="Nhập tin nhắn..."
            />
          </div>

          <div className="w-2/12 flex justify-end items-center">
            <Button className="bg-transparent text-black hover:bg-transparent">
              <SendOutlinedIcon />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChatBox;
