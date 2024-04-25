import {
  Bell,
  Bug,
  Dog,
  HandHeart,
  PersonStanding,
  PhoneOff,
  TextSearch,
  Upload,
  UsersRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { Button } from "../ui/button";

const SideBar = () => {
  return (
    <div className="flex justify-center items-start gap-4 w-full h-full">
      <ul className="text-apptext-1 w-full">
        <li className="w-full">
          <h1 className="font-bold text-2xl text-center mt-4">
            <Link to={"/"}>Finder</Link>
          </h1>
        </li>

        <li className="w-full py-4">
          <SearchBar />
        </li>

        <hr className="text-black border my-2" />

        <li>
          <Link to={"/post"}>
            <div className="p-2 font-bold flex gap-2 w-full hover:bg-appbg-2 border border-transparent	 rounded-xl">
              <Upload className="text-apptext-3" />
              Đăng tin
            </div>
          </Link>
        </li>
        <li>
          <Link to={`/filter/find`}>
            <div className="p-2 font-bold flex gap-2 w-full hover:bg-appbg-2 border border-transparent	 rounded-xl">
              <TextSearch className="text-apptext-3" />
              Tin cần tìm
            </div>
          </Link>
        </li>
        <li>
          <Link to={"/filter/pick"}>
            <div className="p-2 font-bold flex gap-2 w-full hover:bg-appbg-2 border border-transparent	 rounded-xl">
              <HandHeart className="text-apptext-3" />
              Tin nhặt được
            </div>
          </Link>
        </li>
        <li>
          <Link to={"/filter/animal"}>
            <div className="p-2 font-bold flex gap-2 w-full hover:bg-appbg-2 border border-transparent	 rounded-xl">
              <Dog className="text-apptext-3" />
              Tìm thú cưng
            </div>
          </Link>
        </li>
        <li>
          <Link to={"/filter/people"}>
            <div className="p-2 font-bold flex gap-2 w-full hover:bg-appbg-2 border border-transparent	 rounded-xl">
              <PersonStanding className="text-apptext-3" />
              Tìm người
            </div>
          </Link>
        </li>
        <hr className="text-black border my-2" />
        <li>
          <Link to={"/scam"}>
            <div className="p-2 font-bold flex gap-2 w-full hover:bg-appbg-2 border border-transparent	 rounded-xl">
              <PhoneOff className="text-apptext-3" />
              Cảnh báo lừa đảo
            </div>
          </Link>
        </li>
        <li>
          <Link to={"/aboutus"}>
            <div className="p-2 font-bold flex gap-2 w-full hover:bg-appbg-2 border border-transparent	 rounded-xl">
              <UsersRound className="text-apptext-3" />
              Giới thiệu
            </div>
          </Link>
        </li>
        <li>
          <Link to={"/contact"}>
            <div className="p-2 font-bold flex gap-2 w-full hover:bg-appbg-2 border border-transparent	 rounded-xl">
              <Bug className="text-apptext-3" />
              Liên hệ chúng tôi
            </div>
          </Link>
        </li>

        <hr className="text-black border my-2" />

        <li>
          <Link to={"/notify"}>
            <div className="p-2 font-bold flex gap-2 w-full hover:bg-appbg-2 border border-transparent	 rounded-xl">
              <Bell className="text-apptext-3" />
              Thông báo
            </div>
          </Link>
        </li>
        <li className="flex justify-start gap-2 absolute bottom-4">
          <Link to={"/sign-in"}>
            <Button className="w-30">Đăng nhập</Button>
          </Link>
          <Link to={"/sign-in"}>
            <Button className=" bg-transparent border border-black text-black w-30">
              Đăng ký
            </Button>
          </Link>
        </li>
        {/* <li>
          <Link to={"/Contact"}>
            <div className="p-2 font-bold flex gap-2 w-full hover:bg-appbg-2 border border-transparent	 rounded-xl">
              <SquareUser className="text-apptext-3" />
              Tài khoản
            </div>
          </Link>
        </li> */}
      </ul>
    </div>
  );
};

export default SideBar;
