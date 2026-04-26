import React, { useState } from 'react';
import { Link, useParams, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Lock, ArrowRight, Eye, EyeOff, Check, Shield,
  Clock, AlertCircle, CheckCircle, XCircle
} from 'lucide-react';
import Input from '../components/inputs/Input';
import Logo from '../components/logo/Logo';
import axiosClient from '../api/axios-client';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    setError('');

    try {
      await axiosClient.post('/reset-password', {
        token,
        email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
      });

      setIsSuccess(true);
      setTimeout(() => navigate('/auth/login'), 3000);

    } catch (err) {
      const msg = err.response?.data?.message;
      const validationErrors = err.response?.data?.errors;

      if (validationErrors) {
        const firstError = Object.values(validationErrors)[0][0];
        setError(firstError);
      } else {
        setError(msg || 'Une erreur est survenue. Veuillez réessayer.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!token || !email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="max-w-md w-full bg-white p-8 text-center">
          <div className="w-16 h-16 bg-red-100 flex items-center justify-center mx-auto mb-4">
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
            {[
              { icon: Shield, text: 'Minimum 8 caractères' },
              { icon: Shield, text: 'Lettres et chiffres recommandés' },
              { icon: Clock, text: 'Connexion automatique après reset' },
            ].map(({ icon: Icon, text }, i) => (
              <div key={i} className="flex items-center gap-3 text-[12px] text-white/90">
                <div className="w-8 h-8 bg-white/10 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-[#D35400]" />
                </div>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-6 lg:p-12">
        <div className="w-full max-w-md">

          {!isSuccess ? (
            <>
              <div className="mb-8">
                <h2 className="text-[20px] font-bold text-[#1B4F72] mb-1">Nouveau mot de passe</h2>
                <p className="text-[12px] text-gray-500">
                  Compte : <span className="font-medium text-[#1B4F72]">{email}</span>
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 flex items-center gap-2 text-[11px] text-red-600">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

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
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-[18px] font-bold text-[#1B4F72] mb-2">
                Mot de passe mis à jour !
              </h3>
              <p className="text-[12px] text-gray-600 mb-2 leading-relaxed">
                Votre mot de passe a été réinitialisé avec succès.
              </p>
              <p className="text-[11px] text-gray-400 mb-8">
                Redirection automatique dans 3 secondes...
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