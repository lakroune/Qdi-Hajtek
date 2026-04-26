import { useEffect, useState } from 'react';
import axiosClient from '../api/axios-client';

const SkeletonDashboard = () => (
    <div className="min-h-screen bg-[#f8f7f4] p-5 mt-16 space-y-5 animate-pulse">
        <div className="h-8 w-48 bg-gray-200 rounded" />
        <div className="h-32 bg-gray-200 rounded-sm" />
        <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded-sm" />
            ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 rounded-sm" />
            ))}
        </div>
    </div>
);

const DashboardArtisanPage = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosClient.get('/dashboard/artisan-stats')
            .then(res => setData(res.data.stats))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <SkeletonDashboard />;

    const { overview, financials, charts } = data;

    const todayEarnings = parseFloat(charts.daily_revenue[0]?.earnings ?? 0);
    const todayDay = charts.daily_revenue[0]?.day ?? '—';

    const statCards = [
        { label: 'Services publiés', value: overview.total_services, accent: '#1B4F72', bg: '#e8f0f7' },
        { label: 'Propositions', value: overview.total_propositions, accent: '#D35400', bg: '#fdf0e8' },
        { label: 'Acceptées', value: overview.accepted_propositions, accent: '#16a34a', bg: '#f0fdf4' },
        { label: 'Jobs complétés', value: overview.completed_jobs, accent: '#ca8a04', bg: '#fefce8' },
        { label: 'Demandes directes', value: overview.total_demande_directes_completed, accent: '#7c3aed', bg: '#f5f3ff' },
        { label: 'Total tâches', value: overview.all_completed_tasks, accent: '#0891b2', bg: '#ecfeff' },
    ];

    return (
        <div className="min-h-screen bg-[#f8f7f4] mt-16 pb-12">
            <div className="px-5 pt-6 pb-4">
                <p className="text-[11px] text-gray-400 uppercase tracking-widest font-medium mb-1">Tableau de bord</p>
                <h1 className="text-[22px] font-bold text-[#1B4F72] leading-tight">Mes statistiques</h1>
            </div>

            <div className="px-5 space-y-4">
                <div className="bg-[#1B4F72] p-5 relative overflow-hidden">
                    <div className="relative">
                        <div className="flex items-start justify-end mb-3">
                            <span className="flex items-center gap-1 text-[10px] text-white/60 bg-white/10 px-2 py-1">
                                {financials.total_payments_count} paiement(s)
                            </span>
                        </div>
                        <p className="text-[11px] text-white/60 uppercase tracking-widest mb-1">Total gagné</p>
                        <p className="text-[32px] font-bold text-white leading-none">
                            {parseFloat(financials.total_earned).toLocaleString('fr-FR', { minimumFractionDigits: 2 })}
                            <span className="text-[14px] font-normal text-white/60 ml-1">MAD</span>
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white border border-gray-100 p-4">
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Aujourd'hui</p>
                        <p className="text-[20px] font-bold text-[#1B4F72] leading-none">
                            {todayEarnings.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-0.5">MAD</p>
                        <p className="text-[9px] text-gray-300 mt-2 font-mono">{todayDay}</p>
                    </div>

                    <div className="bg-white border border-gray-100 p-4">
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Moy. / paiement</p>
                        <p className="text-[20px] font-bold text-[#1B4F72] leading-none">
                            {financials.total_payments_count > 0
                                ? (parseFloat(financials.total_earned) / financials.total_payments_count)
                                    .toLocaleString('fr-FR', { minimumFractionDigits: 2 })
                                : '0.00'}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-0.5">MAD</p>
                    </div>
                </div>

                <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium mb-3">Activité détaillée</p>
                    <div className="grid grid-cols-2 gap-3">
                        {statCards.map((card, i) => (
                            <div key={i} className="bg-white border border-gray-100 p-4">
                                <div className="min-w-0">
                                    <p className="text-[10px] text-gray-400 truncate leading-tight">{card.label}</p>
                                    <p className="text-[20px] font-bold leading-tight" style={{ color: card.accent }}>
                                        {card.value}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardArtisanPage;