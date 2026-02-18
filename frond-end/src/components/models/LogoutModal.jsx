import React, { useEffect } from 'react';
import {
    LogOut, X, AlertCircle,
    Loader2, CheckCircle
} from 'lucide-react';

const LogoutModal = ({
    isOpen,
    onClose,
    onConfirm,
    isLoading = false,
    userName = '',
    variant = 'default' // 'default' | 'simple' | 'danger'
}) => {
    // Fermer avec Escape
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    // Bloquer le scroll du body
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    // Variant DEFAULT (Standard avec détails)
    if (variant === 'default') {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                    onClick={onClose}
                ></div>

                {/* Modal */}
                <div className="relative  max-w-md bg-white   transform transition-all scale-100 animate-in fade-in zoom-in duration-200">

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Content */}
                    <div className="p-8 text-center">
                        {/* Icon */}
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <LogOut className="w-8 h-8 text-orange-600" />
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Se déconnecter ?
                        </h3>

                        {/* Message */}
                        <p className="text-gray-600 mb-6">
                            {userName ? (
                                <>Êtes-vous sûr de vouloir quitter votre session ?</>
                            ) : (
                                'Êtes-vous sûr de vouloir vous déconnecter ?'
                            )}
                        </p>

                        

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button
                                onClick={onClose}
                                disabled={isLoading}
                                className="flex-1 text-[12px] px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold   transition-colors disabled:opacity-50"
                            >
                                Rester connecté
                            </button>
                            <button
                                onClick={onConfirm}
                                disabled={isLoading}
                                className="flex-1 px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-[12px] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Déconnexion...
                                    </>
                                ) : (
                                    <>
                                        <LogOut className="w-5 h-5" />
                                        Déconnexion
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Variant SIMPLE 


    // Variant DANGER  
    return null;
};



export default LogoutModal;