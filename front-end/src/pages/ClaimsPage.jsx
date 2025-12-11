import React from 'react';
import { Search, FileText, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function ClaimsPage() {
    // Mock Data for UI
    const claims = [
        {
            id: 1,
            itemTitle: "MacBook Pro 14\"",
            itemImage: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&q=80&w=1000",
            status: "Pending",
            date: "2023-11-10",
            description: "I lost it in the library study room 3B. It has a sticker of a cat on the lid."
        },
        {
            id: 2,
            itemTitle: "Blue Hydro Flask",
            itemImage: "https://images.unsplash.com/photo-1602143407151-011141950038?auto=format&fit=crop&q=80&w=1000",
            status: "Approved",
            date: "2023-11-05",
            description: "Left it at the gym near the treadmills."
        },
        {
            id: 3,
            itemTitle: "Car Keys (Toyota)",
            itemImage: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=1000",
            status: "Rejected",
            date: "2023-10-28",
            description: "Black fob with a red keychain."
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved': return 'text-green-400 bg-green-400/10 border-green-400/20';
            case 'Rejected': return 'text-red-400 bg-red-400/10 border-red-400/20';
            default: return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Approved': return <CheckCircle size={16} />;
            case 'Rejected': return <XCircle size={16} />;
            default: return <Clock size={16} />;
        }
    };

    return (
        <div className="max-w-4xl mx-auto h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">My Claims</h1>
                <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search claims..."
                        className="w-full bg-gray-900 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div className="bg-gray-900 rounded-3xl border border-white/10 overflow-hidden flex-1">
                {claims.length > 0 ? (
                    <div className="divide-y divide-white/10">
                        {claims.map((claim) => (
                            <div
                                key={claim.id}
                                className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors group"
                            >
                                <div className="w-16 h-16 rounded-xl bg-gray-800 overflow-hidden shrink-0">
                                    <img src={claim.itemImage} alt={claim.itemTitle} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-semibold text-white truncate text-lg">{claim.itemTitle}</h3>
                                        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(claim.status)}`}>
                                            {getStatusIcon(claim.status)}
                                            {claim.status}
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-400 mb-1">Claimed on: {claim.date}</p>
                                    <p className="text-sm text-gray-500 truncate">{claim.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                        <FileText size={48} className="mb-4 opacity-50" />
                        <p>No claims yet</p>
                    </div>
                )}
            </div>
        </div>
    );
}
