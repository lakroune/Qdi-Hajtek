import React, { useState, useEffect } from 'react';
import {
    Briefcase, MapPin, DollarSign, Calendar,
    Search, Star, User, X, ArrowRight, Loader2, Eye,
    Camera, Clock
} from 'lucide-react';

const ArtisanOffres = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [offres, setOffres] = useState([]);
    const [filteredOffres, setFilteredOffres] = useState([]);

    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');

    const categories = [
        { id: '', label: 'Toutes' },
        { id: 'plomberie', label: 'Plomberie' },
        { id: 'electricite', label: 'Électricité' },
        { id: 'menuiserie', label: 'Menuiserie' },
        { id: 'peinture', label: 'Peinture' },
        { id: 'climatisation', label: 'Climatisation' },
        { id: 'jardinage', label: 'Jardinage' },
        { id: 'maconnerie', label: 'Maçonnerie' },
        { id: 'serrurerie', label: 'Serrurerie' },
        { id: 'demenagement', label: 'Déménagement' },
        { id: 'menage', label: 'Ménage' }
    ];

    useEffect(() => {
        setTimeout(() => {
            const mockOffres = [
                {
                    id: 1,
                    title: "Réparation fuite d'eau urgente salle de bain",
                    category: "plomberie",
                    categoryLabel: "Plomberie",
                    description: "J'ai une fuite d'eau importante sous le lavabo...",
                    urgency: "urgent",
                    budgetMin: 300,
                    budgetMax: 600,
                    preferredDate: "2025-03-15",
                    location: "Casablanca",
                    address: "Maarif",
                    createdAt: "Il y a 2 heures",
                    client: { name: "Ahmed B.", rating: 4.8, jobs: 12 },
                    proposalsCount: 3,
                    hasPhoto: true
                },
                {
                    id: 2,
                    title: "Installation électrique complète appartement",
                    category: "electricite",
                    categoryLabel: "Électricité",
                    description: "Refaire l'installation électrique d'un appartement de 80m²...",
                    urgency: "planned",
                    budgetMin: 8000,
                    budgetMax: 12000,
                    preferredDate: "2025-04-01",
                    location: "Rabat",
                    address: "Agdal",
                    createdAt: "Il y a 5 heures",
                    client: { name: "Fatima Z.", rating: 4.9, jobs: 5 },
                    proposalsCount: 0,
                    hasPhoto: false
                },
                {
                    id: 3,
                    title: "Menuiserie: Porte sur mesure en bois massif",
                    category: "menuiserie",
                    categoryLabel: "Menuiserie",
                    description: "Besoin d'une porte en bois massif sur mesure...",
                    urgency: "standard",
                    budgetMin: 2500,
                    budgetMax: 4000,
                    preferredDate: "2025-03-20",
                    location: "Casablanca",
                    address: "Ain Diab",
                    createdAt: "Il y a 1 jour",
                    client: { name: "Karim M.", rating: 4.5, jobs: 8 },
                    proposalsCount: 1,
                    hasPhoto: true
                },
                {
                    id: 4,
                    title: "Peinture salon et chambre 40m²",
                    category: "peinture",
                    categoryLabel: "Peinture",
                    description: "Repeindre 2 pièces, environ 40m² au total...",
                    urgency: "standard",
                    budgetMin: 1500,
                    budgetMax: 2500,
                    preferredDate: "2025-03-25",
                    location: "Marrakech",
                    address: "Gueliz",
                    createdAt: "Il y a 1 jour",
                    client: { name: "Sara L.", rating: 4.7, jobs: 3 },
                    proposalsCount: 5,
                    hasPhoto: false
                },
                {
                    id: 5,
                    title: "Climatisation: Installation de 2 splits",
                    category: "climatisation",
                    categoryLabel: "Climatisation",
                    description: "Installation de 2 splits dans un salon et une chambre...",
                    urgency: "urgent",
                    budgetMin: 4000,
                    budgetMax: 6000,
                    preferredDate: "2025-03-16",
                    location: "Casablanca",
                    address: "Sidi Maarouf",
                    createdAt: "Il y a 3 heures",
                    client: { name: "Youssef A.", rating: 4.6, jobs: 15 },
                    proposalsCount: 0,
                    hasPhoto: true
                }
            ];
            setOffres(mockOffres);
            setFilteredOffres(mockOffres);
            setIsLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        let result = offres;

        if (search) {
            result = result.filter(o =>
                o.title.toLowerCase().includes(search.toLowerCase()) ||
                o.description.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (category) {
            result = result.filter(o => o.category === category);
        }

        setFilteredOffres(result);
    }, [search, category, offres]);

    const clearFilters = () => {
        setSearch('');
        setCategory('');
    };

    const getUrgencyConfig = (urgency) => {
        const configs = {
            urgent: {
                label: 'Urgent',
                color: 'bg-red-500 text-white',
                lightColor: 'bg-red-50 text-red-600 border-red-200'
            },
            standard: {
                label: 'Standard',
                color: 'bg-blue-500 text-white',
                lightColor: 'bg-blue-50 text-blue-600 border-blue-200'
            },
            planned: {
                label: 'Planifié',
                color: 'bg-gray-500 text-white',
                lightColor: 'bg-gray-100 text-gray-600 border-gray-200'
            }
        };
        return configs[urgency] || configs.planned;
    };

    const hasFilters = search || category;

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
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="px-3 py-2 text-[12px] bg-gray-50 border border-gray-200   focus:border-[#D35400] focus:outline-none focus:ring-2 focus:ring-[#D35400]/20 w-36"
                        >
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.label}</option>
                            ))}
                        </select>

                        {hasFilters && (
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

            <div className="w-[90%] mx-auto px-4 py-6">

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-10 h-10 text-[#1B4F72] animate-spin mb-3" />
                        <p className="text-[12px] text-gray-500">Chargement des offres...</p>
                    </div>
                ) : filteredOffres.length === 0 ? (
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredOffres.map((offre) => {
                            const urgency = getUrgencyConfig(offre.urgency);
                            return (
                                <div
                                    key={offre.id}
                                    className="bg-white     hover:  border border-gray-100 transition-all duration-300 overflow-hidden group"
                                >
                                    <div className="relative">
                                        <div className={`absolute top-3 left-3 px-2.5 py-1   text-[10px] font-bold uppercase tracking-wide ${urgency.color}`}>
                                            {urgency.label}
                                        </div>

                                        <div className="h-24 bg-gradient-to-br from-[#1B4F72]/10 to-[#D35400]/10 flex items-center justify-center">
                                            <Briefcase className="w-12 h-12 text-[#1B4F72]/30" />
                                        </div>
                                    </div>

                                    <div className="p-4 space-y-3">

                                        <div className="flex items-center justify-between">
                                            <span className="text-[11px] text-[#D35400] font-medium bg-orange-50 px-2 py-1  ">
                                                {offre.categoryLabel}
                                            </span>
                                            <span className="text-[10px] text-gray-400 flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {offre.createdAt}
                                            </span>
                                        </div>

                                        <h2 className="text-[14px] font-bold text-gray-800 leading-snug line-clamp-2 group-hover:text-[#1B4F72] transition-colors">
                                            {offre.title}
                                        </h2>



                                        <div className="space-y-1.5">
                                            <div className="flex items-center gap-2 text-[11px] text-gray-600">
                                                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                                                <span className="truncate">{offre.location}, {offre.address}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-[11px] text-gray-600">
                                                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                                <span>{new Date(offre.preferredDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}</span>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-gray-400 mb-0.5">Budget</p>
                                                <p className="text-[14px] font-bold text-[#D35400]">
                                                    {offre.budgetMin.toLocaleString()} - {offre.budgetMax.toLocaleString()} <span className="text-[10px]">DH</span>
                                                </p>
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