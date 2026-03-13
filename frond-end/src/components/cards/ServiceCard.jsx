import React from 'react';
import {
    MapPin, Star, Clock, DollarSign, Briefcase,
    CheckCircle, XCircle, Eye, User, Calendar
} from 'lucide-react';

const ServiceCard = ({
    service,
    onApprove,
    onReject,
    onView,
    showActions = true,
    layout = 'grid'
}) => {
    if (layout === 'list') {
        return (
            <div className="flex items-center gap-4 p-4 bg-white border border-gray-200 hover:border-[#D35400] transition-colors">
                <div className="w-24 h-24 bg-gray-100 flex-shrink-0 relative">
                    {service.images?.[0] ? (
                        <img
                            src={service.images[0]}
                            alt={service.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-[#1B4F72]/10 flex items-center justify-center">
                            <Briefcase className="w-8 h-8 text-[#1B4F72]" />
                        </div>
                    )}
                    <div className="absolute top-1 left-1">
                        {getStatusBadge(service.status)}
                    </div>
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-[13px] font-semibold text-[#1B4F72] truncate">{service.title}</h3>
                            <p className="text-[11px] text-gray-500 mt-0.5">{service.category}  </p>

                        </div>
                    </div>

                    <p className="text-[11px] text-gray-600 mt-2 line-clamp-2">{service.description}</p>

                    <div className="flex items-center gap-4 mt-3 text-[10px] text-gray-500">
                        <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5" />
                            {service.artisan.name}
                        </span>
                        <span className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-[#D35400]" />
                            {service.artisan.rating}
                        </span>
                        <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {service.location}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {service.duration}
                        </span>
                        <span className="text-[11px] font-bold text-[#D35400]">{service.price} DH</span>

                    </div>
                </div>

                {showActions && service.status === 'pending' && (
                    <div className="flex flex-col items-center gap-1 flex-shrink-0">
                        <button
                            onClick={() => onApprove(service.id)}
                            className=" w-full p-1.5 text-white bg-green-600 text-[10px]  hover:bg-green-800 transition-colors"
                            title="Approuver"
                        >
                            approuver
                        </button>
                        <button
                            onClick={() => onReject(service.id)}
                            className="w-full p-1.5 text-white bg-red-600 text-[10px] hover:bg-red-800 transition-colors"
                            title="Rejeter"
                        >
                            rejeter
                        </button>
                        <button
                            onClick={() => onView(service)}
                            className= "w-full p-1.5 text-white bg-gray-600 text-[10px] hover:bg-gray-800 transition-colors"
                            title="Voir détails"
                        >
                            Voir
                        </button>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="bg-white border border-gray-200 hover:border-[#D35400] transition-all group">
            <div className="h-40 bg-gray-100 relative overflow-hidden">
                {service.images?.[0] ? (
                    <img
                        src={service.images[0]}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full bg-[#1B4F72]/10 flex items-center justify-center">
                        <Briefcase className="w-12 h-12 text-[#1B4F72]" />
                    </div>
                )}
                <div className="absolute top-2 left-2">
                    {getStatusBadge(service.status)}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <p className="text-white text-[11px] font-medium flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        {service.artisan.name}
                    </p>
                </div>
            </div>

            <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                    <span className="text-[10px] text-[#D35400] font-medium px-2 py-0.5 bg-[#D35400]/10">
                        {service.category}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-gray-500">
                        <Star className="w-3.5 h-3.5 text-[#D35400]" />
                        <span className="font-medium text-[#1B4F72]">{service.artisan.rating}</span>
                    </div>
                </div>

                <h3 className="text-[13px] font-semibold text-[#1B4F72] mb-2 line-clamp-2 group-hover:text-[#D35400] transition-colors">
                    {service.title}
                </h3>

                <p className="text-[11px] text-gray-600 mb-3 line-clamp-2">{service.description}</p>

                <div className="flex items-center gap-3 text-[10px] text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {service.location}
                    </span>
                    <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {service.duration}
                    </span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div>
                        <span className="text-[10px] text-gray-400">À partir de</span>
                        <p className="text-[12px] font-bold text-[#D35400]">{service.price} DH</p>
                    </div>

                    {showActions && service.status === 'pending' ? (
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => onApprove(service.id)}
                                className="p-1.5 bg-green-500 hover:bg-green-600 text-[10px] text-white transition-colors"
                                title="Approuver"
                            >
                                approver
                            </button>
                            <button
                                onClick={() => onReject(service.id)}
                                className="p-1.5 bg-red-500 hover:bg-red-600 text-[10px] text-white transition-colors"
                                title="Rejeter"
                            >
                                rejeter
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => onView(service)}
                            className="px-3 py-2 bg-[#1B4F72] hover:bg-[#D35400] text-white text-[11px] font-medium transition-colors"
                        >
                            Voir détails
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const getStatusBadge = (status) => {
    const styles = {
        pending: 'bg-yellow-500 text-white',
        approved: 'bg-green-500 text-white',
        rejected: 'bg-red-500 text-white'
    };
    const labels = { pending: 'En attente', approved: 'Approuvé', rejected: 'Rejeté' };
    return (
        <span className={`w-full px-2 py-0.5 text-[10px]  font-medium ${styles[status]}`}>
            {labels[status]}
        </span>
    );
};

export default ServiceCard;