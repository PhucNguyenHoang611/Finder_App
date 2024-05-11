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

const SideBar = () => {
  return (
    <nav className="flex justify-center items-start gap-4 w-full h-full">
      <ul className="text-apptext-1 w-full">
        <hr className="text-black border my-2" />

        <li>
          <Link to={"/create-post"}>
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
      </ul>
    </nav>
  );
};

export default SideBar;
