import { RiSearchLine } from "@remixicon/react";

const SearchBar = () => {
  return (
    <div className="inline">
      <div className="pt-2 relative mx-auto text-gray-600 w-full">
        <input
          className="w-full border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-xl text-sm focus:outline-none"
          type="search"
          name="search"
          placeholder="Tìm kiếm..."
        />
        <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
          <RiSearchLine className="pb-2"></RiSearchLine>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
