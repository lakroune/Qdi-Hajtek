import React from 'react';
import { MapPin, Star, Clock, Briefcase, User } from 'lucide-react';

const getStatusBadge = (statut) => {
    const map = {
        approuve: <span className="px-2 py-0.5 text-[10px] font-medium bg-green-500 text-white">Approuvé</span>,
        en_attente: <span className="px-2 py-0.5 text-[10px] font-medium bg-yellow-500 text-white">En attente</span>,
        rejete: <span className="px-2 py-0.5 text-[10px] font-medium bg-red-500 text-white">Rejeté</span>,
    };
    return map[statut] ?? <span className="px-2 py-0.5 text-[10px] font-medium bg-gray-400 text-white">—</span>;
};

const ServiceCard = ({
    service,
    onView,
    showActions = true,
    layout = 'grid',
    imageUrl,
    title,
    category,
    price,
    currency,
    duration,
    location,
    artisanName,
    rating,
    isActive,
    isVerified,
    isPending,
    statut,
}) => {

    if (layout === 'list') {
        return (
            <div className="flex items-center gap-4 p-4 bg-white border border-gray-200 hover:border-[#D35400] transition-colors">
                <div className="w-24 h-24 bg-gray-100 flex-shrink-0 relative">
                    {imageUrl ? (
                        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-[#1B4F72]/10 flex items-center justify-center">
                            <Briefcase className="w-8 h-8 text-[#1B4F72]" />
                        </div>
                    )}
                    <div className="absolute top-1 left-1">
                        {getStatusBadge(statut)}
                    </div>
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="text-[13px] font-semibold text-[#1B4F72] truncate">{title}</h3>
                    <p className="text-[11px] text-gray-500 mt-0.5">{category}</p>
                    <p className="text-[11px] text-gray-600 mt-2 line-clamp-2">{service.description}</p>

                    <div className="flex items-center gap-4 mt-3 text-[10px] text-gray-500">
                        <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5" />
                            {artisanName}
                        </span>
                        <span className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-[#D35400]" />
                            {rating}
                        </span>
                        <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {location}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {duration}
                        </span>
                        <span className="text-[11px] font-bold text-[#D35400]">{price} {currency}</span>
                    </div>
                </div>

                {showActions && isPending && (
                    <div className="flex flex-col items-center gap-1 flex-shrink-0">
                        <button onClick={() => onView(service)} className="w-full p-1.5 text-white bg-gray-600 text-[10px] hover:bg-gray-800 transition-colors">
                            Voir
                        </button>
                    </div>
                )}
            </div>
        );
    }

    // layout === 'grid'
    return (
        <div className="bg-white border border-gray-200 hover:border-[#D35400] transition-all group">
            <div className="h-40 bg-gray-100 relative overflow-hidden">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full bg-[#1B4F72]/10 flex items-center justify-center">
                        <Briefcase className="w-12 h-12 text-[#1B4F72]" />
                    </div>
                )}
                <div className="absolute top-2 left-2">
                    {getStatusBadge(statut)}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <p className="text-white text-[11px] font-medium flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        {artisanName}
                    </p>
                </div>
            </div>

            <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                    <span className="text-[10px] text-[#D35400] font-medium px-2 py-0.5 bg-[#D35400]/10">
                        {category}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-gray-500">
                        <Star className="w-3.5 h-3.5 text-[#D35400]" />
                        <span className="font-medium text-[#1B4F72]">{rating}</span>
                    </div>
                </div>

                <h3 className="text-[13px] font-semibold text-[#1B4F72] mb-2 line-clamp-2 group-hover:text-[#D35400] transition-colors">
                    {title}
                </h3>

                <p className="text-[11px] text-gray-600 mb-3 line-clamp-2">{service.description}</p>

                <div className="flex items-center gap-3 text-[10px] text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {location}
                    </span>
                    <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {duration}
                    </span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div>
                        <span className="text-[10px] text-gray-400">À partir de</span>
                        <p className="text-[12px] font-bold text-[#D35400]">{price} {currency}</p>
                    </div>


                    <button onClick={() => onView(service)} className="px-3 py-2 bg-[#1B4F72] hover:bg-[#D35400] text-white text-[11px] font-medium transition-colors">
                        Voir détails
                    </button>

                </div>
            </div>
        </div>
    );
};

export default ServiceCard;