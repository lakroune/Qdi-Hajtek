import React, { useEffect, useState } from 'react';
import {
    MapPin, Calendar, Briefcase, DollarSign,
    AlertCircle, CheckCircle2, Timer, Eye,
    MoreVertical, Plus,
    ChevronRight, Star,
    LoaderCircle,
    Pointer,
    RefreshCcw,
    RefreshCw
} from 'lucide-react';
import axiosClient from '../api/axios-client';
import toast from 'react-hot-toast';

const ClientListOffres = () => {
    const [offres, setOffres] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchOffres = async () => {
            try {
                const response = await axiosClient.get('/offres/me');
                setOffres(response.data);
            } catch (error) {
                toast.error('Error fetching offres:', error);
            }
            finally {
                setIsLoading(false);
            }
        }
        fetchOffres();
    }, []);

    const getStatusConfig = (status) => {
        switch (status) {
            case 'ouvert':
                return {
                    label: 'Ouvert',
                    color: 'bg-green-500',
                    lightColor: 'bg-green-50 text-green-700 border-green-200',
                    icon: CheckCircle2
                };
            case 'pending':
                return {
                    label: 'En attente',
                    color: 'bg-amber-500',
                    lightColor: 'bg-amber-50 text-amber-700 border-amber-200',
                    icon: Timer
                };
            case 'completed':
                return {
                    label: 'Terminée',
                    color: 'bg-gray-500',
                    lightColor: 'bg-gray-100 text-gray-700 border-gray-200',
                    icon: Briefcase
                };
            default:
                return {
                    label: status || 'Inconnu',
                    color: 'bg-gray-500',
                    lightColor: 'bg-gray-100 text-gray-700 border-gray-200',
                    icon: AlertCircle
                };
        }
    };

    const getUrgencyConfig = (urgency) => {
        const configs = {
            urgent: { label: 'Urgent', color: 'bg-red-500 text-white' },
            moyen: { label: 'Moyen', color: 'bg-amber-500 text-white' },
            standard: { label: 'Standard', color: 'bg-blue-500 text-white' }
        };
        return configs[urgency] || { label: urgency, color: 'bg-gray-500 text-white' };
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><RefreshCw className="animate-spin  w-12 h-12 text-[#D35400]" /></div>;
    }
    return (
        <div className="min-h-screen bg-gray-50 mt-20 pb-8">
            <div className="bg-white sticky top-12 z-10 border-b border-gray-100">
                <div className="w-[90%] mx-auto px-4 py-4">
                    <div className="flex   md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-[22px] font-bold text-[#1B4F72]">Mes Offres</h1>
                        </div>
                        <a
                            href="/nouvelle-offre"
                            className="flex items-center gap-2 px-5 py-2.5 bg-[#D35400] hover:bg-[#A04000] text-white text-[12px] font-semibold transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Nouvelle offre
                        </a>
                    </div>
                </div>
            </div>

            <div className="w-full mx-auto px-4 py-6">
                {offres.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-gray-100 flex items-center justify-center mx-auto mb-4">
                            <Briefcase className="w-12 h-12 text-gray-300" />
                        </div>
                        <h3 className="text-[16px] font-bold text-[#1B4F72] mb-2">Aucune offre</h3>
                        <p className="text-[12px] text-gray-500 mb-6">Commencez par créer votre première demande</p>

                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {offres.map((job) => {
                            const status = getStatusConfig(job.statut);
                            const StatusIcon = status.icon;
                            const urgency = getUrgencyConfig(job.niveau_urgence);

                            return (
                                <div
                                    key={job.id}
                                    className="bg-white   border border-gray-100 transition-all duration-300 overflow-hidden group"
                                >
                                    <div className="relative h-24 overflow-hidden">
                                        <div className="flex flex-col items-center justify-center h-full bg-gray-100 text-gray-400">
                                            <Briefcase className="w-12 h-12 text-[#1B4F72]/30" />
                                        </div>
                                        <div className="absolute inset-0   from-black/50 to-transparent" />
                                        <div className="absolute top-3 left-3">
                                            <span className="px-2.5 py-1 bg-white/90 backdrop-blur text-[10px] font-bold text-[#1B4F72]">
                                                {job.categorie?.nom_categorie}
                                            </span>
                                        </div>
                                        <div className="absolute top-3 right-3">
                                            <span className={`flex items-center gap-1 px-2.5 py-1 ${status.lightColor} text-[10px] font-bold border`}>
                                                <StatusIcon className="w-3 h-3" />
                                                {status.label}
                                            </span>
                                        </div>
                                        <div className="absolute bottom-3 left-3">
                                            <span className={`px-2 py-0.5    text-[9px] font-bold uppercase ${urgency.color}`}>
                                                {urgency.label}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-4 space-y-3">
                                        <div className="flex items-start justify-between gap-2">
                                            <h3 className="text-[14px] font-bold text-gray-800 leading-snug line-clamp-2 group-hover:text-[#1B4F72] transition-colors">
                                                {job.titre}
                                            </h3>
                                           
                                        </div>



                                        <div className=" flex flex-col gap-2">
                                            <div className="flex items-center gap-1.5 text-[11px] text-gray-600">
                                                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                                                <span className="truncate"> {job.ville} ,{job.address}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-[11px] text-gray-600">
                                                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                                <span>{new Date(job.preferred_date).toLocaleDateString('fr-FR')}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-[11px] text-gray-600">
                                                <DollarSign className="w-3.5 h-3.5 text-gray-400" />
                                                <span> {job.budget_estime} DH</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-[11px] text-gray-600">
                                                <Pointer className="w-3.5 h-3.5 text-gray-400" />
                                                <span> {job.propositions_count} propositions</span>
                                            </div>
                                        </div>



                                        <div className="flex items-center gap-2 pt-2">
                                            {job.statut === 'ouvert' && (
                                                <a href={`/mes-offres/${job.id}`} className='flex-1 flex items-center justify-center   bg-[#D35400] hover:bg-[#A04000] text-white text-[11px] font-semibold transition-colors'>
                                                    <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#D35400] hover:bg-[#A04000] text-white text-[11px] font-semibold transition-colors">
                                                        <Eye className="w-3.5 h-3.5" />
                                                        Voir les propositions
                                                        <ChevronRight className="w-3.5 h-3.5" />
                                                    </button>
                                                </a>
                                            )}
                                            {job.is_completed && (
                                                <button className="flex items-center gap-1 px-3 py-2 bg-[#1B4F72] hover:bg-[#D35400] text-white text-[11px] font-semibold transition-colors">
                                                    <Star className="w-3.5 h-3.5" />
                                                    Laisser un avis
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClientListOffres;