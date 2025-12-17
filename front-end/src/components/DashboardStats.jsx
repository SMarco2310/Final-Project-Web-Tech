export default function DashboardStats({ itemsFound, itemsLost }) {
    const statusColors = {
        "Lost": "bg-red-600/40 text-red-100",
        "Found": "bg-green-500/40 text-green-100",
        "Claimed": "bg-amber-500/40 text-amber-100",
        "Approved": "bg-green-600/40 text-green-100",
        "Rejected": "bg-red-600/40 text-red-100",
        "Pending": "bg-amber-500/40 text-amber-100"
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-lg font-semibold text-white mb-4">Items Found ({itemsFound.length})</h2>
                <div className="space-y-4">
                    {itemsFound.map((item) => (
                        <div key={item.id} className="bg-gray-900 rounded-2xl p-4 border border-white/10 flex items-center gap-4 relative">
                            <div className="w-16 h-16 rounded-xl bg-gray-800 overflow-hidden shrink-0">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-white">{item.name}</h3>
                                {item.date && <p className="text-sm text-gray-400">Found on: {item.date}</p>}
                            </div>
                            <div className="flex items-center gap-2">
                                <span
                                    className={`px-4 py-1.5 rounded-full text-sm font-bold backdrop-blur-md ${statusColors[item.status] || "bg-gray-500/20 text-gray-300"
                                        }`}
                                >
                                    {item.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-lg font-semibold text-white mb-4">Items Lost ({itemsLost.length})</h2>
                <div className="space-y-4">
                    {itemsLost.map((item) => (
                        <div key={item.id} className="bg-gray-900 rounded-2xl p-4 border border-white/10 flex items-center gap-4 relative">
                            <div className="w-16 h-16 rounded-xl bg-gray-800 overflow-hidden shrink-0">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-white">{item.name}</h3>
                                <p className="text-sm text-gray-400">Lost on: {item.date}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span
                                    className={`px-4 py-1.5 rounded-full text-sm font-bold backdrop-blur-md ${statusColors[item.status] || "bg-gray-500/20 text-gray-300"
                                        }`}
                                >
                                    {item.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
