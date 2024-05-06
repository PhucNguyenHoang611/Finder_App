import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

// Form
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  firstName: z
    .string({
      required_error: "Tên không được để trống",
    })
    .min(2, {
      message: "Tên không được ngắn hơn 2 ký tự",
    })
    .max(50, {
      message: "Tên không được dài quá 50 ký tự",
    }),
  lastName: z
    .string({
      required_error: "Họ không được để trống",
    })
    .min(2, {
      message: "Họ không được ngắn hơn 2 ký tự",
    })
    .max(50, {
      message: "Họ không được dài quá 50 ký tự",
    }),
  phoneNumber: z
    .string({
      required_error: "Số điện thoại không được để trống",
    })
    .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, {
      message: "Số điện thoại không hợp lệ",
    }),
  gender: z.enum(["Nam", "Nữ", "Khác"], {
    required_error: "Giới tính không được để trống",
  }),
  yearOfBirth: z.string({
    required_error: "Năm sinh không được để trống",
  }),
  address: z.string({
    required_error: "Địa chỉ không được để trống",
  }),
});

const UpdateInfo = () => {
  const navigate = useNavigate();

  // Form definition
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
    },
  });

  // Submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    toast.success("Cập nhật thông tin thành công");
    navigate("/user/user-info");
  }

  return (
    <Card className={cn("w-full h-max rounded-xl")}>
      {/* Card Header */}
      <CardHeader className={cn("flex justify-center items-center")}>
        <CardTitle>Cập nhật thông tin</CardTitle>
      </CardHeader>

      {/* Card Content */}
      <CardContent className={cn("flex justify-center items-center")}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-[80%] lg:w-[50%] flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Họ"
                      className={cn("rounded-xl border-slate-300")}
                      {...field}
                    />
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
                  <FormLabel>Tên</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Tên"
                      className={cn("rounded-xl border-slate-300")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số điện thoại</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Số điện thoại"
                      className={cn("rounded-xl border-slate-300")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Giới tính</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Nam" />
                        </FormControl>
                        <FormLabel className="font-normal">Nam</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Nữ" />
                        </FormControl>
                        <FormLabel className="font-normal">Nữ</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Khác" />
                        </FormControl>
                        <FormLabel className="font-normal">Khác</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="yearOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Năm sinh</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={cn("rounded-xl border-slate-300")}
                      >
                        <SelectValue placeholder="Chọn năm sinh" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[...Array(2009 - 1944).keys()].map((index) => {
                        const year = 2008 - index;
                        return (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Địa chỉ</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Địa chỉ"
                      className={cn("rounded-xl border-slate-300")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className={cn("rounded-xl my-2")}>
              <SaveOutlinedIcon className="mr-2" /> Lưu
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UpdateInfo;
