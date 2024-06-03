/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
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
import { useLazyQuery } from "@apollo/client";
import {
  GET_ITEM_TYPE_WITH_FILTER,
  GET_POST_WITH_FILTER
} from "@/services/graphql/queries";
import { useSearchParams } from "react-router-dom";

const PostResultList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [searchString, setSearchString] = useState<string>("");
  const [postType, setPostType] = useState<string>("all");
  const [itemType, setItemType] = useState<string>("all");
  const [location, setLocation] = useState<string>("all");

  const [itemTypes, setItemTypes] = useState<ItemType[]>([]);
  const [getAllItemTypes] = useLazyQuery(GET_ITEM_TYPE_WITH_FILTER);

  const [posts, setPosts] = useState<PostWithFilter[]>([]);
  const [getPostWithFilter] = useLazyQuery(GET_POST_WITH_FILTER);

  const handleGetItemTypes = async () => {
    await getAllItemTypes({
      variables: {
        filters: {
          page: 1,
          pageSize: 100
        }
      },
      fetchPolicy: "network-only"
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

  const resetFilters = () => {
    setSearchString("");
    setPostType("all");
    setItemType("all");
    setLocation("all");

    if (searchParams.size > 0) {
      searchParams.delete("search");
      searchParams.delete("filter");

      setSearchParams(searchParams);
    }
  };

  const handleSearch = async () => {
    const filters: any = {
      page: 1,
      pageSize: 10000,
      searchKey: searchString,
      itemTypeIds: itemType === "all" ? [] : [Number(itemType)],
      location: location === "all" ? "" : location
    };
    if (postType !== "all") {
      filters["postType"] = postType;
    }

    setIsLoading(true);

    await getPostWithFilter({
      variables: {
        filters: filters
      },
      fetchPolicy: "network-only"
    })
      .then((result) => {
        const resultData = result.data.getPostWithFilter.data;

        const pList: PostWithFilter[] = resultData.listData.map(
          (post: PostWithFilter) => {
            return {
              id: post.id,
              title: post.title,
              postType: post.postType,
              location: post.location,
              locationDetail: post.locationDetail,
              description: post.description,
              approved: post.approved,
              viewCount: post.viewCount,
              totalComments: post.totalComments,
              fileName: post.fileName ? post.fileName : "",
              filePath: post.filePath ? post.filePath : "",
              createdDate: new Date(post.createdDate),
              updatedDate: new Date(post.updatedDate)
            };
          }
        );

        setPosts(pList);
      })
      .catch((error) => {
        console.log(error);
      });

    setIsLoading(false);
  };

  const queryPostWithFilters = async (filters: any) => {
    setIsLoading(true);

    await getPostWithFilter({
      variables: {
        filters: filters
      },
      fetchPolicy: "network-only"
    })
      .then((result) => {
        const resultData = result.data.getPostWithFilter.data;

        const pList: PostWithFilter[] = resultData.listData.map(
          (post: PostWithFilter) => {
            return {
              id: post.id,
              title: post.title,
              postType: post.postType,
              location: post.location,
              locationDetail: post.locationDetail,
              description: post.description,
              approved: post.approved,
              viewCount: post.viewCount,
              totalComments: post.totalComments,
              fileName: post.fileName ? post.fileName : "",
              filePath: post.filePath ? post.filePath : "",
              createdDate: new Date(post.createdDate),
              updatedDate: new Date(post.updatedDate)
            };
          }
        );

        setPosts(pList);
      })
      .catch((error) => {
        console.log(error);
      });

    setIsLoading(false);
  };

  useEffect(() => {
    if (itemTypes.length === 0) {
      handleGetItemTypes();
    }

    if (searchParams.size > 0) {
      const filters: any = {
        page: 1,
        pageSize: 10000
      };

      if (searchParams.get("search")) {
        setSearchString(searchParams.get("search") as string);
        filters["searchKey"] = searchParams.get("search");
      }

      if (searchParams.get("filter")) {
        switch (searchParams.get("filter")) {
          case "lost":
            setPostType("LOST");
            filters["postType"] = "LOST";
            break;
          case "collect":
            setPostType("COLLECT");
            filters["postType"] = "COLLECT";
            break;
          case "pet":
            setItemType("2");
            filters["itemTypeIds"] = [2];
            break;
          case "people":
            setItemType("3");
            filters["itemTypeIds"] = [3];
            break;
        }
      }

      queryPostWithFilters(filters);
    } else {
      handleSearch();
    }
  }, [searchParams]);

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

        <Separator className={cn("w-full bg-slate-200 my-2")} />

        <div className="w-full h-full flex lg:flex-row flex-col gap-8">
          <div className="xl:w-2/5 lg:w-1/4 flex flex-col gap-2">
            <Label htmlFor="search" className="font-semibold text-lg">
              Từ khóa
            </Label>
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
            value={postType}
            onValueChange={(value: string) => setPostType(value)}
            className="xl:w-1/5 lg:w-1/4"
          >
            <p className="font-semibold text-lg">Loại tin</p>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="type-all" />
              <Label htmlFor="type-all">Tất cả</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="LOST" id="type-lost" />
              <Label htmlFor="type-lost">Tin cần tìm</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="COLLECT" id="type-collect" />
              <Label htmlFor="type-collect">Tin nhặt được</Label>
            </div>
          </RadioGroup>

          <div className="xl:w-1/5 lg:w-1/4 flex flex-col gap-2">
            <p className="font-semibold text-lg">Chọn khu vực</p>
            <Select
              value={location}
              onValueChange={(value: string) => setLocation(value)}
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

          <div className="xl:w-1/5 lg:w-1/4 flex flex-col gap-2">
            <p className="font-semibold text-lg">Danh mục</p>
            <Select
              value={itemType}
              onValueChange={(value: string) => setItemType(value)}
            >
              <SelectTrigger className="border-2 border-slate-200 rounded-xl">
                <SelectValue placeholder="Tất cả" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key={-1} value="all">
                  Tất cả
                </SelectItem>
                {itemTypes.map((item: ItemType, index: number) => (
                  <SelectItem key={index} value={item.id.toString()}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="w-full flex xl:justify-end justify-center items-center">
          <Button onClick={handleSearch} className="rounded-xl gap-2">
            <SearchOutlinedIcon />
            Tìm kiếm
          </Button>
        </div>
      </div>

      <PostsList isLoading={isLoading} posts={posts} />
    </div>
  );
};

export default PostResultList;
