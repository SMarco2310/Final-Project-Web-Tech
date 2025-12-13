import React, { useState, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';
import DashboardStats from '../components/DashboardStats';
import { useAuth } from '../hooks/useAuth';
import { useItem } from '../hooks/useItem';

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState('found');
    const { user } = useAuth();
    const { getMyItems } = useItem();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserItems = async () => {
            if (!user) return;

            try {
                const data = await getMyItems(user.id);
                const apiItems = Array.isArray(data) ? data : (data.data || []);

                // Map items to match component expected structure
                const myItems = apiItems.map(item => ({
                    ...item,
                    name: item.title,
                    date: new Date(item.created_at || item.createdAt).toLocaleDateString(),
                    image: (item.images && item.images.length > 0) ? item.images[0].url : "https://via.placeholder.com/600x400?text=No+Image",
                }));

                setItems(myItems);
            } catch (error) {
                console.error("Failed to fetch dashboard items", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchUserItems();
        }
    }, [getMyItems, user]);

    // Categorize items
    // Note: Adjust status checks based on actual backend values (Lost, Found, Claimed)
    const itemsFound = items.filter(item => item.status === 'Found' || item.status === 'Validated' || item.status === 'Returned');
    const itemsLost = items.filter(item => item.status === 'Lost');
    const itemsClaimed = items.filter(item => item.status === 'Claimed');

    if (loading) return <div className="min-h-screen bg-[#0f172a] text-white flex justify-center items-center"><Loader2 className="animate-spin" /></div>;
    if (!user) return <div className="text-white text-center mt-10">Please log in to view dashboard.</div>;

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search items..."
                        className="w-full bg-gray-900 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div className="flex gap-6 mb-8 border-b border-white/10">
                <button
                    onClick={() => setActiveTab('found')}
                    className={`pb-4 text-sm font-medium transition-colors relative ${activeTab === 'found' ? 'text-blue-500' : 'text-gray-400 hover:text-white'
                        }`}
                >
                    Items Found
                    {activeTab === 'found' && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-t-full" />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('claimed')}
                    className={`pb-4 text-sm font-medium transition-colors relative ${activeTab === 'claimed' ? 'text-blue-500' : 'text-gray-400 hover:text-white'
                        }`}
                >
                    Items Claimed
                    {activeTab === 'claimed' && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-t-full" />
                    )}
                </button>
            </div>

            <DashboardStats itemsFound={itemsFound} itemsClaimed={itemsClaimed} itemsLost={itemsLost} />
        </div>
    );
}
