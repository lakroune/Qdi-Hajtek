import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Heart } from 'lucide-react';

const CardService = ({ 
    service,
    onFavoriteClick,
    onRequestClick,
    showLocation = true,
    showUrgent = true,
    className = ''
}) => {
    const {
        id,
        title,
        artisan,
        rating,
        reviews,
        price,
        image,
        location,
        urgent = false,
        isFavorite = false
    } = service;

    const handleFavoriteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onFavoriteClick?.(id);
    };

    const handleRequestClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onRequestClick?.(service);
    };

    return (
        <div className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group ${className}`}>
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden">
                <img 
                    src={image || '/images/placeholder-service.jpg'} 
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Badge Urgent */}
                {showUrgent && urgent && (
                    <span className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">
                        URGENT
                    </span>
                )}
                
                {/* Bouton Favori */}
                <button 
                    onClick={handleFavoriteClick}
                    className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all hover:scale-110 active:scale-95"
                    aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                >
                    <Heart 
                        className={`w-5 h-5 transition-colors ${
                            isFavorite 
                                ? 'text-red-500 fill-current' 
                                : 'text-gray-400 hover:text-red-500'
                        }`} 
                    />
                </button>
                
                {/* Localisation du service */}
                {showLocation && location && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4">
                        <span className="text-white text-sm font-medium flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" /> 
                            {location}
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5">
                {/* Rating */}
                <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-semibold text-gray-900 text-sm">{rating}</span>
                    </div>
                    <span className="text-gray-500 text-sm">({reviews} avis)</span>
                </div>

                {/* Title */}
                <Link to={`/services/${id}`}>
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
                        {title}
                    </h3>
                </Link>

                {/* Artisan */}
                <p className="text-sm text-gray-600 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">
                        {artisan.charAt(0)}
                    </span>
                    par {artisan}
                </p>

                {/* Price & Action */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500">À partir de</span>
                        <span className="text-xl font-bold text-orange-600">{price}</span>
                    </div>
                    <button 
                        onClick={handleRequestClick}
                        className="px-5 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-orange-600 transition-all active:scale-95 shadow-md hover:shadow-lg"
                    >
                        Demander
                    </button>
                </div>
            </div>
        </div>
    );
};



export default CardService;