import { useEffect, useState } from 'react';
import {
    Star, MapPin, Briefcase, Heart, Share2,
    ChevronLeft, ChevronRight, LoaderCircle,
    Eye, ShieldCheck, LocateFixed, ArrowLeft
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import axiosClient from '../api/axios-client';
import ArtisanPortfolioSkeleton from '../components/skeleton/ArtisanPortfolioSkeleton';

const ArtisanPortfolioPage = () => {
    const [activeTab, setActiveTab] = useState('portfolio');
    const [selectedService, setSelectedService] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [artisan, setArtisan] = useState(null);
    const { id } = useParams();

    const BASE_URL = import.meta.env.VITE_API_URL_STORAGE

    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);

    useEffect(() => {
        const fetchArtisan = async () => {
            try {
                const response = await axiosClient.get(`/artisans/${id}`);
                const data = response.data.data;
                setArtisan(data);
                setIsLiked(data.profile_details.has_liked);
                setLikesCount(data.profile_details.likes);
            } catch (error) {
                console.error('Error fetching artisan:', error);
            }
        };
        fetchArtisan();
    }, [id]);


    if (!artisan) {
        return <ArtisanPortfolioSkeleton />;
    }

    const services = artisan.services || [];
    const reviews = artisan.reviews || [];
    const profile = artisan.profile_details || {};

    const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % selectedService.images.length);
    const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + selectedService.images.length) % selectedService.images.length);

    const toggleLike = async () => {
        try {
            const newStatus = !isLiked;
            setIsLiked(newStatus);
            setLikesCount(prev => newStatus ? prev + 1 : prev - 1);

            await axiosClient.post(`/artisans/${artisan.id}/like`);
        } catch (error) {
            setIsLiked(!isLiked);
            setLikesCount(prev => isLiked ? prev + 1 : prev - 1);
            console.error('Error toggling like:', error);
        }
    };
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pt-6 pb-12">

                <div className="border border-gray-200 p-4 mb-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-shrink-0 flex justify-center">
                            <img
                                src={BASE_URL + artisan.avatar}
                                alt={artisan.full_name}
                                className="w-32 h-32 md:w-40 md:h-40 object-cover border border-gray-200"
                            />
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h1 className="text-[18px] font-bold text-[#1B4F72] truncate">{artisan.full_name}</h1>
                                        {profile.is_verified && (
                                            <ShieldCheck className="w-5 h-5 text-blue-500" />
                                        )}
                                    </div>
                                    <p className="text-[12px] text-[#D35400] font-bold uppercase tracking-wide">{profile.specialite}</p>

                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-[11px] text-gray-600">
                                        <span className="flex items-center gap-0.5">
                                            <Star className="w-3.5 h-3.5 text-[#D35400] fill-current" />
                                            <span className="font-semibold text-[#1B4F72]">{profile.rating_average}</span>
                                        </span>
                                        <span className="text-gray-300">|</span>
                                        <span className="flex items-center gap-0.5">
                                            <Briefcase className="w-3.5 h-3.5" />{services.length} services
                                        </span>
                                        <span className="text-gray-300">|</span>
                                        <span className="flex items-center gap-0.5">
                                            <MapPin className="w-3.5 h-3.5" />{artisan.city}
                                        </span>
                                        <span className="text-gray-300">|</span>
                                        <span className="flex items-center gap-0.5 text-green-600 font-bold">
                                            {profile.missions_completed_count} missions réussies
                                        </span>
                                    </div>
                                    <p className="text-[12px] text-gray-600 mt-4 italic leading-relaxed">
                                        "{profile.bio}"
                                    </p>
                                </div>
                                <div className="flex justify-center gap-2 items-center text-gray-600">
                                    <span className="text-[13px] text-gray-600 font-bold"> {likesCount} </span>

                                    <button
                                        onClick={toggleLike}
                                        className={`p-2 transition-all border ${isLiked ? 'text-[#D35400] bg-orange-50 border-orange-200' : 'text-gray-400 border-gray-100 hover:text-gray-600'}`}
                                    >
                                        <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-b border-gray-200 mb-6">
                    <div className="flex">
                        {[
                            { id: 'portfolio', label: 'Portfolio & Services' },
                            { id: 'reviews', label: 'Avis Clients', count: reviews.length }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-3 text-[12px] font-bold uppercase tracking-widest transition-colors border-b-2 ${activeTab === tab.id ? 'text-[#1B4F72] border-[#D35400]' : 'text-gray-400 border-transparent hover:text-gray-600'}`}
                            >
                                {tab.label} {tab.count > 0 && `(${tab.count})`}
                            </button>
                        ))}
                    </div>
                </div>

                {activeTab === 'portfolio' && (
                    <div className="grid xl:grid-cols-4 md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4">
                        {services.map((service) => (
                            <div key={service.id} className="border border-gray-200 flex flex-col group">
                                <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
                                    <img
                                        src={BASE_URL + service.images[0]}
                                        alt={service.titre}
                                        className="w-full h-full object-cover cursor-zoom-in group-hover:opacity-90 transition-opacity"
                                        onClick={() => {
                                            setSelectedService(service);
                                            setCurrentImageIndex(0);
                                        }}
                                    />
                                    {service.images.length > 1 && (
                                        <span className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-[10px] font-bold">
                                            +{service.images.length - 1} PHOTOS
                                        </span>
                                    )}
                                </div>

                                <div className="p-3 flex-1 flex flex-col">
                                    <h3 className="text-[14px] font-bold text-[#1B4F72] mb-1 line-clamp-1 uppercase tracking-tight">
                                        {service.titre}
                                    </h3>
                                    <p className="text-[11px] text-gray-500 line-clamp-2 mb-4 h-8">
                                        {service.description}
                                    </p>

                                    <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
                                        <p className="text-[16px] font-black text-[#D35400]">
                                            {service.tarif} <span className="text-[10px] text-gray-400 font-normal italic">/ {service.type_tarif}</span>
                                        </p>
                                        <Link to={`/services/${service.id}`} className="p-2 bg-[#1B4F72] text-white hover:bg-[#D35400] transition-all">
                                            <Eye className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div className="max-w-3xl mx-auto space-y-3">
                        {reviews.length === 0 ? (
                            <div className="text-center py-12 text-gray-400 text-[12px] italic border border-dashed border-gray-200">
                                Aucun avis client pour le moment.
                            </div>
                        ) : (
                            reviews.map((review, idx) => (
                                <div key={idx} className="border border-gray-200 p-4 bg-white">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 bg-[#1B4F72] flex items-center justify-center text-white font-bold text-[12px]">
                                            {review.client_name.charAt(0)}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center">
                                                <h4 className="text-[12px] font-bold text-[#1B4F72]">{review.client_name}</h4>
                                                <span className="text-[10px] text-gray-400">{review.date}</span>
                                            </div>
                                            <div className="flex gap-0.5 my-1.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'text-[#D35400] fill-current' : 'text-gray-200'}`} />
                                                ))}
                                            </div>
                                            <p className="text-[12px] text-gray-600 leading-relaxed italic">"{review.comment}"</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            {selectedService && (
                <div className="fixed inset-0 z-[1000] bg-black/95 flex items-center justify-center p-4">
                    <button onClick={() => setSelectedService(null)} className="absolute top-6 left-6 text-white hover:text-[#D35400] transition-colors flex items-center gap-2 font-bold text-[12px] tracking-widest">
                        <ArrowLeft className="w-6 h-6" /> FERMER
                    </button>

                    <button onClick={prevImage} className="absolute left-4 p-4 text-white/50 hover:text-white transition-colors">
                        <ChevronLeft className="w-10 h-10" />
                    </button>

                    <div className="text-center max-w-4xl w-full">
                        <img
                            src={BASE_URL + selectedService.images[currentImageIndex]}
                            alt="gallery"
                            className="max-h-[75vh] mx-auto object-contain border border-white/10 shadow-2xl"
                        />
                        <div className="mt-6">
                            <h2 className="text-white font-bold text-[14px] uppercase tracking-widest">{selectedService.titre}</h2>
                            <p className="text-gray-500 text-[11px] mt-2 font-medium">{currentImageIndex + 1} / {selectedService.images.length}</p>
                        </div>
                    </div>

                    <button onClick={nextImage} className="absolute right-4 p-4 text-white/50 hover:text-white transition-colors">
                        <ChevronRight className="w-10 h-10" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ArtisanPortfolioPage;