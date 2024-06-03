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

export default TypingMessage;
