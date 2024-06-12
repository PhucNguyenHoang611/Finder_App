/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

import BuildCircleRoundedIcon from "@mui/icons-material/BuildCircleRounded";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { level1s, findLevel1ByName, Level1, Level2, Level3 } from "dvhcvn";
import { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { UPDATE_POST } from "@/services/graphql/mutations";
import { GET_ITEM_TYPE_WITH_FILTER } from "@/services/graphql/queries";
import Spinner from "../Spinner";
import { cn } from "@/lib/utils";

const FormSchema = z.object({
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

const UpdatePostDialog = ({
  signedInUser,
  post,
  getAllPosts
}: UpdatePostDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const [initCity, setInitCity] = useState(false);
  const [initDistrict, setInitDistrict] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [wardInfo, districtInfo, cityInfo] = post?.locationDetail
    ? post.locationDetail.split(", ").map((part) => part.trim())
    : ["", "", ""];

  const [updatePost] = useMutation(UPDATE_POST, {
    context: {
      headers: {
        Authorization: `Bearer ${signedInUser.accessToken}`
      }
    }
  });

  // Item Types
  const [itemTypes, setItemTypes] = useState<ItemType[]>([]);
  const [getAllItemTypes] = useLazyQuery(GET_ITEM_TYPE_WITH_FILTER);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: post?.title,
      postType: post?.postType === "LOST" ? "LOST" : "COLLECT",
      itemType: post?.itemTypes[0] ? post.itemTypes[0].id.toString() : "",
      description: post?.description,
      contactPhone: post?.contactPhone,
      city: cityInfo,
      district: districtInfo,
      ward: wardInfo
    }
  });

  // Address
  const [level2s, setLevel2s] = useState<Level2[] | undefined>([]);
  const [level3s, setLevel3s] = useState<Level3[] | undefined>([]);

  const [districtVal, setDistrictVal] = useState<string>(
    districtInfo ? districtInfo : "all"
  );
  const [wardVal, setWardVal] = useState<string>(wardInfo ? wardInfo : "all");

  const cityValue = form.watch("city");

  async function handleUpdatePost(values: z.infer<typeof FormSchema>) {
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

    const requestBody = {
      title: values.title,
      location: values.city,
      locationDetail: `${wardVal}, ${districtVal}, ${values.city}`,
      postType: values.postType,
      contactPhone: values.contactPhone,
      description: values.description,
      itemTypeIds: [Number(values.itemType)]
    };

    await updatePost({
      variables: {
        id: post?.id,
        bodyReq: requestBody
      }
    })
      .then(() => {
        getAllPosts();
        setIsDialogOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });

    setIsLoading(false);
  }

  const handleResetForm = () => {
    if (cityValue !== cityInfo) {
      setInitCity(false);
    }

    form.reset();

    setTimeout(() => {
      if (districtVal !== districtInfo) {
        setInitDistrict(false);
        setDistrictVal(districtInfo ? districtInfo : "all");
      }
    }, 50);

    setTimeout(() => {
      setWardVal(wardInfo ? wardInfo : "all");
    }, 100);
  };

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

  // Handle City Change
  useEffect(() => {
    if (cityValue) {
      if (!initCity) {
        const temp: Level1 | undefined = findLevel1ByName(cityValue);
        const temp2: Level2 | undefined = temp?.findLevel2ByName(districtInfo);

        setLevel2s(temp?.children);
        setLevel3s(temp2?.children);

        form.setValue("district", districtInfo);
        form.setValue("ward", wardInfo);
      } else {
        const temp: Level1 | undefined = findLevel1ByName(cityValue);

        setLevel2s(temp?.children);
        setLevel3s([]);

        form.setValue("district", "");
        setDistrictVal("all");

        form.setValue("ward", "");
        setWardVal("all");
      }
    }

    if (!initCity) {
      setInitCity(true);
    }
  }, [cityValue]);

  // Handle District Change
  useEffect(() => {
    if (districtVal !== "all") {
      if (!initDistrict) {
        const tempLevel1: Level1 | undefined = findLevel1ByName(cityValue);
        const tempLevel2: Level2 | undefined =
          tempLevel1?.findLevel2ByName(districtVal);
        setLevel3s(tempLevel2?.children);

        form.setValue("ward", wardVal);
      } else {
        const tempLevel1: Level1 | undefined = findLevel1ByName(cityValue);
        const tempLevel2: Level2 | undefined =
          tempLevel1?.findLevel2ByName(districtVal);
        setLevel3s(tempLevel2?.children);

        form.setValue("ward", "");
        setWardVal("all");
      }
    }

    if (!initDistrict) {
      setInitDistrict(true);
    }
  }, [districtVal]);

  useEffect(() => {
    if (itemTypes.length === 0) {
      handleGetItemTypes();
    }
  }, []);

  useEffect(() => {
    if (!isDialogOpen) {
      handleResetForm();
    }
  }, [isDialogOpen]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <BuildCircleRoundedIcon className="cursor-pointer text-white rounded-full bg-blue-500" />
      </DialogTrigger>
      <DialogContent
        className="bg-white h-[90%] sm:h-[80%] p-4 sm:p-8 overflow-y-auto"
        style={{ borderRadius: 3 }}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdatePost)}
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

            <div className="flex flex-col justify-center items-center gap-4">
              <div className="w-full flex flex-col gap-4">
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
                        defaultValue={field.value.toString()}
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

              <div className="w-full">
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
              <Button
                type="button"
                className="rounded-xl my-2 sm:w-auto w-full bg-red-500 hover:bg-red-600"
                onClick={handleResetForm}
              >
                <CancelOutlinedIcon className="mr-2" />
                <p>Hoàn tác</p>
              </Button>

              <Button
                type="submit"
                className="rounded-xl my-2 sm:w-auto w-full"
              >
                {isLoading ? (
                  <Spinner />
                ) : (
                  <SaveOutlinedIcon className="mr-2" />
                )}
                <p>Lưu</p>
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePostDialog;
