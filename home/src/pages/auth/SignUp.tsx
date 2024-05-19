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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon, Undo2 } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { RiGoogleFill, RiFacebookFill } from "@remixicon/react";
import { AuthenticateService } from "@/services/api";

const formSchema = z
  .object({
    firstName: z
      .string()
      .min(2, {
        message: "Tên không được ngắn hơn 2 ký tự"
      })
      .max(50, {
        message: "Tên không được dài quá 50 ký tự"
      }),
    lastName: z
      .string()
      .min(2, {
        message: "Họ không được ngắn hơn 2 ký tự"
      })
      .max(50, {
        message: "Họ không được dài quá 50 ký tự"
      }),
    email: z
      .string()
      .min(4, {
        message: "Email không được ngắn hơn 4 ký tự"
      })
      .max(50, {
        message: "Email không được dài quá 50 ký tự"
      })
      .regex(/^[a-z0-9_\\.]{1,32}@[a-z0-9]{2,10}(\.[a-z0-9]{2,10}){1,}$/, {
        message: "Định dạng email không hợp lệ"
      }),
    gender: z.enum(["Nam", "Nữ"], {
      required_error: "Giới tính không được để trống"
    }),
    phone: z
      .string()
      .min(10, {
        message: "Số điện thoại không được ngắn hơn 10 ký tự"
      })
      .refine(
        (value) => {
          const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/; // /^(\+\d{1,3}[- ]?)?\d{10}$/
          return phoneRegex.test(value);
        },
        {
          message: "Số điện thoại không hợp lệ"
        }
      ),
    password: z
      .string()
      .min(6, {
        message: "Mật khẩu không được ngắn hơn 6 ký tự"
      })
      .max(14, {
        message: "Mật khẩu không được dài quá 14 ký tự"
      }),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"]
  });

const SignUp = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: ""
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () =>
    setShowPassword((prev: boolean) => !prev);

  const [showCoPassword, setShowCoPassword] = useState(false);
  const toggleCoPasswordVisibility = () =>
    setShowCoPassword((prev: boolean) => !prev);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // const result =
      await AuthenticateService.authControllerSignUpWithEmailPassword({
        email: values.email,
        password: values.password,
        displayName: values.lastName + " " + values.firstName,
        phone: values.phone,
        gender: values.gender === "Nam" ? true : false
      });

      toast.success("Đăng ký thành công! Vui lòng đăng nhập lại");
      navigate("/sign-in");
    } catch (error: any) {
      const errorCode = error.body.error.code;

      if (errorCode === "INVALID_EMAIL_EXISTED") {
        form.setError("email", {
          type: "manual",
          message: "Email này đã được đăng ký"
        });
      }
    }
  }

  async function signUpWithGoogle() {
    try {
      await AuthenticateService.authControllerSignWithGoogle();
    } catch (error: any) {
      console.log(error.body.error.code);
    }
  }

  async function signUpWithFacebook() {
    try {
      await AuthenticateService.authControllerSignWithFacebook();
    } catch (error: any) {
      console.log(error.body.error.code);
    }
  }

  return (
    <main className="dark:bg-[#26313c] w-full h-screen flex items-center justify-center lg:p-10 md:p-6 p-0">
      <Link to={"/"}>
        <button className="absolute sm:left-20 left-5 sm:top-[13%] top-[10%]">
          <Undo2 className="w-8 h-8" />
        </button>
      </Link>
      <div className="grid w-full h-full grid-cols-1 box-border bg-white rounded-xl">
        <div className="dark:bg-[#092635] flex items-center justify-center flex-col gap-4 px-4 py-10">
          <div className="my-4">
            <h1 className="text-3xl font-semibold ">Đăng ký tài khoản</h1>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Button
                type="button"
                className="flex items-center w-full gap-4 px-12 mb-4 bg-transparent rounded-full"
                variant="outline"
                onClick={signUpWithGoogle}
              >
                <RiGoogleFill
                  size={24}
                  // color="white"
                  className="loginWithGoogle"
                />
                Tiếp tục với Google
              </Button>

              <Button
                type="button"
                className="flex items-center w-full gap-4 px-12 mb-4 bg-transparent rounded-full"
                variant="outline"
                onClick={signUpWithFacebook}
              >
                <RiFacebookFill
                  size={24}
                  // color="white"
                  className="loginWithFacebook"
                />
                Tiếp tục với Facebook
              </Button>

              <div>
                <br />
              </div>

              <div className="flex items-center justify-center w-full gap-4">
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Họ*</FormLabel>
                      <FormControl>
                        <Input placeholder="Họ của bạn" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên*</FormLabel>
                      <FormControl>
                        <Input placeholder="Tên của bạn" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mt-2">
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
                name="gender"
                render={({ field }) => (
                  <FormItem className="space-y-3 my-4">
                    <FormLabel>Giới tính</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex items-center space-x-4"
                      >
                        <FormItem className="flex justify-center items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Nam" />
                          </FormControl>
                          <FormLabel className="font-normal">Nam</FormLabel>
                        </FormItem>
                        <FormItem className="flex justify-center items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Nữ" />
                          </FormControl>
                          <FormLabel className="font-normal">Nữ</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <FormLabel>Số điện thoại*</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập SĐT" {...field} />
                    </FormControl>
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

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <FormLabel>Xác nhận mật khẩu*</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showCoPassword ? "text" : "password"}
                          placeholder="Nhập lại mật khẩu của bạn"
                          {...field}
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer">
                          {showCoPassword ? (
                            <EyeIcon
                              className="h-6 w-6"
                              onClick={toggleCoPasswordVisibility}
                            />
                          ) : (
                            <EyeOffIcon
                              className="h-6 w-6"
                              onClick={toggleCoPasswordVisibility}
                            />
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full mt-6 rounded-full">
                Đăng ký
              </Button>

              <p className="mt-6 mb-8 text-xs dark:text-slate-400">
                Đã có tài khoản? &nbsp;
                <Link
                  className="font-bold hover:cursor-pointer"
                  to={"/sign-in"}
                >
                  Đăng nhập ngay
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
