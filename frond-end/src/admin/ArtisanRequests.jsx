import React, { useEffect, useState } from 'react';
import {
    User, Search, CheckCircle, XCircle, Eye,
    FileText, Clock, MapPin, Phone, Mail,
    
    CircleAlertIcon
} from 'lucide-react';
import axiosClient from '../api/axios-client';

const ArtisanRequests = () => {
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [filter, setFilter] = useState('pending');
    const [artisans, setArtisans] = useState([]);
    const [isloading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchArtisans = async () => {
            try {
                const response = await axiosClient.get('/artisans');
                setArtisans(response.data.data);
            } catch (error) {
                console.error('Error fetching artisans:', error);
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchArtisans();
    }, []);

    const filteredArtisans = artisans.filter(artisan => {
        if (filter === 'all') return true;
        if (filter === 'pending') return artisan.artisan?.is_verified === false || artisan.artisan?.is_verified === 0;
        if (filter === 'approved') return artisan.artisan?.is_verified === true || artisan.artisan?.is_verified === 1;
        return true;
    });
    const getImageUrl = (imagePath) => {
        if (!imagePath) return null;
        const cleanPath = imagePath.replace(/^\//, '');
        return `http://127.0.0.1:8000/storage/${cleanPath}`;
    };

    const getStatusBadge = (isVerified) => {
        const status = isVerified ? 'approved' : 'pending';
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

    const onApprove = async (id) => {
        console.log("Approve artisan ID:", id);
    };

    const onReject = async (id) => {
        console.log("Reject artisan ID:", id);
    };

    return (
        <div className="space-y-4 max-h-screen">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-[18px] font-bold text-[#1B4F72]">Demandes Artisan</h1>
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
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-4 bg-amber-50 rounded-lg gap-4">
                {[
                    { label: 'Total', value: artisans.length, color: 'bg-[#1B4F72]' },
                    { label: 'En attente', value: artisans.filter(a => !a.artisan?.is_verified).length, color: 'bg-yellow-500' },
                    { label: 'Approuvées', value: artisans.filter(a => a.artisan?.is_verified).length, color: 'bg-green-500' },
                    { label: 'Rejetées', value: 0, color: 'bg-red-500' },
                ].map((stat) => (
                    <div key={stat.label} className="bg-white border rounded-lg border-gray-200 p-3 flex items-center gap-3">
                        <div className={`w-10 h-10 ${stat.color} flex items-center justify-center rounded-full`}>
                            <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-[18px] font-bold text-[#1B4F72]">{stat.value}</p>
                            <p className=" hidden lg:block text-[10px] text-gray-500">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

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
                            {isloading ? <CircleAlertIcon className="w-6 h-6 text-[#1B4F72] animate-spin" /> : filteredArtisans.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-[#1B4F72]/10 flex items-center justify-center">
                                                <span className="text-[12px] font-bold text-[#1B4F72]">
                                                    <img src={getImageUrl(user?.client?.avatar)} alt="" />
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-[12px] font-medium text-[#1B4F72]">
                                                    {user.firstname} {user.lastname}
                                                </p>
                                                <p className="text-[10px] text-gray-500">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-[11px] text-gray-700">{user.artisan?.specialite}</td>
                                    <td className="px-4 py-3 text-[11px] text-gray-700">{user.artisan?.experience || 'N/A'} ans</td>
                                    <td className="px-4 py-3 text-[11px] text-gray-700">{user.city}</td>
                                    <td className="px-4 py-3 text-[11px] text-gray-500">{new Date(user.created_at).toLocaleDateString()}</td>
                                    <td className="px-4 py-3">{getStatusBadge(user.artisan?.is_verified)}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex  justify-end gap-1">

                                            <button
                                                onClick={() => setSelectedRequest(user)}
                                                className=" "
                                            >
                                                <Eye className="w-5 h-5 text-gray-400 hover:text-[#D35400]" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedRequest && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-200">
                        <div className="p-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
                            <h3 className="text-[14px] font-bold text-[#1B4F72]">
                                Demande #{selectedRequest.id}
                            </h3>
                            <button onClick={() => setSelectedRequest(null)} className="text-gray-400 hover:text-[#D35400]">
                                <XCircle className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-4 space-y-4">
                            <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
                                <div className="w-16 h-16 bg-[#1B4F72]/10 flex items-center justify-center">
                                    <span className="text-[20px] font-bold text-[#1B4F72]">
                                        <img src={getImageUrl(selectedRequest?.client?.avatar)} alt="" />
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-[16px] font-bold text-[#1B4F72]">
                                        {selectedRequest.firstname} {selectedRequest.lastname}
                                    </h4>
                                    <p className="text-[11px] text-[#D35400] font-medium">{selectedRequest.artisan?.specialite}</p>
                                    <div className="flex items-center gap-4 mt-2 text-[11px] text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-3.5 h-3.5" />
                                            {selectedRequest.city}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3.5 h-3.5" />
                                            Exp: {selectedRequest.artisan?.experience || 0} ans
                                        </span>
                                    </div>
                                </div>
                                <div>{getStatusBadge(selectedRequest.artisan?.is_verified)}</div>
                            </div>

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
                                    <p className="text-[12px] text-[#1B4F72]">{selectedRequest.client?.phone}</p>
                                </div>
                            </div>

                            <div>
                                <h5 className="text-[12px] font-semibold text-[#1B4F72] mb-2">Présentation</h5>
                                <p className="p-3 bg-gray-50 border border-gray-200 text-[12px] text-gray-700 leading-relaxed">
                                    {selectedRequest.artisan?.bio}
                                </p>
                            </div>

                            <div>
                                <h5 className="text-[12px] font-semibold text-[#1B4F72] mb-2">Documents</h5>
                                <div className="space-y-2">
                                    {selectedRequest.artisan?.documents.map((doc) => (
                                        <div key={doc.id} className="flex items-center justify-between p-3 border border-gray-200">
                                            <div className="flex items-center gap-2">
                                                <FileText className="w-4 h-4 text-[#1B4F72]" />
                                                <div>
                                                    <p className="text-[11px] text-gray-700">{doc.titre_document}</p>
                                                    <p className="text-[9px] text-gray-400 uppercase">{doc.type_document}</p>
                                                </div>
                                            </div>
                                            <a
                                                href={`http://localhost:8000/storage/${doc.file_path}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center gap-1 text-[10px] text-[#D35400] hover:underline"
                                            >
                                                <Eye className="w-3.5 h-3.5" />
                                                
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {!selectedRequest.artisan?.is_verified && (
                                <div className="flex gap-3 pt-4 border-t border-gray-200">
                                    <button onClick={() => onApprove(selectedRequest.id)} className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white text-[11px] font-medium transition-colors flex items-center justify-center gap-2">
                                        <CheckCircle className="w-4 h-4" />
                                        Approuver la demande
                                    </button>
                                    <button onClick={() => onReject(selectedRequest.id)} className="flex-1 py-3 border border-red-500 text-red-500 hover:bg-red-50 text-[11px] font-medium transition-colors flex items-center justify-center gap-2">
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