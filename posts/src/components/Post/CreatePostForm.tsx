/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
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
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_ITEM_TYPE_WITH_FILTER } from "@/services/graphql/queries";
import { CREATE_POST } from "@/services/graphql/mutations";
import { useAtomValue } from "jotai";
import { signedInUserAtomWithPersistence } from "@/store";
import Spinner from "../Spinner";

const formSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Tiêu đề không được để trống"
    })
    .max(100, {
      message: "Tiêu đề không được dài quá 100 ký tự"
    }),
  postType: z.enum(["LOST", "COLLECT"], {
    required_error: "Loại bài viết không được để trống"
  }),
  description: z
    .string()
    .min(1, {
      message: "Nội dung không được để trống"
    })
    .max(1000, {
      message: "Nội dung không được dài quá 1000 ký tự"
    }),
  itemType: z.string({
    required_error: "Danh mục không được để trống"
  }),
  contactPhone: z.string().min(1, {
    message: "Thông tin liên lạc không được để trống"
  }),
  city: z.string().min(1, {
    message: "Tỉnh/Thành Phố không được để trống"
  }),
  district: z.string(),
  ward: z.string()
});

const CreatePostForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const signedInUser = useAtomValue(signedInUserAtomWithPersistence);
  const [createPost] = useMutation(CREATE_POST, {
    context: {
      headers: {
        Authorization: `Bearer ${signedInUser.accessToken}`
      }
    }
  });

  // Address
  const [level2s, setLevel2s] = useState<Level2[] | undefined>([]);
  const [level3s, setLevel3s] = useState<Level3[] | undefined>([]);
  const [districtVal, setDistrictVal] = useState<string>("all");
  const [wardVal, setWardVal] = useState<string>("all");

  // Item Types
  const [itemTypes, setItemTypes] = useState<ItemType[]>([]);
  const [getAllItemTypes] = useLazyQuery(GET_ITEM_TYPE_WITH_FILTER);

  // Images
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Form definition
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      itemType: "",
      description: "",
      city: "",
      district: "",
      ward: "",
      contactPhone: ""
    }
  });
  const cityValue = form.watch("city");

  const handleGetItemTypes = async () => {
    await getAllItemTypes({
      variables: {
        filters: {
          page: 1,
          pageSize: 100
        }
      }
    })
      .then((result) => {
        const resultData = result.data.getItemTypeWithFilter.data;

        const iList: ItemType[] = resultData.listData.map((itemType: any) => {
          return {
            id: itemType.id,
            name: itemType.name
          };
        });

        setItemTypes(iList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Submit Handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (districtVal === "all") {
      form.setError("district", {
        message: "Quận/Huyện/TP không được để trống"
      });

      return;
    }

    if (wardVal === "all") {
      form.setError("ward", {
        message: "Phường/Xã/Thị trấn không được để trống"
      });

      return;
    }

    setIsLoading(true);

    const requestBody = selectedFile
      ? {
          title: values.title,
          location: values.city,
          locationDetail: `${wardVal}, ${districtVal}, ${values.city}`,
          postType: values.postType,
          contactPhone: values.contactPhone,
          description: values.description,
          itemTypeIds: [Number(values.itemType)],
          images: [selectedFile]
        }
      : {
          title: values.title,
          location: values.city,
          locationDetail: `${wardVal}, ${districtVal}, ${values.city}`,
          postType: values.postType,
          contactPhone: values.contactPhone,
          description: values.description,
          itemTypeIds: [Number(values.itemType)]
        };

    await createPost({
      variables: {
        bodyReq: requestBody
      }
    })
      .then((result) => {
        console.log(result);

        toast.success("Đăng tin thành công");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });

    setIsLoading(false);
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

  useEffect(() => {
    if (itemTypes.length === 0) {
      handleGetItemTypes();
    }
  }, []);

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
                name="postType"
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
                            <RadioGroupItem value="LOST" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Tin cần tìm
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="COLLECT" />
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
                name="itemType"
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
                        {itemTypes?.map((item, index) => (
                          <SelectItem key={index} value={item.id.toString()}>
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
                        onValueChange={(value: string) => {
                          setDistrictVal(value);
                          form.setValue("district", value);
                        }}
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
                        onValueChange={(value: string) => {
                          setWardVal(value);
                          form.setValue("ward", value);
                        }}
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

          <ImageUploader
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
          />

          <FormField
            control={form.control}
            name="description"
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
            name="contactPhone"
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
            <PreviewPostDialog
              author={signedInUser}
              post={form}
              image={selectedFile}
              itemTypes={itemTypes}
            />
            <Button
              type="submit"
              className={cn("rounded-xl my-2 sm:w-auto w-full")}
            >
              {isLoading ? (
                <Spinner />
              ) : (
                <UploadOutlinedIcon className="mr-2" />
              )}
              <p>Đăng tin</p>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreatePostForm;
