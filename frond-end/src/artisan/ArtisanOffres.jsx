import React, { useState, useEffect, use } from 'react';
import {
    Briefcase, MapPin, DollarSign, Calendar,
    Search, Star, User, X, ArrowRight, Loader2, Eye,
    Camera, Clock
} from 'lucide-react';
import axiosClient from '../api/axios-client';

const ArtisanOffres = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [offres, setOffres] = useState([]);
    const [filteredOffres, setFilteredOffres] = useState([]);

    const [search, setSearch] = useState('');
    const [filterByCategorie, setFilterByCategorie] = useState('');

    const [categories, setCategories] = useState([]);


    useEffect(() => {

        const fetchOffres = async () => {
            try {
                const response = await axiosClient.get('/offres');
                setOffres(response.data.offres.data);
                setCategories(response.data.categories);
                setIsLoading(false);
            } catch (error) {

            }
        }
        fetchOffres();

    }, []);




    const badgeUrgence = (name) => {
        const tableUrgence = {
            urgent: {
                titre: 'Urgent',
                color: 'bg-red-500 text-white',
                lightColor: 'bg-red-50 text-red-600 border-red-200'
            },
            moyen: {
                titre: 'Standard',
                color: 'bg-blue-500 text-white',
                lightColor: 'bg-blue-50 text-blue-600 border-blue-200'
            },
            faible: {
                titre: 'Planifié',
                color: 'bg-gray-500 text-white',
                lightColor: 'bg-gray-100 text-gray-600 border-gray-200'
            }
        };
        return tableUrgence[name] ;
    };



    return (
        <div className="min-h-screen bg-gray-100 mt-20 pb-8">

            <div className="bg-white   sticky top-0 z-10">
                <div className="w-[90%] mx-auto px-4 py-4">

                    <div className="mb-4">
                        <h1 className="text-[20px] font-bold text-[#1B4F72]">Offres disponibles</h1>

                    </div>

                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Rechercher une offre..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 text-[12px] bg-gray-50 border border-gray-200   focus:border-[#D35400] focus:outline-none focus:ring-2 focus:ring-[#D35400]/20 transition-all"
                            />
                        </div>

                        <select
                            value={filterByCategorie}
                            onChange={(e) => setFilterByCategorie(e.target.value)}
                            className="px-3 py-2 text-[12px] bg-gray-50 border border-gray-200   focus:border-[#D35400] focus:outline-none focus:ring-2 focus:ring-[#D35400]/20 w-36"
                        >
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.nom_categorie}</option>
                            ))}
                        </select>

                        {search && (
                            <button
                                onClick={clearFilters}
                                className="px-3 py-2 bg-gray-100 hover:bg-red-50 text-gray-500 hover:text-red-500   transition-colors"
                                title="Réinitialiser"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="w-full mx-auto px-4 py-6">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-10 h-10 text-[#1B4F72] animate-spin mb-3" />
                        <p className="text-[12px] text-gray-500">Chargement des offres...</p>
                    </div>
                ) : offres.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-20 h-20    flex items-center justify-center mx-auto mb-4">
                            <Briefcase className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-[16px] font-bold text-[#1B4F72] mb-2">Aucune offre trouvée</h3>
                        <p className="text-[12px] text-gray-500 mb-4">Essayez de modifier vos critères de recherche</p>
                        <button
                            onClick={clearFilters}
                            className="px-6 py-2.5 bg-[#1B4F72] hover:bg-[#D35400] text-white text-[12px] font-medium   transition-colors"
                        >
                            Voir toutes les offres
                        </button>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {offres.map((offre) => {
                            const urgency = badgeUrgence(offre?.niveau_urgence);
                            return (
                                <div
                                    key={offre.id}
                                    className="bg-white     hover:  border border-gray-100 transition-all duration-300 overflow-hidden group"
                                >
                                    <div className="relative">
                                        <div className={`absolute top-3 left-3 px-2.5 py-1  ${urgency.color}  text-[10px] font-bold uppercase tracking-wide  `}>
                                            {urgency.titre}
                                        </div>

                                        <div className="h-16 bg-amber-200  hover:bg-amber-300 flex items-center justify-center">
                                            <Briefcase className="w-12 h-12 text-[#1B4F72]/30  " />
                                        </div>
                                    </div>

                                    <div className="p-4 space-y-3">

                                        <div className="flex items-center justify-between">
                                            <span className="text-[11px] text-[#D35400] font-medium  px-2 py-1  ">
                                                {offre?.categorie?.nom_categorie}
                                            </span>
                                            <span className="text-[10px] text-gray-400 flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {offre.updated_at && new Date(offre.updated_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>

                                        <h2 className="text-[14px] font-bold text-gray-800 leading-snug line-clamp-2 group-hover:text-[#1B4F72] transition-colors">
                                            {offre.titre}
                                        </h2>



                                        <div className="space-y-1.5">
                                            <div className="flex items-center gap-2 text-[11px] text-gray-600">
                                                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                                                <span className="truncate">{offre.ville}, {offre.address}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-[11px] text-gray-600">
                                                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                                <span>{new Date(offre.preferred_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}</span>
                                            </div>
                                            <div>
                                                <span className="text-[10px] text-gray-400 mb-0.5">Budget</ span>
                                                <span className="text-[14px] font-bold text-[#D35400] pl-2">
                                                    {offre.budget_estime.toLocaleString()} -   <span className="text-[10px]">DH</span>
                                                </ span>
                                            </div>
                                        </div>



                                        <a
                                            href={`/offres/${offre.id}`}
                                            className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#1B4F72] hover:bg-[#D35400] text-white text-[12px] font-semibold   transition-colors mt-2"
                                        >
                                            <Eye className="w-4 h-4" />
                                            Voir le détail
                                            <ArrowRight className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ArtisanOffres;