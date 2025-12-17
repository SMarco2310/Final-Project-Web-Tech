import React, { useState, useEffect } from 'react';
import { Search, FileText, CheckCircle, XCircle, Clock, Loader2 } from 'lucide-react';
import { useClaim } from '../hooks/useClaim';

export default function ClaimsPage() {
    const { getMyClaims } = useClaim();
    const [claims, setClaims] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchClaims = async () => {
            try {
                const data = await getMyClaims();
                setClaims(data);
            } catch (err) {
                console.error("Failed to fetch claims:", err);
                setError("Failed to load claims");
            } finally {
                setLoading(false);
            }
        };

        fetchClaims();
    }, [getMyClaims]);

    const getStatusColor = (status) => {
        // Normalize status to match backend (usually Title Case or UPPERCASE, adjusting just in case)
        const s = status?.toLowerCase();
        if (s === 'approved') return 'text-green-400 bg-green-400/10 border-green-400/20';
        if (s === 'rejected') return 'text-red-400 bg-red-400/10 border-red-400/20';
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
    };

    const getStatusIcon = (status) => {
        const s = status?.toLowerCase();
        if (s === 'approved') return <CheckCircle size={16} />;
        if (s === 'rejected') return <XCircle size={16} />;
        return <Clock size={16} />;
    };

    const filteredClaims = claims.filter(claim =>
        claim.item?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        claim.reason?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loader2 className="animate-spin w-10 h-10 text-white" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-full text-red-400">
                {error}
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">My Claims</h1>
                <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search claims..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-gray-900 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div className="bg-gray-900 rounded-3xl border border-white/10 overflow-hidden flex-1">
                {filteredClaims.length > 0 ? (
                    <div className="divide-y divide-white/10">
                        {filteredClaims.map((claim) => (
                            <Link
                                to={`${claim.id}`}
                                key={claim.id}
                                className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors group"
                            >
                                <div className="w-16 h-16 rounded-xl bg-gray-800 overflow-hidden shrink-0">
                                    <img
                                        src={(claim.item?.images && claim.item.images.length > 0) ? claim.item.images[0].url : "https://via.placeholder.com/150?text=No+Image"}
                                        alt={claim.item?.title || "Item"}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-semibold text-white truncate text-lg">{claim.item?.title || "Unknown Item"}</h3>
                                        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(claim.status)}`}>
                                            {getStatusIcon(claim.status)}
                                            {claim.status}
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-400 mb-1">Claimed on: {new Date(claim.createdAt || claim.date).toLocaleDateString()}</p>
                                    <p className="text-sm text-gray-500 truncate">{claim.reason}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                        <FileText size={48} className="mb-4 opacity-50" />
                        <p>No claims found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
