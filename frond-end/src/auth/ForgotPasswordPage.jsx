import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/logo/Logo';
import { Mail, ArrowRight, Check, Shield, Clock, ArrowLeft } from 'lucide-react';
import Divider from '../components/border/Divider';
import LinkFooter from '../components/links/LinkFooter';
import Input from '../components/inputs/Input';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Veuillez entrer un email valide');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      console.log('Demande de réinitialisation pour:', email);
      setIsSubmitted(true);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900">
        <img
          src="/images/artisan-workspace.png"
          alt="Artisan workspace"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        <div className="relative z-10 flex flex-col justify-between p-12 text-white h-full">
          <Logo className='flex items-center gap-3' variant='light' />

          <div className="max-w-md">
            <h1 className="text-5xl font-bold leading-tight mb-6">
              Réinitialisez votre mot de passe en toute sécurité.
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Ne vous inquiétez pas, nous vous aidons à retrouver l'accès à votre compte rapidement et en toute sécurité.
            </p>

            <div className="flex gap-8 mt-8">
              <div><p className="text-3xl font-bold text-orange-500">10K+</p><p className="text-sm text-gray-400">Artisans</p></div>
              <div><p className="text-3xl font-bold text-orange-500">50K+</p><p className="text-sm text-gray-400">Clients</p></div>
              <div><p className="text-3xl font-bold text-orange-500">4.8</p><p className="text-sm text-gray-400">Note moyenne</p></div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-orange-500" /><span>Sécurisé</span></div>
            <div className="flex items-center gap-2"><Check className="w-4 h-4 text-orange-500" /><span>Vérifié</span></div>
            <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-orange-500" /><span>24/7 Support</span></div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-md py-8">
          <Logo className='lg:hidden flex items-center gap-3 mb-8' variant='default' />

          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-orange-600 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à la connexion
          </Link>

          {!isSubmitted ? (
            <>
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Mot de passe oublié ?</h2>
                <p className="text-gray-500 font-light">
                  Entrez votre email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    placeholder="votre@email.com"
                    Icon={Mail}
                  />
                  {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gray-900 hover:bg-orange-600 disabled:bg-gray-400 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-md"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Envoyer le lien
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              <Divider text="Ou" />

              <p className="text-center text-gray-600">
                Vous vous souvenez de votre mot de passe ?{' '}
                <Link to="/login" className="font-bold text-orange-600 hover:text-orange-700 transition-colors">
                  Se connecter
                </Link>
              </p>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Email envoyé !</h2>
              <p className="text-gray-600 mb-8">
                Nous avons envoyé un lien de réinitialisation à <strong>{email}</strong>.
                Vérifiez votre boîte de réception et suivez les instructions.
              </p>
              <div className="space-y-3">
                <Link
                  to="/login"
                  className="block w-full bg-gray-900 hover:bg-orange-600 text-white py-4 rounded-xl font-semibold transition-all"
                >
                  Retour à la connexion
                </Link>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setEmail('');
                  }}
                  className="block w-full py-3 text-gray-600 hover:text-orange-600 font-medium transition-colors"
                >
                  Renvoyer l'email
                </button>
              </div>
            </div>
          )}

          <LinkFooter array={[{ name: 'Terms', link: '#' }, { name: 'Privacy', link: '#' }]} />
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;