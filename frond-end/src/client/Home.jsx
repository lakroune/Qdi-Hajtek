import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Paintbrush, Zap,
    Droplets,
} from 'lucide-react';
import Header from '../components/Header/Header';
import Footer from '../components/footer/Footer';
import HeroSection from '../components/hero/HeroSection.jsx';
import CategoriesSection from '../components/cards/CategoriesSection.jsx';
import LogoutModal from '../components/models/LogoutModal.jsx';

const HomePage = () => {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const handleSearch = (params) => {
        console.log('Recherche:', params);


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
    const handleLogout = async () => {

        // api 
        setIsLoggingOut(true);
        setShowLogoutModal(false);
        setTimeout(() => {
            window.location.href = '/login';
        }, 1000);
    };

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
            <button onClick={() => setShowLogoutModal(true)}>
                Déconnexion
            </button>


            <LogoutModal
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={handleLogout}
                isLoading={isLoggingOut}
                userName="Ahmed Benali"
                variant="default"
            />


            <Footer showContact={true} showSocials={true} />

        </div>
    );
};



export default HomePage;