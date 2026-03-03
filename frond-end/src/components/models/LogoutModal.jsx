import React, { useEffect } from 'react';
import {
    LogOut, X, AlertCircle,
    Loader2
} from 'lucide-react';

const LogoutModal = ({
    isOpen,
    onClose,
    onConfirm,
    isLoading = false,
    userName = '',
    variant = 'default'
}) => {

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

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

    if (variant === 'default') {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                    onClick={onClose}
                ></div>

                <div className="relative w-full max-w-sm bg-white border border-gray-200 transform transition-all">

                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-[#D35400] hover:bg-[#D35400]/10 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>

                    <div className="p-6 text-center">
                        <div className="w-12 h-12 bg-[#1B4F72]/10 border border-gray-200 flex items-center justify-center mx-auto mb-4">
                            <LogOut className="w-6 h-6 text-[#1B4F72]" />
                        </div>

                        <h3 className="text-[13px] font-bold text-[#1B4F72] mb-2">
                            Se déconnecter ?
                        </h3>

                        <p className="text-[11px] text-gray-500 mb-6">
                            {userName ? (
                                <>Êtes-vous sûr de vouloir quitter votre session, <span className="font-medium text-[#1B4F72]">{userName}</span> ?</>
                            ) : (
                                'Êtes-vous sûr de vouloir vous déconnecter ?'
                            )}
                        </p>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button
                                onClick={onClose}
                                disabled={isLoading}
                                className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-[11px] font-medium transition-colors disabled:opacity-50"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={onConfirm}
                                disabled={isLoading}
                                className="flex-1 px-4 py-2.5 bg-[#D35400] hover:bg-[#A04000] text-white text-[11px] font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>Déconnexion...</span>
                                    </>
                                ) : (
                                    <>
                                        <LogOut className="w-4 h-4" />
                                        <span>Confirmer</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (variant === 'simple') {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={onClose}
                ></div>

                <div className="relative w-full max-w-xs bg-white border border-gray-200 p-5">
                    {/* Header avec icon warning */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-[#D35400]/10 flex items-center justify-center flex-shrink-0">
                            <AlertCircle className="w-4 h-4 text-[#D35400]" />
                        </div>
                        <div>
                            <h3 className="text-[12px] font-bold text-[#1B4F72]">Déconnexion</h3>
                            <p className="text-[10px] text-gray-500">Session active</p>
                        </div>
                    </div>

                    <p className="text-[11px] text-gray-600 mb-4">
                        Quitter l'application ?
                    </p>

                    <div className="flex gap-2">
                        <button
                            onClick={onClose}
                            className="flex-1 py-2 text-[11px] text-gray-500 hover:text-[#1B4F72] transition-colors"
                        >
                            Non
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={isLoading}
                            className="flex-1 py-2 bg-[#1B4F72] hover:bg-[#D35400] text-white text-[11px] font-medium transition-colors disabled:opacity-50"
                        >
                            {isLoading ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin mx-auto" />
                            ) : (
                                'Oui'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default LogoutModal;