import React, { useState, useEffect, useRef } from 'react';
import {
    Briefcase, MapPin, DollarSign, Calendar,
    Search, X, ArrowRight, Eye, Clock, Loader2
} from 'lucide-react';
import axiosClient from '../api/axios-client';

const ArtisanOffres = () => {
    const [offres, setOffres] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [search, setSearch] = useState('');
    const [filterByCategorie, setFilterByCategorie] = useState('');
    const loaderRef = useRef(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axiosClient.get('/categories');
                setCategories(response.data.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        setOffres([]);
        setCurrentPage(1);
        setHasMore(true);
    }, [search, filterByCategorie]);

    useEffect(() => {
        const fetchOffres = async () => {
            if (isLoading) return;
            setIsLoading(true);
            try {
                const response = await axiosClient.get('/offres', {
                    params: {
                        page: currentPage,
                        search: search || undefined,
                        categorie: filterByCategorie || undefined,
                    }
                });

                const newData = response.data.data;
                const meta = response.data.meta;

                setOffres(prev => currentPage === 1 ? newData : [...prev, ...newData]);

                if (!newData.length || currentPage >= meta.last_page) {
                    setHasMore(false);
                }
            } catch (error) {
                console.error('Error fetching offres:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOffres();
    }, [currentPage, search, filterByCategorie]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore && !isLoading) {
                setCurrentPage(prev => prev + 1);
            }
        }, { threshold: 0.1 });

        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => {
            if (loaderRef.current) observer.unobserve(loaderRef.current);
        };
    }, [hasMore, isLoading]);

    const clearFilters = () => {
        setSearch('');
        setFilterByCategorie('');
    };

    const badgeUrgence = (name) => {
        const tableUrgence = {
            urgent: { titre: 'Urgent', color: 'bg-red-500 text-white' },
            moyen: { titre: 'Standard', color: 'bg-blue-500 text-white' },
            faible: { titre: 'Planifié', color: 'bg-gray-500 text-white' },
        };
        return tableUrgence[name] || { titre: name, color: 'bg-gray-400 text-white' };
    };

    const SkeletonGrid = () => (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-pulse">
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white border border-gray-100 overflow-hidden">
                    <div className="h-16 bg-gray-200" />
                    <div className="p-4 space-y-3">
                        <div className="h-3 bg-gray-200 rounded w-1/2" />
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                        <div className="h-3 bg-gray-200 rounded w-full" />
                        <div className="h-3 bg-gray-200 rounded w-2/3" />
                        <div className="h-8 bg-gray-200 rounded w-full mt-2" />
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100 mt-20 pb-8">

            <div className="bg-white sticky top-0 z-10 border-b border-gray-100">
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
                                className="w-full pl-10 pr-4 py-2 text-[12px] bg-gray-50 border border-gray-200 focus:border-[#D35400] focus:outline-none focus:ring-2 focus:ring-[#D35400]/20 transition-all"
                            />
                        </div>

                        <select
                            value={filterByCategorie}
                            onChange={(e) => setFilterByCategorie(e.target.value)}
                            className="px-3 py-2 text-[12px] bg-gray-50 border border-gray-200 focus:border-[#D35400] focus:outline-none focus:ring-2 focus:ring-[#D35400]/20 w-36"
                        >
                            <option value="">Toutes</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.nom_categorie}</option>
                            ))}
                        </select>

                        {(search || filterByCategorie) && (
                            <button
                                onClick={clearFilters}
                                className="px-3 py-2 bg-gray-100 hover:bg-red-50 text-gray-500 hover:text-red-500 transition-colors"
                                title="Réinitialiser"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="w-full mx-auto px-4 py-6">
                {isLoading && currentPage === 1 ? (
                    <SkeletonGrid />
                ) : offres.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 flex items-center justify-center mx-auto mb-4">
                            <Briefcase className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-[16px] font-bold text-[#1B4F72] mb-2">Aucune offre trouvée</h3>
                        <p className="text-[12px] text-gray-500 mb-4">Essayez de modifier vos critères de recherche</p>
                        <button
                            onClick={clearFilters}
                            className="px-6 py-2.5 bg-[#1B4F72] hover:bg-[#D35400] text-white text-[12px] font-medium transition-colors"
                        >
                            Voir toutes les offres
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {offres.map((offre) => {
                                const urgency = badgeUrgence(offre?.urgence);
                                return (
                                    <div
                                        key={offre.id}
                                        className="bg-white border border-gray-100 transition-all duration-300 overflow-hidden group"
                                    >
                                        <div className="relative">
                                            <div className={`absolute top-3 left-3 px-2.5 py-1 ${urgency.color} text-[10px] font-bold uppercase tracking-wide z-10`}>
                                                {urgency.titre}
                                            </div>
                                            <div className="h-16 bg-amber-100 flex items-center justify-center">
                                                <Briefcase className="w-12 h-12 text-[#1B4F72]/30" />
                                            </div>
                                        </div>

                                        <div className="p-4 space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[11px] text-[#D35400] font-medium">
                                                    {offre?.categorie?.nom}
                                                </span>
                                                <span className="text-[10px] text-gray-400 flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {offre.cree_le}
                                                </span>
                                            </div>

                                            <h2 className="text-[14px] font-bold text-gray-800 leading-snug line-clamp-2 group-hover:text-[#1B4F72] transition-colors">
                                                {offre.titre}
                                            </h2>

                                            <div className="space-y-1.5">
                                                <div className="flex items-center gap-2 text-[11px] text-gray-600">
                                                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                                                    <span className="truncate">{offre.ville}, {offre.adresse}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-[11px] text-gray-600">
                                                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                                    <span>{new Date(offre.date_preferee).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span className="text-[10px] text-gray-400">Budget</span>
                                                    <span className="text-[14px] font-bold text-[#D35400] pl-1">
                                                        {offre.budget?.toLocaleString()}
                                                        <span className="text-[10px] font-normal"> DH</span>
                                                    </span>
                                                </div>
                                            </div>


                                            <a href={`/offres/${offre.id}`}
                                                className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#1B4F72] hover:bg-[#D35400] text-white text-[12px] font-semibold transition-colors mt-2"
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

                        <div ref={loaderRef} className="h-10 w-full flex justify-center items-center mt-4">
                            {isLoading && hasMore && offres.length > 0 && (
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500" />
                            )}
                            {!hasMore && offres.length > 0 && (
                                <p className="text-gray-400 text-[11px] italic">
                                    Vous avez atteint la fin de la liste.
                                </p>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ArtisanOffres;