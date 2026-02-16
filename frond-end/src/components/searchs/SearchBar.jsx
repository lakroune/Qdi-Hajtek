import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, X, SlidersHorizontal, Star, ChevronDown } from 'lucide-react';

const SearchBar = ({
    onSearch,
    categories = [],
    className = ''
}) => {
    const [query, setQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        category: '',
        minRating: '',
        maxPrice: '',
        distance: '',
        location: ''
    });
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setShowSuggestions(false);
                setShowFilters(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (query.length > 1) {
            // Simuler API suggestions
            const mockSuggestions = [
                'Plombier Casablanca',
                'Électricien Rabat'
            ].filter(s => s.toLowerCase().includes(query.toLowerCase()));
            setSuggestions(mockSuggestions);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    }, [query]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch?.({
            query,
            ...filters
        });
        setShowSuggestions(false);
    };

    const clearSearch = () => {
        setQuery('');
        setFilters({
            category: '',
            minRating: '',
            maxPrice: '',
            distance: '',
            location: ''
        });
    };

    const hasActiveFilters = Object.values(filters).some(v => v !== '');

    return (
        <div ref={containerRef} className={`w-full max-w-4xl mx-auto ${className}`}>
            <form onSubmit={handleSubmit} className="relative">
                <div className={`
                    relative flex items-center bg-white   overflow-hidden
                    ${showSuggestions || showFilters ? 'ring-2 ring-orange-500' : ''}
                    transition-all duration-200
                `}>
                    {/* Icône recherche */}
                    <div className="pl-6 pr-4">
                        <Search className="w-6 h-6 text-orange-600 text" />
                    </div>

                    {/* INPUT UNIQUE pour titre, artisan ou localisation */}
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => query.length > 1 && setShowSuggestions(true)}
                        placeholder="Rechercher par service, artisan ou localisation..."
                        className="flex-1 py-5 text-lg text-gray-900 placeholder-gray-500 focus:outline-none bg-transparent"
                    />

                    {/* Indicateur filtres actifs */}
                    {hasActiveFilters && (
                        <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm font-medium    mr-2">
                            {Object.values(filters).filter(v => v).length} filtre(s)
                        </span>
                    )}

                    {/* Bouton filtres */}
                    <button
                        type="button"
                        onClick={() => setShowFilters(!showFilters)}
                        className={`
                            px-6 py-5 flex items-center gap-2 font-medium transition-colors border-l border-gray-100
                            ${showFilters ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:text-orange-600 hover:bg-gray-50'}
                        `}
                    >
                        <SlidersHorizontal className="w-5 h-5" />
                        <span className="hidden sm:inline">Filtrer</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                    </button>



                    {/* Bouton effacer recherche */}
                    {query && (
                        <button
                            type="button"
                            onClick={clearSearch}
                            className="absolute right-57 top-1/2 -translate-y-1/2 p-2 text-red-400 hover:text-gray-600"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>

                {/* Suggestions */}
                {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white   border border-gray-100 overflow-hidden z-50">
                        <div className="px-4 py-2 bg-gray-50 text-xs font-medium text-gray-500 uppercase">
                            Suggestions
                        </div>
                        {suggestions.map((suggestion, idx) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => {
                                    setQuery(suggestion);
                                    setShowSuggestions(false);
                                }}
                                className="w-full px-5 py-3 text-left hover:bg-orange-50 flex items-center gap-3 text-gray-700 transition-colors"
                            >
                                <Search className="w-4 h-4 text-gray-400" />
                                {suggestion}
                            </button>
                        ))}
                    </div>
                )}

                {/* Panel Filtres */}
                {showFilters && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white    border border-gray-100 p-6 z-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                            {/* Filtre Catégorie */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Catégorie
                                </label>
                                <select
                                    value={filters.category}
                                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200  focus:outline-none focus:ring-2 focus:ring-orange-500"
                                >
                                    <option value="">Toutes les catégories</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}

                                </select>
                            </div>

                            {/* Filtre Évaluation */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Évaluation minimum
                                </label>
                                <div className="flex gap-2">
                                    {[5, 4, 3, 2].map((rating) => (
                                        <button
                                            key={rating}
                                            type="button"
                                            onClick={() => setFilters({ ...filters, minRating: filters.minRating === rating ? '' : rating })}
                                            className={`
                                                flex-1 py-2   text-sm font-medium transition-all
                                                ${filters.minRating === rating
                                                    ? 'bg-orange-600 text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                                            `}
                                        >
                                            {rating}★
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Filtre Prix */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Prix maximum
                                </label>
                                <select
                                    value={filters.maxPrice}
                                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200   focus:outline-none focus:ring-2 focus:ring-orange-500"
                                >
                                    <option value="">Tous les prix</option>
                                    <option value="200">Moins de 200 DH</option>
                                    <option value="500">Moins de 500 DH</option>
                                    <option value="1000">Moins de 1000 DH</option>
                                    <option value="2000">Moins de 2000 DH</option>
                                </select>
                            </div>

                            {/* Filtre Distance */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Distance
                                </label>
                                <select
                                    value={filters.distance}
                                    onChange={(e) => setFilters({ ...filters, distance: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200  focus:outline-none focus:ring-2 focus:ring-orange-500"
                                >
                                    <option value="">Peu importe</option>
                                    <option value="5">Moins de 5 km</option>
                                    <option value="10">Moins de 10 km</option>
                                    <option value="20">Moins de 20 km</option>
                                    <option value="50">Moins de 50 km</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}
            </form>

            {/* Affichage des filtres actifs */}
            {hasActiveFilters && (
                <div className="flex flex-wrap gap-2 mt-3">
                    {filters.category && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 text-sm  ">
                            {categories.find(c => c.id === filters.category)?.name || filters.category}
                            <button onClick={() => setFilters({ ...filters, category: '' })} className="hover:text-orange-900">
                                <X className="w-3 h-3" />
                            </button>
                        </span>
                    )}
                    {filters.minRating && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 text-sm  ">
                            {filters.minRating}+ étoiles
                            <button onClick={() => setFilters({ ...filters, minRating: '' })} className="hover:text-orange-900">
                                <X className="w-3 h-3" />
                            </button>
                        </span>
                    )}
                    {filters.maxPrice && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 text-sm  ">
                            Max {filters.maxPrice} DH
                            <button onClick={() => setFilters({ ...filters, maxPrice: '' })} className="hover:text-orange-900">
                                <X className="w-3 h-3" />
                            </button>
                        </span>
                    )}
                    {filters.distance && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 text-sm ">
                            &lt; {filters.distance} km
                            <button onClick={() => setFilters({ ...filters, distance: '' })} className="hover:text-orange-900">
                                <X className="w-3 h-3" />
                            </button>
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;