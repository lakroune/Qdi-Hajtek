import React, { useEffect, useState } from 'react';
import {
    Calendar, DollarSign, Clock, ArrowLeft,
    CheckCircle2, MoreVertical, Star,

    Clipboard,
    RefreshCw,
    MapPin,
    Briefcase
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import axiosClient from '../api/axios-client';

const ClientOffreDetail = () => {
    const [offre, setOffre] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedProposition, setSelectedProposition] = useState(null);
    const [showAcceptModal, setShowAcceptModal] = useState(false);
    const { id } = useParams();
    const [isModalShowImage, setIsModalShowImage] = useState(false);

    useEffect(() => {
        const fetchOffreTravail = async () => {
            try {
                const response = await axiosClient.get('/offres/' + id);
                setOffre(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }
        fetchOffreTravail();
    }, [id]);

    const getImageUrl = (imagePath) => {
        if (!imagePath) return null;
        const cleanPath = imagePath.replace(/^\//, '');
        return `http://127.0.0.1:8000/storage/${cleanPath}`;
    };

    const getUrgencyConfig = (urgency) => {
        const configs = {
            urgent: { label: 'Urgent', color: 'bg-red-500 text-white', lightColor: 'bg-red-50 text-red-700' },
            standard: { label: 'Standard', color: 'bg-blue-500 text-white', lightColor: 'bg-blue-50 text-blue-700' },
            planned: { label: 'Planifié', color: 'bg-gray-500 text-white', lightColor: 'bg-gray-100 text-gray-700' }
        };
        return configs[urgency] || configs.planned;
    };

    const handleAccept = (proposalId) => {
        setSelectedProposition(proposalId);
        setShowAcceptModal(true);
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><RefreshCw className="animate-spin  w-12 h-12 text-[#D35400]" /></div>;
    }
    if (!offre) return <div className="text-center mt-40">Offre introuvable.</div>;

    const urgency = getUrgencyConfig(offre.niveau_urgence);
    const accepetProposition = async (id) => {
        try {
            const response = await axiosClient.patch(`/propositions/${id}/accept`);

            if (response.status === 200) {
                setShowAcceptModal(false);

                const updatedOffre = { ...offre };
                updatedOffre.statut = 'accepted';
                setOffre(updatedOffre);

            }
        } catch (error) {
        }
    };
    return (
        <div className="min-h-screen bg-gray-50 mt-20 pb-8 overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {isModalShowImage && (
                <div className="fixed inset-0 p-4 flex z-50 bg-gray-900 bg-opacity-50 justify-center items-center max-h-screen min-h-screen  overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <div className='absolute top-4 left-4'>
                        <button
                            onClick={() => setIsModalShowImage(false)}
                            className=" text-2xl text-white p-2  transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-white" />
                        </button>
                    </div>

                    <img
                        src={getImageUrl(offre.images[selectedImage].url)}
                        alt=""
                        className="max-h-full  object-contain overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                    />
                </div>
            )}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
                <div className="w-[90%] flex justify-between mx-auto px-4 py-4">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => window.history.back()}
                            className="p-2 hover:bg-gray-100 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-[#1B4F72]" />
                        </button>
                        <div>
                            <h1 className="text-[18px] font-bold text-[#1B4F72]">Détail de l'offre</h1>
                        </div>
                    </div>
                    <div>
                        <MoreVertical className="w-5 h-5 text-[#1B4F72]" />
                    </div>
                </div>
            </div>

            <div className="    bg-gray-50 ">
                <div className="bg-white border border-gray-200">
                    <div className="relative w-full bg-gray-100">
                        {offre.images && offre.images.length > 0 ? (


                            <div className="grid grid-cols-6 gap-0 border-t border-gray-200">
                                {offre.images.map((img, idx) => (
                                    <button
                                        key={img.id}
                                        onClick={() => { setSelectedImage(idx); setIsModalShowImage(true) }}
                                        className={`relative aspect-square overflow-hidden ${selectedImage === idx
                                            ? 'ring-2 ring-[#D35400] ring-inset z-10'
                                            : 'opacity-60 hover:opacity-100'
                                            }`}
                                    >
                                        <img src={getImageUrl(img.url)} alt="" className="w-full h-full object-cover" />
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
                            <div>
                                <div className="flex items-center gap-2 text-[#1B4F72] mb-2">
                                    <Briefcase className="w-4 h-4" />
                                    <span className="text-[10px] uppercase font-bold">  {offre.titre}</span>
                                </div>

                            </div>
                            <div className="flex items-center gap-2 text-[#1B4F72] mb-2">
                                <Clipboard className="w-4 h-4" />
                                <span className="text-[10px] uppercase font-bold">Description</span>
                            </div>
                            <p className="text-[14px] text-gray-600 leading-relaxed">
                                {offre.description}
                            </p>
                        </div>



                        <div className="p-4 bg-gray-50 border border-gray-100">
                            <div className=' flex gap-2 '>
                                <div className="flex items-center gap-2 text-purple-600 mb-2">
                                    <Clock className="w-4 h-4" />
                                    <span className="text-[11px] uppercase font-bold">Statut</span>
                                </div>
                                <span className="text-[11px] font-semibold text-gray-800 uppercase">{offre.statut}</span>
                            </div>
                            <div className=' flex gap-2 '>
                                <div className="flex items-center gap-2 text-orange-600 mb-2">
                                    <DollarSign className="w-4 h-4" />
                                    <span className="text-[11px] uppercase font-bold">Budjet</span>
                                </div>
                                <span className="text-[11px] font-semibold text-gray-800 uppercase">{offre.budget_estime}</span>
                            </div>

                            <div className=' flex gap-2 '>
                                <div className="flex items-center gap-2 text-gray-600 mb-2">
                                    <Calendar className="w-4 h-4" />
                                    <span className="text-[11px] uppercase font-bold">Date de publication</span>
                                </div>
                                <span className="text-[11px] font-semibold text-gray-800 uppercase">{new Date(offre.created_at).toLocaleDateString()}</span>
                            </div>
                            {/* preferred_date */}
                            <div className=' flex gap-2 '>
                                <div className="flex items-center gap-2 text-gray-600 mb-2">
                                    <Calendar className="w-4 h-4" />
                                    <span className="text-[11px] uppercase font-bold">Date de livraison</span>
                                </div>
                                <span className="text-[11px] font-semibold text-gray-800 uppercase">{new Date(offre.preferred_date).toLocaleDateString()}</span>
                            </div>
                            {/* ville */}

                            <div className=' flex gap-2 '>
                                <div className="flex items-center gap-2 text-gray-600 mb-2">
                                    <MapPin className="w-4 h-4" />
                                    <span className="text-[11px] uppercase font-bold">Ville</span>
                                </div>
                                <span className="text-[11px] font-semibold text-gray-800 uppercase">{offre.ville}</span>
                            </div>

                            {/* address */}
                            <div className=' flex gap-2 '>
                                <div className="flex items-center gap-2 text-gray-600 mb-2">
                                    <MapPin className="w-4 h-4" />
                                    <span className="text-[11px] uppercase font-bold">Adresse</span>
                                </div>
                                <span className="text-[11px] font-semibold text-gray-800 uppercase">{offre.address}</span>
                            </div>
                            {/* niveau_urgence */}
                            <div className=' flex gap-2 '>
                                <div className="flex items-center gap-2 text-gray-600 mb-2">
                                    <Clock className="w-4 h-4" />
                                    <span className="text-[11px] uppercase font-bold">Niveau d'urgence</span>
                                </div>
                                <span className="text-[11px] font-semibold text-gray-800 uppercase">{offre.niveau_urgence}</span>
                            </div>
                            {/* is_completed */}

                            <div className=' flex gap-2 '>
                                <div className="flex items-center gap-2 text-gray-600 mb-2">
                                    <Clock className="w-4 h-4" />
                                    <span className="text-[11px] uppercase font-bold">Statut</span>
                                </div>
                                <span className="text-[11px] font-semibold text-gray-800 uppercase">{offre.statut}</span>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Proposals Section */}
                <div className="p-4 bg-gray-50 border border-gray-100">
                    <h3 className="text-[14px] font-bold text-[#1B4F72] mb-5">
                        Propositions reçues ({offre.propositions?.length || 0})
                    </h3>

                    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4 gap-4 ">
                        {offre.propositions?.map((prop) => (
                            <div key={prop.id} className="bg-white border border-gray-200 overflow-hidden hover:border-[#1B4F72] transition-all flex flex-col">
                                <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-14 h-14 bg-[#1B4F72] flex items-center justify-center text-white text-[18px] font-bold overflow-hidden">
                                                {prop.artisan.user.client.avatar ? (
                                                    <img src={getImageUrl(prop.artisan.user.client.avatar)} className="w-full h-full object-cover" alt="" />
                                                ) : prop.artisan.user.firstname.charAt(0)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-[15px] font-bold text-gray-800 truncate">
                                                    {prop.artisan.user.firstname} {prop.artisan.user.lastname}
                                                </h4>
                                                <p className="text-[11px] text-[#D35400] font-medium mt-0.5 uppercase">
                                                    {prop.artisan.specialite}
                                                </p>
                                                <div className="flex items-center gap-2 mt-1.5">
                                                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                                    <span className="text-[11px] font-bold text-gray-700">{prop.artisan.note}</span>
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

                                <div className="p-5   flex-1">
                                    <div className="">
                                        <div className="  py-1 flex items-center gap-2" >
                                            <Clock className=" text-gray-600 w-5 h-5 " />
                                            <p className="text-[10px] text-gray-500">Délai</p>
                                            <p className="text-[11px] font-bold text-gray-800">{prop.delai_execution} jours</p>
                                        </div>
                                        {/* date_disponibilite */}

                                        <div className=" py-1 flex items-center gap-2" >
                                            <Clock className=" text-gray-600 w-5 h-5 " />
                                            <p className="text-[10px] text-gray-500">Date de disponibilité</p>
                                            <p className="text-[11px] font-bold text-gray-800">{prop.date_disponibilite}</p>
                                        </div>
                                        {/* conditions_speciales */}

                                        <div className=" py-1 flex items-center gap-2" >
                                            <Clock className=" text-gray-600 w-5 h-5 " />
                                            <p className="text-[10px] text-gray-500">Conditions speciales</p>
                                            <p className="text-[11px] font-bold text-gray-800">{prop.conditions_speciales ?? "Aucune"}</p>
                                        </div>
                                    </div>

                                    <div className="p-3 bg-blue-50/50 border border-blue-100">
                                        <p className="text-[11px] text-blue-600 font-medium mb-1">Message :</p>
                                        <p className="text-[12px] text-gray-700 leading-relaxed line-clamp-3">
                                            "{prop.message_explicatif}"
                                        </p>
                                    </div>
                                </div>

                                <div className="p-5 pt-0">
                                    <button
                                        onClick={() => handleAccept(prop.id)}
                                        className="w-full flex items-center justify-center gap-2 py-3 bg-green-500 hover:bg-green-600 text-white text-[11px] font-bold transition-colors"
                                    >
                                        Accepter cette proposition
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showAcceptModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white max-w-md w-full p-6  ">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-green-100 flex items-center justify-center mx-auto mb-3">
                                <CheckCircle2 className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-[14px] font-bold text-gray-800 mb-2">Confirmer l'acceptation ?</h3>
                            <p className="text-[12px] text-gray-500">
                                Vous allez accepter la proposition de <strong className="text-[#1B4F72]">
                                    {offre.propositions.find(p => p.id === selectedProposition)?.artisan.user.firstname}
                                </strong>
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => setShowAcceptModal(false)} className="flex-1 py-2   border text-[12px] border-gray-200 text-gray-600 font-semibold">Annuler</button>
                            <button onClick={() => accepetProposition(selectedProposition)} className="flex-1  py-2 bg-green-500  text-[12px] text-white font-semibold">Confirmer</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClientOffreDetail;