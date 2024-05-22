import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import SearchBar from "./SearchBar";
import NavDrawer from "./NavDrawer";
import NavDropdown from "./NavDropdown";
import NotificationDropdown from "@/components/Notification/NotificationDropdown";
import { useAtomValue } from "jotai";
import { signedInUserAtom } from "@/store";

const Header = () => {
  const location = useLocation();
  const signedInUser = useAtomValue(signedInUserAtom);

  return (
    <header
      className="py-2 min-[1024px]:px-10 min-[768px]:px-6 max-[768px]:px-4 w-full flex justify-between items-center fixed bg-[#f4f6f9] shadow-gray-200 shadow-sm"
      style={{ zIndex: 1000 }}
    >
      <div className="flex justify-center items-center">
        {location.pathname !== "/sign-in" &&
        location.pathname !== "/sign-up" ? (
          <NavDrawer />
        ) : null}

        <Link
          to={"/"}
          className="min-[1024px]:flex max-[1024px]:hidden min-[1024px]:ml-6 justify-center items-center"
        >
          <img src="/mainLogo_nt.png" alt="mainLogo" className="w-16" />
          <h1 className="font-bold text-2xl text-center">Finder</h1>
        </Link>
      </div>

      <div className="w-full flex min-[1024px]:justify-center max-[1024px]:justify-end items-center">
        {location.pathname !== "/sign-in" &&
        location.pathname !== "/sign-up" ? (
          <SearchBar />
        ) : null}
      </div>

      <ul className="min-[1024px]:flex max-[1024px]:hidden">
        <li
          className={`${
            signedInUser.email ? "hidden" : "flex"
          } justify-start gap-2 bottom-4`}
        >
          <Link to={"/sign-in"}>
            <Button className="w-30 rounded-xl">Đăng nhập</Button>
          </Link>
          <Link to={"/sign-up"}>
            <Button className="bg-transparent border border-black text-black w-30 rounded-xl">
              Đăng ký
            </Button>
          </Link>
        </li>

        <li
          className={`${
            signedInUser.email ? "flex" : "hidden"
          } justify-center items-center mr-6`}
        >
          <NotificationDropdown />
        </li>

        <li
          className={`${
            signedInUser.email ? "flex" : "hidden"
          } justify-center items-center`}
        >
          <NavDropdown />
        </li>
      </ul>
    </header>
  );
};

export default Header;
