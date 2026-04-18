import { useEffect, useState, useRef } from 'react';
import {
    Star, MapPin, Clock,
    Briefcase, Heart, Share2,
    ChevronLeft, ChevronRight,
    LoaderCircle,
    Eye,
    LocateFixed,
    MoreVertical,
    ToggleLeft,
    ToggleRight,
    AlertTriangle,
    Plus,
    Loader2,
    Check,
    ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import axiosClient from '../api/axios-client';
import ArtisanPortfolioSkeleton from '../components/skeleton/ArtisanPortfolioSkeleton';

const Portfolio = () => {
    const [activeTab, setActiveTab] = useState('portfolio');
    const [isLiked, setIsLiked] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [artisan, setArtisan] = useState(null);
    const [data, setData] = useState(null);

    const [openMenuId, setOpenMenuId] = useState(null);
    const [changeEtatService, setChangeEtatService] = useState(null);
    const [isToggeling, setIsToggeling] = useState(null);

    const menuRef = useRef(null);
    const BASE_URL = 'http://127.0.0.1:8000/storage/';

    useEffect(() => {
        const fetchArtisan = async () => {
            try {
                const response = await axiosClient.get('/portfolio');
                setArtisan(response.data.data);
            } catch (error) {
                console.error('Error fetching artisan:', error);
            }
        };
        fetchArtisan();
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpenMenuId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleToggleService = async (service) => {
        if (!service) return;
        setIsToggeling(service.id);
        setOpenMenuId(null);
        try {
            await axiosClient.patch(`/services/${service.id}/toggle`);
            setArtisan(prev => ({
                ...prev,
                services: prev.services.map(s =>
                    s.id === service.id ? { ...s, is_active: !s.is_active } : s
                )
            }));
            setChangeEtatService(null);
        } catch (error) {
            console.error('Erreur toggle:', error);
        } finally {
            setIsToggeling(null);
        }
    };

    if (!artisan) {
        return (
           
                <ArtisanPortfolioSkeleton />
           
        );
    }

    const services = artisan.services || [];
    const reviews = artisan.reviews || [];
    const profile = artisan.profile_details || {};
    const location = profile.location || {};
    const currentServiceImages = data?.images || [];

    const tabs = [
        { id: 'portfolio', label: 'Portfolio & Services' },
        { id: 'reviews', label: 'Avis', count: reviews.length }
    ];

    const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % currentServiceImages.length);
    const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + currentServiceImages.length) % currentServiceImages.length);

    return (
        <div className="min-h-screen bg-white">
            {changeEtatService && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={() => setChangeEtatService(null)} />
                    <div className="relative w-full max-w-xs bg-white shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-200">
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-red-50 flex items-center justify-center flex-shrink-0">
                                    <AlertTriangle className="w-5 h-5 text-red-500" />
                                </div>
                                <div>
                                    <h3 className="text-[14px] font-bold text-[#1B4F72]">Attention</h3>
                                    <p className="text-[11px] text-gray-400 mt-0.5">Cette action changera la visibilité du service</p>
                                </div>
                            </div>
                            <p className="text-[12px] text-gray-600 mb-5">
                                Voulez-vous changer l’état du service{' '}
                                <span className="font-semibold text-[#1B4F72]">"{changeEtatService.titre}"</span> ?
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => setChangeEtatService(null)}
                                    className="py-2 text-[12px] text-gray-400 hover:text-gray-600 font-medium border border-gray-200 hover:border-gray-300 transition-colors"
                                >
                                    Annuler
                                </button>
                                <button
                                    disabled={isToggeling === changeEtatService.id}
                                    onClick={() => handleToggleService(changeEtatService)}
                                    className="py-2 bg-[#1B4F72] text-white text-[12px] font-medium border border-[#1B4F72] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                                >
                                    {isToggeling === changeEtatService.id ? (
                                        <><Loader2 className="w-3 h-3 animate-spin" /> En cours...</>
                                    ) : (
                                        <><Check className="w-3 h-3" /> Confirmer</>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pt-6 pb-12">
                <div className="border border-gray-200 p-4 mb-4">
                    <div className="flex gap-4">
                        <div className="relative flex-shrink-0">
                            <img
                                src={BASE_URL + artisan.avatar}
                                alt={artisan.full_name}
                                className="w-32 h-32 object-cover border border-gray-200"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                                <div>
                                    <h1 className="text-[15px] font-bold text-[#1B4F72] truncate">{artisan.full_name}</h1>
                                    <p className="text-[11px] text-[#D35400] font-medium">{profile.specialite}</p>
                                    <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-600">
                                        <span className="flex items-center gap-0.5">
                                            <Star className="w-3 h-3 text-[#D35400] fill-current" />
                                            <span className="font-semibold text-[#1B4F72]">{profile.rating_average}</span>
                                        </span>
                                        <span className="text-gray-300">|</span>
                                        <span className="flex items-center gap-0.5">
                                            <Briefcase className="w-3 h-3" />{services.length} services
                                        </span>
                                        <span className="text-gray-300">|</span>
                                        <span className="flex items-center gap-0.5">
                                            <MapPin className="w-3 h-3" />{artisan.city}
                                        </span>
                                        <span className="text-gray-300">|</span>
                                        <span className="flex items-center gap-0.5">
                                            <LocateFixed className="w-3 h-3" />{location.rayon_action} km
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-gray-600 mt-2">{profile.bio}</p>
                                </div>
                                <div className="flex gap-1">
                                    <button onClick={() => setIsLiked(!isLiked)} className={`p-2 transition-colors ${isLiked ? 'text-[#D35400]' : 'text-gray-400 hover:text-gray-600'}`}>
                                        <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                                    </button>
                                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                        <Share2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-b border-gray-200 mb-4">
                    <div className="flex items-center justify-between">
                        <div className="flex">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-4 py-3 text-[12px] font-medium transition-colors border-b-2 ${activeTab === tab.id ? 'text-[#1B4F72] border-[#D35400]' : 'text-gray-500 border-transparent hover:text-gray-700'}`}
                                >
                                    {tab.label}
                                    {tab.count > 0 && <span className="ml-1.5 text-[10px] text-gray-400">({tab.count})</span>}
                                </button>
                            ))}
                        </div>

                        {activeTab === 'portfolio' && (
                            <Link
                                to="/nouvelle-service"
                                className="px-4 py-2 bg-[#D35400] text-white text-[12px] font-medium hover:bg-[#C14C00] transition-colors flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                Nouveau service
                            </Link>
                        )}
                    </div>
                </div>

                {activeTab === 'portfolio' && (
                    <div className="grid xl:grid-cols-4 md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4">
                        {services.map((service) => (
                            <div key={service.id} className={`border border-gray-200 relative ${!service.is_active ? 'opacity-60' : ''}`}>
                                {!service.is_active && (
                                    <span className="absolute top-2 left-2 z-10 px-2 py-0.5 bg-gray-700/80 text-white text-[9px] font-bold uppercase tracking-wider">
                                        Inactif
                                    </span>
                                )}

                                <div className="absolute top-2 right-2 z-10">
                                    <button
                                        onClick={() => setOpenMenuId(openMenuId === service.id ? null : service.id)}
                                        className="w-7 h-7 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white transition-colors"
                                    >
                                        <MoreVertical className="w-4 h-4" />
                                    </button>

                                    {openMenuId === service.id && (
                                        <div ref={menuRef} className="absolute right-0 top-8 w-44 bg-white border border-gray-200 shadow-lg z-20">
                                            <button
                                                onClick={() => { setChangeEtatService(service); setOpenMenuId(null); }}
                                                className="w-full flex items-center gap-2 px-3 py-2.5 text-[12px] text-gray-700 hover:bg-gray-50 transition-colors"
                                            >
                                                {service.is_active ? <ToggleLeft className="w-4 h-4 text-orange-400" /> : <ToggleRight className="w-4 h-4 text-green-500" />}
                                                {service.is_active ? 'Dépublier' : 'Publier'}
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="aspect-[4/2] relative overflow-hidden bg-gray-100">
                                    <img
                                        src={BASE_URL + service.images[0]}
                                        alt={service.titre}
                                        className="w-full h-full object-cover hover:opacity-80 transition-opacity cursor-pointer"
                                        onClick={() => {
                                            setCurrentImageIndex(0);
                                            setSelectedImage({ src: service.images[0], titre: service.titre });
                                            setData(service);
                                        }}
                                    />
                                    {service.images.length > 1 && (
                                        <span className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-[10px]">
                                            +{service.images.length - 1} photos
                                        </span>
                                    )}
                                </div>

                                <div className="flex gap-1 p-2 border-t border-gray-100">
                                    {service.images.slice(0, 5).map((img, idx) => (
                                        <div key={idx} className="w-16 h-16 flex-shrink-0 border border-gray-200 overflow-hidden">
                                            <img
                                                src={BASE_URL + img}
                                                alt="service thumbnail"
                                                className="w-full h-full object-cover hover:opacity-80 transition-opacity cursor-pointer"
                                                onClick={() => {
                                                    setCurrentImageIndex(idx);
                                                    setSelectedImage({ src: img, titre: service.titre });
                                                    setData(service);
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className="p-3 border-t border-gray-100">
                                    <h3 className="text-[13px] font-bold text-[#1B4F72] mb-1">{service.titre}</h3>
                                    <div className="flex items-center gap-3 text-[10px] text-gray-500 mb-3">
                                        <span className="flex items-center gap-0.5">
                                            <Clock className="w-3 h-3" />
                                            {service.stats?.total_demandes ?? 0} demandes
                                        </span>
                                        <span className="flex items-center gap-0.5 text-orange-400">
                                            {service.stats?.en_attente ?? 0} en attente
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                        <p className="text-[16px] font-bold text-[#D35400]">
                                            {service.tarif}
                                            <span className="text-[10px] text-gray-400 ml-1">/ {service.type_tarif}</span>
                                        </p>
                                        <Link
                                            to={`/services/${service.id}`}
                                            className="p-2 bg-[#1B4F72] text-white hover:bg-[#154360] transition-colors"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div className="space-y-3">
                        {reviews.length === 0 ? (
                            <p className="text-[12px] text-gray-400 text-center py-8">Aucun avis pour le moment.</p>
                        ) : (
                            reviews.map((review, index) => (
                                <div key={index} className="border border-gray-200 p-3">
                                    <div className="flex items-start gap-2">
                                        {review.client_avatar ? (
                                            <img src={BASE_URL + review.client_avatar} alt={review.client_name} className="w-8 h-8 object-cover" />
                                        ) : (
                                            <div className="w-8 h-8 bg-[#1B4F72] flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">
                                                {review.client_name?.charAt(0)}
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-[11px] font-bold text-[#1B4F72]">{review.client_name}</h4>
                                                <span className="text-[9px] text-gray-400">{review.date}</span>
                                            </div>
                                            <div className="flex items-center gap-0.5 my-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'text-[#D35400] fill-current' : 'text-gray-200'}`} />
                                                ))}
                                            </div>
                                            <p className="text-[11px] text-gray-600">{review.comment}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            {selectedImage && (
                <div className="fixed inset-0 z-[1000] bg-black/90 flex items-center justify-center p-4">
                    <button onClick={() => setSelectedImage(null)} className="absolute top-4 left-4 text-white hover:text-gray-300">
                        <ArrowLeft className="w-8 h-8" />
                    </button>
                    <button onClick={prevImage} className="absolute left-4 p-2 text-white hover:bg-white/10 transition-colors">
                        <ChevronLeft className="w-10 h-10" />
                    </button>
                    <img
                        src={BASE_URL + currentServiceImages[currentImageIndex]}
                        alt={selectedImage.titre}
                        className="max-w-full max-h-[85vh] object-contain"
                    />
                    <button onClick={nextImage} className="absolute right-4 p-2 text-white hover:bg-white/10 transition-colors">
                        <ChevronRight className="w-10 h-10" />
                    </button>
                    <div className="absolute bottom-6 text-center w-full">
                        <p className="text-white text-[14px] font-medium">{selectedImage.titre}</p>
                        <p className="text-gray-400 text-[12px] mt-1">{currentImageIndex + 1} / {currentServiceImages.length}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Portfolio;