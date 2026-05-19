import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import {
    LayoutDashboard,
    Users,
    Briefcase,
    CalendarCheck,
    Settings,
    LogOut,
    Menu,
    X,
    Shield,
} from 'lucide-react';

const navItems = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/nurses', icon: Users, label: 'Nurses' },
    { to: '/admin/services', icon: Briefcase, label: 'Services' },
    { to: '/admin/bookings', icon: CalendarCheck, label: 'Bookings' },
    { to: '/admin/settings', icon: Settings, label: 'Settings' },
];

export default function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    const handleSignOut = async () => {
        await supabase.auth.signOut();
        // The auth context listener will handle the redirect if ProtectedRoute detects no user
        // Or we can force window.location.href = '/admin/login' if preferred, but ProtectedRoute should handle it.
    };

    const Sidebar = () => (
        <aside className="flex flex-col h-full bg-[#0d1323] border-r border-white/5">
            {/* Logo */}
            <div className="flex items-center gap-3 px-6 py-5 border-b border-white/5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c9a96e] to-[#b8965a] flex items-center justify-center shrink-0">
                    <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                    <p className="text-white font-semibold text-sm leading-none">Adelaide</p>
                    <p className="text-[#4a5568] text-xs mt-0.5">Admin Portal</p>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {navItems.map(({ to, icon: Icon, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        onClick={() => setSidebarOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive
                                ? 'bg-[#c9a96e]/15 text-[#c9a96e]'
                                : 'text-[#8b9ab5] hover:bg-white/5 hover:text-white'
                            }`
                        }
                    >
                        <Icon className="w-4 h-4 shrink-0" />
                        {label}
                    </NavLink>
                ))}
            </nav>

            {/* User + Sign out */}
            <div className="px-3 py-4 border-t border-white/5 space-y-1">
                {/* Clerk UserButton: shows avatar + account management popover */}
                <div className="flex items-center gap-3 px-3 py-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#111827] border border-white/10 flex items-center justify-center overflow-hidden">
                        <Shield className="w-3.5 h-3.5 text-[#8b9ab5]" />
                    </div>
                    <span className="text-[#8b9ab5] text-sm">Account</span>
                </div>

                <button
                    id="admin-signout-btn"
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#8b9ab5] hover:bg-red-500/10 hover:text-red-400 transition-all"
                >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </button>
            </div>
        </aside>
    );

    return (
        <div className="flex h-screen bg-[#0a0f1e] overflow-hidden">
            {/* Desktop sidebar */}
            <div className="hidden lg:flex w-60 flex-col shrink-0">
                <Sidebar />
            </div>

            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            <div
                className={`fixed inset-y-0 left-0 z-50 w-60 flex flex-col transform transition-transform lg:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <Sidebar />
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Mobile top bar */}
                <header className="lg:hidden flex items-center gap-3 px-4 py-3 bg-[#0d1323] border-b border-white/5">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="text-[#8b9ab5] hover:text-white transition-colors"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-2 flex-1">
                        <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#c9a96e] to-[#b8965a] flex items-center justify-center">
                            <Shield className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-white font-semibold text-sm">Adelaide Admin</span>
                    </div>
                    {sidebarOpen && (
                        <button onClick={() => setSidebarOpen(false)} className="text-[#8b9ab5] hover:text-white">
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </header>

                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
