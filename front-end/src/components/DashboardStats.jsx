import React from 'react';

export default function DashboardStats({ itemsFound, itemsClaimed }) {
    return (
        <div className="space-y-8">
            {/* Items Found Section */}
            <div>
                <h2 className="text-lg font-semibold text-white mb-4">Items Found ({itemsFound.length})</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {itemsFound.map((item) => (
                        <div key={item.id} className="bg-gray-900 rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-colors group">
                            <div className="aspect-video w-full bg-gray-800 relative overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-white mb-1">{item.name}</h3>
                                <div className="flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${item.status === 'Validated' ? 'bg-green-500' :
                                            item.status === 'Returned' ? 'bg-blue-500' :
                                                'bg-yellow-500'
                                        }`} />
                                    <span className={`text-sm ${item.status === 'Validated' ? 'text-green-500' :
                                            item.status === 'Returned' ? 'text-blue-500' :
                                                'text-yellow-500'
                                        }`}>{item.status}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Items Claimed Section */}
            <div>
                <h2 className="text-lg font-semibold text-white mb-4">Items Claimed ({itemsClaimed.length})</h2>
                <div className="space-y-4">
                    {itemsClaimed.map((item) => (
                        <div key={item.id} className="bg-gray-900 rounded-2xl p-4 border border-white/10 flex items-center gap-4">
                            <div className="w-16 h-16 rounded-xl bg-gray-800 overflow-hidden shrink-0">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-white">{item.name}</h3>
                                <p className="text-sm text-gray-400">Claimed on: {item.date}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${item.status === 'Returned' ? 'bg-blue-500' : 'bg-green-500'
                                    }`} />
                                <span className={`text-sm ${item.status === 'Returned' ? 'text-blue-500' : 'text-green-500'
                                    }`}>{item.status}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
