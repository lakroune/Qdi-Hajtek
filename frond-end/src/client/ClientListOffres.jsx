import React, { useState } from 'react';
import {
    MapPin, Calendar, Clock, Briefcase, DollarSign,
    AlertCircle, CheckCircle2, Timer, Eye,
    MoreVertical, Image as ImageIcon, Plus,
    Filter, ChevronRight, Star
} from 'lucide-react';

const ClientListOffres = () => {
    const [activeTab, setActiveTab] = useState('all');

    const myJobs = [
        {
            id: 1,
            title: "Réparation fuite d'eau cuisine",
            category: "Plomberie",
            status: "pending",
            date: "14 Mars 2024",
            location: "Casablanca, Maârif",
            budgetMin: 200,
            budgetMax: 500,
            proposals: 0,
            image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400&h=300&fit=crop",
            description: "Le tuyau sous l'évier fuit goutte à goutte depuis hier soir.",
            urgency: "urgent"
        },
        {
            id: 2,
            title: "Installation climatiseur Salon",
            category: "Climatisation",
            status: "active",
            date: "12 Mars 2024",
            location: "Casablanca, Sidi Maarouf",
            budgetMin: 600,
            budgetMax: 1000,
            proposals: 4,
            image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=400&h=300&fit=crop",
            description: "Besoin d'installer un Split 12000 BTU, support déjà fixé.",
            urgency: "standard"
        },
        {
            id: 3,
            title: "Peinture chambre enfant",
            category: "Peinture",
            status: "completed",
            date: "28 Fév 2024",
            location: "Casablanca, Ain Diab",
            budgetMin: 1500,
            budgetMax: 2000,
            proposals: 12,
            image: "https://images.unsplash.com/photo-1589939705384-5185138a04b9?q=80&w=400&h=300&fit=crop",
            description: "Peinture satinée rose et blanc pour une chambre de 12m2.",
            urgency: "planned"
        }
    ];

    const filteredJobs = activeTab === 'all'
        ? myJobs
        : myJobs.filter(job => job.status === activeTab);

    const getStatusConfig = (status) => {
        switch (status) {
            case 'pending':
                return {
                    label: 'En attente',
                    color: 'bg-amber-500',
                    lightColor: 'bg-amber-50 text-amber-700 border-amber-200',
                    icon: Timer
                };
            case 'active':
                return {
                    label: 'En ligne',
                    color: 'bg-green-500',
                    lightColor: 'bg-green-50 text-green-700 border-green-200',
                    icon: CheckCircle2
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
                    label: 'Inconnu',
                    color: 'bg-gray-500',
                    lightColor: 'bg-gray-100',
                    icon: AlertCircle
                };
        }
    };

    const getUrgencyConfig = (urgency) => {
        const configs = {
            urgent: { label: 'Urgent', color: 'bg-red-500 text-white' },
            standard: { label: 'Standard', color: 'bg-blue-500 text-white' },
            planned: { label: 'Planifié', color: 'bg-gray-500 text-white' }
        };
        return configs[urgency] || configs.planned;
    };

    return (
        <div className="min-h-screen bg-gray-50 mt-20 pb-8">

            <div className="bg-white   sticky top-0 z-10">
                <div className="w-[90%] mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-[22px] font-bold text-[#1B4F72]">Mes Offres</h1>
                            <p className="text-[12px] text-gray-500 mt-1">
                                {filteredJobs.length} offre{filteredJobs.length !== 1 ? 's' : ''} • Gérez vos demandes
                            </p>
                        </div>

                        <a
                            href="/client/nouvelle-offre"
                            className="flex items-center gap-2 px-5 py-2.5 bg-[#D35400] hover:bg-[#A04000] text-white text-[12px] font-semibold   transition-colors  "
                        >
                            <Plus className="w-4 h-4" />
                            Nouvelle offre
                        </a>
                    </div>

                    <div className="flex border-b border-gray-200 mt-6 overflow-x-auto no-scrollbar">
                        {[
                            { id: 'all', label: 'Toutes', count: myJobs.length },
                            { id: 'pending', label: 'En attente', count: myJobs.filter(j => j.status === 'pending').length },
                            { id: 'active', label: 'En ligne', count: myJobs.filter(j => j.status === 'active').length },
                            { id: 'completed', label: 'Terminées', count: myJobs.filter(j => j.status === 'completed').length }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`pb-3 px-4 text-[12px] font-semibold whitespace-nowrap transition-all border-b-2 flex items-center gap-2 ${activeTab === tab.id
                                    ? 'border-[#D35400] text-[#D35400]'
                                    : 'border-transparent text-gray-500 hover:text-[#1B4F72]'
                                    }`}
                            >
                                {tab.label}
                                <span className={`px-1.5 py-0.5  text-[10px] ${activeTab === tab.id ? 'bg-[#D35400]/10 text-[#D35400]' : 'bg-gray-100 text-gray-500'
                                    }`}>
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="w-[90%] mx-auto px-4 py-6">

                {filteredJobs.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-gray-100  flex items-center justify-center mx-auto mb-4">
                            <Briefcase className="w-12 h-12 text-gray-300" />
                        </div>
                        <h3 className="text-[16px] font-bold text-[#1B4F72] mb-2">Aucune offre</h3>
                        <p className="text-[12px] text-gray-500 mb-6">Commencez par créer votre première demande</p>
                        <a
                            href="/client/nouvelle-offre"
                            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1B4F72] hover:bg-[#D35400] text-white text-[12px] font-semibold   transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Créer une offre
                        </a>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filteredJobs.map((job) => {
                            const status = getStatusConfig(job.status);
                            const StatusIcon = status.icon;
                            const urgency = getUrgencyConfig(job.urgency);

                            return (
                                <div
                                    key={job.id}
                                    className="bg-white hover:border-[#D35400]      border border-gray-100 transition-all duration-300 overflow-hidden group"
                                >
                                    <div className="relative h-40 overflow-hidden">

                                        <div className="flex flex-col items-center justify-center h-full bg-gray-100 text-gray-400">
                                            <Briefcase className="w-12 h-12 text-[#1B4F72]/30" />
                                        </div>


                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                                        <div className="absolute top-3 left-3">
                                            <span className="px-2.5 py-1 bg-white/90 backdrop-blur text-[10px] font-bold text-[#1B4F72]   ">
                                                {job.category}
                                            </span>
                                        </div>

                                        <div className="absolute top-3 right-3">
                                            <span className={`flex items-center gap-1 px-2.5 py-1 ${status.lightColor}  text-[10px] font-bold  `}>
                                                <StatusIcon className="w-3 h-3" />
                                                {status.label}
                                            </span>
                                        </div>

                                        <div className="absolute bottom-3 left-3">
                                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${urgency.color}`}>
                                                {urgency.label}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-4 space-y-3">

                                        <div className="flex items-start justify-between gap-2">
                                            <h3 className="text-[14px] font-bold text-gray-800 leading-snug line-clamp-2 group-hover:text-[#1B4F72] transition-colors">
                                                {job.title}
                                            </h3>
                                            <button className="p-1 text-gray-300 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
                                            {job.description}
                                        </p>

                                        <div className="grid grid-cols-2 gap-2 pt-2">
                                            <div className="flex items-center gap-1.5 text-[11px] text-gray-600">
                                                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                                                <span className="truncate">{job.location}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-[11px] text-gray-600">
                                                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                                <span>{job.date}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 p-2 bg-gray-50  ">
                                            <DollarSign className="w-4 h-4 text-[#D35400]" />
                                            <span className="text-[13px] font-bold text-[#D35400]">
                                                {job.budgetMin.toLocaleString()} - {job.budgetMax.toLocaleString()} DH
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2 pt-2">
                                            {job.status === 'active' && (
                                                <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#D35400] hover:bg-[#A04000] text-white text-[11px] font-semibold   transition-colors">
                                                    <Eye className="w-3.5 h-3.5" />
                                                    {job.proposals} Proposition{job.proposals !== 1 ? 's' : ''}
                                                    <ChevronRight className="w-3.5 h-3.5" />
                                                </button>
                                            )}

                                            {job.status === 'pending' && (
                                                <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-amber-500 hover:bg-amber-600 text-white text-[11px] font-semibold   transition-colors">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    En attente de validation
                                                </button>
                                            )}

                                            {job.status === 'completed' && (
                                                <>
                                                    <button className="flex-1 py-2 border border-gray-200 hover:border-[#1B4F72] text-gray-600 hover:text-[#1B4F72] text-[11px] font-semibold   transition-colors">
                                                        Détails
                                                    </button>
                                                    <button className="flex items-center gap-1 px-3 py-2 bg-[#1B4F72] hover:bg-[#D35400] text-white text-[11px] font-semibold   transition-colors">
                                                        <Star className="w-3.5 h-3.5" />
                                                        Avis
                                                    </button>
                                                </>
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