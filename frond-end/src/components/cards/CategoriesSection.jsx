import { Link } from 'react-router-dom';

const CategoriesSection = ({
    categories = [],
    layout = 'slider',
    showIcon = true,
    onCategoryClick,
    className = ''
}) => {
    const handleClick = (category) => {
        onCategoryClick?.(category);
    };

    // Layout SLIDER (horizontal scroll)
    if (layout === 'slider') {
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
                                    <div className={`
                                        w-10 h-10 ${category.color || 'bg-[#1B4F72]'} 
                                        flex items-center justify-center mb-2
                                        transition-all
                                    `}>
                                        {category.icon ? (
                                            <category.icon className="w-5 h-5 text-white" />
                                        ) : (
                                            <span className="text-[12px] font-bold text-white">
                                                {category.name.charAt(0)}
                                            </span>
                                        )}
                                    </div>
                                )}
                                <span className="text-[10px] font-medium text-[#1B4F72] text-center group-hover:text-[#D35400] transition-colors">
                                    {category.name}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        );
    }


    if (layout === 'grid') {
        return (
            <div className={`${className}`}>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            to={`/services?category=${category.id}`}
                            onClick={() => handleClick(category)}
                            className="group"
                        >
                            <div className="flex flex-col items-center p-3 border border-gray-200 bg-white hover:border-[#D35400] hover:bg-[#D35400]/5 transition-all">
                                {showIcon && (
                                    <div className={`
                                        w-10 h-10 ${category.color || 'bg-[#1B4F72]'} 
                                        flex items-center justify-center mb-2
                                    `}>
                                        {category.icon ? (
                                            <category.icon className="w-5 h-5 text-white" />
                                        ) : (
                                            <span className="text-[12px] font-bold text-white">
                                                {category.name.charAt(0)}
                                            </span>
                                        )}
                                    </div>
                                )}
                                <span className="text-[10px] font-medium text-[#1B4F72] text-center group-hover:text-[#D35400] transition-colors">
                                    {category.name}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        );
    }


    if (layout === 'list') {
        return (
            <div className={`border border-gray-200 ${className}`}>
                {categories.map((category, index) => (
                    <Link
                        key={category.id}
                        to={`/services?category=${category.id}`}
                        onClick={() => handleClick(category)}
                        className={`
                            flex items-center gap-3 p-3 hover:bg-[#D35400]/5 transition-colors
                            ${index !== categories.length - 1 ? 'border-b border-gray-100' : ''}
                        `}
                    >
                        {showIcon && (
                            <div className={`
                                w-8 h-8 ${category.color || 'bg-[#1B4F72]'} 
                                flex items-center justify-center flex-shrink-0
                            `}>
                                {category.icon ? (
                                    <category.icon className="w-4 h-4 text-white" />
                                ) : (
                                    <span className="text-[10px] font-bold text-white">
                                        {category.name.charAt(0)}
                                    </span>
                                )}
                            </div>
                        )}
                        <span className="text-[11px] font-medium text-[#1B4F72] group-hover:text-[#D35400]">
                            {category.name}
                        </span>
                    </Link>
                ))}
            </div>
        );
    }

    return null;
};

export default CategoriesSection;