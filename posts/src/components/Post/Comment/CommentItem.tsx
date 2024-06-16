/* eslint-disable @typescript-eslint/no-unused-vars */
import Avatar from "@mui/joy/Avatar";
import Typography from "@mui/joy/Typography";
import Input from "@mui/joy/Input";
import Link from "@mui/joy/Link";
import { useState } from "react";
import Box from "@mui/joy/Box";
import { formatDistanceToNow, subHours } from "date-fns";
import { vi } from "date-fns/locale";
import LoadingDots from "@/components/LoadingDots";
import { useMutation } from "@apollo/client";
import { EDIT_COMMENT, REPLY_COMMENT } from "@/services/graphql/mutations";
import { useAtomValue } from "jotai";
import { signedInUserAtomWithPersistence } from "@/store";
import CommentDropdownMenu from "./CommentDropdownMenu";

import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { toast } from "sonner";

const CommentItem = ({
  comment,
  postId,
  level,
  getComments
}: CommentItemProps) => {
  const commentLevel = level;
  const signedInUser = useAtomValue(signedInUserAtomWithPersistence);

  const [replyValue, setReplyValue] = useState("");
  const [showReply, setShowReply] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [isTyping, _setIsTyping] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [commentValue, setCommentValue] = useState(comment?.content);

  const [replyComment] = useMutation(REPLY_COMMENT, {
    context: {
      headers: {
        Authorization: `Bearer ${signedInUser.accessToken}`
      }
    }
  });
  const [editComment] = useMutation(EDIT_COMMENT, {
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
          setShowReply(true);
          setShowReplyInput(false);
          getComments(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleEditComment = async () => {
    try {
      if (commentValue) {
        await editComment({
          variables: {
            commentId: comment?.id,
            bodyReq: {
              content: commentValue
            }
          }
        });

        getComments(false);
        setIsEditing(false);
        toast.success("Chỉnh sửa phản hồi thành công");
      } else {
        toast.error("Nội dung phản hồi không được để trống");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelEditComment = () => {
    setIsEditing(false);
    setCommentValue(comment?.content);
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
        <div className="w-auto flex flex-col pl-4 pr-8 py-2 bg-slate-100 rounded-xl relative">
          {comment?.senderId === signedInUser.id && (
            <div className="absolute top-0 right-0 pr-1">
              <CommentDropdownMenu
                signedInUser={signedInUser}
                commentId={comment?.id}
                getComments={getComments}
                setIsEditing={setIsEditing}
              />
            </div>
          )}

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

          {isEditing ? (
            <div className="flex justify-around items-center gap-1">
              <Input
                variant="plain"
                size="sm"
                placeholder="Nhập phản hồi..."
                sx={{
                  flex: 1,
                  "--Input-focusedThickness": "0px",
                  fontFamily: "Montserrat"
                }}
                value={commentValue}
                onChange={(event) => setCommentValue(event.target.value)}
              />
              <div className="flex gap-1">
                <Link
                  underline="none"
                  role="button"
                  fontFamily="Montserrat"
                  fontWeight={600}
                  onClick={handleEditComment}
                >
                  <CheckCircleOutlineOutlinedIcon sx={{ color: "green" }} />
                </Link>
                <Link
                  underline="none"
                  role="button"
                  fontFamily="Montserrat"
                  fontWeight={600}
                  onClick={handleCancelEditComment}
                >
                  <CancelOutlinedIcon sx={{ color: "red" }} />
                </Link>
              </div>
            </div>
          ) : (
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
          )}
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
              comment?.createdDate
                ? subHours(comment.createdDate, 7)
                : new Date(),
              {
                addSuffix: true,
                locale: vi
              }
            )}
          </Link>

          {commentLevel < 3 && signedInUser.accessToken && (
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
              comment.subComments.map((item: Comment, index: number) => (
                <CommentItem
                  key={index}
                  comment={item}
                  postId={postId}
                  level={commentLevel + 1}
                  getComments={getComments}
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
