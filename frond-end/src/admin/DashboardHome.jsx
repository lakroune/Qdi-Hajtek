import {
    Flag, Star, User, Briefcase,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardHome = () => {
    const stats = [
        { id: 1, label: 'Signalements', value: 12, icon: Flag, color: 'bg-red-100 text-red-600', path: '/admin/reports' },
        { id: 2, label: 'Nouveaux avis', value: 8, icon: Star, color: 'bg-yellow-100 text-yellow-600', path: '/admin/reviews' },
        { id: 3, label: 'Demandes artisan', value: 5, icon: User, color: 'bg-blue-100 text-blue-600', path: '/admin/artisan-requests' },
        { id: 4, label: 'Offres emploi', value: 3, icon: Briefcase, color: 'bg-green-100 text-green-600', path: '/admin/jobs' },
    ];



    return (
        <div className="space-y-6">

            <div className="grid  grid-cols-4 gap-4 bg-white p-1 border border-gray-200 rounded-lg  ">
                {stats.map((stat) => (
                    <Link
                        key={stat.id}
                        to={stat.path}
                        className="bg-white border border-gray-200  flex flex-col  p-1 rounded-lg"
                    >
                        <div className="flex items-center justify-between  ">
                            <div className={`w-10 h-10 ${stat.color} flex items-center justify-center rounded-full `}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <p className="hidden lg:block  text-[11px] text-gray-600">{stat.label}</p>
                            <span className="text-[20px] font-bold text-[#1B4F72]">{stat.value}</span>
                        </div>

                    </Link>
                ))}
            </div>




        </div>
    );
};

export default DashboardHome;