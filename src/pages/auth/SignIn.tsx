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
import { RiGoogleFill } from "@remixicon/react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

const formSchema = z.object({
  email: z
    .string()
    .min(4, {
      message: "Email must be at least 4 characters long",
    })
    .max(50, {
      message: "Email must be at most 50 characters long",
    }),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters long",
    })
    .max(100, {
      message: "Password must be at most 100 characters long",
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
    <main className="dark:bg-[#26313c] h-screen flex items-center justify-center p-10">
      <div className="grid w-full h-full grid-cols-1 bg-white box-border md:grid-cols-2">
        <div className="dark:bg-[#092635] flex items-center justify-center flex-col">
          <div className="my-4">
            <h1 className="text-3xl font-semibold ">Login</h1>
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
                Sign in with Google
              </Button>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email*</FormLabel>
                    <FormControl>
                      <Input
                        className="min-w-[384px]"
                        placeholder="Email"
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
                    <FormLabel>Password*</FormLabel>
                    <FormControl>
                      <div className="relative min-w-[384px]">
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <p className="mt-2 text-xs dark:text-slate-400">
                Forgot password? &nbsp;
                <Link
                  className="text-green-1 hover:cursor-pointer font-bold"
                  to={"/reset-password"}
                >
                  Reset Password
                </Link>
              </p>

              <Button
                type="submit"
                className="w-full mt-6 bg-green-1 rounded-full hover:bg-green-2"
              >
                Login
              </Button>

              <p className="mt-6 text-xs dark:text-slate-400">
                Don't have an account? &nbsp;
                <Link
                  className="text-green-1 hover:cursor-pointer font-bold"
                  to={"/sign-up"}
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </Form>
        </div>
        <div className="relative hidden md:block p-1">
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
