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
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { RiGoogleFill, RiFacebookFill } from "@remixicon/react";
import { EyeIcon, EyeOffIcon, Undo2 } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { AuthenticateService } from "@/services/api";
import Spinner from "@/components/Spinner";
import { useSetAtom } from "jotai";
import { signedInUserAtom } from "@/store";
import { apiBaseUrl, setJWT } from "@/config/api";

import SignInImage from "/SignInImage.png";

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
    .max(14, {
      message: "Mật khẩu chỉ được dài tối đa 14 ký tự"
    })
});

const SignIn = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () =>
    setShowPassword((prev: boolean) => !prev);

  const setSignedInUser = useSetAtom(signedInUserAtom);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const response = await AuthenticateService.authControllerLogin({
        email: values.email,
        password: values.password
      });

      const userData = response.data;
      const expiredDate = new Date();
      expiredDate.setDate(expiredDate.getDate() + 7);

      const signedInUser: SignedInUser = {
        id: userData.id,
        accessToken: userData.accessToken,
        accessTokenExpired: new Date(userData.accessTokenExpired),
        refreshToken: userData.refreshToken,
        refreshTokenExpired: new Date(userData.refreshTokenExpired),
        expired: expiredDate,
        avatar: userData.avatar,
        displayName: userData.displayName,
        email: userData.email,
        gender: userData.gender,
        phone: userData.phone,
        birthDate: userData.birthDate,
        address: userData.address
      };
      setSignedInUser(signedInUser);

      setJWT(signedInUser.accessToken);
      toast.success("Đăng nhập thành công! Chào mừng bạn trở lại");
      navigate("/");
    } catch (error: any) {
      const errorCode = error.body.error.code;

      if (errorCode === "INVALID_EMAIL_NOT_REGISTERED") {
        form.setError("email", {
          type: "manual",
          message: "Email chưa được đăng ký"
        });
      } else if (errorCode === "PASSWORD_NOT_MATCH") {
        form.setError("password", {
          type: "manual",
          message: "Mật khẩu không đúng"
        });
      } else if (errorCode === "FORBIDDEN") {
        navigate("/forbidden");
      }
    }

    setIsLoading(false);
  }

  async function signInWithGoogle() {
    try {
      window.open(`${apiBaseUrl}/api/v1/auths/google/login`, "_self");
    } catch (error: any) {
      console.log(error.body.error.code);
    }
  }

  async function signInWithFacebook() {
    try {
      window.open(`${apiBaseUrl}/api/v1/auths/facebook/login`, "_self");
    } catch (error: any) {
      console.log(error.body.error.code);
    }
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
                onClick={signInWithGoogle}
              >
                <RiGoogleFill
                  size={24}
                  // color="white"
                  className="loginWithGoogle"
                />
                <p className="mr-4">Tiếp tục với Google</p>
              </Button>
              <Button
                type="button"
                className="flex items-center w-full gap-4 px-12 mb-4 bg-transparent rounded-full"
                variant="outline"
                onClick={signInWithFacebook}
              >
                <RiFacebookFill
                  size={24}
                  // color="white"
                  className="loginWithFacebook"
                />
                <p>Tiếp tục với Facebook</p>
              </Button>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Địa chỉ Email*</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập địa chỉ Email" {...field} />
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
                  to={"/forgot-password"}
                >
                  Đặt lại mật khẩu
                </Link>
              </p>

              <Button type="submit" className="w-full mt-6 rounded-full">
                {isLoading && <Spinner />}
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
            <img className="object-cover" src={SignInImage} alt="loginImage" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
