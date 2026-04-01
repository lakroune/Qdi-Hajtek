import SearchBar from '../searchs/SearchBar';

const HeroSection = ({
    title,
    subtitle,
    highlightText,
    showSearch = true,
    backgroundImage = '/images/d.png',
    categories = [],
    onSearch,
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


    return (
        <section className={`relative bg-[#1b4f7296] pt-20 pb-12 overflow-hidden  `}>
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            ></div>

            <div className={`absolute inset-0 bg-gradient-to-br  `}></div>

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

            </div>
        </section>
    );

};

export default HeroSection;