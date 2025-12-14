import React, { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ChatWindow({ messages, onSendMessage, chatPartner, itemTitle }) {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="flex flex-col w-full h-full bg-gray-900 rounded-none md:rounded-2xl overflow-hidden border-x-0 md:border border-white/10">
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
                    <p className="text-xs text-gray-400">Regarding: {itemTitle || "Item"}</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="text-center text-xs text-gray-500 my-4">Today</div>
                {messages.map((msg) => (
                    <MessageBubble key={msg.id} message={msg} isOwn={msg.isOwn} />
                ))}
                <div ref={messagesEndRef} />
            </div>

            <MessageInput onSendMessage={onSendMessage} />
        </div>
    );
}
