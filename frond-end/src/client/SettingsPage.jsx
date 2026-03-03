import React, { useState, useEffect } from 'react';
import {
    User, Mail, Phone, MapPin, Lock, Shield, FileText,
    CheckCircle, AlertTriangle, ArrowRight, Building,
    Award, Briefcase, GraduationCap, IdCard, Save,
    Eye, EyeOff
} from 'lucide-react';
import Header from '../components/Header/Header';
import Footer from '../components/footer/Footer';
import AvatarUpload from '../components/inputs/AvatarUpload';
import Input from '../components/inputs/Input';
import FileUpload from '../components/inputs/FileUpload';
import Submit from '../components/buttons/Submit';

const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [showPassword, setShowPassword] = useState({});
    const [cities, setCities] = useState([]);

    // Données utilisateur
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

    // Formulaire Artisan
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
        { id: 'profile', label: 'Mon profil' },
        { id: 'security', label: 'Sécurité' },
        { id: 'become-artisan', label: 'Devenir Artisan' },
    ];

    const specialties = [
        { value: '', label: 'Sélectionnez' },
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

    // Fetch cities
    useEffect(() => {
        fetch('https://countriesnow.space/api/v0.1/countries/cities', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ country: "Morocco" })
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
            .catch(() => {
                setCities([
                    { value: 'casablanca', label: 'Casablanca' },
                    { value: 'rabat', label: 'Rabat' },
                    { value: 'marrakech', label: 'Marrakech' },
                    { value: 'tanger', label: 'Tanger' },
                    { value: 'agadir', label: 'Agadir' }
                ]);
            });
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
        setSuccessMessage('Votre demande a été envoyée !');
    };

    // Helper pour mettre à jour les nested objects
    const updateField = (setter, obj, field, value) => {
        setter({ ...obj, [field]: value });
    };

    return (
        <div className="min-h-screen bg-white">
            <Header isAuthenticated={true} userType="client" userName="Ahmed" />

            <div className="max-w-6xl mt-12 mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
                {/* Header */}
                <div className="border border-gray-200 p-4 mb-4">
                    <h1 className="text-[15px] font-bold text-[#1B4F72]">Paramètres du compte</h1>
                    <p className="text-[11px] text-gray-500 mt-1">Gérez vos informations et devenez artisan</p>
                </div>

                {/* Success Message */}
                {successMessage && (
                    <div className="mb-4 p-3 border border-green-200 bg-green-50 flex items-center gap-2 text-green-700 text-[12px]">
                        <CheckCircle className="w-4 h-4" />
                        {successMessage}
                    </div>
                )}

                <div className="grid lg:grid-cols-4 gap-4">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="border border-gray-200">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-2 px-4 py-3 text-left text-[12px] font-medium transition-colors border-b border-gray-100 last:border-0 ${activeTab === tab.id
                                        ? 'bg-[#D35400]/10 text-[#D35400] border-l-4 border-l-[#D35400]'
                                        : 'text-[#1B4F72] hover:bg-gray-50'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-3">

                        {/* TAB: PROFIL */}
                        {activeTab === 'profile' && (
                            <div className="border border-gray-200 p-4">
                                <h2 className="text-[13px] font-bold text-[#1B4F72] mb-4 pb-2 border-b border-gray-100">
                                    Informations personnelles
                                </h2>

                                {/* Avatar */}
                                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100">
                                    <AvatarUpload
                                        src={userData.avatar}
                                        onChange={(file) => updateField(setUserData, userData, 'avatar', file)}
                                        onRemove={() => updateField(setUserData, userData, 'avatar', null)}
                                        size="lg"
                                    />
                                </div>

                                {/* Formulaire avec composant Input */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <Input
                                        label="Prénom"
                                        name="firstName"
                                        value={userData.firstName}
                                        onChange={(e) => updateField(setUserData, userData, 'firstName', e.target.value)}
                                        Icon={User}
                                        required
                                    />
                                    <Input
                                        label="Nom"
                                        name="lastName"
                                        value={userData.lastName}
                                        onChange={(e) => updateField(setUserData, userData, 'lastName', e.target.value)}
                                        Icon={User}
                                        required
                                    />
                                    <Input
                                        label="Email"
                                        name="email"
                                        type="email"
                                        value={userData.email}
                                        onChange={(e) => updateField(setUserData, userData, 'email', e.target.value)}
                                        Icon={Mail}
                                        required
                                    />
                                    <Input
                                        label="Téléphone"
                                        name="phone"
                                        type="tel"
                                        value={userData.phone}
                                        onChange={(e) => updateField(setUserData, userData, 'phone', e.target.value)}
                                        Icon={Phone}
                                        required
                                    />
                                    <div className="md:col-span-2">
                                        <Input
                                            label="Adresse"
                                            name="address"
                                            value={userData.address}
                                            onChange={(e) => updateField(setUserData, userData, 'address', e.target.value)}
                                            Icon={MapPin}
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-[11px] font-medium text-[#1B4F72] mb-1.5">Ville</label>
                                        <select
                                            value={userData.city}
                                            onChange={(e) => updateField(setUserData, userData, 'city', e.target.value)}
                                            className="w-full px-3 py-2 text-[12px] border border-gray-200 focus:border-[#D35400] focus:outline-none bg-white"
                                        >
                                            {cities.map(city => (
                                                <option key={city.value} value={city.label}>{city.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                                    <Submit
                                        text="Enregistrer"
                                        onClick={handleSave}
                                        isLoading={isLoading}
                                        icon={Save}
                                        size="md"
                                        className="w-auto"
                                    />
                                </div>
                            </div>
                        )}

                        {/* TAB: SÉCURITÉ */}
                        {activeTab === 'security' && (
                            <div className="space-y-4">
                                {/* Mot de passe */}
                                <div className="border border-gray-200 p-4">
                                    <h2 className="text-[13px] font-bold text-[#1B4F72] mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                                        <Lock className="w-4 h-4 text-[#D35400]" />
                                        Mot de passe
                                    </h2>

                                    <div className="space-y-4 max-w-md">
                                        <div className="relative">
                                            <Input
                                                label="Mot de passe actuel"
                                                name="currentPassword"
                                                type={showPassword.current ? 'text' : 'password'}
                                                value={securityData.currentPassword}
                                                onChange={(e) => updateField(setSecurityData, securityData, 'currentPassword', e.target.value)}
                                                Icon={Lock}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword({ ...showPassword, current: !showPassword.current })}
                                                className="absolute right-3 top-[26px] text-gray-400 hover:text-[#D35400]"
                                            >
                                                {showPassword.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>

                                        <div className="relative">
                                            <Input
                                                label="Nouveau mot de passe"
                                                name="newPassword"
                                                type={showPassword.new ? 'text' : 'password'}
                                                value={securityData.newPassword}
                                                onChange={(e) => updateField(setSecurityData, securityData, 'newPassword', e.target.value)}
                                                Icon={Lock}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
                                                className="absolute right-3 top-[26px] text-gray-400 hover:text-[#D35400]"
                                            >
                                                {showPassword.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>

                                        <Input
                                            label="Confirmer le mot de passe"
                                            name="confirmPassword"
                                            type="password"
                                            value={securityData.confirmPassword}
                                            onChange={(e) => updateField(setSecurityData, securityData, 'confirmPassword', e.target.value)}
                                            Icon={Lock}
                                        />
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <Submit
                                            text="Mettre à jour"
                                            onClick={handleSave}
                                            isLoading={isLoading}
                                            size="md"
                                            className="w-auto"
                                        />
                                    </div>
                                </div>

                              
                                
                            </div>
                        )}

                        {/* TAB: DEVENIR ARTISAN */}
                        {activeTab === 'become-artisan' && (
                            <div className="border border-gray-200 p-4">
                                <div className="mb-6 pb-4 border-b border-gray-100">
                                    <h2 className="text-[15px] font-bold text-[#1B4F72] mb-1">Devenir Artisan</h2>
                                    <p className="text-[11px] text-gray-500">
                                        Remplissez ce formulaire. Votre demande sera examinée sous 48h.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmitArtisan} className="space-y-6">
                                    {/* Infos professionnelles */}
                                    <div>
                                        <h3 className="text-[12px] font-bold text-[#1B4F72] mb-3 flex items-center gap-2">
                                            <Briefcase className="w-4 h-4 text-[#D35400]" />
                                            Informations professionnelles
                                        </h3>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <Input
                                                label="Nom de l'entreprise"
                                                name="companyName"
                                                value={artisanForm.companyName}
                                                onChange={(e) => updateField(setArtisanForm, artisanForm, 'companyName', e.target.value)}
                                                placeholder="Ex: Benali Plomberie"
                                                Icon={Building}
                                            />
                                            <Input
                                                label="Numéro SIRET"
                                                name="siretNumber"
                                                value={artisanForm.siretNumber}
                                                onChange={(e) => updateField(setArtisanForm, artisanForm, 'siretNumber', e.target.value)}
                                                placeholder="123 456 789 00012"
                                            />

                                            {/* Select Spécialité */}
                                            <div>
                                                <label className="block text-[11px] font-medium text-[#1B4F72] mb-1.5">
                                                    Spécialité <span className="text-[#D35400]">*</span>
                                                </label>
                                                <select
                                                    required
                                                    value={artisanForm.specialty}
                                                    onChange={(e) => updateField(setArtisanForm, artisanForm, 'specialty', e.target.value)}
                                                    className="w-full px-3 py-2 text-[12px] border border-gray-200 focus:border-[#D35400] focus:outline-none bg-white"
                                                >
                                                    {specialties.map(s => (
                                                        <option key={s.value} value={s.value}>{s.label}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Select Expérience */}
                                            <div>
                                                <label className="block text-[11px] font-medium text-[#1B4F72] mb-1.5">
                                                    Expérience <span className="text-[#D35400]">*</span>
                                                </label>
                                                <select
                                                    required
                                                    value={artisanForm.experience}
                                                    onChange={(e) => updateField(setArtisanForm, artisanForm, 'experience', e.target.value)}
                                                    className="w-full px-3 py-2 text-[12px] border border-gray-200 focus:border-[#D35400] focus:outline-none bg-white"
                                                >
                                                    {experiences.map(e => (
                                                        <option key={e.value} value={e.value}>{e.label}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="md:col-span-2">
                                                <label className="block text-[11px] font-medium text-[#1B4F72] mb-1.5">
                                                    Description <span className="text-[#D35400]">*</span>
                                                </label>
                                                <textarea
                                                    required
                                                    rows={3}
                                                    value={artisanForm.description}
                                                    onChange={(e) => updateField(setArtisanForm, artisanForm, 'description', e.target.value)}
                                                    placeholder="Décrivez votre expertise..."
                                                    className="w-full px-3 py-2 text-[12px] border border-gray-200 focus:border-[#D35400] focus:outline-none resize-none"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Documents avec FileUpload */}
                                    <div className="pt-4 border-t border-gray-100">
                                        <h3 className="text-[12px] font-bold text-[#1B4F72] mb-3 flex items-center gap-2">
                                            <FileText className="w-4 h-4 text-[#D35400]" />
                                            Documents requis
                                        </h3>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <FileUpload
                                                id="cin-front"
                                                label="CNI (Recto)"
                                                icon={IdCard}
                                                accept="image/*,.pdf"
                                                required
                                                maxSize={5}
                                                value={artisanForm.cinFront}
                                                onChange={(file) => updateField(setArtisanForm, artisanForm, 'cinFront', file)}
                                            />
                                            <FileUpload
                                                id="cin-back"
                                                label="CNI (Verso)"
                                                icon={IdCard}
                                                accept="image/*,.pdf"
                                                required
                                                maxSize={5}
                                                value={artisanForm.cinBack}
                                                onChange={(file) => updateField(setArtisanForm, artisanForm, 'cinBack', file)}
                                            />
                                            <FileUpload
                                                id="diplomas"
                                                label="Diplômes"
                                                icon={GraduationCap}
                                                accept="image/*,.pdf"
                                                multiple
                                                maxFiles={5}
                                                value={artisanForm.diplomas}
                                                onChange={(files) => updateField(setArtisanForm, artisanForm, 'diplomas', files)}
                                            />
                                            <FileUpload
                                                id="certificates"
                                                label="Attestations"
                                                icon={Award}
                                                accept="image/*,.pdf"
                                                multiple
                                                maxFiles={3}
                                                value={artisanForm.certificates}
                                                onChange={(files) => updateField(setArtisanForm, artisanForm, 'certificates', files)}
                                            />
                                        </div>
                                    </div>

                                    {/* Coordonnées pro */}
                                    <div className="pt-4 border-t border-gray-100">
                                        <h3 className="text-[12px] font-bold text-[#1B4F72] mb-3 flex items-center gap-2">
                                            <IdCard className="w-4 h-4 text-[#D35400]" />
                                            Coordonnées professionnelles
                                        </h3>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <Input
                                                label="Téléphone pro"
                                                name="proPhone"
                                                type="tel"
                                                value={artisanForm.proPhone}
                                                onChange={(e) => updateField(setArtisanForm, artisanForm, 'proPhone', e.target.value)}
                                                Icon={Phone}
                                                required
                                            />
                                            <Input
                                                label="Email pro"
                                                name="proEmail"
                                                type="email"
                                                value={artisanForm.proEmail}
                                                onChange={(e) => updateField(setArtisanForm, artisanForm, 'proEmail', e.target.value)}
                                                Icon={Mail}
                                            />
                                            <Input
                                                label="Adresse"
                                                name="workAddress"
                                                value={artisanForm.workAddress}
                                                onChange={(e) => updateField(setArtisanForm, artisanForm, 'workAddress', e.target.value)}
                                                Icon={MapPin}
                                                required
                                            />
                                            <div>
                                                <label className="block text-[11px] font-medium text-[#1B4F72] mb-1.5">
                                                    Ville <span className="text-[#D35400]">*</span>
                                                </label>
                                                <select
                                                    required
                                                    value={artisanForm.workCity}
                                                    onChange={(e) => updateField(setArtisanForm, artisanForm, 'workCity', e.target.value)}
                                                    className="w-full px-3 py-2 text-[12px] border border-gray-200 focus:border-[#D35400] focus:outline-none bg-white"
                                                >
                                                    <option value="">Sélectionnez</option>
                                                    {cities.map(city => (
                                                        <option key={city.value} value={city.label}>{city.label}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Submit avec composant Submit */}
                                    <div className="pt-6 border-t border-gray-100">
                                        <div className="flex items-start gap-2 mb-4 p-3 bg-blue-50">
                                            <AlertTriangle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                            <p className="text-[10px] text-blue-700">
                                                En soumettant ce formulaire, vous acceptez la vérification de vos documents.
                                                Validation sous 48h.
                                            </p>
                                        </div>

                                        <Submit
                                            text="Soumettre ma candidature"
                                            onClick={handleSubmitArtisan}
                                            isLoading={isLoading}
                                            variant="secondary"
                                            size="lg"
                                            icon={ArrowRight}
                                        />
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default SettingsPage;