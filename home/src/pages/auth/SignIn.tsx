import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Link } from "react-router-dom";
import { RiGoogleFill, RiFacebookFill } from "@remixicon/react";
import { EyeIcon, EyeOffIcon, Undo2 } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

const formSchema = z.object({
  email: z
    .string()
    .min(4, {
      message: "Email phải dài ít nhất 4 ký tự"
    })
    .max(50, {
      message: "Email chỉ được dài tối đa 50 ký tự"
    }),
  password: z
    .string()
    .min(6, {
      message: "Mật khẩu phải dài ít nhất 6 ký tự"
    })
    .max(100, {
      message: "Mật khẩu chỉ được dài tối đa 100 ký tự"
    }),
});

const SignIn = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () =>
    setShowPassword((prev: boolean) => !prev);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("login", values);
  }

  return (
    <main className="dark:bg-[#26313c] w-full h-screen flex items-center justify-center lg:p-10 md:p-6 p-0">
      <Link to={"/"}>
        <button className="absolute sm:left-20 left-5 top-[13%]">
          <Undo2 className="w-8 h-8" />
        </button>
      </Link>
      <div className="grid w-full h-full grid-cols-1 bg-white rounded-xl box-border lg:grid-cols-2">
        <div className="dark:bg-[#092635] flex items-center justify-center flex-col gap-4">
          <div className="my-4">
            <h1 className="text-3xl font-semibold">Đăng nhập</h1>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Button
                type="button"
                className="flex items-center w-full gap-4 px-12 mb-4 bg-transparent rounded-full"
                variant="outline"
              >
                <RiGoogleFill
                  size={24}
                  // color="white"
                  className="loginWithGoogle"
                />
                <p className="mr-4">Đăng nhập bằng Google</p>
              </Button>
              <Button
                type="button"
                className="flex items-center w-full gap-4 px-12 mb-4 bg-transparent rounded-full"
                variant="outline"
              >
                <RiFacebookFill
                  size={24}
                  // color="white"
                  className="loginWithFacebook"
                />
                <p>Đăng nhập bằng Facebook</p>
              </Button>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Địa chỉ Email*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập địa chỉ Email"
                        {...field}
                      />
                    </FormControl>
                    {/* <FormDescription>Give me your email.</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <FormLabel>Mật khẩu*</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Nhập mật khẩu của bạn"
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <p className="mt-2 text-xs dark:text-slate-400">
                Quên mật khẩu? &nbsp;
                <Link
                  className="hover:cursor-pointer font-bold"
                  to={"/reset-password"}
                >
                  Đặt lại mật khẩu
                </Link>
              </p>

              <Button type="submit" className="w-full mt-6 rounded-full">
                Đăng nhập
              </Button>

              <p className="mt-6 text-xs dark:text-slate-400">
                Chưa có tài khoản? &nbsp;
                <Link
                  className="hover:cursor-pointer font-bold"
                  to={"/sign-up"}
                >
                  Đăng ký ngay
                </Link>
              </p>
            </form>
          </Form>
        </div>
        <div className="relative hidden lg:block p-1">
          <div className="flex justify-center items-center h-full">
            <img
              className="object-cover"
              src="https://demo.alert.ind.in/public//login_assets/images/error/auth-img-7.png"
              alt="loginImage"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
