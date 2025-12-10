import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useState } from 'react';
export default function DashboardLayout() {
    const [showLoginButtons, setShowLoginButtons] = useState(false);
    const [isRegularLayout, setIsRegularLayout] = useState(false);
    return (
        <div className="min-h-screen text-white flex">
            <Header isRegularLayout={false} showLoginButtons={false} />
            <Sidebar />
            <main className="flex-1 ml-64 p-8 mt-20">
                <Outlet />
            </main>
        </div>
    );
}
