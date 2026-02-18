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
            const mockSuggestions = [
                'Plombier Casablanca',
                'Électricien Rabat',
                'Menuisier Marrakech',
                'Peintre Tanger'
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

    const updateFilter = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div ref={containerRef} className={`w-full max-w-4xl mx-auto ${className}`}>
            <form onSubmit={handleSubmit} className="relative">
                <div className={`
                    relative flex items-center bg-white border border-gray-200 overflow-hidden
                    ${showSuggestions || showFilters ? 'border-[#D35400]' : 'hover:border-[#1B4F72]'}
                    transition-colors duration-200
                `}>
                    {/* Icône recherche */}
                    <div className="pl-4 pr-3">
                        <Search className="w-5 h-5 text-[#1B4F72]" />
                    </div>

                    {/* INPUT */}
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => query.length > 1 && setShowSuggestions(true)}
                        placeholder="Rechercher par service, artisan ou localisation..."
                        className="flex-1 py-3.5 text-[12px] text-[#1B4F72] placeholder-gray-400 focus:outline-none bg-transparent"
                    />

                    {/* Indicateur filtres actifs */}
                    {hasActiveFilters && (
                        <span className="px-2 py-1 bg-[#D35400]/10 text-[#D35400] text-[10px] font-medium mr-2">
                            {Object.values(filters).filter(v => v).length}
                        </span>
                    )}

                    {/* Bouton effacer */}
                    {query && (
                        <button
                            type="button"
                            onClick={clearSearch}
                            className="p-2 mr-1 text-gray-400 hover:text-[#D35400] transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}

                    {/* Bouton filtres */}
                    <button
                        type="button"
                        onClick={() => setShowFilters(!showFilters)}
                        className={`
                            px-4 py-3.5 flex items-center gap-2 text-[11px] font-medium transition-colors border-l border-gray-200
                            ${showFilters ? 'bg-[#D35400]/10 text-[#D35400]' : 'text-gray-600 hover:text-[#1B4F72] hover:bg-gray-50'}
                        `}
                    >
                        <SlidersHorizontal className="w-4 h-4" />
                        <span className="hidden sm:inline">Filtrer</span>
                        <ChevronDown className={`w-3 h-3 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                    </button>
                </div>

                {/* Suggestions */}
                {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 overflow-hidden z-50">
                        <div className="px-3 py-2 bg-gray-50 text-[10px] font-medium text-gray-500 uppercase">
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
                                className="w-full px-4 py-2.5 text-left hover:bg-[#D35400]/5 flex items-center gap-2 text-[11px] text-[#1B4F72] transition-colors"
                            >
                                <Search className="w-3.5 h-3.5 text-gray-400" />
                                {suggestion}
                            </button>
                        ))}
                    </div>
                )}

                {/* Panel Filtres */}
                {showFilters && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 p-4 z-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                            {/* Filtre Catégorie */}
                            <div>
                                <label className="block text-[11px] font-medium text-[#1B4F72] mb-1.5">
                                    Catégorie
                                </label>
                                <select
                                    value={filters.category}
                                    onChange={(e) => updateFilter('category', e.target.value)}
                                    className="w-full px-3 py-2 text-[11px] border border-gray-200 focus:border-[#D35400] focus:outline-none bg-white"
                                >
                                    <option value="">Toutes</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Filtre Évaluation */}
                            <div>
                                <label className="block text-[11px] font-medium text-[#1B4F72] mb-1.5">
                                    Évaluation min
                                </label>
                                <div className="flex gap-1">
                                    {[5, 4, 3, 2].map((rating) => (
                                        <button
                                            key={rating}
                                            type="button"
                                            onClick={() => updateFilter('minRating', filters.minRating === rating ? '' : rating)}
                                            className={`
                                                flex-1 py-1.5 text-[10px] font-medium transition-colors border
                                                ${filters.minRating === rating
                                                    ? 'bg-[#D35400] text-white border-[#D35400]'
                                                    : 'bg-white text-gray-600 border-gray-200 hover:border-[#1B4F72]'}
                                            `}
                                        >
                                            {rating}★
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Filtre Prix */}
                            <div>
                                <label className="block text-[11px] font-medium text-[#1B4F72] mb-1.5">
                                    Prix max
                                </label>
                                <select
                                    value={filters.maxPrice}
                                    onChange={(e) => updateFilter('maxPrice', e.target.value)}
                                    className="w-full px-3 py-2 text-[11px] border border-gray-200 focus:border-[#D35400] focus:outline-none bg-white"
                                >
                                    <option value="">Tous</option>
                                    <option value="200">&lt; 200 DH</option>
                                    <option value="500">&lt; 500 DH</option>
                                    <option value="1000">&lt; 1000 DH</option>
                                    <option value="2000">&lt; 2000 DH</option>
                                </select>
                            </div>

                            {/* Filtre Distance */}
                            <div>
                                <label className="block text-[11px] font-medium text-[#1B4F72] mb-1.5">
                                    Distance
                                </label>
                                <select
                                    value={filters.distance}
                                    onChange={(e) => updateFilter('distance', e.target.value)}
                                    className="w-full px-3 py-2 text-[11px] border border-gray-200 focus:border-[#D35400] focus:outline-none bg-white"
                                >
                                    <option value="">Peu importe</option>
                                    <option value="5">&lt; 5 km</option>
                                    <option value="10">&lt; 10 km</option>
                                    <option value="20">&lt; 20 km</option>
                                    <option value="50">&lt; 50 km</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}
            </form>

            {/* Tags des filtres actifs */}
            {hasActiveFilters && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {filters.category && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#1B4F72]/10 text-[#1B4F72] text-[10px]">
                            {categories.find(c => c.id === filters.category)?.name}
                            <button onClick={() => updateFilter('category', '')} className="hover:text-[#D35400]">
                                <X className="w-3 h-3" />
                            </button>
                        </span>
                    )}
                    {filters.minRating && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#1B4F72]/10 text-[#1B4F72] text-[10px]">
                            {filters.minRating}+ ★
                            <button onClick={() => updateFilter('minRating', '')} className="hover:text-[#D35400]">
                                <X className="w-3 h-3" />
                            </button>
                        </span>
                    )}
                    {filters.maxPrice && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#1B4F72]/10 text-[#1B4F72] text-[10px]">
                            Max {filters.maxPrice} DH
                            <button onClick={() => updateFilter('maxPrice', '')} className="hover:text-[#D35400]">
                                <X className="w-3 h-3" />
                            </button>
                        </span>
                    )}
                    {filters.distance && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#1B4F72]/10 text-[#1B4F72] text-[10px]">
                            &lt; {filters.distance} km
                            <button onClick={() => updateFilter('distance', '')} className="hover:text-[#D35400]">
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