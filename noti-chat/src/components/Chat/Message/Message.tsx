import { useState } from "react";

const Message = ({ message }: MessageProps) => {
  const [showTime, setShowTime] = useState<boolean>(false);

  return (
    <div className="w-full flex justify-end items-center cursor-pointer">
      <div
        onClick={() => setShowTime(!showTime)}
        className="sm:max-w-[80%] max-w-[90%] flex flex-col justify-center items-start rounded-xl bg-black px-4 py-2"
      >
        <p className="text-white text-pretty break-words font-medium lg:text-base md:text-sm text-xs">
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

export default Message;
