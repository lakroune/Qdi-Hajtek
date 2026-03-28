import React, { useEffect, useState } from 'react';
import { data, Link } from 'react-router-dom';
import {
    Mail, Lock, ArrowRight, Check, Shield,
    Clock, User, Eye, EyeOff, AlertCircle,
    MapPin,
    IdCard,
    ClipboardType,
    LocationEdit,
    LocateOffIcon,
    Locate
} from 'lucide-react';
import Input from '../components/inputs/Input';
import Logo from '../components/logo/Logo';

import axiosClient from "../api/axios-client";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const RegisterPage = () => {
    const [formData, setFromData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        password_confirmation: '',
        city: '',
        cin: '',
        termes: false
    })

    const [errors, setErrors] = useState({});
    const [afficherMotDePasse, setAfficherMotDePasse] = useState(false);
    const [estchargement, setEstChargement] = useState(false);
    const [villes, setVilles] = useState([]);
    const navigate = useNavigate();

    const changeFormDate = (e) => {
        const { name, value, type, checked } = e.target;

        setFromData((data) => {
            return {
                ...data,
                [name]: type === 'checkbox' ? checked : value
            }
        })

    }

    const validation = () => {
        const newErrors = {};
        if (formData.firstname.trim() === '') newErrors.firstname = "Le prenom est requis";
        if (formData.lastname.trim() === '') newErrors.lastname = "Le nom est requis";
        if (formData.email.trim() === '') newErrors.email = "L'email est requis";
        if (formData.password.trim() === '') newErrors.password = "Le mot de passe est requis";
        if (formData.password.length < 8) newErrors.password = "Le mot de passe doit contenir au moins 8 caractères";
        if (formData.password !== formData.password_confirmation) newErrors.password_confirmation = "Les mots de passe ne correspondent pas";
        if (formData.city.trim() === '') newErrors.city = "La ville est requise";
        if (formData.cin.trim() === '') newErrors.cin = "Le cin est requis";
        if (!formData.termes) newErrors.termes = "Veuillez accepter les termes et conditions";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }


    const submitData = async (e) => {
        e.preventDefault();

        if (!validation()) return;

        try {
            setEstChargement(true);
            const response = await axiosClient.post('/register', formData);
            if (response.status === 201) {
                setEstChargement(false);
                Cookies.set('ACCESS_TOKEN', response.data.token, {
                    expires: 7,
                    secure: true,
                    sameSite: 'strict'
                })
                Cookies.set('USER_DATA', JSON.stringify(response.data.user), { expires: 7 });
                console.log(response.data.user);
                navigate('/auth/confirme-email');
            }
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setEstChargement(false);
                setErrors(error.response.data.data || {});
            }
        }
    }

    useEffect(() => {
        const fetchVilles = async () => {
            try {
                const response = await axiosClient.get('/villes');
                setVilles(response.data);
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };
        fetchVilles();
    }, []);



    return (
        <div className="min-h-screen flex">
            <div className="hidden lg:flex lg:w-1/2 relative bg-[#1b4f72e0]">
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

                    </div>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-6 lg:p-12 overflow-y-auto">
                <div className="w-full max-w-md py-8">

                    <div className="lg:hidden mb-8">
                        <Link to="/" className="inline-flex items-center gap-3">
                            <Logo />
                        </Link>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-[20px] font-bold text-[#1B4F72] mb-2">Créer un compte</h2>
                        <p className="text-[12px] text-gray-500">Simple, rapide et gratuit.</p>
                    </div>

                    <form onSubmit={submitData} method="POST" className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <Input
                                label="Prénom"
                                name="firstname"
                                value={formData.firstname}
                                onChange={changeFormDate}
                                placeholder="Prénom"
                                Icon={User}
                                error={errors.firstname}
                            />
                            <Input
                                label="Nom"
                                name="lastname"
                                value={formData.lastname}
                                onChange={changeFormDate}
                                placeholder="Nom"
                                Icon={User}
                                error={errors.lastname}
                            />
                        </div>

                        <Input
                            label="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={changeFormDate}
                            placeholder="votre@email.com"
                            Icon={Mail}
                            error={errors.email}
                        />

                        <div className="grid md:grid-cols-2 gap-3">
                            <Input
                                label="CIN"
                                type="text"
                                name="cin"
                                value={formData.cin}
                                onChange={changeFormDate}
                                placeholder="AB123456"
                                Icon={IdCard}
                                error={errors.cin}
                            />

                            <div>
                                <label className="block text-[11px] font-medium text-[#1B4F72] mb-1.5">
                                    Ville
                                    <span className="text-[#D35400] ml-1">*</span>
                                </label>

                                <div className="relative flex">

                                    <Locate className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />

                                    <select
                                        value={formData.city}
                                        onChange={(e) => setFromData({ ...formData, city: e.target.value })}
                                        className=" w-full pl-9  pr-3 py-2 text-[12px] border border-gray-200 text-[#1B4F72] placeholder-gray-400 focus:outline-none focus:border-[#D35400] transition-colors "
                                    >
                                        <option value="">choisissez votre ville</option>
                                        {villes.map((ville) => (
                                            <option key={ville.id} value={ville.ville}>
                                                {ville.ville}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <Input
                                label="Mot de passe"
                                type={afficherMotDePasse ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={changeFormDate}
                                placeholder="************"
                                Icon={Lock}
                                error={errors.password}
                            />
                            <button
                                type="button"
                                onClick={() => setAfficherMotDePasse(!afficherMotDePasse)}
                                className="absolute right-3 top-[30px] text-gray-400 hover:text-[#D35400] transition-colors"
                            >
                                {afficherMotDePasse ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>

                        <Input
                            label="Confirmer le mot de passe"
                            type="password"
                            name="password_confirmation"
                            value={formData.password_confirmation}
                            onChange={changeFormDate}
                            placeholder="************"
                            Icon={Lock}
                            error={errors.password_confirmation}
                        />

                        <div>
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="termes"
                                    checked={formData.termes}
                                    onChange={changeFormDate}
                                    className="w-4 h-4 mt-0.5 border-gray-300 text-[#D35400] focus:ring-[#D35400]"
                                />
                                <span className="text-[11px] text-gray-600 leading-relaxed">
                                    J'accepte les{' '}
                                    <Link to="/terms" className="text-[#D35400] hover:underline">Conditions d'utilisation</Link>
                                    {' '}et la{' '}
                                    <Link to="/privacy" className="text-[#D35400] hover:underline">Politique de confidentialité</Link>
                                </span>
                            </label>
                            {errors.termes && (
                                <p className="mt-1 text-[10px] text-red-500 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" /> {errors.termes}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={estchargement}
                            className="w-full py-3 text-[13px] font-semibold flex items-center justify-center gap-2 transition-colors bg-[#1B4F72] hover:bg-[#D35400] text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {estchargement ? (
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

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="px-4 bg-white text-[10px] text-gray-400 uppercase">Ou continuer avec</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 hover:border-[#1B4F72] transition-colors text-[11px] font-medium text-gray-700">
                            Google
                        </button>
                        <button className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 hover:border-[#1B4F72] transition-colors text-[11px] font-medium text-gray-700">
                            Facebook
                        </button>
                    </div>

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