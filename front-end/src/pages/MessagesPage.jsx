import React from 'react';
import { Search, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MessagesPage() {
    // Mock Data for UI
    const chats = [
        {
            id: 1,
            partnerName: "Jane Doe",
            partnerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
            lastMessage: "Is the item still available?",
            time: "10:30 AM",
            unreadCount: 2,
            itemTitle: "Blue Backpack"
        },
        {
            id: 2,
            partnerName: "John Smith",
            partnerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
            lastMessage: "Great, I can meet you at the library.",
            time: "Yesterday",
            unreadCount: 0,
            itemTitle: "Calculus Textbook"
        },
        {
            id: 3,
            partnerName: "Sarah Wilson",
            partnerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
            lastMessage: "Thank you so much for finding it!",
            time: "2 days ago",
            unreadCount: 0,
            itemTitle: "Silver Keys"
        }
    ];

    return (
        <div className="max-w-4xl mx-auto h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">Messages</h1>
                <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search messages..."
                        className="w-full bg-gray-900 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div className="bg-gray-900 rounded-3xl border border-white/10 overflow-hidden flex-1">
                {chats.length > 0 ? (
                    <div className="divide-y divide-white/10">
                        {chats.map((chat) => (
                            <Link
                                key={chat.id}
                                to={`chat/${chat.id}`} // Assuming route structure, adjust as needed
                                className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors group"
                            >
                                <div className="w-12 h-12 rounded-full bg-gray-800 overflow-hidden shrink-0">
                                    <img src={chat.partnerAvatar} alt={chat.partnerName} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-semibold text-white truncate">{chat.partnerName}</h3>
                                        <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{chat.time}</span>
                                    </div>
                                    <p className="text-sm text-gray-400 truncate group-hover:text-gray-300">
                                        <span className="text-blue-400 font-medium mr-1">[{chat.itemTitle}]</span>
                                        {chat.lastMessage}
                                    </p>
                                </div>
                                {chat.unreadCount > 0 && (
                                    <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
                                        {chat.unreadCount}
                                    </div>
                                )}
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                        <MessageSquare size={48} className="mb-4 opacity-50" />
                        <p>No messages yet</p>
                    </div>
                )}
            </div>
        </div>
    );
}
