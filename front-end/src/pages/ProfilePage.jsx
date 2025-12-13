import ProfileGallery from "../components/ProfileGallery";
import ProfileCard from "../components/ProfileCard";
import { useAuth } from "../hooks/useAuth";
import { useItem } from "../hooks/useItem";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";

export default function ProfilePage() {
    const { user: authUser, getUserProfile } = useAuth();
    const { getAllItems } = useItem();
    const [displayedUser, setDisplayedUser] = useState(null);
    const [userItems, setUserItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchProfileData = async () => {
            setLoading(true);
            try {
                let targetUser = null;

                if (id) {
                    const res = await getUserProfile(id);
                    if (res && res.ok) targetUser = res.user;
                } else {
                    targetUser = authUser;
                }

                if (targetUser) {
                    setDisplayedUser(targetUser);

                    const data = await getAllItems();
                    const apiItems = Array.isArray(data) ? data : (data.data || []);

                    const myItems = apiItems
                        .filter(item => item.user && item.user.id === targetUser.id)
                        .map(item => ({
                            ...item,
                            name: item.title,
                            date: new Date(item.created_at || item.createdAt).toLocaleDateString(),
                            image: (item.images && item.images.length > 0) ? item.images[0].url : "https://via.placeholder.com/600x400?text=No+Image",
                            location: item.location ? (item.location.name || "Unknown") : "Unknown"
                        }));

                    setUserItems(myItems);

                }
            } catch (error) {
                console.error("Failed to fetch profile data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [id, authUser, getUserProfile, getAllItems]);

    if (loading) return <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white"><Loader2 className="animate-spin w-10 h-10" /></div>;

    // If no displayedUser found (and not loading), show error or prompt
    if (!displayedUser) return <div className="min-h-screen bg-[#0f172a] text-white flex justify-center items-center">
        {id ? "User not found" : "Please log in to view profile."}
    </div>;

    const profileUser = {
        name: displayedUser.name,
        email: displayedUser.email,
        phone: displayedUser.phone || "N/A",
        location: displayedUser.location || "N/A",
        memberSince: new Date(displayedUser.createdAt || new Date()).getFullYear(),
        bio: displayedUser.bio || "No bio available",
        items: userItems,
        student_id: displayedUser.student_id
    };

    return (
        <div className="w-full min-h-screen bg-[#0f172a] text-white flex justify-center p-4 md:p-10">
            <div className="w-full max-w-6xl flex flex-col md:flex-row gap-10">
                <div className="w-full md:w-1/2">
                    <ProfileCard user={profileUser} />
                </div>
                <div className="w-full md:w-3/4">
                    <ProfileGallery items={userItems} />
                </div>
            </div>
        </div>
    );
}
