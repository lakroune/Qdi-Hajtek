import { Link } from 'react-router-dom';

const CategoriesSection = ({
    title = 'Nos catégories de services',
    subtitle = 'Trouvez le professionnel qu\'il vous faut parmi nos spécialités',
    categories = [],
    layout = 'slider', // 'grid' | 'slider' | 'list'
    showIcon = true,
    onCategoryClick,
    className = ''
}) => {
   
    
    const handleClick = (category) => {
        onCategoryClick?.(category);
    };

    // Layout SLIDER  
    if (layout === 'slider') {
        return (
            <section className={`py-16 bg-white ${className}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">{title}</h2>
                        <p className="text-gray-600">{subtitle}</p>
                    </div>

                    <div className="relative">
                        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
                            {categories.map((category) => (
                                <Link
                                    key={category.id}
                                    to={`/services?category=${category.id}`}
                                    onClick={() => handleClick(category)}
                                    className="flex-shrink-0 w-32 snap-start group"
                                >
                                    <div className="flex flex-col items-center p-5 rounded-2xl bg-gray-50 hover:bg-orange-50 transition-all hover:scale-105">
                                        {showIcon && (
                                            <div className={`
                                                w-12 h-12 ${category.color || 'bg-gray-400'} 
                                                rounded-xl flex items-center justify-center mb-3
                                                group-hover:shadow-lg transition-all
                                            `}>
                                                {category.icon ? (
                                                    <category.icon className="w-6 h-6 text-white" />
                                                ) : (
                                                    <span className="text-xl font-bold text-white">
                                                        {category.name.charAt(0)}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                        <span className="text-sm font-medium text-gray-700 text-center">
                                            {category.name}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

};

export default CategoriesSection;