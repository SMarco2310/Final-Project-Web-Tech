import { MapPin, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

export default function ItemCard({ item }) {
  const statusColors = {
    Lost: "bg-red-600/40 text-red-100",
    Found: "bg-green-500/40 text-green-100",
    Claimed: "bg-amber-500/40 text-amber-100",
  };


  return (
    <Link to="/Item" className="w-full md:max-w-[400px] xl:max-w-[550px]">
      <div className="bg-[#0f172a] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col h-full max-h-[400px] transform hover:-translate-y-1 w-full">
        <div className="relative h-64 overflow-hidden">
          <span
            className={`absolute top-4 right-4 px-4 py-1.5 rounded-full text-sm font-bold backdrop-blur-md z-20 ${statusColors[item.status] || "bg-gray-500/20 text-gray-300"
              }`}
          >
            {item.status}
          </span>
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-110"
          />
        </div>

        <div className="p-6 flex flex-col flex-1">
          <h2 className="text-2xl font-bold mb-2 text-white line-clamp-1">{item.name}</h2>
          <p className="text-slate-400 text-base mb-6 line-clamp-2 flex-1 leading-relaxed">
            {item.description}
          </p>

          <div className="flex items-center mt-auto pt-4  border-slate-700/50 text-sm text-slate-400">
            <div className="flex items-center truncate">
              <MapPin className="w-4 h-4 mr-2 text-slate-500 shrink-0" />
              <span className="truncate font-medium">{item.location}</span>
            </div>
            <span className="mx-3 text-slate-600">|</span>
            <div className="flex items-center shrink-0">
              <Calendar className="w-4 h-4 mr-2 text-slate-500 shrink-0" />
              <span className="font-medium">{item.date}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
