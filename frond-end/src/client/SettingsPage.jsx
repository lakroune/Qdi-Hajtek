import React, { useState, useEffect } from 'react';
import {
    User, Mail, Phone, MapPin, Lock, Shield, FileText,
    CheckCircle, AlertTriangle, ArrowRight, Building,
    Award, Briefcase, GraduationCap, IdCard, Save,
    Eye, EyeOff,
    SplinePointer,
    UploadCloud,
    LoaderCircle,
    XCircle,
    Disc3
} from 'lucide-react';
import AvatarUpload from '../components/inputs/AvatarUpload';
import Input from '../components/inputs/Input';
import FileUpload from '../components/inputs/FileUpload';
import Submit from '../components/buttons/Submit';
import axiosClient from '../api/axios-client';

const PageParametres = () => {
    const [ongletActif, setOngletActif] = useState('profil');
    const [chargement, setChargement] = useState(false);
    const [messageSucces, setMessageSucces] = useState('');
    const [messageErreur, setMessageErreur] = useState('');
    const [afficherMotDePasse, setAfficherMotDePasse] = useState({});
    const [villes, setVilles] = useState([]);

    const [isInitialLoading, setIsInitialLoading] = useState(true);

    const [donneesUtilisateur, setDonneesUtilisateur] = useState({
        prenom: '',
        nom: '',
        email: '',
        telephone: '',
        adresse: '',
        ville: '',
        avatar: '',
    });

    const [donneesSecurite, setDonneesSecurite] = useState({
        motDePasseActuel: '',
        nouveauMotDePasse: '',
        confirmerMotDePasse: '',
    });

    const [formulaireArtisan, setFormulaireArtisan] = useState({
        specialite: '',
        experience: '',
        description: '',
        rayonTravail: '',
        attestationsRib: null,
        cniRecto: null,
        cniVerso: null,
        diplomes: [],
        attestations: [],
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
        const fetchVilles = async () => {
            try {
                const response = await axiosClient.get('/villes');
                setVilles(response.data);
            } catch (error) {
                console.error('Erreur lors de la recherche des villes');
            }
        };
        if (villes.length === 0) {
            fetchVilles();
        }
    }, []);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosClient.get('/profile/me');
                const user = response.data.data;
                setDonneesUtilisateur({
                    prenom: user.firstname || '',
                    nom: user.lastname || '',
                    email: user.email || '',
                    telephone: user.client.phone || '',
                    adresse: user.client.adresse || '',
                    cin: user.client.cin || '',
                    ville: user.city || '',
                    avatar: getAvatarUrl(user.client.avatar),
                });



            } catch (error) {
                console.error('Erreur lors de la récupération de l\'utilisateur', error);
            } finally {
                setIsInitialLoading(false);
            }
        };
        fetchUser();
    }, []);


    const getAvatarUrl = (path) => {
        if (!path) return "https://via.placeholder.com/150";
        const cleanPath = path.replace(/\\/g, '').replace('public/', '');
        return `http://localhost:8000/storage/${cleanPath}`;
    };
    const saveModificationProfileClient = async () => {
        setChargement(true);
        setMessageSucces('');

        try {
            const formData = new FormData();

            formData.append('prenom', donneesUtilisateur.prenom);
            formData.append('nom', donneesUtilisateur.nom);
            formData.append('email', donneesUtilisateur.email);
            formData.append('phone', donneesUtilisateur.telephone);
            formData.append('adresse', donneesUtilisateur.adresse);
            formData.append('city', donneesUtilisateur.ville);

            if (donneesUtilisateur.avatar instanceof File) {
                formData.append('avatar', donneesUtilisateur.avatar);
            }

            const response = await axiosClient.patch('/profile', formData);

            if (response.status === 200) {
                setMessageSucces('Votre profil a été mis à jour avec succès !');
                // setDonneesUtilisateur(response.data.user);
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour du profil');
        } finally {
            setChargement(false);
        }
    };

    const saveModificationMotDePasse = async () => {

        if (donneesSecurite.motDePasseActuel.length < 8 || donneesSecurite.nouveauMotDePasse.length < 8 || donneesSecurite.confirmerMotDePasse.length < 8 || donneesSecurite.nouveauMotDePasse !== donneesSecurite.confirmerMotDePasse) {

        }
        setChargement(true);
        setMessageSucces('');
        setMessageErreur('');

        try {
            const response = await axiosClient.put('/profile/update-password', {
                old_password: donneesSecurite.motDePasseActuel,
                new_password: donneesSecurite.nouveauMotDePasse,
                new_password_confirmation: donneesSecurite.confirmerMotDePasse,

            });

            if (response.status === 200) {
                if (response.data.success) {
                    setMessageSucces(response.data.message);
                    setDonneesSecurite({
                        motDePasseActuel: '',
                        nouveauMotDePasse: '',
                        confirmerMotDePasse: '',
                    });
                }
                else {
                    setMessageErreur(response.data.message);
                }
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour du mot de passe', error);
        } finally {
            setChargement(false);
        }
    };

    const becomeArtisanSave = async (e) => {
        e.preventDefault();

        setMessageSucces('');
        setMessageErreur('');

        // Validation
        if (!formulaireArtisan.specialite || !formulaireArtisan.experience || !formulaireArtisan.description) {
            setMessageErreur('Veuillez remplir tous les champs obligatoires.');
            return;
        }

        if (!formulaireArtisan.cniRecto || !formulaireArtisan.cniVerso) {
            setMessageErreur('Veuillez uploader les deux faces de votre CNI.');
            return;
        }


        setChargement(true);

        try {
            const formData = new FormData();

            formData.append('specialite', formulaireArtisan.specialite);
            formData.append('experience', formulaireArtisan.experience);
            formData.append('rayon_action', formulaireArtisan.rayonTravail || 30);
            formData.append('bio', formulaireArtisan.description);
            formData.append('cin_rec', formulaireArtisan.cniRecto);
            formData.append('cin_ver', formulaireArtisan.cniVerso);
            formData.append('rib_doc', formulaireArtisan.attestationsRib);
            formulaireArtisan.diplomes.forEach((fichier) => {
                formData.append(`diplome_doc[]`, fichier);
            });

            formulaireArtisan.attestations.forEach((fichier) => {
                formData.append(`certificat_doc[]`, fichier);
            });

            const response = await axiosClient.post('/artisans', formData);

            if (response.status === 200 || response.status === 201) {
                setMessageSucces('Votre candidature a été soumise avec succès ! Vous recevrez une réponse sous 48h.');
                setFormulaireArtisan({
                    specialite: '',
                    experience: '',
                    description: '',
                    rayonTravail: 30,
                    attestationsRib: null,
                    cniRecto: null,
                    cniVerso: null,
                    diplomes: [],
                    attestations: [],
                });
            }
        } catch (error) {
            const msg = error.response?.data?.message || 'Une erreur est survenue. Veuillez réessayer.';
            setMessageErreur(msg);
            console.error('Erreur candidature artisan:', error);
        } finally {
            setChargement(false);
        }
    };

    const mettreAJourChamp = (modificateur, objet, champ, valeur) => {
        modificateur({ ...objet, [champ]: valeur });
    };

    if (isInitialLoading) {
        return <div className="flex justify-center items-center h-screen"><LoaderCircle className="animate-spin w-12 h-12 text-[#D35400]" /></div>;
    }

    return (
        <div className="min-h-screen bg-white">

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

                {messageErreur && (
                    <div className="mb-4 p-3 border border-red-200 bg-red-50 flex items-center gap-2 text-red-700 text-[12px]">
                        <XCircle className="w-4 h-4" />
                        {messageErreur}
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
                                        value={donneesUtilisateur.prenom || ''}
                                        onChange={(e) => mettreAJourChamp(setDonneesUtilisateur, donneesUtilisateur, 'prenom', e.target.value)}
                                        Icon={User}
                                        required
                                    />
                                    <Input
                                        label="Nom"
                                        name="nom"
                                        value={donneesUtilisateur.nom || ''}
                                        onChange={(e) => mettreAJourChamp(setDonneesUtilisateur, donneesUtilisateur, 'nom', e.target.value)}
                                        Icon={User}
                                        required
                                    />
                                    <Input
                                        label="Email"
                                        name="email"
                                        type="email"
                                        value={donneesUtilisateur.email || ''}
                                        onChange={(e) => mettreAJourChamp(setDonneesUtilisateur, donneesUtilisateur, 'email', e.target.value)}
                                        Icon={Mail}
                                        required
                                    />
                                    <Input
                                        label="Téléphone"
                                        name="telephone"
                                        type="tel"
                                        value={donneesUtilisateur.telephone || ''}
                                        onChange={(e) => mettreAJourChamp(setDonneesUtilisateur, donneesUtilisateur, 'telephone', e.target.value)}
                                        Icon={Phone}
                                        required
                                    />

                                    <Input
                                        label="Adresse"
                                        name="adresse"
                                        value={donneesUtilisateur.adresse || ''}
                                        onChange={(e) => mettreAJourChamp(setDonneesUtilisateur, donneesUtilisateur, 'adresse', e.target.value)}
                                        Icon={MapPin}
                                    />
                                    <Input
                                        label="CIN"
                                        name="cin"
                                        value={donneesUtilisateur.cin || ''}
                                        onChange={(e) => mettreAJourChamp(setDonneesUtilisateur, donneesUtilisateur, 'cin', e.target.value)}
                                        Icon={IdCard}
                                    />

                                    <div className="md:col-span-2">
                                        <select
                                            value={donneesUtilisateur.ville}
                                            onChange={(e) => mettreAJourChamp(setDonneesUtilisateur, donneesUtilisateur, 'ville', e.target.value)}
                                            className="w-full px-3 py-2 text-[12px] border border-gray-200 focus:border-[#D35400] focus:outline-none bg-white"
                                        >
                                            <option value="">Sélectionnez une ville</option>
                                            {villes.map(ville => (
                                                <option key={ville.id} selected={ville.ville === donneesUtilisateur.ville} value={ville.ville}>
                                                    {ville.ville}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                                    <Submit
                                        text="Enregistrer"
                                        onClick={saveModificationProfileClient}
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
                                                value={donneesSecurite.motDePasseActuel}
                                                onChange={(e) => mettreAJourChamp(setDonneesSecurite, donneesSecurite, 'motDePasseActuel', e.target.value)}
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
                                                value={donneesSecurite.nouveauMotDePasse}
                                                onChange={(e) => mettreAJourChamp(setDonneesSecurite, donneesSecurite, 'nouveauMotDePasse', e.target.value)}
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
                                            value={donneesSecurite.confirmerMotDePasse}
                                            onChange={(e) => mettreAJourChamp(setDonneesSecurite, donneesSecurite, 'confirmerMotDePasse', e.target.value)}
                                            Icon={Lock}
                                        />
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <Submit
                                            text="Mettre à jour"
                                            onClick={saveModificationMotDePasse}
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

                                <form onSubmit={becomeArtisanSave} className="space-y-6">
                                    <div>
                                        <h3 className="text-[12px] font-bold text-[#1B4F72] mb-3 flex items-center gap-2">
                                            <Briefcase className="w-4 h-4 text-[#D35400]" />
                                            Informations professionnelles
                                        </h3>
                                        <div className="grid md:grid-cols-2 gap-4">



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

                                            <Input
                                                label="rayon de travail"
                                                name="rayonTravail"
                                                value={formulaireArtisan.rayonTravail || ''}
                                                onChange={(e) => mettreAJourChamp(setFormulaireArtisan, formulaireArtisan, 'rayonTravail', e.target.value)}
                                                Icon={Disc3}
                                            />

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
                                                accept="image/*,.pdf"
                                                required
                                                maxSize={1}
                                                value={formulaireArtisan.cniRecto}
                                                onChange={(fichier) => mettreAJourChamp(setFormulaireArtisan, formulaireArtisan, 'cniRecto', fichier)}
                                            />
                                            <FileUpload
                                                id="cni-verso"
                                                label="CNI (Verso)"
                                                accept="image/*,.pdf"
                                                required
                                                maxSize={1}
                                                value={formulaireArtisan.cniVerso}
                                                onChange={(fichier) => mettreAJourChamp(setFormulaireArtisan, formulaireArtisan, 'cniVerso', fichier)}
                                            />
                                            <FileUpload
                                                id="id-rib"
                                                label="Attestation de RIB"
                                                accept="image/*,.pdf"
                                                required
                                                maxSize={1}
                                                value={formulaireArtisan.attestationsRib}
                                                onChange={(fichier) => mettreAJourChamp(setFormulaireArtisan, formulaireArtisan, 'attestationsRib', fichier)}
                                            />
                                            <FileUpload
                                                id="diplomes"
                                                label="Diplômes"
                                                accept="image/*,.pdf"
                                                multiple
                                                maxFiles={5}
                                                value={formulaireArtisan.diplomes}
                                                onChange={(fichiers) => mettreAJourChamp(setFormulaireArtisan, formulaireArtisan, 'diplomes', fichiers)}
                                            />
                                            <FileUpload
                                                id="attestations"
                                                label="Attestations"
                                                accept="image/*,.pdf"
                                                multiple
                                                maxFiles={3}
                                                value={formulaireArtisan.attestations}
                                                onChange={(fichiers) => mettreAJourChamp(setFormulaireArtisan, formulaireArtisan, 'attestations', fichiers)}
                                            />
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
                                            onClick={becomeArtisanSave}
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


        </div>
    );
};

export default PageParametres;