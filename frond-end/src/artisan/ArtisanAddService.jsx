import React, { useState } from 'react';
import { 
    Briefcase, DollarSign, Clock, MapPin, 
    FileText, Camera, CheckCircle, AlertCircle, 
    ArrowRight, Loader2, X, Star, Award,
    Wrench, Info
} from 'lucide-react';
import Header from '../components/Header/Header';
import Footer from '../components/footer/Footer';
import Input from '../components/inputs/Input';
import FileUpload from '../components/inputs/FileUpload';
import Submit from '../components/buttons/Submit';

const ArtisanAddService = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        price: '',
        priceType: 'hour',  
        duration: '',
        warranty: '',
        materials: '',
        location: '',
        serviceArea: 'city', 
        photos: [],
        documents: [],
        experience: '',
        acceptTerms: false
    });

    const [errors, setErrors] = useState({});

    const categories = [
        { id: '', label: 'Sélectionnez votre spécialité' },
        { id: 'plomberie', label: 'Plomberie' },
        { id: 'electricite', label: 'Électricité' },
        { id: 'menuiserie', label: 'Menuiserie' },
        { id: 'peinture', label: 'Peinture' },
        { id: 'climatisation', label: 'Climatisation' },
        { id: 'jardinage', label: 'Jardinage' },
        { id: 'maconnerie', label: 'Maçonnerie' },
        { id: 'serrurerie', label: 'Serrurerie' },
        { id: 'demenagement', label: 'Déménagement' },
        { id: 'renovation', label: 'Rénovation générale' }
    ];

    const priceTypes = [
        { id: 'hour', label: 'Par heure', example: 'Ex: 250 DH/heure' },
        { id: 'm2', label: 'Au m²', example: 'Ex: 150 DH/m²' },
        { id: 'fixed', label: 'Forfait', example: 'Ex: 1200 DH' },
        { id: 'quote', label: 'Sur devis', example: 'Prix selon complexité' }
    ];

    const warranties = [
        { id: 'none', label: 'Aucune' },
        { id: '3m', label: '3 mois' },
        { id: '6m', label: '6 mois' },
        { id: '1y', label: '1 an' },
        { id: '2y', label: '2 ans' }
    ];

    const serviceAreas = [
        { id: 'city', label: 'Ma ville uniquement' },
        { id: 'region', label: 'Région (50km)' },
        { id: 'country', label: 'Tout le Maroc' }
    ];

    const validateStep = (currentStep) => {
        const newErrors = {};
        
        if (currentStep === 1) {
            if (!formData.title.trim()) newErrors.title = 'Titre du service requis';
            if (formData.title.length < 10) newErrors.title = 'Minimum 10 caractères';
            if (!formData.category) newErrors.category = 'Catégorie requise';
            if (!formData.description.trim()) newErrors.description = 'Description requise';
            if (formData.description.length < 100) newErrors.description = 'Minimum 100 caractères pour détailler votre service';
            if (!formData.price) newErrors.price = 'Tarif requis';
            if (!formData.duration) newErrors.duration = 'Durée estimée requise';
        }

        if (currentStep === 2) {
            if (formData.photos.length === 0) newErrors.photos = 'Au moins une photo de réalisation est requise';
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
        await new Promise(r => setTimeout(r, 1500));
        setIsLoading(false);
        setSuccess(true);
    };

    const updateField = (field, value) => {
        setFormData({ ...formData, [field]: value });
        if (errors[field]) {
            setErrors({ ...errors, [field]: null });
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header isAuthenticated={true} userType="artisan" userName="Karim" />
                
                <div className="max-w-2xl mx-auto mt-20 px-4">
                    <div className="bg-white border border-gray-200 p-8 text-center">
                        <div className="w-16 h-16 bg-green-100 flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h2 className="text-[18px] font-bold text-[#1B4F72] mb-2">Service soumis avec succès !</h2>
                        <p className="text-[12px] text-gray-500 mb-2">
                            Votre service est en attente de vérification par notre équipe.
                        </p>
                        <p className="text-[11px] text-[#D35400] mb-6">
                            Délai d'approbation: 24-48h ouvrées
                        </p>
                        <div className="flex gap-3 justify-center">
                            <a 
                                href="/artisan/services" 
                                className="px-6 py-2.5 bg-[#1B4F72] hover:bg-[#D35400] text-white text-[12px] font-medium transition-colors"
                            >
                                Voir mes services
                            </a>
                            <a 
                                href="/artisan/dashboard" 
                                className="px-6 py-2.5 border border-gray-200 hover:border-[#1B4F72] text-[12px] text-gray-600 hover:text-[#1B4F72] transition-colors"
                            >
                                Tableau de bord
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
            <Header isAuthenticated={true} userType="artisan" userName="Karim" />

            <div className="max-w-3xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-[20px] font-bold text-[#1B4F72]">Ajouter un service</h1>
                    <p className="text-[12px] text-gray-500 mt-1">
                        Décrivez votre prestation pour attirer des clients
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
                            step === 1 ? 'Description' :
                            step === 2 ? 'Photos' : 'Validation'
                        }
                    </div>
                </div>

                {/* Step 1: Description du service */}
                {step === 1 && (
                    <div className="bg-white border border-gray-200 p-6 space-y-6">
                        {/* Titre */}
                        <div>
                            <Input
                                label="Titre du service"
                                name="title"
                                value={formData.title}
                                onChange={(e) => updateField('title', e.target.value)}
                                placeholder="Ex: Réparation fuite d'eau - Intervention rapide 24h/24"
                                required
                                Icon={Briefcase}
                            />
                            {errors.title && (
                                <p className="mt-1 text-[10px] text-red-500 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" /> {errors.title}
                                </p>
                            )}
                            <p className="mt-1 text-[10px] text-gray-400">
                                Soyez précis et attractif, minimum 10 caractères
                            </p>
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
                                placeholder="Décrivez en détail ce que vous proposez : étapes du travail, matériaux utilisés, ce qui est inclus ou non, vos spécificités..."
                                rows={6}
                                className="w-full px-3 py-2 text-[12px] border border-gray-200 focus:border-[#D35400] focus:outline-none resize-none"
                            />
                            <div className="flex justify-between mt-1">
                                <span className="text-[10px] text-gray-400">
                                    Minimum 100 caractères recommandé
                                </span>
                                <span className={`text-[10px] ${formData.description.length < 100 ? 'text-gray-400' : 'text-green-600'}`}>
                                    {formData.description.length} caractères
                                </span>
                            </div>
                            {errors.description && (
                                <p className="mt-1 text-[10px] text-red-500 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" /> {errors.description}
                                </p>
                            )}
                        </div>

                        {/* Tarif */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Input
                                    label="Tarif"
                                    name="price"
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => updateField('price', e.target.value)}
                                    placeholder="Ex: 250"
                                    required
                                    Icon={DollarSign}
                                />
                                {errors.price && (
                                    <p className="mt-1 text-[10px] text-red-500 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" /> {errors.price}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-[11px] font-medium text-[#1B4F72] mb-1.5">
                                    Type de tarif <span className="text-[#D35400]">*</span>
                                </label>
                                <select
                                    value={formData.priceType}
                                    onChange={(e) => updateField('priceType', e.target.value)}
                                    className="w-full px-3 py-2 text-[12px] border border-gray-200 focus:border-[#D35400] focus:outline-none bg-white"
                                >
                                    {priceTypes.map(pt => (
                                        <option key={pt.id} value={pt.id}>{pt.label}</option>
                                    ))}
                                </select>
                                <p className="mt-1 text-[10px] text-gray-400">
                                    {priceTypes.find(pt => pt.id === formData.priceType)?.example}
                                </p>
                            </div>
                        </div>

                        {/* Durée et Garantie */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Input
                                    label="Durée estimée"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={(e) => updateField('duration', e.target.value)}
                                    placeholder="Ex: 2-3 heures"
                                    required
                                    Icon={Clock}
                                />
                                {errors.duration && (
                                    <p className="mt-1 text-[10px] text-red-500 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" /> {errors.duration}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-[11px] font-medium text-[#1B4F72] mb-1.5">
                                    Garantie
                                </label>
                                <select
                                    value={formData.warranty}
                                    onChange={(e) => updateField('warranty', e.target.value)}
                                    className="w-full px-3 py-2 text-[12px] border border-gray-200 focus:border-[#D35400] focus:outline-none bg-white"
                                >
                                    {warranties.map(w => (
                                        <option key={w.id} value={w.id}>{w.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Matériaux */}
                        <div>
                            <Input
                                label="Matériaux inclus"
                                name="materials"
                                value={formData.materials}
                                onChange={(e) => updateField('materials', e.target.value)}
                                placeholder="Ex: Fournis et inclus dans le tarif / Non fournis / Liste sur devis"
                                Icon={Wrench}
                            />
                        </div>

                        {/* Zone d'intervention */}
                        <div>
                            <label className="block text-[11px] font-medium text-[#1B4F72] mb-2">
                                Zone d'intervention
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                                {serviceAreas.map(area => (
                                    <button
                                        key={area.id}
                                        type="button"
                                        onClick={() => updateField('serviceArea', area.id)}
                                        className={`
                                            p-3 border text-center transition-all
                                            ${formData.serviceArea === area.id 
                                                ? 'bg-[#1B4F72] text-white border-[#1B4F72]' 
                                                : 'border-gray-200 hover:border-[#1B4F72] bg-white text-gray-700'}
                                        `}
                                    >
                                        <MapPin className={`w-4 h-4 mx-auto mb-1 ${formData.serviceArea === area.id ? 'text-white' : 'text-gray-400'}`} />
                                        <p className="text-[11px] font-medium">{area.label}</p>
                                    </button>
                                ))}
                            </div>
                            <Input
                                label="Ville principale"
                                name="location"
                                value={formData.location}
                                onChange={(e) => updateField('location', e.target.value)}
                                placeholder="Ex: Casablanca"
                                className="mt-3"
                                Icon={MapPin}
                            />
                        </div>

                        {/* Info commission */}
                        <div className="bg-[#1B4F72]/5 border border-[#1B4F72]/20 p-3 flex items-start gap-2">
                            <Info className="w-4 h-4 text-[#1B4F72] flex-shrink-0 mt-0.5" />
                            <p className="text-[11px] text-[#1B4F72]">
                                Une commission de <strong>10%</strong> sera prélevée sur chaque transaction. 
                                Ex: pour un service à 500 DH, vous recevrez 450 DH.
                            </p>
                        </div>

                        {/* Next */}
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
                            <h3 className="text-[14px] font-bold text-[#1B4F72]">Photos de vos réalisations</h3>
                            <p className="text-[11px] text-gray-500 mt-1">
                                Ajoutez des photos de vos travaux passés pour rassurer les clients
                            </p>
                        </div>

                        <FileUpload
                            id="service-photos"
                            label="Photos du service *"
                            accept="image/*"
                            multiple
                            maxFiles={8}
                            maxSize={5}
                            required
                            sublabel="JPG, PNG • Max 5MB • Min 1 photo, max 8 photos"
                            value={formData.photos}
                            onChange={(files) => {
                                updateField('photos', files);
                                if (errors.photos) setErrors({ ...errors, photos: null });
                            }}
                        />
                        {errors.photos && (
                            <p className="text-[10px] text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" /> {errors.photos}
                            </p>
                        )}

                        {/* Preview */}
                        {formData.photos.length > 0 && (
                            <div className="grid grid-cols-4 gap-3">
                                {formData.photos.map((photo, idx) => (
                                    <div key={idx} className="relative aspect-square bg-gray-100 border border-gray-200">
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
                                            className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white flex items-center justify-center hover:bg-red-600"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Documents optionnels */}
                        <div className="pt-4 border-t border-gray-100">
                            <FileUpload
                                id="service-docs"
                                label="Documents complémentaires (optionnel)"
                                accept=".pdf,.doc,.docx"
                                multiple
                                maxFiles={3}
                                maxSize={10}
                                value={formData.documents}
                                onChange={(files) => updateField('documents', files)}
                                sublabel="Devis type, catalogues, certificats... PDF, DOC"
                            />
                        </div>

                        {/* Navigation */}
                        <div className="flex gap-3 pt-4">
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

                {/* Step 3: Validation */}
                {step === 3 && (
                    <div className="bg-white border border-gray-200 p-6 space-y-6">
                        <h3 className="text-[14px] font-bold text-[#1B4F72] mb-4">Récapitulatif</h3>
                        
                        {/* Récap */}
                        <div className="space-y-3 bg-gray-50 p-4 border border-gray-200">
                            <div className="flex justify-between py-2 border-b border-gray-200">
                                <span className="text-[11px] text-gray-500">Service</span>
                                <span className="text-[12px] font-semibold text-[#1B4F72] text-right max-w-[60%]">
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
                                <span className="text-[11px] text-gray-500">Tarif</span>
                                <span className="text-[14px] font-bold text-[#D35400]">
                                    {formData.price} DH / {priceTypes.find(pt => pt.id === formData.priceType)?.label}
                                </span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-200">
                                <span className="text-[11px] text-gray-500">Durée</span>
                                <span className="text-[12px] font-medium text-[#1B4F72]">{formData.duration}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-200">
                                <span className="text-[11px] text-gray-500">Zone</span>
                                <span className="text-[12px] font-medium text-[#1B4F72]">
                                    {serviceAreas.find(a => a.id === formData.serviceArea)?.label}, {formData.location}
                                </span>
                            </div>
                            <div className="py-2">
                                <span className="text-[11px] text-gray-500 block mb-1">Description</span>
                                <p className="text-[11px] text-gray-700 leading-relaxed line-clamp-3">
                                    {formData.description}
                                </p>
                            </div>
                            <div className="flex justify-between py-2 border-t border-gray-200">
                                <span className="text-[11px] text-gray-500">Photos</span>
                                <span className="text-[12px] font-medium text-[#1B4F72]">
                                    {formData.photos.length} photo(s)
                                </span>
                            </div>
                        </div>

                        {/* Avertissement */}
                        <div className="bg-yellow-50 border border-yellow-200 p-3 flex items-start gap-2">
                            <Award className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-[11px] font-medium text-yellow-700">Engagement de qualité</p>
                                <p className="text-[10px] text-yellow-600 mt-0.5">
                                    En publiant ce service, vous vous engagez à respecter les délais annoncés 
                                    et à fournir une prestation de qualité. Les avis des clients impacteront votre réputation.
                                </p>
                            </div>
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
                                    Je certifie que les informations fournies sont exactes. 
                                    J'accepte que mon service soit vérifié avant publication et 
                                    je m'engage à respecter la <a href="#" className="text-[#D35400] hover:underline">charte qualité</a> de la plateforme.
                                </span>
                            </label>
                            {errors.terms && (
                                <p className="mt-2 text-[10px] text-red-500 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" /> {errors.terms}
                                </p>
                            )}
                        </div>

                        {/* Info vérification */}
                        <div className="bg-blue-50 border border-blue-200 p-3 flex items-start gap-2">
                            <Clock className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                            <p className="text-[11px] text-blue-700">
                                Votre service sera examiné sous <strong>24-48h</strong>. 
                                Vous recevrez une notification dès sa mise en ligne.
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
                                text={isLoading ? 'Envoi...' : 'Soumettre mon service'}
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

export default ArtisanAddService;