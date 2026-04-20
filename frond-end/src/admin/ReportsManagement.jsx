import React, { useEffect, useState } from 'react';
import {
    Flag, Search, CheckCircle, XCircle,
    Eye, AlertTriangle, Clock, ChevronDown, ChevronUp,
    Check, X, RefreshCw
} from 'lucide-react';
import axiosClient from '../api/axios-client';
import toast from 'react-hot-toast';

const ReportsManagement = () => {
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [artisans, setArtisans] = useState([]);
    const [expandedArtisan, setExpandedArtisan] = useState(null);

    const [selectedReport, setSelectedReport] = useState(null);

    const [modelResolved, setModelResolved] = useState(false);
    const [modelDismissed, setModelDismissed] = useState(false);
    const [pendingReport, setPendingReport] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axiosClient.get('/reports');
                setArtisans(response.data.data);
            } catch (error) {
                console.error('Error fetching reports:', error);
            }
        };
        fetchReports();
    }, []);

    const allReports = artisans.flatMap((artisan) =>
        artisan.reports.map((r) => ({ ...r.details, artisan, reporter: r.reporter }))
    );

    const stats = [
        { label: 'Total', value: allReports.length, color: 'bg-[#1B4F72]' },
        { label: 'En attente', value: allReports.filter(r => r.status === 'pending').length, color: 'bg-yellow-500' },
        { label: 'En cours', value: allReports.filter(r => r.status === 'investigating').length, color: 'bg-blue-500' },
        { label: 'Résolus', value: allReports.filter(r => r.status === 'resolved').length, color: 'bg-green-500' },
    ];

    const getStatusBadge = (status) => {
        const styles = {
            pending: 'bg-yellow-100 text-yellow-700',
            investigating: 'bg-blue-100 text-blue-700',
            resolved: 'bg-green-100 text-green-700',
            dismissed: 'bg-gray-100 text-gray-700',
        };
        const labels = {
            pending: 'En attente',
            investigating: 'En cours',
            resolved: 'Résolu',
            dismissed: 'Rejeté',
        };
        return (
            <span className={`px-2 py-0.5 text-[10px] font-medium  ${styles[status] || 'bg-gray-100 text-gray-600'}`}>
                {labels[status] || status}
            </span>
        );
    };

    const getPriorityIcon = (priority) => {
        if (priority === 'high') return <AlertTriangle className="w-4 h-4 text-red-500" />;
        if (priority === 'medium') return <Clock className="w-4 h-4 text-yellow-500" />;
        return <Flag className="w-4 h-4 text-blue-400" />;
    };

    const handleResolve = async () => {
        try {
            setIsProcessing(true);
            await axiosClient.put(`/reports/${pendingReport.artisan.id}/resolve/${pendingReport.reporter.id}`);

            toast.success('Signalement marqué comme résolu');
            setArtisans(prev => prev.map(art => {
                if (art.id === pendingReport.artisan.id) {
                    return {
                        ...art,
                        reports: art.reports.map(r =>
                            r.reporter.id === pendingReport.reporter.id ? { ...r, details: { ...r.details, status: 'resolved' } } : r
                        )
                    };
                }
                return art;
            }));

            setModelResolved(false);
            setSelectedReport(null);
        } catch (error) {
            toast.error('Erreur lors de la résolution');
        } finally {
            setIsProcessing(false);
            setPendingReport(null);
        }
    };
    const handleDismiss = async () => {
        if (!pendingReport) return;

        try {
            setIsProcessing(true);

            await axiosClient.put(`/reports/${pendingReport.artisan.id}/dismiss/${pendingReport.reporter.id}`);
            toast.success('Signalement rejeté avec succès');
            setArtisans(prevArtisans =>
                prevArtisans.map(art => {
                    if (art.id === pendingReport.artisan.id) {
                        return {
                            ...art,
                            reports: art.reports.filter(r => r.reporter.id !== pendingReport.reporter.id)
                        };
                    }
                    return art;
                }).filter(art => art.reports.length > 0)
            );

            setModelDismissed(false);
            setSelectedReport(null);
            setPendingReport(null);

        } catch (error) {
            console.error("Erreur lors du rejet:", error);
            toast.error(error.response?.data?.message || 'Erreur lors du rejet du signalement');
        } finally {
            setIsProcessing(false);
        }
    };

    const filteredArtisans = artisans
        .map((artisan) => {
            const filteredReports = artisan.reports.filter((r) => {
                const matchStatus = filter === 'all' || r.details.status === filter;
                const matchSearch =
                    search === '' ||
                    artisan.name.toLowerCase().includes(search.toLowerCase()) ||
                    r.details.subject.toLowerCase().includes(search.toLowerCase()) ||
                    r.reporter.full_name.toLowerCase().includes(search.toLowerCase());
                return matchStatus && matchSearch;
            });
            return { ...artisan, reports: filteredReports };
        })
        .filter((artisan) => artisan.reports.length > 0);

    return (
        <div className="space-y-4">

            {modelResolved && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" role="dialog" aria-modal="true">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-200" />
                    <div className="relative w-full max-w-xs bg-white shadow-2xl border border-gray-100 transform transition-all animate-in zoom-in-95 duration-200">
                        <div className="p-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-10 h-10 bg-[#1B4F72]/10 flex items-center justify-center">
                                    <Check className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="text-[14px] font-bold text-[#1B4F72]">Confirmation</h3>
                                    <p className="text-[12px] text-gray-600">Voulez-vous marquer ce signalement comme résolu ?</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => { setModelResolved(false); setPendingReport(null); }}
                                    className="py-2 text-[12px] text-gray-400 hover:text-gray-600 font-medium"
                                >
                                    Non
                                </button>
                                <button
                                    disabled={isProcessing}
                                    onClick={handleResolve}
                                    className="py-2 bg-[#1B4F72] text-white text-[12px] font-bold hover:bg-[#D35400] transition-colors text-center"
                                >
                                    {isProcessing
                                        ? <div className="flex items-center justify-center gap-2"><RefreshCw className="w-4 h-4 animate-spin" /> en cours</div>
                                        : 'Résoudre'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {modelDismissed && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" role="dialog" aria-modal="true">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-200" />
                    <div className="relative w-full max-w-xs bg-white shadow-2xl border border-gray-100 transform transition-all animate-in zoom-in-95 duration-200">
                        <div className="p-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-10 h-10 bg-[#D35400]/10 flex items-center justify-center">
                                    <X className="w-5 h-5 text-red-600" />
                                </div>
                                <div>
                                    <h3 className="text-[14px] font-bold text-[#1B4F72]">Confirmation</h3>
                                    <p className="text-[12px] text-gray-600">Voulez-vous vraiment rejeter ce signalement ?</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => { setModelDismissed(false); setPendingReport(null); }}
                                    className="py-2 text-[12px] text-gray-400 hover:text-gray-600 font-medium"
                                >
                                    Non
                                </button>
                                <button
                                    disabled={isProcessing}
                                    onClick={handleDismiss}
                                    className="py-2 bg-[#1B4F72] text-white text-[12px] font-bold hover:bg-[#D35400] transition-colors text-center"
                                >
                                    {isProcessing
                                        ? <div className="flex items-center justify-center gap-2"><RefreshCw className="w-4 h-4 animate-spin" /> en cours</div>
                                        : 'Rejeter'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex items-center justify-between">
                <h1 className="text-[18px] font-bold text-[#1B4F72]">Signalements</h1>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9 pr-4 py-2 text-[12px] border border-gray-200 focus:border-[#1B4F72] focus:outline-none w-48   "
                        />
                    </div>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-3 py-2 text-[12px] border border-gray-200 focus:border-[#1B4F72] focus:outline-none bg-white   "
                    >
                        <option value="all">Tous</option>
                        <option value="pending">En attente</option>
                        <option value="investigating">En cours</option>
                        <option value="resolved">Résolus</option>
                        <option value="dismissed">Rejetés</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white border border-gray-200   p-3 flex items-center gap-3">
                        <div className={`w-10 h-10 ${stat.color} flex   items-center justify-center shrink-0`}>
                            <Flag className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-500 hidden lg:block">{stat.label}</p>
                            <p className="text-[18px] font-bold text-[#1B4F72]">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white border border-gray-200   overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600 w-8"></th>
                                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600">Artisan</th>
                                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600">Spécialité</th>
                                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600">Signalements</th>
                                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600">Vérifié</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredArtisans.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-4 py-8 text-center text-[12px] text-gray-400">
                                        Aucun signalement trouvé
                                    </td>
                                </tr>
                            )}
                            {filteredArtisans.map((artisan) => (
                                <React.Fragment key={artisan.id}>
                                    <tr
                                        className="hover:bg-gray-50 cursor-pointer"
                                        onClick={() =>
                                            setExpandedArtisan(expandedArtisan === artisan.id ? null : artisan.id)
                                        }
                                    >
                                        <td className="px-4 py-3 text-gray-400">
                                            {expandedArtisan === artisan.id
                                                ? <ChevronUp className="w-4 h-4" />
                                                : <ChevronDown className="w-4 h-4" />}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="text-[12px] font-semibold text-[#1B4F72]">{artisan.name}</span>
                                        </td>
                                        <td className="px-4 py-3 text-[11px] text-gray-500 capitalize">{artisan.specialite}</td>
                                        <td className="px-4 py-3">
                                            <span className="px-2 py-0.5 text-[10px] font-medium bg-red-100 text-red-700   ">
                                                {artisan.reports.length} signalement{artisan.reports.length > 1 ? 's' : ''}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            {artisan.is_verified
                                                ? <CheckCircle className="w-4 h-4 text-green-500" />
                                                : <XCircle className="w-4 h-4 text-gray-300" />}
                                        </td>
                                    </tr>

                                    {expandedArtisan === artisan.id && artisan.reports.map((report, idx) => (
                                        <tr key={idx} className="bg-blue-50/40 ">
                                            <td className="px-4 py-3"></td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    {report.reporter.avatar
                                                        ? <img src={report.reporter.avatar} className="w-6 h-6   object-cover" alt="" />
                                                        : <div className="w-6 h-6   bg-gray-200 flex items-center justify-center text-[9px] text-gray-500">
                                                            {report.reporter.full_name?.charAt(0)}
                                                        </div>
                                                    }
                                                    <div>
                                                        <p className="text-[11px] font-medium text-gray-700">{report.reporter.full_name}</p>
                                                        <p className="text-[10px] text-gray-400">CIN: {report.reporter.cin}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-1">
                                                    {getPriorityIcon(report.details.priority)}
                                                    <span className="text-[11px] text-gray-700">{report.details.subject}</span>
                                                </div>
                                                <p className="text-[10px] text-gray-400 mt-0.5">{report.details.raison}</p>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="space-y-1">
                                                    {getStatusBadge(report.details.status)}
                                                    <p className="text-[10px] text-gray-400">{report.details.created_at}</p>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-1">
                                                    <button
                                                        onClick={() => setSelectedReport({ ...report.details, artisan, reporter: report.reporter })}
                                                        className="p-1.5 text-gray-400 hover:text-[#1B4F72] hover:bg-[#1B4F72]/10 transition-colors   "
                                                        title="Voir"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setPendingReport({ ...report.details, artisan, reporter: report.reporter });
                                                            setModelResolved(true);
                                                        }}
                                                        className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors   "
                                                        title="Résoudre"
                                                    >
                                                        <CheckCircle className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setPendingReport({ ...report.details, artisan, reporter: report.reporter });
                                                            setModelDismissed(true);
                                                        }}
                                                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors   "
                                                        title="Rejeter"
                                                    >
                                                        <XCircle className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedReport && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="bg-white w-full max-w-lg border border-gray-200   overflow-hidden shadow-xl">
                        <div className="p-4 border-b border-gray-200 flex items-center justify-between ">
                            <h3 className="text-[14px] font-bold text-[#1B4F72]">
                                Signalement — {selectedReport.artisan.name}
                            </h3>
                            <button onClick={() => setSelectedReport(null)} className="text-[#1B4F72] hover:text-white">
                                <XCircle className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-4 space-y-4">

                            <div className="flex items-center gap-3 p-3 bg-gray-50   border border-gray-100">
                                {selectedReport.reporter.avatar
                                    ? <img src={selectedReport.reporter.avatar} className="w-10 h-10  object-cover" alt="" />
                                    : <div className="w-10 h-10   bg-[#1B4F72]/10 flex items-center justify-center text-[14px] font-bold text-[#1B4F72]">
                                        {selectedReport.reporter.full_name?.charAt(0)}
                                    </div>
                                }
                                <div>
                                    <p className="text-[12px] font-semibold text-[#1B4F72]">{selectedReport.reporter.full_name}</p>
                                    <p className="text-[11px] text-gray-400">CIN : {selectedReport.reporter.cin}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-[11px]">
                                <div>
                                    <span className="text-gray-400">Artisan signalé</span>
                                    <p className="font-medium text-[#1B4F72] capitalize mt-0.5">{selectedReport.artisan.name}</p>
                                </div>
                                <div>
                                    <span className="text-gray-400">Spécialité</span>
                                    <p className="font-medium text-[#1B4F72] capitalize mt-0.5">{selectedReport.artisan.specialite}</p>
                                </div>
                                <div>
                                    <span className="text-gray-400">Date</span>
                                    <p className="font-medium text-[#1B4F72] mt-0.5">{selectedReport.created_at}</p>
                                </div>
                                <div>
                                    <span className="text-gray-400">Priorité</span>
                                    <p className="font-medium text-[#D35400] uppercase mt-0.5">{selectedReport.priority}</p>
                                </div>
                                <div>
                                    <span className="text-gray-400">Motif</span>
                                    <p className="font-medium text-[#1B4F72] mt-0.5">{selectedReport.raison}</p>
                                </div>
                                <div>
                                    <span className="text-gray-400">Statut</span>
                                    <div className="mt-0.5">{getStatusBadge(selectedReport.status)}</div>
                                </div>
                            </div>

                            <div>
                                <span className="text-[11px] text-gray-400">Description</span>
                                <p className="mt-1 p-3 bg-gray-50 text-[12px] text-gray-700 border border-gray-200   ">
                                    {selectedReport.description || <span className="italic text-gray-400">Aucune description fournie.</span>}
                                </p>
                            </div>

                            <div className="flex gap-2 pt-4 border-t border-gray-200">
                                <button
                                    onClick={() => {
                                        setPendingReport(selectedReport);
                                        setModelResolved(true);
                                    }}
                                    className="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white text-[11px] font-medium transition-colors"
                                >
                                    Marquer résolu
                                </button>
                                <button className="flex-1 py-2 bg-[#1B4F72] hover:bg-[#D35400] text-white text-[11px] font-medium transition-colors   ">
                                    Contacter parties
                                </button>
                                <button
                                    onClick={() => { setPendingReport(selectedReport); setModelDismissed(true); }}
                                    className="flex-1 py-2 border border-gray-200 hover:border-red-500 hover:text-red-500 text-[11px] transition-colors   "
                                >
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