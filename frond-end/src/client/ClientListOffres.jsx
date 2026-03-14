import React, { useState } from 'react';
import {
    MapPin, Calendar,
    ChevronRight, Briefcase,
    AlertCircle, CheckCircle2, Timer,
    MoreVertical, ExternalLink, Image as ImageIcon
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
            budget: "200 - 500 DH",
            proposals: 0,
            image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=200&h=150&fit=crop",
            description: "Le tuyau sous l'évier fuit goutte à goutte depuis hier soir."
        },
        {
            id: 2,
            title: "Installation climatiseur Salon",
            category: "Climatisation",
            status: "active",
            date: "12 Mars 2024",
            location: "Casablanca, Sidi Maarouf",
            budget: "600 - 1000 DH",
            proposals: 4,
            image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=200&h=150&fit=crop",
            description: "Besoin d'installer un Split 12000 BTU, support déjà fixé."
        },
        {
            id: 3,
            title: "Peinture chambre enfant",
            category: "Peinture",
            status: "completed",
            date: "28 Fév 2024",
            location: "Casablanca, Ain Diab",
            budget: "1500 - 2000 DH",
            proposals: 12,
            image: "https://images.unsplash.com/photo-1589939705384-5185138a04b9?q=80&w=200&h=150&fit=crop",
            description: "Peinture satinée rose et blanc pour une chambre de 12m2."
        }
    ];

    const filteredJobs = activeTab === 'all'
        ? myJobs
        : myJobs.filter(job => job.status === activeTab);

    const getStatusStyle = (status) => {
        switch (status) {
            case 'pending': return { label: 'En attente', color: 'bg-amber-100 text-amber-700 border-amber-200', icon: Timer };
            case 'active': return { label: 'En ligne', color: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle2 };
            case 'completed': return { label: 'Terminée', color: 'bg-gray-100 text-gray-700 border-gray-200', icon: Briefcase };
            default: return { label: 'Inconnu', color: 'bg-gray-100', icon: AlertCircle };
        }
    };

    return (
        <div className="min-h-screen mt-6 bg-[#F8FAFC]">
            <div className="w-[95%] max-w-5xl mx-auto px-4 py-8">

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-2xl font-bold text-[#1B4F72]">Mes Offres</h1>
                        <p className="text-sm text-gray-500 mt-1">Suivez l'état de vos demandes de services</p>
                    </div>

                </div>

                <div className="flex border-b border-gray-200 mb-8 overflow-x-auto no-scrollbar">
                    {['all', 'pending', 'active', 'completed'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-4 px-4 text-sm font-bold whitespace-nowrap transition-all border-b-2 ${activeTab === tab
                                ? 'border-[#D35400] text-[#D35400]'
                                : 'border-transparent text-gray-400 hover:text-[#1B4F72]'
                                }`}
                        >
                            {tab === 'all' && 'Toutes les offres'}
                            {tab === 'pending' && 'En attente'}
                            {tab === 'active' && 'En ligne'}
                            {tab === 'completed' && 'Terminées'}
                        </button>
                    ))}
                </div>

                <div className="grid gap-4">
                    {filteredJobs.map((job) => {
                        const status = getStatusStyle(job.status);
                        const StatusIcon = status.icon;

                        return (
                            <div key={job.id} className="bg-white border border-gray-200 overflow-hidden hover:border-[#1B4F72]/30 transition-all group">
                                <div className="flex flex-col sm:flex-row">

                                    <div className="w-full sm:w-48 h-40 sm:h-auto relative bg-gray-100 overflow-hidden">
                                        {job.image ? (
                                            <img
                                                src={job.image}
                                                alt={job.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                                <ImageIcon className="w-8 h-8 mb-2" />
                                                <span className="text-[10px]">Aucune photo</span>
                                            </div>
                                        )}
                                        <div className="absolute top-2 left-2">
                                            <span className="text-[9px] uppercase font-bold bg-white/90 text-[#1B4F72] px-2 py-1 shadow-sm">
                                                {job.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex-1 p-5 flex flex-col justify-between">
                                        <div className="flex justify-between items-start gap-4">
                                            <div className="space-y-2">
                                                <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 border text-[10px] font-bold uppercase tracking-wider ${status.color}`}>
                                                    <StatusIcon className="w-3 h-3" />
                                                    {status.label}
                                                </div>
                                                <h3 className="text-[12px] font-bold text-[#1B4F72] group-hover:text-[#D35400] transition-colors">
                                                    {job.title}
                                                </h3>
                                                <p className="text-xs text-gray-500 line-clamp-1">{job.description}</p>
                                            </div>
                                            <button className="text-gray-300 hover:text-gray-600 transition-colors">
                                                <MoreVertical className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                                            <div className="flex flex-wrap gap-x-5 gap-y-2">
                                                <div className="flex items-center gap-1.5 text-gray-500">
                                                    <MapPin className="w-3.5 h-3.5" />
                                                    <span className="text-xs font-medium">{job.location}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-gray-500">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    <span className="text-xs font-medium">{job.date}</span>
                                                </div>
                                                <div className="text-[#1B4F72] font-bold text-xs bg-[#1B4F72]/5 px-2 py-0.5">
                                                    Budget: {job.budget}
                                                </div>
                                            </div>

                                            {job.status === 'active' && (
                                                <button className="flex items-center gap-2 bg-[#D35400] text-white px-4 py-2 text-xs font-bold hover:bg-[#A04000] transition-colors ml-auto">
                                                    {job.proposals} Propositions <ChevronRight className="w-4 h-4" />
                                                </button>
                                            )}

                                            {job.status === 'completed' && (
                                                <button className="text-xs font-bold text-[#1B4F72] underline underline-offset-4 decoration-[#D35400]">
                                                    Voir le compte rendu
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {filteredJobs.length === 0 && (
                    <div className="mt-12 bg-white border border-dashed border-gray-300 py-20 px-4 text-center">
                        <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Briefcase className="w-10 h-10 text-gray-300" />
                        </div>
                        <h3 className="text-[12px] font-bold text-[#1B4F72]">Rien à afficher ici</h3>
                        <p className="text-sm text-gray-500 mb-8">Aucune offre ne correspond à ce statut pour le moment.</p>
                        <button onClick={() => setActiveTab('all')} className="text-[#D35400] font-bold text-sm underline">Voir toutes mes offres</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClientListOffres;