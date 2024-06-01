/* eslint-disable @typescript-eslint/no-explicit-any */
import { RiSearchLine } from "@remixicon/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    if (!searchValue) {
      return;
    } else {
      navigate(`/result-list?search=${searchValue}`);
      setSearchValue("");
    }
  };

  return (
    <div className="inline">
      <div className="pt-2 relative mx-auto text-gray-600 w-full">
        <input
          className="w-full border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-xl text-sm focus:outline-none"
          type="search"
          name="search"
          placeholder="Tìm kiếm ở đây..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        <button
          type="button"
          onClick={handleSearch}
          className="absolute right-0 top-0 mt-5 mr-4"
        >
          <RiSearchLine className="pb-2" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
