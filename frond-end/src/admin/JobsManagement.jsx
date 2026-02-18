import React, { useState } from 'react';
import { 
    FileText, Search, CheckCircle, XCircle, Eye, 
    Clock, User, MapPin, DollarSign, Calendar, Filter,
    AlertTriangle, Briefcase, Phone, Mail, MoreHorizontal
} from 'lucide-react';

const JobsManagement = () => {
    const [filter, setFilter] = useState('pending');
    const [selectedJob, setSelectedJob] = useState(null);

    const jobs = [
        {
            id: 'JOB-001',
            client: { name: 'Ahmed Benali', phone: '+212 6 11 22 33 44', email: 'ahmed@email.com', city: 'Casablanca' },
            title: 'Fuite d\'eau urgente salle de bain',
            category: 'Plomberie',
            description: 'Fuite importante sous le lavabo, besoin d\'intervention dans l\'heure. Immeuble résidentiel au 3ème étage.',
            budget: '200-400 DH',
            urgency: 'urgent', // urgent | standard | planned
            location: 'Casablanca, Anfa',
            status: 'pending',
            submittedAt: '2024-01-15 08:15',
            preferredDate: '2024-01-15',
            notes: ''
        },
        {
            id: 'JOB-002',
            client: { name: 'Sofia Alaoui', phone: '+212 6 22 33 44 55', email: 'sofia@email.com', city: 'Rabat' },
            title: 'Installation luminaires salon + chambres',
            category: 'Électricité',
            description: '4 luminaires à installer, câblage déjà existant. Disponible samedi ou dimanche.',
            budget: '500-800 DH',
            urgency: 'standard',
            location: 'Rabat, Agdal',
            status: 'approved',
            submittedAt: '2024-01-14 16:30',
            approvedAt: '2024-01-14 18:00',
            approvedBy: 'Admin',
            preferredDate: '2024-01-20',
            notes: 'Client fidèle, OK pour publication'
        },
        {
            id: 'JOB-003',
            client: { name: 'Karim Tazi', phone: '+212 6 33 44 55 66', email: 'karim@email.com', city: 'Marrakech' },
            title: 'Rénovation complète cuisine',
            category: 'Plomberie',
            description: 'Démontage ancienne cuisine, nouvelle installation évier, robinetterie, électroménager.',
            budget: '15000+ DH',
            urgency: 'planned',
            location: 'Marrakech, Guéliz',
            status: 'rejected',
            submittedAt: '2024-01-13 10:00',
            rejectedAt: '2024-01-13 14:20',
            rejectedBy: 'Admin',
            rejectionReason: 'Budget non réaliste pour la description, demander devis détaillé',
            preferredDate: '2024-02-01',
            notes: ''
        }
    ];

    const filteredJobs = jobs.filter(j => filter === 'all' || j.status === filter);

    const getStatusBadge = (status) => {
        const styles = {
            pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
            approved: 'bg-green-100 text-green-700 border-green-200',
            rejected: 'bg-red-100 text-red-700 border-red-200'
        };
        const labels = { pending: 'En attente', approved: 'Approuvée', rejected: 'Rejetée' };
        return (
            <span className={`px-2 py-1 text-[10px] font-medium border ${styles[status]}`}>
                {labels[status]}
            </span>
        );
    };

    const getUrgencyBadge = (urgency) => {
        const styles = {
            urgent: 'bg-red-100 text-red-700',
            standard: 'bg-blue-100 text-blue-700',
            planned: 'bg-gray-100 text-gray-700'
        };
        const labels = { urgent: 'Urgent', standard: 'Standard', planned: 'Planifié' };
        return <span className={`px-2 py-0.5 text-[9px] font-medium ${styles[urgency]}`}>{labels[urgency]}</span>;
    };

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
                    <p className="text-[11px] text-gray-500">Approbation des demandes de service des clients</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Rechercher une offre..."
                            className="pl-9 pr-4 py-2 text-[12px] border border-gray-200 focus:border-[#1B4F72] focus:outline-none w-56"
                        />
                    </div>
                    <select 
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-3 py-2 text-[12px] border border-gray-200 focus:border-[#1B4F72] focus:outline-none bg-white"
                    >
                        <option value="all">Tous les statuts</option>
                        <option value="pending">En attente ({jobs.filter(j => j.status === 'pending').length})</option>
                        <option value="approved">Approuvées</option>
                        <option value="rejected">Rejetées</option>
                    </select>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
                <div className="bg-white border border-gray-200 p-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                        <p className="text-[20px] font-bold text-[#1B4F72]">
                            {jobs.filter(j => j.status === 'pending').length}
                        </p>
                        <p className="text-[10px] text-gray-500">En attente</p>
                    </div>
                </div>
                <div className="bg-white border border-gray-200 p-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                        <p className="text-[20px] font-bold text-[#1B4F72]">
                            {jobs.filter(j => j.status === 'approved').length}
                        </p>
                        <p className="text-[10px] text-gray-500">Approuvées</p>
                    </div>
                </div>
                <div className="bg-white border border-gray-200 p-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 flex items-center justify-center">
                        <XCircle className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                        <p className="text-[20px] font-bold text-[#1B4F72]">
                            {jobs.filter(j => j.status === 'rejected').length}
                        </p>
                        <p className="text-[10px] text-gray-500">Rejetées</p>
                    </div>
                </div>
                <div className="bg-white border border-gray-200 p-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#D35400]/10 flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-[#D35400]" />
                    </div>
                    <div>
                        <p className="text-[20px] font-bold text-[#1B4F72]">
                            {jobs.filter(j => j.urgency === 'urgent' && j.status === 'pending').length}
                        </p>
                        <p className="text-[10px] text-gray-500">Urgences</p>
                    </div>
                </div>
            </div>

            {/* Alert urgences */}
            {jobs.filter(j => j.urgency === 'urgent' && j.status === 'pending').length > 0 && (
                <div className="bg-red-50 border border-red-200 p-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <p className="text-[11px] text-red-700">
                        <strong>{jobs.filter(j => j.urgency === 'urgent' && j.status === 'pending').length} urgence(s)</strong> en attente d'approbation
                    </p>
                </div>
            )}

            {/* Table */}
            <div className="bg-white border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600">Offre</th>
                                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600">Client</th>
                                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600">Budget</th>
                                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600">Urgence</th>
                                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600">Statut</th>
                                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredJobs.map((job) => (
                                <tr key={job.id} className={`hover:bg-gray-50 ${job.urgency === 'urgent' && job.status === 'pending' ? 'bg-red-50/30' : ''}`}>
                                    <td className="px-4 py-3">
                                        <div>
                                            <p className="text-[12px] font-medium text-[#1B4F72]">{job.title}</p>
                                            <p className="text-[10px] text-gray-500 flex items-center gap-1">
                                                <Briefcase className="w-3 h-3" />
                                                {job.category}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-blue-100 flex items-center justify-center">
                                                <span className="text-[10px] font-bold text-blue-600">
                                                    {job.client.name.charAt(0)}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-medium text-gray-700">{job.client.name}</p>
                                                <p className="text-[9px] text-gray-400">{job.client.city}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <p className="text-[12px] font-semibold text-[#D35400]">{job.budget}</p>
                                    </td>
                                    <td className="px-4 py-3">
                                        {getUrgencyBadge(job.urgency)}
                                    </td>
                                    <td className="px-4 py-3">
                                        {getStatusBadge(job.status)}
                                        {job.status === 'approved' && job.approvedAt && (
                                            <p className="text-[9px] text-gray-400 mt-1">
                                                Approuvée le {job.approvedAt}
                                            </p>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1">
                                            <button 
                                                onClick={() => setSelectedJob(job)}
                                                className="p-1.5 text-gray-400 hover:text-[#1B4F72] hover:bg-[#1B4F72]/10 transition-colors"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            
                                            {job.status === 'pending' && (
                                                <>
                                                    <button 
                                                        onClick={() => handleApprove(job.id)}
                                                        className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors"
                                                    >
                                                        <CheckCircle className="w-4 h-4" />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleReject(job.id)}
                                                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                                    >
                                                        <XCircle className="w-4 h-4" />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Détail */}
            {selectedJob && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-200">
                        <div className="p-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
                            <div>
                                <h3 className="text-[14px] font-bold text-[#1B4F72]">{selectedJob.title}</h3>
                                <p className="text-[10px] text-gray-500">{selectedJob.id}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                {getUrgencyBadge(selectedJob.urgency)}
                                <button 
                                    onClick={() => setSelectedJob(null)}
                                    className="text-gray-400 hover:text-[#D35400]"
                                >
                                    <XCircle className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="p-4 space-y-4">
                            {/* Status */}
                            <div className={`
                                p-3 border
                                ${selectedJob.status === 'pending' ? 'bg-yellow-50 border-yellow-200' : ''}
                                ${selectedJob.status === 'approved' ? 'bg-green-50 border-green-200' : ''}
                                ${selectedJob.status === 'rejected' ? 'bg-red-50 border-red-200' : ''}
                            `}>
                                <div className="flex items-center gap-2">
                                    {selectedJob.status === 'pending' && <Clock className="w-4 h-4 text-yellow-600" />}
                                    {selectedJob.status === 'approved' && <CheckCircle className="w-4 h-4 text-green-600" />}
                                    {selectedJob.status === 'rejected' && <XCircle className="w-4 h-4 text-red-600" />}
                                    <span className="text-[12px] font-medium">
                                        {selectedJob.status === 'pending' && 'En attente de votre approbation'}
                                        {selectedJob.status === 'approved' && `Approuvée le ${selectedJob.approvedAt} par ${selectedJob.approvedBy}`}
                                        {selectedJob.status === 'rejected' && `Rejetée le ${selectedJob.rejectedAt} par ${selectedJob.rejectedBy}`}
                                    </span>
                                </div>
                                {selectedJob.status === 'rejected' && selectedJob.rejectionReason && (
                                    <p className="mt-2 text-[11px] text-red-600">
                                        Motif: {selectedJob.rejectionReason}
                                    </p>
                                )}
                            </div>

                            {/* Client info */}
                            <div className="border border-gray-200 p-4">
                                <h4 className="text-[12px] font-semibold text-[#1B4F72] mb-3 flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    Client
                                </h4>
                                <div className="flex items-start gap-3">
                                    <div className="w-12 h-12 bg-blue-100 flex items-center justify-center">
                                        <span className="text-[16px] font-bold text-blue-600">
                                            {selectedJob.client.name.charAt(0)}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[13px] font-semibold text-[#1B4F72]">{selectedJob.client.name}</p>
                                        <div className="mt-2 space-y-1 text-[11px] text-gray-500">
                                            <p className="flex items-center gap-2">
                                                <Phone className="w-3.5 h-3.5" />
                                                {selectedJob.client.phone}
                                            </p>
                                            <p className="flex items-center gap-2">
                                                <Mail className="w-3.5 h-3.5" />
                                                {selectedJob.client.email}
                                            </p>
                                            <p className="flex items-center gap-2">
                                                <MapPin className="w-3.5 h-3.5" />
                                                {selectedJob.client.city}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Job details */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="border border-gray-200 p-3">
                                    <p className="text-[10px] text-gray-500 mb-1">Catégorie</p>
                                    <p className="text-[12px] font-medium text-[#1B4F72]">{selectedJob.category}</p>
                                </div>
                                <div className="border border-gray-200 p-3">
                                    <p className="text-[10px] text-gray-500 mb-1">Localisation</p>
                                    <p className="text-[12px] font-medium text-[#1B4F72] flex items-center gap-1">
                                        <MapPin className="w-3.5 h-3.5" />
                                        {selectedJob.location}
                                    </p>
                                </div>
                                <div className="border border-gray-200 p-3">
                                    <p className="text-[10px] text-gray-500 mb-1">Budget</p>
                                    <p className="text-[14px] font-bold text-[#D35400]">{selectedJob.budget}</p>
                                </div>
                                <div className="border border-gray-200 p-3">
                                    <p className="text-[10px] text-gray-500 mb-1">Date souhaitée</p>
                                    <p className="text-[12px] font-medium text-[#1B4F72] flex items-center gap-1">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {selectedJob.preferredDate}
                                    </p>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="border border-gray-200 p-3">
                                <p className="text-[10px] text-gray-500 mb-2">Description du besoin</p>
                                <p className="text-[12px] text-gray-700 leading-relaxed">
                                    {selectedJob.description}
                                </p>
                            </div>

                            {/* Actions */}
                            {selectedJob.status === 'pending' && (
                                <div className="flex gap-3 pt-4 border-t border-gray-200">
                                    <button 
                                        onClick={() => handleApprove(selectedJob.id)}
                                        className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white text-[12px] font-medium transition-colors flex items-center justify-center gap-2"
                                    >
                                        <CheckCircle className="w-4 h-4" />
                                        Approuver et publier
                                    </button>
                                    <button 
                                        onClick={() => handleReject(selectedJob.id)}
                                        className="flex-1 py-3 border border-red-500 text-red-500 hover:bg-red-50 text-[12px] font-medium transition-colors flex items-center justify-center gap-2"
                                    >
                                        <XCircle className="w-4 h-4" />
                                        Rejeter
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