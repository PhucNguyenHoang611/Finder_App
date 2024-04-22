import ImageCard from "@/components/ImageCard";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Megaphone } from "lucide-react";
import { Link } from "react-router-dom";

const cardData = [
  {
    image:
      "https://timdothatlac.vn/storage/images/categories/8fa6c3f9-942c-467d-9113-12b4b3607b40.jpg",
    title: "Cần tìm mèo lạc",
    location: "Hà Nội",
    type: "Tìm thú cưng",
  },
  {
    image:
      "https://timdothatlac.vn/storage/images/categories/8fa6c3f9-942c-467d-9113-12b4b3607b40.jpg",
    title: "Tìm chó lạc",
    location: "Hồ Chí Minh",
    type: "Tìm thú cưng",
  },
  {
    image:
      "https://timdothatlac.vn/storage/images/categories/8fa6c3f9-942c-467d-9113-12b4b3607b40.jpg",
    title: "Tìm chủ cho chó",
    location: "Đà Nẵng",
    type: "Tìm người",
  },
  {
    image:
      "https://timdothatlac.vn/storage/images/categories/8fa6c3f9-942c-467d-9113-12b4b3607b40.jpg",
    title: "Tìm chủ cho mèo",
    location: "Hà Nội",
    type: "Tìm người",
  },
  {
    image:
      "https://timdothatlac.vn/storage/images/categories/8fa6c3f9-942c-467d-9113-12b4b3607b40.jpg",
    title: "Tìm chủ cho chó",
    location: "Đà Nẵng",
    type: "Tìm người",
  },
  {
    image:
      "https://timdothatlac.vn/storage/images/categories/8fa6c3f9-942c-467d-9113-12b4b3607b40.jpg",
    title: "Tìm chủ cho mèo",
    location: "Hà Nội",
    type: "Tìm người",
  },
];

const Home = () => {
  return (
    <section className="flex justify-center flex-col">
      <Alert className="bg-slate-300 border rounded-lg w-full mx-auto">
        <AlertDescription className="flex justify-center items-center gap-2">
          <Megaphone className="h-4 w-4 " />

          <Link to={"/post"} className="underline text-md font-bold">
            <p>Đăng tin ngay ở đây</p>
          </Link>
        </AlertDescription>
      </Alert>
      <div className="grid grid-cols-3 gap-4 py-8 justify-center w-full">
        {cardData.map((card, index) => (
          <ImageCard
            key={index}
            imageURL={card.image}
            title={card.title}
            location={card.location}
            type={card.type}
          />
        ))}
      </div>
    </section>
  );
};

export default Home;
