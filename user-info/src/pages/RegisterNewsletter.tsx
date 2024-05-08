import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

// Form
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";

const formSchema = z.object({
  acceptRegister: z.boolean().default(false).optional(),
});

const RegisterNewsletter = () => {
  const navigate = useNavigate();

  // Form definition
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      acceptRegister: false,
    },
  });

  // Submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    if (values.acceptRegister) {
      toast.success("Đăng ký thành công");
      navigate("/user-info");
    }
  }

  return (
    <Card className={cn("w-full h-max rounded-xl")}>
      {/* Card Header */}
      <CardHeader className={cn("flex justify-center items-center")}>
        <CardTitle>Đăng ký nhận tin</CardTitle>
      </CardHeader>

      {/* Card Content */}
      <CardContent
        className={cn("flex flex-col justify-center items-center gap-4")}
      >
        <Card className="w-[90%] lg:w-[70%] rounded-xl bg-green-100 border-4 border-green-200">
          <CardHeader>
            <CardTitle>Thông tin thêm</CardTitle>
            <CardDescription>
              Đăng ký nhận tin để nhận được thông tin mới nhất từ chúng tôi
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <h2>
              Nếu bạn đăng ký nhận tin tức, chúng tôi sẽ gửi email thông báo cho
              bạn khi có ai đó đăng tin gần khu vực của bạn.
            </h2>
            <p>
              {" "}
              - Địa chỉ nhận tin sẽ là email đăng ký hệ thống của bạn, nếu bạn
              đăng nhập bằng bên thứ 3 như Google, Facebook thì chúng tôi sẽ gửi
              đến địa chỉ email do Google, Facebook cung cấp.
            </p>
            <p> - Những tin cùng thành phố với bạn sẽ được gửi cho bạn.</p>
            <p>
              {" "}
              - Chúng tôi không khuyến khích đăng nhập với bên thứ 3 như Google,
              Facebook.
            </p>
          </CardContent>

          <div className="w-full flex justify-center items-center">
            <Separator
              className={cn(
                "w-full border-2 border-green-200 mb-4 bg-green-200"
              )}
            />
          </div>

          <CardFooter className="flex items-center gap-1">
            <p>Bạn có thể thay đổi địa chỉ của bạn tại</p>
            <p
              className="underline cursor-pointer"
              onClick={() => navigate("/update-info")}
            >
              đây
            </p>
          </CardFooter>
        </Card>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-[80%] lg:w-[50%] flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="acceptRegister"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-xl border-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Đăng ký</FormLabel>
                  </div>
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

export default RegisterNewsletter;
