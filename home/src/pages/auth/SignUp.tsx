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
import { EyeIcon, EyeOffIcon, Undo2 } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { RiGoogleFill } from "@remixicon/react";

const formSchema = z
  .object({
    firstName: z
      .string()
      .min(2, {
        message: "At least 2 characters",
      })
      .max(50, {
        message: "At most 50 characters",
      }),
    lastName: z
      .string()
      .min(2, {
        message: "At least 2 characters",
      })
      .max(50, {
        message: "At most 50 characters",
      }),
    email: z
      .string()
      .min(4, {
        message: "Email must be at least 4 characters long",
      })
      .max(50, {
        message: "Email must be at most 50 characters long",
      }),
    phone: z
      .string()
      .min(10, {
        message: "Phone number must be at least 10 characters long",
      })
      .refine(
        (value) => {
          const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
          return phoneRegex.test(value);
        },
        {
          message: "Phone number must be valid",
        }
      ),
    password: z
      .string()
      .min(6, {
        message: "Password must be at least 6 characters long",
      })
      .max(100, {
        message: "Password must be at most 100 characters long",
      }),
    confirmPassword: z
      .string()
      .min(6, {
        message: "Password must be at least 6 characters long",
      })
      .max(100, {
        message: "Password must be at most 100 characters long",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords not match",
    path: ["confirmPassword"],
  });

const SignUp = () => {
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

  const [showCoPassword, setShowCoPassword] = useState(false);
  const toggleCoPasswordVisibility = () =>
    setShowCoPassword((prev: boolean) => !prev);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("sign up: ", values);
  }

  return (
    <main className="dark:bg-[#26313c] h-screen flex items-center justify-center p-10 w-full">
      <Link to={"/"}>
        <button className="absolute left-20 top-[6rem]">
          <Undo2 className="w-8 h-8" />
        </button>
      </Link>
      <div className="grid w-full h-full grid-cols-1 box-border">
        <div className="dark:bg-[#092635] bg-white flex items-center justify-center flex-col">
          <div className="my-4">
            <h1 className="text-3xl font-semibold ">Sign up</h1>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Button
                className="flex items-center w-full gap-4 px-12 mb-4 bg-transparent rounded-full"
                variant="outline"
              >
                <RiGoogleFill
                  size={24}
                  // color="white"
                  className="loginWithGoogle"
                />
                Sign up with Google
              </Button>

              <div>
                <br />
              </div>

              <div className="flex items-center justify-center w-full gap-4 max-w-sm">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="First Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="Last Name" {...field} />
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
                    <FormLabel>Email*</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    {/* <FormDescription>Give me your email.</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <FormLabel>Phone*</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone" {...field} />
                    </FormControl>
                    {/* <FormDescription>Give me your phone.</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <FormLabel>Password*</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
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
                    {/* <FormDescription>Give me your password.</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <FormLabel>Confirm Password*</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showCoPassword ? "text" : "password"}
                          placeholder="Confirm Password"
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
                    {/* <FormDescription>Give me your password.</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full mt-6 rounded-full">
                Sign Up
              </Button>

              <p className="mt-6 mb-8 text-xs dark:text-slate-400">
                Are you have an account? &nbsp;
                <Link
                  className="font-bold hover:cursor-pointer"
                  to={"/sign-in"}
                >
                  Sign In
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
