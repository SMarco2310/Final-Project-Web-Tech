import { ExternalLink } from 'lucide-react';

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
                    <ExternalLink size={16} />
                </button>
            </div>

            {/* <div className="border-t border-white/10 pt-6">
                <h3 className="text-lg font-bold text-white mb-4">Shared Files</h3>
                <div className="text-center py-8 text-gray-500 text-sm bg-gray-800/50 rounded-xl border border-dashed border-gray-700">
                    No files have been shared yet.
                </div>
            </div> */}
        </div>
    );
}
