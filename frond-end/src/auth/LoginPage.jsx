import { useState } from 'react';
import { Mail, UserCircle,Lock, ArrowRight, Eye, EyeOff, Check, Shield, Star, Clock, Award } from 'lucide-react';
import Logo from '../components/logo/Logo';
import Input from '../components/inputs/Input';
import Select from '../components/selects/Select';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const accountTypes = [
    { value: 'client', label: 'Client (Je cherche un service)' },
    { value: 'artisan', label: 'Artisan (Je propose mes services)' }
  ];

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login Data:', formData);
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&auto=format&fit=crop&q=80"
          alt="Artisan"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="relative z-10 flex flex-col justify-between p-12 text-white h-full">
          <Logo variant="default" className="flex items-center gap-3 w-full" />
          <div className="max-w-md">
            <h1 className="text-5xl font-bold leading-tight mb-6">Trouvez les meilleurs artisans près de chez vous.</h1>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <Shield className="w-4 h-4 text-orange-500" /> <span>Paiement sécurisé</span>
            <Check className="w-4 h-4 text-orange-500" /> <span>Artisans vérifiés</span>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8 lg:p-16">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Connexion</h2>
            <p className="text-gray-500">Bienvenue ! Entrez vos identifiants.</p>
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
                placeholder="••••••••"
                Icon={Lock}
              />
              <Select
                label="Type de compte"
                name="role"
                value={formData.role}
                onChange={handleChange}
                options={accountTypes}
                Icon={UserCircle}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[3.2rem] text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.remember}
                onChange={(e) => handleChange('remember', e.target.checked)}
                className="w-5 h-5 accent-orange-500"
              />
              <span className="text-sm text-gray-600">Se souvenir de moi</span>
            </label>

            <button type="submit" className="w-full bg-gray-900 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2">
              Se connecter <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;