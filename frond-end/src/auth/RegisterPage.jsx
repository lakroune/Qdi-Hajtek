import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Mail, Lock, ArrowRight, Check, Shield,
    Clock, User, Eye, EyeOff, AlertCircle,
    MapPin
} from 'lucide-react';
import Input from '../components/inputs/Input';
import Logo from '../components/logo/Logo';

import axiosClient from "../api/axios-client";
import { useNavigate } from 'react-router-dom';


const RegisterPage = () => {
    const navigate = useNavigate();
    const [afficherMotDePasse, setAfficherMotDePasse] = useState(false);
    const [estEnChargement, setEstEnChargement] = useState(false);

    const [donneesFormulaire, setDonneesFormulaire] = useState({
        prenom: '',
        nom: '',
        email: '',
        telephone: '',
        ville: '',
        password: '',
        password_confirmation: '',
        accepterTermes: false
    });

    const [erreurs, setErreurs] = useState({});

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setDonneesFormulaire(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (erreurs[name]) {
            setErreurs(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validerFormulaire = () => {
        const nouvellesErreurs = {};

        if (!donneesFormulaire.prenom.trim()) nouvellesErreurs.prenom = 'Prénom requis';
        if (!donneesFormulaire.nom.trim()) nouvellesErreurs.nom = 'Nom requis';
        if (!donneesFormulaire.email.trim()) nouvellesErreurs.email = 'Email requis';
        if (!donneesFormulaire.telephone.trim()) nouvellesErreurs.telephone = 'Téléphone requis';
        if (!donneesFormulaire.ville.trim()) nouvellesErreurs.ville = 'Ville requise';

        if (!donneesFormulaire.password) {
            nouvellesErreurs.password = 'Mot de passe requis';
        } else if (donneesFormulaire.password.length < 8) {
            nouvellesErreurs.password = 'Minimum 8 caractères';
        }

        if (donneesFormulaire.password !== donneesFormulaire.password_confirmation) {
            nouvellesErreurs.password_confirmation = 'Les mots de passe ne correspondent pas';
        }

        if (!donneesFormulaire.accepterTermes) {
            nouvellesErreurs.termes = 'Vous devez accepter les conditions';
        }

        setErreurs(nouvellesErreurs);
        return Object.keys(nouvellesErreurs).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validerFormulaire()) return;

        setEstEnChargement(true);
        setErreurs({});

        try {
            const { data } = await axiosClient.post('/register', donneesFormulaire);

            localStorage.setItem('ACCESS_TOKEN', data.token);
            localStorage.setItem('USER_DATA', JSON.stringify(data.user));

            navigate('/auth/login');

        } catch (err) {
            if (err.response && err.response.data.errors) {
                const erreursServeur = err.response.data.errors;
                setErreurs(erreursServeur);
            } else {
                console.error("Erreur :", err);
            }
        } finally {
            setEstEnChargement(false);
        }
    };

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

                    <div className="lg:hidden mb-8">
                        <Link to="/" className="inline-flex items-center gap-3">
                            <Logo />
                        </Link>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-[20px] font-bold text-[#1B4F72] mb-2">Créer un compte</h2>
                        <p className="text-[12px] text-gray-500">Simple, rapide et gratuit.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <Input
                                label="Prénom"
                                name="prenom"
                                value={donneesFormulaire.prenom}
                                onChange={handleInputChange}
                                placeholder="Prénom"
                                Icon={User}
                                error={erreurs.prenom}
                            />
                            <Input
                                label="Nom"
                                name="nom"
                                value={donneesFormulaire.nom}
                                onChange={handleInputChange}
                                placeholder="Nom"
                                Icon={User}
                                error={erreurs.nom}
                            />
                        </div>

                        <Input
                            label="Email"
                            type="email"
                            name="email"
                            value={donneesFormulaire.email}
                            onChange={handleInputChange}
                            placeholder="votre@email.com"
                            Icon={Mail}
                            error={erreurs.email}
                        />

                        <Input
                            label="Téléphone"
                            type="tel"
                            name="telephone"
                            value={donneesFormulaire.telephone}
                            onChange={handleInputChange}
                            placeholder="+212 6 XX XX XX XX"
                            Icon={MapPin}
                            error={erreurs.telephone}
                        />

                        <Input
                            label="Ville"
                            name="ville"
                            value={donneesFormulaire.ville}
                            onChange={handleInputChange}
                            placeholder="Ex: Casablanca"
                            Icon={MapPin}
                            error={erreurs.ville}
                        />

                        <div className="relative">
                            <Input
                                label="Mot de passe"
                                type={afficherMotDePasse ? 'text' : 'password'}
                                name="password"
                                value={donneesFormulaire.password}
                                onChange={handleInputChange}
                                placeholder="••••••••"
                                Icon={Lock}
                                error={erreurs.password}
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
                            value={donneesFormulaire.password_confirmation}
                            onChange={handleInputChange}
                            placeholder="••••••••"
                            Icon={Lock}
                            error={erreurs.password_confirmation}
                        />

                        <div>
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="accepterTermes"
                                    checked={donneesFormulaire.accepterTermes}
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
                            {erreurs.termes && (
                                <p className="mt-1 text-[10px] text-red-500 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" /> {erreurs.termes}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={estEnChargement}
                            className="w-full py-3 text-[13px] font-semibold flex items-center justify-center gap-2 transition-colors bg-[#1B4F72] hover:bg-[#D35400] text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {estEnChargement ? (
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

                    {/* Divider & Social (Google/Facebook) ... */}
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