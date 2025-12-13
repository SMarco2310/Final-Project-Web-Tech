import React, { useState, useEffect } from 'react';
import { Search, MessageSquare, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useChat } from '../hooks/useChat';
import { useAuth } from '../hooks/useAuth';

export default function MessagesPage() {
    const { getUserChats } = useChat();
    const { user } = useAuth();
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const data = await getUserChats();
                // Process chats to format for UI if necessary
                const formattedChats = data.map(chat => {
                    // Determine partner based on current user
                    const isUser1 = chat.user1?.id === user?.id;
                    const partner = isUser1 ? chat.user2 : chat.user1;

                    // Find last message info
                    const lastMsg = chat.messages && chat.messages.length > 0
                        ? chat.messages[chat.messages.length - 1]
                        : null;

                    return {
                        id: chat.id,
                        partnerName: partner?.name || "Unknown User",
                        partnerAvatar: partner?.avatar || `https://ui-avatars.com/api/?name=${partner?.name || 'User'}&background=random`,
                        lastMessage: lastMsg ? lastMsg.content : "No messages yet",
                        time: lastMsg ? new Date(lastMsg.createdAt).toLocaleDateString() : "",
                        unreadCount: 0, // Logic for unread count would require more backend support or frontend calc
                        itemTitle: chat.item?.title || "Item",
                        updatedAt: chat.updatedAt
                    };
                });

                // Sort by updated at
                formattedChats.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

                setChats(formattedChats);
            } catch (err) {
                console.error("Failed to fetch chats:", err);
                setError("Failed to load messages");
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchChats();
        }
    }, [getUserChats, user]);

    const filteredChats = chats.filter(chat =>
        chat.partnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.itemTitle.toLowerCase().includes(searchTerm.toLowerCase())
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
                <h1 className="text-3xl font-bold text-white">Messages</h1>
                <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search messages..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-gray-900 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div className="bg-gray-900 rounded-3xl border border-white/10 overflow-hidden flex-1">
                {filteredChats.length > 0 ? (
                    <div className="divide-y divide-white/10">
                        {filteredChats.map((chat) => (
                            <Link
                                key={chat.id}
                                to={`/dashboard/${user.id}/chat/${chat.id}`}
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
