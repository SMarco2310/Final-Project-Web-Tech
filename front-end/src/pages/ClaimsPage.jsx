import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Search, FileText, CheckCircle, XCircle, Clock, Loader2, Send, Inbox } from 'lucide-react';
import { useClaim } from '../hooks/useClaim';

export default function ClaimsPage() {
    const { getMyClaims, getReceivedClaims } = useClaim();
    const [sentClaims, setSentClaims] = useState([]);
    const [receivedClaims, setReceivedClaims] = useState([]);
    const [activeTab, setActiveTab] = useState('sent'); // 'sent' or 'received'
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchAllClaims = async () => {
            try {
                const [sent, received] = await Promise.all([
                    getMyClaims(),
                    getReceivedClaims()
                ]);
                setSentClaims(sent);
                setReceivedClaims(received);
            } catch (err) {
                console.error("Failed to fetch claims:", err);
                setError("Failed to load claims");
            } finally {
                setLoading(false);
            }
        };

        fetchAllClaims();
    }, [getMyClaims, getReceivedClaims]);

    const getStatusColor = (status) => {
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

    const currentList = activeTab === 'sent' ? sentClaims : receivedClaims;

    const filteredClaims = currentList.filter(claim =>
        claim.item?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        claim.reason?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (activeTab === 'received' && claim.claimer?.name?.toLowerCase().includes(searchTerm.toLowerCase()))
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
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h1 className="text-3xl font-bold text-white self-start md:self-auto">My Claims</h1>
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder={activeTab === 'sent' ? "Search sent claims..." : "Search received claims..."}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-gray-900 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 bg-gray-900 p-1 rounded-xl w-fit border border-white/10">
                <button
                    onClick={() => setActiveTab('sent')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'sent'
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                >
                    <Send size={16} />
                    Sent Claims
                    <span className="ml-1 bg-black/20 px-2 py-0.5 rounded-full text-xs">{sentClaims.length}</span>
                </button>
                <button
                    onClick={() => setActiveTab('received')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'received'
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                >
                    <Inbox size={16} />
                    Received Claims
                    <span className="ml-1 bg-black/20 px-2 py-0.5 rounded-full text-xs">{receivedClaims.length}</span>
                </button>
            </div>

            <div className="bg-gray-900 rounded-3xl border border-white/10 overflow-hidden flex-1">
                {filteredClaims.length > 0 ? (
                    <div className="divide-y divide-white/10">
                        {filteredClaims.map((claim) => {
                            const isReceived = activeTab === 'received';
                            const content = (
                                <>
                                    <div className="w-16 h-16 rounded-xl bg-gray-800 overflow-hidden shrink-0">
                                        <img
                                            src={(claim.item?.images && claim.item.images.length > 0) ? claim.item.images[0].url : "https://via.placeholder.com/150?text=No+Image"}
                                            alt={claim.item?.title || "Item"}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="font-semibold text-white truncate text-lg">
                                                {isReceived && <span className="text-gray-400 text-sm font-normal mr-2">Claim by {claim.claimer?.name}:</span>}
                                                {claim.item?.title || "Unknown Item"}
                                            </h3>
                                            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(claim.status)}`}>
                                                {getStatusIcon(claim.status)}
                                                {claim.status}
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-400 mb-1">
                                            {activeTab === 'sent'
                                                ? `Claimed on: ${new Date(claim.createdAt || claim.date).toLocaleDateString()}`
                                                : `Received on: ${new Date(claim.createdAt || claim.date).toLocaleDateString()}`
                                            }
                                        </p>
                                        <p className="text-sm text-gray-500 truncate">{claim.reason}</p>
                                    </div>
                                </>
                            );

                            return isReceived ? (
                                <Link
                                    to={`${claim.id}`}
                                    key={claim.id}
                                    className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors group"
                                >
                                    {content}
                                </Link>
                            ) : (
                                <div
                                    key={claim.id}
                                    className="flex items-center gap-4 p-4 opacity-75 cursor-default"
                                >
                                    {content}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                        <FileText size={48} className="mb-4 opacity-50" />
                        <p>No claims found in this category</p>
                    </div>
                )}
            </div>
        </div>
    );
}
