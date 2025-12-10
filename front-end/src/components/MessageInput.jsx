import React, { useState } from 'react';
import { Send } from 'lucide-react';

export default function MessageInput({ onSendMessage }) {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-4 bg-gray-900/50 border-t border-white/10 flex items-center gap-3"
        >
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-gray-800 border-none rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
                type="submit"
                disabled={!message.trim()}
                className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <Send size={20} />
            </button>
        </form>
    );
}
