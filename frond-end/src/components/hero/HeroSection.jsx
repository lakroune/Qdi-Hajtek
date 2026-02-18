import { Star, TrendingUp, Users, Award } from 'lucide-react';
import SearchBar from '../searchs/SearchBar';

const HeroSection = ({
    variant = 'default',
    title,
    subtitle,
    highlightText,
    showSearch = true,
    backgroundImage = '/images/d.png',
    overlayGradient = 'from-[#1b4f721a]/90 to-[#1B4F72]/70',
    categories = [],
    onSearch,
    className = ''
}) => {
    const defaultContent = {
        title: 'Trouvez le meilleur artisan',
        highlightText: 'près de chez vous',
        subtitle: 'Des professionnels vérifiés pour tous vos travaux. Devis gratuit, intervention rapide.',
    };

    const content = {
        title: title || defaultContent.title,
        highlightText: highlightText || defaultContent.highlightText,
        subtitle: subtitle || defaultContent.subtitle,
    };

    if (variant === 'default') {
        return (
            <section className={`relative bg-[#1b4f7296] pt-20 pb-12 overflow-hidden ${className}`}>
                <div
                    className="absolute inset-0 opacity-5"
                    style={{ 
                        backgroundImage: `url(${backgroundImage})`, 
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                ></div>

                <div className={`absolute inset-0 bg-gradient-to-br ${overlayGradient}`}></div>

                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    
                    <h1 className="text-[24px] md:text-[28px] lg:text-[32px] font-bold text-white mb-3 leading-tight">
                        {content.title}<br />
                        <span className="text-[#D35400]">
                            {content.highlightText}
                        </span>
                    </h1>

                    <p className="text-[11px] text-gray-200 mb-8 max-w-xl mx-auto leading-relaxed">
                        {content.subtitle}
                    </p>

                    {showSearch && (
                        <div className="mb-8 max-w-2xl mx-auto">
                            <SearchBar
                                onSearch={onSearch}
                                categories={categories}
                            />
                        </div>
                    )}

                    {/* Stats minimalistes */}
                    <div className="flex items-center justify-center gap-8 text-white/80">
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-[#D35400]" />
                            <span className="text-[11px]">500+ Artisans</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-[#D35400]" />
                            <span className="text-[11px]">4.8/5 Moyenne</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-[#D35400]" />
                            <span className="text-[11px]">Vérifiés</span>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (variant === 'minimal') {
        return (
            <section className={`relative bg-[#1B4F72] pt-12 pb-8 overflow-hidden ${className}`}>
                <div
                    className="absolute inset-0 opacity-5"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                ></div>
                <div className="absolute inset-0 bg-[#1B4F72]/90"></div>

                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-[18px] md:text-[22px] font-bold text-white mb-2">
                            {content.title}
                        </h1>
                        <p className="text-[11px] text-gray-300 max-w-md mx-auto">
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