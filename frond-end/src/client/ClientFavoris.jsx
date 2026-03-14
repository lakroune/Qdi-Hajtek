import React, { useState } from 'react';
import {
    Heart, Trash2, MapPin, Star, Briefcase,
    ArrowLeft
} from 'lucide-react';

const ClientFavoris = () => {
    const [viewMode, setViewMode] = useState('grid');

    // Services favoris
    const favoriteServices = [
        {
            id: 1,
            title: "Réparation plomberie complète",
            category: "Plomberie",
            artisan: {
                name: "Karim El Amrani",
                rating: 4.9,
                reviews: 127,
                location: "Casablanca, Maârif"
            },
            price: 350,
            image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400&h=300&fit=crop",
            savedAt: "Il y a 2 jours"
        }
    ];






    const removeFavorite = (id, type) => {
        // TODO: API call
        console.log(`Remove ${type} ${id}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 mt-20 pb-8">

            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="w-[90%] mx-auto px-4 py-4">
                    <div className="flex items-center gap-3 mb-4">
                        <button
                            onClick={() => window.history.back()}
                            className="p-2 hover:bg-gray-100 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-[#1B4F72]" />
                        </button>
                        <div>
                            <h1 className="text-[20px] font-bold text-[#1B4F72]">Mes Favoris</h1>

                        </div>
                    </div>



                </div>
            </div>

            {/* Content */}
            <div className="w-[90%] mx-auto px-4 py-6">



                {/* Services Tab */}

                <div className={
                    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"

                }>
                    {favoriteServices.map((service) => (
                        <div
                            key={service.id}
                            className={`bg-white border border-gray-200 overflow-hidden hover:border-[#1B4F72] transition-all group ${viewMode === 'list' ? 'flex' : ''
                                }`}
                        >
                            <div className={`relative bg-gray-100  aspect-[4/3]}`}>

                                <button
                                    onClick={() => removeFavorite(service.id, 'service')}
                                    className="absolute top-2 right-2 w-8 h-8 bg-white/90 hover:bg-red-50 flex items-center justify-center transition-colors"
                                >
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                </button>
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                                    <p className="text-white text-[11px] font-medium">{service.category}</p>
                                </div>
                            </div>

                            <div className="p-4 flex-1 flex flex-col">
                                <h3 className="text-[14px] font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-[#1B4F72] transition-colors">
                                    {service.title}
                                </h3>

                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-6 h-6 bg-[#1B4F72] flex items-center justify-center text-white text-[10px] font-bold">
                                        {service.artisan.name.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[11px] font-medium text-gray-700 truncate">{service.artisan.name}</p>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                            <span className="text-[10px] text-gray-500">{service.artisan.rating}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1 text-[11px] text-gray-500 mb-3">
                                    <MapPin className="w-3 h-3" />
                                    <span className="truncate">{service.artisan.location}</span>
                                </div>

                                <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
                                    <div>
                                        <p className="text-[10px] text-gray-400">À partir de</p>
                                        <p className="text-[16px] font-bold text-[#D35400]">{service.price} DH</p>
                                    </div>
                                    <a
                                        href={`/services/${service.id}`}
                                        className="px-3 py-2 bg-[#1B4F72] hover:bg-[#D35400] text-white text-[11px] font-medium transition-colors"
                                    >
                                        Voir
                                    </a>
                                </div>

                                <p className="text-[9px] text-gray-400 mt-2">Enregistré {service.savedAt}</p>
                            </div>
                        </div>
                    ))}
                </div>




                {(favoriteServices.length === 0) && (
                    <div className="text-center py-16">
                        <div className="w-20 h-20 bg-gray-100 flex items-center justify-center mx-auto mb-4">
                            <Heart className="w-10 h-10 text-gray-300" />
                        </div>
                        <h3 className="text-[16px] font-bold text-[#1B4F72] mb-2">
                            Aucun favori enregistré
                        </h3>
                        <p className="text-[12px] text-gray-500 mb-4">
                            Vous n'avez pas encore enregistré de favoris
                        </p>

                    </div>
                )}
            </div>
        </div >
    );
};

export default ClientFavoris;