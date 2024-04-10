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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("login", values);
  }

  return (
    <main className="bg-[#26313c] h-screen flex items-center justify-center p-10">
      <div className="grid w-full h-full grid-cols-1 bg-white box-border md:grid-cols-2">
        <div className="bg-[#16202a] text-white flex items-center justify-center flex-col">
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
                        className="mt-2 mb-4 bg-transparent rounded-full"
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
                      <Input
                        className="mt-2 mb-4 bg-transparent rounded-full"
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    {/* <FormDescription>Give me your password.</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full mt-6 bg-indigo-600 rounded-full hover:bg-indigo-700"
              >
                Login
              </Button>
              <p className="mt-6 text-xs text-slate-400">
                Don't have an account? &nbsp;
                <Link
                  className="text-indigo-600 hover:cursor-pointer"
                  to={"/sign-up"}
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </Form>
        </div>
        <div className="relative hidden md:block">
          <div className="flex justify-center items-center">
            <img
              className="object-cover h-[600px] w-[700px] mt-6"
              src="https://i.pinimg.com/736x/af/b4/15/afb41504edbfa15a3ba46d9f1b5f3fe1.jpg"
              alt="bg-image"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
