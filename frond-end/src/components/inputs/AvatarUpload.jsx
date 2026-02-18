import  { useState, useRef } from 'react';
import { Camera,  User, Loader2 } from 'lucide-react';

const AvatarUpload = ({
    src,
    alt = 'Avatar',
    size = 'lg', // 'sm' | 'md' | 'lg' | 'xl'
    onChange,
    onRemove,
    maxSize = 2,  
    acceptedTypes = 'image/jpeg,image/png,image/webp',
    showPreview = true,
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
        sm: { container: 'w-12 h-12', icon: 'w-4 h-4', button: 'p-1.5', iconButton: 'w-3 h-3' },
        md: { container: 'w-16 h-16', icon: 'w-5 h-5', button: 'p-1.5', iconButton: 'w-3.5 h-3.5' },
        lg: { container: 'w-24 h-24', icon: 'w-6 h-6', button: 'p-2', iconButton: 'w-4 h-4' },
        xl: { container: 'w-32 h-32', icon: 'w-8 h-8', button: 'p-2.5', iconButton: 'w-5 h-5' }
    };

    const currentSize = sizes[size] || sizes.lg;

    const handleFileSelect = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setError('');

        // Validation type
        if (!acceptedTypes.split(',').includes(file.type)) {
            setError('Format non supporté. Utilisez JPG ou PNG.');
            return;
        }

        // Validation taille
        if (file.size > maxSize * 1024 * 1024) {
            setError(`Fichier trop volumineux. Max: ${maxSize}MB`);
            return;
        }

        setIsLoading(true);

        //   preview
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
        <div className={`flex items-center gap-6 ${className}`}>
            {/* Avatar Container */}
            <div className="relative">
                {/* Image  */}
                <div className={`
                    ${currentSize.container} 
                    rounded-full overflow-hidden border-4 border-gray-100 bg-gray-200
                    flex items-center justify-center
                    ${isLoading ? 'opacity-50' : ''}
                `}>
                    {isLoading ? (
                        <Loader2 className={`${currentSize.icon} text-gray-400 animate-spin`} />
                    ) : preview ? (
                        <img 
                            src={preview} 
                            alt={alt}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <User className={`${currentSize.icon} text-gray-400`} />
                    )}
                </div>

                {/* Bouton Upload */}
                {!isLoading && (
                    <>
                        <button
                            type="button"
                            onClick={handleClick}
                            className={`
                                absolute bottom-0 right-0 
                                ${currentSize.button}
                                bg-green-600 hover:bg-orange-700 
                                text-white rounded-full 
                                cursor-pointer transition-colors shadow-lg
                                flex items-center justify-center
                            `}
                            title="Changer la photo"
                        >
                            <Camera className={currentSize.iconButton} />
                        </button>

                        
                    </>
                )}

                {/* Input file */}
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
                    <h3 className="font-semibold text-gray-900">{label}</h3>
                    <p className="text-sm text-gray-500">{sublabel}</p>
                    
                    {/* Erreur */}
                    {error && (
                        <p className="text-sm text-red-500 mt-1">{error}</p>
                    )}
                    
                     
                </div>
            )}
        </div>
    );
};



export default AvatarUpload;