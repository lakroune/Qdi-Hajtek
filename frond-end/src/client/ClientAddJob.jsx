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
import { toast } from 'react-hot-toast';
import Select from '../components/selects/Select';
const ClientAddJob = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [categories, setCategories] = useState([]);
    const [villes, setVilles] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        budget_estime: '',
        niveau_urgence: 'standard',
        preferredDate: '',
        ville: '',
        address: '',
        photos: [],
        acceptTerms: true
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

    useEffect(() => {
        const fetchVilles = async () => {
            try {
                const response = await axiosClient.get('/villes');
                setVilles(response.data);
            } catch (error) {
                console.error('Error fetching villes:', error);
            }
        }
        fetchVilles();
    }, []);
    const urgencies = [
        { id: 'urgent', label: 'Urgent', desc: 'Dans les 24h', color: 'bg-red-100 text-red-700 border-red-200' },
        { id: 'moyen', label: 'Standard', desc: 'Cette semaine', color: 'bg-blue-100 text-blue-700 border-blue-200' },
        { id: 'faible', label: 'Planifié', desc: 'Plus tard', color: 'bg-gray-100 text-gray-700 border-gray-200' }
    ];







    const publierOffre = async () => {
        const data = new FormData();
        data.append('titre', formData.title);
        data.append('categorie_id', formData.category);
        data.append('description', formData.description);
        data.append('budget_estime', formData.budget_estime);
        data.append('niveau_urgence', formData.niveau_urgence);
        data.append('preferred_date', formData.preferredDate);
        data.append('ville', formData.ville);
        data.append('address', formData.address);

        formData.photos.forEach((photo) => {
            data.append('photos[]', photo);
        });

        try {
            setIsLoading(true);
            const response = await axiosClient.post('/offres-travail', data);

            if (response.data.success) {
                setSuccess(true);
                toast.success('Offre publiée !');
            } else {
                toast.error('Une erreur est survenue');
            }
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                console.error('Error creating job:', error);
                toast.error('Une erreur est survenue');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const updateField = (field, value) => {
        setFormData({ ...formData, [field]: value });
        if (errors[field]) {
            setErrors({ ...errors, [field]: null });
        }
    };


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
                    <div className="space-y-4 flex gap-4 justify-between">
                        <div className="w-full">
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

                        <div className='w-full'>
                            <label className="block text-[11px] font-medium text-[#1B4F72] mb-1.5">
                                Catégorie <span className="text-[#D35400]">*</span>
                            </label>
                            <select
                                value={formData.category}
                                onChange={(e) => updateField('category', e.target.value)}
                                className="w-full px-3 py-2 text-[12px] border border-gray-200 focus:border-[#D35400] focus:outline-none bg-white"
                            >
                                <option value="">Sélectionnez une catégorie</option>
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
                                    onClick={() => updateField('niveau_urgence', urg.id)}
                                    className={`
                                            p-3 border text-center transition-all
                                            ${formData.niveau_urgence === urg.id
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

                        <div className="flex items-center gap-4">
                            <div className="flex-1">
                                <Input
                                    label=" Budget estimé (DH)"
                                    name="budget_estime"
                                    type="number"
                                    required
                                    value={formData.budget_estime}
                                    onChange={(e) => updateField('budget_estime', e.target.value)}
                                    placeholder="Min"
                                    Icon={DollarSign}
                                />
                            </div>

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
                            <label className="block text-[11px] font-medium text-[#1B4F72] mb-1.5">
                                Ville <span className="text-[#D35400]">*</span>
                            </label>
                            <select
                                value={formData.ville}
                                onChange={(e) => updateField('ville', e.target.value)}
                                className="w-full px-3 py-2 text-[12px] border border-gray-200 focus:border-[#D35400] focus:outline-none bg-white"
                            >
                                <option value="">Sélectionnez une ville</option>
                                {villes.map((ville) => (
                                    <option key={ville.id} value={ville.id}>
                                        {ville.ville}
                                    </option>
                                ))}
                            </select>
                            {errors.ville && (
                                <p className="mt-1 text-[10px] text-red-500 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" /> {errors.ville}
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
                            onClick={publierOffre}
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