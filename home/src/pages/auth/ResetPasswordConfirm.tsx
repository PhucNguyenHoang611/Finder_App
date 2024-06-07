/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Spinner from "@/components/Spinner";
import { AuthenticateService } from "@/services/api";
import { toast } from "sonner";

const formSchema = z.object({
  passwordForm: z
    .object({
      password: z
        .string()
        .min(6, {
          message: "Mật khẩu mới không được ngắn hơn 6 ký tự"
        })
        .max(14, {
          message: "Mật khẩu mới không được dài quá 14 ký tự"
        }),
      confirmPassword: z.string()
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Mật khẩu xác nhận không khớp",
      path: ["confirmPassword"]
    })
});

const ResetPasswordConfirm = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () =>
    setShowPassword((prev: boolean) => !prev);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev: boolean) => !prev);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      passwordForm: {
        password: "",
        confirmPassword: ""
      }
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!token) {
      toast.error("Token không được xác định");
      return;
    }

    setIsLoading(true);

    try {
      await AuthenticateService.authControllerResetPassword(token, {
        password: values.passwordForm.password
      });

      toast.success("Đặt lại mật khẩu thành công");
      navigate("/sign-in", { replace: true });
    } catch (error: any) {
      const errorCode = error.body.error.code;
      if (errorCode === "INVALID_RESET_PASSWORD_TOKEN") {
        toast.error("Token không hợp lệ");
      }
    }

    setIsLoading(false);
  }

  return (
    <main className="dark:bg-[#26313c] w-full h-full flex items-center justify-center lg:p-10 md:p-6 p-0">
      <div className="w-full h-full">
        <div className="flex flex-col justify-start items-center bg-white h-screen rounded-xl dark:bg-slate-900">
          <div className="w-full max-w-sm p-6">
            <h1 className="text-3xl font-semibold text-center dark:text-slate-50 py-12">
              Tạo mật khẩu mới
            </h1>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="passwordForm.password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mật khẩu mới*</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Nhập mật khẩu mới"
                            {...field}
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer">
                            {showPassword ? (
                              <EyeIcon
                                className="h-6 w-6"
                                onClick={togglePasswordVisibility}
                              />
                            ) : (
                              <EyeOffIcon
                                className="h-6 w-6"
                                onClick={togglePasswordVisibility}
                              />
                            )}
                          </div>
                        </div>
                      </FormControl>
                      {/* <FormDescription>Give me your email.</FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="passwordForm.confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Xác nhận mật khẩu*</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Nhập mật khẩu xác nhận"
                            {...field}
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer">
                            {showConfirmPassword ? (
                              <EyeIcon
                                className="h-6 w-6"
                                onClick={toggleConfirmPasswordVisibility}
                              />
                            ) : (
                              <EyeOffIcon
                                className="h-6 w-6"
                                onClick={toggleConfirmPasswordVisibility}
                              />
                            )}
                          </div>
                        </div>
                      </FormControl>
                      {/* <FormDescription>Give me your email.</FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full mt-6 rounded-full flex gap-1"
                >
                  {isLoading && <Spinner />}
                  Xác nhận thay đổi
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ResetPasswordConfirm;
