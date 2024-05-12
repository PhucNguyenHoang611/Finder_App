export default function ImageCard(Props: ImageCardProps) {
  return (
    <div className="rounded-lg overflow-hidden shadow-md">
      <img className="w-full" src={Props.imageURL} alt="card image cap" />
      <div className="lg:px-2 px-4 py-2">
        <div className="font-bold lg:text-md sm:text-base text-lg w-full">
          {Props.title.length > 100 ? Props.title.substring(0, 100) + "..." : Props.title}
        </div>
      </div>
      <div className="lg:px-2 px-4 pt-2 pb-1 flex lg:flex-row flex-col justify-between">
        <span className="inline-block 2xl:text-sm sm:text-xs text-base font-semibold text-white bg-black mb-2 lg:text-left text-center border-2 border-black rounded-full p-1">
          {Props.location}
        </span>
        <span className="inline-block 2xl:text-sm sm:text-xs text-base font-semibold text-black mb-2 lg:text-right text-center border-2 border-black rounded-full p-1">
          {Props.type}
        </span>
      </div>
    </div>
  );
}