import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";

// Form
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
 
const formSchema = z.object({
  passwordForm: z
    .object({
      currentPassword: z.string()
        .min(1, {
          message: "Mật khẩu không được để trống",
        }),
      newPassword: z.string()
        .min(6, {
          message: "Mật khẩu mới không được ngắn hơn 6 ký tự",
        })
        .max(14, {
          message: "Mật khẩu mới không được dài quá 14 ký tự"
        }),
      confirmPassword: z.string()
    })
    .refine(data => data.newPassword === data.confirmPassword, {
      message: "Mật khẩu xác nhận không khớp",
      path: ["confirmPassword"]
    })
});

const ChangePassword = () => {
  const navigate = useNavigate();

  // Form definition
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      passwordForm: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      }
    }
  });

  // Submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    toast.success("Đổi mật khẩu thành công");
    navigate("/user-info");
  }

  return (
    <Card className={cn("w-full h-max rounded-xl")}>
      {/* Card Header */}
      <CardHeader className={cn("flex justify-center items-center")}>
        <CardTitle>Đổi mật khẩu</CardTitle>
      </CardHeader>

      {/* Card Content */}
      <CardContent className={cn("flex justify-center items-center")}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-[80%] lg:w-[50%] flex flex-col gap-4">
            <FormField
              control={form.control}
              name="passwordForm.currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu hiện tại</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Mật khẩu hiện tại"
                      className={cn("rounded-xl border-slate-300")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="passwordForm.newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu mới</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Mật khẩu mới"
                      className={cn("rounded-xl border-slate-300")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="passwordForm.confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Xác nhận mật khẩu</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Xác nhận mật khẩu"
                      className={cn("rounded-xl border-slate-300")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className={cn("rounded-xl my-2")}>
              <KeyOutlinedIcon className="mr-2" /> Đổi mật khẩu
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ChangePassword;