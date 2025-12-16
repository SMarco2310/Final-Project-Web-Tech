import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function MessageBubble({ message, isOwn }) {
    const { user } = useAuth();
    const isItemCard = message.text && message.text.startsWith('@@ITEM_CARD@@');
    let itemData = null;

    if (isItemCard) {
        try {
            itemData = JSON.parse(message.text.substring(13));
        } catch (e) {
            console.error("Failed to parse item card", e);
        }
    }
    const statusColors = {
        Lost: "bg-red-600/40 text-red-100",
        Found: "bg-green-500/40 text-green-100",
        Claimed: "bg-amber-500/40 text-amber-100",
    };

    return (
        <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
            {!isOwn && (
                <div className="w-8 h-8 rounded-full bg-gray-600 mr-2 shrink-0 overflow-hidden">
                    {/* Placeholder for user avatar */}
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jane" alt="User Avatar" className="w-full h-full object-cover" />
                </div>
            )}
            <div
                className={`max-w-[80%] md:max-w-[60%] ${isItemCard ? 'p-0 overflow-hidden bg-transparent' : 'px-4 py-3'} rounded-2xl ${isOwn
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-gray-800 text-gray-200 rounded-bl-none'
                    } ${isItemCard && isOwn ? 'bg-transparent text-white' : ''}`}
            >
                {isItemCard && itemData ? (
                    <Link to={`/Item/${itemData.id}`} className="block w-full sm:w-72 bg-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10 group">
                        <div className="h-40 w-full relative overflow-hidden">
                            <img
                                src={itemData.image || "https://via.placeholder.com/300x200?text=No+Image"}
                                alt={itemData.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-60" />
                            <span
                                className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md shadow-sm border border-white/10 ${statusColors[itemData.status] || "bg-gray-500/40 text-gray-200"
                                    }`}
                            >
                                {itemData.status}
                            </span>
                        </div>
                        <div className="p-4 relative">
                            <h4 className="font-bold text-white text-lg truncate mb-1 group-hover:text-blue-400 transition-colors">
                                {itemData.title}
                            </h4>
                            <p className="text-sm text-blue-400/80 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                                View Details <span>&rarr;</span>
                            </p>
                        </div>
                    </Link>
                ) : (
                    <p className="text-sm">{message.text}</p>
                )}

                {!isItemCard && (
                    <span className={`text-xs block mt-1 ${isOwn ? 'text-blue-100' : 'text-gray-400'}`}>
                        {message.time}
                    </span>
                )}
            </div>
            {isOwn && (
                <div className="w-8 h-8 rounded-full bg-gray-600 ml-2 shrink-0 overflow-hidden">
                    {/* Placeholder for own avatar */}
                    <img
                        src={user?.image || "https://ui-avatars.com/api/?name=User&background=random"}
                        alt={user?.name || "User"}
                        className="w-full h-full object-cover rounded-tr-2xl rounded-tl-2xl"
                    />
                </div>
            )}
        </div>
    );
}
