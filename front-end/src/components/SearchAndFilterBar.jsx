import { useState } from "react";
import FilterButton from "./FilterButton";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");

  return (
    <div className="w-full flex flex-col gap-4">
      <div id="search-bar" className="relative w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          className="w-full bg-[#1e293b] text-white rounded-2xl h-14 pl-12 pr-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-lg transition-all"
          type="text"
          id="search"
          name="search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          aria-autocomplete="true"
          placeholder="Search for lost items..."
          required
        />
      </div>

      <div id="filter-bar" className="w-full flex flex-wrap gap-4 justify-between items-center">
        <div className="flex flex-wrap gap-2">
          {["Category", "Status", "Location"].map((filter) => (
            <select
              key={filter}
              className="bg-[#1e293b] text-gray-300 rounded-xl h-10 pl-3 pr-8 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-md cursor-pointer hover:bg-[#2d3b4e] transition-colors appearance-none"
              id={filter.toLowerCase()}
              name={filter.toLowerCase()}
            >
              <option value="">{filter}</option>
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>
          ))}
        </div>

        <FilterButton />
      </div>
    </div>
  );
}
