import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  ArrowRight, Shield, Clock,
  CheckCircle, XCircle, RefreshCw, Lock
} from 'lucide-react';
import Logo from '../components/logo/Logo';
import axiosClient from "../api/axios-client";

const EmailConfirmationPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [code, setCode] = useState(['', '', '', '']);
  const [statut, setStatut] = useState('saisie');
  const [erreur, setErreur] = useState('');
  const [success, setSuccess] = useState('');
  const [estEnTrainDeRenvoyer, setEstEnTrainDeRenvoyer] = useState(false);
  const [compteARebours, setCompteARebours] = useState(0);

  const inputsRef = useRef([]);

  const handleChange = (index, valeur) => {
    if (isNaN(valeur)) return;

    const nouveauCode = [...code];
    nouveauCode[index] = valeur.substring(valeur.length - 1);
    setCode(nouveauCode);

    if (valeur && index < 3) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const verifierCode = async (e) => {
    e.preventDefault();
    const codeFinal = code.join('');

    if (codeFinal.length < 4) {
      setErreur('Veuillez entrer le code complet.');
      return;
    }

    setStatut('en_cours');
    setErreur('');

    const emailStocke = JSON.parse(localStorage.getItem('USER_DATA')).email;
    const tokenStocke = localStorage.getItem('ACCESS_TOKEN');

    try {
      const { data } = await axiosClient.post('/verifierEmail', {
        code: codeFinal,
        email: emailStocke,
        token: tokenStocke
      });


      setStatut('succes');

      setTimeout(() => navigate('/auth/login'), 1000);
    } catch (err) {
      setStatut('saisie');

      if (err.response && err.response.data.message) {
        setErreur(err.response.data.message);
      } else {
        setErreur('Code incorrect ou problème de connexion.');
      }

      setCode(['', '', '', '']);
      inputsRef.current[0].focus();
    }
  };

  const gererRenvoi = async () => {
    const emailStocke = JSON.parse(localStorage.getItem('USER_DATA')).email;
    const tokenStocke = localStorage.getItem('ACCESS_TOKEN');


    if (!emailStocke || !tokenStocke) {
      setErreur("Session expirée, veuillez vous réinscrire.");
      return;
    }

    setEstEnTrainDeRenvoyer(true);
    setErreur('');

    try {
      await axiosClient.post('/gererRenvoi', {
        email: emailStocke,
        token: tokenStocke
      });

      setCompteARebours(60);
      setSuccess("Un nouveau code a été envoyé à " + emailStocke);

    } catch (err) {
      setErreur(err.response?.data?.message || "Erreur lors du renvoi du code.");
    } finally {
      setEstEnTrainDeRenvoyer(false);
    }
  };

  // Timer pour le bouton renvoyer
  useEffect(() => {
    if (compteARebours > 0) {
      const timer = setTimeout(() => setCompteARebours(compteARebours - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [compteARebours]);

  // Vue Succès
  if (statut === 'succes') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-md bg-white p-8 shadow-sm border border-gray-100 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-[24px] font-bold text-[#1B4F72] mb-3">Email confirmé !</h2>
          <p className="text-[13px] text-gray-600 mb-8">Votre compte est activé. Vous pouvez maintenant vous connecter.</p>
          <Link to="/auth/login" className="w-full bg-[#1B4F72] hover:bg-[#D35400] text-white py-3 text-[13px] font-semibold flex items-center justify-center gap-2 transition-colors">
            Se connecter <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Côté gauche (Desktop) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#1B4F72]">
        <div className="fixed z-10 flex flex-col justify-between p-12 w-1/2 text-white h-full bg-gray-900/40 bg-blend-overlay"
          style={{ backgroundImage: `url("/images/artisan-workspace.png")`, backgroundSize: 'cover' }}>
          <Logo />
          <div>
            <h1 className="text-[28px] font-bold mb-4">Sécurisez votre compte</h1>
            <p className="text-[13px] text-white/80">Saisissez le code de validation envoyé à votre adresse email pour finaliser votre inscription.</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-[12px]"><Shield className="text-[#D35400] w-4 h-4" /> Protection des données</div>
            <div className="flex items-center gap-3 text-[12px]"><Clock className="text-[#D35400] w-4 h-4" /> Validation rapide</div>
          </div>
        </div>
      </div>

      {/* Côté droit (Formulaire) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-6 lg:p-12">
        <div className="w-full max-w-sm text-center">
          <div className="w-16 h-16 bg-[#1B4F72]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-[#1B4F72]" />
          </div>

          <h2 className="text-[20px] font-bold text-[#1B4F72] mb-2">Vérification de l'email</h2>
          <p className="text-[12px] text-gray-500 mb-8">Entrez le code à 4 chiffres envoyé par email.</p>

          <form onSubmit={verifierCode} className="space-y-8">
            <div className="flex justify-center gap-4">
              {code.map((chiffre, index) => (
                <input
                  key={index}
                  ref={el => inputsRef.current[index] = el}
                  type="text"
                  maxLength="1"
                  value={chiffre}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-14 h-16 text-center text-2xl font-bold border-2 border-gray-200 focus:border-[#D35400] focus:ring-0 outline-none transition-all"
                  disabled={statut === 'en_cours'}
                />
              ))}
            </div>

            {erreur && (
              <div className="p-3 bg-red-50 text-red-600 text-[11px] flex items-center justify-center gap-2">
                <XCircle className="w-4 h-4" /> {erreur}
              </div>
            )}
            {(success && statut !== 'en_cours') && (
              <div className="p-3 bg-green-50 text-green-600 text-[11px] flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4" /> {success}
              </div>
            )}


            <button
              type="submit"
              disabled={statut === 'en_cours' || code.some(c => c === '')}
              className="w-full bg-[#1B4F72] hover:bg-[#D35400] text-white py-3 text-[13px] font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              {statut === 'en_cours' ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin" />
              ) : "Vérifier le code"}
            </button>
          </form>

          <div className="mt-8">
            <button
              onClick={gererRenvoi}
              disabled={estEnTrainDeRenvoyer || compteARebours > 0}
              className="text-[12px] text-gray-600 hover:text-[#D35400] flex items-center justify-center gap-2 mx-auto transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${estEnTrainDeRenvoyer ? 'animate-spin' : ''}`} />
              {compteARebours > 0 ? `Renvoyer le code (${compteARebours}s)` : "Je n'ai pas reçu le code"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmationPage;