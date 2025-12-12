import SearchBar from "../components/SearchAndFilterBar.jsx";
import Gallery from "../components/Gallery.jsx";
import { useState, useMemo } from "react";

export default function GalleryPage() {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");

  const items = [
    {
      id: 1,
      name: "Laptop",
      description: "A black laptop with a broken screen",
      image: "laptop_image.jpg",
      location: "Room 101",
      date: "2022-01-01",
      status: "Lost",
      category: "electronics"
    },
    {
      id: 2,
      name: "Phone",
      description: "A white phone with a cracked screen",
      image: "phone_image.jpg",
      location: "Room 102",
      date: "2022-01-02",
      status: "Found",
      category: "electronics"
    },
    {
      id: 3,
      name: "Wallet",
      description: "A black wallet with a missing card",
      image: "purse_picture.png",
      location: "Room 103",
      date: "2022-01-03",
      status: "Lost",
      category: "personal"
    },
    {
      id: 4,
      name: "Wallet",
      description: "A black wallet with a missing card",
      image: "purse_picture.png",
      location: "Room 103",
      date: "2022-01-03",
      status: "Lost",
      category: "personal"
    },
    {
      id: 5,
      name: "Phone",
      description: "A white phone with a cracked screen",
      image: "phone_image.jpg",
      location: "Room 102",
      date: "2022-01-02",
      status: "Claimed",
      category: "electronics"
    },
    {
      id: 6,
      name: "Wallet",
      description: "A black wallet with a missing card",
      image: "purse_picture.png",
      location: "Room 103",
      date: "2022-01-03",
      status: "Lost",
      category: "personal"
    },
    {
      id: 7,
      name: "Wallet",
      description: "A black wallet with a missing card",
      image: "purse_picture.png",
      location: "Room 103",
      date: "2022-01-03",
      status: "Lost",
      category: "personal"
    },
  ];

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchKeyword = item.name.toLowerCase().includes(keyword.toLowerCase()) ||
        item.description.toLowerCase().includes(keyword.toLowerCase());
      const matchCategory = category ? item.category === category : true;
      const matchStatus = status ? item.status.toLowerCase() === status.toLowerCase() : true;
      const matchLocation = location ? item.location.toLowerCase().includes(location.toLowerCase()) : true;

      return matchKeyword && matchCategory && matchStatus && matchLocation;
    });
  }, [items, keyword, category, status, location]);

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-6xl font-semibold text-white">Lost & Found Items</h1>
        <p className="text-gray-400 text-xl">
          Browse through items that have been recently reported. Use the filters
          to narrow your search.
        </p>
      </div>

      <SearchBar
        keyword={keyword} setKeyword={setKeyword}
        category={category} setCategory={setCategory}
        status={status} setStatus={setStatus}
        location={location} setLocation={setLocation}
      />

      <div className="mt-4">
        {filteredItems.length > 0 ? (
          <Gallery items={filteredItems} />
        ) : (
          <div className="text-center text-gray-500 py-20">
            <p className="text-xl">No items match your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
