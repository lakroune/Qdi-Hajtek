import React, { useState, useEffect } from 'react';
import {
    User, Mail, Phone, MapPin, Camera, Lock,
    Shield, FileText, CheckCircle, AlertTriangle,
    ArrowRight, Building, Award, Briefcase,
    GraduationCap, IdCard, Save, Eye, EyeOff
} from 'lucide-react';
import Header from '../components/Header/Header';
import Footer from '../components/footer/Footer';
import FileUpload from '../components/inputs/FileUpload ';
import Input from '../components/inputs/Input';
import Select from '../components/selects/Select';
import AvatarUpload from '../components/inputs/AvatarUpload';

const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [showPassword, setShowPassword] = useState({});
    const [cities, setCities] = useState([]);

    // Données client
    const [userData, setUserData] = useState({
        firstName: 'Ahmed',
        lastName: 'Benali',
        email: 'ahmed.benali@email.com',
        phone: '+212 6 12 34 56 78',
        address: '123 Rue Mohammed V',
        city: 'Casablanca',
        avatar: '/images/avatars/client.jpg'
    });

    // Sécurité
    const [securityData, setSecurityData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        twoFactorEnabled: false
    });

    // Formulaire conversion Artisan
    const [artisanForm, setArtisanForm] = useState({
        companyName: '',
        siretNumber: '',
        specialty: '',
        experience: '',
        description: '',
        cinFront: null,
        cinBack: null,
        diplomas: [],
        certificates: [],
        proPhone: '',
        proEmail: '',
        workAddress: '',
        workCity: '',
    });

    const tabs = [
        { id: 'profile', label: 'Mon profil', icon: User },
        { id: 'security', label: 'Sécurité', icon: Shield },
        { id: 'become-artisan', label: 'Devenir Artisan', icon: Award },
    ];

    const specialties = [
        { value: '', label: 'Sélectionnez une spécialité' },
        { value: 'plomberie', label: 'Plomberie' },
        { value: 'electricite', label: 'Électricité' },
        { value: 'menuiserie', label: 'Menuiserie' },
        { value: 'peinture', label: 'Peinture' },
        { value: 'climatisation', label: 'Climatisation' },
        { value: 'jardinage', label: 'Jardinage' },
        { value: 'maconnerie', label: 'Maçonnerie' },
        { value: 'serrurerie', label: 'Serrurerie' }
    ];

    const experiences = [
        { value: '', label: 'Sélectionnez' },
        { value: '0-2', label: 'Moins de 2 ans' },
        { value: '2-5', label: '2 à 5 ans' },
        { value: '5-10', label: '5 à 10 ans' },
        { value: '10+', label: 'Plus de 10 ans' }
    ];

    // Fetch cities from API
    useEffect(() => {
        fetch('https://countriesnow.space/api/v0.1/countries/cities', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "country": "Morocco"
            })
        })
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    const formattedCities = data.data.map(cityName => ({
                        value: cityName.toLowerCase().replace(/\s+/g, '_'),
                        label: cityName
                    }));
                    setCities(formattedCities);
                }
            })
            .catch(err => console.error("Une erreur s'est produite lors de la recherche des villes de Maroc", err));
    }, []);

    const handleSave = async () => {
        setIsLoading(true);
        await new Promise(r => setTimeout(r, 1000));
        setIsLoading(false);
        setSuccessMessage('Modifications enregistrées !');
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const handleSubmitArtisan = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await new Promise(r => setTimeout(r, 1500));
        setIsLoading(false);
        setSuccessMessage('Votre demande a été envoyée ! Vérification en cours...');
    };

    return (
        <div className="min-h-screen bg-gray-50" style={{ backgroundImage: "url('/images/hero-x.webp')", backgroundSize: '10%' }}>
            <Header isAuthenticated={true} userType="client" userName="Ahmed" />

            <div className="pt-24 pb-12">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
                        <p className="text-gray-600 mt-2">Gérez votre compte et devenez artisan</p>
                    </div>

                    {successMessage && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 flex items-center gap-3 text-green-700">
                            <CheckCircle className="w-5 h-5" />
                            {successMessage}
                        </div>
                    )}

                    <div className="grid lg:grid-cols-4 gap-8">
                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <nav className="bg-white   overflow-hidden">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`
                                            w-full flex items-center gap-3 px-6 py-4 text-left transition-all
                                            ${activeTab === tab.id
                                                ? 'bg-orange-50 text-orange-600 border-r-4 border-orange-600'
                                                : 'text-gray-600 hover:bg-gray-50'}
                                        `}
                                    >
                                        <tab.icon className="w-5 h-5" />
                                        <span className="font-medium">{tab.label}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Content */}
                        <div className="lg:col-span-3 space-y-6">

                            {/*   PROFIL */}
                            {activeTab === 'profile' && (
                                <div className="bg-white p-6 md:p-8">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6">Informations personnelles</h2>

                                    {/* Avatar */}
                                    <AvatarUpload
                                        size=""
                                        src={userData.avatar}
                                        // onChange={handleAvatarChange}
                                    />

                                    {/* prenom, nom, email, phone */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <Input
                                            label="Prénom"
                                            name="firstName"
                                            value={userData.firstName}
                                            onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                                            required
                                            Icon={User}
                                        />
                                        <Input
                                            label="Nom"
                                            name="lastName"
                                            value={userData.lastName}
                                            onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                                            required
                                            Icon={User}
                                        />
                                        <Input
                                            label="Email"
                                            name="email"
                                            type="email"
                                            value={userData.email}
                                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                            required
                                            Icon={Mail}
                                        />
                                        <Input
                                            label="Téléphone"
                                            name="phone"
                                            type="tel"
                                            value={userData.phone}
                                            onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                                            required
                                            Icon={Phone}
                                        />
                                        <div className="md:col-span-2">
                                            <Input
                                                label="Adresse"
                                                name="address"
                                                value={userData.address}
                                                onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                                                Icon={MapPin}
                                            />
                                        </div>
                                        <Select
                                            label="Ville"
                                            name="city"
                                            value={userData.city}
                                            onChange={(name, value) => setUserData({ ...userData, city: value })}
                                            options={cities}
                                        />
                                    </div>

                                    <div className="mt-8 flex justify-end">
                                        <button
                                            onClick={handleSave}
                                            disabled={isLoading}
                                            className="flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-orange-600 text-white font-semibold  transition-colors disabled:opacity-50"
                                        >
                                            {isLoading ? (
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent  animate-spin" />
                                            ) : (
                                                <Save className="w-5 h-5" />
                                            )}
                                            Enregistrer
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Security */}
                            {activeTab === 'security' && (
                                <div className="space-y-6">
                                    <div className="bg-white shadow-sm p-6 md:p-8">
                                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                            <Lock className="w-6 h-6 text-orange-600" />
                                            Mot de passe
                                        </h2>

                                        <div className="space-y-4 max-w-md">
                                            <div className="relative">
                                                <Input
                                                    label="Mot de passe actuel"
                                                    name="currentPassword"
                                                    type={showPassword.current ? 'text' : 'password'}
                                                    value={securityData.currentPassword}
                                                    onChange={(e) => setSecurityData({ ...securityData, currentPassword: e.target.value })}
                                                    Icon={Lock}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword({ ...showPassword, current: !showPassword.current })}
                                                    className="absolute right-4 top-[38px] text-gray-400"
                                                >
                                                    {showPassword.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                </button>
                                            </div>
                                            <div className="relative">
                                                <Input
                                                    label="Nouveau mot de passe"
                                                    name="newPassword"
                                                    type={showPassword.new ? 'text' : 'password'}
                                                    value={securityData.newPassword}
                                                    onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })}
                                                    Icon={Lock}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
                                                    className="absolute right-4 top-[38px] text-gray-400"
                                                >
                                                    {showPassword.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                </button>
                                            </div>
                                            <Input
                                                label="Confirmer le mot de passe"
                                                name="confirmPassword"
                                                type="password"
                                                value={securityData.confirmPassword}
                                                onChange={(e) => setSecurityData({ ...securityData, confirmPassword: e.target.value })}
                                                Icon={Lock}
                                            />
                                        </div>

                                        <div className="mt-6">
                                            <button
                                                onClick={handleSave}
                                                className="px-6 py-3 bg-gray-900 hover:bg-orange-600 text-white font-semibold  transition-colors"
                                            >
                                                Mettre à jour le mot de passe
                                            </button>
                                        </div>
                                    </div>


                                </div>
                            )}

                            {/* FORMULAIRE DEVENIR ARTISAN */}
                            {activeTab === 'become-artisan' && (
                                <div className="bg-white shadow-sm p-6 md:p-8">
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Devenir Artisan</h2>
                                        <p className="text-gray-600">
                                            Remplissez ce formulaire pour transformer votre compte client en compte artisan.
                                            Votre demande sera examinée par notre équipe sous 48h.
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmitArtisan} className="space-y-8">
                                        {/* Infos professionnelles */}
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                                <Briefcase className="w-5 h-5 text-orange-600" />
                                                Informations professionnelles
                                            </h3>
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <Input
                                                    label="Nom de l'entreprise (si applicable)"
                                                    name="companyName"
                                                    value={artisanForm.companyName}
                                                    onChange={(e) => setArtisanForm({ ...artisanForm, companyName: e.target.value })}
                                                    placeholder="Ex: Benali Plomberie"
                                                    Icon={Building}
                                                />
                                                <Input
                                                    label="Numéro SIRET (si applicable)"
                                                    name="siretNumber"
                                                    value={artisanForm.siretNumber}
                                                    onChange={(e) => setArtisanForm({ ...artisanForm, siretNumber: e.target.value })}
                                                    placeholder="123 456 789 00012"
                                                />
                                                <Select
                                                    label="Spécialité principale"
                                                    name="specialty"
                                                    value={artisanForm.specialty}
                                                    onChange={(name, value) => setArtisanForm({ ...artisanForm, specialty: value })}
                                                    options={specialties}
                                                    required
                                                />
                                                <Select
                                                    label="Années d'expérience"
                                                    name="experience"
                                                    value={artisanForm.experience}
                                                    onChange={(name, value) => setArtisanForm({ ...artisanForm, experience: value })}
                                                    options={experiences}
                                                    required
                                                />
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Description de vos services *
                                                    </label>
                                                    <textarea
                                                        required
                                                        rows={4}
                                                        value={artisanForm.description}
                                                        onChange={(e) => setArtisanForm({ ...artisanForm, description: e.target.value })}
                                                        placeholder="Décrivez votre expertise, vos services, vos zones d'intervention..."
                                                        className="w-full px-4 py-3  border border-gray-200 focus:ring-2 focus:ring-orange-500 resize-none"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Documents */}
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                                <FileText className="w-5 h-5 text-orange-600" />
                                                Documents requis
                                            </h3>
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <FileUpload
                                                    id="cin-front"
                                                    label="CNI (Recto)"
                                                    sublabel="Carte d'identité nationale - Face avant"
                                                    icon={IdCard}
                                                    accept="image/*,.pdf"
                                                    required
                                                    maxSize={5}
                                                    value={artisanForm.cinFront}
                                                    onChange={(file) => setArtisanForm({ ...artisanForm, cinFront: file })}
                                                />
                                                <FileUpload
                                                    id="cin-back"
                                                    label="CNI (Verso)"
                                                    sublabel="Carte d'identité nationale - Face arrière"
                                                    icon={IdCard}
                                                    accept="image/*,.pdf"
                                                    required
                                                    maxSize={5}
                                                    value={artisanForm.cinBack}
                                                    onChange={(file) => setArtisanForm({ ...artisanForm, cinBack: file })}
                                                />
                                                <FileUpload
                                                    id="diplomas"
                                                    label="Diplômes / Certificats"
                                                    sublabel="CAP, BEP, ou formations professionnelles"
                                                    icon={GraduationCap}
                                                    accept="image/*,.pdf"
                                                    multiple
                                                    maxFiles={5}
                                                    maxSize={10}
                                                    value={artisanForm.diplomas}
                                                    onChange={(files) => setArtisanForm({ ...artisanForm, diplomas: files })}
                                                />
                                                <FileUpload
                                                    id="certificates"
                                                    label="Attestations d'expérience"
                                                    sublabel="Attestations de travail, recommandations..."
                                                    icon={Award}
                                                    accept="image/*,.pdf"
                                                    multiple
                                                    maxFiles={3}
                                                    value={artisanForm.certificates}
                                                    onChange={(files) => setArtisanForm({ ...artisanForm, certificates: files })}
                                                />
                                            </div>
                                        </div>

                                        {/* Coordonnées pro */}
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                                <IdCard className="w-5 h-5 text-orange-600" />
                                                Coordonnées professionnelles
                                            </h3>
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <Input
                                                    label="Téléphone professionnel"
                                                    name="proPhone"
                                                    type="tel"
                                                    value={artisanForm.proPhone}
                                                    onChange={(e) => setArtisanForm({ ...artisanForm, proPhone: e.target.value })}
                                                    required
                                                    Icon={Phone}
                                                />
                                                <Input
                                                    label="Email professionnel"
                                                    name="proEmail"
                                                    type="email"
                                                    value={artisanForm.proEmail}
                                                    onChange={(e) => setArtisanForm({ ...artisanForm, proEmail: e.target.value })}
                                                    Icon={Mail}
                                                />
                                                <Input
                                                    label="Adresse de l'entreprise"
                                                    name="workAddress"
                                                    value={artisanForm.workAddress}
                                                    onChange={(e) => setArtisanForm({ ...artisanForm, workAddress: e.target.value })}
                                                    required
                                                    Icon={MapPin}
                                                />
                                                <Select
                                                    label="Ville de l'entreprise"
                                                    name="workCity"
                                                    value={artisanForm.workCity}
                                                    onChange={(name, value) => setArtisanForm({ ...artisanForm, workCity: value })}
                                                    options={cities}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Submit */}
                                        <div className="pt-6 border-t border-gray-200">
                                            <div className="flex items-start gap-3 mb-6 p-4 bg-blue-50 ">
                                                <AlertTriangle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                                <p className="text-sm text-blue-700">
                                                    En soumettant ce formulaire, vous acceptez que nos équipes vérifient vos documents.
                                                    La validation peut prendre jusqu'à 48 heures ouvrées.
                                                </p>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold  transition-colors disabled:opacity-50"
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <div className="w-5 h-5 border-2 border-white border-t-transparent  animate-spin" />
                                                        Envoi en cours...
                                                    </>
                                                ) : (
                                                    <>
                                                        Soumettre ma candidature
                                                        <ArrowRight className="w-5 h-5" />
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default SettingsPage;