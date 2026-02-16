import React from 'react';

const Logo = ({
    variant = 'default',
    size = 's-3',
    className = '',
    showText = true
}) => {
    const sizeConfig = {
        's-1': { container: 'h-8 w-12', text: 'text-sm', qhSize: 'text-xs' },   // 32px
        's-2': { container: 'h-10 w-16', text: 'text-base', qhSize: 'text-sm' }, // 40px
        's-3': { container: 'h-16 w-24', text: 'text-xl', qhSize: 'text-lg' },   // 64px
        's-4': { container: 'h-24 w-36', text: 'text-3xl', qhSize: 'text-2xl' }, // 96px
        's-5': { container: 'h-32 w-48', text: 'text-4xl', qhSize: 'text-3xl' }, // 128px
        's-6': { container: 'h-40 w-60', text: 'text-5xl', qhSize: 'text-4xl' }  // 160px
    };

    const currentSize = sizeConfig[size] || sizeConfig['s-3'];

    const colorVariants = {
        default: {
            left: 'bg-[#D35400]',
            right: 'bg-[#1B4F72]',
            textPrimary: 'text-gray-900',
            textSecondary: 'text-[#D35400]'
        },
        light: {
            left: 'bg-white/20',
            right: 'bg-white/40',
            textPrimary: 'text-white',
            textSecondary: 'text-white/80'
        },
        dark: {
            left: 'bg-gray-700',
            right: 'bg-gray-900',
            textPrimary: 'text-white',
            textSecondary: 'text-gray-400'
        }
    };

    const colors = colorVariants[variant] || colorVariants.default;

    return (
        <div className={`flex items-center gap-4 ${className}`}>
            <div className={`relative ${currentSize.container} flex items-center justify-center overflow-hidden`}>
                <div className={`absolute left-0 h-full w-1/2 ${colors.left} rounded-l-full transform -skew-x-12`}></div>

                <div className={`absolute right-0 h-full w-1/2 ${colors.right} rounded-r-full transform skew-x-12`}></div>

                <div className={`relative z-10 flex font-black italic tracking-tighter ${currentSize.qhSize} text-white`}>
                    Q<span className="ml-[-2px]">H</span>
                </div>
            </div>

            {showText && (
                <div className="flex flex-col">
                    <span className={`${currentSize.text} font-bold leading-none tracking-tight ${colors.textPrimary}`}>
                        QDI<span className={colors.textSecondary}>HAJTEK</span>
                    </span>
                    {size !== 's-1' && (
                        <span className="text-[10px] text-gray-500 font-medium uppercase tracking-widest mt-1">
                            TROUVEZ VOTRE ARTISAN
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

export default Logo;