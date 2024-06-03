/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import ImageCard from "@/components/ImageCard";
import { GET_POST_WITH_FILTER } from "@/services/graphql/queries";
import { useLazyQuery } from "@apollo/client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

import ReactPagination from "../ReactPagination";
import Spinner from "../Spinner";

const EmptyPostsList = () => {
  return (
    <div className="w-screen">
      <div className="md:w-[70%] w-[90%] h-max flex flex-col justify-center items-center gap-4">
        <img
          src="/empty.png"
          alt="empty"
          className="lg:w-[30%] w-[50%] h-auto"
        />

        <p className="text-center font-bold">Không có bài viết nào</p>
      </div>
    </div>
  );
};

const PostsList = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Handle Pagination
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPosts, setTotalPosts] = useState(0);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value));
    setPage(1);
  };

  // Get Posts Data
  const [getAllPosts] = useLazyQuery(GET_POST_WITH_FILTER);

  const handleGetAllPosts = async (p: number, pSize: number) => {
    setIsLoading(true);

    await getAllPosts({
      variables: {
        filters: {
          page: p,
          pageSize: pSize
        }
      },
      fetchPolicy: "network-only"
    })
      .then((result) => {
        const resultData = result.data.getPostWithFilter.data;

        const pList: Post[] = resultData.listData.map((post: any) => {
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
            fileName: post.fileName,
            filePath: post.filePath,
            createDate: new Date(post.createDate),
            updatedDate: new Date(post.updatedDate)
          };
        });

        setPosts(pList);
        setTotalPosts(resultData.totalCount);
      })
      .catch((error) => {
        console.log(error);
      });

    setIsLoading(false);
  };

  useEffect(() => {
    handleGetAllPosts(page, pageSize);
  }, [page, pageSize]);

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 md:py-8 py-4 justify-center w-full">
        {posts.length > 0 &&
          !isLoading &&
          posts.map((post: Post, index) => (
            <ImageCard key={index} post={post} />
          ))}

        {isLoading && (
          <div className="w-screen">
            <div className="md:w-[70%] w-[90%] h-max flex justify-center items-center">
              <Spinner />
            </div>
          </div>
        )}

        {posts.length === 0 && !isLoading && <EmptyPostsList />}
      </div>

      {posts.length > 0 && !isLoading && (
        <div className="w-full flex md:flex-row flex-col-reverse justify-between md:items-center items-end md:gap-2 gap-4">
          <ReactPagination
            currentPage={page}
            pageSize={pageSize}
            totalPosts={totalPosts}
            onPageChange={handlePageChange}
          />

          <div className="w-[150px] flex flex-col justify-center items-start gap-2">
            <label className="block text-sm font-semibold">
              Số tin mỗi trang
            </label>

            <Select
              value={pageSize.toString()}
              onValueChange={(value: string) => handlePageSizeChange(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Số tin mỗi trang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="15">15</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostsList;
