import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useMutation } from "@apollo/client";
import { DELETE_COMMENT } from "@/services/graphql/mutations";
import { toast } from "sonner";
import { useState } from "react";

const CommentDropdownMenu = ({
  signedInUser,
  commentId,
  getComments
}: CommentDropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [deleteComment] = useMutation(DELETE_COMMENT, {
    context: {
      headers: {
        Authorization: `Bearer ${signedInUser.accessToken}`
      }
    }
  });

  const handleDeleteComment = async () => {
    await deleteComment({
      variables: {
        commentId: commentId
      }
    })
      .then(() => {
        toast.success("Xóa bình luận thành công");
        setIsDropdownOpen(false);
        getComments(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger>
        <MoreVertOutlinedIcon sx={{ fontSize: 15, color: "gray" }} />
      </DropdownMenuTrigger>
      <DropdownMenuContent style={{ borderRadius: 10 }}>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="cursor-pointer border-none flex gap-2"
            >
              <DeleteForeverOutlinedIcon sx={{ color: "red" }} />
              <p className="text-red-500 font-medium">Xóa bình luận</p>
            </Button>
          </DialogTrigger>
          <DialogContent
            className="sm:max-w-[425px] bg-white"
            style={{ borderRadius: 10 }}
          >
            <DialogHeader>
              <DialogTitle>Xóa bình luận</DialogTitle>
              <DialogDescription>
                Bạn có chắc chắn muốn xóa bình luận này không ?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  className="rounded"
                  onClick={handleDeleteComment}
                >
                  Xác nhận
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CommentDropdownMenu;
