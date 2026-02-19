import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    Mail, Lock, ArrowRight, Eye, EyeOff, 
    Check, Shield, AlertCircle 
} from 'lucide-react';
import Input from '../components/inputs/Input';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
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
        // Clear error on type
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!formData.email || !formData.password) {
            setError('Veuillez remplir tous les champs');
            return;
        }

        setIsLoading(true);
        
        // Simulation API
        await new Promise(r => setTimeout(r, 1500));
        
        console.log('Connexion:', formData);
        setIsLoading(false);
        // Redirection vers dashboard
    };

    return (
        <div className="min-h-screen flex">

            {/* Left Side - Image & Info */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-[#1B4F72]">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}></div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#1B4F72]/50 to-transparent"></div>

                <div className="relative z-10 flex flex-col justify-between p-12 text-white h-full">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#D35400] flex items-center justify-center">
                            <span className="text-white font-bold text-[18px]">9</span>
                        </div>
                        <div>
                            <span className="font-bold text-white text-[16px] tracking-tight">di Hajtek</span>
                            <p className="text-[10px] text-white/70">Services artisanaux</p>
                        </div>
                    </Link>

                    {/* Content */}
                    <div className="max-w-md">
                        <h1 className="text-[28px] font-bold leading-tight mb-4 text-white">
                            Trouvez les meilleurs artisans près de chez vous
                        </h1>
                        <p className="text-[13px] text-white/80 leading-relaxed">
                            Connectez-vous pour gérer vos projets, contacter des professionnels 
                            et suivre vos interventions en temps réel.
                        </p>
                    </div>

                    {/* Features */}
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

                    {/* Header */}
                    <div className="mb-8">
                        <h2 className="text-[20px] font-bold text-[#1B4F72] mb-2">Connexion</h2>
                        <p className="text-[12px] text-gray-500">
                            Ravi de vous revoir ! Entrez vos identifiants pour accéder à votre espace.
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
                        
                        {/* Email */}
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

                        {/* Password */}
                        <div className="relative">
                            <Input
                                label="Mot de passe"
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

                        {/* Remember & Forgot */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={formData.remember}
                                    onChange={handleChange}
                                    className="w-4 h-4 border-gray-300 text-[#D35400] focus:ring-[#D35400]"
                                />
                                <span className="text-[11px] text-gray-600 group-hover:text-[#1B4F72] transition-colors">
                                    Se souvenir de moi
                                </span>
                            </label>
                            <Link 
                                to="/forgot-password" 
                                className="text-[11px] font-medium text-[#D35400] hover:text-[#A04000] transition-colors"
                            >
                                Mot de passe oublié ?
                            </Link>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#1B4F72] hover:bg-[#D35400] text-white py-3 text-[13px] font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
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

                    {/* Divider */}
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

                    {/* Social Login */}
                    <div className="grid grid-cols-2 gap-3">
                        <button 
                            type="button"
                            className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 hover:border-[#1B4F72] transition-colors text-[11px] font-medium text-gray-700 hover:text-[#1B4F72]"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            Google
                        </button>
                        <button 
                            type="button"
                            className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 hover:border-[#1B4F72] transition-colors text-[11px] font-medium text-gray-700 hover:text-[#1B4F72]"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                            Facebook
                        </button>
                    </div>

                    {/* Register Link */}
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