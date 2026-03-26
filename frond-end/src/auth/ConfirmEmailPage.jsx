import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, Clock, CheckCircle, XCircle, RefreshCw, Lock } from 'lucide-react';
import Logo from '../components/logo/Logo';
import axiosClient from "../api/axios-client";
import toast from 'react-hot-toast';

const EmailConfirmationPage = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [statut, setStatut] = useState('');
  const [estEnTrainDeRenvoyer, setEstEnTrainDeRenvoyer] = useState(false);
  const [compteARebours, setCompteARebours] = useState(0);

  const inputsposition = useRef([]);
  const navigate = useNavigate();

  const chanfeCode = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    if (value && index < 5) {
      inputsposition.current[index + 1].focus();
    }
  };

  const returnKey = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputsposition.current[index - 1].focus();
    }
  };

  const gererRenvoi = async () => {
    setEstEnTrainDeRenvoyer(true);
    try {
      await axiosClient.post('/renvoyer-email');
      setCompteARebours(60);
    } catch (error) {
      toast.error("Impossible de renvoyer le code");
    } finally {
      setEstEnTrainDeRenvoyer(false);
    }
  };

  const verifierCode = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosClient.post('/verifier-email', {
        code_verification: code.join('')
      });

      if (response.data.success) {
        toast.success("votre compte a bien verifier");
        navigate('/auth/login');

      } else {
        toast.error(response.data.message || "Code invalide");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Erreur de validation");
      } else {
        toast.error("Erreur de connexion au serveur");
      }
    }
  };

  useEffect(() => {
    if (compteARebours > 0) {
      const timer = setTimeout(() => setCompteARebours(compteARebours - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [compteARebours]);


  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#1B4F72]">
        <div className="fixed z-10 flex flex-col justify-between p-12 w-1/2 text-white h-full bg-gray-900/40 bg-blend-overlay"
          style={{ backgroundImage: `url("/images/artisan-workspace.png")`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <Logo />
          <div>
            <h1 className="text-[28px] font-bold mb-4">Sécurisez votre compte</h1>
            <p className="text-[13px] text-white/80">Saisissez le code de validation envoyé à votre adresse email.</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-[12px]"><Shield className="text-[#D35400] w-4 h-4" /> Protection des données</div>
            <div className="flex items-center gap-3 text-[12px]"><Clock className="text-[#D35400] w-4 h-4" /> Validation rapide</div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-6 lg:p-12">
        <div className="w-full max-w-sm text-center">
          <div className="w-16 h-16 bg-[#1B4F72]/10   flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-[#1B4F72]" />
          </div>
          <h2 className="text-[20px] font-bold text-[#1B4F72] mb-2">Vérification de l'email</h2>
          <p className="text-[12px] text-gray-500 mb-8">Entrez le code à 6 chiffres reçu par email.</p>

          <form onSubmit={verifierCode} className="space-y-8">
            <div className="flex justify-center gap-2 sm:gap-4">
              {code.map((chiffre, index) => (
                <input
                  key={index}
                  ref={el => inputsposition.current[index] = el}
                  type="text"
                  maxLength="1"
                  value={chiffre}
                  onChange={(e) => chanfeCode(index, e.target.value)}
                  onKeyDown={(e) => returnKey(index, e)}
                  className="w-10 h-14 sm:w-12 sm:h-16 text-center text-2xl font-bold border-2 border-gray-200 focus:border-[#D35400] focus:ring-0 outline-none transition-all  "
                  disabled={statut === 'en_cours'}
                />
              ))}
            </div>

           


            <button
              type="submit"
              disabled={statut === 'en_cours' || code.some(c => c === '')}
              className="w-full bg-[#1B4F72] hover:bg-[#D35400] text-white py-3 text-[13px] font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50  "
            >
              {statut === 'en_cours' ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin  " />
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