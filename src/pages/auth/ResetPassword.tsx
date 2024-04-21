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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const formSchema = z.object({
  email: z
    .string()
    .min(4, {
      message: "Email must be at least 4 characters long",
    })
    .max(50, {
      message: "Email must be at most 50 characters long",
    })
    .refine((value) => value.includes("@"), {
      message: "Email must have @ symbol",
    }),
});

const ResetPassword = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("reset password", values);
  }

  return (
    <main>
      <div className="flex flex-col h-screen">
        <div className="flex flex-col justify-center items-center bg-white dark:bg-slate-900">
          <div className="w-full max-w-sm p-6">
            <h1 className="text-3xl font-semibold text-center dark:text-slate-50 pt-12">
              Reset Password
            </h1>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email*</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      {/* <FormDescription>Give me your email.</FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full mt-6 bg-green-1 rounded-full hover:bg-green-2"
                >
                  Reset Password
                </Button>

                <p className="mt-6 mb-8 text-xs dark:text-slate-400">
                  Return to sign in? &nbsp;
                  <Link
                    className="text-green-1 font-bold hover:cursor-pointer"
                    to={"/sign-in"}
                  >
                    Sign In
                  </Link>
                </p>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ResetPassword;
