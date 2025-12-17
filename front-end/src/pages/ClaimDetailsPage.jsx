import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Loader2,
    AlertCircle
} from "lucide-react";
import { useClaim } from "../hooks/useClaim";
import { useAuth } from "../hooks/useAuth";

export default function ClaimDetailsPage() {
    const { claimId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { getClaimById, updateClaimStatus } = useClaim();

    const [claim, setClaim] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);

    // Status colors
    // Status colors
    const statusColors = {
        "Lost": "bg-red-600/40 text-red-100",
        "Found": "bg-green-500/40 text-green-100",
        "Claimed": "bg-amber-500/40 text-amber-100",
        "Validated": "bg-blue-500/40 text-blue-100",
        "Returned": "bg-purple-500/40 text-purple-100",
        "Approved": "bg-green-600/40 text-green-100",
        "Rejected": "bg-red-600/40 text-red-100",
        "Pending": "bg-amber-500/40 text-amber-100"
    };

    const getStatusColor = (status) => {
        const s = status ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase() : "";
        return statusColors[s] || statusColors[status] || 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    };

    useEffect(() => {
        const fetchClaimDetails = async () => {
            try {
                const data = await getClaimById(claimId);
                setClaim(data);
            } catch (err) {
                console.error("Error fetching claim:", err);

                // Handle Unauthorized access specifically
                if (err.message && err.message.toLowerCase().includes('unauthorized')) {
                    setError("You are not authorized to view this claim.");
                    // Optional: Redirect after a delay? 
                    // For now, let's show the error state which is cleaner than an abrupt redirect.
                } else if (err.message && err.message.toLowerCase().includes('not found')) {
                    setError("Claim not found.");
                } else {
                    setError("Failed to load claim details.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchClaimDetails();
    }, [claimId, getClaimById]);

    const handleStatusUpdate = async (newStatus) => {
        setActionLoading(true);
        try {
            const updatedClaim = await updateClaimStatus(claimId, newStatus);
            setClaim(updatedClaim);
        } catch (err) {
            console.error("Failed to update status:", err);
            alert("Failed to update status. Please try again.");
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) return <div className="flex justify-center items-center h-full"><Loader2 className="animate-spin text-white" /></div>;

    if (error) return (
        <div className="flex flex-col justify-center items-center h-full text-white space-y-4">
            <AlertCircle size={48} className="text-red-400" />
            <p className="text-xl font-medium">{error}</p>
            <button onClick={() => navigate(-1)} className="text-blue-400 hover:text-blue-300">Go Back</button>
        </div>
    );

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
                    <p className="text-gray-400 ml-12">Details for {claim.item?.title} claim</p>
                </div>

                <div className="flex gap-3 ml-12 md:ml-0">
                    <button
                        onClick={() => handleStatusUpdate('Rejected')}
                        disabled={actionLoading || claim.status === 'Rejected'}
                        className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {actionLoading ? 'Updating...' : 'Reject Claim'}
                    </button>
                    <button
                        onClick={() => handleStatusUpdate('Approved')}
                        disabled={actionLoading || claim.status === 'Approved'}
                        className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {actionLoading ? 'Updating...' : 'Approve Claim'}
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
                                <img
                                    src={claim.item?.images && claim.item.images.length > 0 ? claim.item.images[0].url : "https://via.placeholder.com/300?text=No+Image"}
                                    alt={claim.item?.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="w-full md:w-2/3 space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Item Name</p>
                                        <p className="text-white font-medium">{claim.item?.title || "N/A"}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Category</p>
                                        <p className="text-white font-medium">{claim.item?.category || "N/A"}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Date Lost</p>
                                        <p className="text-white font-medium">{claim.item?.date || new Date(claim.item?.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Location Lost</p>
                                        <p className="text-white font-medium">{claim.item?.location || "N/A"}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Description</p>
                                    <p className="text-gray-300 leading-relaxed text-sm">{claim.item?.description || "No description provided."}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Claimant's Justification */}
                    <div className="bg-[#1e293b]/50 backdrop-blur-md border border-gray-700 rounded-3xl p-6">
                        <h2 className="text-xl font-bold text-white mb-6">Claimant's Justification</h2>
                        <div className="pl-4 border-l-4 border-blue-500">
                            <p className="text-gray-300 italic leading-relaxed">"{claim.reason || "No justification provided."}"</p>
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
                                    {claim.claimer?.name ? claim.claimer.name.charAt(0).toUpperCase() : "U"}
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-0.5">Name</p>
                                    <p className="text-white font-medium">{claim.claimer?.name || "Anonymous"}</p>
                                </div>
                            </div>

                            <div className="pt-2">
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Contact Email</p>
                                <a href={`mailto:${claim.claimer?.email}`} className="text-blue-400 hover:text-blue-300 transition-colors">
                                    {claim.claimer?.email || "N/A"}
                                </a>
                            </div>

                            <div className="pt-2">
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Date of Claim</p>
                                <p className="text-white font-medium">{new Date(claim.createdAt).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
