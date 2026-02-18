import { ArrowRight, Loader2 } from 'lucide-react';

const Submit = ({ 
    onClick, 
    text, 
    type = 'submit',
    isLoading = false,
    disabled = false,
    variant = 'primary', // 'primary' | 'secondary' | 'outline'
    size = 'md', // 'sm' | 'md' | 'lg'
    className = '',
    icon: Icon = ArrowRight,
    showIcon = true
}) => {
    // Tailles
    const sizes = {
        sm: 'py-2.5 px-4 text-[11px]',
        md: 'py-3 px-6 text-[12px]',
        lg: 'py-4 px-8 text-[13px]'
    };

    const variants = {
        primary: 'bg-[#1B4F72] hover:bg-[#D35400] text-white border-transparent',
        secondary: 'bg-[#D35400] hover:bg-[#A04000] text-white border-transparent',
        outline: 'bg-transparent border-2 border-[#1B4F72] text-[#1B4F72] hover:bg-[#1B4F72] hover:text-white'
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`
                w-full font-semibold flex items-center justify-center gap-2 
                transition-all duration-200 
                disabled:opacity-50 disabled:cursor-not-allowed
                active:scale-[0.98]
                ${sizes[size]}
                ${variants[variant]}
                ${className}
            `}
        >
            {isLoading ? (
                <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Chargement...</span>
                </>
            ) : (
                <>
                    {text}
                    {showIcon && <Icon className="w-4 h-4" />}
                </>
            )}
        </button>
    );
};



export default Submit;