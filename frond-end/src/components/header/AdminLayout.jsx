import React, { useState } from 'react';
import {
    LayoutDashboard, Flag, Star, Briefcase,
    FileText, DollarSign, Settings,
    Menu, X, LogOut, User,
    Tag,
    TagsIcon
} from 'lucide-react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import Logo from '../logo/Logo';

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    const menuItems = [
        { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard, path: '/admin' },
        { id: 'accounts', label: 'Comptes', icon: DollarSign, path: '/admin/accounts' },
        { id: 'categories', label: 'Categories', icon: TagsIcon, path: '/admin/categories' },
        { id: 'artisan-requests', label: 'Devenir Artisan', icon: User, path: '/admin/artisan-requests' },
        { id: 'reports', label: 'Signalements', icon: Flag, path: '/admin/reports' },
        { id: 'services', label: 'Services', icon: Briefcase, path: '/admin/services' },
        { id: 'users', label: 'Utilisateurs', icon: User, path: '/admin/users' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-screen max-h-screen  bg-[#F1F5F9] flex">
            <aside className={`
                fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0F172A] text-white transition-transform duration-300
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20'}
            `}>
                <div className="h-16 flex items-center px-6 border-b border-gray-800">
                    <Logo size={'sm'} showText={sidebarOpen} />
                </div>

                <nav className="p-4 space-y-1">
                    {menuItems.map((item) => (
                        <Link
                            key={item.id}
                            to={item.path}
                            className={`
                                flex items-center gap-3 px-3 py-2.5 text-[12px] font-medium transition-colors
                                ${isActive(item.path)
                                    ? ' text-[#D35400] '
                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
                                ${!sidebarOpen && 'lg:justify-center lg:px-2'}
                            `}
                        >
                            <item.icon className="w-5 h-5 flex-shrink-0" />
                            <span className={`${!sidebarOpen && 'lg:hidden'}`}>{item.label}</span>

                        </Link>
                    ))}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
                    <button className="flex items-center gap-3 px-3 py-2.5 text-[12px] text-gray-400 hover:text-white transition-colors w-full">
                        <LogOut className="w-5 h-5" />
                        <span className={`${!sidebarOpen && 'lg:hidden'}`}>Déconnexion</span>
                    </button>
                </div>
            </aside>

            <div className="flex-1 flex flex-col min-w-0">
                <header className=" bg-white border-b border-gray-200 flex items-center lg:justify-between px-4 lg:px-6 justify-end">
                    <div className="flex items-center gap-4 ">
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
                <main className="flex-1 max-h-screen overflow-auto overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] p-0  ">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;