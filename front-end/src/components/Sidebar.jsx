import { LayoutDashboard, FileText, Package, Users, UserCircle, Search, ChartBarIcon, PlusCircle, X } from 'lucide-react';
import { Link, useLocation, useParams } from 'react-router-dom';

export default function Sidebar({ isOpen, toggleSidebar }) {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    const { id } = useParams();

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: `/dashboard/${id}` },
        { icon: FileText, label: 'Claims', path: `/dashboard/${id}/claims` },
        { icon: ChartBarIcon, label: 'Messages', path: `/dashboard/${id}/messages` },
    ];

    return (
        <div className={`
            fixed left-0 top-0 h-screen w-64
            bg-[#0f172a]/95 backdrop-blur-xl border-r border-white/5 
            z-40 transition-transform duration-300 ease-in-out flex flex-col
            ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>

            <div className="p-6 mt-20">
                <Link to="/Report">
                    <button className="w-full bg-blue-900 hover:bg-blue-800 text-white font-medium p-3 rounded-xl shadow-lg shadow-blue-900/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group">
                        <PlusCircle size={20} className="group-hover:rotate-90 transition-transform" />
                        Report Item
                    </button>
                </Link>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                <p className="px-4 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Menu</p>
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive(item.path)
                            ? 'bg-blue-900/10 text-blue-400 border border-blue-600/20'
                            : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                            }`}
                    >
                        <item.icon size={20} className={`transition-colors ${isActive(item.path) ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                        <span className="font-medium">{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-white/5">
                <Link
                    to={`/dashboard/${id}/profile`}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive(`/ProfileInfo/${id}`)
                        ? 'bg-blue-900/10 text-blue-400 border border-blue-600/20'
                        : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                        }`}
                >
                    <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center text-white font-bold text-xs">
                        U
                    </div>
                    <div className="flex flex-col">
                        <span className="font-medium text-sm">User Profile</span>
                        <span className="text-xs text-slate-500">View Profile</span>
                    </div>
                </Link>
            </div>
        </div>
    );
}
