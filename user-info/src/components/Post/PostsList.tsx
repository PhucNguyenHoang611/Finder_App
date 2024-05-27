/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import PostItemCard from "./PostItemCard";
import { useNavigate } from "react-router-dom";
import { useAtomValue } from "jotai";
import { signedInUserAtomWithPersistence } from "@/store";
import { useLazyQuery } from "@apollo/client";
import { GET_ALL_MY_POSTS } from "@/services/graphql/queries";
import { useEffect, useState } from "react";

const EmptyPostsList = () => {
  return (
    <div className="w-full h-max flex flex-col justify-center items-center gap-4">
      <img src="/empty.png" alt="empty" className="lg:w-[30%] w-[50%] h-auto" />

      <p className="text-center font-bold">Không có bài viết nào</p>
    </div>
  );
};

const PostsList = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [postsList, setPostsList] = useState<Post[]>([]);

  const signedInUser = useAtomValue(signedInUserAtomWithPersistence);
  const [getAllMyPosts] = useLazyQuery(GET_ALL_MY_POSTS, {
    context: {
      headers: {
        Authorization: `Bearer ${signedInUser.accessToken}`
      }
    }
  });

  const getAllPosts = async () => {
    setIsLoading(true);

    await getAllMyPosts()
      .then((result) => {
        setPostsList(result.data.getPostOfMe.data);
      })
      .catch((error) => {
        console.log(error);
      });

    setIsLoading(false);
  };

  useEffect(() => {
    if (signedInUser.email && postsList.length === 0) {
      console.log("Loading my posts...");
      getAllPosts();
    }
  }, [signedInUser]);

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      {postsList.length > 0 &&
        !isLoading &&
        postsList.map((item, index) => (
          <PostItemCard key={index} post={item} />
        ))}

      {postsList.length === 0 && !isLoading && <EmptyPostsList />}

      {isLoading && (
        <div className="w-full flex flex-col justify-center items-center space-y-3">
          <Skeleton className="h-[300px] lg:w-[80%] w-full rounded-xl bg-slate-200" />
          <div className="space-y-2 lg:w-[80%] w-full">
            <Skeleton className="h-8 w-[80%] rounded-xl bg-slate-200" />
            <Skeleton className="h-4 w-[70%] rounded-xl bg-slate-200" />
            <Skeleton className="h-6 w-[90%] rounded-xl bg-slate-200" />
            <Skeleton className="h-6 w-[60%] rounded-xl bg-slate-200" />
          </div>
        </div>
      )}

      <div className="w-full flex sm:flex-row flex-col justify-center items-center gap-4">
        <Button
          className="rounded-xl sm:w-[25%] w-[60%]"
          onClick={() => navigate("/")}
        >
          <HomeOutlinedIcon className="mr-2" />
          Trang chủ
        </Button>

        <Button
          className="rounded-xl sm:w-[25%] w-[60%]"
          variant="outline"
          onClick={() => navigate("/add-post")}
        >
          <BorderColorOutlinedIcon className="mr-2" />
          Thêm bài viết
        </Button>
      </div>
    </div>
  );
};

export default PostsList;
