import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/logo/Logo';
import { Mail, Lock, ArrowRight, Check, Shield, Clock, User, Eye, EyeOff } from 'lucide-react';
import Divider from '../components/border/Divider';
import LinkFooter from '../components/links/LinkFooter';
import Input from '../components/inputs/Input';

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
        }
        if (formData.password.length < 8) {
            newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
        }
        if (!formData.acceptTerms) {
            newErrors.terms = 'Vous devez accepter les conditions';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        console.log('Données d\'inscription:', { ...formData, userType });
        alert("Inscription réussie (Consultez la console)");
    };

    return (
        <div className="min-h-screen flex">
            <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900">
                <img
                    src="/images/artisan-workspace.png" // 
                    alt="Artisan workspace"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                <div className="relative z-10 flex flex-col justify-between p-12 text-white h-full">
                    <Logo className='flex items-center gap-3' variant='default' />

                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold leading-tight mb-6">
                            Rejoignez notre communauté d'artisans et de clients.
                        </h1>
                        <p className="text-gray-300 text-lg leading-relaxed mb-8">
                            Créez votre compte en quelques minutes et accédez à des milliers de services professionnels partout au Maroc.
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
                    
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Créer un compte</h2>
                        <p className="text-gray-500 font-light">Simple, rapide et gratuit.</p>
                    </div>

                   

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="Prénom" type="text" name="prenom" value={formData.prenom} onChange={handleInputChange} placeholder="Prénom" Icon={User} />
                            <Input label="Nom" type="text" name="nom" value={formData.nom} onChange={handleInputChange} placeholder="Nom" Icon={User} />
                        </div>

                        <Input label="Email" type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="votre@email.com" Icon={Mail} />

                        <div className="relative">
                            <Input 
                                label="Mot de passe" 
                                type={showPassword ? 'text' : 'password'} 
                                name="password" 
                                value={formData.password} 
                                onChange={handleInputChange} 
                                placeholder="*********" 
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
                        {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}

                        <Input 
                            label="Confirmer le mot de passe" 
                            type="password" 
                            name="confirmPassword" 
                            value={formData.confirmPassword} 
                            onChange={handleInputChange} 
                            placeholder="*********" 
                            Icon={Lock} 
                        />
                        {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}

                        <div className="flex flex-col gap-2">
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    name="acceptTerms"
                                    checked={formData.acceptTerms}
                                    onChange={handleInputChange}
                                    className="w-5 h-5 mt-0.5 accent-orange-500 rounded border-gray-300"
                                />
                                <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                                    J'accepte les <a href="#" className="text-orange-600 underline font-medium">Conditions</a> et la <a href="#" className="text-orange-600 underline font-medium">Politique de confidentialité</a>
                                </span>
                            </label>
                            {errors.terms && <p className="text-xs text-red-500">{errors.terms}</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gray-900 hover:bg-orange-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98] mt-6 shadow-md"
                        >
                            Créer mon compte
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </form>

                    <Divider text="Ou continuer avec" />

                    <div className="mt-6 grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-3 py-3 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all">
                            <span className="text-sm font-medium text-gray-700">Google</span>
                        </button>
                        <button className="flex items-center justify-center gap-3 py-3 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all">
                            <span className="text-sm font-medium text-gray-700">Facebook</span>
                        </button>
                    </div>

                    <p className="mt-8 text-center text-gray-600">
                        Vous avez déjà un compte ?{' '}
                        <Link to="/login" className="font-bold text-orange-600 hover:text-orange-700 transition-colors">Se connecter</Link>
                    </p>

                    <LinkFooter array={[{ name: 'Terms', link: '#' }, { name: 'Privacy', link: '#' }]} />
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;