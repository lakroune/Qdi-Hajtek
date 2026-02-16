import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, CheckCircle, Award, Briefcase } from 'lucide-react';

const CardArtisan = ({ 
    artisan,
    onViewProfile,
    showBadges = true,
    showServices = true,
    showStats = true,
    variant = 'default', // 'default' | 'compact' | 'horizontal'
    className = ''
}) => {
    const {
        id,
        name,
        specialty,
        rating,
        reviews,
        completedJobs,
        image,
        location,
        verified = false,
        services = [],
        badges = [],
        bio,
        isOnline = false
    } = artisan;

    const handleViewProfile = () => {
        onViewProfile?.(artisan);
    };

    // Variant Default (Vertical)
    if (variant === 'default') {
        return (
            <div className={`bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all group ${className}`}>
                {/* Avatar */}
                <div className="relative mb-4">
                    <div className="relative w-24 h-24 mx-auto">
                        <img
                            src={image || '/images/placeholder-avatar.jpg'}
                            alt={name}
                            className="w-full h-full rounded-full object-cover border-4 border-white shadow-md group-hover:scale-105 transition-transform"
                        />
                        {isOnline && (
                            <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
                        )}
                    </div>
                    {verified && (
                        <div className="absolute bottom-0 right-1/2 translate-x-10 bg-blue-500 text-white p-1.5 rounded-full shadow-sm" title="Artisan vérifié">
                            <CheckCircle className="w-4 h-4" />
                        </div>
                    )}
                </div>

                {/* Info */}
                <div className="text-center mb-4">
                    <h3 className="font-bold text-gray-900 text-lg group-hover:text-orange-600 transition-colors">{name}</h3>
                    <p className="text-orange-600 text-sm font-medium">{specialty}</p>
                    <div className="flex items-center justify-center gap-1.5 mt-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-semibold text-gray-900">{rating}</span>
                        <span className="text-gray-500 text-sm">({reviews} avis)</span>
                    </div>
                </div>

                {/* Badges */}
                {showBadges && badges.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                        {badges.slice(0, 3).map((badge, idx) => (
                            <span 
                                key={idx} 
                                className="px-2.5 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full flex items-center gap-1"
                            >
                                <Award className="w-3 h-3" />
                                {badge}
                            </span>
                        ))}
                    </div>
                )}

                {/* Services */}
                {showServices && services.length > 0 && (
                    <div className="space-y-2 mb-4">
                        {services.slice(0, 2).map((service, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                <span className="truncate">{service}</span>
                            </div>
                        ))}
                        {services.length > 2 && (
                            <p className="text-xs text-gray-400 pl-6">+{services.length - 2} autres</p>
                        )}
                    </div>
                )}

                {/* Stats */}
                {showStats && (
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4 pt-3 border-t border-gray-200">
                        <span className="flex items-center gap-1" title="Localisation">
                            <MapPin className="w-4 h-4" /> 
                            <span className="truncate max-w-[80px]">{location}</span>
                        </span>
                        <span className="flex items-center gap-1" title="Travaux complétés">
                            <Briefcase className="w-4 h-4" /> 
                            {completedJobs}
                        </span>
                    </div>
                )}

                {/* Action */}
                <Link 
                    to={`/artisans/${id}`}
                    onClick={handleViewProfile}
                    className="block w-full py-3 bg-gray-900 text-white text-center font-medium rounded-xl hover:bg-orange-600 transition-colors"
                >
                    Voir profil
                </Link>
            </div>
        );
    }

    if (variant === 'compact') {
        return (
            <div className={`flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all ${className}`}>
                <div className="relative flex-shrink-0">
                    <img
                        src={image || '/images/placeholder-avatar.jpg'}
                        alt={name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
                    />
                    {verified && (
                        <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-0.5 rounded-full">
                            <CheckCircle className="w-3 h-3" />
                        </div>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-900 truncate">{name}</h4>
                        {isOnline && <span className="w-2 h-2 bg-green-500 rounded-full"></span>}
                    </div>
                    <p className="text-sm text-orange-600 truncate">{specialty}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            {rating}
                        </span>
                        <span>•</span>
                        <span>{location}</span>
                    </div>
                </div>
                <Link 
                    to={`/artisans/${id}`}
                    className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-orange-600 hover:text-white transition-colors"
                >
                    Voir
                </Link>
            </div>
        );
    }

    if (variant === 'horizontal') {
        return (
            <div className={`flex flex-col sm:flex-row gap-6 p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all ${className}`}>
                <div className="relative flex-shrink-0 mx-auto sm:mx-0">
                    <img
                        src={image || '/images/placeholder-avatar.jpg'}
                        alt={name}
                        className="w-32 h-32 rounded-2xl object-cover"
                    />
                    {verified && (
                        <div className="absolute -top-2 -right-2 bg-blue-500 text-white p-1.5 rounded-full shadow-sm">
                            <CheckCircle className="w-4 h-4" />
                        </div>
                    )}
                    {isOnline && (
                        <span className="absolute bottom-2 right-2 px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                            En ligne
                        </span>
                    )}
                </div>
                
                <div className="flex-1 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">{name}</h3>
                            <p className="text-orange-600 font-medium">{specialty}</p>
                        </div>
                        <div className="flex items-center justify-center sm:justify-start gap-1 bg-yellow-50 px-3 py-1 rounded-lg">
                            <Star className="w-5 h-5 text-yellow-400 fill-current" />
                            <span className="font-bold text-lg">{rating}</span>
                            <span className="text-gray-500 text-sm">({reviews})</span>
                        </div>
                    </div>

                    {bio && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{bio}</p>
                    )}

                    <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-4">
                        {badges.map((badge, idx) => (
                            <span key={idx} className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
                                {badge}
                            </span>
                        ))}
                    </div>

                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" /> {location}
                        </span>
                        <span className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" /> {completedJobs} travaux
                        </span>
                        <span className="flex items-center gap-1">
                            <CheckCircle className="w-4 h-4 text-green-500" /> {services.length} services
                        </span>
                    </div>

                    <div className="flex gap-3 justify-center sm:justify-start">
                        <Link 
                            to={`/artisans/${id}`}
                            className="px-6 py-2.5 bg-gray-900 text-white font-medium rounded-xl hover:bg-orange-600 transition-colors"
                        >
                            Voir profil
                        </Link>
                        <button className="px-6 py-2.5 border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:border-orange-600 hover:text-orange-600 transition-colors">
                            Contacter
                        </button>
                    </div>
                </div>
            </div>
        );
    }
};


export default CardArtisan;