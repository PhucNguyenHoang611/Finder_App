import {
  RiMenu2Line,
  RiUpload2Line,
  RiNotification3Fill,
  RiAccountBoxLine,
} from "@remixicon/react";
import "@/assets/scss/navbav.scss";
import SearchBar from "./SearchBar";

const NavBar = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">
          <a href="#">Finder</a>
        </div>
        <div className="navbar-expand">
          <RiMenu2Line></RiMenu2Line>
        </div>
        <SearchBar />
        <ul className="navbar-nav">
          <li>
            <RiUpload2Line></RiUpload2Line>
          </li>
          <li>
            <RiNotification3Fill></RiNotification3Fill>
          </li>
          <li>
            <RiAccountBoxLine></RiAccountBoxLine>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
