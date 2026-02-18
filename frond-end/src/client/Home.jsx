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

    const handleSearch = (params) => {
        console.log('Recherche:', params);

        // api
    };

    // Categories
    const categories = [
        { id: 'plomberie', name: 'Plomberie', icon: Droplets, color: 'bg-blue-500' },
        { id: 'electricite', name: 'Électricité', icon: Zap, color: 'bg-yellow-500' },
        { id: 'peinture', name: 'Peinture', icon: Paintbrush, color: 'bg-red-500' },

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


            <Footer showContact={true} showSocials={true} />

        </div>
    );
};



export default HomePage;