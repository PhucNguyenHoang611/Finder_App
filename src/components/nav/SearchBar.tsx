import "@/assets/scss/navbav.scss";
import { RiSearchLine } from "@remixicon/react";

const SearchBar = () => {
  return (
    <div>
      <div className="search-container">
        <input type="text" className="search" placeholder="Search..." />
        <RiSearchLine className="search-icon"></RiSearchLine>
      </div>
    </div>
  );
};

export default SearchBar;
