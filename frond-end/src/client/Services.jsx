import React, { useEffect, useState } from 'react';
import { Heart, MapPin, Star } from 'lucide-react';
import axiosClient from '../api/axios-client';

const Services = () => {
    const [favs, setFavs] = useState([1, 3]);
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axiosClient.get('/services');
                setServices(response.data.data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        }
        fetchServices();
    }, []);

    const toggleFav = (id) => {
        setFavs(favs.includes(id) ? favs.filter(f => f !== id) : [...favs, id]);
    };

    return (
        <div className="min-h-screen bg-gray-50 mt-20 pb-8">
            <div className="w-[90%] mx-auto px-4 py-6">
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {services.map(service => (
                        <div key={service.id} className="bg-white border border-gray-200 overflow-hidden hover:border-[#1B4F72] transition-all group">

                            <div className="relative h-40 bg-gray-100">
                                <img
                                    src={service.images.length > 0
                                        ? `http://localhost:8000/storage/${service.images[0].url}`
                                        : 'https://via.placeholder.com/400x300?text=No+Image'}
                                    alt={service.titre}
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    onClick={() => toggleFav(service.id)}
                                    className={`absolute top-2 right-2 w-8 h-8 flex items-center justify-center transition-colors ${favs.includes(service.id) ? 'bg-[#D35400] text-white' : 'bg-white/90 text-gray-400 hover:text-[#D35400]'}`}
                                >
                                    <Heart className={`w-4 h-4 ${favs.includes(service.id) && 'fill-current'}`} />
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
                                    <div className="w-7 h-7 bg-[#1B4F72] flex items-center justify-center text-white text-[10px] font-bold uppercase">
                                        {service.artisan.user.firstname.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[12px] text-gray-700 truncate">
                                            {service.artisan.user.firstname} {service.artisan.user.lastname}
                                        </p>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                            <span className="text-[11px] text-gray-500">{service.artisan.note}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1 text-[11px] text-gray-500 mb-3">
                                    <MapPin className="w-3 h-3" /> {service.artisan.user.city}
                                </div>

                                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                    <div>
                                        <p className="text-[10px] text-gray-400">
                                            {service.type_tarif === 'prix_fixe' ? 'Prix fixe' : 'À partir de'}
                                        </p>
                                        <p className="text-[16px] font-bold text-[#D35400]">{service.tarif} DH</p>
                                    </div>
                                    <a href={`/services/${service.id}`} className="px-3 py-2 bg-[#1B4F72] hover:bg-[#D35400] text-white text-[11px] font-medium transition-colors">
                                        Voir
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;