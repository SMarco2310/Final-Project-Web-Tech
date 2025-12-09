import React from 'react';
import { LayoutDashboard, FileText, Package, Users, UserCircle, Search, ChartBarIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: FileText, label: 'Claims', path: '/dashboard/claims' },
        { icon: ChartBarIcon, label: 'Messages', path: '/dashboard/messages' },
        { icon: Users, label: 'Users', path: '/dashboard/users' },
    ];

    return (
        <div className="w-64 bg-gray-900 border-r border-white/10 flex flex-col h-screen fixed left-0 top-0">
            <div className="p-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Search className="text-white" size={20} />
                </div>
                <h1 className="text-xl font-bold text-white">FoundIt</h1>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive(item.path)
                                ? 'bg-blue-500 text-white'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <item.icon size={20} />
                        <span className="font-medium">{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-white/10">
                <Link
                    to="ProfileInfo"
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive('/ProfileInfo')
                            ? 'bg-blue-500 text-white'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                >
                    <UserCircle size={20} />
                    <span className="font-medium">Profile Info</span>
                </Link>
            </div>
        </div>
    );
}
