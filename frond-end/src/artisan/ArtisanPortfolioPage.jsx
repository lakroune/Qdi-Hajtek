import { useEffect, useState } from 'react';
import {
    Star, MapPin, Clock, Briefcase, Heart, Share2,
    ChevronLeft, ChevronRight, MessageSquare, LoaderCircle,
    LocateFixed, ArrowLeft, Eye, ShieldCheck
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import axiosClient from '../api/axios-client';

const ArtisanPortfolioPage = () => {
    const [activeTab, setActiveTab] = useState('portfolio');
    const [isLiked, setIsLiked] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [artisan, setArtisan] = useState(null);
    const { id } = useParams();

    const BASE_URL = 'http://127.0.0.1:8000/storage/';

    useEffect(() => {
        const fetchArtisan = async () => {
            try {
                const response = await axiosClient.get(`/artisans/${id}`);
                // Mapping direct 3la hsab l-JSON lli 3titini
                setArtisan(response.data.data);
            } catch (error) {
                console.error('Error fetching artisan:', error);
            }
        };
        fetchArtisan();
    }, [id]);

    if (!artisan) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoaderCircle className="animate-spin w-12 h-12 text-[#D35400]" />
            </div>
        );
    }

    const services = artisan.services || [];
    const reviews = artisan.reviews || [];

    const nextImage = (e) => {
        e.stopPropagation();
        const images = selectedService?.images || [];
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        const images = selectedService?.images || [];
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="min-h-screen bg-gray-50/50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pt-6 pb-12">

                {/* Profile Header */}
                <div className="bg-white border border-gray-200 p-6 mb-6   ">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-shrink-0 flex justify-center">
                            <img
                                src={BASE_URL + artisan.avatar}
                                alt={artisan.full_name}
                                className="w-32 h-32 md:w-40 md:h-40 object-cover border-2 border-gray-100 rounded-sm"
                            />
                        </div>

                        <div className="flex-1">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h1 className="text-xl font-bold text-[#1B4F72]">{artisan.full_name}</h1>
                                        {artisan.profile_details.is_verified && (
                                            <ShieldCheck className="w-5 h-5 text-blue-500" title="Vérifié" />
                                        )}
                                    </div>
                                    <p className="text-sm text-[#D35400] font-semibold uppercase tracking-wider mt-1">
                                        {artisan.profile_details.specialite}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-3 text-sm text-gray-600">
                                        <span className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-[#D35400] fill-current" />
                                            <span className="font-bold text-[#1B4F72]">{artisan.profile_details.rating_average}</span>
                                        </span>
                                        <span className="text-gray-300">|</span>
                                        <span className="flex items-center gap-1">
                                            <Briefcase className="w-4 h-4" />
                                            {services.length} Services
                                        </span>
                                        <span className="text-gray-300">|</span>
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            {artisan.city}
                                        </span>
                                        <span className="text-gray-300">|</span>
                                        <span className="flex items-center gap-1 text-green-600 font-medium">
                                            {artisan.profile_details.missions_completed_count} Missions réussies
                                        </span>
                                    </div>

                                    <div className="mt-4 max-w-2xl">
                                        <p className="text-sm text-gray-600 leading-relaxed italic whitespace-pre-line">
                                            "{artisan.profile_details.bio}"
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button onClick={() => setIsLiked(!isLiked)} className={`p-2 border    transition-all ${isLiked ? 'bg-orange-50 border-[#D35400] text-[#D35400]' : 'border-gray-200 text-gray-400 hover:bg-gray-50'}`}>
                                        <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                                    </button>
                                    <button className="p-2 border border-gray-200    text-gray-400 hover:bg-gray-50"><Share2 className="w-5 h-5" /></button>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200 mb-6 bg-white sticky top-20 z-10">
                    <div className="flex gap-8 px-4">
                        {['portfolio', 'reviews'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-4 text-sm font-bold transition-all border-b-2 uppercase tracking-widest ${activeTab === tab ? 'text-[#1B4F72] border-[#D35400]' : 'text-gray-400 border-transparent'}`}
                            >
                                {tab === 'portfolio' ? 'Portfolio' : `Avis (${reviews.length})`}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Services Grid */}
                {activeTab === 'portfolio' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service) => (
                            <div key={service.id} className="group bg-white border border-gray-200 overflow-hidden hover:   transition-all">
                                <div className="aspect-video relative overflow-hidden bg-gray-100">
                                    <img
                                        src={BASE_URL + service.images[0]}
                                        alt={service.titre}
                                        className={`w-full h-full object-cover cursor-zoom-in ${!service.is_active && 'grayscale opacity-50'}`}
                                        onClick={() => {
                                            setSelectedService(service);
                                            setCurrentImageIndex(0);
                                        }}
                                    />
                                    {!service.is_active && (
                                        <div className="absolute top-2 left-2 bg-gray-800 text-white text-[10px] px-2 py-1 font-bold">INACTIF</div>
                                    )}
                                    {service.images.length > 1 && (
                                        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 text-white text-[10px] font-bold">
                                            +{service.images.length - 1} PHOTOS
                                        </div>
                                    )}
                                </div>

                                <div className="p-4">
                                    <h3 className="text-md font-bold text-[#1B4F72] mb-2 line-clamp-1">{service.titre}</h3>
                                    <p className="text-xs text-gray-500 line-clamp-2 mb-4 h-8">{service.description}</p>

                                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                        <p className="text-lg font-black text-[#D35400]">
                                            {service.tarif} <span className="text-[10px] text-gray-400 font-normal">/ {service.type_tarif.replace('_', ' ')}</span>
                                        </p>
                                        <Link to={`/services/${service.id}`} className="p-2 bg-gray-50 text-[#1B4F72] hover:bg-[#1B4F72] hover:text-white transition-all">
                                            <Eye className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Reviews Section */}
                {activeTab === 'reviews' && (
                    <div className="max-w-3xl mx-auto space-y-4">
                        {reviews.length === 0 ? (
                            <div className="text-center py-12 text-gray-400 italic">Aucun avis pour le moment.</div>
                        ) : (
                            reviews.map((review, idx) => (
                                <div key={idx} className="bg-white border border-gray-100 p-5">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-gray-200    flex items-center justify-center font-bold text-[#1B4F72]">
                                            {review.client_name.charAt(0)}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center mb-1">
                                                <h4 className="text-sm font-bold text-[#1B4F72]">{review.client_name}</h4>
                                                <span className="text-[10px] text-gray-400">{review.date}</span>
                                            </div>
                                            <div className="flex gap-0.5 mb-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'text-[#D35400] fill-current' : 'text-gray-200'}`} />
                                                ))}
                                            </div>
                                            <p className="text-sm text-gray-600 italic">"{review.comment}"</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            {/* Lightbox / Gallery */}
            {selectedService && (
                <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4">
                    <button onClick={() => setSelectedService(null)} className="absolute top-6 left-6 text-white flex items-center gap-2 font-bold">
                        <ArrowLeft className="w-6 h-6" /> <span>FERMER</span>
                    </button>

                    <button onClick={prevImage} className="absolute left-4 p-4 text-white/50 hover:text-white"><ChevronLeft className="w-10 h-10" /></button>

                    <div className="text-center">
                        <img
                            src={BASE_URL + selectedService.images[currentImageIndex]}
                            alt="gallery"
                            className="max-h-[70vh] w-auto object-contain mx-auto border border-white/10"
                        />
                        <h2 className="text-white mt-4 font-bold uppercase tracking-widest">{selectedService.titre}</h2>
                    </div>

                    <button onClick={nextImage} className="absolute right-4 p-4 text-white/50 hover:text-white"><ChevronRight className="w-10 h-10" /></button>
                </div>
            )}
        </div>
    );
};

export default ArtisanPortfolioPage;