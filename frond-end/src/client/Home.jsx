import React, { useState, useEffect } from 'react';
import {
    Paintbrush, Zap,
    Droplets,
} from 'lucide-react';
import Footer from '../components/footer/Footer';
import HeroSection from '../components/hero/HeroSection.jsx';
import CategoriesSection from '../components/cards/CategoriesSection.jsx';

const HomePage = () => {

    const handleSearch = (params) => {
        console.log('Recherche:', params);

    };

    const categories = [
        { id: 'plomberie', name: 'Plomberie', icon: Droplets, color: 'bg-blue-500' },
        { id: 'electricite', name: 'Électricité', icon: Zap, color: 'bg-yellow-500' },
        { id: 'peinture', name: 'Peinture', icon: Paintbrush, color: 'bg-red-500' },

    ];


    return (
        <div className="min-h-screen bg-gray-50" >
            <HeroSection
                variant="default"
                onSearch={handleSearch}
                categories={categories}
                showSearch={true}
                backgroundImage="/images/d.png"
            />
            <CategoriesSection
                categories={categories}
                layout="slider"
            />

        </div>
    );
};



export default HomePage;