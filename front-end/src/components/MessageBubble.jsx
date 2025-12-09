export default function MessageBubble({ message, isOwn }) {
    return (
        <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
            {!isOwn && (
                <div className="w-8 h-8 rounded-full bg-gray-600 mr-2 shrink-0 overflow-hidden">
                    {/* Placeholder for user avatar */}
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jane" alt="User Avatar" className="w-full h-full object-cover" />
                </div>
            )}
            <div
                className={`max-w-[70%] px-4 py-3 rounded-2xl ${isOwn
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-gray-800 text-gray-200 rounded-bl-none'
                    }`}
            >
                <p className="text-sm">{message.text}</p>
                <span className={`text-xs block mt-1 ${isOwn ? 'text-blue-100' : 'text-gray-400'}`}>
                    {message.time}
                </span>
            </div>
            {isOwn && (
                <div className="w-8 h-8 rounded-full bg-gray-600 ml-2 shrink-0 overflow-hidden">
                    {/* Placeholder for own avatar */}
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" alt="Your Avatar" className="w-full h-full object-cover" />
                </div>
            )}
        </div>
    );
}
