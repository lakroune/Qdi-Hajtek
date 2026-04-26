import React, { useEffect, useState } from 'react';
import {
    Briefcase, DollarSign, Clock,
    Camera, CheckCircle, AlertCircle, Loader2, X,
    Wrench, Info, ChevronDown
} from 'lucide-react';
import Input from '../components/inputs/Input';
import FileUpload from '../components/inputs/FileUpload';
import Submit from '../components/buttons/Submit';
import axiosClient from '../api/axios-client';
import toast from 'react-hot-toast';

const COMMISSION_RATE = 0.025;

const TYPE_TARIFS = [
    { id: 'prix_heure', label: 'Par heure', example: 'Ex: 250 DH/heure' },
    { id: 'prix_m2', label: 'Au m²', example: 'Ex: 150 DH/m²' },
    { id: 'prix_fixe', label: 'Forfait', example: 'Ex: 1200 DH' },
    { id: 'prix_jour', label: 'Par jour', example: 'Ex: 500 DH/jour' },
];

const FieldError = ({ msg }) =>
    msg ? (
        <p className="mt-1 text-[10px] text-red-500 flex items-center gap-1">
            <AlertCircle className="w-3 h-3 flex-shrink-0" /> {msg}
        </p>
    ) : null;

const Section = ({ icon: Icon, title, children }) => (
    <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <Icon className="w-4 h-4 text-[#1B4F72]" />
            <h2 className="text-[13px] font-bold text-[#1B4F72]">{title}</h2>
        </div>
        {children}
    </div>
);

