import React, { useState } from 'react';
import { 
    Flag, Search, Filter, CheckCircle, XCircle, 
    Eye, MoreHorizontal, AlertTriangle, Clock, User 
} from 'lucide-react';

const ReportsManagement = () => {
    const [filter, setFilter] = useState('all');
    const [selectedReport, setSelectedReport] = useState(null);

    const reports = [
        { 
            id: 1234, 
            type: 'artisan', 
            subject: 'Karim Plombier',
            reporter: 'Ahmed Client',
            reason: 'Non professionnel',
            description: 'L\'artisan est arrivé en retard de 3h et n\'a pas terminé le travail',
            date: '2024-01-15 14:30',
            status: 'pending',
            priority: 'high'
        },
        { 
            id: 1235, 
            type: 'client', 
            subject: 'Ahmed Benali',
            reporter: 'Karim Plombier',
            reason: 'Non paiement',
            description: 'Le client refuse de payer la totalité du devis convenu',
            date: '2024-01-15 10:15',
            status: 'resolved',
            priority: 'medium'
        },
        { 
            id: 1236, 
            type: 'service', 
            subject: 'Intervention #4567',
            reporter: 'Sofia Menuiserie',
            reason: 'Litige qualité',
            description: 'Le client n\'est pas satisfait de la qualité des matériaux',
            date: '2024-01-14 16:45',
            status: 'investigating',
            priority: 'low'
        },
    ];

    const getStatusBadge = (status) => {
        const styles = {
            pending: 'bg-yellow-100 text-yellow-700',
            investigating: 'bg-blue-100 text-blue-700',
            resolved: 'bg-green-100 text-green-700',
            dismissed: 'bg-gray-100 text-gray-700'
        };
        const labels = {
            pending: 'En attente',
            investigating: 'En cours',
            resolved: 'Résolu',
            dismissed: 'Rejeté'
        };
        return <span className={`px-2 py-0.5 text-[10px] font-medium ${styles[status]}`}>{labels[status]}</span>;
    };

    const getPriorityIcon = (priority) => {
        if (priority === 'high') return <AlertTriangle className="w-4 h-4 text-red-500" />;
        if (priority === 'medium') return <Clock className="w-4 h-4 text-yellow-500" />;
        return <Flag className="w-4 h-4 text-blue-500" />;
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-[18px] font-bold text-[#1B4F72]">Signalements</h1>
                    <p className="text-[11px] text-gray-500">Gérez les plaintes et litiges</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Rechercher..."
                            className="pl-9 pr-4 py-2 text-[12px] border border-gray-200 focus:border-[#1B4F72] focus:outline-none w-48"
                        />
                    </div>
                    <select 
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-3 py-2 text-[12px] border border-gray-200 focus:border-[#1B4F72] focus:outline-none bg-white"
                    >
                        <option value="all">Tous</option>
                        <option value="pending">En attente</option>
                        <option value="investigating">En cours</option>
                        <option value="resolved">Résolus</option>
                    </select>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
                {[
                    { label: 'Total', value: 156, color: 'bg-[#1B4F72]' },
                    { label: 'En attente', value: 12, color: 'bg-yellow-500' },
                    { label: 'En cours', value: 8, color: 'bg-blue-500' },
                    { label: 'Résolus', value: 136, color: 'bg-green-500' },
                ].map((stat) => (
                    <div key={stat.label} className="bg-white border border-gray-200 p-3 flex items-center gap-3">
                        <div className={`w-10 h-10 ${stat.color} flex items-center justify-center`}>
                            <Flag className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-[18px] font-bold text-[#1B4F72]">{stat.value}</p>
                            <p className="text-[10px] text-gray-500">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Table */}
            <div className="bg-white border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600">ID</th>
                                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600">Type</th>
                                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600">Sujet</th>
                                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600">Motif</th>
                                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600">Date</th>
                                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600">Statut</th>
                                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {reports.map((report) => (
                                <tr key={report.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-[11px] text-gray-500">#{report.id}</td>
                                    <td className="px-4 py-3">
                                        <span className={`
                                            px-2 py-0.5 text-[10px] 
                                            ${report.type === 'artisan' ? 'bg-blue-100 text-blue-700' : 
                                              report.type === 'client' ? 'bg-green-100 text-green-700' : 
                                              'bg-purple-100 text-purple-700'}
                                        `}>
                                            {report.type}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            {getPriorityIcon(report.priority)}
                                            <span className="text-[12px] font-medium text-[#1B4F72]">{report.subject}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-[11px] text-gray-600">{report.reason}</td>
                                    <td className="px-4 py-3 text-[11px] text-gray-500">{report.date}</td>
                                    <td className="px-4 py-3">{getStatusBadge(report.status)}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1">
                                            <button 
                                                onClick={() => setSelectedReport(report)}
                                                className="p-1.5 text-gray-400 hover:text-[#1B4F72] hover:bg-[#1B4F72]/10 transition-colors"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors">
                                                <CheckCircle className="w-4 h-4" />
                                            </button>
                                            <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                                                <XCircle className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Detail Modal */}
            {selectedReport && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="bg-white w-full max-w-lg border border-gray-200">
                        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                            <h3 className="text-[14px] font-bold text-[#1B4F72]">
                                Signalement #{selectedReport.id}
                            </h3>
                            <button 
                                onClick={() => setSelectedReport(null)}
                                className="text-gray-400 hover:text-[#D35400]"
                            >
                                <XCircle className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-4 space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-[11px]">
                                <div>
                                    <span className="text-gray-500">Type:</span>
                                    <p className="font-medium text-[#1B4F72] capitalize">{selectedReport.type}</p>
                                </div>
                                <div>
                                    <span className="text-gray-500">Signalé par:</span>
                                    <p className="font-medium text-[#1B4F72]">{selectedReport.reporter}</p>
                                </div>
                                <div>
                                    <span className="text-gray-500">Date:</span>
                                    <p className="font-medium text-[#1B4F72]">{selectedReport.date}</p>
                                </div>
                                <div>
                                    <span className="text-gray-500">Priorité:</span>
                                    <p className="font-medium text-[#D35400] uppercase">{selectedReport.priority}</p>
                                </div>
                            </div>
                            <div>
                                <span className="text-[11px] text-gray-500">Description:</span>
                                <p className="mt-1 p-3 bg-gray-50 text-[12px] text-gray-700 border border-gray-200">
                                    {selectedReport.description}
                                </p>
                            </div>
                            <div className="flex gap-2 pt-4 border-t border-gray-200">
                                <button className="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white text-[11px] font-medium transition-colors">
                                    Marquer résolu
                                </button>
                                <button className="flex-1 py-2 bg-[#1B4F72] hover:bg-[#D35400] text-white text-[11px] font-medium transition-colors">
                                    Contacter parties
                                </button>
                                <button className="flex-1 py-2 border border-gray-200 hover:border-red-500 hover:text-red-500 text-[11px] transition-colors">
                                    Rejeter
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReportsManagement;