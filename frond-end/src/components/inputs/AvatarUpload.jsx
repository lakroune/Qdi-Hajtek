import { useState, useRef } from 'react';
import { Camera, User, Loader2, X } from 'lucide-react';

const AvatarUpload = ({
    src,
    alt = 'Avatar',
    size = 'lg',
    onChange,
    onRemove,
    maxSize = 2,
    acceptedTypes = 'image/jpeg,image/png,image/webp',
    showLabel = true,
    label = 'Photo de profil',
    sublabel = 'JPG, PNG. Max 2MB.',
    className = ''
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [preview, setPreview] = useState(src);
    const [error, setError] = useState('');
    const inputRef = useRef(null);

    const sizes = {
        sm: { container: 'w-12 h-12', icon: 'w-4 h-4', button: 'p-1', iconButton: 'w-3 h-3' },
        md: { container: 'w-16 h-16', icon: 'w-5 h-5', button: 'p-1', iconButton: 'w-3 h-3' },
        lg: { container: 'w-20 h-20', icon: 'w-6 h-6', button: 'p-1.5', iconButton: 'w-3.5 h-3.5' },
        xl: { container: 'w-24 h-24', icon: 'w-7 h-7', button: 'p-1.5', iconButton: 'w-4 h-4' }
    };

    const currentSize = sizes[size] || sizes.lg;

    const handleFileSelect = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setError('');

        if (!acceptedTypes.split(',').includes(file.type)) {
            setError('JPG ou PNG uniquement');
            return;
        }

        if (file.size > maxSize * 1024 * 1024) {
            setError(`Max: ${maxSize}MB`);
            return;
        }

        setIsLoading(true);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
            setIsLoading(false);
        };
        reader.readAsDataURL(file);

        onChange?.(file);
    };

    const handleRemove = () => {
        setPreview(null);
        setError('');
        if (inputRef.current) inputRef.current.value = '';
        onRemove?.();
    };

    const handleClick = () => {
        inputRef.current?.click();
    };

    return (
        <div className={`flex items-center gap-4 ${className}`}>
            <div className="relative">
                <div className={`
                    ${currentSize.container} 
                    overflow-hidden border border-gray-200 bg-gray-100
                    flex items-center justify-center
                    ${isLoading ? 'opacity-50' : ''}
                `}>
                    {isLoading ? (
                        <Loader2 className={`${currentSize.icon} text-[#1B4F72] animate-spin`} />
                    ) : preview ? (
                        <img 
                            src={preview} 
                            alt={alt}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <User className={`${currentSize.icon} text-[#1B4F72]`} />
                    )}
                </div>

                {/* Bouton Upload */}
                {!isLoading && (
                    <>
                        <button
                            type="button"
                            onClick={handleClick}
                            className={`
                                absolute -bottom-1 -right-1 
                                ${currentSize.button}
                                bg-[#D35400] hover:bg-[#A04000]
                                text-white 
                                cursor-pointer transition-colors shadow-md
                                flex items-center justify-center
                            `}
                            title="Changer"
                        >
                            <Camera className={currentSize.iconButton} />
                        </button>

                       
                        
                    </>
                )}

                <input
                    ref={inputRef}
                    type="file"
                    accept={acceptedTypes}
                    onChange={handleFileSelect}
                    className="hidden"
                />
            </div>

            {/* Label et info */}
            {showLabel && (
                <div className="flex-1">
                    <h3 className="text-[12px] font-semibold text-[#1B4F72]">{label}</h3>
                    <p className="text-[10px] text-gray-500">{sublabel}</p>
                    
                    {error && (
                        <p className="text-[10px] text-[#D35400] mt-1">{error}</p>
                    )}
                    
                    {!error && preview && (
                        <p className="text-[10px] text-green-600 mt-1 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                            Image chargée
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default AvatarUpload;