import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail, ArrowRight, ArrowLeft, Check, Shield,
  Clock, AlertCircle
} from 'lucide-react';
import Input from '../components/inputs/Input';
import Logo from '../components/logo/Logo';
import axiosClient from '../api/axios-client';

const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email) {
      setError('Veuillez entrer votre adresse email');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await axiosClient.post('/forget-password', {
        email: formData.email
      });
      setIsSubmitted(true);
    } catch (err) {
      const msg = err.response?.data?.message;
      setError(msg || 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

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
              Récupérez l'accès à votre compte
            </h1>
            <p className="text-[13px] text-white/80 leading-relaxed">
              Ne vous inquiétez pas, nous vous enverrons les instructions pour réinitialiser votre mot de passe en toute sécurité.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { icon: Shield, text: 'Lien sécurisé et crypté' },
              { icon: Clock, text: 'Validité du lien : 24 heures' },
              { icon: Check, text: 'Support disponible 24h/24' },
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

          <Link
            to="/auth/login"
            className="inline-flex items-center gap-2 text-[11px] text-gray-500 hover:text-[#D35400] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à la connexion
          </Link>

          {!isSubmitted ? (
            <>
              <div className="mb-8">
                <h2 className="text-[20px] font-bold text-[#1B4F72] mb-2">Mot de passe oublié ?</h2>
                <p className="text-[12px] text-gray-500">
                  Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 flex items-center gap-2 text-[11px] text-red-600">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  label="Adresse Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="exemple@email.com"
                  Icon={Mail}
                  required
                />

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#1B4F72] hover:bg-[#D35400] text-white py-3 text-[13px] font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Envoyer le lien
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto mb-6">
                <Mail className="w-7 h-7 text-green-500" />
              </div>

              <h3 className="text-[18px] font-bold text-[#1B4F72] mb-2">Email envoyé !</h3>
              <p className="text-[12px] text-gray-600 mb-3 leading-relaxed">
                Si un compte existe avec <strong>{formData.email}</strong>, vous recevrez un email avec les instructions pour réinitialiser votre mot de passe.
              </p>
              <p className="text-[11px] text-gray-400 mb-8">
                Vérifiez votre dossier spam si vous ne trouvez pas l'email.
              </p>

              <button
                onClick={() => { setIsSubmitted(false); setFormData({ email: '' }); }}
                className="text-[11px] text-gray-400 hover:text-gray-600 underline underline-offset-2 mb-4 block mx-auto transition-colors"
              >
                Essayer avec une autre adresse
              </button>

              <Link
                to="/auth/login"
                className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#D35400] hover:text-[#A04000] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Retour à la connexion
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;