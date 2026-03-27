import { useState, useEffect } from 'react';
import {
    Briefcase, MapPin, DollarSign, Calendar,
    Clock, Camera, ArrowLeft,
    AlertCircle, Send,
    FileText, X, Loader2, Euro
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../api/axios-client';
import Input from '../components/inputs/Input';
import Submit from '../components/buttons/Submit';
import SuccessModel from '../components/models/SuccessModel';

const ArtisanOffreDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // States
    const [offre, setOffre] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showPropositionModal, setShowPropositionModal] = useState(false);
    const [errors, setErrors] = useState({});

    const [proposition, setProposition] = useState({
        price: '',
        duration: '',
        durationUnit: 'heures',
        message: '',
        startDate: ''
    });

    // Config Urgence (Matching Database Values)
    const urgencyConfig = {
        urgent: { label: 'Urgent', color: 'bg-red-100 text-red-700 border-red-200' },
        moyen: { label: 'Standard', color: 'bg-blue-100 text-blue-700 border-blue-200' },
        bas: { label: 'Planifié', color: 'bg-gray-100 text-gray-700 border-gray-200' }
    };

    // Fetch Data
    useEffect(() => {
        const fetchOffre = async () => {
            try {
                const response = await axiosClient.get(`/offres/${id}`);
                setOffre(response.data.data);
            } catch (error) {
                console.error('Error fetching offre:', error);
            } finally {
                setIsLoading(false);
            }
        };
        if (id) fetchOffre();
    }, [id]);
    const getImageURL = (imagePath) => {
        if (!imagePath) return null;
        let cleanPath = imagePath.replace(/\\/g, '');

        return `http://127.0.0.1:8000/storage/${cleanPath}`;
    };
    const updateField = (field, value) => {
        setProposition(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
    };

   
   

    // Loading View
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-8 h-8 animate-spin text-[#1B4F72]" />
            </div>
        );
    }

    // Success View
    if (success) {
        return (
            <SuccessModel
                message="Proposition envoyée avec succès"
                goTo="/artisan/propositions"
                buttonName="Voir mes propositions"
            />
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-10">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="w-[95%] max-w-5xl mx-auto px-4 py-4 flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 transition-colors">
                        <ArrowLeft className="w-5 h-5 text-[#1B4F72]" />
                    </button>
                    <div>
                        <h1 className="text-[16px] font-bold text-[#1B4F72]">Détail de l'offre</h1>
                        <p className="text-[11px] text-gray-500">#{offre.id} • {new Date(offre.created_at).toLocaleDateString('fr-FR')}</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="w-[95%] max-w-5xl mx-auto px-4 py-6 space-y-6">
                <div className="bg-white border border-gray-200 p-6 space-y-6 shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`px-2 py-1 text-[10px] font-medium border ${urgencyConfig[offre.niveau_urgence]?.color}`}>
                                    {urgencyConfig[offre.niveau_urgence]?.label}
                                </span>
                                <span className="text-[11px] text-gray-500 flex items-center gap-1">
                                    <Briefcase className="w-3 h-3" />
                                    {offre.categorie?.nom_categorie}
                                </span>
                            </div>
                            <h2 className="text-[20px] font-bold text-[#1B4F72] leading-tight">{offre.titre}</h2>
                            <p className="text-[12px] text-gray-500">Client ID: {offre.client_id}</p>
                        </div>
                        <button
                            onClick={() => setShowPropositionModal(true)}
                            className="px-6 py-3 bg-[#D35400] hover:bg-[#1B4F72] text-white text-[13px] font-bold transition-all shadow-md"
                        >
                            Faire une proposition
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 border border-gray-100">
                            <div className="flex items-center gap-2 text-gray-500 mb-1">
                                <DollarSign className="w-4 h-4" />
                                <span className="text-[10px] uppercase tracking-wide">Budget estimé</span>
                            </div>
                            <p className="text-[16px] font-bold text-[#D35400]">{offre.budget_estime} DH</p>
                        </div>
                        <div className="bg-gray-50 p-4 border border-gray-100">
                            <div className="flex items-center gap-2 text-gray-500 mb-1">
                                <Calendar className="w-4 h-4" />
                                <span className="text-[10px] uppercase tracking-wide">Date souhaitée</span>
                            </div>
                            <p className="text-[16px] font-bold text-[#1B4F72]">
                                {new Date(offre.preferred_date).toLocaleDateString('fr-FR')}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-blue-50/30 border border-blue-100">
                        <MapPin className="w-5 h-5 text-[#1B4F72] flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-[13px] font-medium text-[#1B4F72]">Ville ID: {offre.ville}</p>
                            <p className="text-[12px] text-gray-500 mt-0.5">{offre.address}</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-[13px] font-bold text-[#1B4F72] mb-2 flex items-center gap-2">
                            <FileText className="w-4 h-4" /> Description
                        </h3>
                        <p className="text-[13px] text-gray-600 leading-relaxed bg-gray-50 p-4 border border-gray-100">
                            {offre.description}
                        </p>
                    </div>

                    {/* Image Gallery */}
                    {offre.images && offre.images.length > 0 && (

                        <div>
                            <h3 className="text-[13px] font-bold text-[#1B4F72] mb-3 flex items-center gap-2">
                                <Camera className="w-4 h-4" /> Photos ({offre.images.length})
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {offre.images.map((img, idx) => (
                                    <div key={idx} className="aspect-square bg-gray-100 border border-gray-200 overflow-hidden rounded">
                                        <img src={getImageURL(img.image_url)} alt="offre" className="w-full h-full object-cover hover:scale-105 transition-transform" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Proposition Modal */}
            {showPropositionModal && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-lg max-h-[95vh] overflow-y-auto animate-in slide-in-from-bottom sm:rounded-xl shadow-2xl">
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                            <h3 className="text-[16px] font-bold text-[#1B4F72]">Envoyer votre proposition</h3>
                            <button onClick={() => setShowPropositionModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="p-6 space-y-5">
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <p className="text-[13px] font-medium text-[#1B4F72]">{offre.titre}</p>
                                <p className="text-[11px] text-gray-500 mt-1">Budget client: {offre.budget_estime} DH</p>
                            </div>

                            <div>
                                <label className="block text-[12px] font-bold text-[#1B4F72] mb-2 uppercase tracking-tight">Prix total (DH)</label>
                                <Input
                                    name="price"
                                    type="number"
                                    value={proposition.price}
                                    onChange={(e) => updateField('price', e.target.value)}
                                    placeholder="Ex: 500"
                                    Icon={Euro}
                                />
                                {errors.price && <p className="mt-1 text-[10px] text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.price}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[12px] font-bold text-[#1B4F72] mb-2 uppercase tracking-tight">Durée</label>
                                    <Input
                                        name="duration"
                                        type="number"
                                        value={proposition.duration}
                                        onChange={(e) => updateField('duration', e.target.value)}
                                        placeholder="Ex: 3"
                                        Icon={Clock}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[12px] font-bold text-[#1B4F72] mb-2 uppercase tracking-tight">Unité</label>
                                    <select
                                        value={proposition.durationUnit}
                                        onChange={(e) => updateField('durationUnit', e.target.value)}
                                        className="w-full px-3 py-2.5 text-[13px] border border-gray-200 focus:border-[#D35400] focus:ring-1 focus:ring-[#D35400] outline-none bg-white h-[45px]"
                                    >
                                        <option value="heures">Heures</option>
                                        <option value="jours">Jours</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[12px] font-bold text-[#1B4F72] mb-2 uppercase tracking-tight">Date de début</label>
                                <Input
                                    name="startDate"
                                    type="date"
                                    value={proposition.startDate}
                                    onChange={(e) => updateField('startDate', e.target.value)}
                                    Icon={Calendar}
                                />
                            </div>

                            <div>
                                <label className="block text-[12px] font-bold text-[#1B4F72] mb-2 uppercase tracking-tight">Message</label>
                                <textarea
                                    value={proposition.message}
                                    onChange={(e) => updateField('message', e.target.value)}
                                    placeholder="Décrivez votre expérience pour ce travail..."
                                    rows={4}
                                    className="w-full px-3 py-2 text-[13px] border border-gray-200 focus:border-[#D35400] outline-none resize-none"
                                />
                                <p className="text-[10px] text-gray-400 mt-1">{proposition.message.length} / 20 min characters</p>
                                {errors.message && <p className="text-[10px] text-red-500 mt-1">{errors.message}</p>}
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={() => setShowPropositionModal(false)}
                                    className="flex-1 py-3 text-[13px] font-bold text-gray-600 border border-gray-200 hover:bg-gray-50"
                                >
                                    Annuler
                                </button>
                                <Submit
                                    text="Envoyer"
                                    onClick={handleSubmitProposition}
                                    isLoading={isSubmitting}
                                    icon={Send}
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