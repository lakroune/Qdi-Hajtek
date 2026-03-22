import React, { useState } from 'react';
import {
    Briefcase, DollarSign, Clock,
    Camera, CheckCircle, AlertCircle, Loader2, X,
    Wrench, Info
} from 'lucide-react';
import Input from '../components/inputs/Input';
import FileUpload from '../components/inputs/FileUpload';
import Submit from '../components/buttons/Submit';
import axiosClient from '../api/axios-client';

const ArtisanAddService = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        titre: '',
        categorie_id: '',
        description: '',
        tarif: '',
        type_tarif: 'hour',
        estimation_duree: '',
        warranty: '',
        materials: '',
        serviceArea: 'city',
        images: [],
    });

    const [errors, setErrors] = useState({});

    const categories = [
        { id: '', label: 'Sélectionnez votre spécialité' },
        { id: 'plomberie', label: 'Plomberie' },
        { id: 'electricite', label: 'Électricité' }
    ];

    const type_tarifs = [
        { id: 'hour', label: 'Par heure', example: 'Ex: 250 DH/heure' },
        { id: 'm2', label: 'Au m²', example: 'Ex: 150 DH/m²' },
        { id: 'fixed', label: 'Forfait', example: 'Ex: 1200 DH' },
        { id: 'quote', label: 'Sur devis', example: 'Prix selon complexité' }
    ];





    const validation = () => {
        const newErrors = {};


        if (!formData.titre.trim()) newErrors.titre = 'Titre du service requis';
        if (formData.titre.length < 10) newErrors.titre = 'Minimum 10 caractères';
        if (!formData.categorie_id) newErrors.categorie_id = 'Catégorie requise';
        if (!formData.description.trim()) newErrors.description = 'Description requise';
        if (formData.description.length < 100) newErrors.description = 'Minimum 100 caractères pour détailler votre service';
        if (!formData.tarif) newErrors.tarif = 'Tarif requis';
        if (!formData.estimation_duree) newErrors.estimation_duree = 'Durée estimée requise';

        if (formData.images.length === 0) newErrors.images = 'Au moins une photo de réalisation est requise';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };





    const submitData = async () => {
        const isValid = validation();
        if (!isValid) return;

        setIsLoading(true);
        setErrors({});

        try {
            const data = new FormData();
            data.append('titre', formData.titre);
            data.append('categorie_id', formData.categorie_id);
            data.append('description', formData.description);
            data.append('tarif', formData.tarif);
            data.append('type_tarif', formData.type_tarif);
            data.append('estimation_duree', formData.estimation_duree);
            data.append('materials', formData.materials);

            formData.images.forEach((image, index) => {
                data.append(`images[${index}]`, image);
            });

            const response = await axiosClient.post('/services', data);

            console.log(response.data);
        } catch (error) {

        }

        setIsLoading(false);
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


            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">


            <div className="md:w-[90%] mx-auto px-4 py-8">

                <div className="mt-6 mb-4">
                    <h1 className="text-[20px] font-bold text-[#1B4F72]">Ajouter un service</h1>
                    <p className="text-[12px] text-gray-500 mt-1">
                        Décrivez votre prestation pour attirer des clients
                    </p>
                </div>



                <div className="bg-white border border-gray-200 p-6 space-y-6">
                    <div>
                        <Input
                            label="Titre du service"
                            name="titre"
                            value={formData.titre}
                            onChange={(e) => updateField('titre', e.target.value)}
                            placeholder="Ex: Réparation fuite d'eau - Intervention rapide 24h/24"
                            required
                            Icon={Briefcase}
                        />
                        {errors.titre && (
                            <p className="mt-1 text-[10px] text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" /> {errors.titre}
                            </p>
                        )}
                        <p className="mt-1 text-[10px] text-gray-400">
                            Soyez précis et attractif, minimum 10 caractères
                        </p>
                    </div>

                    <div>
                        <label className="block text-[11px] font-medium text-[#1B4F72] mb-1.5">
                            Catégorie <span className="text-[#D35400]">*</span>
                        </label>
                        <select
                            value={formData.categorie_id}
                            onChange={(e) => updateField('categorie_id', e.target.value)}
                            className="w-full px-3 py-2 text-[12px] border border-gray-200 focus:border-[#D35400] focus:outline-none bg-white"
                        >
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.label}</option>
                            ))}
                        </select>
                        {errors.categorie_id && (
                            <p className="mt-1 text-[10px] text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" /> {errors.categorie_id}
                            </p>
                        )}
                    </div>

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

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Input
                                label="Tarif"
                                name="tarif"
                                type="number"
                                value={formData.tarif}
                                onChange={(e) => updateField('tarif', e.target.value)}
                                placeholder="Ex: 250"
                                required
                                Icon={DollarSign}
                            />
                            {errors.tarif && (
                                <p className="mt-1 text-[10px] text-red-500 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" /> {errors.tarif}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-[11px] font-medium text-[#1B4F72] mb-1.5">
                                Type de tarif <span className="text-[#D35400]">*</span>
                            </label>
                            <select
                                value={formData.type_tarif}
                                onChange={(e) => updateField('type_tarif', e.target.value)}
                                className="w-full px-3 py-2 text-[12px] border border-gray-200 focus:border-[#D35400] focus:outline-none bg-white"
                            >
                                {type_tarifs.map(pt => (
                                    <option key={pt.id} value={pt.id}>{pt.label}</option>
                                ))}
                            </select>
                            <p className="mt-1 text-[10px] text-gray-400">
                                {type_tarifs.find(pt => pt.id === formData.type_tarif)?.example}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Input
                                label="Durée estimée"
                                name="estimation_duree"
                                value={formData.estimation_duree}
                                onChange={(e) => updateField('estimation_duree', e.target.value)}
                                placeholder="Ex: 2-3 heures"
                                required
                                Icon={Clock}
                            />
                            {errors.estimation_duree && (
                                <p className="mt-1 text-[10px] text-red-500 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" /> {errors.estimation_duree}
                                </p>
                            )}
                        </div>
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
                    </div>


                    <div className="bg-white border border-gray-200 p-6 space-y-6">
                        <div className="text-center mb-6">
                            <div className="w-12 h-12 bg-[#1B4F72]/10 flex items-center justify-center mx-auto mb-3">
                                <Camera className="w-6 h-6 text-[#1B4F72]" />
                            </div>
                            <h3 className="text-[14px] font-bold text-[#1B4F72]">images de vos réalisations</h3>
                            <p className="text-[11px] text-gray-500 mt-1">
                                Ajoutez des images de vos travaux passés pour rassurer les clients
                            </p>
                        </div>

                        <FileUpload
                            id="service-images"
                            label="images du service *"
                            accept="image/*"
                            multiple
                            maxFiles={4}
                            maxSize={1}
                            required={true}
                            disabledFiles={false}
                            sublabel="JPG, PNG • Max 5MB • Min 1 photo, max 8 images"
                            value={formData.images}
                            onChange={(files) => {
                                updateField('images', files);
                                if (errors.images) setErrors({ ...errors, images: null });
                            }}
                        />
                        {errors.images && (
                            <p className="text-[10px] text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" /> {errors.images}
                            </p>
                        )}

                        {formData.images.length > 0 && (
                            <div className="grid grid-cols-4 gap-3">
                                {formData.images.map((photo, idx) => (
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
                                                const newimages = [...formData.images];
                                                newimages.splice(idx, 1);
                                                updateField('images', newimages);
                                            }}
                                            className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white flex items-center justify-center hover:bg-red-600"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}


                        <div className="flex gap-3 pt-4">


                        </div>
                    </div>


                    <div className="bg-[#1B4F72]/5 border border-[#1B4F72]/20 p-3 flex items-start gap-2">
                        <Info className="w-4 h-4 text-[#1B4F72] flex-shrink-0 mt-0.5" />
                        <p className="text-[11px] text-[#1B4F72]">
                            Une commission de <strong>5%</strong> sera prélevée sur chaque transaction.
                            Ex: pour un service à 500 DH, vous recevrez 470 DH.
                        </p>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                        <Submit
                            text={isLoading ? 'Envoi...' : 'Soumettre mon service'}
                            onClick={submitData}
                            isLoading={isLoading}
                            icon={isLoading ? Loader2 : CheckCircle}
                            size="md"
                            className="flex-1"
                            variant="secondary"
                        />
                    </div>
                </div>


            </div>
        </div>
    );
};

export default ArtisanAddService;