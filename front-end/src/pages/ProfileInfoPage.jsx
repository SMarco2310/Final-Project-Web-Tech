import React, { useState, useEffect, useRef } from 'react';
import { Pencil, Save, X, LogOut, Loader2, Camera } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useParams, useNavigate } from 'react-router-dom';
import { useImage } from '../hooks/useImage';

export default function ProfileInfoPage() {
    const { user: currentUser, logout, getUserProfile, updateProfile } = useAuth();
    const { uploadImage } = useImage();
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editForm, setEditForm] = useState({});
    const [uploadingImage, setUploadingImage] = useState(false);
    const fileInputRef = useRef(null);
    const { id } = useParams();
    const navigate = useNavigate();

    // Security Check: Redirect if trying to view another user's profile
    useEffect(() => {
        if (currentUser && id && parseInt(id) !== currentUser.id) {
            navigate(`/profile/${currentUser.id}`, { replace: true });
        }
    }, [id, currentUser, navigate]);

    useEffect(() => {
        const fetchUser = async () => {
            if (id) {
                try {
                    const data = await getUserProfile(id);
                    if (data && data.user) {
                        setProfile(data.user);
                        setEditForm(data.user);
                    }
                } catch (error) {
                    console.error("Failed to fetch profile:", error);
                }
            }
            setLoading(false);
        };
        fetchUser();
    }, [id, getUserProfile]);

    const handleLogout = () => {
        logout();
    };

    const handleEdit = () => {
        setEditForm(profile);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditForm(profile);
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setUploadingImage(true);
            const imageUrl = await uploadImage(file);
            setEditForm(prev => ({ ...prev, image: imageUrl }));
        } catch (error) {
            console.error("Failed to upload image:", error);
            alert("Failed to upload image");
        } finally {
            setUploadingImage(false);
        }
    };

    const triggerFileInput = () => {
        if (isEditing) {
            fileInputRef.current?.click();
        }
    };

    const handleSave = async () => {
        try {
            const result = await updateProfile(profile.id, editForm);

            // Handle both common API response patterns
            if (result && (result.ok || result.success)) {
                // Update the local profile state with the new data
                setProfile(prev => ({ ...prev, ...editForm }));
                setIsEditing(false);
            } else {
                alert(result?.message || "Failed to update profile");
            }
        } catch (error) {
            console.error("Update failed:", error);
            alert("Failed to save changes");
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (loading) {
        return (
            <div className="w-full h-[50vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="w-full text-center py-10 text-gray-400">
                User profile not found.
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-white self-start md:self-auto">Profile Information</h1>
                <div className="flex gap-3 w-full md:w-auto">
                    {!isEditing ? (
                        <>
                            <button
                                onClick={handleEdit}
                                className="flex-1 md:flex-none justify-center flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                            >
                                <Pencil size={16} />
                                Edit Profile
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex-1 md:flex-none justify-center flex items-center gap-2 px-4 py-2 bg-red-900 text-white  rounded-xl hover:bg-red-500 transition-colors"
                            >
                                <LogOut size={16} />
                                Log Out
                            </button>
                        </>
                    ) : (
                        <div className="flex gap-2 w-full md:w-auto">
                            <button
                                onClick={handleCancel}
                                className="flex-1 md:flex-none justify-center flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-colors"
                            >
                                <X size={16} />
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="flex-1 md:flex-none justify-center flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                            >
                                <Save size={16} />
                                Save Changes
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-gray-900 rounded-3xl border border-white/10 p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center gap-6 mb-8 border-b border-white/10 pb-8 text-center md:text-left">
                    <div
                        className={`w-24 h-24 shrink-0 rounded-full bg-orange-100 overflow-hidden relative group ${isEditing ? 'cursor-pointer ring-4 ring-slate-800 hover:ring-blue-500/50 transition-all' : ''}`}
                        onClick={triggerFileInput}
                    >
                        <img
                            src={isEditing ? (editForm.image || editForm.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuBOtobM1j3ECr0pN0ZWg8LNDdi7YBTXWO8infmDL937kAZZXI4rQ8Mg2JiZrKVYjL81ci5lGrHICuH7AIXNU1t7kqae8eM1CKPdRee_38kFEA0WuPK5QXgN2WCb7H4kUG_r2Episs7h0D98YdIkSW1Z6wzZlPPGgSPIqSd5sS4SVBoPoG0dq-ngpzHBAf3PLciKAIREqR4pMXCCEIzFmNdEpgHVN9EGMhyRyqTBj4Sa8uYhXfK5JH_u49IFeR-0Q6Q6HZFu6vl5eAk") : (profile.image || profile.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuBOtobM1j3ECr0pN0ZWg8LNDdi7YBTXWO8infmDL937kAZZXI4rQ8Mg2JiZrKVYjL81ci5lGrHICuH7AIXNU1t7kqae8eM1CKPdRee_38kFEA0WuPK5QXgN2WCb7H4kUG_r2Episs7h0D98YdIkSW1Z6wzZlPPGgSPIqSd5sS4SVBoPoG0dq-ngpzHBAf3PLciKAIREqR4pMXCCEIzFmNdEpgHVN9EGMhyRyqTBj4Sa8uYhXfK5JH_u49IFeR-0Q6Q6HZFu6vl5eAk")}
                            alt={profile.name}
                            className={`w-full h-full object-cover ${uploadingImage ? 'opacity-50' : ''}`}
                        />
                        {uploadingImage && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                            </div>
                        )}
                        {isEditing && !uploadingImage && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Camera size={24} className="text-white" />
                            </div>
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            accept="image/*"
                            className="hidden"
                        />
                    </div>
                    <div className="w-full">
                        <h2 className="text-2xl font-bold text-white mb-1">{profile.name}</h2>
                        <p className="text-gray-400 break-all">{profile.email}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {isEditing && (
                        <>
                            <div>
                                <label className="block text-sm text-gray-500 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={editForm.name || ''}
                                    onChange={handleChange}
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-500 mb-1">Email</label>
                                <input
                                    type="text"
                                    name="email"
                                    value={editForm.email || ''}
                                    onChange={handleChange}
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </>
                    )}
                    <div>
                        <label className="block text-sm text-gray-500 mb-1">Phone Number</label>
                        {isEditing ? (
                            <input
                                type="tel"
                                name="phone"
                                value={editForm.phone || ''}
                                onChange={handleChange}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                            />
                        ) : (
                            <p className="text-white font-medium text-lg">{profile.phone}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm text-gray-500 mb-1">Address</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="address"
                                value={editForm.address || ''}
                                onChange={handleChange}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                            />
                        ) : (
                            <p className="text-white font-medium text-lg">{profile.address}</p>
                        )}
                    </div>
                </div>

                <div>
                    <label className="block text-sm text-gray-500 mb-1">Bio</label>
                    {isEditing ? (
                        <textarea
                            name="bio"
                            value={editForm.bio || ''}
                            onChange={handleChange}
                            rows={4}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 resize-none"
                        />
                    ) : (
                        <p className="text-gray-300 leading-relaxed">
                            {profile.bio}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
