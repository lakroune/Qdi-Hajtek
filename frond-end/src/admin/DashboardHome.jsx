import { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale, LinearScale, BarElement,
    ArcElement, Tooltip, Legend
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import axiosClient from '../api/axios-client';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const MetricCard = ({ label, value, sub }) => (
    <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-xs text-gray-500 mb-1">{label}</p>
        <p className="text-2xl font-medium text-gray-900">{value}</p>
        {sub && <p className="text-[11px] text-gray-400 mt-0.5">{sub}</p>}
    </div>
);

const DashboardHome = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosClient.get('/dashboard/stats')
            .then(res => setStats(res.data.stats))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const SkeletonDashboard = () => (
        <div className="space-y-4 p-4 animate-pulse">

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-16 bg-gray-200 rounded-xl" />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                <div className="lg:col-span-3 h-64 bg-gray-200 rounded-xl" />
                <div className="lg:col-span-2 h-64 bg-gray-200 rounded-xl" />
            </div>

            <div className="h-48 bg-gray-200 rounded-xl" />
        </div>
    );
    if (loading) return <div><SkeletonDashboard /></div>;


    const { overview, financials, activity } = stats;

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            x: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { font: { size: 11 } } },
            y: {
                beginAtZero: true,
                grid: { color: 'rgba(0,0,0,0.05)' },
                ticks: { font: { size: 11 }, callback: v => `${v} MAD` }
            }
        }
    };

    const monthlyLabels = activity.monthly_revenue.map(r => r.month);
    const monthlyRevenue = {
        labels: monthlyLabels,
        datasets: [
            {
                label: 'Volume total',
                data: activity.monthly_revenue.map(r => parseFloat(r.total_amount)),
                backgroundColor: '#185FA5',
                borderRadius: 4,
            },
            {
                label: 'Bénéfice net',
                data: activity.monthly_revenue.map(r => parseFloat(r.net_profit)),
                backgroundColor: '#1D9E75',
                borderRadius: 4,
            },
        ],
    };

    const dailyRevenue = {
        labels: activity.daily_revenue.map(r => r.day),
        datasets: [
            {
                label: 'Volume total',
                data: activity.daily_revenue.map(r => parseFloat(r.total_amount)),
                backgroundColor: '#185FA5',
                borderRadius: 4,
            },
            {
                label: 'Bénéfice net',
                data: activity.daily_revenue.map(r => parseFloat(r.net_profit)),
                backgroundColor: '#1D9E75',
                borderRadius: 4,
            },
        ],
    };

    const activityByType = {
        labels: Object.keys(activity.by_type),
        datasets: [{
            data: Object.values(activity.by_type),
            backgroundColor: ['#534AB7', '#D85A30'],
            borderWidth: 0,
            hoverOffset: 4,
        }],
    };

    const Legend = ({ items }) => (
        <div className="flex gap-4 mb-3">
            {items.map(({ color, label }) => (
                <span key={label} className="flex items-center gap-1.5 text-xs text-gray-500">
                    <span className="w-2.5 h-2.5 rounded-sm" style={{ background: color }} />
                    {label}
                </span>
            ))}
        </div>
    );


    return (
        <div className="space-y-5 p-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <MetricCard label="Chiffre d'affaires" value={`${financials.total_volume.toLocaleString()} MAD`} sub="Ce mois" />
                <MetricCard label="Bénéfice net" value={`${parseFloat(financials.net_profit).toFixed(2)} MAD`} sub={`${((financials.net_profit / financials.total_volume) * 100).toFixed(1)}% marge`} />
                <MetricCard label="Activités totales" value={activity.monthly_chart.reduce((s, m) => s + m.total, 0)} sub="Ce mois" />
                <MetricCard label="Note moyenne" value={`${activity.average_rating} / 5`} sub="Satisfaction" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                <div className="lg:col-span-3 bg-white border border-gray-200   p-4">
                    <p className="text-sm font-medium text-gray-500 mb-3">Revenus mensuels</p>
                    <Legend items={[{ color: '#185FA5', label: 'Volume total' }, { color: '#1D9E75', label: 'Bénéfice net' }]} />
                    <div className="h-52">
                        <Bar data={monthlyRevenue} options={barOptions} />
                    </div>
                </div>

                <div className="lg:col-span-2 bg-white border border-gray-200   p-4">
                    <p className="text-sm font-medium text-gray-500 mb-3">Répartition des activités</p>
                    <Legend items={[{ color: '#534AB7', label: 'Demande directe' }, { color: '#D85A30', label: 'Proposition' }]} />
                    <div className="h-52">
                        <Doughnut data={activityByType} options={{ responsive: true, maintainAspectRatio: false, cutout: '65%', plugins: { legend: { display: false } } }} />
                    </div>
                </div>
            </div>

            <div className="bg-white border border-gray-200   p-4">
                <p className="text-sm font-medium text-gray-500 mb-3">Revenus journaliers</p>
                <Legend items={[{ color: '#185FA5', label: 'Volume total' }, { color: '#1D9E75', label: 'Bénéfice net' }]} />
                <div className="h-44">
                    <Bar data={dailyRevenue} options={barOptions} />
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;