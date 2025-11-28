import { MapPin, Calendar } from "lucide-react";

export default function ItemCard({ item }) {
  const statusColors = {
    Lost: "bg-red-500/50 text-red-100",
    Found: "bg-green-500/50 text-green-100",
    Claimed: "bg-amber-500/50 text-amber-100",
  };

  return (
    <div className="bg-[#1e293b] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <span
          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${statusColors[item.status] || "bg-gray-500/20 text-gray-300"
            }`}
        >
          {item.status}
        </span>
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h2 className="text-xl font-bold mb-2 text-white line-clamp-1">{item.name}</h2>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-1">{item.description}</p>

        <div className="flex items-center mt-auto pt-4 border-t border-gray-700/30 text-xs text-gray-400">
          <div className="flex items-center truncate">
            <MapPin className="w-4 h-4 mr-1 text-blue-400 shrink-0" />
            <span className="truncate">{item.location}</span>
          </div>
          <span className="mx-2 text-gray-600">|</span>
          <div className="flex items-center shrink-0">
            <Calendar className="w-4 h-4 mr-1 text-blue-400 shrink-0" />
            <span>{item.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
