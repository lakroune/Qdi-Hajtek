import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  Lock, ArrowRight, Eye, EyeOff, Check, Shield,
  Clock, AlertCircle, CheckCircle, XCircle
} from 'lucide-react';
import Input from '../components/inputs/Input';
import Logo from '../components/logo/Logo';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isValidToken, setIsValidToken] = useState(true);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });

  // Vérification du token (simulation)
  useEffect(() => {
    // Simulation vérification token
    const verifyToken = async () => {
      await new Promise(r => setTimeout(r, 500));
      // Si token invalide : setIsValidToken(false);
    };
    verifyToken();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.password) {
      setError('Veuillez entrer un nouveau mot de passe');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulation API
    await new Promise(r => setTimeout(r, 1500));

    console.log('Password reset:', token);
    setIsLoading(false);
    setIsSuccess(true);
    
    // Redirection après 3 secondes
    setTimeout(() => {
      navigate('/auth/login');
    }, 3000);
  };

  if (!isValidToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="max-w-md w-full bg-white p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-[20px] font-bold text-[#1B4F72] mb-2">Lien invalide ou expiré</h2>
          <p className="text-[12px] text-gray-600 mb-6">
            Ce lien de réinitialisation n'est plus valide. Veuillez demander un nouveau lien.
          </p>
          <Link
            to="/auth/forgot-password"
            className="inline-flex items-center justify-center w-full bg-[#1B4F72] hover:bg-[#D35400] text-white py-3 text-[13px] font-semibold transition-colors"
          >
            Demander un nouveau lien
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">

      {/* Left Side - Image & Info */}
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
              Créez un nouveau mot de passe
            </h1>
            <p className="text-[13px] text-white/80 leading-relaxed">
              Choisissez un mot de passe fort et unique pour sécuriser votre compte.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-[12px] text-white/90">
              <div className="w-8 h-8 bg-white/10 flex items-center justify-center">
                <Shield className="w-4 h-4 text-[#D35400]" />
              </div>
              <span>Minimum 8 caractères</span>
            </div>
            <div className="flex items-center gap-3 text-[12px] text-white/90">
              <div className="w-8 h-8 bg-white/10 flex items-center justify-center">
                <Shield className="w-4 h-4 text-[#D35400]" />
              </div>
              <span>Lettres et chiffres recommandés</span>
            </div>
            <div className="flex items-center gap-3 text-[12px] text-white/90">
              <div className="w-8 h-8 bg-white/10 flex items-center justify-center">
                <Clock className="w-4 h-4 text-[#D35400]" />
              </div>
              <span>Connexion automatique après</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-6 lg:p-12">
        <div className="w-full max-w-md">

          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
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

          {!isSuccess ? (
            <>
              {/* Header */}
              <div className="mb-8">
                <h2 className="text-[20px] font-bold text-[#1B4F72] mb-2">Nouveau mot de passe</h2>
                <p className="text-[12px] text-gray-500">
                  Entrez votre nouveau mot de passe ci-dessous.
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 flex items-center gap-2 text-[11px] text-red-600">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative">
                  <Input
                    label="Nouveau mot de passe"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    Icon={Lock}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[30px] text-gray-400 hover:text-[#D35400] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                <div className="relative">
                  <Input
                    label="Confirmer le mot de passe"
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    Icon={Lock}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-[30px] text-gray-400 hover:text-[#D35400] transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                <div className="bg-gray-50 p-3 text-[10px] text-gray-600 space-y-1">
                  <p className="font-medium text-gray-700">Votre mot de passe doit contenir :</p>
                  <ul className="space-y-1 ml-4">
                    <li className={formData.password.length >= 8 ? 'text-green-600' : ''}>
                      • Au moins 8 caractères
                    </li>
                    <li className={/[A-Z]/.test(formData.password) ? 'text-green-600' : ''}>
                      • Une lettre majuscule
                    </li>
                    <li className={/[0-9]/.test(formData.password) ? 'text-green-600' : ''}>
                      • Un chiffre
                    </li>
                  </ul>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#1B4F72] hover:bg-[#D35400] text-white py-3 text-[13px] font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin" />
                      Mise à jour...
                    </>
                  ) : (
                    <>
                      Réinitialiser le mot de passe
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            /* Success State */
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-[18px] font-bold text-[#1B4F72] mb-2">
                Mot de passe mis à jour !
              </h3>
              <p className="text-[12px] text-gray-600 mb-6 leading-relaxed">
                Votre mot de passe a été réinitialisé avec succès. Vous allez être redirigé vers la page de connexion.
              </p>
              <Link
                to="/auth/login"
                className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#D35400] hover:text-[#A04000] transition-colors"
              >
                Se connecter maintenant
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;