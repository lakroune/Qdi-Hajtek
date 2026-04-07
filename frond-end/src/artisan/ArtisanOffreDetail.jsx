import { useState, useEffect } from 'react';
import {
    Briefcase, MapPin, DollarSign, Calendar,
    Clock, Camera, ArrowLeft,
    AlertCircle, Send,
    FileText, X, Loader2, Euro, User
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../api/axios-client';
import Input from '../components/inputs/Input';
import Submit from '../components/buttons/Submit';
import SuccessModel from '../components/models/SuccessModel';
import toast from 'react-hot-toast';

const ArtisanOffreDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [offre, setOffre] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPropositionModal, setShowPropositionModal] = useState(false);
    const [errors, setErrors] = useState({});

    const [proposition, setProposition] = useState({
        price: '',
        duration: '',
        durationUnit: 'heures',
        message: '',
        offre_id: id,
        startDate: ''
    });

    const urgencyConfig = {
        urgent: { label: 'Urgent', color: 'bg-red-50  text-red-700  border border-red-200' },
        moyen: { label: 'Standard', color: 'bg-blue-50 text-blue-700 border border-blue-200' },
        faible: { label: 'Planifié', color: 'bg-gray-50 text-gray-700 border border-gray-200' },
    };

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

    const updateField = (field, value) => {
        setProposition(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
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

    const faireProposition = async () => {
        if (!validateProposition()) return;

        const formData = new FormData();
        formData.append('prix_propose', proposition.price);
        formData.append('delai_execution', proposition.duration);
        formData.append('durationUnit', proposition.durationUnit);
        formData.append('offre_travail_id', id);
        formData.append('message_explicatif', proposition.message);
        formData.append('date_disponibilite', proposition.startDate);

        setIsSubmitting(true);
        try {
            const response = await axiosClient.post(`/offres/${id}/propositions`, formData);
            toast.success('Proposition envoyée avec succès');
            setShowPropositionModal(false);
        } catch (error) {
            console.error('Submission error:', error);
            setErrors({ api: "Une erreur est survenue lors de l'envoi." });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-8 h-8 animate-spin text-[#1B4F72]" />
            </div>
        );
    }



    const urgency = urgencyConfig[offre?.niveau_urgence] ?? urgencyConfig.faible;

    return (
        <div className="min-h-screen bg-gray-50 pt-10">

            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="w-[95%] max-w-5xl mx-auto px-4 py-4 flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 transition-colors">
                        <ArrowLeft className="w-5 h-5 text-[#1B4F72]" />
                    </button>
                    <div>
                        <h1 className="text-[16px] font-bold text-[#1B4F72]">Détail de l'offre</h1>
                        <p className="text-[11px] text-gray-500">#{offre.id} • {offre.created_at}</p>
                    </div>
                </div>
            </div>

            <div className="w-[95%] max-w-5xl mx-auto px-4 py-6 space-y-6">
                <div className="bg-white p-6 space-y-5">

                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="space-y-1">
                            <h2 className="text-[20px] font-bold text-[#1B4F72] leading-tight">{offre.titre}</h2>
                            <div className="flex items-center gap-2">
                                <span className="text-[11px] text-gray-500 flex items-center gap-1">
                                    <Briefcase className="w-3 h-3" />
                                    {offre.categorie?.nom}  {/* ✅ fixed */}
                                </span>
                                <span className={`px-2 py-0.5 text-[10px] font-semibold rounded ${urgency.color}`}>
                                    {urgency.label}
                                </span>
                            </div>
                            <p className="text-[12px] text-gray-500 flex items-center gap-1">
                                <User className="w-3 h-3" />
                                {offre.client?.nom_complet}
                                <span className="text-gray-400 ml-1">• {offre.created_at}</span>
                            </p>
                        </div>
                        <button
                            onClick={() => setShowPropositionModal(true)}
                            className="px-6 py-3 bg-[#D35400] hover:bg-[#1B4F72] text-white text-[13px] font-bold transition-colors whitespace-nowrap"
                        >
                            Faire une proposition
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                        <div className="flex items-start gap-3 p-4 bg-blue-50/30 border border-blue-100">
                            <MapPin className="w-5 h-5 text-[#1B4F72] flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-[13px] font-medium text-[#1B4F72]">{offre.ville}</p>
                                <p className="text-[12px] text-gray-500 mt-0.5">{offre.address}</p>
                            </div>
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

                    {offre.images && offre.images.length > 0 && (
                        <div>
                            <h3 className="text-[13px] font-bold text-[#1B4F72] mb-3 flex items-center gap-2">
                                <Camera className="w-4 h-4" /> Photos ({offre.images.length})
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {offre.images.map((img) => (
                                    <div key={img.id} className="aspect-square bg-gray-100 border border-gray-200 overflow-hidden rounded">
                                        <img
                                            src={img.url}  // ✅ direct URL
                                            alt={img.titre || 'Photo offre'}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {showPropositionModal && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-lg max-h-[95vh] overflow-y-auto shadow-2xl">

                        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                            <h3 className="text-[16px] font-bold text-[#1B4F72]">Envoyer votre proposition</h3>
                            <button onClick={() => setShowPropositionModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="p-6 space-y-5">
                            <div className="bg-gray-50 p-4 border border-gray-200">
                                <p className="text-[13px] font-medium text-[#1B4F72]">{offre.titre}</p>
                                <p className="text-[11px] text-gray-500 mt-1">Budget client: {offre.budget_estime} DH</p>
                            </div>

                            {errors.api && (
                                <div className="bg-red-50 border border-red-200 p-3 text-[12px] text-red-600 flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4" /> {errors.api}
                                </div>
                            )}

                            <div>
                                <label className="block text-[12px] font-bold text-[#1B4F72] mb-2 uppercase tracking-tight">Prix total (DH)</label>
                                <Input name="price" type="number" value={proposition.price} onChange={(e) => updateField('price', e.target.value)} placeholder="Ex: 500" Icon={Euro} />
                                {errors.price && <p className="mt-1 text-[10px] text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.price}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[12px] font-bold text-[#1B4F72] mb-2 uppercase tracking-tight">Durée</label>
                                    <Input name="duration" type="number" value={proposition.duration} onChange={(e) => updateField('duration', e.target.value)} placeholder="Ex: 3" Icon={Clock} />
                                    {errors.duration && <p className="mt-1 text-[10px] text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.duration}</p>}
                                </div>
                                <div>
                                    <label className="block text-[12px] font-bold text-[#1B4F72] mb-2 uppercase tracking-tight">Unité</label>
                                    <select value={proposition.durationUnit} onChange={(e) => updateField('durationUnit', e.target.value)} className="w-full px-3 py-2.5 text-[13px] border border-gray-200 focus:border-[#D35400] outline-none bg-white h-[45px]">
                                        <option value="heures">Heures</option>
                                        <option value="jours">Jours</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[12px] font-bold text-[#1B4F72] mb-2 uppercase tracking-tight">Date de début</label>
                                <Input name="startDate" type="date" value={proposition.startDate} onChange={(e) => updateField('startDate', e.target.value)} Icon={Calendar} />
                                {errors.startDate && <p className="mt-1 text-[10px] text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.startDate}</p>}
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
                                <p className="text-[10px] text-gray-400 mt-1">{proposition.message.length} / 20 caractères min</p>
                                {errors.message && <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.message}</p>}
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button onClick={() => setShowPropositionModal(false)} className="flex-1 py-3 text-[13px] font-bold text-gray-600 border border-gray-200 hover:bg-gray-50">
                                    Annuler
                                </button>
                                <Submit text="Envoyer" onClick={faireProposition} isLoading={isSubmitting} icon={Send} className="flex-1" variant="secondary" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ArtisanOffreDetail;