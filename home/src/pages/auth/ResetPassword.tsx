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
import { Link } from "react-router-dom";

const formSchema = z.object({
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
    })
});

const ResetPassword = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ""
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Reset Password:", values);
  }

  return (
    <main className="dark:bg-[#26313c] w-full h-full flex items-center justify-center lg:p-10 md:p-6 p-0">
      <div className="w-full h-full">
        <div className="flex flex-col justify-start items-center bg-white h-screen rounded-xl dark:bg-slate-900">
          <div className="w-full max-w-sm p-6">
            <h1 className="text-3xl font-semibold text-center dark:text-slate-50 py-12">
              Đặt lại mật khẩu
            </h1>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nhập địa chỉ Email dùng để đăng ký*</FormLabel>
                      <FormControl>
                        <Input placeholder="Địa chỉ Email" {...field} />
                      </FormControl>
                      {/* <FormDescription>Give me your email.</FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full mt-6 rounded-full">
                  Đặt lại mật khẩu
                </Button>

                <p className="mt-6 mb-8 text-xs dark:text-slate-400">
                  Quay lại đăng nhập? &nbsp;
                  <Link
                    className="font-bold hover:cursor-pointer"
                    to={"/sign-in"}
                  >
                    Đăng nhập
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
