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

const PageParametres = () => {
    const [ongletActif, setOngletActif] = useState('profil');
    const [chargement, setChargement] = useState(false);
    const [messageSucces, setMessageSucces] = useState('');
    const [afficherMotDePasse, setAfficherMotDePasse] = useState({});
    const [villes, setVilles] = useState([]);

    const [donneesUtilisateur, setDonneesUtilisateur] = useState({
        prenom: 'Ahmed',
        nom: 'Benali',
        email: 'ahmed.benali@email.com',
        telephone: '+212 6 12 34 56 78',
        adresse: '123 Rue Mohammed V',
        ville: 'Casablanca',
        avatar: '/images/avatars/client.jpg'
    });

    const [donneesSécurité, setDonneesSécurité] = useState({
        motDePasseActuel: '',
        nouveauMotDePasse: '',
        confirmerMotDePasse: '',
        doubleAuthentificationActive: false
    });

    const [formulaireArtisan, setFormulaireArtisan] = useState({
        nomEntreprise: '',
        numeroSiret: '',
        specialite: '',
        experience: '',
        description: '',
        cniRecto: null,
        cniVerso: null,
        diplomes: [],
        attestations: [],
        telephonePro: '',
        emailPro: '',
        adresseTravail: '',
        villeTravail: '',
    });

    const onglets = [
        { id: 'profil', libelle: 'Mon profil' },
        { id: 'securite', libelle: 'Sécurité' },
        { id: 'devenir-artisan', libelle: 'Devenir Artisan' },
    ];

    const specialites = [
        { valeur: '', libelle: 'Sélectionnez' },
        { valeur: 'plomberie', libelle: 'Plomberie' },
        { valeur: 'electricite', libelle: 'Électricité' },
        { valeur: 'menuiserie', libelle: 'Menuiserie' },
        { valeur: 'peinture', libelle: 'Peinture' },
        { valeur: 'climatisation', libelle: 'Climatisation' },
        { valeur: 'jardinage', libelle: 'Jardinage' },
        { valeur: 'maconnerie', libelle: 'Maçonnerie' },
        { valeur: 'serrurerie', libelle: 'Serrurerie' }
    ];

    const experiences = [
        { valeur: '', libelle: 'Sélectionnez' },
        { valeur: '0-2', libelle: 'Moins de 2 ans' },
        { valeur: '2-5', libelle: '2 à 5 ans' },
        { valeur: '5-10', libelle: '5 à 10 ans' },
        { valeur: '10+', libelle: 'Plus de 10 ans' }
    ];

    useEffect(() => {
        fetch('https://countriesnow.space/api/v0.1/countries/cities', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ country: "Morocco" })
        })
            .then(reponse => reponse.json())
            .then(donnees => {
                if (!donnees.error) {
                    const villesFormatees = donnees.data.map(nomVille => ({
                        valeur: nomVille.toLowerCase().replace(/\s+/g, '_'),
                        libelle: nomVille
                    }));
                    setVilles(villesFormatees);
                }
            })
            .catch(() => {
                setVilles([
                    { valeur: 'casablanca', libelle: 'Casablanca' },
                ]);
            });
    }, []);

    const enregistrerModifications = async () => {
        setChargement(true);
        await new Promise(r => setTimeout(r, 1000));
        setChargement(false);
        setMessageSucces('Modifications enregistrées !');
        setTimeout(() => setMessageSucces(''), 3000);
    };

    const soumettreFormulaireArtisan = async (e) => {
        e.preventDefault();
        setChargement(true);
        await new Promise(r => setTimeout(r, 1500));
        setChargement(false);
        setMessageSucces('Votre demande a été envoyée !');
    };

    const mettreAJourChamp = (modificateur, objet, champ, valeur) => {
        modificateur({ ...objet, [champ]: valeur });
    };

    return (
        <div className="min-h-screen bg-white">
            <Header isAuthenticated={true} userType="client" userName="Ahmed" />

            <div className="max-w-6xl mt-12 mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
                <div className="border border-gray-200 p-4 mb-4">
                    <h1 className="text-[15px] font-bold text-[#1B4F72]">Paramètres du compte</h1>
                    <p className="text-[11px] text-gray-500 mt-1">Gérez vos informations et devenez artisan</p>
                </div>

                {messageSucces && (
                    <div className="mb-4 p-3 border border-green-200 bg-green-50 flex items-center gap-2 text-green-700 text-[12px]">
                        <CheckCircle className="w-4 h-4" />
                        {messageSucces}
                    </div>
                )}

                <div className="grid lg:grid-cols-4 gap-4">
                    <div className="lg:col-span-1">
                        <div className="border border-gray-200">
                            {onglets.map((onglet) => (
                                <button
                                    key={onglet.id}
                                    onClick={() => setOngletActif(onglet.id)}
                                    className={`w-full flex items-center gap-2 px-4 py-3 text-left text-[12px] font-medium transition-colors border-b border-gray-100 last:border-0 ${ongletActif === onglet.id
                                        ? 'bg-[#D35400]/10 text-[#D35400] border-l-4 border-l-[#D35400]'
                                        : 'text-[#1B4F72] hover:bg-gray-50'
                                        }`}
                                >
                                    {onglet.libelle}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-3">

                        {ongletActif === 'profil' && (
                            <div className="border border-gray-200 p-4">
                                <h2 className="text-[13px] font-bold text-[#1B4F72] mb-4 pb-2 border-b border-gray-100">
                                    Informations personnelles
                                </h2>

                                {/* Avatar */}
                                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100">
                                    <AvatarUpload
                                        src={donneesUtilisateur.avatar}
                                        onChange={(fichier) => mettreAJourChamp(setDonneesUtilisateur, donneesUtilisateur, 'avatar', fichier)}
                                        onRemove={() => mettreAJourChamp(setDonneesUtilisateur, donneesUtilisateur, 'avatar', null)}
                                        size="lg"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <Input
                                        label="Prénom"
                                        name="prenom"
                                        value={donneesUtilisateur.prenom}
                                        onChange={(e) => mettreAJourChamp(setDonneesUtilisateur, donneesUtilisateur, 'prenom', e.target.value)}
                                        Icon={User}
                                        required
                                    />
                                    <Input
                                        label="Nom"
                                        name="nom"
                                        value={donneesUtilisateur.nom}
                                        onChange={(e) => mettreAJourChamp(setDonneesUtilisateur, donneesUtilisateur, 'nom', e.target.value)}
                                        Icon={User}
                                        required
                                    />
                                    <Input
                                        label="Email"
                                        name="email"
                                        type="email"
                                        value={donneesUtilisateur.email}
                                        onChange={(e) => mettreAJourChamp(setDonneesUtilisateur, donneesUtilisateur, 'email', e.target.value)}
                                        Icon={Mail}
                                        required
                                    />
                                    <Input
                                        label="Téléphone"
                                        name="telephone"
                                        type="tel"
                                        value={donneesUtilisateur.telephone}
                                        onChange={(e) => mettreAJourChamp(setDonneesUtilisateur, donneesUtilisateur, 'telephone', e.target.value)}
                                        Icon={Phone}
                                        required
                                    />
                                    <div className="md:col-span-2">
                                        <Input
                                            label="Adresse"
                                            name="adresse"
                                            value={donneesUtilisateur.adresse}
                                            onChange={(e) => mettreAJourChamp(setDonneesUtilisateur, donneesUtilisateur, 'adresse', e.target.value)}
                                            Icon={MapPin}
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-[11px] font-medium text-[#1B4F72] mb-1.5">Ville</label>
                                        <select
                                            value={donneesUtilisateur.ville}
                                            onChange={(e) => mettreAJourChamp(setDonneesUtilisateur, donneesUtilisateur, 'ville', e.target.value)}
                                            className="w-full px-3 py-2 text-[12px] border border-gray-200 focus:border-[#D35400] focus:outline-none bg-white"
                                        >
                                            {villes.map(ville => (
                                                <option key={ville.valeur} value={ville.libelle}>{ville.libelle}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                                    <Submit
                                        text="Enregistrer"
                                        onClick={enregistrerModifications}
                                        isLoading={chargement}
                                        icon={Save}
                                        size="md"
                                        className="w-auto"
                                    />
                                </div>
                            </div>
                        )}

                        {ongletActif === 'securite' && (
                            <div className="space-y-4">
                                <div className="border border-gray-200 p-4">
                                    <h2 className="text-[13px] font-bold text-[#1B4F72] mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                                        <Lock className="w-4 h-4 text-[#D35400]" />
                                        Mot de passe
                                    </h2>

                                    <div className="space-y-4 max-w-md">
                                        <div className="relative">
                                            <Input
                                                label="Mot de passe actuel"
                                                name="motDePasseActuel"
                                                type={afficherMotDePasse.actuel ? 'text' : 'password'}
                                                value={donneesSécurité.motDePasseActuel}
                                                onChange={(e) => mettreAJourChamp(setDonneesSécurité, donneesSécurité, 'motDePasseActuel', e.target.value)}
                                                Icon={Lock}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setAfficherMotDePasse({ ...afficherMotDePasse, actuel: !afficherMotDePasse.actuel })}
                                                className="absolute right-3 top-[26px] text-gray-400 hover:text-[#D35400]"
                                            >
                                                {afficherMotDePasse.actuel ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>

                                        <div className="relative">
                                            <Input
                                                label="Nouveau mot de passe"
                                                name="nouveauMotDePasse"
                                                type={afficherMotDePasse.nouveau ? 'text' : 'password'}
                                                value={donneesSécurité.nouveauMotDePasse}
                                                onChange={(e) => mettreAJourChamp(setDonneesSécurité, donneesSécurité, 'nouveauMotDePasse', e.target.value)}
                                                Icon={Lock}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setAfficherMotDePasse({ ...afficherMotDePasse, nouveau: !afficherMotDePasse.nouveau })}
                                                className="absolute right-3 top-[26px] text-gray-400 hover:text-[#D35400]"
                                            >
                                                {afficherMotDePasse.nouveau ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>

                                        <Input
                                            label="Confirmer le mot de passe"
                                            name="confirmerMotDePasse"
                                            type="password"
                                            value={donneesSécurité.confirmerMotDePasse}
                                            onChange={(e) => mettreAJourChamp(setDonneesSécurité, donneesSécurité, 'confirmerMotDePasse', e.target.value)}
                                            Icon={Lock}
                                        />
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <Submit
                                            text="Mettre à jour"
                                            onClick={enregistrerModifications}
                                            isLoading={chargement}
                                            size="md"
                                            className="w-auto"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {ongletActif === 'devenir-artisan' && (
                            <div className="border border-gray-200 p-4">
                                <div className="mb-6 pb-4 border-b border-gray-100">
                                    <h2 className="text-[15px] font-bold text-[#1B4F72] mb-1">Devenir Artisan</h2>
                                    <p className="text-[11px] text-gray-500">
                                        Remplissez ce formulaire. Votre demande sera examinée sous 48h.
                                    </p>
                                </div>

                                <form onSubmit={soumettreFormulaireArtisan} className="space-y-6">
                                    <div>
                                        <h3 className="text-[12px] font-bold text-[#1B4F72] mb-3 flex items-center gap-2">
                                            <Briefcase className="w-4 h-4 text-[#D35400]" />
                                            Informations professionnelles
                                        </h3>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <Input
                                                label="Nom de l'entreprise"
                                                name="nomEntreprise"
                                                value={formulaireArtisan.nomEntreprise}
                                                onChange={(e) => mettreAJourChamp(setFormulaireArtisan, formulaireArtisan, 'nomEntreprise', e.target.value)}
                                                placeholder="Ex: Benali Plomberie"
                                                Icon={Building}
                                            />
                                            <Input
                                                label="Numéro SIRET"
                                                name="numeroSiret"
                                                value={formulaireArtisan.numeroSiret}
                                                onChange={(e) => mettreAJourChamp(setFormulaireArtisan, formulaireArtisan, 'numeroSiret', e.target.value)}
                                                placeholder="123 456 789 00012"
                                            />

                                            <div>
                                                <label className="block text-[11px] font-medium text-[#1B4F72] mb-1.5">
                                                    Spécialité <span className="text-[#D35400]">*</span>
                                                </label>
                                                <select
                                                    required
                                                    value={formulaireArtisan.specialite}
                                                    onChange={(e) => mettreAJourChamp(setFormulaireArtisan, formulaireArtisan, 'specialite', e.target.value)}
                                                    className="w-full px-3 py-2 text-[12px] border border-gray-200 focus:border-[#D35400] focus:outline-none bg-white"
                                                >
                                                    {specialites.map(s => (
                                                        <option key={s.valeur} value={s.valeur}>{s.libelle}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-[11px] font-medium text-[#1B4F72] mb-1.5">
                                                    Expérience <span className="text-[#D35400]">*</span>
                                                </label>
                                                <select
                                                    required
                                                    value={formulaireArtisan.experience}
                                                    onChange={(e) => mettreAJourChamp(setFormulaireArtisan, formulaireArtisan, 'experience', e.target.value)}
                                                    className="w-full px-3 py-2 text-[12px] border border-gray-200 focus:border-[#D35400] focus:outline-none bg-white"
                                                >
                                                    {experiences.map(exp => (
                                                        <option key={exp.valeur} value={exp.valeur}>{exp.libelle}</option>
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
                                                    value={formulaireArtisan.description}
                                                    onChange={(e) => mettreAJourChamp(setFormulaireArtisan, formulaireArtisan, 'description', e.target.value)}
                                                    placeholder="Décrivez votre expertise..."
                                                    className="w-full px-3 py-2 text-[12px] border border-gray-200 focus:border-[#D35400] focus:outline-none resize-none"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-100">
                                        <h3 className="text-[12px] font-bold text-[#1B4F72] mb-3 flex items-center gap-2">
                                            <FileText className="w-4 h-4 text-[#D35400]" />
                                            Documents requis
                                        </h3>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <FileUpload
                                                id="cni-recto"
                                                label="CNI (Recto)"
                                                icon={IdCard}
                                                accept="image/*,.pdf"
                                                required
                                                maxSize={5}
                                                value={formulaireArtisan.cniRecto}
                                                onChange={(fichier) => mettreAJourChamp(setFormulaireArtisan, formulaireArtisan, 'cniRecto', fichier)}
                                            />
                                            <FileUpload
                                                id="cni-verso"
                                                label="CNI (Verso)"
                                                icon={IdCard}
                                                accept="image/*,.pdf"
                                                required
                                                maxSize={5}
                                                value={formulaireArtisan.cniVerso}
                                                onChange={(fichier) => mettreAJourChamp(setFormulaireArtisan, formulaireArtisan, 'cniVerso', fichier)}
                                            />
                                            <FileUpload
                                                id="diplomes"
                                                label="Diplômes"
                                                icon={GraduationCap}
                                                accept="image/*,.pdf"
                                                multiple
                                                maxFiles={5}
                                                value={formulaireArtisan.diplomes}
                                                onChange={(fichiers) => mettreAJourChamp(setFormulaireArtisan, formulaireArtisan, 'diplomes', fichiers)}
                                            />
                                            <FileUpload
                                                id="attestations"
                                                label="Attestations"
                                                icon={Award}
                                                accept="image/*,.pdf"
                                                multiple
                                                maxFiles={3}
                                                value={formulaireArtisan.attestations}
                                                onChange={(fichiers) => mettreAJourChamp(setFormulaireArtisan, formulaireArtisan, 'attestations', fichiers)}
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-100">
                                        <h3 className="text-[12px] font-bold text-[#1B4F72] mb-3 flex items-center gap-2">
                                            <IdCard className="w-4 h-4 text-[#D35400]" />
                                            Coordonnées professionnelles
                                        </h3>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <Input
                                                label="Téléphone pro"
                                                name="telephonePro"
                                                type="tel"
                                                value={formulaireArtisan.telephonePro}
                                                onChange={(e) => mettreAJourChamp(setFormulaireArtisan, formulaireArtisan, 'telephonePro', e.target.value)}
                                                Icon={Phone}
                                                required
                                            />
                                            <Input
                                                label="Email pro"
                                                name="emailPro"
                                                type="email"
                                                value={formulaireArtisan.emailPro}
                                                onChange={(e) => mettreAJourChamp(setFormulaireArtisan, formulaireArtisan, 'emailPro', e.target.value)}
                                                Icon={Mail}
                                            />
                                            <Input
                                                label="Adresse"
                                                name="adresseTravail"
                                                value={formulaireArtisan.adresseTravail}
                                                onChange={(e) => mettreAJourChamp(setFormulaireArtisan, formulaireArtisan, 'adresseTravail', e.target.value)}
                                                Icon={MapPin}
                                                required
                                            />
                                            <div>
                                                <label className="block text-[11px] font-medium text-[#1B4F72] mb-1.5">
                                                    Ville <span className="text-[#D35400]">*</span>
                                                </label>
                                                <select
                                                    required
                                                    value={formulaireArtisan.villeTravail}
                                                    onChange={(e) => mettreAJourChamp(setFormulaireArtisan, formulaireArtisan, 'villeTravail', e.target.value)}
                                                    className="w-full px-3 py-2 text-[12px] border border-gray-200 focus:border-[#D35400] focus:outline-none bg-white"
                                                >
                                                    <option value="">Sélectionnez</option>
                                                    {villes.map(ville => (
                                                        <option key={ville.valeur} value={ville.libelle}>{ville.libelle}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

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
                                            onClick={soumettreFormulaireArtisan}
                                            isLoading={chargement}
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

export default PageParametres;