import SearchBar from "../components/SearchAndFilterBar.jsx";
import Gallery from "../components/Gallery.jsx";
import { useState, useMemo, useEffect } from "react";
import { useItem } from "../hooks/useItem";
import { Loader2 } from "lucide-react";

export default function GalleryPage() {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");
  const { getAllItems } = useItem();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getAllItems();
        // Check if data is array or wrapped
        const apiItems = Array.isArray(data) ? data : (data.data || []);

        // Map backend fields to frontend expectations for ItemCard
        const mappedItems = apiItems.map(item => ({
          ...item,
          category: item.category|| "others",
          name: item.title, // Backend uses title, frontend uses name
          date: new Date(item.created_at || item.createdAt).toLocaleDateString(),
          image: (item.images && item.images.length > 0) ? item.images[0].url : "https://via.placeholder.com/600x400?text=No+Image",
          location: item.location ? (item.location || "Unknown") : "Unknown"
        }));
        setItems(mappedItems);
      } catch (error) {
        console.error("Failed to fetch items", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [getAllItems]);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchKeyword = (item.name || "").toLowerCase().includes(keyword.toLowerCase()) ||
        (item.description || "").toLowerCase().includes(keyword.toLowerCase());
      const matchCategory = category ? item.category.toLowerCase() === category.toLowerCase() : true;
      const matchStatus = status ? item.status.toLowerCase() === status.toLowerCase() : true;
      const matchLocation = location ? (item.location || "").toLowerCase().includes(location.toLowerCase()) : true;

      return matchKeyword && matchCategory && matchStatus && matchLocation;
    });
  }, [items, keyword, category, status, location]);

  if (loading) return <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white"><Loader2 className="animate-spin w-10 h-10" /></div>;

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
