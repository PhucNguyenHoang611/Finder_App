/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import PostCard from "@/components/Post/Card/PostCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_POST_BY_ID } from "@/services/graphql/queries";
import { INCREASE_POST_VIEWS } from "@/services/graphql/mutations";
import LargeSpinner from "@/components/LargeSpinner";

const PostDetails = () => {
  const { postId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState<Post | null>(null);
  const [getPostDetails] = useLazyQuery(GET_POST_BY_ID);
  const [increasePostViews] = useMutation(INCREASE_POST_VIEWS);

  const handleIncreasePostViews = async () => {
    await increasePostViews({
      variables: {
        postId: Number(postId)
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  const handleGetPostDetails = async () => {
    setIsLoading(true);
    await getPostDetails({
      variables: {
        id: Number(postId)
      }
    })
      .then((result) => {
        const resultData = result.data.getPostById.data;

        const pData: Post = {
          id: resultData.id,
          title: resultData.title,
          location: resultData.location,
          postType: resultData.postType,
          description: resultData.description,
          contactPhone: resultData.contactPhone,
          locationDetail: resultData.locationDetail,
          authorId: resultData.authorId,
          authorAvatar: resultData.authorAvatar,
          authorDisplayName: resultData.authorDisplayName,
          images: resultData.images,
          itemTypes: resultData.itemTypes,
          createdDate: new Date(resultData.createdDate),
          updatedDate: new Date(resultData.updatedDate),
          viewCount: resultData.viewCount,
          totalComments: resultData.totalComments
        };

        setPost(pData);
        handleIncreasePostViews();
      })
      .catch((error) => {
        console.log(error);
      });
    setIsLoading(false);
  };

  useEffect(() => {
    if (postId) {
      handleGetPostDetails();
    }
  }, [postId]);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Alert
        className={cn("rounded-xl bg-red-400 text-white border mb-[20px]")}
      >
        <WarningAmberOutlinedIcon style={{ color: "white" }} />
        <AlertTitle>Chú ý !</AlertTitle>

        <div className="flex gap-1">
          <AlertDescription>Cảnh báo</AlertDescription>
          <AlertDescription>
            <a href="#" className="underline font-medium">
              lừa đảo
            </a>
          </AlertDescription>
        </div>
      </Alert>

      {isLoading ? (
        <div className="w-full flex justify-center items-center">
          <LargeSpinner />
        </div>
      ) : (
        <PostCard post={post} />
      )}
    </div>
  );
};

export default PostDetails;
