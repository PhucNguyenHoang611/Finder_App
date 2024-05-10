/* eslint-disable @typescript-eslint/no-unused-vars */
import { Skeleton } from "@/components/ui/skeleton";
import NewsCard from "./NewsCard";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

const temp: number[] = [1, 2, 3];

const EmptyNewsList = () => {
  return (
    <div className="w-full h-max flex flex-col justify-center items-center gap-4">
      <img src="/empty.png" alt="empty" className="lg:w-[30%] w-[50%] h-auto" />

      <p className="text-center font-bold">Không có tin nào được đăng</p>
    </div>
  );
};

const NewsList = () => {
  // const navigate = useNavigate();
  // const [isLoading, setIsLoading] = useState(false);
  const isLoading = false;

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      {temp.length > 0 &&
        !isLoading &&
        temp.map((_item, index) => <NewsCard key={index} />)}

      {temp.length === 0 && !isLoading && <EmptyNewsList />}

      {isLoading && (
        <div className="w-full flex flex-col justify-center items-center space-y-3">
          <div className="w-full flex flex-col justify-center items-center space-y-3">
            <Skeleton className="h-[100px] lg:w-[80%] w-full rounded-xl bg-slate-200" />
            <div className="space-y-2 lg:w-[80%] w-full">
              <Skeleton className="h-8 w-[80%] rounded-xl bg-slate-200" />
              <Skeleton className="h-4 w-[70%] rounded-xl bg-slate-200" />
              <Skeleton className="h-6 w-[90%] rounded-xl bg-slate-200" />
            </div>
          </div>

          <div className="w-full flex flex-col justify-center items-center space-y-3">
            <Skeleton className="h-[100px] lg:w-[80%] w-full rounded-xl bg-slate-200" />
            <div className="space-y-2 lg:w-[80%] w-full">
              <Skeleton className="h-8 w-[80%] rounded-xl bg-slate-200" />
              <Skeleton className="h-4 w-[70%] rounded-xl bg-slate-200" />
              <Skeleton className="h-6 w-[90%] rounded-xl bg-slate-200" />
            </div>
          </div>

          <div className="w-full flex flex-col justify-center items-center space-y-3">
            <Skeleton className="h-[100px] lg:w-[80%] w-full rounded-xl bg-slate-200" />
            <div className="space-y-2 lg:w-[80%] w-full">
              <Skeleton className="h-8 w-[80%] rounded-xl bg-slate-200" />
              <Skeleton className="h-4 w-[70%] rounded-xl bg-slate-200" />
              <Skeleton className="h-6 w-[90%] rounded-xl bg-slate-200" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsList;