/* eslint-disable @typescript-eslint/no-unused-vars */
import Avatar from "@mui/joy/Avatar";
import Typography from "@mui/joy/Typography";
import Input from "@mui/joy/Input";
import Link from "@mui/joy/Link";
import { useState } from "react";
import Box from "@mui/joy/Box";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import LoadingDots from "@/components/LoadingDots";
import { useMutation } from "@apollo/client";
import { REPLY_COMMENT } from "@/services/graphql/mutations";
import { useAtomValue } from "jotai";
import { signedInUserAtomWithPersistence } from "@/store";

const CommentItem = ({ comment, postId, level }: CommentItemProps) => {
  const commentLevel = level;
  const signedInUser = useAtomValue(signedInUserAtomWithPersistence);

  const [replyValue, setReplyValue] = useState("");
  const [showReply, setShowReply] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [isTyping, _setIsTyping] = useState(false);

  const [replyComment] = useMutation(REPLY_COMMENT, {
    context: {
      headers: {
        Authorization: `Bearer ${signedInUser.accessToken}`
      }
    }
  });

  const handleReplyComment = async () => {
    if (replyValue) {
      await replyComment({
        variables: {
          bodyReq: {
            parentCommentId: comment?.id,
            postId: postId,
            content: replyValue
          }
        }
      })
        .then(() => {
          setReplyValue("");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="flex justify-start items-start my-1">
      <Box
        sx={{
          position: "relative",
          width: 48,
          height: 48,
          "&::before": {
            content: "''",
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            m: "-2px",
            borderRadius: "50%"
          }
        }}
      >
        <Avatar
          size="sm"
          src={comment?.avatar}
          sx={{ width: 36, height: 36 }}
        />
      </Box>

      <div className="flex flex-col">
        <div className="flex flex-col px-4 py-2 bg-slate-100 rounded-xl">
          <Typography fontSize="sm" fontFamily="Montserrat">
            <Link
              component="button"
              color="neutral"
              fontFamily="Montserrat"
              fontWeight="lg"
              textColor="text.primary"
            >
              {comment?.displayName}
            </Link>
          </Typography>

          <Typography fontSize="sm" fontFamily="Montserrat">
            <Link
              color="neutral"
              fontFamily="Montserrat"
              textColor="text.primary"
              textAlign="left"
              underline="none"
            >
              {comment?.content}
            </Link>
          </Typography>
        </div>

        <div className="flex gap-2">
          <Link
            component="button"
            underline="none"
            fontFamily="Montserrat"
            fontSize="10px"
            sx={{ color: "text.tertiary", my: 0.5 }}
          >
            {formatDistanceToNow(
              comment?.createdDate ? comment.createdDate : new Date(),
              {
                addSuffix: true,
                locale: vi
              }
            )}
          </Link>

          {commentLevel < 3 && (
            <Link
              component="button"
              underline="none"
              fontFamily="Montserrat"
              fontSize="12px"
              fontWeight={500}
              sx={{ color: "text.primary", my: 0.5 }}
              onClick={() => setShowReplyInput(!showReplyInput)}
            >
              Phản hồi
            </Link>
          )}
        </div>

        {isTyping && (
          <div className="flex justify-start items-center my-1 gap-2 text-slate-500 font-medium animate-pulse">
            <p className="font-montserrat text-xs">Ai đó đang trả lời</p>
            <LoadingDots />
          </div>
        )}

        {comment?.subComments && comment.subComments.length > 0 && (
          <>
            <Link
              component="button"
              underline="none"
              fontFamily="Montserrat"
              fontSize={13}
              fontWeight={500}
              sx={{ color: "gray" }}
              onClick={() => setShowReply(!showReply)}
            >
              {showReply ? "Ẩn phản hồi" : "Hiển thị phản hồi"}
            </Link>

            {showReply &&
              comment.subComments.map((comment: Comment, index: number) => (
                <CommentItem
                  key={index}
                  comment={comment}
                  postId={postId}
                  level={commentLevel + 1}
                />
              ))}
          </>
        )}

        {showReplyInput && (
          <div className="flex gap-2 w-full my-1 p-2 rounded-xl border border-slate-200">
            <Input
              variant="plain"
              size="sm"
              placeholder="Nhập phản hồi..."
              sx={{
                flex: 1,
                px: 0,
                "--Input-focusedThickness": "0px",
                fontFamily: "Montserrat"
              }}
              value={replyValue}
              onChange={(event) => setReplyValue(event.target.value)}
            />
            <Link
              underline="none"
              role="button"
              fontFamily="Montserrat"
              fontWeight={600}
              onClick={handleReplyComment}
            >
              Phản hồi
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
