import React, { useState } from 'react';
import { 
    Briefcase, MapPin, DollarSign, Calendar, 
    Clock, Camera, X, CheckCircle,
    AlertCircle, ArrowRight, Loader2
} from 'lucide-react';
import Header from '../components/Header/Header';
import Footer from '../components/footer/Footer';
import Input from '../components/inputs/Input';
import FileUpload from '../components/inputs/FileUpload';
import Submit from '../components/buttons/Submit';

const ClientAddJob = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [step, setStep] = useState(1); // 1: infos | 2: photos | 3: confirmation

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        budgetMin: '',
        budgetMax: '',
        urgency: 'standard', // urgent | standard | planned
        preferredDate: '',
        location: '',
        address: '',
        photos: [],
        acceptTerms: false
    });

    const [errors, setErrors] = useState({});

    const categories = [
        { id: '', label: 'Sélectionnez une catégorie' },
        { id: 'plomberie', label: 'Plomberie' },
        { id: 'electricite', label: 'Électricité' },
        { id: 'menuiserie', label: 'Menuiserie' },
        { id: 'peinture', label: 'Peinture' },
        { id: 'climatisation', label: 'Climatisation' },
        { id: 'jardinage', label: 'Jardinage' },
        { id: 'maconnerie', label: 'Maçonnerie' },
        { id: 'serrurerie', label: 'Serrurerie' },
        { id: 'demenagement', label: 'Déménagement' },
        { id: 'menage', label: 'Ménage' },
        { id: 'autre', label: 'Autre' }
    ];

    const urgencies = [
        { id: 'urgent', label: 'Urgent', desc: 'Dans les 24h', color: 'bg-red-100 text-red-700 border-red-200' },
        { id: 'standard', label: 'Standard', desc: 'Cette semaine', color: 'bg-blue-100 text-blue-700 border-blue-200' },
        { id: 'planned', label: 'Planifié', desc: 'Plus tard', color: 'bg-gray-100 text-gray-700 border-gray-200' }
    ];

    const validateStep = (currentStep) => {
        const newErrors = {};
        
        if (currentStep === 1) {
            if (!formData.title.trim()) newErrors.title = 'Titre requis';
            if (!formData.category) newErrors.category = 'Catégorie requise';
            if (!formData.description.trim()) newErrors.description = 'Description requise';
            if (formData.description.length < 50) newErrors.description = 'Minimum 50 caractères';
            if (!formData.budgetMin || !formData.budgetMax) newErrors.budget = 'Budget requis';
            if (parseInt(formData.budgetMin) > parseInt(formData.budgetMax)) {
                newErrors.budget = 'Le min ne peut pas être supérieur au max';
            }
            if (!formData.preferredDate) newErrors.preferredDate = 'Date souhaitée requise';
            if (!formData.location.trim()) newErrors.location = 'Ville requise';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(step)) {
            setStep(step + 1);
        }
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const handleSubmit = async () => {
        if (!formData.acceptTerms) {
            setErrors({ ...errors, terms: 'Vous devez accepter les conditions' });
            return;
        }

        setIsLoading(true);
        // Simulation API
        await new Promise(r => setTimeout(r, 1500));
        setIsLoading(false);
        setSuccess(true);
    };

    const updateField = (field, value) => {
        setFormData({ ...formData, [field]: value });
        // Clear error when typing
        if (errors[field]) {
            setErrors({ ...errors, [field]: null });
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header isAuthenticated={true} userType="client" userName="Ahmed" />
                
                <div className="max-w-2xl mx-auto mt-20 px-4">
                    <div className="bg-white border border-gray-200 p-8 text-center">
                        <div className="w-16 h-16 bg-green-100 flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h2 className="text-[18px] font-bold text-[#1B4F72] mb-2">Offre publiée avec succès !</h2>
                        <p className="text-[12px] text-gray-500 mb-6">
                            Votre demande est en attente d'approbation par notre équipe. 
                            Vous serez notifié dès qu'un artisan vous contactera.
                        </p>
                        <div className="flex gap-3 justify-center">
                            <a 
                                href="/client/jobs" 
                                className="px-6 py-2.5 bg-[#1B4F72] hover:bg-[#D35400] text-white text-[12px] font-medium transition-colors"
                            >
                                Voir mes offres
                            </a>
                            <a 
                                href="/" 
                                className="px-6 py-2.5 border border-gray-200 hover:border-[#1B4F72] text-[12px] text-gray-600 hover:text-[#1B4F72] transition-colors"
                            >
                                Retour à l'accueil
                            </a>
                        </div>
                    </div>
                </div>
                
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header isAuthenticated={true} userType="client" userName="Ahmed" />

            <div className="max-w-3xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-[20px] font-bold text-[#1B4F72]">Publier une offre de travail</h1>
                    <p className="text-[12px] text-gray-500 mt-1">
                        Décrivez votre besoin pour recevoir des propositions d'artisans qualifiés
                    </p>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center mb-8">
                    {[1, 2, 3].map((s) => (
                        <React.Fragment key={s}>
                            <div className={`
                                w-8 h-8 flex items-center justify-center text-[12px] font-bold
                                ${step >= s ? 'bg-[#D35400] text-white' : 'bg-gray-200 text-gray-500'}
                            `}>
                                {s}
                            </div>
                            {s < 3 && (
                                <div className={`
                                    flex-1 h-1 mx-2
                                    ${step > s ? 'bg-[#D35400]' : 'bg-gray-200'}
                                `} />
                            )}
                        </React.Fragment>
                    ))}
                    <div className="ml-4 text-[11px] text-gray-500">
                        Étape {step}/3: {
                            step === 1 ? 'Informations' :
                            step === 2 ? 'Photos' : 'Confirmation'
                        }
                    </div>
                </div>

                {/* Step 1: Informations */}
                {step === 1 && (
                    <div className="bg-white border border-gray-200 p-6 space-y-6">
                        {/* Titre */}
                        <div>
                            <Input
                                label="Titre de l'offre"
                                name="title"
                                value={formData.title}
                                onChange={(e) => updateField('title', e.target.value)}
                                placeholder="Ex: Réparation fuite d'eau urgente"
                                required
                                Icon={Briefcase}
                            />
                            {errors.title && (
                                <p className="mt-1 text-[10px] text-red-500 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" /> {errors.title}
                                </p>
                            )}
                        </div>

                        {/* Catégorie */}
                        <div>
                            <label className="block text-[11px] font-medium text-[#1B4F72] mb-1.5">
                                Catégorie <span className="text-[#D35400]">*</span>
                            </label>
                            <select
                                value={formData.category}
                                onChange={(e) => updateField('category', e.target.value)}
                                className="w-full px-3 py-2 text-[12px] border border-gray-200 focus:border-[#D35400] focus:outline-none bg-white"
                            >
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                                ))}
                            </select>
                            {errors.category && (
                                <p className="mt-1 text-[10px] text-red-500 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" /> {errors.category}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-[11px] font-medium text-[#1B4F72] mb-1.5">
                                Description détaillée <span className="text-[#D35400]">*</span>
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => updateField('description', e.target.value)}
                                placeholder="Décrivez votre besoin en détail : problème rencontré, dimensions, matériaux souhaités, accès au lieu, etc."
                                rows={5}
                                className="w-full px-3 py-2 text-[12px] border border-gray-200 focus:border-[#D35400] focus:outline-none resize-none"
                            />
                            <div className="flex justify-between mt-1">
                                <span className="text-[10px] text-gray-400">
                                    Minimum 50 caractères
                                </span>
                                <span className={`text-[10px] ${formData.description.length < 50 ? 'text-gray-400' : 'text-green-600'}`}>
                                    {formData.description.length} caractères
                                </span>
                            </div>
                            {errors.description && (
                                <p className="mt-1 text-[10px] text-red-500 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" /> {errors.description}
                                </p>
                            )}
                        </div>

                        {/* Urgence */}
                        <div>
                            <label className="block text-[11px] font-medium text-[#1B4F72] mb-2">
                                Niveau d'urgence
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                                {urgencies.map((urg) => (
                                    <button
                                        key={urg.id}
                                        type="button"
                                        onClick={() => updateField('urgency', urg.id)}
                                        className={`
                                            p-3 border text-center transition-all
                                            ${formData.urgency === urg.id 
                                                ? urg.color + ' border-2' 
                                                : 'border-gray-200 hover:border-[#1B4F72] bg-white'}
                                        `}
                                    >
                                        <p className="text-[12px] font-semibold mb-1">{urg.label}</p>
                                        <p className="text-[10px] opacity-80">{urg.desc}</p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Budget */}
                        <div>
                            <label className="block text-[11px] font-medium text-[#1B4F72] mb-2">
                                Budget estimé (DH) <span className="text-[#D35400]">*</span>
                            </label>
                            <div className="flex items-center gap-3">
                                <div className="flex-1">
                                    <Input
                                        label=""
                                        name="budgetMin"
                                        type="number"
                                        value={formData.budgetMin}
                                        onChange={(e) => updateField('budgetMin', e.target.value)}
                                        placeholder="Min"
                                        Icon={DollarSign}
                                    />
                                </div>
                                <span className="text-gray-400">-</span>
                                <div className="flex-1">
                                    <Input
                                        label=""
                                        name="budgetMax"
                                        type="number"
                                        value={formData.budgetMax}
                                        onChange={(e) => updateField('budgetMax', e.target.value)}
                                        placeholder="Max"
                                        Icon={DollarSign}
                                    />
                                </div>
                            </div>
                            {errors.budget && (
                                <p className="mt-1 text-[10px] text-red-500 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" /> {errors.budget}
                                </p>
                            )}
                        </div>

                        {/* Date souhaitée */}
                        <div>
                            <Input
                                label="Date souhaitée d'intervention"
                                name="preferredDate"
                                type="date"
                                value={formData.preferredDate}
                                onChange={(e) => updateField('preferredDate', e.target.value)}
                                required
                                Icon={Calendar}
                            />
                            {errors.preferredDate && (
                                <p className="mt-1 text-[10px] text-red-500 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" /> {errors.preferredDate}
                                </p>
                            )}
                        </div>

                        {/* Localisation */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Input
                                    label="Ville"
                                    name="location"
                                    value={formData.location}
                                    onChange={(e) => updateField('location', e.target.value)}
                                    placeholder="Ex: Casablanca"
                                    required
                                    Icon={MapPin}
                                />
                                {errors.location && (
                                    <p className="mt-1 text-[10px] text-red-500 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" /> {errors.location}
                                    </p>
                                )}
                            </div>
                            <div>
                                <Input
                                    label="Adresse complète"
                                    name="address"
                                    value={formData.address}
                                    onChange={(e) => updateField('address', e.target.value)}
                                    placeholder="Quartier, rue, n°"
                                    Icon={MapPin}
                                />
                            </div>
                        </div>

                        {/* Next Button */}
                        <div className="pt-4 border-t border-gray-100">
                            <Submit
                                text="Continuer"
                                onClick={handleNext}
                                icon={ArrowRight}
                                size="md"
                            />
                        </div>
                    </div>
                )}

                {/* Step 2: Photos */}
                {step === 2 && (
                    <div className="bg-white border border-gray-200 p-6 space-y-6">
                        <div className="text-center mb-6">
                            <div className="w-12 h-12 bg-[#1B4F72]/10 flex items-center justify-center mx-auto mb-3">
                                <Camera className="w-6 h-6 text-[#1B4F72]" />
                            </div>
                            <h3 className="text-[14px] font-bold text-[#1B4F72]">Ajouter des photos (optionnel)</h3>
                            <p className="text-[11px] text-gray-500 mt-1">
                                Les photos aident les artisans à mieux évaluer votre besoin
                            </p>
                        </div>

                        <FileUpload
                            id="job-photos"
                            label="Photos du problème ou du lieu"
                            accept="image/*"
                            multiple
                            maxFiles={5}
                            maxSize={5}
                            sublabel="JPG, PNG • Max 5MB par photo • 5 photos max"
                            value={formData.photos}
                            onChange={(files) => updateField('photos', files)}
                        />

                        {/* Preview des photos */}
                        {formData.photos.length > 0 && (
                            <div className="grid grid-cols-5 gap-2">
                                {formData.photos.map((photo, idx) => (
                                    <div key={idx} className="relative aspect-square bg-gray-100">
                                        {photo instanceof File ? (
                                            <img 
                                                src={URL.createObjectURL(photo)} 
                                                alt="" 
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Camera className="w-6 h-6 text-gray-400" />
                                            </div>
                                        )}
                                        <button
                                            onClick={() => {
                                                const newPhotos = [...formData.photos];
                                                newPhotos.splice(idx, 1);
                                                updateField('photos', newPhotos);
                                            }}
                                            className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white flex items-center justify-center"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Navigation */}
                        <div className="flex gap-3 pt-4 border-t border-gray-100">
                            <button
                                onClick={handleBack}
                                className="flex-1 py-3 border border-gray-200 hover:border-[#1B4F72] text-[12px] text-gray-600 hover:text-[#1B4F72] transition-colors"
                            >
                                Retour
                            </button>
                            <Submit
                                text="Continuer"
                                onClick={handleNext}
                                icon={ArrowRight}
                                size="md"
                                className="flex-1"
                            />
                        </div>
                    </div>
                )}

                {/* Step 3: Confirmation */}
                {step === 3 && (
                    <div className="bg-white border border-gray-200 p-6 space-y-6">
                        <h3 className="text-[14px] font-bold text-[#1B4F72] mb-4">Récapitulatif de votre offre</h3>
                        
                        
                        <div className="space-y-4 bg-gray-50 p-4 border border-gray-200">
                            <div className="flex justify-between py-2 border-b border-gray-200">
                                <span className="text-[11px] text-gray-500">Titre</span>
                                <span className="text-[12px] font-medium text-[#1B4F72] text-right max-w-[60%]">
                                    {formData.title}
                                </span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-200">
                                <span className="text-[11px] text-gray-500">Catégorie</span>
                                <span className="text-[12px] font-medium text-[#1B4F72]">
                                    {categories.find(c => c.id === formData.category)?.label}
                                </span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-200">
                                <span className="text-[11px] text-gray-500">Urgence</span>
                                <span className={`
                                    px-2 py-0.5 text-[10px] font-medium
                                    ${formData.urgency === 'urgent' ? 'bg-red-100 text-red-700' : ''}
                                    ${formData.urgency === 'standard' ? 'bg-blue-100 text-blue-700' : ''}
                                    ${formData.urgency === 'planned' ? 'bg-gray-100 text-gray-700' : ''}
                                `}>
                                    {urgencies.find(u => u.id === formData.urgency)?.label}
                                </span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-200">
                                <span className="text-[11px] text-gray-500">Budget</span>
                                <span className="text-[12px] font-bold text-[#D35400]">
                                    {formData.budgetMin} - {formData.budgetMax} DH
                                </span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-200">
                                <span className="text-[11px] text-gray-500">Date</span>
                                <span className="text-[12px] font-medium text-[#1B4F72]">{formData.preferredDate}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-200">
                                <span className="text-[11px] text-gray-500">Lieu</span>
                                <span className="text-[12px] font-medium text-[#1B4F72] text-right">
                                    {formData.address}, {formData.location}
                                </span>
                            </div>
                            <div className="py-2">
                                <span className="text-[11px] text-gray-500 block mb-1">Description</span>
                                <p className="text-[11px] text-gray-700 leading-relaxed">
                                    {formData.description}
                                </p>
                            </div>
                            {formData.photos.length > 0 && (
                                <div className="pt-2">
                                    <span className="text-[11px] text-gray-500 block mb-2">
                                        {formData.photos.length} photo(s) jointe(s)
                                    </span>
                                    <div className="flex gap-2">
                                        {formData.photos.slice(0, 3).map((photo, idx) => (
                                            <div key={idx} className="w-12 h-12 bg-gray-200">
                                                {photo instanceof File && (
                                                    <img 
                                                        src={URL.createObjectURL(photo)} 
                                                        alt="" 
                                                        className="w-full h-full object-cover"
                                                    />
                                                )}
                                            </div>
                                        ))}
                                        {formData.photos.length > 3 && (
                                            <div className="w-12 h-12 bg-gray-200 flex items-center justify-center text-[10px] text-gray-500">
                                                +{formData.photos.length - 3}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Terms */}
                        <div>
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.acceptTerms}
                                    onChange={(e) => {
                                        updateField('acceptTerms', e.target.checked);
                                        if (errors.terms) setErrors({ ...errors, terms: null });
                                    }}
                                    className="mt-0.5 w-4 h-4 border-gray-300 text-[#D35400] focus:ring-[#D35400]"
                                />
                                <span className="text-[11px] text-gray-600 leading-relaxed">
                                    J'accepte que mon offre soit vérifiée par l'équipe avant publication. 
                                    Je confirme que les informations fournies sont exactes et je m'engage à honorer le paiement une fois le service réalisé.
                                </span>
                            </label>
                            {errors.terms && (
                                <p className="mt-2 text-[10px] text-red-500 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" /> {errors.terms}
                                </p>
                            )}
                        </div>

                        {/* Info */}
                        <div className="bg-blue-50 border border-blue-200 p-3 flex items-start gap-2">
                            <Clock className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                            <p className="text-[11px] text-blue-700">
                                Votre offre sera examinée sous <strong>24h</strong> ouvrées. 
                                Vous recevrez une notification dès qu'elle sera en ligne.
                            </p>
                        </div>

                        {/* Submit */}
                        <div className="flex gap-3 pt-4 border-t border-gray-100">
                            <button
                                onClick={handleBack}
                                className="flex-1 py-3 border border-gray-200 hover:border-[#1B4F72] text-[12px] text-gray-600 hover:text-[#1B4F72] transition-colors"
                            >
                                Modifier
                            </button>
                            <Submit
                                text={isLoading ? 'Publication...' : 'Publier mon offre'}
                                onClick={handleSubmit}
                                isLoading={isLoading}
                                icon={isLoading ? Loader2 : CheckCircle}
                                size="md"
                                className="flex-1"
                                variant="secondary"
                            />
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default ClientAddJob;