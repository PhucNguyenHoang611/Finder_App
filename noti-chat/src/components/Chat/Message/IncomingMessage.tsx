import { useState } from "react";

const IncomingMessage = ({ message }: MessageProps) => {
  const [showTime, setShowTime] = useState<boolean>(false);

  return (
    <div className="w-full flex justify-start items-center cursor-pointer">
      <div
        onClick={() => setShowTime(!showTime)}
        className="md:max-w-[80%] max-w-[90%] flex flex-col justify-center items-end rounded-xl bg-white border-2 border-black px-4 py-2"
      >
        <p className="text-black text-pretty break-words font-medium lg:text-base md:text-sm text-xs">
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

export default IncomingMessage;
