import { Link } from "react-router-dom";

export default function ProfileItems({ item }) {
    const statusColors = {
        Lost: "bg-red-600/40 text-red-100",
        Found: "bg-green-500/40 text-green-100",
        Claimed: "bg-amber-500/40 text-amber-100",
    };

    return (

        <Link to={`/Item/${item.id}`} className="w-full h-auto py-4 flex justify-between md:border-b border-slate-700/50 hover:bg-slate-800/50 transition-colors rounded-xl px-4 cursor-pointer group">
            <div className="w-3/5 flex flex-col mt-2" >
                <div className="flex gap-2 align-middle items-center mb-2">
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 block md:hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{item.name}</h2>
                        <span className="text-slate-400 text-sm">Reported on {item.date}</span>
                    </div>
                </div>

            </div>
            <div className="flex items-center gap-4">
                <span
                    className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md w-fit h-fit ${statusColors[item.status] || "bg-gray-500/20 text-gray-300"
                        }`}
                >
                    {item.status}
                </span>
                <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 hidden md:block">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
            </div>
        </Link>
    );
}