import { useNavigate } from "react-router-dom";
import { MapPinIcon, EyeIcon } from "lucide-react";

export default function ImageCard({ post }: ImageCardProps) {
  const navigate = useNavigate();

  const openDetailPage = () => {
    navigate(`/post-details/${post.id}`);
  };

  return (
    <div className="rounded-[8px] overflow-hidden shadow-md">
      <div className="w-full flex justify-center items-center lg:[200px] md:h-[180px] h-[160px] overflow-hidden relative">
        <img
          className="w-full object-cover cursor-pointer hover:scale-125 transition-transform duration-300 ease-in-out"
          onClick={openDetailPage}
          src={
            post.filePath
              ? post.filePath
              : "https://cdn.vectorstock.com/i/preview-1x/39/63/no-photo-camera-sign-vector-3213963.jpg"
          }
          alt={post.fileName ? post.fileName : "no-image"}
        />

        <span className="absolute py-0.5 flex items-center bottom-0 left-0 bg-orange-700 text-white text-nowrap inline-block min-[1800px]:text-sm text-xs italic font-semibold text-black min-[1024px]:px-2 max-[1024px]:px-4 w-max rounded-tr-xl">
          <EyeIcon size={16} className="inline-block mr-1" />
          {post.viewCount}
        </span>
        <span className="absolute py-0.5 bottom-0 right-0 bg-orange-700 text-white text-nowrap inline-block min-[1800px]:text-sm text-xs italic font-semibold text-black min-[1024px]:px-2 max-[1024px]:px-4 w-max rounded-tl-xl">
          {post.totalComments} bình luận
        </span>
      </div>
      <div className="min-[1024px]:px-2 max-[1024px]:px-4 pt-2">
        <div
          // min-[1024px]:text-md min-[640px]:text-base max-[640px]:text-lg
          className="font-semibold text-pretty min-[1800px]:text-base text-sm w-full cursor-pointer hover:text-gray-500"
          onClick={openDetailPage}
          style={{
            lineHeight: "1.5",
            minHeight: "calc(4 * 1.5em)"
          }}
        >
          {post.title.length > 80
            ? post.title.substring(0, 80) + "..."
            : post.title}
        </div>
      </div>
      {/* min-[1150px]:text-right max-[1150px]:text-center */}
      <span className="text-nowrap inline-block min-[1800px]:text-sm text-xs italic font-semibold text-slate-600 uppercase min-[1024px]:px-2 max-[1024px]:px-4 mb-2 w-full">
        {post.postType === "LOST" ? "Tin cần tìm" : "Tin nhặt được"}
      </span>

      {/* min-[1150px]:text-left max-[1150px]:text-center */}
      <div className="w-full min-[1024px]:px-2 max-[1024px]:px-4 mb-2">
        <span className="text-nowrap inline-block min-[1800px]:text-sm text-xs font-semibold w-max flex items-center text-white bg-black rounded-full p-1">
          <MapPinIcon size={16} className="inline-block mr-1" />
          {post.location}
        </span>
      </div>

      {/* min-[640px]:text-xs max-[640px]:text-base */}
      {/* <div className="min-[1024px]:px-2 max-[1024px]:px-4 pt-2 pb-1 flex min-[1150px]:flex-row max-[1150px]:flex-col justify-between"></div> */}
    </div>
  );
}
