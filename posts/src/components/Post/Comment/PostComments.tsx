/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import CardMUIContent from "@mui/joy/CardContent";
import Input from "@mui/joy/Input";
import { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_COMMENTS } from "@/services/graphql/queries";
import { useParams } from "react-router-dom";

import Spinner from "../../Spinner";
import CommentItem from "./CommentItem";
import LoadingDots from "@/components/LoadingDots";
import { ADD_COMMENT } from "@/services/graphql/mutations";
import { useAtomValue } from "jotai";
import { signedInUserAtomWithPersistence } from "@/store";

const PostComments = () => {
  const { postId } = useParams();
  const signedInUser = useAtomValue(signedInUserAtomWithPersistence);

  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, _setIsTyping] = useState(false);

  const [commentValue, setCommentValue] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [totalComments, setTotalComments] = useState(0);
  const [visibleComments, setVisibleComments] = useState(3);

  const [getPostComments] = useLazyQuery(GET_COMMENTS);
  const [addComment] = useMutation(ADD_COMMENT, {
    context: {
      headers: {
        Authorization: `Bearer ${signedInUser.accessToken}`
      }
    }
  });

  const loadMoreComments = () => {
    setVisibleComments((prev) => prev + 3);
  };

  const hideComments = () => {
    setVisibleComments(3);
  };

  const handleGetPostComments = async () => {
    setIsLoading(true);

    await getPostComments({
      variables: {
        postId: Number(postId),
        filters: {
          page: 1,
          pageSize: visibleComments
        }
      }
    })
      .then((result) => {
        const resultData = result.data.getComments.data;

        const cList: Comment[] = resultData.listData.map((comment: Comment) => {
          return {
            id: comment.id,
            parentCommentId: comment.parentCommentId,
            postId: comment.postId,
            senderId: comment.senderId,
            displayName: comment.displayName,
            avatar: comment.avatar,
            isEdited: comment.isEdited,
            content: comment.content,
            createdDate: new Date(comment.createdDate),
            updatedDate: new Date(comment.updatedDate),
            subComments: comment.subComments
          };
        });

        setComments(cList);
        setTotalComments(resultData.totalCount);
      })
      .catch((error) => {
        console.log(error);
      });

    setIsLoading(false);
  };

  const handleAddComment = async () => {
    if (commentValue) {
      await addComment({
        variables: {
          bodyReq: {
            content: commentValue,
            postId: Number(postId)
          }
        }
      })
        .then(() => {
          setCommentValue("");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (postId) {
      handleGetPostComments();
    }
  }, [postId, visibleComments]);

  return (
    <>
      <CardMUIContent>
        {isLoading && <Spinner />}

        {comments.length > 0 && !isLoading && (
          <>
            {comments.map((comment: Comment, index: number) => (
              <CommentItem
                key={index}
                comment={comment}
                postId={Number(postId)}
                level={1}
              />
            ))}

            {visibleComments < totalComments && (
              <Link
                component="button"
                underline="none"
                fontFamily="Montserrat"
                fontSize="sm"
                endDecorator="..."
                fontWeight={500}
                sx={{ color: "text.primary", mt: 1 }}
                onClick={loadMoreComments}
              >
                Tải thêm bình luận
              </Link>
            )}

            {visibleComments >= totalComments && visibleComments > 3 && (
              <Link
                component="button"
                underline="none"
                fontFamily="Montserrat"
                fontSize="sm"
                endDecorator="..."
                fontWeight={500}
                sx={{ color: "text.primary", mt: 1 }}
                onClick={hideComments}
              >
                Ẩn bình luận
              </Link>
            )}
          </>
        )}

        {comments.length === 0 && !isLoading && (
          <Typography
            fontSize="sm"
            fontFamily="Montserrat"
            color="neutral"
            textColor="text.primary"
            fontWeight={500}
            textAlign="left"
          >
            Chưa có bình luận nào
          </Typography>
        )}
      </CardMUIContent>

      {isTyping && (
        <div className="flex justify-start items-center gap-2 text-slate-500 font-medium animate-pulse">
          <p className="font-montserrat text-sm">Ai đó đang nhập bình luận</p>
          <LoadingDots />
        </div>
      )}

      <CardMUIContent orientation="horizontal" sx={{ gap: 1 }}>
        <Input
          variant="plain"
          size="sm"
          placeholder="Thêm bình luận của bạn…"
          sx={{
            flex: 1,
            px: 0,
            "--Input-focusedThickness": "0px",
            fontFamily: "Montserrat"
          }}
          value={commentValue}
          onChange={(event) => setCommentValue(event.target.value)}
        />
        <Link
          underline="none"
          role="button"
          fontFamily="Montserrat"
          fontWeight={700}
          onClick={handleAddComment}
        >
          Gửi
        </Link>
      </CardMUIContent>
    </>
  );
};

export default PostComments;
