import React, { useState } from 'react';
import { Pencil, Save, X } from 'lucide-react';

export default function ProfileInfoPage() {
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState({
        name: "Alex Thompson",
        email: "alex.thompson@email.com",
        firstName: "Alex",
        lastName: "Thompson",
        phone: "(555) 123-4567",
        address: "123 Main St, Anytown, USA",
        bio: "Frontend developer and design enthusiast. Passionate about creating beautiful and intuitive user interfaces. In my free time, I enjoy hiking and exploring new coffee shops. I tend to lose my keys, so this app is a lifesaver!",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
    });

    const [editForm, setEditForm] = useState(user);

    const handleEdit = () => {
        setEditForm(user);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditForm(user);
    };

    const handleSave = () => {
        setUser(editForm);
        setIsEditing(false);
        // Here you would typically make an API call to update the user profile
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Profile Information</h1>
                {!isEditing ? (
                    <button
                        onClick={handleEdit}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                    >
                        <Pencil size={16} />
                        Edit Profile
                    </button>
                ) : (
                    <div className="flex gap-2">
                        <button
                            onClick={handleCancel}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-colors"
                        >
                            <X size={16} />
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                        >
                            <Save size={16} />
                            Save Changes
                        </button>
                    </div>
                )}
            </div>

            <div className="bg-gray-900 rounded-3xl border border-white/10 p-8">
                <div className="flex items-center gap-6 mb-8 border-b border-white/10 pb-8">
                    <div className="w-24 h-24 rounded-full bg-orange-100 overflow-hidden relative group">
                        <img src={editForm.avatar} alt={editForm.name} className="w-full h-full object-cover" />
                        {isEditing && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <Pencil size={20} className="text-white" />
                            </div>
                        )}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                        <p className="text-gray-400">{user.email}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <label className="block text-sm text-gray-500 mb-1">First Name</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="firstName"
                                value={editForm.firstName}
                                onChange={handleChange}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                            />
                        ) : (
                            <p className="text-white font-medium text-lg">{user.firstName}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm text-gray-500 mb-1">Last Name</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="lastName"
                                value={editForm.lastName}
                                onChange={handleChange}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                            />
                        ) : (
                            <p className="text-white font-medium text-lg">{user.lastName}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm text-gray-500 mb-1">Phone Number</label>
                        {isEditing ? (
                            <input
                                type="tel"
                                name="phone"
                                value={editForm.phone}
                                onChange={handleChange}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                            />
                        ) : (
                            <p className="text-white font-medium text-lg">{user.phone}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm text-gray-500 mb-1">Address</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="address"
                                value={editForm.address}
                                onChange={handleChange}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                            />
                        ) : (
                            <p className="text-white font-medium text-lg">{user.address}</p>
                        )}
                    </div>
                </div>

                <div>
                    <label className="block text-sm text-gray-500 mb-1">Bio</label>
                    {isEditing ? (
                        <textarea
                            name="bio"
                            value={editForm.bio}
                            onChange={handleChange}
                            rows={4}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 resize-none"
                        />
                    ) : (
                        <p className="text-gray-300 leading-relaxed">
                            {user.bio}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
