import { formatTimeToString } from "@/utils/dateFormat";
import IncomingMessage from "./IncomingMessage";
import Message from "./Message";
import { subHours } from "date-fns";

const ChatSection = ({ signedInUser, chatSection }: ChatSectionProps) => {
  return (
    <>
      <div className="w-full flex justify-center items-center">
        <div className="rounded-xl bg-gray-300 text-white text-xs font-medium px-4 py-1">
          {formatTimeToString(subHours(chatSection.createdDate, 7))}
        </div>
      </div>
      {chatSection.clusMessages.map((cm: ClusMessage, index: number) => (
        <div key={index} className="w-full flex flex-col gap-2">
          {cm.senderId === signedInUser.id
            ? cm.messages.map((m: Message, i: number) => (
                <Message key={i} message={m} />
              ))
            : cm.messages.map((m: Message, i: number) => (
                <IncomingMessage key={i} message={m} />
              ))}
        </div>
      ))}
    </>
  );
};

export default ChatSection;
