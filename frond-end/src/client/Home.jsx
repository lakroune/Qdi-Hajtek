import React, { useEffect, useRef, useState } from 'react';
import axiosClient from '../api/axios-client.js';
import {
    SearchIcon,
    SlidersHorizontal,
    MapPin,
    DollarSign,
    StarIcon, Star, Heart,
    BadgeX,
} from 'lucide-react';

const HomePage = () => {
    const [categories, setCategories] = useState([]);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [favs, setFavs] = useState([1, 3]);
    const [selectedRating, setSelectedRating] = useState(0);
    const [selectedPrice, setSelectedPrice] = useState(0);
    const [nextpage, setNextPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const loaderRef = useRef(null);

    const searchServices = async (isNewSearch = false) => {
        setLoading(true);
        const pageToFetch = isNewSearch ? 1 : nextpage;

        try {
            const response = await axiosClient.get('/services', {
                params: {
                    search: searchQuery || undefined,
                    category: selectedCategory || undefined,
                    rating: selectedRating > 0 ? selectedRating : undefined,
                    price: selectedPrice > 0 ? selectedPrice : undefined,
                    page: pageToFetch
                }
            });

            // Nouvelle structure : data.data[] + meta
            const newItems = response.data.data;
            const meta = response.data.meta;

            if (isNewSearch) {
                setServices(newItems);
                setNextPage(2);
            } else {
                setServices((prev) => [...prev, ...newItems]);
                setNextPage(meta.current_page + 1);
            }

            setHasMore(meta.current_page < meta.last_page);

        } catch (error) {
            console.error('Error fetching services:', error);
            if (isNewSearch) setServices([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            searchServices(true);
        }, 400);
        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery, selectedCategory, selectedRating, selectedPrice]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axiosClient.get('/categories');
                setCategories(response.data.data || response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        if (!hasMore || loading) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                searchServices(false);
            }
        }, { threshold: 0.1 });

        if (loaderRef.current) observer.observe(loaderRef.current);

        return () => {
            if (loaderRef.current) observer.unobserve(loaderRef.current);
        };
    }, [hasMore, loading]);

    const handleSearch = (e) => {
        e.preventDefault();
    };

    const favorieService = (id) => {
        const response = axiosClient.post(`/services/${id}/favorie`);
        console.log(response);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <section className="relative bg-[#1b4f7296] pt-20 pb-12 overflow-hidden overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `url(/images/d.png)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                />

                <div className="relative max-w-6xl mx-auto px-4 text-center">
                    <h1 className="text-[24px] md:text-[28px] lg:text-[32px] font-bold text-white mb-3">
                        Trouvez le meilleur artisan <br />
                        <span className="text-[#D35400]">près de chez vous</span>
                    </h1>

                    <p className="text-[11px] text-gray-200 mb-8 max-w-xl font-bold mx-auto">
                        Des professionnels vérifiés pour tous vos travaux.
                    </p>

                    <form onSubmit={handleSearch} className="flex flex-col gap-3 max-w-2xl mx-auto">
                        <div className="flex items-center gap-2 w-full md:w-3/4 mx-auto border border-amber-50/30 bg-white/10 backdrop-blur-sm px-3">
                            <SearchIcon className="text-amber-50 w-4 h-4" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Que cherchez-vous ?"
                                className="w-full py-2.5 bg-transparent focus:outline-none text-[12px] text-white placeholder:text-gray-300"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            <div className="flex items-center gap-2 border border-amber-50/30 bg-white/10 px-3">
                                <SlidersHorizontal className="text-amber-50 w-4 h-4" />
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full outline-none py-2 bg-transparent text-[11px] text-white appearance-none"
                                >
                                    <option value="" className="text-black">Toutes les catégories</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id} className="text-black uppercase">
                                            {cat.nom_categorie || cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex items-center gap-2 border border-amber-50/30 bg-white/10 px-3">
                                <StarIcon className="text-amber-50 w-4 h-4" />
                                <select
                                    className="w-full outline-none py-2 bg-transparent text-[11px] text-white appearance-none"
                                    value={selectedRating}
                                    onChange={(e) => setSelectedRating(e.target.value)}
                                >
                                    <option value="0">Toutes les notes</option>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <option key={star} value={star}>{star} stars et plus</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex items-center gap-2 border border-amber-50/30 bg-white/10 px-3">
                                <DollarSign className="text-amber-50 w-4 h-4" />
                                <select
                                    className="w-full py-2 bg-transparent text-[11px] text-white appearance-none outline-none"
                                    value={selectedPrice}
                                    onChange={(e) => setSelectedPrice(e.target.value)}
                                >
                                    <option value="0">Tous les prix</option>
                                    {[200, 500, 1000, 2000].map((price) => (
                                        <option key={price} value={price}>{price} DH et moins</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
            </section>

            <main className="max-w-6xl mx-auto py-6 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <div className="w-full mx-auto px-4 py-6">
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {services.map(service => (
                            <div key={service.id} className="bg-white border border-gray-200 overflow-hidden hover:border-[#1B4F72] transition-all group">

                                <div className="relative h-40 bg-gray-100">
                                    <img
                                        src={
                                            service.images?.length > 0
                                                ? service.images[0].url
                                                : 'https://via.placeholder.com/400x300?text=No+Image'
                                        }
                                        alt={service.titre}
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        onClick={() => favorieService(service.id)}
                                        className={`absolute top-2 right-2 w-8 h-8 flex items-center justify-center transition-colors ${favs.includes(service.id) ? 'bg-[#D35400] text-white' : 'bg-white/90 text-gray-400 hover:text-[#D35400]'}`}
                                    >
                                        <Heart className={`w-4 h-4 ${favs.includes(service.id) ? 'fill-current' : ''}`} />
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
                                        <div className="w-7 h-7 bg-[#1B4F72] flex items-center justify-center text-white text-[10px] font-bold uppercase overflow-hidden">
                                            {/* Pas d'avatar dans la nouvelle structure, on affiche les initiales */}
                                            <span>
                                                {service.artisan?.user?.firstname?.charAt(0)}
                                                {service.artisan?.user?.lastname?.charAt(0)}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[12px] text-gray-700 truncate">
                                                {service.artisan?.user?.firstname} {service.artisan?.user?.lastname}
                                            </p>
                                            <div className="flex items-center gap-1">
                                                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                                <span className="text-[11px] text-gray-500">{service.artisan?.note}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1 text-[11px] text-gray-500 mb-3">
                                        <MapPin className="w-3 h-3" /> {service.artisan?.user?.city}
                                    </div>

                                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                        <div>
                                            <p className="text-[10px] text-gray-400">
                                                {service.type_tarif === 'prix_fixe' ? 'Prix fixe' : 'À partir de'}
                                            </p>
                                            <p className="text-[16px] font-bold text-[#D35400]">{service.tarif} DH</p>
                                        </div>

                                        <a
                                            href={`/services/${service.id}`}
                                            className="px-3 py-2 bg-[#1B4F72] hover:bg-[#D35400] text-white text-[11px] font-medium transition-colors"
                                        >
                                            Voir
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {
                    services.length === 0 && loading && (
                        <div className="text-center text-[#1B4F72] text-[12px] animate-pulse">
                            <div className="flex justify-center mb-4 text-gray-300">
                                <BadgeX className="w-12 h-12 text-[#94a8b6] animate-spin" />
                            </div>
                            <p className="text-gray-500 text-[14px]">Chargement en cours...</p>
                        </div>
                    )
                }

                {
                    services.length === 0 && !loading && (
                        <div className="text-center">
                            <div className="flex justify-center mb-4 text-gray-300">
                                <BadgeX className="w-12 h-12 text-[#94a8b6] animate-bounce" />
                            </div>
                            <p className="text-gray-500 text-[14px]">Aucun resultat pour votre recherche</p>
                        </div>
                    )
                }

                <div ref={loaderRef} className="h-10 w-full flex justify-center items-center mt-4">
                    {loading && hasMore && services.length > 0 && (
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-[12px] text-gray-500">Chargement de la suite...</p>
                        </div>
                    )}
                    {!hasMore && services.length > 0 && (
                        <p className="text-gray-400 text-[11px] italic">
                            Vous avez atteint la fin de la liste.
                        </p>
                    )}
                </div>
            </main >
        </div >
    );
};

export default HomePage;