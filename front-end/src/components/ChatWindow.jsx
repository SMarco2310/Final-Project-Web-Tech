import React, { useRef, useEffect, useState } from 'react';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import { ArrowLeft, Tag, X, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useItem } from '../hooks/useItem';

export default function ChatWindow({ messages, onSendMessage, chatPartner, itemTitle }) {
    const messagesEndRef = useRef(null);
    const { getMyItems } = useItem();
    const [showItemPicker, setShowItemPicker] = useState(false);
    const [partnerItems, setPartnerItems] = useState([]);
    const [loadingItems, setLoadingItems] = useState(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleTagItemClick = async () => {
        if (!chatPartner?.id) return;
        setShowItemPicker(true);
        setLoadingItems(true);
        try {
            const data = await getMyItems(chatPartner.id);
            // Handle consistent data structure whether it's array or object with data property
            const items = Array.isArray(data) ? data : (data.data || []);
            setPartnerItems(items);
        } catch (error) {
            console.error("Failed to fetch partner items", error);
        } finally {
            setLoadingItems(false);
        }
    };

    const handleSelectItem = (item) => {
        const payload = JSON.stringify({
            id: item.id,
            title: item.title,
            image: (item.images && item.images.length > 0) ? item.images[0].url : null,
            status: item.status
        });
        const text = `@@ITEM_CARD@@${payload}`;
        onSendMessage(text);
        setShowItemPicker(false);
    };

    return (
        <div className="flex flex-col w-full h-full bg-gray-900 rounded-none md:rounded-2xl overflow-hidden border-x-0 md:border border-white/10 relative">
            <div className="p-4 border-b border-white/10 flex items-center gap-4 bg-gray-900/50 backdrop-blur-sm">
                <Link to="/dashboard/messages" className="md:hidden text-gray-400 hover:text-white">
                    <ArrowLeft size={24} />
                </Link>
                <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
                    <img
                        src={chatPartner?.image || "https://ui-avatars.com/api/?name=User&background=random"}
                        alt={chatPartner?.name || "User"}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div>
                    <h3 className="font-semibold text-white">{chatPartner?.name || "User"}</h3>
                    <p className="text-xs text-gray-400">Regarding: {itemTitle || "General Chat"}</p>
                </div>

                {/* Tag Item Button */}
                {chatPartner && (
                    <button
                        onClick={handleTagItemClick}
                        className="ml-auto flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors text-sm font-medium"
                    >
                        <Tag size={16} />
                        <span className="hidden sm:inline">Tag Item</span>
                    </button>
                )}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 relative">
                <div className="text-center text-xs text-gray-500 my-4">Today</div>
                {messages.map((msg) => (
                    <MessageBubble key={msg.id} message={msg} isOwn={msg.isOwn} />
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Item Picker Modal/Overlay */}
            {showItemPicker && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col p-4 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white">Select an Item</h3>
                        <button
                            onClick={() => setShowItemPicker(false)}
                            className="p-1 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {loadingItems ? (
                        <div className="flex-1 flex items-center justify-center">
                            <Loader2 className="animate-spin text-blue-500 w-8 h-8" />
                        </div>
                    ) : partnerItems.length === 0 ? (
                        <div className="flex-1 flex items-center justify-center text-gray-400">
                            No items found for this user.
                        </div>
                    ) : (
                        <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                            {partnerItems.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => handleSelectItem(item)}
                                    className="w-full p-3 flex items-center gap-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors text-left group border border-transparent hover:border-blue-500/30"
                                >
                                    <div className="w-12 h-12 rounded-lg bg-gray-700 overflow-hidden shrink-0">
                                        {(item.images && item.images.length > 0) ? (
                                            <img src={item.images[0].url} alt={item.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">No Img</div>
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="font-medium text-white truncate group-hover:text-blue-400 transition-colors">{item.title}</div>
                                        <div className="text-xs text-gray-400 truncate">{item.status}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}

            <MessageInput onSendMessage={onSendMessage} />
        </div>
    );
}
