import SearchBar from "../components/SearchAndFilterBar.jsx";
import Gallery from "../components/Gallery.jsx";
export default function GalleryPage() {
  const items = [
    {
      id: 1,
      name: "Laptop",
      description: "A black laptop with a broken screen",
      image: "laptop_image.jpg",
      location: "Room 101",
      date: "2022-01-01",
      status: "Lost",
    },
    {
      id: 2,
      name: "Phone",
      description: "A white phone with a cracked screen",
      image: "phone_image.jpg",
      location: "Room 102",
      date: "2022-01-02",
      status: "Found",
    },
    {
      id: 3,
      name: "Wallet",
      description: "A black wallet with a missing card",
      image: "purse_picture.png",
      location: "Room 103",
      date: "2022-01-03",
      status: "Lost",
    },
    {
      id: 4,
      name: "Wallet",
      description: "A black wallet with a missing card",
      image: "purse_picture.png",
      location: "Room 103",
      date: "2022-01-03",
      status: "Lost",
    },
    {
      id: 5,
      name: "Phone",
      description: "A white phone with a cracked screen",
      image: "phone_image.jpg",
      location: "Room 102",
      date: "2022-01-02",
      status: "Claimed",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-white">
          Lost & Found Items
        </h1>
        <p className="text-gray-400 text-lg">
          Browse through items that have been recently reported. Use the filters
          to narrow your search.
        </p>
      </div>

      <SearchBar />

      <div className="mt-4">
        <Gallery items={items} />
      </div>
    </div>
  );
}
