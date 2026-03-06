import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { LogOut, X, AlertCircle, Loader2 } from 'lucide-react';

const LogoutModal = ({
    estOuvert,
    surFermeture,
    surConfirmation,
    estEnChargement = false,
    nomUtilisateur = '',
    variante = 'par_defaut' // par_defaut | simple
}) => {

    useEffect(() => {
        const gererEchap = (e) => {
            if (e.key === 'Escape' && estOuvert) surFermeture();
        };
        document.addEventListener('keydown', gererEchap);
        return () => document.removeEventListener('keydown', gererEchap);
    }, [estOuvert, surFermeture]);

    useEffect(() => {
        if (estOuvert) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [estOuvert]);

    if (!estOuvert) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[999] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
        >
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-200"
                onClick={surFermeture}
            />

            {/* Contenu  */}
            <div className={`relative w-full ${variante === 'simple' ? 'max-w-xs' : 'max-w-sm'} bg-white shadow-2xl border border-gray-100 transform transition-all animate-in zoom-in-95 duration-200`}>

                {variante === 'par_defaut' && (
                    <>
                        <button
                            onClick={surFermeture}
                            className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-[#D35400] transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div className="p-8 text-center">
                            <div className="w-14 h-14 bg-[#1B4F72]/5 flex items-center justify-center mx-auto mb-5 rounded-full">
                                <LogOut className="w-7 h-7 text-[#1B4F72]" />
                            </div>

                            <h3 className="text-[16px] font-bold text-[#1B4F72] mb-2">Se déconnecter ?</h3>
                            <p className="text-[12px] text-gray-500 mb-8 leading-relaxed">
                                {nomUtilisateur ? (
                                    <>Souhaitez-vous vraiment quitter votre session, <span className="font-bold text-[#1B4F72]">{nomUtilisateur}</span> ?</>
                                ) : (
                                    'Souhaitez-vous vraiment vous déconnecter de di Hajtek ?'
                                )}
                            </p>

                            <div className="flex gap-3">
                                <button
                                    onClick={surFermeture}
                                    disabled={estEnChargement}
                                    className="flex-1 px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gray-600 text-[12px] font-semibold transition-colors disabled:opacity-50"
                                >
                                    Annuler
                                </button>
                                <button
                                    onClick={surConfirmation}
                                    disabled={estEnChargement}
                                    className="flex-1 px-4 py-3 bg-[#1B4F72] hover:bg-[#D35400] text-white text-[12px] font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm"
                                >
                                    {estEnChargement ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <span>Confirmer</span>
                                    )}
                                </button>
                            </div>
                        </div>
                    </>
                )}

                {variante === 'simple' && (
                    <div className="p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 bg-[#D35400]/10 flex items-center justify-center rounded-lg">
                                <AlertCircle className="w-5 h-5 text-[#D35400]" />
                            </div>
                            <div>
                                <h3 className="text-[14px] font-bold text-[#1B4F72]">Déconnexion</h3>
                                <p className="text-[11px] text-gray-400 leading-none mt-1">Session active</p>
                            </div>
                        </div>
                        <p className="text-[12px] text-gray-600 mb-6">Confirmer la fermeture de session ?</p>
                        <div className="grid grid-cols-2 gap-3">
                            <button onClick={surFermeture} className="py-2 text-[12px] text-gray-400 hover:text-gray-600 font-medium">Non</button>
                            <button
                                onClick={surConfirmation}
                                disabled={estEnChargement}
                                className="py-2 bg-[#1B4F72] text-white text-[12px] font-bold hover:bg-[#D35400] transition-colors"
                            >
                                {estEnChargement ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Oui'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
};

export default LogoutModal;