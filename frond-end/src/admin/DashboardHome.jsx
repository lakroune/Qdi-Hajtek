import { 
    Flag, Star, User, Briefcase, TrendingUp, 
    DollarSign, Users, CheckCircle, 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardHome = () => {
    const stats = [
        { id: 1, label: 'Signalements', value: 12, icon: Flag, color: 'bg-red-100 text-red-600', path: '/admin/reports' },
        { id: 2, label: 'Nouveaux avis', value: 8, icon: Star, color: 'bg-yellow-100 text-yellow-600', path: '/admin/reviews' },
        { id: 3, label: 'Demandes artisan', value: 5, icon: User, color: 'bg-blue-100 text-blue-600', path: '/admin/artisan-requests' },
        { id: 4, label: 'Offres emploi', value: 3, icon: Briefcase, color: 'bg-green-100 text-green-600', path: '/admin/jobs' },
    ];

    const recentActivity = [
        { id: 1, type: 'report', text: 'Signalement #1234 - Artisan non professionnel', time: '2 min', status: 'urgent' },
        { id: 2, type: 'review', text: 'Nouvel avis 5★ - Karim Plomberie', time: '15 min', status: 'normal' },
        { id: 3, type: 'artisan', text: 'Demande artisan - Youssef Électricité', time: '1h', status: 'pending' },
        { id: 4, type: 'job', text: 'Nouvelle offre - Cherche plombier', time: '3h', status: 'normal' },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-[18px] font-bold text-[#1B4F72]">Tableau de bord</h1>
                <span className="text-[11px] text-gray-500">Dernière mise à jour: il y a 2 min</span>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <Link 
                        key={stat.id} 
                        to={stat.path}
                        className="bg-white border border-gray-200 p-4 hover:border-[#D35400] transition-colors"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className={`w-10 h-10 ${stat.color} flex items-center justify-center`}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <span className="text-[20px] font-bold text-[#1B4F72]">{stat.value}</span>
                        </div>
                        <p className="text-[11px] text-gray-600">{stat.label}</p>
                    </Link>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-3 gap-4">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 bg-white border border-gray-200 p-4">
                    <h3 className="text-[13px] font-bold text-[#1B4F72] mb-4">Revenus mensuels</h3>
                    <div className="h-48 flex items-end gap-2">
                        {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 88].map((h, i) => (
                            <div key={i} className="flex-1 bg-[#1B4F72]/20 hover:bg-[#D35400] transition-colors relative group" style={{ height: `${h}%` }}>
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-gray-600 opacity-0 group-hover:opacity-100">
                                    {h}k
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-2 text-[10px] text-gray-400">
                        <span>Jan</span><span>Fév</span><span>Mar</span><span>Avr</span>
                        <span>Mai</span><span>Juin</span><span>Juil</span><span>Août</span>
                        <span>Sep</span><span>Oct</span><span>Nov</span><span>Déc</span>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-white border border-gray-200 p-4">
                    <h3 className="text-[13px] font-bold text-[#1B4F72] mb-4">En bref</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-[#1B4F72]" />
                                <span className="text-[11px] text-gray-600">Utilisateurs</span>
                            </div>
                            <span className="text-[12px] font-bold text-[#1B4F72]">1,234</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span className="text-[11px] text-gray-600">Artisans actifs</span>
                            </div>
                            <span className="text-[12px] font-bold text-[#1B4F72]">456</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-[#D35400]" />
                                <span className="text-[11px] text-gray-600">Transactions</span>
                            </div>
                            <span className="text-[12px] font-bold text-[#1B4F72]">89.2k DH</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-green-500" />
                                <span className="text-[11px] text-gray-600">Croissance</span>
                            </div>
                            <span className="text-[12px] font-bold text-green-600">+23%</span>
                        </div>
                    </div>
                </div>
            </div>

         
        </div>
    );
};

export default DashboardHome;