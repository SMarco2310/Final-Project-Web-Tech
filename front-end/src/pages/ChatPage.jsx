import React, { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ChatWindow from '../components/ChatWindow';
import ItemDetailsSidebar from '../components/ItemDetailsSidebar';
import { useAuth } from '../hooks/useAuth';

export default function ChatPage() {
    const { chatId } = useParams();
    const [searchParams] = useSearchParams();
    const itemId = searchParams.get('itemId');
    const otherUserId = searchParams.get('userId');

    const { user } = useAuth();

    // Mock Data
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi! I think I found your backpack. Is there a water bottle in the side pocket?", time: "3:45 PM", isOwn: false },
        { id: 2, text: "Yes, there is! That's amazing. Where did you find it?", time: "3:46 PM", isOwn: true },
        { id: 3, text: "It was left on the bench near the central library. I've left it with the front desk staff there.", time: "3:47 PM", isOwn: false },
    ]);

    const [item, setItem] = useState({
        title: "Blue Backpack",
        description: "Lost blue Jansport backpack with a sticker on it.",
        location: "Central Library",
        date: "2023-10-25",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1000"
    });

    const [chatPartner, setChatPartner] = useState({
        name: "Jane Doe",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"
    });

    const handleSendMessage = (text) => {
        const newMessage = {
            id: messages.length + 1,
            text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isOwn: true,
        };
        setMessages([...messages, newMessage]);
    };

    return (
        <div className="container mx-auto p-0 md:p-6 h-[calc(100vh-6rem)] flex flex-col lg:flex-row gap-6">
            <div className="flex-1 w-full h-full">
                <ChatWindow
                    messages={messages}
                    onSendMessage={handleSendMessage}
                    chatPartner={chatPartner}
                />
            </div>
            <div className="w-1/4 hidden lg:block h-full">
                <ItemDetailsSidebar item={item} />
            </div>
        </div>
    );
}
