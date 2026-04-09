import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS, CategoryScale, LinearScale,
    BarElement, Tooltip
} from 'chart.js';
import axiosClient from '../api/axios-client';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const SkeletonDashboard = () => (
    <div className="space-y-4 p-4 animate-pulse">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 rounded-xl" />
            ))}
        </div>
        <div className="h-64 bg-gray-200 rounded-xl" />
    </div>
);

const StatCard = ({ label, value, sub }) => (
    <div className="bg-white border border-gray-100 rounded-xl p-4">
        <p className="text-xs text-gray-400 mb-1">{label}</p>
        <p className="text-2xl font-medium text-[#1B4F72]">{value}</p>
        {sub && <p className="text-[11px] text-gray-400 mt-0.5">{sub}</p>}
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

    const stats = [
        { label: 'Services publiés', value: overview.total_services },
        { label: 'Propositions', value: overview.total_propositions },
        { label: 'Propositions acceptées', value: overview.accepted_propositions },
        { label: 'Jobs complétés', value: overview.completed_jobs },
        { label: 'Demandes complétées', value: overview.total_demande_directes_completed },
        { label: 'Total tâches', value: overview.all_completed_tasks },
    ];

    const revenueData = {
        labels: charts.daily_revenue.map(d => d.day),
        datasets: [{
            label: 'Gains (MAD)',
            data: charts.daily_revenue.map(d => parseFloat(d.earnings)),
            backgroundColor: '#185FA5',
            borderRadius: 4,
        }],
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            x: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { size: 11 }, color: '#9ca3af' } },
            y: {
                beginAtZero: true,
                grid: { color: 'rgba(0,0,0,0.04)' },
                ticks: { font: { size: 11 }, color: '#9ca3af', callback: v => `${v} MAD` },
            },
        },
    };

    return (
        <div className="space-y-4 p-4 ">
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                <StatCard
                    label="Total gagné"
                    value={`${parseFloat(financials.total_earned).toLocaleString()} MAD`}
                    sub={`${financials.total_payments_count} paiement(s)`}
                />
                <StatCard
                    label="Gains du jour"
                    value={`${parseFloat(charts.daily_revenue[0]?.earnings ?? 0).toLocaleString()} MAD`}
                    sub={charts.daily_revenue[0]?.day ?? '—'}
                />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-20">
                {stats.map((s, i) => (
                    <StatCard key={i} label={s.label} value={s.value} />
                ))}
            </div>



            {/* <div className="bg-white border border-gray-100 rounded-xl p-4">
                <p className="text-sm font-medium text-gray-400 mb-4">Gains journaliers</p>
                <div className="h-52">
                    <Bar data={revenueData} options={barOptions} />
                </div>
            </div> */}

        </div>
    );
};

export default DashboardArtisanPage;