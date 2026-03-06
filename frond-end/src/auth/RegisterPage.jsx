import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Mail, Lock, ArrowRight, Check, Shield,
    Clock, User, Eye, EyeOff, AlertCircle,
    Briefcase, MapPin
} from 'lucide-react';
import Input from '../components/inputs/Input';
import Logo from '../components/logo/Logo';

import axiosClient from "../api/axios-client";
import { useNavigate } from 'react-router-dom';


const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [userType, setUserType] = useState('client'); // client | artisan
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        city: '',
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

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) newErrors.firstName = 'Prénom requis';
        if (!formData.lastName.trim()) newErrors.lastName = 'Nom requis';
        if (!formData.email.trim()) newErrors.email = 'Email requis';
        if (!formData.phone.trim()) newErrors.phone = 'Téléphone requis';
        if (!formData.city.trim()) newErrors.city = 'Ville requise';

        if (!formData.password) {
            newErrors.password = 'Mot de passe requis';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Minimum 8 caractères';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
        }

        if (!formData.acceptTerms) {
            newErrors.terms = 'Vous devez accepter les conditions';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        setErrors({});

        try {
            const payload = {
                nom: formData.lastName,
                prenom: formData.firstName,
                email: formData.email,
                phone: formData.phone,
                city: formData.city,
                password: formData.password,
                password_confirmation: formData.confirmPassword,
                role: userType
            };

            const { data } = await axiosClient.post('/register', payload);

            localStorage.setItem('ACCESS_TOKEN', data.token);
            localStorage.setItem('USER_DATA', JSON.stringify(data.user));

            navigate('/confirm-email');

        } catch (err) {
            if (err.response && err.response.data.errors) {

                const serverErrors = err.response.data.errors;
                const formattedErrors = {};

                if (serverErrors.email) formattedErrors.email = serverErrors.email[0];
                if (serverErrors.password) formattedErrors.password = serverErrors.password[0];
                if (serverErrors.nom) formattedErrors.lastName = serverErrors.nom[0];
                if (serverErrors.prenom) formattedErrors.firstName = serverErrors.prenom[0];

                setErrors(formattedErrors);
            } else {
                console.error("Erreur :", err);
            }
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="min-h-screen flex">
            {/* Left Side */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-[#1b4f72e0]  ">


                <div className="fixed z-10 flex flex-col justify-between p-12 w-1/2 text-white h-full bg-gray-900/60 bg-blend-overlay"
                    style={{
                        backgroundImage: `url("/images/artisan-workspace.png")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}>
                    <Link to="/" className="flex items-center gap-3">
                        <Logo />
                    </Link>

                    <div className="max-w-md">
                        <h1 className="text-[28px] font-bold leading-tight mb-4">
                            Rejoignez notre communauté
                        </h1>
                        <p className="text-[13px] text-white/80 leading-relaxed mb-8">
                            Créez votre compte en quelques minutes et accédez à des milliers de services professionnels partout au Maroc.
                        </p>


                    </div>

                    <div className="space-y-3 flex gap-2">
                        <div className="flex items-center gap-3 text-[12px] text-white/90">
                            <div className="w-8 h-8 bg-white/10 flex items-center justify-center">
                                <Shield className="w-4 h-4 text-[#D35400]" />
                            </div>
                            <span>Paiement sécurisé</span>
                        </div>
                        <div className="flex items-center gap-3 text-[12px] text-white/90">
                            <div className="w-8 h-8 bg-white/10 flex items-center justify-center">
                                <Check className="w-4 h-4 text-[#D35400]" />
                            </div>
                            <span>Profils vérifiés</span>
                        </div>
                        <div className="flex items-center gap-3 text-[12px] text-white/90">
                            <div className="w-8 h-8 bg-white/10 flex items-center justify-center">
                                <Clock className="w-4 h-4 text-[#D35400]" />
                            </div>
                            <span>Support 24/7</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-6 lg:p-12 overflow-y-auto">
                <div className="w-full max-w-md py-8">

                    {/* Mobile Logo */}
                    <div className="lg:hidden mb-8  ">
                        <Link to="/" className="inline-flex items-center gap-3">
                            <Logo />
                        </Link>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-[20px] font-bold text-[#1B4F72] mb-2">Créer un compte</h2>
                        <p className="text-[12px] text-gray-500">Simple, rapide et gratuit.</p>
                    </div>



                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div className="grid grid-cols-2 gap-3">
                            <Input
                                label="Prénom"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                placeholder="Prénom"
                                Icon={User}
                                error={errors.firstName}
                            />
                            <Input
                                label="Nom"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                placeholder="Nom"
                                Icon={User}
                                error={errors.lastName}
                            />
                        </div>

                        {/* Email */}
                        <Input
                            label="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="votre@email.com"
                            Icon={Mail}
                            error={errors.email}
                        />

                        {/* Phone */}
                        <Input
                            label="Téléphone"
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+212 6 XX XX XX XX"
                            Icon={MapPin}
                            error={errors.phone}
                        />

                        {/* City */}
                        <Input
                            label="Ville"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="Ex: Casablanca"
                            Icon={MapPin}
                            error={errors.city}
                        />

                        {/* Password */}
                        <div className="relative">
                            <Input
                                label="Mot de passe"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="••••••••"
                                Icon={Lock}
                                error={errors.password}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-[30px] text-gray-400 hover:text-[#D35400] transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>

                        {/* Confirm Password */}
                        <Input
                            label="Confirmer le mot de passe"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="••••••••"
                            Icon={Lock}
                            error={errors.confirmPassword}
                        />

                        {/* Terms */}
                        <div>
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="acceptTerms"
                                    checked={formData.acceptTerms}
                                    onChange={handleInputChange}
                                    className="w-4 h-4 mt-0.5 border-gray-300 text-[#D35400] focus:ring-[#D35400]"
                                />
                                <span className="text-[11px] text-gray-600 leading-relaxed">
                                    J'accepte les{' '}
                                    <Link to="/terms" className="text-[#D35400] hover:underline">Conditions d'utilisation</Link>
                                    {' '}et la{' '}
                                    <Link to="/privacy" className="text-[#D35400] hover:underline">Politique de confidentialité</Link>
                                </span>
                            </label>
                            {errors.terms && (
                                <p className="mt-1 text-[10px] text-red-500 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" /> {errors.terms}
                                </p>
                            )}
                        </div>

                        {/* submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`
                                w-full py-3 text-[13px] font-semibold flex items-center justify-center gap-2 transition-colors
                                     bg-[#1B4F72] hover:bg-[#D35400]
                                text-white disabled:opacity-50 disabled:cursor-not-allowed
                            `}
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin" />
                                    Création...
                                </>
                            ) : (
                                <>
                                    Créer mon compte
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

                    {/* Social */}
                    <div className="grid grid-cols-2 gap-3">
                        <button className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 hover:border-[#1B4F72] transition-colors text-[11px] font-medium text-gray-700">
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Google
                        </button>
                        <button className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 hover:border-[#1B4F72] transition-colors text-[11px] font-medium text-gray-700">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            Facebook
                        </button>
                    </div>

                    {/* Login Link */}
                    <p className="mt-6 text-center text-[12px] text-gray-600">
                        Vous avez déjà un compte ?{' '}
                        <Link to="/auth/login" className="font-semibold text-[#D35400] hover:text-[#A04000] transition-colors">
                            Se connecter
                        </Link>
                    </p>


                </div>
            </div>
        </div>
    );
};

export default RegisterPage;