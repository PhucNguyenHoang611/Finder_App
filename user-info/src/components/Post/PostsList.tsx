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
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_ALL_MY_POSTS } from "@/services/graphql/queries";
import { useEffect, useState } from "react";
import { DELETE_POST } from "@/services/graphql/mutations";
import { toast } from "sonner";

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
  const [postsList, setPostsList] = useState<PostWithFilter[]>([]);

  const signedInUser = useAtomValue(signedInUserAtomWithPersistence);
  const [getAllMyPosts] = useLazyQuery(GET_ALL_MY_POSTS, {
    context: {
      headers: {
        Authorization: `Bearer ${signedInUser.accessToken}`
      }
    }
  });

  const [deletePost] = useMutation(DELETE_POST, {
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
        const resultData = result.data.getPostOfMe.data;

        const pList: PostWithFilter[] = resultData.map(
          (post: PostWithFilter) => {
            return {
              id: post.id,
              title: post.title,
              postType: post.postType,
              location: post.location,
              locationDetail: post.locationDetail,
              description: post.description,
              approved: post.approved,
              viewCount: post.viewCount,
              totalComments: post.totalComments,
              fileName: post.fileName ? post.fileName : "",
              filePath: post.filePath ? post.filePath : "",
              createdDate: new Date(post.createdDate),
              updatedDate: new Date(post.updatedDate)
            };
          }
        );

        setPostsList(pList);
      })
      .catch((error) => {
        console.log(error);
      });

    setIsLoading(false);
  };

  const handleDeletePost = async (id: number) => {
    try {
      await deletePost({
        variables: {
          id: id
        }
      });

      const pList: PostWithFilter[] = postsList.filter(
        (item: PostWithFilter) => !(item.id === id)
      );
      setPostsList(pList);
      toast.success("Xóa bài viết thành công");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (signedInUser.email && postsList.length === 0) {
      getAllPosts();
    }
  }, [signedInUser]);

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      {postsList.length > 0 &&
        !isLoading &&
        postsList.map((item, index) => (
          <PostItemCard
            key={index}
            post={item}
            handleDeletePost={handleDeletePost}
          />
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
          onClick={() => navigate("/create-post")}
        >
          <BorderColorOutlinedIcon className="mr-2" />
          Thêm bài viết
        </Button>
      </div>
    </div>
  );
};

export default PostsList;
