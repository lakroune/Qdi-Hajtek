import React, { useState } from 'react';
import {
    MapPin, Calendar, DollarSign, Clock, ArrowLeft,
    CheckCircle2, XCircle, MessageCircle, Star, User,
    Phone, Mail, ChevronLeft, ChevronRight,
    Shield, Clock3, Briefcase, AlertCircle
} from 'lucide-react';

const ClientOffreDetail = () => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedProposal, setSelectedProposal] = useState(null);
    const [showAcceptModal, setShowAcceptModal] = useState(false);

    const offre = {
        id: 1,
        title: "Réparation fuite d'eau cuisine et salle de bain",
        category: "Plomberie",
        description: "Le tuyau sous l'évier fuit goutte à goutte depuis hier soir. J'ai dû couper l'arrivée d'eau générale. Besoin d'une intervention urgente pour réparer la fuite et remplacer le joint si nécessaire. L'évier est facilement accessible. Il y a aussi une petite fuite dans la douche.",
        status: "active",
        urgency: "urgent",
        date: "14 Mars 2024",
        location: "Casablanca, Maârif",
        address: "Rue Ibn Sina, Immeuble 12, Apt 5, 2ème étage",
        budgetMin: 200,
        budgetMax: 500,
        createdAt: "Il y a 2 heures",
        photos: [
            "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1589939705384-5185138a04b9?q=80&w=800&h=600&fit=crop"
        ]
    };

    const propositions = [
        {
            id: 1,
            artisan: {
                name: "Karim El Amrani",
                avatar: null,
                rating: 4.9,
                reviews: 127,
                jobsCompleted: 89,
                memberSince: "2022",
                phone: "06 12 34 56 78",
                email: "karim@example.com",
                verified: true,
                specialty: "Plombier expert"
            },
            price: 350,
            duration: "2 heures",
            startDate: "Aujourd'hui",
            message: "Je peux intervenir aujourd'hui même. J'ai 10 ans d'expérience en plomberie et je dispose de tout le matériel nécessaire. La réparation inclut le remplacement du joint et le test d'étanchéité. Garantie 6 mois sur la réparation.",
            status: "pending",
            sentAt: "Il y a 30 min",
            bestPrice: false,
            fastest: true
        },
        {
            id: 2,
            artisan: {
                name: "Youssef Benali",
                avatar: null,
                rating: 4.7,
                reviews: 84,
                jobsCompleted: 56,
                memberSince: "2023",
                phone: "06 98 76 54 32",
                email: "youssef@example.com",
                verified: true,
                specialty: "Plombier généraliste"
            },
            price: 280,
            duration: "1-2 heures",
            startDate: "Demain matin",
            message: "Disponible demain matin à 8h. Prix compétitif avec garantie 3 mois sur la réparation. Je peux aussi vérifier l'installation complète si nécessaire.",
            status: "pending",
            sentAt: "Il y a 1 heure",
            bestPrice: true,
            fastest: false
        },
        {
            id: 3,
            artisan: {
                name: "Mohamed Tazi",
                avatar: null,
                rating: 4.5,
                reviews: 45,
                jobsCompleted: 32,
                memberSince: "2024",
                phone: "06 55 44 33 22",
                email: "mohamed@example.com",
                verified: false,
                specialty: "Dépanneur"
            },
            price: 450,
            duration: "3 heures",
            startDate: "Cette semaine",
            message: "Je propose une réparation complète avec remplacement des tuyaux si nécessaire. Devis détaillé sur place. Intervention possible dès demain après-midi.",
            status: "pending",
            sentAt: "Il y a 3 heures",
            bestPrice: false,
            fastest: false
        }
    ];

    const getUrgencyConfig = (urgency) => {
        const configs = {
            urgent: { label: 'Urgent', color: 'bg-red-500 text-white', lightColor: 'bg-red-50 text-red-700' },
            standard: { label: 'Standard', color: 'bg-blue-500 text-white', lightColor: 'bg-blue-50 text-blue-700' },
            planned: { label: 'Planifié', color: 'bg-gray-500 text-white', lightColor: 'bg-gray-100 text-gray-700' }
        };
        return configs[urgency] || configs.planned;
    };

    const nextImage = () => {
        setSelectedImage((prev) => (prev + 1) % offre.photos.length);
    };

    const prevImage = () => {
        setSelectedImage((prev) => (prev - 1 + offre.photos.length) % offre.photos.length);
    };

    const handleAccept = (proposalId) => {
        setSelectedProposal(proposalId);
        setShowAcceptModal(true);
    };

    const urgency = getUrgencyConfig(offre.urgency);

    return (
        <div className="min-h-screen bg-gray-50 mt-20 pb-8">

            <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
                <div className="w-[90%] mx-auto px-4 py-4">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => window.history.back()}
                            className="p-2 hover:bg-gray-100 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-[#1B4F72]" />
                        </button>
                        <div>
                            <h1 className="text-[18px] font-bold text-[#1B4F72]">Détail de l'offre</h1>
                            <p className="text-[11px] text-gray-500">#{offre.id} • {offre.createdAt}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-[90%] mx-auto px-4 py-6 space-y-6">

                <div className="bg-white border border-gray-200">
                    <div className="relative w-full flex bg-gray-100 ">


                        {offre.photos.length > 0 && (
                            <div className="   grid grid-cols-6 gap-0 border-t border-gray-200">
                                {offre.photos.map((photo, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`relative aspect-square overflow-hidden ${selectedImage === idx
                                            ? 'ring-2 ring-[#D35400] ring-inset z-10'
                                            : 'opacity-60 hover:opacity-100'
                                            }`}
                                    >
                                        <img src={photo} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}



                    </div>
                    <div className="p-5">
                        <h2 className="text-[20px] sm:text-[24px] md:text-[28px] font-bold text-[#1B4F72] leading-tight drop-shadow-lg">
                            {offre.title}
                        </h2>
                    </div>

                </div>

                <div className="bg-white border border-gray-200 p-5 space-y-4">
                    <p className="text-[14px] text-gray-600 leading-relaxed">
                        {offre.description}
                    </p>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-4 border-t border-gray-100">
                        <div className="p-4 bg-gray-50 border border-gray-100">
                            <div className="flex items-center gap-2 text-[#1B4F72] mb-2">
                                <DollarSign className="w-4 h-4" />
                                <span className="text-[10px] uppercase font-bold">Budget</span>
                            </div>
                            <p className="text-[16px] font-bold text-[#D35400]">
                                {offre.budgetMin} - {offre.budgetMax} <span className="text-[12px]">DH</span>
                            </p>
                        </div>

                        <div className="p-4 bg-gray-50 border border-gray-100">
                            <div className="flex items-center gap-2 text-blue-600 mb-2">
                                <MapPin className="w-4 h-4" />
                                <span className="text-[10px] uppercase font-bold">Lieu</span>
                            </div>
                            <p className="text-[14px] font-semibold text-gray-800">{offre.location}</p>
                            <p className="text-[11px] text-gray-500 mt-1">{offre.address}</p>
                        </div>

                        <div className="p-4 bg-gray-50 border border-gray-100">
                            <div className="flex items-center gap-2 text-green-600 mb-2">
                                <Calendar className="w-4 h-4" />
                                <span className="text-[10px] uppercase font-bold">Date</span>
                            </div>
                            <p className="text-[14px] font-semibold text-gray-800">{offre.date}</p>
                        </div>

                        <div className="p-4 bg-gray-50 border border-gray-100">
                            <div className="flex items-center gap-2 text-purple-600 mb-2">
                                <Clock className="w-4 h-4" />
                                <span className="text-[10px] uppercase font-bold">Publiée</span>
                            </div>
                            <p className="text-[14px] font-semibold text-gray-800">{offre.createdAt}</p>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h3 className="text-[18px] font-bold text-[#1B4F72] flex items-center gap-2">
                                Propositions reçues
                                <span className="px-2.5 py-1 bg-[#D35400] text-white text-[12px]">
                                    {propositions.length}
                                </span>
                            </h3>
                            <p className="text-[12px] text-gray-500 mt-1">
                                {propositions.filter(p => p.status === 'pending').length} en attente de réponse
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                        {propositions.map((prop) => (
                            <div
                                key={prop.id}
                                className="bg-white border border-gray-200 overflow-hidden hover:border-[#1B4F72] transition-all flex flex-col"
                            >
                                <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-14 h-14 bg-[#1B4F72] flex items-center justify-center text-white text-[18px] font-bold">
                                                {prop.artisan.name.charAt(0)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-1.5">
                                                    <h4 className="text-[15px] font-bold text-gray-800 truncate">
                                                        {prop.artisan.name}
                                                    </h4>
                                                    {prop.artisan.verified && (
                                                        <Shield className="w-4 h-4 text-blue-500 fill-blue-500" />
                                                    )}
                                                </div>
                                                <p className="text-[11px] text-[#D35400] font-medium mt-0.5">
                                                    {prop.artisan.specialty}
                                                </p>
                                                <div className="flex items-center gap-2 mt-1.5">
                                                    <div className="flex items-center gap-0.5">
                                                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                                        <span className="text-[11px] font-bold text-gray-700">{prop.artisan.rating}</span>
                                                    </div>
                                                    <span className="text-[10px] text-gray-400">({prop.artisan.reviews})</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[20px] font-bold text-[#D35400]">
                                                {prop.price}<span className="text-[12px]">DH</span>
                                            </p>
                                            <p className="text-[10px] text-gray-400 mt-1">{prop.sentAt}</p>
                                        </div>
                                    </div>


                                </div>

                                <div className="p-5 space-y-4 flex-1">
                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="text-center p-2.5 bg-gray-50 border border-gray-100">
                                            <Clock className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                                            <p className="text-[10px] text-gray-500">Durée</p>
                                            <p className="text-[11px] font-bold text-gray-800">{prop.duration}</p>
                                        </div>
                                        <div className="text-center p-2.5 bg-gray-50 border border-gray-100">
                                            <Calendar className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                                            <p className="text-[10px] text-gray-500">Début</p>
                                            <p className="text-[11px] font-bold text-gray-800">{prop.startDate}</p>
                                        </div>
                                        <div className="text-center p-2.5 bg-gray-50 border border-gray-100">
                                            <Briefcase className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                                            <p className="text-[10px] text-gray-500">Travaux</p>
                                            <p className="text-[11px] font-bold text-gray-800">{prop.artisan.jobsCompleted}</p>
                                        </div>
                                    </div>

                                    <div className="p-3 bg-blue-50/50 border border-blue-100">
                                        <p className="text-[11px] text-blue-600 font-medium mb-1">Message :</p>
                                        <p className="text-[12px] text-gray-700 leading-relaxed line-clamp-3">
                                            "{prop.message}"
                                        </p>
                                    </div>


                                </div>

                                <div className="p-5 pt-0 space-y-2">
                                    <button
                                        onClick={() => handleAccept(prop.id)}
                                        className="w-full flex items-center justify-center gap-2 py-3 bg-green-500 hover:bg-green-600 text-white text-[13px] font-bold transition-colors"
                                    >
                                        <CheckCircle2 className="w-4 h-4" />
                                        Accepter cette proposition
                                    </button>


                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {showAcceptModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-green-100 flex items-center justify-center mx-auto mb-3">
                                <CheckCircle2 className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-[20px] font-bold text-gray-800 mb-2">Confirmer l'acceptation ?</h3>
                            <p className="text-[13px] text-gray-500">
                                Vous allez accepter la proposition de <strong className="text-[#1B4F72]">{propositions.find(p => p.id === selectedProposal)?.artisan.name}</strong> pour <strong className="text-[#D35400]">{propositions.find(p => p.id === selectedProposal)?.price} DH</strong>
                            </p>
                        </div>

                        <div className="bg-amber-50 border border-amber-200 p-4 mb-6">
                            <p className="text-[12px] text-amber-700 text-center flex items-center justify-center gap-2">
                                <AlertCircle className="w-4 h-4" />
                                Les autres propositions seront automatiquement refusées
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowAcceptModal(false)}
                                className="flex-1 py-3 border border-gray-200 text-gray-600 text-[13px] font-semibold hover:border-gray-300 transition-colors"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={() => {
                                    setShowAcceptModal(false);
                                }}
                                className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white text-[13px] font-semibold transition-colors"
                            >
                                Confirmer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClientOffreDetail;