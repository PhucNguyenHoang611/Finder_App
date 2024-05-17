import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import ChatBox from "./ChatBox";

const ChatPopover = () => {
  return (
    <div className="fixed sm:right-4 right-2 sm:bottom-4 bottom-2">
      <Popover>
        <PopoverTrigger className="bg-black rounded-full text-white sm:p-4 p-2">
          <MessageOutlinedIcon />
        </PopoverTrigger>
        <PopoverContent
          side="left"
          className="lg:w-[350px] md:w-[300px] w-[280px] rounded-xl border-none shadow-xl ms:mr-2 mr-1 sm:mb-4 mb-2 p-0"
        >
          <ChatBox />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ChatPopover;
