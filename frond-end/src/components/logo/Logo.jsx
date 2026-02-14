import React from 'react';
import { Wrench, Hammer, Paintbrush, HardHat } from 'lucide-react';

const Logo = ({ 
    variant = 'default',  // 'default' | 'light' | 'dark' | 'compact'
    size = 's-3',         // 's-1' | 's-2' | 's-3' | 's-4' | 's-5' | 's-6'
    className = '',
    showText = true,
    iconType = 'wrench'   // 'wrench' | 'hammer' | 'paint' | 'hat'
}) => {
    // Configuration des 6 tailles (40px à 200px)
    const sizeConfig = {
        's-1': { 
            container: 'h-10 w-10',           // 40px
            icon: 20,
            text: 'text-lg',
            gap: 'gap-2',
            padding: 'p-1.5'
        },
        's-2': { 
            container: 'h-14 w-14',           // 56px
            icon: 28,
            text: 'text-xl',
            gap: 'gap-2.5',
            padding: 'p-2'
        },
        's-3': { 
            container: 'h-20 w-20',            // 80px
            icon: 40,
            text: 'text-2xl',
            gap: 'gap-3',
            padding: 'p-3'
        },
        's-4': { 
            container: 'h-28 w-28',          // 112px
            icon: 56,
            text: 'text-3xl',
            gap: 'gap-4',
            padding: 'p-4'
        },
        's-5': { 
            container: 'h-40 w-40',           // 160px
            icon: 80,
            text: 'text-4xl',
            gap: 'gap-5',
            padding: 'p-5'
        },
        's-6': { 
            container: 'h-[200px] w-[200px]', // 200px
            icon: 100,
            text: 'text-5xl',
            gap: 'gap-6',
            padding: 'p-6'
        }
    };

    const currentSize = sizeConfig[size] || sizeConfig['s-3'];

    // Couleurs selon le variant
    const colorVariants = {
        default: {
            bg: 'bg-orange-500',
            icon: 'text-white',
            textPrimary: 'text-gray-900',
            textSecondary: 'text-orange-600',
            border: 'border-orange-500'
        },
        light: {
            bg: 'bg-white',
            icon: 'text-orange-600',
            textPrimary: 'text-white',
            textSecondary: 'text-orange-400',
            border: 'border-white'
        },
        dark: {
            bg: 'bg-gray-900',
            icon: 'text-orange-500',
            textPrimary: 'text-gray-900',
            textSecondary: 'text-gray-700',
            border: 'border-gray-900'
        },
        compact: {
            bg: 'bg-transparent',
            icon: 'text-orange-600',
            textPrimary: 'text-gray-900',
            textSecondary: 'text-orange-600',
            border: 'border-orange-600'
        }
    };

    const colors = colorVariants[variant] || colorVariants.default;

    // Sélection de l'icône
    const iconComponents = {
        wrench: Wrench,
        hammer: Hammer,
        paint: Paintbrush,
        hat: HardHat
    };
    const IconComponent = iconComponents[iconType] || Wrench;

    // Mode compact (juste l'icône)
    if (variant === 'compact' || !showText) {
        return (
            <div className={`flex items-center justify-center ${className}`}>
                <div className={`
                    ${currentSize.container} 
                    ${currentSize.padding}
                    ${colors.bg} 
                    rounded-xl flex items-center justify-center
                    ${variant === 'compact' ? `border-2 ${colors.border}` : ''}
                    shadow-lg
                `}>
                    <IconComponent 
                        size={currentSize.icon} 
                        className={colors.icon}
                        strokeWidth={2}
                    />
                </div>
            </div>
        );
    }

    // Mode complet (icône + texte)
    return (
        <div className={`flex items-center ${currentSize.gap} ${className}`}>
            {/* Logo Icon Container */}
            <div className={`
                ${currentSize.container} 
                ${currentSize.padding}
                ${colors.bg} 
                rounded-xl flex items-center justify-center flex-shrink-0
                shadow-lg transform hover:scale-105 transition-transform duration-300
            `}>
                <IconComponent 
                    size={currentSize.icon} 
                    className={colors.icon}
                    strokeWidth={2}
                />
            </div>

            {/* Logo Text */}
            <div className="flex flex-col">
                <span className={`
                    ${currentSize.text} 
                    ${colors.textPrimary} 
                    font-bold leading-tight tracking-tight
                `}>
                    Arti<span className={colors.textSecondary}>Maroc</span>
                </span>
                {size !== 's-1' && size !== 's-2' && (
                    <span className="text-xs text-gray-500 font-medium tracking-wide uppercase">
                        Services Professionnels
                    </span>
                )}
            </div>
        </div>
    );
};

// Composant pour afficher toutes les tailles (démonstration)
export const LogoShowcase = () => {
    const sizes = ['s-1', 's-2', 's-3', 's-4', 's-5', 's-6'];
    const variants = ['default', 'light', 'dark', 'compact'];
    const icons = ['wrench', 'hammer', 'paint', 'hat'];

    return (
        <div className="p-8 space-y-12 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Logo Sizes Showcase</h1>
            
            {/* Toutes les tailles côte à côte */}
            <div className="space-y-8">
                <h2 className="text-xl font-semibold text-gray-700">All Sizes (s-1 to s-6)</h2>
                <div className="flex flex-wrap items-end gap-8 p-6 bg-white rounded-2xl shadow-sm">
                    {sizes.map((size) => (
                        <div key={size} className="flex flex-col items-center gap-2">
                            <Logo size={size} />
                            <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                {size}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Variants */}
            <div className="space-y-8">
                <h2 className="text-xl font-semibold text-gray-700">Variants (s-4)</h2>
                <div className="grid grid-cols-2 gap-6">
                    {variants.map((variant) => (
                        <div 
                            key={variant} 
                            className={`p-6 rounded-2xl ${
                                variant === 'light' ? 'bg-gray-900' : 'bg-white shadow-sm'
                            }`}
                        >
                            <Logo size="s-4" variant={variant} />
                            <p className={`mt-4 text-sm font-medium ${
                                variant === 'light' ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                                Variant: {variant}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Types d'icônes */}
            <div className="space-y-8">
                <h2 className="text-xl font-semibold text-gray-700">Icon Types (s-3)</h2>
                <div className="flex flex-wrap gap-8 p-6 bg-white rounded-2xl shadow-sm">
                    {icons.map((icon) => (
                        <div key={icon} className="flex flex-col items-center gap-2">
                            <Logo size="s-3" iconType={icon} />
                            <span className="text-xs font-mono text-gray-500 capitalize">
                                {icon}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sans texte */}
            <div className="space-y-8">
                <h2 className="text-xl font-semibold text-gray-700">Icon Only (showText=false)</h2>
                <div className="flex flex-wrap items-end gap-8 p-6 bg-white rounded-2xl shadow-sm">
                    {sizes.map((size) => (
                        <div key={size} className="flex flex-col items-center gap-2">
                            <Logo size={size} showText={false} />
                            <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                {size}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Logo;