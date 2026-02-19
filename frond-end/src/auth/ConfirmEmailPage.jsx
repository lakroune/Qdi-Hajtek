import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
    Mail, CheckCircle, AlertCircle, ArrowRight, 
    RefreshCw, Loader2
} from 'lucide-react';

const EmailConfirmationPage = () => {
    const [status, setStatus] = useState('checking'); // checking | success | error
    const [resendTimer, setResendTimer] = useState(60);
    const { token } = useParams();

    useEffect(() => {
        // Simulation vérification token
        const checkToken = async () => {
            await new Promise(r => setTimeout(r, 1500));
            setStatus('success'); // ou 'error' si token invalide
        };
        checkToken();
    }, [token]);

    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendTimer]);

    const handleResend = () => {
        setResendTimer(60);
        // API call pour renvoyer
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#D35400] flex items-center justify-center">
                            <span className="text-white font-bold text-[20px]">9</span>
                        </div>
                        <div className="text-left">
                            <span className="font-bold text-[#1B4F72] text-[18px]">di Hajtek</span>
                            <p className="text-[10px] text-gray-500">Services artisanaux</p>
                        </div>
                    </Link>
                </div>

                {/* Card */}
                <div className="bg-white border border-gray-200 p-8 text-center">
                    
                    {status === 'checking' && (
                        <>
                            <div className="w-16 h-16 bg-[#1B4F72]/10 flex items-center justify-center mx-auto mb-4">
                                <Loader2 className="w-8 h-8 text-[#1B4F72] animate-spin" />
                            </div>
                            <h2 className="text-[16px] font-bold text-[#1B4F72] mb-2">
                                Vérification en cours...
                            </h2>
                            <p className="text-[12px] text-gray-500">
                                Nous vérifions votre adresse email
                            </p>
                        </>
                    )}

                    {status === 'success' && (
                        <>
                            <div className="w-16 h-16 bg-green-100 flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-8 h-8 text-green-600" />
                            </div>
                            <h2 className="text-[16px] font-bold text-[#1B4F72] mb-2">
                                Email confirmé !
                            </h2>
                            <p className="text-[12px] text-gray-500 mb-6">
                                Votre adresse email a été vérifiée avec succès. 
                                Vous pouvez maintenant accéder à votre compte.
                            </p>
                            <Link 
                                to="/login"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1B4F72] hover:bg-[#D35400] text-white text-[12px] font-medium transition-colors"
                            >
                                Se connecter
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </>
                    )}

                    {status === 'error' && (
                        <>
                            <div className="w-16 h-16 bg-red-100 flex items-center justify-center mx-auto mb-4">
                                <AlertCircle className="w-8 h-8 text-red-600" />
                            </div>
                            <h2 className="text-[16px] font-bold text-[#1B4F72] mb-2">
                                Lien invalide ou expiré
                            </h2>
                            <p className="text-[12px] text-gray-500 mb-6">
                                Le lien de confirmation n'est plus valide ou a déjà été utilisé.
                            </p>
                            <button
                                onClick={handleResend}
                                disabled={resendTimer > 0}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1B4F72] hover:bg-[#D35400] disabled:bg-gray-300 text-white text-[12px] font-medium transition-colors"
                            >
                                <RefreshCw className={`w-4 h-4 ${resendTimer > 0 ? '' : 'animate-spin'}`} />
                                {resendTimer > 0 
                                    ? `Renvoyer dans ${resendTimer}s` 
                                    : 'Renvoyer l\'email'}
                            </button>
                        </>
                    )}
                </div>

                {/* Help */}
                <p className="mt-6 text-center text-[11px] text-gray-500">
                    Besoin d'aide ?{' '}
                    <Link to="/contact" className="text-[#D35400] hover:underline">
                        Contactez-nous
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default EmailConfirmationPage;