export default function ImageCard(Props: ImageCardProps) {
  return (
    <div className="max-w-sm rounded-xl overflow-hidden shadow-md">
      <img className="w-full" src={Props.imageURL} alt="card image cap" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl">{Props.title}</div>
      </div>
      <div className="px-6 pt-2 pb-1 flex justify-between">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {Props.location}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {Props.type}
        </span>
      </div>
    </div>
  );
}
