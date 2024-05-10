import { useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

import PostsList from "@/components/Post/PostsList";
import { level1s } from "dvhcvn";
import { Button } from "@/components/ui/button";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const categories = [
  "Ví/Giấy tờ",
  "Thú cưng (Chó/Mèo)",
  "Tìm người",
  "Điện thoại/Tablet/Laptop",
  "Xe máy/Ô tô",
  "Đồ vật khác"
];

const PostResultList = () => {
  const [searchString, setSearchString] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [city, setCity] = useState<string>("all");

  const resetFilters = () => {
    setSearchString("");
    setType("");
    setCategory("");
    setCity("all");
  };

  const handleSearch = () => {
    console.log(searchString);
    console.log(type);
    console.log(category);
    console.log(city);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="w-full bg-white shadow-sm flex flex-col justify-center items-center border-2 border-slate-200 rounded-xl p-4 gap-4">
        <div className="w-full flex justify-between items-center">
          <p className="font-semibold text-xl">Bộ lọc</p>

          <Button
            onClick={resetFilters}
            className="rounded-xl text-lg gap-2 bg-red-600 hover:bg-red-500"
          >
            <ChangeCircleOutlinedIcon />
            Xóa bộ lọc
          </Button>
        </div>

        <Separator
          className={cn(
            "w-full bg-slate-200 my-2"
          )}
        />

        <div className="w-full h-full flex md:flex-row flex-col gap-8">
          <div className="lg:w-2/5 md:w-1/4 flex flex-col gap-2">
            <Label htmlFor="search" className="font-semibold text-lg">Từ khóa</Label>
            <Input
              type="text"
              id="search"
              placeholder="Nhập từ khóa cần tìm"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
              className="border-2 border-slate-200 rounded-xl"
            />
          </div>

          <RadioGroup
            value={type}
            onValueChange={(value: string) => setType(value)}
            className="lg:w-1/5 md:w-1/4"
          >
            <p className="font-semibold text-lg">Loại tin</p>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Tin cần tìm" id="tin-can-tim" />
              <Label htmlFor="tin-can-tim">Tin cần tìm</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Tin nhặt được" id="tin-nhat-duoc" />
              <Label htmlFor="tin-nhat-duoc">Tin nhặt được</Label>
            </div>
          </RadioGroup>

          <div className="lg:w-1/5 md:w-1/4 flex flex-col gap-2">
            <p className="font-semibold text-lg">Chọn khu vực</p>
            <Select
              value={city}
              onValueChange={(value: string) => setCity(value)}
            >
              <SelectTrigger className="border-2 border-slate-200 rounded-xl">
                <SelectValue placeholder="Toàn quốc" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key={-1} value="all">
                  Toàn quốc
                </SelectItem>
                {level1s.map((item, index) => (
                  <SelectItem key={index} value={item.name}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="lg:w-1/5 md:w-1/4 flex flex-col gap-2">
            <p className="font-semibold text-lg">Danh mục</p>
            <Select
              value={category}
              onValueChange={(value: string) => setCategory(value)}
            >
              <SelectTrigger className="border-2 border-slate-200 rounded-xl">
                <SelectValue placeholder="Tất cả" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key={-1} value="all">
                  Tất cả
                </SelectItem>
                {categories.map((item: string, index: number) => (
                  <SelectItem key={index} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="w-full flex md:justify-end justify-center items-center">
          <Button
            onClick={handleSearch}
            className="rounded-xl gap-2"
          >
            <SearchOutlinedIcon />
            Tìm kiếm
          </Button>
        </div>
      </div>

      <PostsList />
    </div>
  );
};

export default PostResultList;