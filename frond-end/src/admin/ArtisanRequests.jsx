import React, { useState } from 'react';
import { 
    User, Search, CheckCircle, XCircle, Eye, 
    FileText, Star, Clock, MapPin, Phone, Mail,
    Download, MoreHorizontal
} from 'lucide-react';
import FileUpload from '../components/inputs/FileUpload';

const ArtisanRequests = () => {
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [filter, setFilter] = useState('pending');

    const requests = [
        {
            id: 1,
            firstName: 'Youssef',
            lastName: 'Alaoui',
            email: 'youssef.alaoui@email.com',
            phone: '+212 6 12 34 56 78',
            specialty: 'Électricité',
            experience: '5-10 ans',
            city: 'Casablanca',
            submittedAt: '2024-01-15 09:30',
            status: 'pending',
            documents: {
                cinFront: 'cin_front.pdf',
                cinBack: 'cin_back.pdf',
                diplomas: ['diplome.pdf'],
                certificates: ['attestation_1.pdf', 'attestation_2.pdf']
            },
            bio: 'Électricien professionnel avec plus de 7 ans d\'expérience dans le bâtiment et l\'industrie.'
        },
        {
            id: 2,
            firstName: 'Fatima',
            lastName: 'Benali',
            email: 'fatima.benali@email.com',
            phone: '+212 6 23 45 67 89',
            specialty: 'Coiffure à domicile',
            experience: '2-5 ans',
            city: 'Rabat',
            submittedAt: '2024-01-14 14:15',
            status: 'approved',
            documents: {
                cinFront: 'cin_front.pdf',
                cinBack: 'cin_back.pdf',
                diplomas: [],
                certificates: ['formation.pdf']
            },
            bio: 'Coiffeuse professionnelle spécialisée dans les mariages et événements.'
        },
        {
            id: 3,
            firstName: 'Karim',
            lastName: 'Tazi',
            email: 'karim.tazi@email.com',
            phone: '+212 6 34 56 78 90',
            specialty: 'Menuiserie',
            experience: '10+ ans',
            city: 'Marrakech',
            submittedAt: '2024-01-13 11:00',
            status: 'rejected',
            documents: {
                cinFront: 'cin_front.pdf',
                cinBack: 'cin_back.pdf',
                diplomas: ['cap_menuiserie.pdf'],
                certificates: []
            },
            bio: 'Menuisier traditionnel expert en bois ancien et restauration.'
        }
    ];

    const getStatusBadge = (status) => {
        const styles = {
            pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
            approved: 'bg-green-100 text-green-700 border-green-200',
            rejected: 'bg-red-100 text-red-700 border-red-200'
        };
        const labels = {
            pending: 'En attente',
            approved: 'Approuvé',
            rejected: 'Rejeté'
        };
        return (
            <span className={`px-2 py-1 text-[10px] font-medium border ${styles[status]}`}>
                {labels[status]}
            </span>
        );
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-[18px] font-bold text-[#1B4F72]">Demandes Artisan</h1>
                    <p className="text-[11px] text-gray-500">Validez les nouveaux artisans</p>
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
                        <option value="all">Toutes</option>
                        <option value="pending">En attente</option>
                        <option value="approved">Approuvées</option>
                        <option value="rejected">Rejetées</option>
                    </select>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
                {[
                    { label: 'Total', value: 48, color: 'bg-[#1B4F72]' },
                    { label: 'En attente', value: 5, color: 'bg-yellow-500' },
                    { label: 'Approuvées', value: 38, color: 'bg-green-500' },
                    { label: 'Rejetées', value: 5, color: 'bg-red-500' },
                ].map((stat) => (
                    <div key={stat.label} className="bg-white border border-gray-200 p-3 flex items-center gap-3">
                        <div className={`w-10 h-10 ${stat.color} flex items-center justify-center`}>
                            <User className="w-5 h-5 text-white" />
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
                                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600">Candidat</th>
                                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600">Spécialité</th>
                                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600">Expérience</th>
                                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600">Ville</th>
                                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600">Date</th>
                                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600">Statut</th>
                                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {requests.map((req) => (
                                <tr key={req.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-[#1B4F72]/10 flex items-center justify-center">
                                                <span className="text-[12px] font-bold text-[#1B4F72]">
                                                    {req.firstName.charAt(0)}{req.lastName.charAt(0)}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-[12px] font-medium text-[#1B4F72]">
                                                    {req.firstName} {req.lastName}
                                                </p>
                                                <p className="text-[10px] text-gray-500">{req.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-[11px] text-gray-700">{req.specialty}</td>
                                    <td className="px-4 py-3 text-[11px] text-gray-700">{req.experience}</td>
                                    <td className="px-4 py-3 text-[11px] text-gray-700">{req.city}</td>
                                    <td className="px-4 py-3 text-[11px] text-gray-500">{req.submittedAt}</td>
                                    <td className="px-4 py-3">{getStatusBadge(req.status)}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1">
                                            <button 
                                                onClick={() => setSelectedRequest(req)}
                                                className="p-1.5 text-gray-400 hover:text-[#1B4F72] hover:bg-[#1B4F72]/10 transition-colors"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            {req.status === 'pending' && (
                                                <>
                                                    <button className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors">
                                                        <CheckCircle className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors">
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

            {/* Detail Modal */}
            {selectedRequest && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-200">
                        <div className="p-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
                            <h3 className="text-[14px] font-bold text-[#1B4F72]">
                                Demande #{selectedRequest.id}
                            </h3>
                            <button 
                                onClick={() => setSelectedRequest(null)}
                                className="text-gray-400 hover:text-[#D35400]"
                            >
                                <XCircle className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-4 space-y-4">
                            {/* Header Info */}
                            <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
                                <div className="w-16 h-16 bg-[#1B4F72]/10 flex items-center justify-center">
                                    <span className="text-[20px] font-bold text-[#1B4F72]">
                                        {selectedRequest.firstName.charAt(0)}{selectedRequest.lastName.charAt(0)}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-[16px] font-bold text-[#1B4F72]">
                                        {selectedRequest.firstName} {selectedRequest.lastName}
                                    </h4>
                                    <p className="text-[11px] text-[#D35400] font-medium">{selectedRequest.specialty}</p>
                                    <div className="flex items-center gap-4 mt-2 text-[11px] text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-3.5 h-3.5" />
                                            {selectedRequest.city}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3.5 h-3.5" />
                                            {selectedRequest.experience}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    {getStatusBadge(selectedRequest.status)}
                                </div>
                            </div>

                            {/* Contact */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 bg-gray-50 border border-gray-200">
                                    <div className="flex items-center gap-2 text-[11px] text-gray-500 mb-1">
                                        <Mail className="w-3.5 h-3.5" />
                                        Email
                                    </div>
                                    <p className="text-[12px] text-[#1B4F72]">{selectedRequest.email}</p>
                                </div>
                                <div className="p-3 bg-gray-50 border border-gray-200">
                                    <div className="flex items-center gap-2 text-[11px] text-gray-500 mb-1">
                                        <Phone className="w-3.5 h-3.5" />
                                        Téléphone
                                    </div>
                                    <p className="text-[12px] text-[#1B4F72]">{selectedRequest.phone}</p>
                                </div>
                            </div>

                            {/* Bio */}
                            <div>
                                <h5 className="text-[12px] font-semibold text-[#1B4F72] mb-2">Présentation</h5>
                                <p className="p-3 bg-gray-50 border border-gray-200 text-[12px] text-gray-700 leading-relaxed">
                                    {selectedRequest.bio}
                                </p>
                            </div>

                            {/* Documents */}
                            <div>
                                <h5 className="text-[12px] font-semibold text-[#1B4F72] mb-2">Documents</h5>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between p-3 border border-gray-200">
                                        <div className="flex items-center gap-2">
                                            <FileText className="w-4 h-4 text-[#1B4F72]" />
                                            <span className="text-[11px] text-gray-700">CNI Recto</span>
                                        </div>
                                        <button className="flex items-center gap-1 text-[10px] text-[#D35400] hover:underline">
                                            <Download className="w-3.5 h-3.5" />
                                            Télécharger
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between p-3 border border-gray-200">
                                        <div className="flex items-center gap-2">
                                            <FileText className="w-4 h-4 text-[#1B4F72]" />
                                            <span className="text-[11px] text-gray-700">CNI Verso</span>
                                        </div>
                                        <button className="flex items-center gap-1 text-[10px] text-[#D35400] hover:underline">
                                            <Download className="w-3.5 h-3.5" />
                                            Télécharger
                                        </button>
                                    </div>
                                    {selectedRequest.documents.diplomas.map((doc, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 border border-gray-200">
                                            <div className="flex items-center gap-2">
                                                <FileText className="w-4 h-4 text-[#1B4F72]" />
                                                <span className="text-[11px] text-gray-700">Diplôme {i + 1}</span>
                                            </div>
                                            <button className="flex items-center gap-1 text-[10px] text-[#D35400] hover:underline">
                                                <Download className="w-3.5 h-3.5" />
                                                Télécharger
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            {selectedRequest.status === 'pending' && (
                                <div className="flex gap-3 pt-4 border-t border-gray-200">
                                    <button className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white text-[12px] font-medium transition-colors flex items-center justify-center gap-2">
                                        <CheckCircle className="w-4 h-4" />
                                        Approuver la demande
                                    </button>
                                    <button className="flex-1 py-3 border border-red-500 text-red-500 hover:bg-red-50 text-[12px] font-medium transition-colors flex items-center justify-center gap-2">
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

export default ArtisanRequests;