import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Calendar,
    MapPin,
    Tag,
    Loader2,
    CheckCircle,
    XCircle,
    MessageSquare,
    User,
    Mail,
    Send
} from "lucide-react";
import { useClaim } from "../hooks/useClaim";
import { useAuth } from "../hooks/useAuth";

export default function ClaimDetailsPage() {
    const { claimId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    // We need a way to get a single claim. 
    // If getClaimById is not available in useClaim, we might need to rely on getMyClaims or implement it.
    // For now, assuming we might need to fetch it or filter from a list if getClaimById doesn't exist.
    // Let's assume we need to implement getClaimById in useClaim or fetch it directly here for now to move fast,
    // but checking useClaim first would be better. For this step, I'll assume standard fetch pattern or use existing hooks if possible.
    // Re-checking useClaim showing it usually has getMyClaims. I will implement a direct fetch here for specific claim if needed or expand Hook later.
    // Actually, let's implement the UI and use a placeholder fetch for now, then refine.

    const [claim, setClaim] = useState(null);
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null); // Unused for now

    // Mock data for development if API fails or for initial UI build
    const [mockComments, setMockComments] = useState([
        { id: 1, user: "Alex Johnson", text: "I checked the Lost & Found database. No other MacBook Pro claims match this serial number.", time: "Today 10:25 AM", avatar: "AJ" },
        { id: 2, user: "Sarah Jenkins", text: "Note: Claimant has a student ID that matches the name provided.", time: "Yesterday 4:15 PM", avatar: "SJ" }
    ]);
    const [newComment, setNewComment] = useState("");

    // Status colors
    const getStatusColor = (status) => {
        const s = status?.toLowerCase();
        if (s === 'approved') return 'bg-green-500/20 text-green-400 border-green-500/30';
        if (s === 'rejected') return 'bg-red-500/20 text-red-400 border-red-500/30';
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    };

    useEffect(() => {
        // Ideally this should be in useClaim, simulating fetch for now
        const fetchClaimDetails = async () => {
            // TODO: Replace with actual API call: await getClaimById(claimId);
            // For now, we will simulate or try to find a way to get it. 
            // Since I don't want to break the flow, I'll mock the data structure based on the image provided
            // and what I know of the backend models.

            // Real implementation would look like:
            /*
            try {
              const response = await fetch(`${import.meta.env.VITE_API_URL}/claims/${claimId}`, {
                 headers: { Authorization: `Bearer ${token}` }
              });
              const data = await response.json();
              setClaim(data);
            } catch (e) console.error(e);
            */

            // MOCK DATA TO MATCH UI REQUEST
            setTimeout(() => {
                setClaim({
                    id: claimId,
                    status: "Pending",
                    item: {
                        title: "MacBook Pro 14\"",
                        category: "Electronics",
                        date: "2024-07-20",
                        location: "Central Library, 2nd Floor",
                        description: "Space Gray model with a small dent on the top-left corner. Has a sticker of a mountain range on the lid.",
                        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1026&q=80"
                    },
                    claimer: {
                        name: "Olivia Chen",
                        email: "o.chen@university.edu",
                        avatar: "OC"
                    },
                    createdAt: "2024-07-21",
                    reason: "This is my laptop, I use it for my university studies. The dent happened when I accidentally dropped it last month. The mountain sticker is from my trip to Yosemite. The serial number is C02G8R4JJH8D, which I have on the original box. I can also unlock it with my fingerprint to prove it's mine."
                });
                setLoading(false);
            }, 500);
        };

        fetchClaimDetails();
    }, [claimId]);

    const handleStatusUpdate = (newStatus) => {
        // TODO: Implement actual API call
        setClaim(prev => ({ ...prev, status: newStatus }));
    };

    if (loading) return <div className="flex justify-center items-center h-full"><Loader2 className="animate-spin text-white" /></div>;
    if (!claim) return <div className="text-white text-center mt-10">Claim not found</div>;

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-3">
                        <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                            <ArrowLeft className="text-gray-400" size={24} />
                        </button>
                        <h1 className="text-3xl font-bold text-white">Claim #{claim.id}</h1>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(claim.status)}`}>
                            {claim.status}
                        </span>
                    </div>
                    <p className="text-gray-400 ml-12">Details for {claim.item.title} claim</p>
                </div>

                <div className="flex gap-3 ml-12 md:ml-0">
                    <button
                        onClick={() => handleStatusUpdate('Rejected')}
                        className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                    >
                        Reject Claim
                    </button>
                    <button
                        onClick={() => handleStatusUpdate('Approved')}
                        className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                    >
                        Approve Claim
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                    {/* Lost Item Details */}
                    <div className="bg-[#1e293b]/50 backdrop-blur-md border border-gray-700 rounded-3xl p-6">
                        <h2 className="text-xl font-bold text-white mb-6">Lost Item Details</h2>
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="w-full md:w-1/3 aspect-square rounded-2xl overflow-hidden bg-gray-800">
                                <img src={claim.item.image} alt={claim.item.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="w-full md:w-2/3 space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Item Name</p>
                                        <p className="text-white font-medium">{claim.item.title}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Category</p>
                                        <p className="text-white font-medium">{claim.item.category}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Date Lost</p>
                                        <p className="text-white font-medium">{claim.item.date}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Location Lost</p>
                                        <p className="text-white font-medium">{claim.item.location}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Description</p>
                                    <p className="text-gray-300 leading-relaxed text-sm">{claim.item.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Claimant's Justification */}
                    <div className="bg-[#1e293b]/50 backdrop-blur-md border border-gray-700 rounded-3xl p-6">
                        <h2 className="text-xl font-bold text-white mb-6">Claimant's Justification</h2>
                        <div className="pl-4 border-l-4 border-blue-500">
                            <p className="text-gray-300 italic leading-relaxed">"{claim.reason}"</p>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Claimant Information */}
                    <div className="bg-[#1e293b]/50 backdrop-blur-md border border-gray-700 rounded-3xl p-6">
                        <h2 className="text-xl font-bold text-white mb-6">Claimant Information</h2>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                                    {claim.claimer.avatar}
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-0.5">Name</p>
                                    <p className="text-white font-medium">{claim.claimer.name}</p>
                                </div>
                            </div>

                            <div className="pt-2">
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Contact Email</p>
                                <a href={`mailto:${claim.claimer.email}`} className="text-blue-400 hover:text-blue-300 transition-colors">
                                    {claim.claimer.email}
                                </a>
                            </div>

                            <div className="pt-2">
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Date of Claim</p>
                                <p className="text-white font-medium">{claim.createdAt}</p>
                            </div>
                        </div>
                    </div>

                    {/* Admin Comments (Mocked) */}
                    <div className="bg-[#1e293b]/50 backdrop-blur-md border border-gray-700 rounded-3xl p-6">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-2">
                                <MessageSquare size={20} className="text-gray-400" />
                                <h2 className="text-xl font-bold text-white">Admin Comments</h2>
                            </div>
                            <span className="text-gray-500 text-sm font-medium">{mockComments.length}</span>
                        </div>

                        <div className="space-y-6 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                            {mockComments.map(comment => (
                                <div key={comment.id} className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs text-white font-bold shrink-0">
                                        {comment.avatar}
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex justify-between items-baseline">
                                            <span className="text-white font-medium text-sm">{comment.user}</span>
                                            <span className="text-gray-500 text-xs">{comment.time}</span>
                                        </div>
                                        <p className="text-gray-400 text-sm leading-relaxed">{comment.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="relative">
                            <input
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Add a note, observation..."
                                className="w-full bg-gray-700/50 border border-gray-600 rounded-xl py-3 pl-4 pr-12 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                            />
                            <button
                                disabled={!newComment.trim()}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-400 hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
