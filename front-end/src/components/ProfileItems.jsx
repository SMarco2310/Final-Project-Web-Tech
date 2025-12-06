export default function ProfileItems({ item }) {
    const statusColors = {
        Lost: "bg-red-900/50 text-red-200",
        Found: "bg-yellow-900/50 text-yellow-200",
        Reunited: "bg-green-900/50 text-green-200",
        Claimed: "bg-green-900/50 text-green-200",
    };

    return (
        <div className="w-full p-6 flex flex-row justify-between items-center border-b border-slate-700/50 last:border-b-0 gap-6">
            <div className="flex flex-col gap-3 flex-1">
                <div className="flex items-center gap-3">
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[item.status] || "bg-gray-800 text-gray-300"}`}
                    >
                        {item.status}
                    </span>
                    <span className="text-slate-400 text-sm">Reported on {item.date}</span>
                </div>

                <div>
                    <h2 className="text-xl font-bold mb-1">{item.name}</h2>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                </div>

                <button className="w-fit px-6 py-2 mt-2 bg-[#1e293b] hover:bg-[#334155] text-white text-sm font-semibold rounded-xl border border-slate-700 transition-colors">
                    View Details
                </button>
            </div>

            <div className="w-40 shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-28 object-cover rounded-xl" />
            </div>
        </div>
    );
}