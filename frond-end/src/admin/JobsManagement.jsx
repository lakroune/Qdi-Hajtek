import React, { useState } from 'react';
import { 
    FileText, Search, Filter, Grid, List, 
    CheckCircle, XCircle, AlertTriangle 
} from 'lucide-react';
import JobCard from '../components/cards/JobCard';

const JobsManagement = () => {
    const [viewMode, setViewMode] = useState('grid');
    const [filter, setFilter] = useState('pending');
    const [selectedJob, setSelectedJob] = useState(null);

    const jobs = [
        {
            id: 'JOB-001',
            title: 'Fuite d\'eau urgente salle de bain - Intervention immédiate',
            category: 'Plomberie',
            description: 'Fuite importante sous le lavabo depuis ce matin. Eau qui coule continuellement. Besoin d\'intervention dans l\'heure si possible. Immeuble résidentiel au 3ème étage, accès facile.',
            budget: '200-400 DH',
            urgency: 'urgent',
            location: 'Casablanca, Anfa',
            preferredDate: 'Aujourd\'hui',
            publishedAt: 'il y a 2h',
            status: 'pending',
            
            client: {
                name: 'Ahmed Benali',
                phone: '+212 6 11 22 33 44',
                email: 'ahmed.benali@email.com',
                city: 'Casablanca',
                memberSince: '2023-06-15',
                completedJobs: 12
            }
        },
        {
            id: 'JOB-002',
            title: 'Installation luminaires salon + 2 chambres',
            category: 'Électricité',
            description: '4 luminaires à installer (lustre salon + 3 suspensions chambres). Câblage déjà existant, juste à remplacer anciens luminaires. Disponible samedi ou dimanche matin.',
            budget: '500-800 DH',
            urgency: 'standard',
            location: 'Rabat, Agdal',
            preferredDate: '2024-01-20',
            publishedAt: '2024-01-14',
            status: 'approved',
            approvedAt: '2024-01-14 18:00',
            approvedBy: 'Admin',
            
            client: {
                name: 'Sofia Alaoui',
                phone: '+212 6 22 33 44 55',
                email: 'sofia.alaoui@email.com',
                city: 'Rabat',
                memberSince: '2023-08-20',
                completedJobs: 5
            }
        },
        {
            id: 'JOB-003',
            title: 'Rénovation complète cuisine 15m²',
            category: 'Plomberie',
            description: 'Démontage ancienne cuisine, nouvelle installation évier, robinetterie, raccordement électroménager (four, plaques, hotte). Carrelage et peinture à prévoir aussi.',
            budget: '15000+ DH',
            urgency: 'planned',
            location: 'Marrakech, Guéliz',
            preferredDate: '2024-02-01',
            publishedAt: '2024-01-13',
            status: 'rejected',
            rejectedAt: '2024-01-13 15:30',
            rejectedBy: 'Admin',
            rejectionReason: 'Budget non réaliste pour la description fournie. Demander devis détaillé et préciser les travaux.',
            
            client: {
                name: 'Karim Tazi',
                phone: '+212 6 33 44 55 66',
                email: 'karim.tazi@email.com',
                city: 'Marrakech',
                memberSince: '2023-11-05',
                completedJobs: 2
            }
        }
    ];

    const filteredJobs = jobs.filter(j => filter === 'all' || j.status === filter);

    const handleApprove = (id) => {
        console.log('Approuver offre', id);
    };

    const handleReject = (id) => {
        console.log('Rejeter offre', id);
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-[18px] font-bold text-[#1B4F72]">Gestion des Offres</h1>
                    <p className="text-[11px] text-gray-500">
                        {jobs.filter(j => j.status === 'pending').length} offre(s) en attente d'approbation
                        {jobs.filter(j => j.urgency === 'urgent' && j.status === 'pending').length > 0 && (
                            <span className="text-red-500 ml-2">
                                ({jobs.filter(j => j.urgency === 'urgent' && j.status === 'pending').length} urgente(s))
                            </span>
                        )}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Rechercher une offre..."
                            className="pl-9 pr-4 py-2 text-[12px] border border-gray-200 focus:border-[#1B4F72] focus:outline-none w-64"
                        />
                    </div>
                    <select 
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-3 py-2 text-[12px] border border-gray-200 focus:border-[#1B4F72] focus:outline-none bg-white"
                    >
                        <option value="all">Tous les statuts</option>
                        <option value="pending">En attente</option>
                        <option value="approved">Approuvées</option>
                        <option value="rejected">Rejetées</option>
                    </select>
                    <div className="flex border border-gray-200">
                        <button 
                            onClick={() => setViewMode('grid')}
                            className={`p-2 ${viewMode === 'grid' ? 'bg-[#1B4F72] text-white' : 'text-gray-400 hover:text-[#1B4F72]'}`}
                        >
                            <Grid className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={() => setViewMode('list')}
                            className={`p-2 ${viewMode === 'list' ? 'bg-[#1B4F72] text-white' : 'text-gray-400 hover:text-[#1B4F72]'}`}
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Alert Urgences */}
            {jobs.filter(j => j.urgency === 'urgent' && j.status === 'pending').length > 0 && (
                <div className="bg-red-50 border border-red-200 p-3 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <p className="text-[12px] text-red-700">
                        <strong>Attention:</strong> {jobs.filter(j => j.urgency === 'urgent' && j.status === 'pending').length} offre(s) urgente(s) nécessitent une approbation rapide
                    </p>
                </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-5 gap-3">
                {[
                    { label: 'En attente', value: jobs.filter(j => j.status === 'pending').length, color: 'bg-yellow-500' },
                    { label: 'Urgentes', value: jobs.filter(j => j.urgency === 'urgent' && j.status === 'pending').length, color: 'bg-red-500' },
                    { label: 'Approuvées', value: jobs.filter(j => j.status === 'approved').length, color: 'bg-green-500' },
                    { label: 'Rejetées', value: jobs.filter(j => j.status === 'rejected').length, color: 'bg-gray-500' },
                    { label: 'Total', value: jobs.length, color: 'bg-[#1B4F72]' }
                ].map((stat) => (
                    <div key={stat.label} className="bg-white border border-gray-200 p-3 flex items-center gap-3">
                        <div className={`w-10 h-10 ${stat.color} flex items-center justify-center`}>
                            <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-[18px] font-bold text-[#1B4F72]">{stat.value}</p>
                            <p className="text-[10px] text-gray-500">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Jobs Grid/List */}
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredJobs.map((job) => (
                        <JobCard 
                            key={job.id}
                            job={job}
                            onApprove={handleApprove}
                            onReject={handleReject}
                            onView={setSelectedJob}
                            layout="grid"
                        />
                    ))}
                </div>
            ) : (
                <div className="space-y-2">
                    {filteredJobs.map((job) => (
                        <JobCard 
                            key={job.id}
                            job={job}
                            onApprove={handleApprove}
                            onReject={handleReject}
                            onView={setSelectedJob}
                            layout="list"
                        />
                    ))}
                </div>
            )}

            {/* Detail Modal - Similar structure to ServicesManagement */}
            {selectedJob && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
                    <div className="bg-white w-full max-w-3xl my-8 border border-gray-200">
                        {/* Header */}
                        <div className={`
                            h-2 
                            ${selectedJob.urgency === 'urgent' ? 'bg-red-500' : 
                              selectedJob.urgency === 'standard' ? 'bg-blue-500' : 'bg-gray-500'}
                        `}></div>
                        <div className="p-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
                            <div className="flex items-center gap-3">
                                <h3 className="text-[16px] font-bold text-[#1B4F72]">{selectedJob.title}</h3>
                                <span className={`
                                    px-2 py-0.5 text-[10px] font-bold text-white
                                    ${selectedJob.urgency === 'urgent' ? 'bg-red-500' : 
                                      selectedJob.urgency === 'standard' ? 'bg-blue-500' : 'bg-gray-500'}
                                `}>
                                    {selectedJob.urgency === 'urgent' ? 'URGENT' : 
                                     selectedJob.urgency === 'standard' ? 'STANDARD' : 'PLANIFIÉ'}
                                </span>
                            </div>
                            <button 
                                onClick={() => setSelectedJob(null)}
                                className="p-2 text-gray-400 hover:text-[#D35400]"
                            >
                                <XCircle className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Status & Budget */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className={`
                                    p-4 border
                                    ${selectedJob.status === 'pending' ? 'bg-yellow-50 border-yellow-200' : ''}
                                    ${selectedJob.status === 'approved' ? 'bg-green-50 border-green-200' : ''}
                                    ${selectedJob.status === 'rejected' ? 'bg-red-50 border-red-200' : ''}
                                `}>
                                    <p className="text-[11px] text-gray-500 mb-1">Statut</p>
                                    <p className="text-[14px] font-semibold">
                                        {selectedJob.status === 'pending' ? 'En attente d\'approbation' :
                                         selectedJob.status === 'approved' ? `Approuvée le ${selectedJob.approvedAt}` :
                                         `Rejetée le ${selectedJob.rejectedAt}`}
                                    </p>
                                    {selectedJob.rejectionReason && (
                                        <p className="mt-2 text-[11px] text-red-600">
                                            Motif: {selectedJob.rejectionReason}
                                        </p>
                                    )}
                                </div>
                                <div className="bg-[#D35400]/10 p-4 border border-[#D35400]/20">
                                    <p className="text-[11px] text-gray-500 mb-1">Budget indicatif</p>
                                    <p className="text-[24px] font-bold text-[#D35400]">{selectedJob.budget}</p>
                                </div>
                            </div>

                            {/* Client Info */}
                            <div className="border border-gray-200 p-4">
                                <h4 className="text-[13px] font-bold text-[#1B4F72] mb-4">Informations Client</h4>
                                <div className="flex items-start gap-4">
                                    <div className="w-16 h-16 bg-blue-100 flex items-center justify-center">
                                        <span className="text-[24px] font-bold text-blue-600">
                                            {selectedJob.client.name.charAt(0)}
                                        </span>
                                    </div>
                                    <div className="flex-1 grid grid-cols-2 gap-3">
                                        <div>
                                            <p className="text-[10px] text-gray-400">Nom complet</p>
                                            <p className="text-[13px] font-medium text-[#1B4F72]">{selectedJob.client.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-400">Téléphone</p>
                                            <p className="text-[13px] font-medium text-[#1B4F72]">{selectedJob.client.phone}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-400">Email</p>
                                            <p className="text-[12px] text-gray-600">{selectedJob.client.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-400">Ville</p>
                                            <p className="text-[13px] font-medium text-[#1B4F72]">{selectedJob.client.city}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-400">Membre depuis</p>
                                            <p className="text-[12px] text-gray-600">{selectedJob.client.memberSince}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-400">Jobs complétés</p>
                                            <p className="text-[12px] text-gray-600">{selectedJob.client.completedJobs}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Job Details */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="border border-gray-200 p-3">
                                    <p className="text-[10px] text-gray-400 mb-1">Catégorie</p>
                                    <p className="text-[13px] font-medium text-[#1B4F72]">{selectedJob.category}</p>
                                </div>
                                <div className="border border-gray-200 p-3">
                                    <p className="text-[10px] text-gray-400 mb-1">Localisation</p>
                                    <p className="text-[13px] font-medium text-[#1B4F72]">{selectedJob.location}</p>
                                </div>
                                <div className="border border-gray-200 p-3">
                                    <p className="text-[10px] text-gray-400 mb-1">Date souhaitée</p>
                                    <p className="text-[13px] font-medium text-[#1B4F72]">{selectedJob.preferredDate}</p>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="border border-gray-200 p-4">
                                <h4 className="text-[12px] font-bold text-[#1B4F72] mb-2">Description du besoin</h4>
                                <p className="text-[13px] text-gray-700 leading-relaxed">
                                    {selectedJob.description}
                                </p>
                            </div>

                            {/* Actions */}
                            {selectedJob.status === 'pending' && (
                                <div className="flex gap-3 pt-4 border-t border-gray-200">
                                    <button 
                                        onClick={() => handleApprove(selectedJob.id)}
                                        className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white text-[13px] font-medium transition-colors flex items-center justify-center gap-2"
                                    >
                                        <CheckCircle className="w-5 h-5" />
                                        Approuver et publier
                                    </button>
                                    <button 
                                        onClick={() => handleReject(selectedJob.id)}
                                        className="flex-1 py-3 border border-red-500 text-red-500 hover:bg-red-50 text-[13px] font-medium transition-colors flex items-center justify-center gap-2"
                                    >
                                        <XCircle className="w-5 h-5" />
                                        Rejeter l'offre
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobsManagement;