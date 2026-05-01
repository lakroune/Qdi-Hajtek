import React, { useEffect, useState } from 'react';
import {
    Calendar, DollarSign, Clock, ArrowLeft,
    CheckCircle2, MoreVertical, Star,
    Clipboard, RefreshCw, MapPin, Briefcase,
    SquareCheckBig, XCircle
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import axiosClient from '../api/axios-client';
import toast from 'react-hot-toast';

const ClientOffreDetail = () => {
    const [offre, setOffre] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedProposition, setSelectedProposition] = useState(null);
    const [showAcceptModal, setShowAcceptModal] = useState(false);
    const { id } = useParams();
    const [isModalShowImage, setIsModalShowImage] = useState(false);
    const [isShowOptionOffre, setIsShowOptionOffre] = useState(false);
    const [isAccepting, setIsAccepting] = useState(false);
    const url_image = import.meta.env.VITE_API_URL_STORAGE;

    useEffect(() => {
        const fetchOffreTravail = async () => {
            try {
                const response = await axiosClient.get('/mes-offres/' + id);
                setOffre(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchOffreTravail();
    }, [id]);

    const getUrgencyConfig = (urgency) => {
        const configs = {
            urgent: { label: 'Urgent', color: 'bg-red-500 text-white', lightColor: 'bg-red-50 text-red-700' },
            standard: { label: 'Standard', color: 'bg-blue-500 text-white', lightColor: 'bg-blue-50 text-blue-700' },
            moyen: { label: 'Moyen', color: 'bg-amber-500 text-white', lightColor: 'bg-amber-50 text-amber-700' },
            faible: { label: 'Faible', color: 'bg-gray-400 text-white', lightColor: 'bg-gray-100 text-gray-700' },
            planned: { label: 'Planifié', color: 'bg-gray-500 text-white', lightColor: 'bg-gray-100 text-gray-700' },
        };
        return configs[urgency] || configs.planned;
    };

    const handleAccept = (proposalId) => {
        setSelectedProposition(proposalId);
        setShowAcceptModal(true);
    };

    const accepetProposition = async (propId) => {
        if (isAccepting || !propId) return;

        setIsAccepting(true);
        try {
            const response = await axiosClient.patch(`/propositions/${propId}/accept`);

            if (response.status === 200) {
                toast.success('Proposition acceptée avec succès');
                setOffre(prev => ({ ...prev, statut: 'accepted' }));
                setShowAcceptModal(false);
            }
        } catch (error) {
            toast.error("Erreur lors de l'acceptation. Veuillez réessayer.");
        } finally {
            setIsAccepting(false);
            setSelectedProposition(null);
        }
    };

    const handleUpdateStatus = async (status) => {
        try {
            const response = await axiosClient.patch(`/offres/${id}`, { status });
            if (response.status === 200) {
                setOffre(prev => ({ ...prev, statut: status }));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getArtisanField = (artisan, field, fallback = '—') => {
        if (!artisan || Array.isArray(artisan)) return fallback;
        return artisan[field] ?? fallback;
    };


    const SkeletonGrid = () => (
        <div>
            <div className=" flex flex-col gap-1 p-1">
                <div className=' grid  grid-cols-6 gap-4 animate-pulse'>
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="bg-white border border-gray-100 w-full h-40 animate-pulse">
                            <div className="p-4 space-y-4">
                                <div className="h-30 bg-gray-200 rounded w-full mt-2" />
                            </div>
                        </div>
                    ))}
                </div>
                <div className=' grid  grid-cols-2 gap-2 '>
                    {Array.from({ length: 2 }).map((_, i) => (
                        <div key={i} className="bg-white border border-gray-100 w-full h-50 animate-pulse">
                            <div className="p-4 space-y-4">
                                <div className="h-3 bg-gray-200 rounded w-1/2" />
                                <div className="h-4 bg-gray-200 rounded w-3/4" />
                                <div className="h-3 bg-gray-200 rounded w-full" />
                                <div className="h-3 bg-gray-200 rounded w-2/3" />
                                <div className="h-8 bg-gray-200 rounded w-full mt-2" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-pulse">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="bg-white border border-gray-100 overflow-hidden">
                        <div className="h-16 bg-gray-200" />
                        <div className="p-4 space-y-3">
                            <div className="h-3 bg-gray-200 rounded w-1/2" />
                            <div className="h-4 bg-gray-200 rounded w-3/4" />
                            <div className="h-3 bg-gray-200 rounded w-full" />
                            <div className="h-3 bg-gray-200 rounded w-2/3" />
                            <div className="h-8 bg-gray-200 rounded w-full mt-2" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );



    if (loading) {
        return (
            <div className=" p-4 mt-10 h-screen">
                <SkeletonGrid />
            </div>
        );
    }
    if (!offre) return (
        <div className="flex flex-col justify-center items-center h-screen">


            <h1 className="text-[#D35400] p-2 text-[35px] font-bold animate-pulse ">Opss !</h1>
            <p className="text-gray-500">La offre que vous recherchez n'a pas été trouvée</p>
        </div>
    );

    const urgency = getUrgencyConfig(offre.niveau_urgence);
    return (
        <div className="min-h-screen bg-gray-50 mt-20 pb-8 overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div>

            </div>
            {isModalShowImage && offre.images?.[selectedImage] && (
                <div className="fixed inset-0 p-4 flex z-50 bg-gray-900 bg-opacity-50 justify-center items-center max-h-screen min-h-screen overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <div className="absolute top-4 left-4">
                        <button onClick={() => setIsModalShowImage(false)} className="text-2xl text-white p-2 transition-colors">
                            <ArrowLeft className="w-5 h-5 text-white" />
                        </button>
                    </div>
                    <img src={offre.images[selectedImage].url} alt="" className="max-h-full object-contain" />
                </div>
            )}

            <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
                <div className="w-[90%] flex justify-between mx-auto px-4 py-4">
                    <div className="flex items-center gap-3">
                        <button onClick={() => window.history.back()} className="p-2 hover:bg-gray-100 transition-colors">
                            <ArrowLeft className="w-5 h-5 text-[#1B4F72]" />
                        </button>
                        <h1 className="text-[18px] font-bold text-[#1B4F72]">Détail de l'offre</h1>
                    </div>
                    <div>
                        <button className="p-2 hover:bg-gray-100 transition-colors" onClick={() => setIsShowOptionOffre(!isShowOptionOffre)}>
                            <MoreVertical className="w-5 h-5 text-[#1B4F72]" />
                        </button>
                    </div>
                    {isShowOptionOffre && (
                        <div className="absolute top-12 right-22 bg-white border border-gray-200 w-[200px] z-50 overflow-hidden">
                            <div className="w-full flex flex-col">
                                <div className="px-4 py-2 border-b border-gray-100">
                                    <span className="text-[11px] font-bold uppercase text-gray-400 tracking-wider">Options de l'offre</span>
                                </div>
                                <button onClick={() => handleUpdateStatus('complete')} className="flex items-center gap-3 w-full p-3 hover:bg-green-50 transition-colors text-[13px] text-[#1B4F72] border-b border-gray-50">
                                    <SquareCheckBig className="w-4 h-4 text-green-600" />
                                    <span>Marquer comme complet</span>
                                </button>
                                <button onClick={() => handleUpdateStatus('annule')} className="flex items-center gap-3 w-full p-3 hover:bg-red-50 transition-colors text-[13px] text-[#1B4F72]">
                                    <XCircle className="w-4 h-4 text-red-600" />
                                    <span>Marquer comme annuler</span>
                                </button>
                                <div className="px-4 py-3 bg-blue-50/50 border-t border-gray-100">
                                    <p className="text-[11px] text-gray-500 leading-relaxed">
                                        <span className="font-semibold text-blue-600">Remarque :</span>{" "}
                                        Une fois l'offre clôturée, elle n'apparaîtra plus dans la liste des recherches.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-gray-50">

                <div className="bg-white border border-gray-200">
                    <div className="relative w-full bg-gray-100">
                        {offre.images && offre.images.length > 0 ? (
                            <div className="grid grid-cols-6 gap-0 border-t border-gray-200">
                                {offre.images.map((img, idx) => (
                                    <button
                                        key={img.id}
                                        onClick={() => { setSelectedImage(idx); setIsModalShowImage(true); }}
                                        className={`relative aspect-square overflow-hidden ${selectedImage === idx ? 'ring-2 ring-[#D35400] ring-inset z-10' : 'opacity-60 hover:opacity-100'}`}
                                    >
                                        <img src={img.url} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="aspect-video flex items-center justify-center text-gray-400">Aucune image</div>
                        )}
                    </div>
                </div>

                <div className="bg-white border border-gray-200 p-5 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 pt-4 border-t border-gray-100">

                        <div className="p-4 bg-gray-50 border border-gray-100">
                            <div className="flex items-center gap-2 text-[#1B4F72] mb-2">
                                <Briefcase className="w-4 h-4" />
                                <span className="text-[10px] uppercase font-bold">{offre.titre}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[#1B4F72] mb-2">
                                <Clipboard className="w-4 h-4" />
                                <span className="text-[10px] uppercase font-bold">Description</span>
                            </div>
                            <p className="text-[14px] text-gray-600 leading-relaxed">{offre.description}</p>
                        </div>

                        <div className="p-4 bg-gray-50 border border-gray-100">
                            <div className="flex gap-2 mb-2">
                                <div className="flex items-center gap-2 text-purple-600">
                                    <Clock className="w-4 h-4" />
                                    <span className="text-[11px] uppercase font-bold">Statut</span>
                                </div>
                                <span className="text-[11px] font-semibold text-gray-800 uppercase">{offre.statut}</span>
                            </div>

                            <div className="flex gap-2 mb-2">
                                <div className="flex items-center gap-2 text-orange-600">
                                    <DollarSign className="w-4 h-4" />
                                    <span className="text-[11px] uppercase font-bold">Budget</span>
                                </div>
                                <span className="text-[11px] font-semibold text-gray-800 uppercase">{offre.budget_estime} DH</span>
                            </div>

                            <div className="flex gap-2 mb-2">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Calendar className="w-4 h-4" />
                                    <span className="text-[11px] uppercase font-bold">Date de publication</span>
                                </div>
                                <span className="text-[11px] font-semibold text-gray-800 uppercase">{offre.created_at}</span>
                            </div>

                            <div className="flex gap-2 mb-2">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Calendar className="w-4 h-4" />
                                    <span className="text-[11px] uppercase font-bold">Date de livraison</span>
                                </div>
                                <span className="text-[11px] font-semibold text-gray-800 uppercase">
                                    {new Date(offre.preferred_date).toLocaleDateString()}
                                </span>
                            </div>

                            <div className="flex gap-2 mb-2">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <MapPin className="w-4 h-4" />
                                    <span className="text-[11px] uppercase font-bold">Ville</span>
                                </div>
                                <span className="text-[11px] font-semibold text-gray-800 uppercase">{offre.ville}</span>
                            </div>

                            <div className="flex gap-2 mb-2">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <MapPin className="w-4 h-4" />
                                    <span className="text-[11px] uppercase font-bold">Adresse</span>
                                </div>
                                <span className="text-[11px] font-semibold text-gray-800 uppercase">{offre.address}</span>
                            </div>

                            <div className="flex gap-2 mb-2">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Clock className="w-4 h-4" />
                                    <span className="text-[11px] uppercase font-bold">Niveau d'urgence</span>
                                </div>
                                <span className={`text-[11px] font-semibold uppercase px-2 py-0.5 ${urgency.color}`}>
                                    {urgency.label}
                                </span>
                            </div>

                            <div className="flex gap-2 mb-2">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Briefcase className="w-4 h-4" />
                                    <span className="text-[11px] uppercase font-bold">Catégorie</span>
                                </div>
                                <span className="text-[11px] font-semibold text-gray-800 uppercase">{offre.categorie?.nom ?? '—'}</span>
                            </div>

                            <div className="flex gap-2 mb-2">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span className="text-[11px] uppercase font-bold">Complété</span>
                                </div>
                                <span className="text-[11px] font-semibold text-gray-800 uppercase">
                                    {offre.is_completed ? 'Oui' : 'Non'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-gray-50 border border-gray-100">
                    <h3 className="text-[14px] font-bold text-[#1B4F72] mb-5">
                        Propositions reçues ({offre.propositions?.length || 0})
                    </h3>

                    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4 gap-4">
                        {offre.propositions?.map((prop) => {
                            const artisan = Array.isArray(prop.artisan) ? null : prop.artisan;
                            const artisanName = artisan?.name;
                            const artisanAvatar = artisan?.avatar ?? null;
                            const artisanNote = artisan?.note ?? '—';
                            const artisanSpecial = artisan?.specialite ?? '—';

                            return (
                                <div key={prop.id} className="bg-white border border-gray-200 overflow-hidden hover:border-[#1B4F72] transition-all flex flex-col">
                                    <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-14 h-14 bg-[#1B4F72] flex items-center justify-center text-white text-[18px] font-bold overflow-hidden">
                                                    {artisanAvatar ? (
                                                        <img src={artisanAvatar} className="w-full h-full object-cover" alt={artisanName} />
                                                    ) : (
                                                        artisanName.charAt(0) || '?'
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-[15px] font-bold text-gray-800 truncate">{artisanName}</h4>
                                                    <p className="text-[11px] text-[#D35400] font-medium mt-0.5 uppercase">{artisanSpecial}</p>
                                                    <div className="flex items-center gap-2 mt-1.5">
                                                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                                        <span className="text-[11px] font-bold text-gray-700">{artisanNote}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right p-1">
                                                <p className="text-[14px] font-bold text-[#D35400]">
                                                    {prop.prix_propose}<span className="text-[11px]">DH</span>
                                                </p>
                                                <p className="text-[11px] text-gray-500">Prix proposé</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-5 flex-1">
                                        <div>
                                            <div className="py-1 flex items-center gap-2">
                                                <Clock className="text-gray-600 w-5 h-5" />
                                                <p className="text-[10px] text-gray-500">Délai</p>
                                                <p className="text-[11px] font-bold text-gray-800">{prop.delai_execution} jours</p>
                                            </div>
                                            <div className="py-1 flex items-center gap-2">
                                                <Calendar className="text-gray-600 w-5 h-5" />
                                                <p className="text-[10px] text-gray-500">Date de début</p>
                                                <p className="text-[11px] font-bold text-gray-800">{prop.date_debut ?? '—'}</p>
                                            </div>
                                            <div className="py-1 flex items-center gap-2">
                                                <CheckCircle2 className="text-gray-600 w-5 h-5" />
                                                <p className="text-[10px] text-gray-500">Statut</p>
                                                <p className="text-[11px] font-bold text-gray-800 uppercase">{prop.statut ?? '—'}</p>
                                            </div>
                                        </div>

                                        <div className="p-3 bg-blue-50/50 border border-blue-100 mt-3">
                                            <p className="text-[11px] text-blue-600 font-medium mb-1">Message :</p>
                                            <p className="text-[12px] text-gray-700 leading-relaxed line-clamp-3">
                                                "{prop.message_explicatif}"
                                            </p>
                                        </div>
                                    </div>

                                    <div className={prop.statut !== 'en_attente' ? 'hidden' : ''}>
                                        <button
                                            disabled={prop.statut !== 'en_attente'}
                                            onClick={() => handleAccept(prop.id)}
                                            className="w-full flex items-center justify-center gap-2 py-3 bg-green-500 hover:bg-green-600 text-white text-[11px] font-bold transition-colors"
                                        >
                                            Accepter cette proposition
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {showAcceptModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white max-w-md w-full p-6">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-green-100 flex items-center justify-center mx-auto mb-3">
                                <CheckCircle2 className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-[14px] font-bold text-gray-800 mb-2">Confirmer l'acceptation ?</h3>
                            <p className="text-[12px] text-gray-500">
                                Vous allez accepter la proposition de{' '}
                                <strong className="text-[#1B4F72]">
                                    {(() => {
                                        const p = offre.propositions?.find(p => p.id === selectedProposition);
                                        const a = p && !Array.isArray(p.artisan) ? p.artisan : null;
                                        return a ? `${a.firstname ?? ''} ${a.lastname ?? ''}`.trim() : `Artisan #${p?.artisan_id}`;
                                    })()}
                                </strong>
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                disabled={isAccepting}
                                onClick={() => setShowAcceptModal(false)}
                                className="flex-1 py-2 border text-[12px] border-gray-200 text-gray-600 font-semibold disabled:opacity-50"
                            >
                                Annuler
                            </button>

                            <button
                                disabled={isAccepting}
                                onClick={() => accepetProposition(selectedProposition)}
                                className="flex-1 py-2 bg-green-500 text-[12px] text-white font-semibold flex items-center justify-center gap-2 disabled:bg-green-300 disabled:cursor-not-allowed"
                            >
                                {isAccepting ? (
                                    <>
                                        <RefreshCw className="w-3 h-3 animate-spin" />
                                        Traitement...
                                    </>
                                ) : (
                                    "Confirmer"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClientOffreDetail;