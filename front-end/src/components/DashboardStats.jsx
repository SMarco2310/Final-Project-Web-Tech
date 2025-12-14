export default function DashboardStats({ itemsFound, itemsLost }) {
    const statusColors = {
        "Lost": "bg-red-500/20 text-red-500",
        "Found": "bg-green-500/20 text-green-500",
        "Claimed": "bg-yellow-500/20 text-yellow-500",
        "Validated": "bg-blue-500/20 text-blue-500",
        "Returned": "bg-purple-500/20 text-purple-500"
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
                        <div key={item.id} className="bg-gray-900 rounded-2xl p-4 border border-white/10 flex items-center gap-4">
                            <div className="w-16 h-16 rounded-xl bg-gray-800 overflow-hidden shrink-0">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-white">{item.name}</h3>
                                <p className="text-sm text-gray-400">Lost on: {item.date}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span
                                    className={`absolute top-4 right-4 px-4 py-1.5 rounded-full text-sm font-bold backdrop-blur-md z-20 ${statusColors[item.status] || "bg-gray-500/20 text-gray-300"
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
