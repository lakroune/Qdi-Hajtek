import { useEffect, useState } from 'react';
import {
    Star, MapPin, Clock,
    Briefcase, Heart, Share2,
    ChevronLeft, ChevronRight,
    X, MessageSquare, Calendar,
    LoaderCircle,
    Eye,
    LocateFixed,
    ArrowLeft
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import axiosClient from '../api/axios-client';

const ArtisanPortfolioPage = () => {
    const [activeTab, setActiveTab] = useState('portfolio');
    const [isLiked, setIsLiked] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    const [requestData, setRequestData] = useState({
        description: '',
        date: '',
        address: ''
    });
    const [artisan, setArtisan] = useState(null);
    const [data, setData] = useState([]);
    const { id } = useParams();

    const BASE_URL = 'http://127.0.0.1:8000/storage/';

    useEffect(() => {
        const fetchArtisan = async () => {
            try {
                const response = await axiosClient.get(`/artisans/${id}`);
                setArtisan(response.data.data[0]);
            } catch (error) {
                console.error('Error fetching artisan:', error);
            }
        };
        fetchArtisan();
    }, [id]);

    const handleConfirmDemande = (e) => {
        e.preventDefault();
        console.log("Données envoyées:", requestData);
        setIsPopUpOpen(false);
    };

    if (!artisan) {
        return <div className="flex justify-center items-center h-screen"><LoaderCircle className="animate-spin w-12 h-12 text-[#D35400]" /></div>;
    }

    const services = artisan?.artisan?.services || [];
    const reviews = artisan?.reviews || [];

    const tabs = [
        { id: 'portfolio', label: 'Portfolio & Services' },
        { id: 'reviews', label: 'Avis', count: reviews.length }
    ];

    const currentServiceImages = data?.images || [];

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % currentServiceImages.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + currentServiceImages.length) % currentServiceImages.length);
    };



    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pt-6 pb-12">

                <div className="border border-gray-200 p-4 mb-4">
                    <div className="flex gap-4">
                        <div className="relative flex-shrink-0">
                            <img
                                src={BASE_URL + artisan?.client?.avatar}
                                alt={artisan.lastname}
                                className="w-30 h-30 object-cover border border-gray-200"
                            />
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                                <div>
                                    <h1 className="text-[15px] font-bold text-[#1B4F72] truncate">
                                        {artisan.lastname} {artisan.firstname}
                                    </h1>
                                    <p className="text-[11px] text-[#D35400] font-medium">
                                        {artisan?.artisan?.specialite}
                                    </p>

                                    <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-600">
                                        <span className="flex items-center gap-0.5">
                                            <Star className="w-3 h-3 text-[#D35400] fill-current" />
                                            <span className="font-semibold text-[#1B4F72]">
                                                {artisan?.artisan?.note}
                                            </span>
                                        </span>
                                        <span className="text-gray-300">|</span>
                                        <span className="flex items-center gap-0.5">
                                            <Briefcase className="w-3 h-3" />
                                            {services.length} services
                                        </span>
                                        <span className="text-gray-300">|</span>
                                        <span className="flex items-center gap-0.5">
                                            <MapPin className="w-3 h-3" />
                                            {artisan.city}
                                        </span>
                                        <span className="text-gray-300">|</span>
                                        <span className="flex items-center gap-0.5">
                                            <LocateFixed className="w-3 h-3" />
                                            {artisan?.artisan?.rayon_action} km
                                        </span>

                                    </div>
                                    <div>
                                        <p className="text-[11px] text-gray-600 mt-2">
                                            {artisan?.artisan?.bio}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-1">
                                    <button
                                        onClick={() => setIsLiked(!isLiked)}
                                        className={`p-2  transition-colors ${isLiked ? '  text-[#D35400]' : 'border-gray-200 text-gray-400 hover:text-gray-600'}`}
                                    >
                                        <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                                    </button>
                                    <button className="p-2  text-gray-400 hover:text-gray-600 transition-colors">
                                        <Share2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-b border-gray-200 mb-4">
                    <div className="flex">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-3 text-[12px] font-medium transition-colors border-b-2 ${activeTab === tab.id
                                    ? 'text-[#1B4F72] border-[#D35400]'
                                    : 'text-gray-500 border-transparent hover:text-gray-700'
                                    }`}
                            >
                                {tab.label}
                                {tab.count > 0 && (
                                    <span className="ml-1.5 text-[10px] text-gray-400">
                                        ({tab.count})
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {activeTab === 'portfolio' && (
                    <div className="grid xl:grid-cols-4 md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4">
                        {services.map((service) => (
                            <div key={service.id} className="border border-gray-200">
                                <div className="aspect-[4/2] relative overflow-hidden bg-gray-100">
                                    <img
                                        src={BASE_URL + service.images[0]?.url}
                                        alt={service.titre}
                                        className="aspect-square w-full object-cover hover:opacity-80 transition-opacity cursor-pointer"
                                    />
                                    {service.images.length > 1 && (
                                        <span className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-[10px]">
                                            +{service.images.length - 1} photos
                                        </span>
                                    )}
                                </div>

                                {service.images.length > 0 && (
                                    <div className="flex gap-1 p-2 border-t border-gray-100">
                                        {service.images.slice(0, 5).map((img, idx) => (
                                            <div key={idx} className="w-16 h-16 flex-shrink-0 border border-gray-200 overflow-hidden">
                                                <img
                                                    src={BASE_URL + img?.url}
                                                    alt="service image"
                                                    className="w-16 h-full object-cover hover:opacity-80 transition-opacity cursor-pointer"
                                                    onClick={() => {
                                                        setCurrentImageIndex(idx + 1);
                                                        setSelectedImage({ src: BASE_URL + img?.url, titre: service.titre });
                                                        setData(service);
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="p-3 border-t border-gray-100">
                                    <h3 className="text-[13px] font-bold text-[#1B4F72] mb-1">{service.titre}</h3>
                                    <p className="text-[11px] text-gray-600 line-clamp-2 mb-2">{service.description}</p>

                                    <div className="flex items-center gap-3 text-[10px] text-gray-500 mb-3">
                                        <span className="flex items-center gap-0.5">
                                            <Clock className="w-3 h-3" />
                                            {service.estimation_duree} jours
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                        <p className="text-[16px] font-bold text-[#D35400]">
                                            {service.tarif} MAD
                                            <span className="text-[10px] text-gray-400 ml-1">/ {service.type_tarif}</span>
                                        </p>
                                        <Link
                                            to={`/services/${service.id}`}
                                            className="px-4 py-2 bg-[#1B4F72] text-white text-[11px] font-medium hover:bg-[#154360] transition-colors"
                                        >
                                            <Eye className="w-4 h-4 " />
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
                            reviews.map((review) => (
                                <div key={review.id} className="border border-gray-200 p-3">
                                    <div className="flex items-start gap-2">
                                        <div className="w-8 h-8 bg-[#1B4F72] flex items-center justify-center text-[10px] font-bold text-white">
                                            {review.author?.charAt(0)}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-[11px] font-bold text-[#1B4F72]">{review.author}</h4>
                                                <span className="text-[9px] text-gray-400">{review.date}</span>
                                            </div>
                                            <div className="flex items-center gap-0.5 my-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-3 h-3 ${i < review.rating ? 'text-[#D35400] fill-current' : 'text-gray-200'}`}
                                                    />
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
                <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-4 left-4 text-white  bg-gray-800 hover:text-white text-2xl"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <button onClick={prevImage} className="absolute left-4 p-2 text-white  bg-gray-800 hover:text-white">
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <img
                        src={BASE_URL + (currentServiceImages[currentImageIndex]?.url || selectedImage.src)}
                        alt={selectedImage.titre}
                        className="max-w-full max-h-[85vh] object-contain"
                    />
                    <button onClick={nextImage} className="absolute right-4 p-2 bg-gray-800 text-white hover:text-white">
                        <ChevronRight className="w-6 h-6" />
                    </button>
                    <div className="absolute bottom-4 left-0 right-0 text-center">
                        <p className="text-white text-[12px]">{selectedImage.titre}</p>
                    </div>
                </div>
            )}


        </div>
    );
};

export default ArtisanPortfolioPage;  