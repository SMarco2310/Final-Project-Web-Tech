import React from 'react';
import { Pencil } from 'lucide-react';

export default function ProfileInfoPage() {
    const user = {
        name: "Alex Thompson",
        email: "alex.thompson@email.com",
        firstName: "Alex",
        lastName: "Thompson",
        phone: "(555) 123-4567",
        address: "123 Main St, Anytown, USA",
        bio: "Frontend developer and design enthusiast. Passionate about creating beautiful and intuitive user interfaces. In my free time, I enjoy hiking and exploring new coffee shops. I tend to lose my keys, so this app is a lifesaver!",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Profile Information</h1>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors">
                    <Pencil size={16} />
                    Edit Profile
                </button>
            </div>

            <div className="bg-gray-900 rounded-3xl border border-white/10 p-8">
                {/* Header Section */}
                <div className="flex items-center gap-6 mb-8 border-b border-white/10 pb-8">
                    <div className="w-24 h-24 rounded-full bg-orange-100 overflow-hidden">
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                        <p className="text-gray-400">{user.email}</p>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <label className="block text-sm text-gray-500 mb-1">First Name</label>
                        <p className="text-white font-medium text-lg">{user.firstName}</p>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-500 mb-1">Last Name</label>
                        <p className="text-white font-medium text-lg">{user.lastName}</p>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-500 mb-1">Phone Number</label>
                        <p className="text-white font-medium text-lg">{user.phone}</p>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-500 mb-1">Address</label>
                        <p className="text-white font-medium text-lg">{user.address}</p>
                    </div>
                </div>

                {/* Bio Section */}
                <div>
                    <label className="block text-sm text-gray-500 mb-1">Bio</label>
                    <p className="text-gray-300 leading-relaxed">
                        {user.bio}
                    </p>
                </div>
            </div>
        </div>
    );
}
