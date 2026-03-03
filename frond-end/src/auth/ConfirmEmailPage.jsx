import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  Mail, ArrowRight, Check, Shield, Clock,
  AlertCircle, CheckCircle, XCircle, RefreshCw
} from 'lucide-react';
import Logo from '../components/logo/Logo';

const EmailConfirmationPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // verifying | success | error
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [countdown, setCountdown] = useState(60);

  // Simulation vérification token
  useEffect(() => {
    const verifyEmail = async () => {
      await new Promise(r => setTimeout(r, 2000));
      // Simulation succès (dans la vraie vie, vérifier le token avec l'API)
      setStatus('success');
    };
    verifyEmail();
  }, [token]);

  // Countdown pour renvoi
  useEffect(() => {
    if (countdown > 0 && resendSuccess) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, resendSuccess]);

  const handleResend = async () => {
    setIsResending(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsResending(false);
    setResendSuccess(true);
    setCountdown(60);
  };

  // État de vérification en cours
  if (status === 'verifying') {
    return (
      <div className="min-h-screen flex">
        <div className="hidden lg:flex lg:w-1/2 relative bg-[#1B4F72]">
          <div className="fixed z-10 flex flex-col justify-between p-12 w-1/2 text-white h-full bg-gray-900/60 bg-blend-overlay"
            style={{
              backgroundImage: `url("/images/artisan-workspace.png")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}></div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-6 lg:p-12">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#1B4F72] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <h2 className="text-[20px] font-bold text-[#1B4F72] mb-2">Vérification en cours...</h2>
            <p className="text-[12px] text-gray-500">Nous vérifions votre adresse email.</p>
          </div>
        </div>
      </div>
    );
  }

  // État succès
  if (status === 'success') {
    return (
      <div className="min-h-screen flex">

        {/* Left Side */}
        <div className="hidden lg:flex lg:w-1/2 relative bg-[#1B4F72]">
          <div className="fixed z-10 flex flex-col justify-between p-12 w-1/2 text-white h-full bg-gray-900/60 bg-blend-overlay"
            style={{
              backgroundImage: `url("/images/artisan-workspace.png")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}></div>

          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#1B4F72]/50 to-transparent"></div>

          <div className="relative z-10 flex flex-col justify-between p-12 text-white h-full">
            <Link to="/" className="flex items-center gap-3">
              <Logo />
            </Link>

            <div className="max-w-md">
              <h1 className="text-[28px] font-bold leading-tight mb-4 text-white">
                Bienvenue dans la communauté !
              </h1>
              <p className="text-[13px] text-white/80 leading-relaxed">
                Votre compte est maintenant actif. Vous pouvez accéder à tous nos services et commencer à trouver les meilleurs artisans.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-[12px] text-white/90">
                <div className="w-8 h-8 bg-white/10 flex items-center justify-center">
                  <Check className="w-4 h-4 text-[#D35400]" />
                </div>
                <span>Compte vérifié</span>
              </div>
              <div className="flex items-center gap-3 text-[12px] text-white/90">
                <div className="w-8 h-8 bg-white/10 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-[#D35400]" />
                </div>
                <span>Accès complet aux services</span>
              </div>
              <div className="flex items-center gap-3 text-[12px] text-white/90">
                <div className="w-8 h-8 bg-white/10 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-[#D35400]" />
                </div>
                <span>Support prioritaire</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Success */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-6 lg:p-12">
          <div className="w-full max-w-md text-center">

            {/* Mobile Logo */}
            <div className="lg:hidden mb-8">
              <Link to="/" className="inline-flex items-center gap-3">
                <div className="w-10 h-10 bg-[#D35400] flex items-center justify-center">
                  <span className="text-white font-bold text-[18px]">9</span>
                </div>
                <div className="text-left">
                  <span className="font-bold text-[#1B4F72] text-[16px]">di Hajtek</span>
                  <p className="text-[10px] text-gray-500">Services artisanaux</p>
                </div>
              </Link>
            </div>

            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>

            <h2 className="text-[24px] font-bold text-[#1B4F72] mb-3">
              Email confirmé !
            </h2>
            
            <p className="text-[13px] text-gray-600 mb-8 leading-relaxed">
              Félicitations ! Votre adresse email a été vérifiée avec succès. Votre compte est maintenant actif et vous pouvez profiter de tous nos services.
            </p>

            <div className="space-y-3">
              <Link
                to="/auth/login"
                className="w-full bg-[#1B4F72] hover:bg-[#D35400] text-white py-3 text-[13px] font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                Se connecter
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/"
                className="w-full border border-gray-200 hover:border-[#1B4F72] text-gray-700 hover:text-[#1B4F72] py-3 text-[13px] font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                Retour à l'accueil
              </Link>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // État erreur (token invalide/expiré)
  return (
    <div className="min-h-screen flex">

      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#1B4F72]">
        <div className="fixed z-10 flex flex-col justify-between p-12 w-1/2 text-white h-full bg-gray-900/60 bg-blend-overlay"
          style={{
            backgroundImage: `url("/images/artisan-workspace.png")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}></div>
      </div>

      {/* Right Side - Error */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-6 lg:p-12">
        <div className="w-full max-w-md text-center">

          <div className="lg:hidden mb-8">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="w-10 h-10 bg-[#D35400] flex items-center justify-center">
                <span className="text-white font-bold text-[18px]">9</span>
              </div>
              <div className="text-left">
                <span className="font-bold text-[#1B4F72] text-[16px]">di Hajtek</span>
                <p className="text-[10px] text-gray-500">Services artisanaux</p>
              </div>
            </Link>
          </div>

          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10 text-red-600" />
          </div>

          <h2 className="text-[20px] font-bold text-[#1B4F72] mb-3">
            Lien invalide ou expiré
          </h2>
          
          <p className="text-[12px] text-gray-600 mb-6 leading-relaxed">
            Le lien de confirmation n'est plus valide ou a déjà été utilisé. Veuillez demander un nouveau lien de vérification.
          </p>

          {!resendSuccess ? (
            <button
              onClick={handleResend}
              disabled={isResending}
              className="w-full bg-[#1B4F72] hover:bg-[#D35400] text-white py-3 text-[13px] font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              {isResending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin" />
                  Envoi...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  Renvoyer l'email de confirmation
                </>
              )}
            </button>
          ) : (
            <div className="bg-green-50 border border-green-200 p-4 rounded">
              <p className="text-[12px] text-green-700 flex items-center gap-2 justify-center">
                <CheckCircle className="w-4 h-4" />
                Email envoyé ! Vérifiez votre boîte de réception.
              </p>
              {countdown > 0 && (
                <p className="text-[11px] text-gray-500 mt-2">
                  Vous pourrez renvoyer dans {countdown}s
                </p>
              )}
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-gray-100">
            <Link
              to="/auth/login"
              className="text-[12px] text-[#D35400] hover:text-[#A04000] font-medium"
            >
              Retour à la connexion
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EmailConfirmationPage;