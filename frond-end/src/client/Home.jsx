import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Paintbrush, Zap,
    Droplets,
} from 'lucide-react';
import Header from '../components/Header/Header';
import CardService from '../components/cards/CardService';
import Footer from '../components/footer/Footer';
import SearchBar from '../components/searchs/SearchBar';
import HeroSection from '../components/hero/HeroSection.jsx';
import CategoriesSection from '../components/cards/CategoriesSection.jsx';

const HomePage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [location, setLocation] = useState('');
    const [filters, setFilters] = useState({});
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = (params) => {
        console.log('Recherche:', params);

        // Appel API 

    };

    // Categories
    const categories = [
        { id: 'plomberie', name: 'Plomberie', icon: Droplets, color: 'bg-blue-500' },
        { id: 'electricite', name: 'Électricité', icon: Zap, color: 'bg-yellow-500' },
        { id: 'peinture', name: 'Peinture', icon: Paintbrush, color: 'bg-red-500' },
       
    ];

    // Services les plus populaires
    const topServices = [
        {
            id: 1,
            title: 'Réparation fuite d\'eau',
            artisan: 'Ahmed Benali',
            rating: 4.9,
            reviews: 128,
            price: '150 DH',
            image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=800',
            category: 'plomberie',
            location: 'Casablanca',
            urgent: true
        },
        {
            id: 2,
            title: 'Installation électrique complète',
            artisan: 'Karim Fassi',
            rating: 4.8,
            reviews: 96,
            price: '800 DH',
            image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800',
            category: 'electricite',
            location: 'Rabat',
            urgent: false
        },
        {
            id: 3,
            title: 'Fabrication meuble sur mesure',
            artisan: 'Youssef Amrani',
            rating: 5.0,
            reviews: 74,
            price: '2500 DH',
            image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800',
            category: 'menuiserie',
            location: 'Marrakech',
            urgent: false
        },
        {
            id: 4,
            title: 'Peinture intérieure appartement',
            artisan: 'Hassan Moussaoui',
            rating: 4.7,
            reviews: 203,
            price: '1200 DH',
            image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800',
            category: 'peinture',
            location: 'Tanger',
            urgent: true
        },
        {
            id: 5,
            title: 'Installation climatisation split',
            artisan: 'Omar Idrissi',
            rating: 4.9,
            reviews: 156,
            price: '600 DH',
            image: 'https://images.unsplash.com/photo-1631545729918-46c9d54e4139?auto=format&fit=crop&q=80&w=800',
            category: 'climatisation',
            location: 'Agadir',
            urgent: false
        },
        {
            id: 6,
            title: 'Réparation voiture à domicile',
            artisan: 'Mehdi Tazi',
            rating: 4.6,
            reviews: 89,
            price: '300 DH',
            image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=800',
            category: 'automobile',
            location: 'Fès',
            urgent: true
        }
    ];

    const topArtisans = [
        {
            id: 1,
            name: 'Ahmed Benali',
            specialty: 'Plombier expert',
            rating: 4.9,
            reviews: 328,
            completedJobs: 450,
            image: 'https://images.unsplash.com/photo-1540561214051-51846b70124a?auto=format&fit=crop&q=80&w=400',
            location: 'Casablanca',
            verified: true,
            services: ['Réparation fuite', 'Installation sanitaire', 'Débouchage'],
            badges: ['Top Rated', 'Urgence 24/7']
        }
    ];


    return (
        <div className="min-h-screen bg-gray-50" style={{ backgroundImage: "url('/images/hero-x.webp')", backgroundSize: '8%' }}>
            <Header isAuthenticated={true} userType="client" userName="Ahmed" notifications={9} />
            {/* Hero Section */}
            <HeroSection
                variant="default"
                onSearch={handleSearch}
                categories={categories}
                showSearch={true}
                backgroundImage="/images/d.png"
            />
            {/* Categories Section */}
            <CategoriesSection
                categories={categories}
                layout="slider"
            />



            {/* Top Artisans Section */}



            <Footer showContact={true} showSocials={true} />

        </div>
    );
};



export default HomePage;