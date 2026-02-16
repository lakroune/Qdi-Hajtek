import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Eye, EyeOff, Check, Shield } from 'lucide-react';
import Logo from '../components/logo/Logo';
import Input from '../components/inputs/Input';
import Divider from '../components/border/Divider';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Tentative de connexion:', formData);
    alert("Connexion rencontrée (Consultez la console)");
  };

  return (
    <div className="min-h-screen flex">

      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900">
        <img
          src="/images/artisan-workspace.png" 
          alt="Artisan Workspace"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        <div className="relative z-10 flex flex-col justify-between p-12 text-white h-full">
          <Logo variant="light" className="flex items-center gap-3 w-full" />

          <div className="max-w-md">
            <h1 className="text-5xl font-bold leading-tight mb-6">
              Trouvez les meilleurs artisans près de chez vous.
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Connectez-vous pour gérer vos projets, contacter des professionnels
              et suivre vos interventions en temps réel.
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-orange-500" />
              <span>Paiement sécurisé</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-orange-500" />
              <span>Artisans vérifiés</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8 lg:p-16">
        <div className="w-full max-w-md">

          <div className="lg:hidden mb-8">
            <Logo variant="default" className="flex items-center gap-3" />
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Connexion</h2>
            <p className="text-gray-500 font-light">
              Ravi de vous revoir ! Entrez vos identifiants pour accéder à votre espace.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Adresse Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="exemple@email.com"
              Icon={Mail}
            />

            <div className="relative">
              <Input
                label="Mot de passe"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
                Icon={Lock}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[38px] text-gray-400 hover:text-orange-500 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                  Se souvenir de moi
                </span>
              </label>
              <a href="#" className="text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors">
                Mot de passe oublié ?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-gray-200"
            >
              Se connecter
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <Divider text="ou se connecter avec" className="my-8" />

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-3 px-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all text-sm font-medium text-gray-700">
              Google
            </button>
            <button className="flex items-center justify-center gap-3 py-3 px-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all text-sm font-medium text-gray-700">
              Facebook
            </button>
          </div>

          <p className="mt-8 text-center text-gray-600">
            Vous n'avez pas de compte ?{' '}
            <Link to="/register" className="font-bold text-orange-600 hover:text-orange-700 transition-colors">
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;