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
    message: "Passwords don't match",
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("sign up: ", values);
  }

  return (
    <main className="bg-[#26313c] h-screen flex items-center justify-center p-10">
      <div className="grid w-full h-full grid-cols-1 bg-white box-border">
        <div className="bg-[#16202a] text-white flex items-center justify-center flex-col">
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

              <div className="flex items-center justify-center w-full gap-4 max-w-sm">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name*</FormLabel>
                      <FormControl>
                        <Input
                          className="mt-2 mb-4 bg-transparent rounded-full"
                          placeholder="First Name"
                          {...field}
                        />
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
                        <Input
                          className="mt-2 mb-4 bg-transparent rounded-full"
                          placeholder="Last Name"
                          {...field}
                        />
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
                name="phone"
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <FormLabel>Phone*</FormLabel>
                    <FormControl>
                      <Input
                        className="mt-2 mb-4 bg-transparent rounded-full"
                        placeholder="Phone"
                        {...field}
                      />
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

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <FormLabel>Confirm Password*</FormLabel>
                    <FormControl>
                      <Input
                        className="mt-2 mb-4 bg-transparent rounded-full"
                        type="password"
                        placeholder="Confirm Password"
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
              <p className="mt-6 mb-8 text-xs text-slate-400">
                Are you have an account? &nbsp;
                <Link
                  className="text-indigo-600 hover:cursor-pointer"
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
