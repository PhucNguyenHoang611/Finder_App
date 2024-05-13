import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import SearchBar from "./SearchBar";
import NavDrawer from "./NavDrawer";
import NavDropdown from "./NavDropdown";
import NotificationDropdown from "@/components/Notification/NotificationDropdown";

const Header = () => {
  const location = useLocation();
  const temp = true;

  return (
    <header
      className="py-2 lg:px-10 md:px-6 px-4 w-full flex justify-between items-center fixed bg-[#f4f6f9] shadow-gray-200 shadow-sm"
      style={{ zIndex: 1000 }}
    >
      <div className="flex justify-center items-center">
        {location.pathname !== "/sign-in" &&
          location.pathname !== "/sign-up" ? (
            <NavDrawer />
          ) : null
        }

        <Link to={"/"} className="lg:flex hidden lg:ml-6 justify-center items-center">
          <img src="/mainLogo_nt.png" alt="mainLogo" className="w-16" />
          <h1 className="font-bold text-2xl text-center">
            Finder
          </h1>
        </Link>
      </div>

      <div className="w-full flex lg:justify-center justify-end items-center">
        {location.pathname !== "/sign-in" &&
        location.pathname !== "/sign-up" ? (
          <SearchBar />
        ) : null}
      </div>
      
      <ul className="lg:flex hidden">
        <li className="flex justify-start gap-2 bottom-4">
          <Link to={"/sign-in"}>
            <Button className="w-30 rounded-xl">Đăng nhập</Button>
          </Link>
          <Link to={"/sign-up"}>
            <Button className="bg-transparent border border-black text-black w-30 rounded-xl">
              Đăng ký
            </Button>
          </Link>
        </li>

        <li className={`${!temp ? "flex" : "hidden"} justify-center items-center mr-6`}>
          <NotificationDropdown />
        </li>

        <li className={`${!temp ? "flex" : "hidden"} justify-center items-center`}>
          <NavDropdown />
        </li>
      </ul>
    </header>
  );
};

export default Header;