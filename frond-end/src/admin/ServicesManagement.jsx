import { useEffect, useRef, useState } from 'react';
import {
    Briefcase, Search, Grid, List, CheckCircle, XCircle,
    Star, RefreshCw, X, Check, Clock, MapPin, Phone,
    Mail, Wrench, AlertCircle, Eye
} from 'lucide-react';
import ServiceCard from '../components/cards/ServiceCard';
import axiosClient from '../api/axios-client';
import toast from 'react-hot-toast';

const BASE_URL = import.meta.env.VITE_API_URL_STORAGE;

const computeServiceProps = (service) => {
    const rawUrl = service.gallery?.[0]?.url;
    const imageUrl = rawUrl
        ? (rawUrl.startsWith('http') ? rawUrl : `${BASE_URL}${rawUrl}`)
        : null;

    return {
        imageUrl,
        title: service.title,
        category: service.category?.name ?? '—',
        price: service.pricing?.amount ?? '—',
        currency: service.pricing?.currency ?? 'MAD',
        unit: service.pricing?.unit ?? '',
        duration: service.duration?.estimated ?? '—',
        materialIncluded: service.duration?.material_included ?? '—',
        location: service.artisan?.city ?? '—',
        artisanName: `${service.artisan?.firstname ?? ''} ${service.artisan?.lastname ?? ''}`.trim(),
        rating: service.artisan?.note ?? '—',
        isActive: service.status?.is_active,
        isVerified: service.artisan?.is_verified,
        isPending: service.status?.statut === 'en_attente',
        statut: service.status?.statut,
    };
};

