import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axios-client.js';
import { SearchIcon, SlidersHorizontal, MapPin, Currency, DollarSign, StarIcon } from 'lucide-react';

const HomePage = () => {
    const [categories, setCategories] = useState([]);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);

    // State للبحث
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axiosClient.get('/categories');
                // نأخذ المصفوفة سواء كانت مباشرة أو داخل مفتاح data
                setCategories(response.data.data || response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleSearch = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        try {
            const response = await axiosClient.get('/services/search', {
                params: {
                    query: searchQuery,
                    category_id: selectedCategory,
                }
            });
            setServices(response.data.data || response.data);
        } catch (error) {
            console.error('Error searching services:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-[#1b4f7296] pt-20 pb-12 overflow-hidden">
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `url(/images/d.png)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                ></div>

                <div className="relative max-w-6xl mx-auto px-4 text-center">
                    <h1 className="text-[24px] md:text-[28px] lg:text-[32px] font-bold text-white mb-3 leading-tight">
                        Trouvez le meilleur artisan<br />
                        <span className="text-[#D35400]">près de chez vous</span>
                    </h1>

                    <p className="text-[11px] text-gray-200 mb-8 max-w-xl font-bold mx-auto leading-relaxed">
                        Des professionnels vérifiés pour tous vos travaux. Devis gratuit, intervention rapide.
                    </p>

                    {/* Simple Search Bar Structure */}
                    <form onSubmit={handleSearch} className="flex flex-col gap-3 max-w-2xl mx-auto">
                        <div className='flex items-center gap-2 w-full md:w-3/4 mx-auto border border-amber-50/30 bg-white/10 backdrop-blur-sm rounded-sm px-3'>
                            <SearchIcon className='text-amber-50 w-4 h-4' />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Que cherchez-vous ?"
                                className='w-full py-2.5 bg-transparent focus:outline-none text-[12px] text-white placeholder:text-gray-300'
                            />
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-4 gap-3'>
                            <div className='flex items-center gap-2 w-full md:w-3/4 mx-auto'>
                                <div className='flex-1 flex items-center gap-2 border border-amber-50/30 bg-white/10 backdrop-blur-sm px-3 rounded-sm'>
                                    <SlidersHorizontal className='text-amber-50 w-4 h-4' />
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className='w-full py-2 bg-transparent focus:outline-none text-[11px] text-white appearance-none cursor-pointer'
                                    >
                                        <option value="" className='text-black'>Toutes les catégories</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id} className='text-black uppercase'>
                                                {cat.nom_categorie || cat.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            {/* etoiles */}
                            <div className='flex items-center gap-2 w-full md:w-3/4 mx-auto'>
                                <div className='flex-1 flex items-center gap-2 border border-amber-50/30 bg-white/10 backdrop-blur-sm px-3 rounded-sm'>
                                    <StarIcon className='text-amber-50 w-4 h-4' />
                                    <select
                                        className='w-full py-2 bg-transparent focus:outline-none text-[11px] text-white appearance-none cursor-pointer'
                                    >
                                        <option value="" className='text-black'>Toutes les notes</option>
                                        <option value="1" className='text-black'>1 etoile</option>
                                        <option value="2" className='text-black'>2 etoiles</option>
                                        <option value="3" className='text-black'>3 etoiles</option>
                                        <option value="4" className='text-black'>4 etoiles</option>
                                        <option value="5" className='text-black'>5 etoiles</option>
                                    </select>
                                </div>
                            </div>
                            <div className='flex items-center gap-2 w-full md:w-3/4 mx-auto'>
                                <div className='flex-1 flex items-center gap-2 border border-amber-50/30 bg-white/10 backdrop-blur-sm px-3 rounded-sm'>
                                    <DollarSign className='text-amber-50 w-4 h-4' />
                                    <select
                                        className='w-full py-2 bg-transparent focus:outline-none text-[11px] text-white appearance-none cursor-pointer'
                                    >
                                        <option value="" className='text-black'>Tous les prix</option>
                                        <option value="100" className='text-black'>100 DH et moins</option>
                                        <option value="200" className='text-black'>200 DH et moins</option>
                                        <option value="300" className='text-black'>300 DH et moins</option>
                                        <option value="400" className='text-black'>400 DH et moins</option>
                                        <option value="500" className='text-black'>500 DH et moins</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </section>

            {/* Results Display */}
            <main className="max-w-6xl mx-auto px-4 py-12">
                {loading ? (
                    <div className="text-center text-[#1B4F72] text-[12px] animate-pulse">Recherche des artisans...</div>
                ) : services.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {services.map((service) => (
                            <div key={service.id} className="bg-white p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="font-bold text-[#1B4F72] text-[13px] uppercase tracking-wide">{service.titre}</h3>
                                    <span className="bg-orange-50 text-[#D35400] px-2 py-1 text-[10px] font-bold">{service.prix} DH</span>
                                </div>
                                <p className="text-gray-500 text-[11px] mb-4 line-clamp-2 leading-relaxed">{service.description}</p>
                                <div className="flex items-center gap-1 text-gray-400 text-[10px] mb-4">
                                    <MapPin className="w-3 h-3" />
                                    <span>Safi, Maroc</span>
                                </div>
                                <button className="w-full border border-[#1B4F72] text-[#1B4F72] py-2 text-[10px] font-bold hover:bg-[#1B4F72] hover:text-white transition-colors">
                                    DÉTAILS DU SERVICE
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    searchQuery && !loading && (
                        <div className="text-center py-10 border border-dashed border-gray-200 rounded-lg">
                            <p className="text-gray-400 text-[11px]">Aucun artisan trouvé pour "{searchQuery}".</p>
                        </div>
                    )
                )}
            </main>
        </div>
    );
};

export default HomePage;