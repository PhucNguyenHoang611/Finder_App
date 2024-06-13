/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import MoreHoriz from "@mui/icons-material/MoreHoriz";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useMutation } from "@apollo/client";
import { CREATE_POST_REPORT } from "@/services/graphql/mutations";
import { useAtomValue } from "jotai";
import { signedInUserAtomWithPersistence } from "@/store";
import Spinner from "@/components/Spinner";

const FormSchema = z.object({
  reason: z
    .string()
    .min(1, {
      message: "Lý do báo cáo không được để trống."
    })
    .max(200, {
      message: "Lý do báo cáo không được vượt quá 200 ký tự."
    })
});

const CardActionDialog = ({ postId }: CardActionDialogProps) => {
  const signedInUser = useAtomValue(signedInUserAtomWithPersistence);
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      reason: ""
    }
  });

  const [createPostReport] = useMutation(CREATE_POST_REPORT, {
    context: {
      headers: {
        Authorization: `Bearer ${signedInUser.accessToken}`
      }
    }
  });

  async function handleReportPost(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);

    try {
      await createPostReport({
        variables: {
          bodyReq: {
            postId: postId,
            reportContent: data.reason
          }
        }
      });
      setIsDialogOpen(false);
      setIsDropdownOpen(false);

      toast.success("Báo cáo bài đăng thành công");
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    if (isDialogOpen) {
      form.reset();
    }
  }, [isDialogOpen]);

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <MoreHoriz className="ml-auto cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent style={{ borderRadius: 10 }}>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="cursor-pointer border-none flex gap-2"
            >
              <WarningAmberOutlinedIcon style={{ color: "red" }} />

              <p className="text-red-500 font-medium">Báo cáo</p>
            </Button>
          </DialogTrigger>
          <DialogContent
            className="sm:max-w-[425px] bg-white"
            style={{ borderRadius: 10 }}
          >
            <DialogHeader>
              <DialogTitle>Báo cáo bài đăng</DialogTitle>
              <DialogDescription>
                Báo cáo vi phạm về bài đăng này
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleReportPost)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lý do</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Nhập lý do báo cáo..."
                          className="rounded-xl border-slate-300"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="w-full flex justify-end">
                  <Button type="submit" className="rounded">
                    {isLoading && <Spinner />}
                    Xác nhận
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CardActionDialog;
