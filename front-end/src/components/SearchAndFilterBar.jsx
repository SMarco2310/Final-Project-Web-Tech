import { useState } from "react";
import FilterButton from "./FilterButton";
import CustomSelect from "./CustomSelect";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");
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

      <div
        id="filter-bar"
        className="w-full flex flex-wrap gap-4 justify-between items-center"
      >
        <div className="flex flex-wrap gap-2 z-50">
          <CustomSelect
            label="Category"
            options={["electronics", "clothing", "documents", "others"]}
            value={category}
            onChange={setCategory}
          />
          <CustomSelect
            label="Status"
            options={["lost", "found", "claimed"]}
            value={status}
            onChange={setStatus}
          />
          <CustomSelect
            label="Location"
            options={["library", "cafeteria", "hostel", "classroom"]}
            value={location}
            onChange={setLocation}
          />
        </div>
        <div className="md:mt-2 h-12 md:justify-center w-full md:w-auto">
          <FilterButton />
        </div>
      </div>
    </div>
  );
}