const StatutBadge = ({ statut }) => {
    const map = {
        en_attente: { cls: 'bg-yellow-50 text-yellow-700 border-yellow-200', Icon: Clock, label: 'En attente' },
        approuve: { cls: 'bg-green-50 text-green-700 border-green-200', Icon: CheckCircle, label: 'Approuvé' },
        refuse: { cls: 'bg-red-50 text-red-600 border-red-200', Icon: XCircle, label: 'Rejeté' },
    };
    const cfg = map[statut] ?? { cls: 'bg-gray-100 text-gray-500 border-gray-200', Icon: AlertCircle, label: statut ?? '—' };
    return (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-semibold border rounded-full uppercase tracking-wide ${cfg.cls}`}>
            <cfg.Icon className="w-2.5 h-2.5" />{cfg.label}
        </span>
    );
};

const ConfirmModal = ({ open, onClose, onConfirm, loading, type }) => {
    if (!open) return null;
    const isApprove = type === 'approve';
    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" role="dialog" aria-modal="true">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />
            <div className="relative w-full max-w-xs bg-white shadow-2xl border border-gray-100 rounded-lg">
                <div className="p-6">
                    <div className="flex items-center gap-4 mb-5">
                        <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${isApprove ? 'bg-green-50' : 'bg-red-50'}`}>
                            {isApprove
                                ? <Check className="w-5 h-5 text-green-600" />
                                : <X className="w-5 h-5 text-red-600" />}
                        </div>
                        <div>
                            <h3 className="text-[14px] font-bold text-[#1B4F72]">Confirmation</h3>
                            <p className="text-[11px] text-gray-500 mt-0.5">
                                {isApprove
                                    ? 'Voulez-vous vraiment approuver ce service ?'
                                    : 'Voulez-vous vraiment rejeter ce service ?'}
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <button onClick={onClose} className="py-2 text-[12px] text-gray-400 hover:text-gray-600 border border-gray-200 hover:bg-gray-50 rounded transition-all">
                            Annuler
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={loading}
                            className={`py-2 text-white text-[12px] font-bold rounded transition-colors flex items-center justify-center ${isApprove ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
                        >
                            {loading
                                ? <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                : isApprove ? 'Approuver' : 'Rejeter'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SkeletonCard = () => (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden animate-pulse">
        <div className="aspect-[4/3] bg-gray-200" />
        <div className="p-4 space-y-2">
            <div className="h-3 bg-gray-200 rounded w-3/4" />
            <div className="h-2 bg-gray-200 rounded w-1/2" />
            <div className="h-2 bg-gray-200 rounded w-2/3" />
        </div>
    </div>
);

const ServicesManagement = () => {
    const [services, setServices] = useState([]);
    const [viewMode, setViewMode] = useState('grid');
    const [filter, setFilter] = useState('all');
    const [selectedService, setSelectedService] = useState(null);
    const [confirmModal, setConfirmModal] = useState({ open: false, type: null });
    const [isProcessing, setIsProcessing] = useState(false);
    const [nextPage, setNextPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const loaderRef = useRef(null);

    const selectedProps = selectedService ? computeServiceProps(selectedService) : null;

    const fetchServices = async (isNewSearch = false) => {
        if (loading) return;
        setLoading(true);
        try {
            const pageToFetch = isNewSearch ? 1 : nextPage;
            const response = await axiosClient.get('/manager-services', {
                params: {
                    page: pageToFetch,
                    search: searchQuery || undefined,
                    statut: filter !== 'all' ? filter : undefined,
                }
            });
            const newItems = response.data.data;
            const meta = response.data.meta;
            setServices(prev => isNewSearch ? newItems : [...prev, ...newItems]);
            setNextPage(meta.current_page + 1);
            setHasMore(meta.current_page < meta.last_page);
        } catch {
            toast.error('Erreur de chargement');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const t = setTimeout(() => fetchServices(true), 400);
        return () => clearTimeout(t);
    }, [searchQuery, filter]);

    useEffect(() => {
        if (!hasMore || loading) return;
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore && !loading) fetchServices();
        }, { threshold: 0.1, rootMargin: '100px' });
        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [hasMore, loading, nextPage, searchQuery, filter]);

    const patchService = (id, newStatut) => {
        setServices(prev => prev.map(s =>
            s.id === id ? { ...s, status: { ...s.status, statut: newStatut } } : s
        ));
        setSelectedService(prev =>
            prev?.id === id ? { ...prev, status: { ...prev.status, statut: newStatut } } : prev
        );
    };

    const handleApprove = async (id) => {
        setIsProcessing(true);
        try {
            await axiosClient.patch(`/manager-services/${id}/approve`);
            patchService(id, 'approuve');
            toast.success('Service approuvé avec succès');
            setConfirmModal({ open: false, type: null });
        } catch {
            toast.error("Erreur lors de l'approbation du service");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleReject = async (id) => {
        setIsProcessing(true);
        try {
            await axiosClient.patch(`/manager-services/${id}/reject`);
            patchService(id, 'refuse');
            toast.success('Service rejeté avec succès');
            setConfirmModal({ open: false, type: null });
        } catch {
            toast.error('Erreur lors du rejet du service');
        } finally {
            setIsProcessing(false);
        }
    };

    const stats = [
        { label: 'En attente', value: services.filter(s => s.status?.statut === 'en_attente').length, color: 'bg-yellow-500', Icon: Clock },
        { label: 'Approuvés', value: services.filter(s => s.status?.statut === 'approuve').length, color: 'bg-green-500', Icon: CheckCircle },
        { label: 'Rejetés', value: services.filter(s => s.status?.statut === 'refuse').length, color: 'bg-red-500', Icon: XCircle },
        { label: 'Total', value: services.length, color: 'bg-[#1B4F72]', Icon: Briefcase },
    ];

    return (
        <div className="space-y-4">

            <ConfirmModal
                open={confirmModal.open && confirmModal.type === 'approve'}
                type="approve"
                loading={isProcessing}
                onClose={() => setConfirmModal({ open: false, type: null })}
                onConfirm={() => handleApprove(selectedService.id)}
            />
            <ConfirmModal
                open={confirmModal.open && confirmModal.type === 'reject'}
                type="reject"
                loading={isProcessing}
                onClose={() => setConfirmModal({ open: false, type: null })}
                onConfirm={() => handleReject(selectedService.id)}
            />

            <div className="sticky -top-3 bg-white px-4 py-3 border-b border-gray-200 z-10 -mx-4">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                    <h1 className="text-[18px] font-bold text-[#1B4F72]">Gestion des Services</h1>
                    <div className="flex items-center gap-2 flex-wrap">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                placeholder="Rechercher un service..."
                                className="pl-9 pr-4 py-2 text-[12px] border border-gray-200 focus:border-[#1B4F72] focus:outline-none w-56 rounded"
                            />
                        </div>
                        <select
                            value={filter}
                            onChange={e => setFilter(e.target.value)}
                            className="px-3 py-2 text-[12px] border border-gray-200 focus:border-[#1B4F72] focus:outline-none bg-white rounded"
                        >
                            <option value="all">Tous les statuts</option>
                            <option value="en_attente">En attente</option>
                            <option value="approuve">Approuvés</option>
                            <option value="refuse">Rejetés</option>
                        </select>
                        <div className="flex border border-gray-200 rounded overflow-hidden">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-[#1B4F72] text-white' : 'text-gray-400 hover:text-[#1B4F72] hover:bg-gray-50'}`}
                            >
                                <Grid className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-[#1B4F72] text-white' : 'text-gray-400 hover:text-[#1B4F72] hover:bg-gray-50'}`}
                            >
                                <List className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-3 mt-3">
                    {stats.map(s => (
                        <div key={s.label} className="bg-white border border-gray-200 rounded-lg p-3 flex items-center gap-3">
                            <div className={`w-9 h-9 ${s.color} flex items-center justify-center rounded-full flex-shrink-0`}>
                                <s.Icon className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <p className="text-[18px] font-bold text-[#1B4F72] leading-none">{s.value}</p>
                                <p className="hidden lg:block text-[10px] text-gray-500 mt-0.5">{s.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {loading && services.length === 0 && (
                <div className={viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
                    : 'space-y-2'}>
                    {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
                </div>
            )}

            {!loading && services.length === 0 && (
                <div className="flex flex-col items-center gap-3 py-16 text-center">
                    <Briefcase className="w-10 h-10 text-gray-300" />
                    <p className="text-[13px] text-gray-400">Aucun service trouvé.</p>
                </div>
            )}

            {viewMode === 'grid' && services.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {services.map(service => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            onView={setSelectedService}
                            layout="grid"
                            {...computeServiceProps(service)}
                        />
                    ))}
                </div>
            )}

            {viewMode === 'list' && services.length > 0 && (
                <div className="space-y-2">
                    {services.map(service => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            onApprove={handleApprove}
                            onReject={handleReject}
                            onView={setSelectedService}
                            layout="list"
                            {...computeServiceProps(service)}
                        />
                    ))}
                </div>
            )}

            <div ref={loaderRef} className="h-10 w-full flex justify-center items-center mt-4">
                {loading && hasMore && services.length > 0 && (
                    <div className="flex items-center gap-2 text-[12px] text-gray-500">
                        <RefreshCw className="w-4 h-4 animate-spin text-[#1B4F72]" />
                        Chargement de la suite...
                    </div>
                )}
                {!hasMore && services.length > 0 && (
                    <p className="text-gray-400 text-[11px] italic">Vous avez atteint la fin de la liste.</p>
                )}
            </div>

            {selectedService && selectedProps && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
                    <div className="bg-white w-full max-w-4xl my-8 border border-gray-200 rounded-lg shadow-2xl">

                        <div className="p-4 border-b border-gray-200 flex items-center justify-between sticky top-0 z-10 bg-white rounded-t-lg">
                            <div className="flex items-center gap-3">
                                <h3 className="text-[15px] font-bold text-[#1B4F72]">{selectedProps.title}</h3>
                                <StatutBadge statut={selectedProps.statut} />
                            </div>
                            <button onClick={() => setSelectedService(null)} className="p-2 text-gray-400 hover:text-[#D35400] transition-colors">
                                <XCircle className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-0">

                            <div className="p-6 space-y-4 border-r border-gray-200">

                                <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
                                    {selectedProps.imageUrl ? (
                                        <img src={selectedProps.imageUrl} alt={selectedProps.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <Briefcase className="w-14 h-14 text-[#1B4F72]/30" />
                                        </div>
                                    )}
                                </div>

                                {selectedService.gallery?.length > 1 && (
                                    <div className="flex gap-2 flex-wrap">
                                        {selectedService.gallery.slice(1).map(img => {
                                            const url = img.url.startsWith('http') ? img.url : `${BASE_URL}${img.url}`;
                                            return (
                                                <div key={img.id} className="w-16 h-16 rounded overflow-hidden bg-gray-100">
                                                    <img src={url} alt="" className="w-full h-full object-cover" />
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-3 bg-[#1B4F72]/5 border border-[#1B4F72]/10 rounded-lg">
                                        <p className="text-[10px] text-gray-400 mb-0.5">Tarif</p>
                                        <p className="text-[22px] font-bold text-[#D35400] leading-none">{selectedProps.price}</p>
                                        <p className="text-[11px] text-gray-500">{selectedProps.currency} / {selectedProps.unit || '—'}</p>
                                    </div>
                                    <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg">
                                        <p className="text-[10px] text-gray-400 mb-0.5">Durée estimée</p>
                                        <p className="text-[15px] font-semibold text-[#1B4F72]">{selectedProps.duration}</p>
                                    </div>
                                </div>

                                <div className="space-y-0 divide-y divide-gray-100 text-[11px]">
                                    {[
                                        { label: 'Catégorie', value: selectedProps.category },
                                        { label: 'Matériaux', value: selectedProps.materialIncluded },
                                        { label: 'Statut artisan', value: selectedProps.isVerified ? 'Vérifié ✓' : 'Non vérifié' },
                                        { label: 'Créé le', value: selectedService.dates?.created_at ?? '—' },
                                    ].map(row => (
                                        <div key={row.label} className="flex justify-between py-2.5">
                                            <span className="text-gray-400">{row.label}</span>
                                            <span className="font-medium text-[#1B4F72]">{row.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 space-y-4 flex flex-col">

                                <div className={`px-4 py-3 rounded-lg border text-[12px] font-medium flex items-center gap-2 ${selectedProps.statut === 'approuve' ? 'bg-green-50 border-green-200 text-green-700' :
                                    selectedProps.statut === 'refuse' ? 'bg-red-50 border-red-200 text-red-600' :
                                        'bg-yellow-50 border-yellow-200 text-yellow-700'
                                    }`}>
                                    <StatutBadge statut={selectedProps.statut} />
                                    <span className="ml-1">{selectedProps.isActive ? 'Service actif' : 'Service inactif'}</span>
                                </div>

                                <div className="border border-gray-200 rounded-lg overflow-hidden">
                                    <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200">
                                        <h4 className="text-[12px] font-bold text-[#1B4F72]">Profil Artisan</h4>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-start gap-3 mb-4">
                                            <div className="w-14 h-14 bg-[#1B4F72]/10 flex items-center justify-center rounded-full overflow-hidden flex-shrink-0">
                                                {selectedService.artisan?.avatar ? (
                                                    <img src={selectedService.artisan.avatar} alt="avatar" className="w-full h-full object-cover" />
                                                ) : (
                                                    <span className="text-[20px] font-bold text-[#1B4F72]">
                                                        {selectedService.artisan?.firstname?.charAt(0) ?? '?'}
                                                    </span>
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-[14px] font-bold text-[#1B4F72]">{selectedProps.artisanName}</p>
                                                <p className="text-[11px] text-[#D35400] capitalize">{selectedService.artisan?.specialite}</p>
                                                <div className="flex items-center gap-1 mt-1">
                                                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                                                    <span className="text-[12px] font-medium text-gray-700">{selectedProps.rating}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-2 text-[11px] text-gray-600">
                                            {[
                                                { Icon: Wrench, value: selectedService.artisan?.experience ?? 'Expérience non renseignée' },
                                                { Icon: Mail, value: selectedService.artisan?.email ?? '—' },
                                                { Icon: Phone, value: selectedService.artisan?.phone ?? '—' },
                                                { Icon: MapPin, value: selectedProps.location },
                                            ].map((row, i) => (
                                                <p key={i} className="flex items-center gap-2">
                                                    <row.Icon className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                                                    {row.value}
                                                </p>
                                            ))}
                                            {selectedService.artisan?.cin && (
                                                <p className="flex items-center gap-2">
                                                    <span className="text-gray-400">CIN :</span>
                                                    {selectedService.artisan.cin}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="border border-gray-200 rounded-lg p-4 flex-1">
                                    <h4 className="text-[12px] font-bold text-[#1B4F72] mb-2">Description du service</h4>
                                    <p className="text-[12px] text-gray-600 leading-relaxed whitespace-pre-line">
                                        {selectedService.description || '—'}
                                    </p>
                                </div>

                                {selectedProps.isPending && (
                                    <div className="flex gap-3 pt-2">
                                        <button
                                            onClick={() => setConfirmModal({ open: true, type: 'approve' })}
                                            className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white text-[12px] font-semibold rounded transition-colors flex items-center justify-center gap-2"
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                            Approuver
                                        </button>
                                        <button
                                            onClick={() => setConfirmModal({ open: true, type: 'reject' })}
                                            className="flex-1 py-3 border border-red-400 text-red-500 hover:bg-red-50 text-[12px] font-semibold rounded transition-colors flex items-center justify-center gap-2"
                                        >
                                            <XCircle className="w-4 h-4" />
                                            Rejeter
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServicesManagement;