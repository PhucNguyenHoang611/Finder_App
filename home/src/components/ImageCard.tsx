import { useNavigate } from "react-router-dom";

export default function ImageCard({ post }: ImageCardProps) {
  const navigate = useNavigate();

  const openDetailPage = () => {
    navigate(`/post-details/${post.id}`);
  };

  return (
    <div className="rounded-[8px] overflow-hidden shadow-md">
      <div className="w-full flex justify-center items-center lg:[200px] md:h-[180px] h-[160px] overflow-hidden">
        <img
          className="w-full object-cover cursor-pointer"
          onClick={openDetailPage}
          src={
            post.filePath
              ? post.filePath
              : "https://cdn.vectorstock.com/i/preview-1x/39/63/no-photo-camera-sign-vector-3213963.jpg"
          }
          alt={post.fileName ? post.fileName : "no-image"}
        />
      </div>
      <div className="min-[1024px]:px-2 max-[1024px]:px-4 py-2">
        <div
          className="font-bold min-[1024px]:text-md min-[640px]:text-base max-[640px]:text-lg w-full cursor-pointer hover:text-gray-500"
          onClick={openDetailPage}
        >
          {post.title.length > 100
            ? post.title.substring(0, 100) + "..."
            : post.title}
        </div>
      </div>
      <div className="min-[1024px]:px-2 max-[1024px]:px-4 pt-2 pb-1 flex min-[1024px]:flex-row max-[1024px]:flex-col justify-between">
        <span className="text-nowrap inline-block min-[640px]:text-xs max-[640px]:text-base font-semibold text-white bg-black mb-2 min-[1024px]:text-left max-[1024px]:text-center border border-black rounded-full p-1">
          {post.location}
        </span>
        <span className="text-nowrap inline-block min-[640px]:text-xs max-[640px]:text-base font-semibold text-black mb-2 min-[1024px]:text-right max-[1024px]:text-center border border-black rounded-full p-1">
          {post.postType === "LOST" ? "Tin cần tìm" : "Tin nhặt được"}
        </span>
      </div>
    </div>
  );
}
