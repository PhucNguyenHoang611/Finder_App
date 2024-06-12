/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

import { format } from "date-fns";
import { vi } from "date-fns/locale";
import "react-day-picker/src/style.css";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

// Form
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

//Address
import { level1s, findLevel1ByName, Level1, Level2, Level3 } from "dvhcvn";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { signedInUserAtomWithPersistence } from "@/store";

// GraphQL
import { useMutation } from "@apollo/client";
import { UPDATE_MY_ACCOUNT } from "@/services/graphql/mutations";
import Spinner from "@/components/Spinner";

const formSchema = z.object({
  displayName: z
    .string({
      required_error: "Họ và tên không được để trống"
    })
    .min(2, {
      message: "Họ và tên không được ngắn hơn 2 ký tự"
    })
    .max(50, {
      message: "Họ và tên không được dài quá 50 ký tự"
    }),
  gender: z.enum(["Nam", "Nữ"], {
    required_error: "Giới tính không được để trống"
  }),
  birthDate: z.date({
    required_error: "Năm sinh không được để trống"
  }),
  phone: z
    .string({
      required_error: "Số điện thoại không được để trống"
    })
    .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, {
      message: "Số điện thoại không hợp lệ"
    }),
  city: z.string().min(1, {
    message: "Tỉnh/Thành Phố không được để trống"
  }),
  district: z.string(),
  ward: z.string()
});

const UpdateInfo = () => {
  const navigate = useNavigate();
  const [initCity, setInitCity] = useState(false);
  const [initDistrict, setInitDistrict] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [signedInUser, setSignedInUser] = useAtom(
    signedInUserAtomWithPersistence
  );

  const [wardInfo, districtInfo, cityInfo] = signedInUser.address
    ? signedInUser.address.split(", ").map((part) => part.trim())
    : ["", "", ""];

  const [updateMyAccount] = useMutation(UPDATE_MY_ACCOUNT, {
    context: {
      headers: {
        Authorization: `Bearer ${signedInUser.accessToken}`
      }
    }
  });

  // Form definition
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: signedInUser.displayName,
      gender: signedInUser.gender ? "Nam" : "Nữ",
      birthDate: signedInUser.birthDate
        ? new Date(signedInUser.birthDate)
        : new Date(),
      phone: signedInUser.phone,
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

  // Submit handler
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

    await updateMyAccount({
      variables: {
        bodyReq: {
          displayName: values.displayName,
          gender: values.gender === "Nam",
          birthDate: values.birthDate,
          phone: values.phone,
          address: `${wardVal}, ${districtVal}, ${values.city}`
        }
      }
    })
      .then((_result) => {
        setSignedInUser({
          ...signedInUser,
          displayName: values.displayName,
          gender: values.gender === "Nam",
          birthDate: values.birthDate,
          phone: values.phone,
          address: `${wardVal}, ${districtVal}, ${values.city}`
        });

        toast.success("Cập nhật thông tin thành công");
        navigate("/user-info");
      })
      .catch((error) => {
        console.log(error.message);
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

  return (
    <div className="w-full h-max">
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
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Họ và tên</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Họ và tên"
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
                        value={field.value}
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
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ngày sinh</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal rounded-xl border-slate-300",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "P", { locale: vi })
                            ) : (
                              <span>Chọn ngày sinh</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 rounded-xl border-slate-300"
                        align="end"
                      >
                        <Calendar
                          styles={{ dropdown_month: { marginRight: "0.5rem" } }}
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date()}
                          initialFocus
                          locale={vi}
                          captionLayout="dropdown-buttons"
                          fromYear={new Date().getFullYear() - 80}
                          toYear={new Date().getFullYear()}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
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

              <div className="w-full flex flex-col justify-center items-start gap-2">
                <FormLabel>Địa chỉ</FormLabel>
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
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

              <div className="flex md:flex-row flex-col justify-around items-center w-full md:gap-2">
                <Button
                  type="button"
                  className={cn(
                    "rounded-xl my-2 md:w-[50%] w-full bg-red-600 hover:bg-red-500"
                  )}
                  onClick={handleResetForm}
                  disabled={
                    !form.formState.isDirty &&
                    districtVal === districtInfo &&
                    wardVal === wardInfo
                  }
                >
                  <CancelOutlinedIcon className="mr-2" />
                  <p>Hoàn tác</p>
                </Button>

                <Button
                  type="submit"
                  className={cn("rounded-xl my-2 md:w-[50%] w-full")}
                  disabled={
                    (!form.formState.isDirty || !form.formState.isValid) &&
                    (districtVal === "all" ||
                      wardVal === "all" ||
                      (districtVal === districtInfo && wardVal === wardInfo))
                  }
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
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateInfo;
