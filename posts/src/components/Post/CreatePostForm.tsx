/* eslint-disable react-hooks/exhaustive-deps */
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined";

// Form
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import { level1s, findLevel1ByName, Level1, Level2, Level3 } from "dvhcvn";
import { useEffect, useState } from "react";
import ImageUploader from "@/components/Post/ImageUploader";
import PreviewPostDialog from "@/components/Post/PreviewPostDialog";

const formSchema = z.object({
  title: z
  .string()
  .min(1, {
    message: "Tiêu đề không được để trống",
    })
    .max(100, {
      message: "Tiêu đề không được dài quá 100 ký tự",
    }),
  type: z.enum(["Tin cần tìm", "Tin nhặt được"], {
    required_error: "Loại bài viết không được để trống",
  }),
  category: z.string({
    required_error: "Danh mục không được để trống",
  }),
  content: z
    .string()
    .min(1, {
      message: "Nội dung không được để trống",
    })
    .max(1000, {
      message: "Nội dung không được dài quá 1000 ký tự",
    }),
  city: z.string().min(1, {
    message: "Tỉnh/Thành Phố không được để trống",
  }),
  district: z.string(),
  ward: z.string(),
  contact: z.string().min(1, {
    message: "Thông tin liên lạc không được để trống",
  }),
});

const categories = [
  "Ví/Giấy tờ",
  "Thú cưng (Chó/Mèo)",
  "Tìm người",
  "Điện thoại/Tablet/Laptop",
  "Xe máy/Ô tô",
  "Đồ vật khác",
];

const CreatePostForm = () => {
  const navigate = useNavigate();
  const [level2s, setLevel2s] = useState<Level2[] | undefined>([]);
  const [level3s, setLevel3s] = useState<Level3[] | undefined>([]);
  // const [images, setImages] = useState<never[]>([]);
  // const [openPreviewDialog, setOpenPreviewDialog] = useState<boolean>(false);

  const [selectedFile, setSelectedFile] = useState(null);

  const [districtVal, setDistrictVal] = useState<string>("all");
  const [wardVal, setWardVal] = useState<string>("all");

  // Form definition
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      content: "",
      city: "",
      district: "",
      ward: "",
      contact: "",
    },
  });

  const cityValue = form.watch("city");

  // Submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    // form.setError("district", {
    //   message: "Quận/Huyện/TP không được để trống",
    // });

    // form.setError("ward", {
    //   message: "Phường/Xã/Thị trấn không được để trống",
    // });

    toast.success("Đăng tin thành công");
    navigate("/");
  }

  useEffect(() => {
    if (cityValue) {
      const temp: Level1 | undefined = findLevel1ByName(cityValue);

      setLevel2s(temp?.children);
      setLevel3s([]);

      form.setValue("district", "");
      setDistrictVal("all");

      form.setValue("ward", "");
      setWardVal("all");
    }
  }, [cityValue]);

  useEffect(() => {
    if (districtVal) {
      const tempLevel1: Level1 | undefined = findLevel1ByName(cityValue);
      const tempLevel2: Level2 | undefined =
        tempLevel1?.findLevel2ByName(districtVal);
      setLevel3s(tempLevel2?.children);

      form.setValue("ward", "");
      setWardVal("all");
    }
  }, [districtVal]);

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tiêu đề</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="VD: Rơi ví và một số giấy tờ mang tên Nguyễn Văn A ở KTX Khu A"
                    className="border-slate-200 rounded-xl"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex sm:flex-row flex-col justify-center items-center gap-4">
            <div className="sm:w-1/2 w-full flex flex-col gap-2">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Loại tin</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Tin cần tìm" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Tin cần tìm
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Tin nhặt được" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Tin nhặt được
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Danh mục</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={cn("rounded-xl border-slate-300")}
                        >
                          <SelectValue placeholder="Chọn danh mục" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((item, index) => (
                          <SelectItem key={index} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="sm:w-1/2 w-full">
              <div className="w-full flex flex-col justify-center items-start gap-2">
                <FormLabel>Khu vực</FormLabel>
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={cn("rounded-xl border-slate-300")}
                          >
                            <SelectValue placeholder="Tỉnh/Thành Phố" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {level1s?.map((item, index) => (
                            <SelectItem key={index} value={item.name}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="district"
                  render={() => (
                    <FormItem className="w-full">
                      <Select
                        value={districtVal}
                        onValueChange={(value: string) => setDistrictVal(value)}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={cn("rounded-xl border-slate-300")}
                          >
                            <SelectValue placeholder="Quận/Huyện/TP" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem key={-1} value="all">
                            Quận/Huyện/TP
                          </SelectItem>
                          {level2s?.map((item, index) => (
                            <SelectItem key={index} value={item.name}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ward"
                  render={() => (
                    <FormItem className="w-full">
                      <Select
                        value={wardVal}
                        onValueChange={(value: string) => setWardVal(value)}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={cn("rounded-xl border-slate-300")}
                          >
                            <SelectValue placeholder="Phường/Xã/Thị trấn" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem key={-1} value="all">
                            Phường/Xã/Thị trấn
                          </SelectItem>
                          {level3s?.map((item, index) => (
                            <SelectItem key={index} value={item.name}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* images={images} setImages={setImages} */}
          <ImageUploader selectedFile={selectedFile} setSelectedFile={setSelectedFile} />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nội dung</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Nội dung phải đủ các thành phần sau: Thời gian xảy ra sự việc / Địa điểm / Liệt kê các vật liên quan"
                    className="border-slate-200 rounded-xl"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thông tin liên lạc</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Thông tin để người khác liên lạc với bạn (Họ và tên, Số điện thoại, vv...)"
                    className="border-slate-200 rounded-xl"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex sm:flex-row flex-col justify-center items-center sm:gap-4">
            <PreviewPostDialog />
            <Button type="submit" className={cn("rounded-xl my-2 sm:w-auto w-full")}>
              <UploadOutlinedIcon className="mr-2" /> Đăng tin
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreatePostForm;