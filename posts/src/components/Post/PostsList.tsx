/* eslint-disable @typescript-eslint/no-unused-vars */
import { Skeleton } from "@/components/ui/skeleton";
import PostItemCard from "@/components/Post/Card/PostItemCard";

const EmptyPostsList = () => {
  return (
    <div className="w-full h-max flex flex-col justify-center items-center gap-4">
      <img src="/empty.png" alt="empty" className="lg:w-[30%] w-[50%] h-auto" />

      <p className="text-center font-bold">Không có tin nào được đăng</p>
    </div>
  );
};

const PostsList = ({ isLoading, posts }: PostsListProps) => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      {posts.length > 0 &&
        !isLoading &&
        posts.map((item, index) => <PostItemCard key={index} post={item} />)}

      {posts.length === 0 && !isLoading && <EmptyPostsList />}

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

export default PostsList;
