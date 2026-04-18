import React, { useEffect, useState } from 'react';
import { Heart, MapPin, Star, ArrowLeft, Trash2, SaveIcon } from 'lucide-react';
import axiosClient from '../api/axios-client';
import { Link } from 'react-router-dom';

const ClientFavoris = () => {
    const [favoriteServices, setFavoriteServices] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchFavoriteServices = async () => {
        try {
            setLoading(true);
            const response = await axiosClient.get('/favorites');
            setFavoriteServices(response.data.data || []);
        } catch (error) {
            console.error('Error fetching favorite services:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFavoriteServices();
    }, []);

    const removeFavorite = async (id) => {
        try {
            await axiosClient.post(`/services/${id}/favorie`);
            setFavoriteServices(prev => prev.filter(service => service.id !== id));
        } catch (error) {
            console.error('Error removing favorite:', error);
        }
    };

    const skeletonCards = Array(5).fill(null);
    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
    }
    const URL_BASE = "http://127.0.0.1:8000/storage/";
    return (
        <div className="min-h-screen bg-gray-50 mt-20 pb-8">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="w-[90%] mx-auto px-4 py-4">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => window.history.back()}
                            className="p-2 hover:bg-gray-100 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-[#1B4F72]" />
                        </button>
                        <h1 className="text-[20px] font-bold text-[#1B4F72]">Mes Favoris</h1>
                    </div>
                </div>
            </div>

            {/* Grid Services */}
            <div className="w-[90%] mx-auto px-4 py-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {favoriteServices.map((service) => (
                        <div key={service.id} className="bg-white border border-gray-200 overflow-hidden hover:border-[#1B4F72] transition-all group">

                            <div className="relative h-40 bg-gray-100">
                                <img
                                    src={
                                        service.images?.length > 0
                                            ? URL_BASE + service.images[0].url
                                            : 'https://via.placeholder.com/400x300?text=No+Image'
                                    }
                                    alt={service.titre}
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    onClick={() => removeFavorite(service.id)}
                                    className={`absolute top-2 right-2 w-8 h-8 flex items-center justify-center transition-all duration-300 rounded-full bg-[#D35400] text-white shadow-lg hover:bg-[red]`}
                                >
                                    <SaveIcon className={'w-4 h-4 fill-current'} />
                                </button>

                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                                    <span className="text-white text-[11px] font-medium flex items-center gap-1">
                                        {service.categorie?.nom_categorie}
                                    </span>
                                </div>
                            </div>

                            <div className="p-4">
                                <h3 className="text-[14px] font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-[#1B4F72] transition-colors">
                                    {service.titre}
                                </h3>

                                <div className="flex items-center gap-2 mb-3">

                                </div>
                                <div className="flex items-center justify-between pt-3 border-t border-gray-100">

                                    <a href={`/services/${service.id}`}
                                        className="px-3 py-2 bg-[#1B4F72] hover:bg-[#D35400] text-white text-[11px] font-medium transition-colors"
                                    >
                                        Voir
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {favoriteServices.length === 0 && (
                    <div className="text-center py-16 bg-white  ">
                        <div className="w-20 h-20 bg-gray-100 flex items-center justify-center mx-auto mb-4 rounded-full">
                            <Heart className="w-10 h-10 text-gray-300" />
                        </div>
                        <h3 className="text-[16px] font-bold text-[#1B4F72] mb-2">Aucun favori enregistré</h3>
                        <p className="text-[12px] text-gray-500">Parcourez nos services et ajoutez-les aux favoris</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClientFavoris;