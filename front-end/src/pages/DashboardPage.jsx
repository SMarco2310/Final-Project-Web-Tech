import React, { useState } from 'react';
import { Search } from 'lucide-react';
import DashboardStats from '../components/DashboardStats';

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState('found');

    // Mock Data
    const itemsFound = [
        {
            id: 1,
            name: "Black Leather Wallet",
            image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=1000",
            status: "Validated"
        },
        {
            id: 2,
            name: "Set of Keys on a Blue Lanyard",
            image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=1000",
            status: "Returned"
        },
        {
            id: 3,
            name: "iPhone 13 in a clear case",
            image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&q=80&w=1000",
            status: "Pending"
        }
    ];

    const LostItems = [
        {
            id: 1,
            name: "Vintage Sunglasses",
            image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=1000",
            date: "2023-10-15",
            status: "Lost"
        },
        {
            id: 2,
            name: "Blue Water Bottle",
            image: "https://images.unsplash.com/photo-1602143407151-011141950038?auto=format&fit=crop&q=80&w=1000",
            date: "2023-11-02",
            status: "Lost"
        }
    ];

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

            <DashboardStats itemsFound={itemsFound} itemsClaimed={itemsClaimed} />
        </div>
    );
}
