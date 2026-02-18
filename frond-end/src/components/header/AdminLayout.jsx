import React, { useState } from 'react';
import {
    LayoutDashboard, Flag, Star, Users, Briefcase,
    FileText, DollarSign, Settings, Bell, Search,
    Menu, X, ChevronDown, LogOut, User
} from 'lucide-react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import Logo from '../logo/Logo';

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const location = useLocation();

    const menuItems = [
        { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard, path: '/admin' },
        { id: 'reports', label: 'Signalements', icon: Flag, path: '/admin/reports', badge: 12 },
        { id: 'reviews', label: 'Avis & Notes', icon: Star, path: '/admin/reviews', badge: 8 },
        { id: 'artisan-requests', label: 'Devenir Artisan', icon: User, path: '/admin/artisan-requests', badge: 5 },
        { id: 'services', label: 'Services', icon: Briefcase, path: '/admin/services' },
        { id: 'jobs', label: 'Offres d\'emploi', icon: FileText, path: '/admin/jobs', badge: 3 },
        { id: 'accounts', label: 'Comptes', icon: DollarSign, path: '/admin/accounts' },
        { id: 'settings', label: 'Paramètres', icon: Settings, path: '/admin/settings' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-screen bg-[#F1F5F9] flex">
            {/* Sidebar Dark */}
            <aside className={`
                fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0F172A] text-white transition-transform duration-300
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20'}
            `}>
                {/* Logo */}
                <div className="h-16 flex items-center px-6 border-b border-gray-800">
                    <Logo size={'sm'} showText={sidebarOpen} />
                </div>

                {/* Menu */}
                <nav className="p-4 space-y-1">
                    {menuItems.map((item) => (
                        <Link
                            key={item.id}
                            to={item.path}
                            className={`
                                flex items-center gap-3 px-3 py-2.5 text-[12px] font-medium transition-colors
                                ${isActive(item.path)
                                    ? 'bg-[#1B4F72] text-white'
                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
                                ${!sidebarOpen && 'lg:justify-center lg:px-2'}
                            `}
                        >
                            <item.icon className="w-5 h-5 flex-shrink-0" />
                            <span className={`${!sidebarOpen && 'lg:hidden'}`}>{item.label}</span>
                            {item.badge && (
                                <span className={`
                                    ml-auto bg-[#D35400] text-white text-[10px] px-1.5 py-0.5
                                    ${!sidebarOpen && 'lg:hidden'}
                                `}>
                                    {item.badge}
                                </span>
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Logout */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
                    <button className="flex items-center gap-3 px-3 py-2.5 text-[12px] text-gray-400 hover:text-white transition-colors w-full">
                        <LogOut className="w-5 h-5" />
                        <span className={`${!sidebarOpen && 'lg:hidden'}`}>Déconnexion</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="lg:hidden p-2 text-gray-600 hover:text-[#1B4F72]"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="hidden lg:block p-2 text-gray-400 hover:text-[#1B4F72]"
                        >
                            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </header>
            </div>
        </div>
    );
};

export default AdminLayout;