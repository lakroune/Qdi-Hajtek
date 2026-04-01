import { Link } from 'react-router-dom';

const CategoriesSection = ({
    categories = [],
    showIcon = true,
    onCategoryClick,
    className = ''
}) => {
    const handleClick = (category) => {
        onCategoryClick?.(category);
    };

    return (
        <div className={`${className}`}>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
                {categories.map((category) => (
                    <Link
                        key={category.id}
                        to={`/services?category=${category.id}`}
                        onClick={() => handleClick(category)}
                        className="flex-shrink-0 w-24 snap-start group"
                    >
                        <div className="flex flex-col items-center p-3 border border-gray-200 bg-white hover:border-[#D35400] hover:bg-[#D35400]/5 transition-all">
                            {showIcon && (
                                <div className="w-10 h-10 bg-[#1B4F72] rounded-full flex items-center justify-center mb-2 transition-all group-hover:scale-110">
                                    {category.icon ? (
                                        <category.icon className="w-5 h-5 text-white" />
                                    ) : (
                                        <span className="text-[12px] font-bold text-white uppercase">
                                            {category.nom_categorie.charAt(0)}
                                        </span>
                                    )}
                                </div>
                            )}
                            <span className="text-[10px] font-medium text-[#1B4F72] text-center group-hover:text-[#D35400] transition-colors line-clamp-1">
                                {category.nom_categorie}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategoriesSection;