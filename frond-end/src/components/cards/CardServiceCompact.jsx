import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Heart } from 'lucide-react';
 const CardServiceCompact = ({ service, onFavoriteClick }) => {
    return (
        <div className="flex gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all">
            <img 
                src={service.image} 
                alt={service.title}
                className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-gray-900 truncate">{service.title}</h4>
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            onFavoriteClick?.(service.id);
                        }}
                        className="p-1 hover:bg-gray-100 rounded-full"
                    >
                        <Heart className={`w-4 h-4 ${service.isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                    </button>
                </div>
                <p className="text-sm text-gray-500 mb-1">{service.artisan}</p>
                <div className="flex items-center gap-1 mb-2">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{service.rating}</span>
                    <span className="text-xs text-gray-400">({service.reviews})</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="font-bold text-orange-600">{service.price}</span>
                    {service.urgent && (
                        <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-bold rounded">
                            URGENT
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};
export default CardServiceCompact;