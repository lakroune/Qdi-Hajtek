import React, { useEffect, useState } from 'react';
import {
    ArrowLeft, Heart, MapPin, Star, Clock, Shield,
    MessageSquare, Calendar, X, ChevronLeft, ChevronRight,
    LoaderCircle, DollarSign, BadgeX, CheckCircle, AlertCircle
} from 'lucide-react';
import axiosClient from '../api/axios-client';
import { useParams } from 'react-router-dom';
import Submit from '../components/buttons/Submit';
import toast from 'react-hot-toast';

const ServiceDetail = () => {
    const [isFav, setIsFav] = useState(false);
    const [showDemand, setShowDemand] = useState(false);
    const [selectedImg, setSelectedImg] = useState(null);
    const [imgIdx, setImgIdx] = useState(0);
    const [form, setForm] = useState({ desc: '', date: '', address: '' });
    const [isCharging, setIsCharging] = useState(true);
    const [service, setService] = useState(null);
    const [demandeSending, setDemandeSending] = useState(false);
    const [errorenvoi, setErrorenvoi] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { id } = useParams();
    const STORAGE_URL = import.meta.env.VITE_API_URL_STORAGE;

    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await axiosClient.get('/services/' + id);
                setService(response.data.data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsCharging(false);
            }
        };
        fetchService();
    }, []);

    const nextImg = () => setImgIdx((i) => (i + 1) % service.images.length);
    const prevImg = () => setImgIdx((i) => (i - 1 + service.images.length) % service.images.length);

    const closeModal = () => {
        setShowDemand(false);
        setErrorenvoi('');
        setForm({ desc: '', date: '', address: '' });
    };

    const submit = async (e) => {
        e.preventDefault();
        setErrorenvoi('');
        setDemandeSending(true);

        const data = new FormData();
        data.append('description_specifique', form.desc);
        data.append('date_debut', form.date);
        data.append('adresse', form.address);
        data.append('service_id', id);

        try {
            const response = await axiosClient.post('/demandes-directes', data);

            if (response.data.status == "success") {
                closeModal();
                toast.success('Votre demande a été envoyée avec succès !');
            } else {
                toast.error(response.data.message || 'Une erreur est survenue.');
            }
        } catch (error) {
            console.error(error);
            toast.error('Une erreur est survenue. Veuillez réessayer.');
        } finally {
            setDemandeSending(false);
        }
    };

    if (isCharging) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoaderCircle className="animate-spin w-12 h-12 text-[#D35400]" />
            </div>
        );
    }

    if (!service) {
        return (
            <div className="flex flex-col gap-1.5 justify-center items-center h-screen">
                <BadgeX className="w-6 h-6 text-[#D35400]" />
                <span className="text-[15px]">Ce service n'existe pas</span>
                <p className="text-[15px]">
                    Voulez-vous <a href="/services" className="text-[#D35400]">retourner à la page des services</a>
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 mt-20 pb-8">

            {successMessage && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 px-5 py-3 bg-green-600 text-white text-[13px] font-medium shadow-lg animate-in slide-in-from-top-4 duration-300">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    {successMessage}
                </div>
            )}

            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="w-[90%] mx-auto px-4 py-4 flex items-center gap-3">
                    <button onClick={() => window.history.back()} className="p-2 hover:bg-gray-100">
                        <ArrowLeft className="w-5 h-5 text-[#1B4F72]" />
                    </button>
                    <div className="flex-1">
                        <h1 className="text-[16px] font-bold text-[#1B4F72] line-clamp-1">{service.titre}</h1>
                    </div>
                    <button
                        onClick={() => setIsFav(!isFav)}
                        className={`p-2 transition-colors ${isFav ? 'text-[#D35400]' : 'text-gray-400 hover:text-[#D35400]'}`}
                    >
                        <Heart className={`w-5 h-5 ${isFav && 'fill-current'}`} />
                    </button>
                </div>
            </header>

            <div className="w-[90%] mx-auto px-4 py-6 space-y-4">

                <div className="bg-white border border-gray-200 overflow-hidden">
                    <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-0 border-t border-gray-200">
                        {service.images.map((img, i) => (
                            <div
                                key={i}
                                className="aspect-square bg-gray-100 border-r border-gray-200 last:border-r-0 cursor-pointer"
                                onClick={() => { setImgIdx(i); setSelectedImg(i); }}
                            >
                                <img
                                    src={`${STORAGE_URL}${img.url}`}
                                    alt=""
                                    className={`w-full h-full object-cover ${imgIdx === i ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white border border-gray-200 p-4">
                    <div className="flex items-center gap-2 text-[11px] text-gray-500 mb-3 pb-3 border-b border-gray-100">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-[15px] font-bold text-gray-800">
                                    <a href={`/artisans/${service.artisan.user.id}`}>
                                        {service.artisan.user.firstname} {service.artisan.user.lastname}
                                    </a>
                                </h3>
                                <p className="text-[12px] text-[#D35400] font-medium">{service.artisan.specialite}</p>
                            </div>
                            <div className="flex items-center gap-3 mt-2">
                                <div className="flex items-center gap-1">
                                    <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                                    <span className="text-[12px] font-bold text-gray-700">{service.artisan.note}</span>
                                </div>
                                <span className="text-gray-300">|</span>
                                <span className="uppercase tracking-wide">{service.categorie.nom_categorie}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowDemand(true)}
                            className="py-2 px-4 bg-[#1B4F72] hover:bg-[#D35400] text-white text-[11px] font-bold transition-colors"
                        >
                            Demander maintenant
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                            <h2 className="text-[14px] font-bold text-[#1B4F72] mb-2">
                                À propos de ce service
                                <span className="text-[9px] ml-1">{new Date(service.created_at).toLocaleDateString('fr-FR')}</span>
                            </h2>
                            <p className="text-[13px] text-gray-600 leading-relaxed">{service.description}</p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 p-2 bg-gray-50">
                                <DollarSign className="w-4 h-4 text-[#D35400]" />
                                <div>
                                    <p className="text-[10px] text-gray-500">Prix</p>
                                    <p className="text-[12px] font-bold text-gray-700">{service.tarif} DH <span>/ {service.type_tarif}</span></p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 p-2 bg-gray-50">
                                <Clock className="w-4 h-4 text-[#D35400]" />
                                <div>
                                    <p className="text-[10px] text-gray-500">Durée estimée</p>
                                    <p className="text-[12px] font-bold text-gray-700">{service.estimation_duree} min</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 p-2 bg-gray-50">
                                <Shield className="w-4 h-4 text-[#D35400]" />
                                <div>
                                    <p className="text-[10px] text-gray-500">Matériel</p>
                                    <p className="text-[12px] font-bold text-gray-700">{service.material}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 p-2 bg-gray-50">
                                <MapPin className="w-4 h-4 text-[#D35400]" />
                                <div>
                                    <p className="text-[10px] text-gray-500">Ville</p>
                                    <p className="text-[12px] font-bold text-gray-700 truncate">{service.artisan.user.city}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {selectedImg !== null && (
                <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
                    <button onClick={() => setSelectedImg(null)} className="absolute top-4 right-4 text-white text-2xl">×</button>
                    <button onClick={prevImg} className="absolute left-4 p-2 text-white"><ChevronLeft className="w-6 h-6" /></button>
                    <img src={`${STORAGE_URL}${service.images[imgIdx].url}`} alt="" className="max-w-full max-h-[85vh] object-contain" />
                    <button onClick={nextImg} className="absolute right-4 p-2 text-white"><ChevronRight className="w-6 h-6" /></button>
                </div>
            )}

            {showDemand && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-md shadow-2xl border border-gray-200">

                        <div className="flex items-center justify-between p-4 border-b border-gray-100">
                            <div>
                                <h3 className="text-[14px] font-bold text-[#1B4F72]">Nouvelle Demande</h3>
                                <p className="text-[10px] text-[#D35400] font-medium">{service.titre}</p>
                            </div>
                            <button onClick={closeModal} className="p-1 hover:bg-gray-100">
                                <X className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>

                        {errorenvoi && (
                            <div className="mx-5 mt-4 flex items-start gap-2 px-3 py-2.5 bg-red-50 border border-red-200 text-red-700">
                                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                <p className="text-[12px] font-medium">{errorenvoi}</p>
                            </div>
                        )}

                        <form onSubmit={submit} className="p-5 space-y-4">
                            <div>
                                <label className="text-[11px] font-bold text-[#1B4F72] flex items-center gap-1.5 mb-1">
                                    <MessageSquare className="w-3.5 h-3.5" /> Description du besoin
                                </label>
                                <textarea
                                    required
                                    className="w-full border border-gray-200 p-3 text-[12px] focus:outline-none focus:border-[#D35400] bg-gray-50 min-h-[100px] resize-none"
                                    placeholder="Décrivez votre problème en détail..."
                                    value={form.desc}
                                    onChange={(e) => setForm({ ...form, desc: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[11px] font-bold text-[#1B4F72] flex items-center gap-1.5 mb-1">
                                        <Calendar className="w-3.5 h-3.5" /> Date souhaitée
                                    </label>
                                    <input
                                        type="date"
                                        required
                                        min={new Date().toISOString().split('T')[0]}
                                        className="w-full border border-gray-200 p-2 text-[12px] focus:outline-none focus:border-[#D35400] bg-gray-50"
                                        value={form.date}
                                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-[11px] font-bold text-[#1B4F72] flex items-center gap-1.5 mb-1">
                                        <MapPin className="w-3.5 h-3.5" /> Adresse
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="ex: Casablanca"
                                        className="w-full border border-gray-200 p-2 text-[12px] focus:outline-none focus:border-[#D35400] bg-gray-50"
                                        value={form.address}
                                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="flex-1 py-2.5 border border-gray-200 text-[12px] font-medium text-gray-600 hover:bg-gray-50"
                                >
                                    Annuler
                                </button>
                                <Submit
                                    type="submit"
                                    text="Confirmer la Demande"
                                    disabled={demandeSending}
                                    isLoading={demandeSending}
                                    size="md"
                                    showIcon={false}
                                    className="flex-1 py-2.5 bg-[#1B4F72] text-white text-[12px] font-bold hover:bg-[#154360] shadow-md transition-all"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServiceDetail;