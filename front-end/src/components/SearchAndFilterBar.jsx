import { useState } from "react";
import FilterButton from "./FilterButton";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");

  return (
    <div className="w-screen">
      <div id="search-bar" className="relative w-full m-5">
        <img
          src="search_icon.png"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-70"
        />
        <input
          className="w-full bg-gray-800 text-gray-300 rounded-3xl h-12 pl-12 pr-4 placeholder-gray-500 focus:outline-none focus:border-gray-500 max-w-4xl "
          type="text"
          id="search"
          name="search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          aria-autocomplete="true"
          placeholder="Search your item"
          required
        />
      </div>
      <div id="filter-bar" className="relative w-full m-5 flex justify-between">
        <div>
          <select
            className=" bg-gray-800 text-gray-300 rounded-2xl h-12 pl-2 pr-4 placeholder-gray-500 focus:outline-none focus:border-gray-500 w-fit mr-2 font-bold"
            id="filter"
            name="filter"
            aria-autocomplete="true"
            placeholder="Filter your item"
            required
          >
            <option value="">Category</option>
            <option value="new">New</option>
            <option value="used">Used</option>
          </select>

          <select
            className=" bg-gray-800 text-gray-300 rounded-2xl h-12 pl-2 pr-1 placeholder-gray-500 focus:outline-none focus:border-gray-500 w-fit mr-2 font-bold"
            id="filter"
            name="filter"
            aria-autocomplete="true"
            placeholder="Filter your item"
            required
          >
            <option value="">Status</option>
            <option value="new">New</option>
            <option value="used">Used</option>
          </select>

          <select
            className=" bg-gray-800 text-gray-300 rounded-2xl h-12 pl-2 pr-4 placeholder-gray-500 focus:outline-none focus:border-gray-500 w-fit mr-2 font-bold"
            id="filter"
            name="filter"
            aria-autocomplete="true"
            placeholder="Filter your item"
            required
          >
            <option value="">Location</option>
            <option value="new">New</option>
            <option value="used">Used</option>
          </select>
        </div>

        <FilterButton />
      </div>
    </div>
  );
}
