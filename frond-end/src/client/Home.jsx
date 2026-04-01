import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axios-client.js';
import {
    SearchIcon,
    SlidersHorizontal,
    MapPin,
    DollarSign,
    StarIcon,Star, Heart,
} from 'lucide-react';

const HomePage = () => {
    const [categories, setCategories] = useState([]);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

 
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

 
    const searchServices = async (query, category = '') => {
        if (!query) {
            setServices([]);
            return;
        }

        setLoading(true);
        try {
            const response = await axiosClient.get('/services', {
                params: {
                    search: query,
                    category: category || undefined
                }
            });

            setServices(response.data.data || response.data);
        } catch (error) {
            console.error('Error fetching services:', error);
            setServices([]);
        } finally {
            setLoading(false);
        }
    };

   
    const handleSearch = (e) => {
        e.preventDefault();
        searchServices(searchQuery, selectedCategory);
    };

    const [favs, setFavs] = useState([1, 3]);
    const [isloading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axiosClient.get('/services');
                setServices(response.data.data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
            finally {
                setIsLoading(false);
            }
        }
        fetchServices();
    }, []);

    const toggleFav = (id) => {
        setFavs(favs.includes(id) ? favs.filter(f => f !== id) : [...favs, id]);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <section className="relative bg-[#1b4f7296] pt-20 pb-12 overflow-hidden">
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
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    searchServices(e.target.value, selectedCategory);
                                }}
                                placeholder="Que cherchez-vous ?"
                                className="w-full py-2.5 bg-transparent focus:outline-none text-[12px] text-white placeholder:text-gray-300"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            <div className="flex items-center gap-2 border border-amber-50/30 bg-white/10 px-3">
                                <SlidersHorizontal className="text-amber-50 w-4 h-4" />
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => {
                                        setSelectedCategory(e.target.value);
                                        searchServices(searchQuery, e.target.value);
                                    }}
                                    className="w-full py-2 bg-transparent text-[11px] text-white appearance-none"
                                >
                                    <option value="" className="text-black">
                                        Toutes les catégories
                                    </option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id} className="text-black uppercase">
                                            {cat.nom_categorie || cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex items-center gap-2 border border-amber-50/30 bg-white/10 px-3">
                                <StarIcon className="text-amber-50 w-4 h-4" />
                                <select className="w-full py-2 bg-transparent text-[11px] text-white appearance-none">
                                    <option className="text-black">Toutes les notes</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-2 border border-amber-50/30 bg-white/10 px-3">
                                <DollarSign className="text-amber-50 w-4 h-4" />
                                <select className="w-full py-2 bg-transparent text-[11px] text-white appearance-none">
                                    <option className="text-black">Tous les prix</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
            </section>

            <main className="max-w-6xl mx-auto px-4 py-12">
                {loading ? (
                    <div className="text-center text-[#1B4F72] text-[12px] animate-pulse">
                        Recherche des artisans...
                    </div>
                ) : services.length > 0 ? (
                 
                ) : (
                    searchQuery && (
                        <div className="text-center py-10 border border-dashed rounded-lg">
                            <p className="text-gray-400 text-[11px]">
                                Aucun artisan trouvé pour "{searchQuery}"
                            </p>
                        </div>
                    )
                )}
            </main>
        </div>
    );
};

export default HomePage;