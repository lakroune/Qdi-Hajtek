import { useEffect, useRef, useState } from 'react';
import { Briefcase, Search, Grid, List, CheckCircle, XCircle, Star, Banknote, Check, RefreshCw, X } from 'lucide-react';
import ServiceCard from '../components/cards/ServiceCard';
import axiosClient from '../api/axios-client';
import toast from 'react-hot-toast';
import { set } from 'date-fns';

const BASE_URL = 'http://localhost:8000/storage/';

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
        duration: service.duration?.estimated ?? '—',
        location: service.artisan?.city ?? '—',
        artisanName: `${service.artisan?.firstname ?? ''} ${service.artisan?.lastname ?? ''}`.trim(),
        rating: service.artisan?.note ?? '—',
        isActive: service.status?.is_active,
        isVerified: service.artisan?.is_verified,
        isPending: service.status?.statut === 'en_attente',
        statut: service.status?.statut,
    };
};

const ServicesManagement = () => {
    const [services, setServices] = useState([]);
    const [viewMode, setViewMode] = useState('grid');
    const [filter, setFilter] = useState('all');
    const [selectedService, setSelectedService] = useState(null);
    const [modelApproved, setModelApproved] = useState(false);
    const [modelRejected, setModelRejected] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [nextPage, setNextPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [searchQuery, setSearchQuery] = useState('')
    const loaderRef = useRef(null);
    const selectedProps = selectedService ? computeServiceProps(selectedService) : null;
    const [loading, setLoading] = useState(false);

    const fetchServices = async (isNewSearch = false) => {
        if (loading) return;
        try {
            setLoading(true);
            const pageToFetch = isNewSearch ? 1 : nextPage;

            const response = await axiosClient.get('/manager-services', {
                params: {
                    page: pageToFetch,
                    search: searchQuery,
                    statut: filter !== 'all' ? filter : undefined
                }
            });

            const newItems = response.data.data;
            const meta = response.data.meta;

            setServices(prev => isNewSearch ? newItems : [...prev, ...newItems]);
            setNextPage(meta.current_page + 1);
            setHasMore(meta.current_page < meta.last_page);
        } catch (error) {
            toast.error('Erreur de chargement');
        } finally {
            setLoading(false);
        }
    };




    useEffect(() => {

        const delayDebounceFn = setTimeout(() => {
            fetchServices(true);
        }, 400);
        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery, filter]);









    useEffect(() => {
        if (!loaderRef.current || !hasMore || loading) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                fetchServices();
            }
        }, { threshold: 1.0 });

        observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [hasMore, loading, nextPage]);





    const handleApprove = async (id) => {
        try {
            setIsProcessing(true);
            const response = await axiosClient.patch(`/manager-services/${id}/approve`);

            if (response.status === 200) {
                setServices(prevServices =>
                    prevServices.map(service =>
                        service.id === id
                            ? { ...service, status: { ...service.status, statut: 'approuve' } }
                            : service
                    )
                );

                if (selectedService?.id === id) {
                    setSelectedService(null);
                }

                toast.success(`Service ${id} approuvé avec succès`);
            }
        } catch (error) {
            toast.error('Une erreur est survenue lors de l\'approbation du service');
        }
        finally {
            setIsProcessing(false);
            setModelApproved(false);

        }
    };

    const handleReject = async (id) => {
        try {
            setIsProcessing(true);
            const response = await axiosClient.patch(`/manager-services/${id}/reject`);

            if (response.status === 200) {
                setServices(prevServices =>
                    prevServices.map(service =>
                        service.id === id
                            ? { ...service, status: { ...service.status, statut: 'rejete' } }
                            : service
                    )
                );

                if (selectedService?.id === id) {
                    setSelectedService(null);
                }

                toast.success(`Service ${id} rejeté avec succès`);
            }
        } catch (error) {
            toast.error('Une erreur est survenue lors de la rejetation du service');
        }
        finally {
            setModelRejected(false);
            setIsProcessing(false);
        }
    };






    return (
        <div className="space-y-4">
            {modelApproved && (<div className="fixed inset-0 z-[999] flex items-center justify-center p-4" role="dialog" aria-modal="true">
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-200" />
                <div className="relative w-full max-w-xs bg-white shadow-2xl border border-gray-100 transform transition-all animate-in zoom-in-95 duration-200">
                    <div className="p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 bg-[#1B4F72]/10 flex items-center justify-center">
                                <Check className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <h3 className="text-[14px] font-bold text-[#1B4F72]">Confirmation</h3>
                                <p className="text-[12px] text-gray-600">Voulez-vous vraiment  approver ce service ?</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <button onClick={() => setModelApproved(false)} className="py-2 text-[12px] text-gray-400 hover:text-gray-600 font-medium">Non</button>
                            <button
                                disabled={isProcessing}
                                onClick={() => handleApprove(selectedService.id)}
                                className="py-2 bg-[#1B4F72] text-white text-[12px] font-bold hover:bg-[#D35400] transition-colors text-center"
                            >
                                {isProcessing
                                    ? <div className="flex items-center justify-center gap-2"><RefreshCw className="w-4 h-4 animate-spin" /> en cours</div>
                                    : 'Approuver'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>)}
            {modelRejected && (<div className="fixed inset-0 z-[999] flex items-center justify-center p-4" role="dialog" aria-modal="true">
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-200" />
                <div className="relative w-full max-w-xs bg-white shadow-2xl border border-gray-100 transform transition-all animate-in zoom-in-95 duration-200">
                    <div className="p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 bg-[#D35400]/10 flex items-center justify-center">
                                <X className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                                <h3 className="text-[14px] font-bold text-[#1B4F72]">Confirmation</h3>
                                <p className="text-[12px] text-gray-600">Voulez-vous vraiment  rejeter ce service ?</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <button onClick={() => setModelRejected(false)} className="py-2 text-[12px] text-gray-400 hover:text-gray-600 font-medium">Non</button>
                            <button
                                disabled={isProcessing}
                                onClick={() => handleReject(selectedService.id)}
                                className="py-2 bg-[#1B4F72] text-white text-[12px] font-bold hover:bg-[#D35400] transition-colors text-center"
                            >
                                {isProcessing
                                    ? <div className="flex items-center justify-center gap-2"><RefreshCw className="w-4 h-4 animate-spin" /> en cours</div>
                                    : 'Rejeter'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>)}
            <div className="flex items-center justify-between">
                <h1 className="text-[18px] font-bold text-[#1B4F72]">Gestion des Services</h1>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Rechercher un service..."
                            className="pl-9 pr-4 py-2 text-[12px] border border-gray-200 focus:border-[#1B4F72] focus:outline-none w-64"
                        />
                    </div>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-3 py-2 text-[12px] border border-gray-200 focus:border-[#1B4F72] focus:outline-none bg-white"
                    >
                        <option value="all">Tous les statuts</option>
                        <option value="en_attente">En attente</option>
                        <option value="approuve">Approuvés</option>
                        <option value="rejete">Rejetés</option>
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

            <div className="grid grid-cols-4 gap-4">
                {[
                    { label: 'En attente', value: services.filter(s => s.status?.statut === 'en_attente').length, color: 'bg-yellow-500' },
                    { label: 'Approuvés', value: services.filter(s => s.status?.statut === 'approuve').length, color: 'bg-green-500' },
                    { label: 'Rejetés', value: services.filter(s => s.status?.statut === 'rejete').length, color: 'bg-red-500' },
                    { label: 'Total', value: services.length, color: 'bg-[#1B4F72]' },
                ].map((stat) => (
                    <div key={stat.label} className="bg-white border border-gray-200 p-4 flex items-center gap-3">
                        <div className={`w-10 h-10 ${stat.color} flex items-center justify-center rounded-full`}>
                            <Briefcase className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-[20px] font-bold text-[#1B4F72]">{stat.value}</p>
                            <p className="text-[10px] text-gray-500">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {services.map((service) => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            onView={setSelectedService}
                            layout="grid"
                            {...computeServiceProps(service)}
                        />
                    ))}
                </div>
            ) : (
                <div className="space-y-2">
                    {services.map((service) => (
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
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-[12px] text-gray-500">Chargement de la suite...</p>
                    </div>
                )}
                {!hasMore && services.length > 0 && (
                    <p className="text-gray-400 text-[11px] italic">
                        Vous avez atteint la fin de la liste.
                    </p>
                )}
            </div>
            {selectedService && selectedProps && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto">
                    <div className="bg-white w-full max-w-4xl my-8 border border-gray-200">

                        <div className="p-4 border-b border-gray-200 flex items-center justify-between sticky top-0 z-10 bg-white">
                            <div>
                                <h3 className="text-[16px] font-bold text-[#1B4F72]">{selectedProps.title}</h3>
                            </div>
                            <button onClick={() => setSelectedService(null)} className="p-2 text-gray-400 hover:text-[#D35400]">
                                <XCircle className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-0 mt-[140px] p-2">

                            <div className="p-8 space-y-4 border-r border-gray-200">
                                <div className="space-y-2">
                                    <div className="aspect-[4/3] bg-gray-100 relative">
                                        {selectedProps.imageUrl ? (
                                            <img
                                                src={selectedProps.imageUrl}
                                                alt={selectedProps.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-[#1B4F72]/10 flex items-center justify-center">
                                                <Briefcase className="w-16 h-16 text-[#1B4F72]" />
                                            </div>
                                        )}
                                    </div>
                                    {selectedService.gallery?.length > 1 && (
                                        <div className="flex gap-2">
                                            {selectedService.gallery.slice(1).map((img) => {
                                                const url = img.url.startsWith('http') ? img.url : `${BASE_URL}${img.url}`;
                                                return (
                                                    <div key={img.id} className="w-20 h-20 bg-gray-100">
                                                        <img src={url} alt="" className="w-full h-full object-cover" />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-1">
                                        <p className="text-[10px] text-gray-500">Tarif</p>
                                        <p className="text-[20px] font-bold text-[#D35400]">{selectedProps.price} {selectedProps.currency}</p>
                                        <p className="text-[11px] text-gray-600">/{selectedService.pricing?.unit}</p>
                                    </div>
                                    <div className="p-2">
                                        <p className="text-[10px] text-gray-500">Durée estimée</p>
                                        <p className="text-[14px] font-semibold text-[#1B4F72]">{selectedProps.duration}</p>
                                    </div>
                                </div>

                                <div className="space-y-2 text-[11px]">
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="text-gray-500">Matériaux</span>
                                        <span className="font-medium text-[#1B4F72]">{selectedService.duration?.material_included ?? '—'}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="text-gray-500">Catégorie</span>
                                        <span className="font-medium text-[#1B4F72]">{selectedProps.category}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="text-gray-500">Statut artisan</span>
                                        <span className="font-medium text-[#1B4F72]">
                                            {selectedProps.isVerified ? 'Vérifié ✓' : 'Non vérifié'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="text-gray-500">Date de création</span>
                                        <span className="font-medium text-[#1B4F72]">{selectedService.dates?.created_at ?? '—'}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-5 space-y-1">
                                <div className={`p-3 border ${selectedProps.isActive ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                                    <p className="text-[12px] font-medium">
                                        Statut :{' '}
                                        <span className={selectedProps.isActive ? 'text-green-700' : 'text-gray-500'}>
                                            {selectedProps.isActive ? 'Actif' : 'Inactif'}
                                        </span>
                                        {' '}&nbsp;
                                        <span className="text-gray-400 text-[10px]">({selectedProps.statut})</span>
                                    </p>
                                </div>

                                <div className="border border-gray-200 p-4">
                                    <h4 className="text-[13px] font-bold text-[#1B4F72] mb-3">Profil Artisan</h4>
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="w-16 h-16 bg-[#1B4F72]/10 flex items-center justify-center overflow-hidden">
                                            {selectedService.artisan?.avatar ? (
                                                <img
                                                    src={selectedService.artisan.avatar}
                                                    alt="avatar"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-[20px] font-bold text-[#1B4F72]">
                                                    {selectedService.artisan?.firstname?.charAt(0) ?? '?'}
                                                </span>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-[14px] font-semibold text-[#1B4F72]">{selectedProps.artisanName}</p>
                                            <p className="text-[11px] text-[#D35400]">{selectedService.artisan?.specialite}</p>
                                            <div className="flex items-center gap-1 mt-1">
                                                <Star className="w-4 h-4 text-[#D35400]" />
                                                <span className="text-[12px] font-medium">{selectedProps.rating}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-[11px] text-gray-600">
                                        <p className="flex items-center gap-2">
                                            <Briefcase className="w-4 h-4 text-gray-400" />
                                            {selectedService.artisan?.experience ?? 'Expérience non renseignée'}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <span className="text-gray-400">CIN :</span>
                                            {selectedService.artisan?.cin ?? '—'}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <span className="text-gray-400">Email :</span>
                                            {selectedService.artisan?.email}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <span className="text-gray-400">Tél :</span>
                                            {selectedService.artisan?.phone ?? '—'}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <span className="text-gray-400">Ville :</span>
                                            {selectedProps.location}
                                        </p>
                                    </div>
                                </div>

                                <div className="p-4">
                                    <h4 className="text-[12px] font-bold text-[#1B4F72] mb-2">Description du service</h4>
                                    <p className="text-[12px] text-gray-700 leading-relaxed">{selectedService.description}</p>
                                </div>

                                {selectedProps.isPending && (
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setModelApproved(true)}
                                            className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white text-[12px] font-medium transition-colors flex items-center justify-center gap-2"
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                            Approuver le service
                                        </button>
                                        <button
                                            onClick={() => setModelRejected(true)}
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
                </div>
            )}
        </div>
    );
};

export default ServicesManagement;