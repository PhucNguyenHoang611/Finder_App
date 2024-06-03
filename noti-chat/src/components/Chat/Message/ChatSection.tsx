import IncomingMessage from "./IncomingMessage";
import Message from "./Message";

const ChatSection = ({ signedInUser, chatSection }: ChatSectionProps) => {
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
