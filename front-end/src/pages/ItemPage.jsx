import { LucideFlag, LucideShare2, LucideShieldCheck, MapPin, Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useItem } from "../hooks/useItem";
import { useEffect, useState } from "react";

export default function ItemPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { getItemById } = useItem();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                if (!id) {
                    setError("No item ID provided");
                    setLoading(false);
                    return;
                }

                const data = await getItemById(id);
                if (data && data.data) {
                    setItem(data.data);
                } else {
                    setError("Item not found");
                }
            } catch (err) {
                console.error("Failed to fetch item:", err);
                setError("Failed to load item details");
            } finally {
                setLoading(false);
            }
        };

        fetchItem();
    }, [id, getItemById]);

    const statusColors = {
        Lost: "bg-red-600/40 text-red-100",
        Found: "bg-green-500/40 text-green-100",
        Claimed: "bg-amber-500/40 text-amber-100",
    };

    if (loading) return <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white"><Loader2 className="animate-spin w-10 h-10" /></div>;
    if (error || !item) return <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white text-xl">Item not found</div>;

    const displayImages = item.images && item.images.length > 0 ? item.images.map(img => img.url) : ["https://via.placeholder.com/600x400?text=No+Image"];
    const mainImage = displayImages[0];

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-300 p-4 md:p-8 flex justify-center font-sans">
            <div className="max-w-7xl w-full grid md:grid-rows-2 lg:grid-cols-3 gap-4 md:gap-8">

                <div className="lg:col-span-2 flex flex-col gap-4">
                    <div className="w-full aspect-4/3 bg-[#1e293b] rounded-2xl overflow-hidden shadow-lg">
                        <img
                            src={mainImage}
                            alt={item.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                    {displayImages.length > 1 && (
                        <div className="grid grid-cols-5 gap-4">
                            {displayImages.map((image, index) => (
                                <div key={index} className={`aspect-square rounded-xl overflow-hidden cursor-pointer opacity-80 hover:opacity-100 transition-all`}>
                                    <img
                                        src={image}
                                        className="w-full h-full object-cover"
                                        alt={`Thumbnail ${index + 1}`}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-4 md:gap-8 w-full">
                    <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg">
                        <h1 className="text-3xl font-bold text-white mb-3">{item.title}</h1>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium inline-block mb-4 ${statusColors[item.status] || "bg-gray-800 text-gray-300"}`}>
                            {item.status}
                        </span>
                        <p className="text-slate-400 leading-relaxed">
                            {item.description}
                        </p>
                    </div>

                    <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg">
                        <h2 className="text-xl font-bold text-white mb-4">Details</h2>
                        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                            <div>
                                <span className="block text-sm text-slate-500 mb-1">Category</span>
                                <span className="text-slate-200 font-medium">{item.category || "N/A"}</span>
                            </div>
                            <div>
                                <span className="block text-sm text-slate-500 mb-1">Date Created</span>
                                <span className="text-slate-200 font-medium">{new Date(item.created_at || item.createdAt).toLocaleDateString()}</span>
                            </div>
                            {/* Time is likely not separate in backend yet, so omitted or extracted from date */}
                        </div>
                    </div>

                    {/* Location: backend returns item.location object? or ID? Controller says leftJoinAndSelect location. */}
                    {/* Assuming item.location is an object with name or address */}
                    <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg">
                        <h2 className="text-xl font-bold text-white mb-4">Location</h2>
                        <div className="flex items-start gap-3 mb-4 text-slate-300">
                            <MapPin className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                            <span>{item.location ? (item.location || "Unknown Location") : "Location not available"}</span>
                        </div>
                        {/* Map placeholder for now */}
                        <div className="w-full h-48 bg-slate-700 rounded-xl overflow-hidden relative">
                            <img
                                src="https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/-73.9749,40.7648,13,0/600x300?access_token=pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJja2xsY3I4a20wMG1qMnB0ZzB6Z2R6Z2R6In0.example"
                                alt="Map Location"
                                className="w-full h-full object-cover opacity-80"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://via.placeholder.com/600x300/334155/94a3b8?text=Map+View";
                                }}
                            />
                        </div>
                    </div>

                    <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg">
                        <div
                            className="flex items-center gap-4 mb-6 cursor-pointer hover:bg-slate-700/50 p-2 rounded-xl transition-colors -mx-2"
                            onClick={() => navigate("/Profile/" + item.user?.id)}
                        >
                            {/* User might not have image yet, fallback */}
                            <img src={item.user?.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuBOtobM1j3ECr0pN0ZWg8LNDdi7YBTXWO8infmDL937kAZZXI4rQ8Mg2JiZrKVYjL81ci5lGrHICuH7AIXNU1t7kqae8eM1CKPdRee_38kFEA0WuPK5QXgN2WCb7H4kUG_r2Episs7h0D98YdIkSW1Z6wzZlPPGgSPIqSd5sS4SVBoPoG0dq-ngpzHBAf3PLciKAIREqR4pMXCCEIzFmNdEpgHVN9EGMhyRyqTBj4Sa8uYhXfK5JH_u49IFeR-0Q6Q6HZFu6vl5eAk"} alt={item.user?.name || "User"} className="w-12 h-12 rounded-full object-cover border-2 border-slate-600" />
                            <div>
                                <h3 className="text-white font-bold">{item.user?.name || "Anonymous"}</h3>
                                <span className="text-sm text-slate-500">Reported this item</span>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate("/Claim")}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors mb-4 shadow-lg shadow-blue-900/20"
                        >
                            <LucideShieldCheck className="w-5 h-5" />
                            Claim This Item
                        </button>

                        <div className="flex justify-center gap-6 text-slate-400 text-sm font-medium">
                            <button className="flex items-center gap-2 hover:text-white transition-colors">
                                <LucideShare2 className="w-4 h-4" />
                                Share
                            </button>
                            <button className="flex items-center gap-2 hover:text-red-400 transition-colors">
                                <LucideFlag className="w-4 h-4" />
                                Report Issue
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}