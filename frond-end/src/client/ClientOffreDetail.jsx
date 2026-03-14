import React, { useState } from 'react';
import {
    MapPin, Calendar, DollarSign, Clock, ArrowLeft,
    CheckCircle2, XCircle, MessageCircle, Star, 
    Phone, Mail, ChevronLeft, ChevronRight, 
    Award, Shield, Clock3, Briefcase, AlertCircle
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
        date: "14 Mars 2026",
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
                rating: 4.9,
                reviews: 127,
                jobsCompleted: 89,
                phone: "06 12 34 56 78",
                email: "karim@example.com",
                verified: true,
                specialty: "Plombier expert"
            },
            price: 350,
            duration: "2 heures",
            startDate: "Aujourd'hui",
            message: "Je peux intervenir aujourd'hui même. J'ai 10 ans d'expérience en plomberie et je dispose de tout le matériel nécessaire.",
            sentAt: "Il y a 30 min",
            bestPrice: false,
            fastest: true
        },
    ];

    const getUrgencyConfig = (urgency) => {
        const configs = {
            urgent: { label: 'Urgent', color: 'bg-red-600' },
            standard: { label: 'Standard', color: 'bg-blue-600' },
            planned: { label: 'Planifié', color: 'bg-gray-600' }
        };
        return configs[urgency] || configs.planned;
    };

    const nextImage = () => setSelectedImage((prev) => (prev + 1) % offre.photos.length);
    const prevImage = () => setSelectedImage((prev) => (prev - 1 + offre.photos.length) % offre.photos.length);

    return (
        <div className="min-h-screen bg-gray-50 mt-20 pb-8">
            <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
                <div className="w-[90%] mx-auto px-4 py-4">
                    <div className="flex items-center gap-3">
                        <button onClick={() => window.history.back()} className="p-2 hover:bg-gray-100 transition-colors">
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
                
                <div className="bg-white border border-gray-200 overflow-hidden shadow-sm">
                    <div className="relative h-[300px] sm:h-[450px] bg-black group">
                        <img
                            src={offre.photos[selectedImage]}
                            alt="Visualisation de la fuite"
                            className="w-full h-full object-contain mx-auto" 
                        />
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={prevImage} className="w-10 h-10 bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/40">
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button onClick={nextImage} className="w-10 h-10 bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/40">
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="absolute top-4 left-4 flex gap-2">
                            <span className={`px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider ${getUrgencyConfig(offre.urgency).color}`}>
                                {getUrgencyConfig(offre.urgency).label}
                            </span>
                        </div>
                    </div>

                    <div className="p-2 bg-white border-t border-gray-100 flex gap-2 overflow-x-auto">
                        {offre.photos.map((photo, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedImage(idx)}
                                className={`relative flex-shrink-0 w-20 h-20 border-2 transition-all ${
                                    selectedImage === idx ? 'border-[#D35400]' : 'border-transparent opacity-60'
                                }`}
                            >
                                <img src={photo} alt="" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

              
           
            </div>

             
        </div>
    );
};

export default ClientOffreDetail;