import { AlignLeft, SquareUser } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import SearchBar from "./SearchBar";

const Header = () => {
  const location = useLocation();

  return (
    <header
      className="py-2 px-10 w-full flex justify-between items-center fixed bg-[#f4f6f9] shadow-gray-200 shadow-sm"
      style={{ zIndex: 1000 }}
    >
      <div className="flex justify-center items-center">
        {location.pathname !== "/sign-in" &&
        location.pathname !== "/sign-up" ? (
          <button id="toggle-menu">
            <AlignLeft />
          </button>
        ) : null}
        <h1 className="pl-6 font-bold text-2xl text-center">
          <Link to={"/"}>Finder</Link>
        </h1>
      </div>
      <div className="w-full max-w-[300px]">
        {location.pathname !== "/sign-in" &&
        location.pathname !== "/sign-up" ? (
          <button id="toggle-menu">
            <SearchBar />
          </button>
        ) : null}
      </div>
      <ul>
        <li className="flex justify-start gap-2 bottom-4">
          <Link to={"/sign-in"}>
            <Button className="w-30">Đăng nhập</Button>
          </Link>
          <Link to={"/sign-up"}>
            <Button className=" bg-transparent border border-black text-black w-30">
              Đăng ký
            </Button>
          </Link>
        </li>
        <li className="hidden">
          <Link to={"/Contact"}>
            <div className="p-2 font-bold flex gap-2 w-full hover:bg-appbg-2 border border-transparent	 rounded-xl">
              <SquareUser className="text-apptext-3" />
              Tài khoản
            </div>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
