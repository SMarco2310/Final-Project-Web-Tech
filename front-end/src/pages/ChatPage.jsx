import { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ChatWindow from '../components/ChatWindow';
// import ItemDetailsSidebar from '../components/ItemDetailsSidebar';
import { useAuth } from '../hooks/useAuth';
import { useChat } from '../hooks/useChat';

export default function ChatPage() {
    const { chatId } = useParams();
    const [searchParams] = useSearchParams();

    // We might not need these params if we have chatId, but good to keep for initial creation flow if that existed differently
    const itemId = searchParams.get('itemId');
    const otherUserId = searchParams.get('userId');

    const { user } = useAuth();
    const { getChatDetails, getMessages, sendMessage, markAsRead } = useChat();

    const [messages, setMessages] = useState([]);
    const [item, setItem] = useState(null);
    const [chatPartner, setChatPartner] = useState(null);
    const [loading, setLoading] = useState(true);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const fetchChatData = async () => {
            if (!chatId || !user) return;

            try {
                const chatData = await getChatDetails(chatId);
                const messagesData = await getMessages(chatId);

                // Determine partner
                const isUser1 = chatData.user1?.id === user.id;
                const partner = isUser1 ? chatData.user2 : chatData.user1;

                setChatPartner({
                    id: partner?.id,
                    name: partner?.name || "User",
                    image: partner?.image || `https://ui-avatars.com/api/?name=${partner?.name || 'User'}&background=random`
                });

                setItem({
                    title: chatData.item?.title || "Item",
                    description: chatData.item?.description || "No description",
                    location: chatData.item?.location || "Unknown",
                    date: chatData.item?.createdAt?.split('T')[0] || new Date().toISOString().split('T')[0],
                    image: (chatData.item?.images && chatData.item.images.length > 0) ? chatData.item.images[0].url : "https://via.placeholder.com/150?text=No+Image"
                });

                // Format messages
                const formattedMessages = messagesData.map(msg => ({
                    id: msg.id,
                    text: msg.content,
                    time: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    isOwn: msg.sender?.id === user.id
                }));

                setMessages(formattedMessages);

                // Mark as read
                await markAsRead(chatId);

            } catch (error) {
                console.error("Error loading chat:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchChatData();

        // Optional: Polling for new messages could go here
    }, [chatId, user, getChatDetails, getMessages, markAsRead]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);


    const handleSendMessage = async (text) => {
        try {
            const data = await sendMessage(chatId, text);

            const newMessage = {
                id: data.data?.id || Date.now(), // Fallback ID
                text: text,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isOwn: true,
            };
            setMessages(prev => [...prev, newMessage]);
        } catch (error) {
            console.error("Failed to send message:", error);
            alert("Failed to send message");
        }
    };

    if (loading) {
        return <div className="h-full flex items-center justify-center text-white">Loading chat...</div>;
    }

    return (
        <div className="container mx-auto p-0 md:p-6 h-[calc(100vh-6rem)] flex flex-col lg:flex-row gap-6">
            <div className="flex-1 w-full h-full">
                <ChatWindow
                    messages={messages}
                    onSendMessage={handleSendMessage}
                    chatPartner={chatPartner}
                    itemTitle={item?.title}
                />
            </div>
        </div>
    );
}
