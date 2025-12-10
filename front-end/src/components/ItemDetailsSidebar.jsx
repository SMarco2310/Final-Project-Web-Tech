import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ItemDetailsSidebar() {
    return (
        <div className="h-fit bg-gray-900 rounded-2xl p-6 border border-white/10 flex flex-col gap-6">
            <div>
                <h3 className="text-lg font-bold text-white mb-4">Item Details</h3>
                <div className="aspect-video w-full bg-gray-800 rounded-xl overflow-hidden mb-4">
                    <img
                        src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1000"
                        alt="Blue Backpack"
                        className="w-full h-full object-cover"
                    />
                </div>
                <h4 className="font-semibold text-white text-lg">Blue Backpack</h4>
                <div className="space-y-1 mt-2 text-sm text-gray-400">
                    <p>Lost near Central Library</p>
                    <p>Reported: 2 hours ago</p>
                </div>

                <button className="mt-4 w-full py-2 px-4 bg-gray-800 hover:bg-gray-700 text-blue-400 rounded-xl transition-colors text-sm font-medium flex items-center justify-center gap-2">
                    View Item Details
                    <Link to="/item">
                        <ExternalLink size={16} />
                    </Link>
                </button>
            </div>
        </div>
    );
}
