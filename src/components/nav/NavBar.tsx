import {
  RiMenu2Line,
  RiUpload2Line,
  RiNotification3Fill,
} from "@remixicon/react";
import "@/assets/scss/navbav.scss";
import SearchBar from "./SearchBar";
import { CircleUserRound } from "lucide-react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to={"/"}>Finder</Link>
      </div>
      <div className="navbar-expand">
        <RiMenu2Line></RiMenu2Line>
      </div>
      <SearchBar />
      <ul className="navbar-nav">
        <li>
          <button>
            <RiUpload2Line />
          </button>
        </li>
        <li>
          <button>
            <RiNotification3Fill />
          </button>
        </li>
        <li>
          <button>
            <CircleUserRound />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
