import { useEffect, useState } from 'react';
import {
    Star, MapPin, Briefcase, Heart, Share2,
    ChevronLeft, ChevronRight, LoaderCircle,
    Eye, ShieldCheck, LocateFixed, ArrowLeft,
    ShieldAlert,
    Plus,
    X
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import axiosClient from '../api/axios-client';
import ArtisanPortfolioSkeleton from '../components/skeleton/ArtisanPortfolioSkeleton';
import { toast } from 'react-hot-toast';
const ArtisanPortfolioPage = () => {
    const [activeTab, setActiveTab] = useState('portfolio');
    const [selectedService, setSelectedService] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [artisan, setArtisan] = useState(null);
    const { id } = useParams();

    const BASE_URL = import.meta.env.VITE_API_URL_STORAGE
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [reportsMessage, setReportsMessage] = useState('');
    const [showModelReports, setShowModelReports] = useState(false);
    const [reportSubject, setReportSubject] = useState('Autre');
    const [isSubmitting, setIsSubmitting] = useState(false);
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


    const tabs = [
        { id: 'portfolio', label: 'Portfolio & Services' },
        { id: 'reviews', label: 'Avis', count: reviews.length }
    ];


    const submitReport = async () => {
        if (!reportsMessage.trim()) {
            return toast.error("Veuillez saisir une description");
        }

        setIsSubmitting(true);
        try {
            const response = await axiosClient.post(`/artisans/${artisan.id}/report`, {
                subject: reportSubject,
                description: reportsMessage,
                type: 'artisan',
                priority: 'medium'
            });

            if (response.status === 201 || response.status === 200) {
                setShowModelReports(false);
                setReportsMessage('');
                toast.success("Votre signalement a été envoyé avec succès");
            }
        } catch (error) {
            console.error('Error submitting report:', error);
            toast.error('Erreur lors de l\'envoi du signalement');
        } finally {
            setIsSubmitting(false);
        }
    };
    const ModelReports = () => {
        return (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[1000] p-4">
                <div className="bg-white w-full max-w-md border border-gray-200 shadow-2xl animate-in fade-in zoom-in duration-200">
                    <div className="flex items-center gap-3 p-4 border-b border-gray-100">
                        <button
                            onClick={() => setShowModelReports(false)}
                            className="p-1 hover:bg-gray-100 transition-colors text-gray-600"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <h3 className="text-[14px] font-bold text-[#1B4F72] uppercase tracking-wider">
                            Signaler un problème
                        </h3>
                    </div>

                    <div className="p-4 flex flex-col gap-4">
                        <div>
                            <label className="text-[11px] font-bold text-gray-700 mb-1 block uppercase">Sujet du signalement</label>
                            <select
                                value={reportSubject}
                                onChange={(e) => setReportSubject(e.target.value)}
                                className="w-full border border-gray-200 p-2 text-[12px] focus:border-[#1B4F72] outline-none bg-white"
                            >
                                <option value="Comportement inapproprié">Comportement inapproprié</option>
                                <option value="Retard ou absence">Retard ou absence</option>
                                <option value="Qualité de service insuffisante">Qualité de service insuffisante</option>
                                <option value="Désaccord sur le prix">Désaccord sur le prix</option>
                                <option value="Autre">Autre</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-[11px] font-bold text-gray-700 mb-1 block uppercase">Description détaillée</label>
                            <textarea
                                value={reportsMessage}
                                onChange={(e) => setReportsMessage(e.target.value)}
                                rows="4"
                                placeholder="Décrivez le problème en quelques mots..."
                                className="w-full border border-gray-200 p-3 text-[13px] focus:border-[#D35400] outline-none transition-all resize-none"
                            />
                        </div>

                        <div className="flex gap-2 mt-2">
                            <button
                                onClick={() => setShowModelReports(false)}
                                disabled={isSubmitting}
                                className="flex-1 px-3 py-2 bg-gray-100 text-gray-600 text-[12px] font-bold hover:bg-gray-200 transition-colors disabled:opacity-50"
                            >
                                ANNULER
                            </button>
                            <button
                                onClick={submitReport}
                                disabled={isSubmitting}
                                className="flex-1 px-3 py-2 bg-[#1B4F72] text-white text-[12px] font-bold hover:bg-[#D35400] transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                            >
                                {isSubmitting ? (
                                    <>
                                        <LoaderCircle className="w-4 h-4 animate-spin" /> ENVOI...
                                    </>
                                ) : 'ENVOYER'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    return (
        <div className="min-h-screen bg-white">

            {showModelReports && ModelReports()}

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
                                    <button
                                        onClick={() => setShowModelReports(true)}
                                        className={`p-2 transition-all text-gray-400 border-gray-100 hover:text-gray-600`}
                                    >
                                        <ShieldAlert className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
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