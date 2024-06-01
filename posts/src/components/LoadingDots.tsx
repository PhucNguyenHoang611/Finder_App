const LoadingDots = () => {
  return (
    <div className="flex space-x-0.5 justify-center items-center">
      <span className="sr-only">Loading...</span>
      <div className="h-1 w-1 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-1 w-1 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-1 w-1 bg-slate-500 rounded-full animate-bounce"></div>
    </div>
  );
};

export default LoadingDots;
