import React from 'react';
import { Star, TrendingUp, Users, Award } from 'lucide-react';
import SearchBar from '../searchs/SearchBar';

const HeroSection = ({
    variant = 'default', // 'default' | 'minimal'  
    title,
    subtitle,
    highlightText,

    showSearch = true,
    backgroundImage = '/images/hero-pattern.png',
    overlayGradient = 'from-orange-600/20 to-blue-600/20',
    categories = [],
    onSearch,
    className = ''
}) => {
    // Contenu par défaut
    const defaultContent = {
        title: 'Trouvez le meilleur artisan',
        highlightText: 'près de chez vous',
        subtitle: 'Des professionnels vérifiés pour tous vos travaux. Devis gratuit, intervention rapide, garantie satisfait ou refait.',

    };

    const content = {
        title: title || defaultContent.title,
        highlightText: highlightText || defaultContent.highlightText,
        subtitle: subtitle || defaultContent.subtitle,

    };

    if (variant === 'default') {
        return (
            <section className={`relative bg-gray-900 pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden ${className}`}>
                {/* Background Pattern */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}
                ></div>

                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${overlayGradient}`}></div>

                {/* Content */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        {content.title}<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                            {content.highlightText}
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                        {content.subtitle}
                    </p>

                    {/* Search Bar */}
                    {showSearch && (
                        <div className="mb-12">
                            <SearchBar
                                onSearch={onSearch}
                                categories={categories}
                            />
                        </div>
                    )}


                </div>
            </section>
        );
    }

    if (variant === 'minimal') {
        return (
            <section className={`relative bg-gray-900 pt-24 pb-12 overflow-hidden ${className}`}>
                <div
                    className="absolute inset-0 opacity-5"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                ></div>
                <div className={`absolute inset-0 bg-gradient-to-r ${overlayGradient}`}></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                            {content.title}
                        </h1>
                        <p className="text-gray-400 max-w-xl mx-auto">
                            {content.subtitle}
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return null;
};

export default HeroSection;