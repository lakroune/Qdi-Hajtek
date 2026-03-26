import React, { useEffect, useState } from 'react';
import {
    Briefcase, MapPin, DollarSign, Calendar,
    Clock, Camera, X, CheckCircle,
    AlertCircle, ArrowRight, Loader2
} from 'lucide-react';
import Input from '../components/inputs/Input';
import FileUpload from '../components/inputs/FileUpload';
import Submit from '../components/buttons/Submit';
import axiosClient from '../api/axios-client';

const ClientAddJob = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        budgetMin: '',
        budgetMax: '',
        urgency: 'standard',
        preferredDate: '',
        location: '',
        address: '',
        photos: [],
        acceptTerms: false
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axiosClient.get('/categories');
                setCategories(response.data.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }

        }
        fetchCategories();
    }, []);


    const urgencies = [
        { id: 'urgent', label: 'Urgent', desc: 'Dans les 24h', color: 'bg-red-100 text-red-700 border-red-200' },
        { id: 'standard', label: 'Standard', desc: 'Cette semaine', color: 'bg-blue-100 text-blue-700 border-blue-200' },
        { id: 'planned', label: 'Planifié', desc: 'Plus tard', color: 'bg-gray-100 text-gray-700 border-gray-200' }
    ];







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
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="max-w-2xl mx-auto mt-20 px-4">
                    <div className="bg-white   p-8 text-center">
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
                                href="/mes-offres"
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

            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">

            <div className=" w-[90%] mx-auto px-4 py-8 ">
                <div className="mt-6">
                    <h1 className="text-[20px] font-bold text-[#1B4F72]">Publier une offre de travail</h1>
                    <p className="text-[12px] text-gray-500 mt-1">
                        Décrivez votre besoin pour recevoir des propositions d'artisans qualifiés
                    </p>
                </div>




                <div className="bg-white border border-gray-200 p-6 space-y-6">
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
                                <option key={cat.id} value={cat.id}>{cat.nom_categorie}</option>
                            ))}
                        </select>
                        {errors.category && (
                            <p className="mt-1 text-[10px] text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" /> {errors.category}
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

                    <div>

                        <div className="flex items-center gap-3">
                            <div className="flex-1">
                                <Input
                                    label=" Budget estimé (DH)"
                                    name="budgetMin"
                                    type="number"
                                    required
                                    value={formData.budgetMin}
                                    onChange={(e) => updateField('budgetMin', e.target.value)}
                                    placeholder="Min"
                                    Icon={DollarSign}
                                />
                            </div>
                            <span className="text-gray-400">-</span>
                            <div className="flex-1">
                                <Input
                                    label="Date souhaitée d'intervention"
                                    name="preferredDate"
                                    type="date"
                                    value={formData.preferredDate}
                                    onChange={(e) => updateField('preferredDate', e.target.value)}
                                    required
                                    Icon={Calendar}
                                />
                            </div>
                        </div>

                    </div>



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
                    <div className="bg-white border border-gray-200 p-6 space-y-6">
                        <div className="text-center mb-6">

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
                            disabledFiles={false}
                            maxFiles={5}
                            maxSize={5}
                            sublabel="JPG, PNG • Max 5MB par photo • Max 5 photos"
                            value={formData.photos}
                            onChange={(files) => updateField('photos', files)}
                        />

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

                        <div className="flex gap-3 pt-4 border-t border-gray-100">


                        </div>
                    </div>
                    <div className="pt-4 border-t border-gray-100">
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





            </div>

        </div>
    );
};

export default ClientAddJob;