const ArtisanAddService = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        titre: '',
        categorie_id: '',
        description: '',
        tarif: '',
        type_tarif: 'prix_heure',
        estimation_duree: '',
        materials: '',
        images: [],
    });

    useEffect(() => {
        axiosClient.get('/categories')
            .then(res => setCategories(res.data.data))
            .catch(() => toast.error('Erreur lors du chargement des catégories'));
    }, []);

    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
    };

    const validate = () => {
        const e = {};
        if (!formData.titre.trim()) e.titre = 'Titre du service requis';
        else if (formData.titre.trim().length < 10) e.titre = 'Minimum 10 caractères';

        if (!formData.categorie_id) e.categorie_id = 'Catégorie requise';

        if (!formData.description.trim()) e.description = 'Description requise';
        else if (formData.description.trim().length < 20) e.description = 'Minimum 20 caractères pour détailler votre service';

        if (!formData.tarif || Number(formData.tarif) <= 0) e.tarif = 'Tarif valide requis';

        if (!formData.estimation_duree || Number(formData.estimation_duree) <= 0)
            e.estimation_duree = 'Durée estimée requise';

        if (formData.images.length === 0) e.images = 'Au moins une photo de réalisation est requise';

        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const submitData = async () => {
        if (!validate()) return;

        setIsLoading(true);
        try {
            const data = new FormData();
            data.append('titre', formData.titre);
            data.append('categorie_id', formData.categorie_id);
            data.append('description', formData.description);
            data.append('tarif', formData.tarif);
            data.append('type_tarif', formData.type_tarif);
            data.append('estimation_duree', formData.estimation_duree);
            data.append('material', formData.materials);
            formData.images.forEach(img => data.append('images[]', img));

            await axiosClient.post('/services', data);
            toast.success('Service soumis avec succès ! En attente de validation.');

            setFormData({
                titre: '', categorie_id: '', description: '',
                tarif: '', type_tarif: 'prix_heure',
                estimation_duree: '', materials: '', images: [],
            });
            setErrors({});
        } catch (error) {
            if (error.response?.status === 422) {
                const apiErrors = error.response.data.errors ?? {};
                setErrors(apiErrors);
                Object.values(apiErrors).flat().forEach(msg => toast.error(msg));
            } else {
                toast.error("Une erreur inattendue est survenue");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const tarifNum = parseFloat(formData.tarif) || 0;
    const commission = +(tarifNum * COMMISSION_RATE).toFixed(2);
    const netArtisan = +(tarifNum - commission).toFixed(2);

    const selectedTarifType = TYPE_TARIFS.find(t => t.id === formData.type_tarif);

    return (
        <div className="min-h-screen bg-gray-50 mt-16">
            <div className="md:w-[90%] mx-auto px-4 py-8">

                <div className="mb-6">
                    <h1 className="text-[20px] font-bold text-[#1B4F72]">Ajouter un service</h1>
                    <p className="text-[12px] text-gray-500 mt-1">
                        Décrivez votre prestation pour attirer des clients
                    </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-8">

                    <Section icon={Briefcase} title="Informations générales">

                        <div>
                            <Input
                                label="Titre du service"
                                name="titre"
                                value={formData.titre}
                                onChange={e => updateField('titre', e.target.value)}
                                placeholder="Ex: Réparation fuite d'eau — Intervention rapide 24h/24"
                                required
                                Icon={Briefcase}
                            />
                            <FieldError msg={errors.titre} />
                            <p className="mt-1 text-[10px] text-gray-400">
                                Soyez précis et attractif — minimum 10 caractères
                                <span className={`ml-2 font-medium ${formData.titre.length >= 10 ? 'text-green-600' : 'text-gray-400'}`}>
                                    ({formData.titre.length})
                                </span>
                            </p>
                        </div>

                        <div>
                            <label className="block text-[11px] font-medium text-[#1B4F72] mb-1.5">
                                Catégorie <span className="text-[#D35400]">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    value={formData.categorie_id}
                                    onChange={e => updateField('categorie_id', e.target.value)}
                                    className="w-full appearance-none px-3 py-2 pr-8 text-[12px] border border-gray-200 rounded focus:border-[#D35400] focus:outline-none bg-white"
                                >
                                    <option value="" disabled>Choisissez une catégorie</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.icon_url ? `${cat.icon_url} ` : ''}{cat.nom_categorie}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                            <FieldError msg={errors.categorie_id} />
                        </div>

                        <div>
                            <label className="block text-[11px] font-medium text-[#1B4F72] mb-1.5">
                                Description détaillée <span className="text-[#D35400]">*</span>
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={e => updateField('description', e.target.value)}
                                placeholder="Décrivez en détail ce que vous proposez : étapes du travail, matériaux utilisés, ce qui est inclus ou non, vos spécificités..."
                                rows={5}
                                className="w-full px-3 py-2 text-[12px] border border-gray-200 rounded focus:border-[#D35400] focus:outline-none resize-none"
                            />
                            <div className="flex justify-between mt-1">
                                <FieldError msg={errors.description} />
                                <span className={`text-[10px] ml-auto ${formData.description.length >= 20 ? 'text-green-600' : 'text-gray-400'}`}>
                                    {formData.description.length} caractères
                                </span>
                            </div>
                        </div>
                    </Section>

                    <Section icon={DollarSign} title="Tarification">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Input
                                    label="Tarif (DH)"
                                    name="tarif"
                                    type="number"
                                    min="0"
                                    value={formData.tarif}
                                    onChange={e => updateField('tarif', e.target.value)}
                                    placeholder="Ex: 250"
                                    required
                                    Icon={DollarSign}
                                />
                                <FieldError msg={errors.tarif} />
                            </div>

                            <div>
                                <label className="block text-[11px] font-medium text-[#1B4F72] mb-1.5">
                                    Type de tarif <span className="text-[#D35400]">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        value={formData.type_tarif}
                                        onChange={e => updateField('type_tarif', e.target.value)}
                                        className="w-full appearance-none px-3 py-2 pr-8 text-[12px] border border-gray-200 rounded focus:border-[#D35400] focus:outline-none bg-white"
                                    >
                                        {TYPE_TARIFS.map(t => (
                                            <option key={t.id} value={t.id}>{t.label}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                                {selectedTarifType && (
                                    <p className="mt-1 text-[10px] text-gray-400">{selectedTarifType.example}</p>
                                )}
                            </div>
                        </div>


                    </Section>

                    <Section icon={Clock} title="Détails d'intervention">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Input
                                    label="Durée estimée (heures)"
                                    name="estimation_duree"
                                    type="number"
                                    min="0"
                                    value={formData.estimation_duree}
                                    onChange={e => updateField('estimation_duree', e.target.value)}
                                    placeholder="Ex: 3"
                                    required
                                    Icon={Clock}
                                />
                                <FieldError msg={errors.estimation_duree} />
                            </div>

                            <div>
                                <Input
                                    label="Matériaux inclus"
                                    name="materials"
                                    value={formData.materials}
                                    onChange={e => updateField('materials', e.target.value)}
                                    placeholder="Ex: Fournis / Non fournis / Liste sur devis"
                                    Icon={Wrench}
                                />
                            </div>
                        </div>
                    </Section>

                    <Section icon={Camera} title="Photos de vos réalisations">
                        <p className="text-[11px] text-gray-500 -mt-2">
                            Ajoutez des images de vos travaux passés pour rassurer les clients
                        </p>

                        <FileUpload
                            id="service-images"
                            label="Images du service *"
                            accept="image/jpeg,image/png,image/jpg"
                            multiple
                            maxFiles={8}
                            maxSize={1}
                            required
                            sublabel="JPG, PNG • Max 5 MB • Min 1 photo, max 8 images"
                            value={formData.images}
                            onChange={files => updateField('images', files)}
                        />
                        <FieldError msg={errors.images} />

                        {formData.images.length > 0 && (
                            <div className="grid grid-cols-4 gap-3">
                                {formData.images.map((photo, idx) => (
                                    <div key={idx} className="relative aspect-square bg-gray-100 border border-gray-200 rounded-lg overflow-hidden">
                                        {photo instanceof File ? (
                                            <img
                                                src={URL.createObjectURL(photo)}
                                                alt={`Réalisation ${idx + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Camera className="w-6 h-6 text-gray-400" />
                                            </div>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const updated = [...formData.images];
                                                updated.splice(idx, 1);
                                                updateField('images', updated);
                                            }}
                                            className="absolute top-1 right-1 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                        {idx === 0 && (
                                            <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-[#1B4F72] text-white text-[8px] font-bold rounded">
                                                Principale
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </Section>

                    <div className="bg-[#1B4F72]/5 border border-[#1B4F72]/20 rounded-lg p-3 flex items-start gap-2">
                        <Info className="w-4 h-4 text-[#1B4F72] flex-shrink-0 mt-0.5" />
                        <p className="text-[11px] text-[#1B4F72] leading-relaxed">
                            Une commission de <strong>2.5%</strong> est prélevée sur chaque transaction.
                            {tarifNum > 0
                                ? ` Pour un service à ${tarifNum} DH, vous recevrez ${netArtisan} DH.`
                                : ' Renseignez un tarif pour voir le calcul.'}
                        </p>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                        <Submit
                            text={isLoading ? 'Envoi en cours...' : 'Soumettre mon service'}
                            onClick={submitData}
                            isLoading={isLoading}
                            icon={isLoading ? Loader2 : CheckCircle}
                            size="md"
                            variant="secondary"
                        />
                        <p className="text-[10px] text-gray-400 mt-2 text-center">
                            Votre service sera visible après validation par notre équipe
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtisanAddService;