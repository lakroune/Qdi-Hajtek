import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail, Lock, ArrowRight, Eye, EyeOff,
  Check, Shield, AlertCircle
} from 'lucide-react';
import Input from '../components/inputs/Input';
import Logo from '../components/logo/Logo';
import axiosClient from "../api/axios-client";
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
  const [afficherMotDePasse, setAfficherMotDePasse] = useState(false);
  const [estEnChargement, setEstEnChargement] = useState(false);
  const [erreur, setErreur] = useState('');
  const navigate = useNavigate();

  const [donneesFormulaire, setDonneesFormulaire] = useState({
    email: '',
    password: '',
    seSouvenirDeMoi: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDonneesFormulaire(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (erreur) setErreur('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEstEnChargement(true);


    try {
      const { data } = await axiosClient.post('/login', {
        email: donneesFormulaire.email,
        password: donneesFormulaire.password
      });

      localStorage.setItem('ACCESS_TOKEN', data.token);
      localStorage.setItem('USER_DATA', JSON.stringify(data.user));

      if (data.user.role === 'artisan') {
        navigate('/artisan/dashboard');
      } else {
        navigate('/client/dashboard');
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setErreur(err.response.data.message);
      } else {
        setErreur('Erreur de connexion au serveur');
      }
    } finally {
      setEstEnChargement(false);
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
              Trouvez les meilleurs artisans près de chez vous
            </h1>
            <p className="text-[13px] text-white/80 leading-relaxed">
              Connectez-vous pour gérer vos projets, contacter des professionnels
              et suivre vos interventions en temps réel.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-[12px] text-white/90">
              <div className="w-8 h-8 bg-white/10 flex items-center justify-center">
                <Shield className="w-4 h-4 text-[#D35400]" />
              </div>
              <span>Paiement sécurisé et garanti</span>
            </div>
            <div className="flex items-center gap-3 text-[12px] text-white/90">
              <div className="w-8 h-8 bg-white/10 flex items-center justify-center">
                <Check className="w-4 h-4 text-[#D35400]" />
              </div>
              <span>Artisans vérifiés et notés</span>
            </div>
            <div className="flex items-center gap-3 text-[12px] text-white/90">
              <div className="w-8 h-8 bg-white/10 flex items-center justify-center">
                <Check className="w-4 h-4 text-[#D35400]" />
              </div>
              <span>Intervention rapide 24h/24</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-6 lg:p-12">
        <div className="w-full max-w-md">

          <div className="mb-8">
            <h2 className="text-[20px] font-bold text-[#1B4F72] mb-2">Connexion</h2>
            <p className="text-[12px] text-gray-500">
              Ravi de vous revoir ! Entrez vos identifiants pour accéder à votre espace.
            </p>
          </div>

          {erreur && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 flex items-center gap-2 text-[11px] text-red-600">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {erreur}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <Input
              label="Adresse Email"
              type="email"
              name="email"
              value={donneesFormulaire.email}
              onChange={handleChange}
              placeholder="exemple@email.com"
              Icon={Mail}
              required
            />

            <div className="relative">
              <Input
                label="Mot de passe"
                type={afficherMotDePasse ? 'text' : 'password'}
                name="password"
                value={donneesFormulaire.password}
                onChange={handleChange}
                placeholder="••••••••"
                Icon={Lock}
                required
              />
              <button
                type="button"
                onClick={() => setAfficherMotDePasse(!afficherMotDePasse)}
                className="absolute right-3 top-[30px] text-gray-400 hover:text-[#D35400] transition-colors"
              >
                {afficherMotDePasse ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  name="seSouvenirDeMoi"
                  checked={donneesFormulaire.seSouvenirDeMoi}
                  onChange={handleChange}
                  className="w-4 h-4 border-gray-300 text-[#D35400] focus:ring-[#D35400]"
                />
                <span className="text-[11px] text-gray-600 group-hover:text-[#1B4F72] transition-colors">
                  Se souvenir de moi
                </span>
              </label>
              <Link
                to="/auth/forgot-password"
                className="text-[11px] font-medium text-[#D35400] hover:text-[#A04000] transition-colors"
              >
                Mot de passe oublié ?
              </Link>
            </div>

            <button
              type="submit"
              disabled={estEnChargement}
              className="w-full bg-[#1B4F72] hover:bg-[#D35400] text-white py-3 text-[13px] font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {estEnChargement ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin" />
                  Connexion...
                </>
              ) : (
                <>
                  Se connecter
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-white text-[10px] text-gray-400 uppercase">
                Ou continuer avec
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 hover:border-[#1B4F72] transition-colors text-[11px] font-medium text-gray-700 hover:text-[#1B4F72]"
            >
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 hover:border-[#1B4F72] transition-colors text-[11px] font-medium text-gray-700 hover:text-[#1B4F72]"
            >
              Facebook
            </button>
          </div>

          <p className="mt-8 text-center text-[12px] text-gray-600">
            Vous n'avez pas de compte ?{' '}
            <Link
              to="/auth/register"
              className="font-semibold text-[#D35400] hover:text-[#A04000] transition-colors"
            >
              Créer un compte
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;