import ProfileGallery from "../components/ProfileGallery";
import ProfileCard from "../components/ProfileCard";
import { useAuth } from "../hooks/useAuth";
import { useItem } from "../hooks/useItem";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
    const { user } = useAuth();
    const { getAllItems } = useItem();
    const [userItems, setUserItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserItems = async () => {
            if (!user) return; // Wait for user to be loaded

            try {
                // Ideally backend has getItemsByUser endpoint. For now filtering all items.
                const data = await getAllItems();
                const apiItems = Array.isArray(data) ? data : (data.data || []);

                const myItems = apiItems
                    .filter(item => item.user && item.user.id === user.id)
                    .map(item => ({
                        ...item,
                        name: item.title,
                        date: new Date(item.created_at || item.createdAt).toLocaleDateString(),
                        image: (item.images && item.images.length > 0) ? item.images[0].url : "https://via.placeholder.com/600x400?text=No+Image",
                        location: item.location ? (item.location.name || "Unknown") : "Unknown"
                    }));

                setUserItems(myItems);
            } catch (error) {
                console.error("Failed to fetch user items", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchUserItems();
        } else {
            // If user null for long time, might want to handle differently, but useAuth usually initializes
        }
    }, [getAllItems, user]);

    if (!user) return <div className="min-h-screen bg-[#0f172a] text-white flex justify-center items-center">Please log in to view profile.</div>;
    // Loading state for items only, show profile immediately? Or wait? 
    // Let's show profile and loading spinner for items if needed or just empty list initial

    // Construct user object for ProfileCard if it expects specific shape
    const profileUser = {
        name: user.name,
        email: user.email,
        phone: user.phone || "N/A",
        location: user.location || "N/A", // user entity might not have location mapped in auth response yet
        memberSince: new Date().getFullYear(), // Placeholder or from DB
        items: userItems
    };

    return (
        <div className="w-full min-h-screen bg-[#0f172a] text-white flex justify-center p-4 md:p-10">
            <div className="w-full max-w-6xl flex flex-col md:flex-row gap-10">
                <div className="w-full md:w-1/2">
                    <ProfileCard user={profileUser} />
                </div>
                <div className="w-full md:w-3/4">
                    {loading ? (
                        <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>
                    ) : (
                        <ProfileGallery items={userItems} />
                    )}
                </div>
            </div>
        </div>
    );
}
