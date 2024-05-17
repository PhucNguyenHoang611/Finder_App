export default function ImageCard(Props: ImageCardProps) {
  return (
    <div className="rounded-[8px] overflow-hidden shadow-md">
      <img className="w-full" src={Props.imageURL} alt="card image cap" />
      <div className="min-[1024px]:px-2 max-[1024px]:px-4 py-2">
        <div className="font-bold min-[1024px]:text-md min-[640px]:text-base max-[640px]:text-lg w-full">
          {Props.title.length > 100
            ? Props.title.substring(0, 100) + "..."
            : Props.title}
        </div>
      </div>
      <div className="min-[1024px]:px-2 max-[1024px]:px-4 pt-2 pb-1 flex min-[1024px]:flex-row max-[1024px]:flex-col justify-between">
        <span className="inline-block min-[1536px]:text-sm min-[640px]:text-xs max-[640px]:text-base font-semibold text-white bg-black mb-2 min-[1024px]:text-left max-[1024px]:text-center border-2 border-black rounded-full p-1">
          {Props.location}
        </span>
        <span className="inline-block min-[1536px]:text-sm min-[640px]:text-xs max-[640px]:text-base font-semibold text-black mb-2 min-[1024px]:text-right max-[1024px]:text-center border-2 border-black rounded-full p-1">
          {Props.type}
        </span>
      </div>
    </div>
  );
}
