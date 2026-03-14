import React, { useState } from 'react';
import {
    Briefcase, MapPin, DollarSign, Calendar,
    Clock, Camera, CheckCircle, ArrowLeft,
    AlertCircle, Send, User, Star, MessageCircle,
    FileText, X, Loader2, Euro
} from 'lucide-react';
import Input from '../components/inputs/Input';
import Submit from '../components/buttons/Submit';
import SuccessModel from '../components/models/SuccessModel';

const ArtisanOffreDetail = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showPropositionModal, setShowPropositionModal] = useState(false);

    // Données simulées de l'offre (jaya men API)
    const [offre] = useState({
        id: 1,
        title: "Réparation fuite d'eau urgente salle de bain",
        category: "plomberie",
        categoryLabel: "Plomberie",
        description: "J'ai une fuite d'eau importante sous le lavabo de la salle de bain. L'eau coule en continu et commence à inonder le sol. J'ai dû couper l'arrivée d'eau générale. Besoin d'une intervention rapide svp. La maison est accessible facilement, parking disponible devant.",
        urgency: "urgent",
        budgetMin: 300,
        budgetMax: 600,
        preferredDate: "2025-03-15",
        location: "Casablanca",
        address: "Quartier Maarif, Rue Ibnou Sina, Immeuble 5, Apt 12",
        createdAt: "Il y a 2 heures",
        client: {
            name: "Ahmed Benali",
            avatar: null,
            rating: 4.8,
            jobsPosted: 12
        },
        photos: [
            "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"
        ]
    });

    const [proposition, setProposition] = useState({
        price: '',
        duration: '',
        durationUnit: 'jours',
        message: '',
        startDate: ''
    });

    const [errors, setErrors] = useState({});

    const urgencyConfig = {
        urgent: { label: 'Urgent', color: 'bg-red-100 text-red-700 border-red-200', desc: '24h' },
        standard: { label: 'Standard', color: 'bg-blue-100 text-blue-700 border-blue-200', desc: 'Cette semaine' },
        planned: { label: 'Planifié', color: 'bg-gray-100 text-gray-700 border-gray-200', desc: 'Plus tard' }
    };

    const validateProposition = () => {
        const newErrors = {};
        if (!proposition.price || proposition.price <= 0) newErrors.price = 'Prix requis';
        if (!proposition.duration || proposition.duration <= 0) newErrors.duration = 'Durée requise';
        if (!proposition.startDate) newErrors.startDate = 'Date de début requise';
        if (!proposition.message.trim()) newErrors.message = 'Message requis';
        if (proposition.message.length < 20) newErrors.message = 'Minimum 20 caractères';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmitProposition = async () => {
        if (!validateProposition()) return;

        setIsLoading(true);
        // Simulation API call
        await new Promise(r => setTimeout(r, 1500));
        setIsLoading(false);
        setSuccess(true);
        setShowPropositionModal(false);
    };

    const updateField = (field, value) => {
        setProposition({ ...proposition, [field]: value });
        if (errors[field]) {
            setErrors({ ...errors, [field]: null });
        }
    };

    // Vue Succès après proposition
    if (success) {
        return <SuccessModel
            message="Proposition envoyée"
            goTo="/artisan/offres"
            buttonName="Mes propositions"
        />;
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-10">
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="w-[90%] mx-auto px-4 py-4">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => window.history.back()}
                            className="p-2 hover:bg-gray-100 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-[#1B4F72]" />
                        </button>
                        <div>
                            <h1 className="text-[16px] font-bold text-[#1B4F72]">Détail de l'offre</h1>
                            <p className="text-[11px] text-gray-500">#{offre.id} • {offre.createdAt}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-[90%] mx-auto px-4 py-6 space-y-6">



                <div className="bg-white border border-gray-200 p-6 space-y-6">

                    <div className=' flex items-center justify-between '>
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`px-2 py-1 text-[10px] font-medium border ${urgencyConfig[offre.urgency].color}`}>
                                    {urgencyConfig[offre.urgency].label}
                                </span>
                                <span className="text-[11px] text-gray-500 flex items-center gap-1">
                                    <Briefcase className="w-3 h-3" />
                                    {offre.categoryLabel}
                                </span>
                            </div>
                            <h2 className="text-[18px] font-bold text-[#1B4F72] leading-tight">
                                {offre.title}

                            </h2>

                            <p className="text-[12px] text-gray-500">{offre.client.name}</p>
                        </div>
                        <button
                            onClick={() => setShowPropositionModal(true)}
                            className=" py-2.5 p-1 bg-[#D35400] hover:bg-[#1B4F72] text-white text-[12px] font-bold transition-colors flex items-center justify-center gap-2"
                        >

                            faire une proposition
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-3 border border-gray-200">
                            <div className="flex items-center gap-2 text-gray-500 mb-1">
                                <DollarSign className="w-4 h-4" />
                                <span className="text-[10px] uppercase tracking-wide">Budget</span>
                            </div>
                            <p className="text-[14px] font-bold text-[#D35400]">
                                {offre.budgetMin} - {offre.budgetMax} DH
                            </p>
                        </div>
                        <div className="bg-gray-50 p-3 border border-gray-200">
                            <div className="flex items-center gap-2 text-gray-500 mb-1">
                                <Calendar className="w-4 h-4" />
                                <span className="text-[10px] uppercase tracking-wide">Date souhaitée</span>
                            </div>
                            <p className="text-[14px] font-bold text-[#1B4F72]">
                                {new Date(offre.preferredDate).toLocaleDateString('fr-FR')}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-blue-50/50 border border-blue-100">
                        <MapPin className="w-5 h-5 text-[#1B4F72] flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-[12px] font-medium text-[#1B4F72]">{offre.location}</p>
                            <p className="text-[11px] text-gray-500 mt-0.5">{offre.address}</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-[12px] font-bold text-[#1B4F72] mb-2 flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Description du besoin
                        </h3>
                        <p className="text-[12px] text-gray-600 leading-relaxed bg-gray-50 p-4 border border-gray-200">
                            {offre.description}
                        </p>
                    </div>

                    {offre.photos.length > 0 && (
                        <div>
                            <h3 className="text-[12px] font-bold text-[#1B4F72] mb-3 flex items-center gap-2">
                                <Camera className="w-4 h-4" />
                                Photos ({offre.photos.length})
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                {offre.photos.map((photo, idx) => (
                                    <div key={idx} className="aspect-square bg-gray-100 border border-gray-200 overflow-hidden">
                                        <img
                                            src={photo}
                                            alt={`Photo ${idx + 1}`}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>


            </div>

            {showPropositionModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
                    <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom sm:rounded-lg">

                        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                            <h3 className="text-[16px] font-bold text-[#1B4F72]">Votre proposition</h3>
                            <button
                                onClick={() => setShowPropositionModal(false)}
                                className="p-2 hover:bg-gray-100 transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">

                            <div className="bg-gray-50 p-4 border border-gray-200">
                                <p className="text-[11px] text-gray-500 mb-1">Pour l'offre :</p>
                                <p className="text-[13px] font-medium text-[#1B4F72]">{offre.title}</p>
                                <div className="flex items-center gap-3 mt-2 text-[11px] text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <DollarSign className="w-3 h-3" />
                                        Budget client: {offre.budgetMin}-{offre.budgetMax} DH
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {urgencyConfig[offre.urgency].label}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-medium text-[#1B4F72] mb-2">
                                    Votre prix (DH) <span className="text-[#D35400]">*</span>
                                </label>
                                <div className="relative">
                                    <Input
                                        label=""
                                        name="price"
                                        type="number"
                                        value={proposition.price}
                                        onChange={(e) => updateField('price', e.target.value)}
                                        placeholder="Ex: 450"
                                        Icon={Euro}
                                    />
                                </div>
                                {errors.price && (
                                    <p className="mt-1 text-[10px] text-red-500 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" /> {errors.price}
                                    </p>
                                )}
                                <p className="mt-1 text-[10px] text-gray-400">
                                    Prix total TTC pour la prestation
                                </p>
                            </div>

                            <div>
                                <label className="block text-[11px] font-medium text-[#1B4F72] mb-2">
                                    Durée estimée <span className="text-[#D35400]">*</span>
                                </label>
                                <div className="flex gap-3">
                                    <div className="flex-1">
                                        <Input
                                            label=""
                                            name="duration"
                                            type="number"
                                            value={proposition.duration}
                                            onChange={(e) => updateField('duration', e.target.value)}
                                            placeholder="Ex: 2"
                                            Icon={Clock}
                                        />
                                    </div>
                                    <select
                                        value={proposition.durationUnit}
                                        onChange={(e) => updateField('durationUnit', e.target.value)}
                                        className="px-3 disabled  py-2 text-[12px] border border-gray-200 focus:border-[#D35400] focus:outline-none bg-white w-32"
                                    >
                                        <option selected disabled value="heures">Heures</option>
                                    </select>
                                </div>
                                {errors.duration && (
                                    <p className="mt-1 text-[10px] text-red-500 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" /> {errors.duration}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Input
                                    label="Date de début possible"
                                    name="startDate"
                                    type="date"
                                    value={proposition.startDate}
                                    onChange={(e) => updateField('startDate', e.target.value)}
                                    required
                                    Icon={Calendar}
                                />
                                {errors.startDate && (
                                    <p className="mt-1 text-[10px] text-red-500 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" /> {errors.startDate}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-[11px] font-medium text-[#1B4F72] mb-2">
                                    Message au client <span className="text-[#D35400]">*</span>
                                </label>
                                <textarea
                                    value={proposition.message}
                                    onChange={(e) => updateField('message', e.target.value)}
                                    placeholder="Présentez votre approche, votre expérience similaire, les étapes de votre intervention..."
                                    rows={4}
                                    className="w-full px-3 py-2 text-[12px] border border-gray-200 focus:border-[#D35400] focus:outline-none resize-none"
                                />
                                <div className="flex justify-between mt-1">
                                    <span className="text-[10px] text-gray-400">
                                        Minimum 20 caractères
                                    </span>
                                    <span className={`text-[10px] ${proposition.message.length < 20 ? 'text-gray-400' : 'text-green-600'}`}>
                                        {proposition.message.length} caractères
                                    </span>
                                </div>
                                {errors.message && (
                                    <p className="mt-1 text-[10px] text-red-500 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" /> {errors.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-gray-100">
                                <button
                                    onClick={() => setShowPropositionModal(false)}
                                    className="flex-1 py-3 border border-gray-200 hover:border-[#1B4F72] text-[12px] text-gray-600 hover:text-[#1B4F72] transition-colors"
                                >
                                    Annuler
                                </button>
                                <Submit
                                    text={isLoading ? 'Envoi...' : 'Envoyer ma proposition'}
                                    onClick={handleSubmitProposition}
                                    isLoading={isLoading}
                                    icon={isLoading ? Loader2 : Send}
                                    size="md"
                                    className="flex-1"
                                    variant="secondary"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ArtisanOffreDetail;