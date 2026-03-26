import  { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Bell, LogOut, Settings, Heart, MessageCircle, Briefcase, Calendar } from 'lucide-react';
import Logo from '../logo/Logo';
import LogoutModal from '../models/LogoutModal';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const Header = ({
}) => {

  const [estMenuOuvert, setEstMenuOuvert] = useState(false);
  const [estProfilOuvert, setEstProfilOuvert] = useState(false);
  const emplacement = useLocation();
  const [afficherModalDeconnexion, setAfficherModalDeconnexion] = useState(false);
  const [estEnDeconnexion, setEstEnDeconnexion] = useState(false);
  const naviguer = useNavigate();
  const [estAuthentifie, setEstAuthentifie] = useState(true);
  const [dommandesEnAttente, setDommandesEnAttente] = useState(0);
  const [messages, setMessages] = useState(0);
  const [notifications, setNotifications] = useState(0);
  const [typeUtilisateur, setTypeUtilisateur] = useState('client');
  const [nomUtilisateur, setNomUtilisateur] = useState('ismail');
  useEffect(() => {
    setEstMenuOuvert(false);
    setEstProfilOuvert(false);
  }, [emplacement]);

  const liensPublics = [
    { nom: 'Accueil', chemin: '/' },
  ];

  const liensArtisan = [
    { nom: 'Tableau de bord', chemin: '/artisan/dashboard' },
    { nom: 'Mes services', chemin: '/artisan/services' },
  ];

  const liensClient = [
    { nom: 'Favoris', chemin: '/client/favorites' },
  ];

  const obtenirLiensNav = () => {
    if (!estAuthentifie) return liensPublics;
    if (typeUtilisateur === 'artisan') return liensArtisan;
    return [...liensPublics, ...liensClient];
  };

  const liensNav = obtenirLiensNav();

  const estActif = (chemin) => emplacement.pathname === chemin;

  const gererDeconnexion = async () => {
    setEstEnDeconnexion(true);
    try {
      await axiosClient.post('/logout');
      localStorage.removeItem('ACCESS_TOKEN');
      localStorage.removeItem('USER_ROLE');
      naviguer('/login');
    } catch (erreur) {
      console.error("Erreur déconnexion", erreur);
      localStorage.removeItem('ACCESS_TOKEN');
      naviguer('/auth/login');
    } finally {
      setEstEnDeconnexion(false);
      setAfficherModalDeconnexion(false);
    }
  };

  const obtenirElementsMenuProfil = () => {
    if (typeUtilisateur === 'artisan') {
      return [
        { vers: 'services', icone: Briefcase, libelle: 'Services' },
        { vers: '/offres', icone: Calendar, libelle: 'Offres' },
        { vers: '/portfolio', icone: User, libelle: 'Portfolio' },
        { vers: '/parametres', icone: Settings, libelle: 'parametres' },

      ];
    }
    return [
      { vers: '/favorites', icone: Heart, libelle: 'Favoris' },
      { vers: '/mes-offres', icone: Calendar, libelle: 'Offres' },
      { vers: '/parametres', icone: Settings, libelle: 'parametres' },
    ];
  };

  const elementsMenuProfil = obtenirElementsMenuProfil();
// websocket
useEffect(() => {
    const userId = localStorage.getItem('USER_ID'); 

    if (estAuthentifie && window.Echo && userId) {
      
      const noticeChannel = window.Echo.private(`notice.${userId}`)
        .listen('.notice-created', (data) => { 
          console.log("notice-created(Event):", data);
          
          setNotifications(prev => prev + 1);
          
          if (typeUtilisateur === 'artisan') {
             setDommandesEnAttente(prev => prev + 1);
          }
        });

      return () => {
        window.Echo.leave(`notice.${userId}`);
      };
    }
  }, [estAuthentifie]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300  bg-white/95 backdrop-blur-md   py-2
          `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            <Link to="/" className="flex-shrink-0">
              <Logo size="sm" />
            </Link>

            <nav className="hidden lg:flex items-center gap-6">
              {liensNav.map((lien) => (
                <Link
                  key={lien.chemin}
                  to={lien.chemin}
                  className={`text-[11px] font-medium transition-colors relative group uppercase tracking-wide ${estActif(lien.chemin)
                    ? 'text-[#D35400]'
                    : 'text-[#1B4F72] hover:text-[#D35400]'
                    }`}
                >
                  {lien.nom}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#D35400] transition-all duration-300 ${estActif(lien.chemin) ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              {!estAuthentifie ? (
                <div className="flex items-center gap-2">
                  <Link
                    to="/auth/login"
                    className="px-4 py-2 text-[11px] font-semibold text-[#1B4F72] hover:text-[#D35400] transition-colors"
                  >
                    Se connecter
                  </Link>
                  <Link
                    to="/auth/register"
                    className="px-4 py-2 text-[11px] font-semibold bg-[#1B4F72] hover:bg-[#D35400] text-white transition-all"
                  >
                    S'inscrire
                  </Link>
                </div>
              ) : (
                <>
                  <button onClick={() => window.location.href = '/messages'} className="relative p-2 text-[#1B4F72] hover:text-[#D35400]   rounded-full transition-all">
                    <MessageCircle className="w-4 h-4" />
                    {messages > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#D35400] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                        {messages > 9 ? '9+' : messages}
                      </span>
                    )}
                  </button>

                  <button onClick={() => window.location.href = '/notifications'} className="relative p-2 text-[#1B4F72] hover:text-[#D35400]  rounded-full transition-all">
                    <Bell className="w-4 h-4" />
                    {notifications > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#D35400] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                        {notifications > 9 ? '9+' : notifications}
                      </span>
                    )}
                  </button>

                  {typeUtilisateur === 'client' && (
                    <button onClick={() => window.location.href = '/favorites'} className="p-2 text-[#1B4F72] hover:text-[#D35400] rounded-full transition-all">
                      <Heart className="w-4 h-4" />
                    </button>
                  )}

                  {typeUtilisateur === 'artisan' && (
                    <button className="relative p-2 text-[#1B4F72] hover:text-[#D35400] hover:bg-[#D35400]/10 rounded-full transition-all">
                      <Calendar className="w-4 h-4" />
                      {dommandesEnAttente > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-green-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                          {dommandesEnAttente > 9 ? '9+' : dommandesEnAttente}
                        </span>
                      )}
                    </button>
                  )}

                  <div className="relative">
                    <button
                      onClick={() => setEstProfilOuvert(!estProfilOuvert)}
                      className="flex items-center gap-2 pl-2 pr-3 py-1.5 transition-all"
                    >
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center ${typeUtilisateur === 'artisan' ? 'bg-[#D35400]/10' : 'bg-[#1B4F72]/10'
                        }`}>
                        <User className={`w-4 h-4 ${typeUtilisateur === 'artisan' ? 'text-[#D35400]' : 'text-[#1B4F72]'
                          }`} />
                      </div>
                    </button>

                    {estProfilOuvert && (
                      <div className="absolute right-0 top-full mt-2 w-56 bg-white  border border-gray-100 py-2">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-[12px] font-semibold text-[#1B4F72]">{nomUtilisateur}</p>
                          <p className="text-[10px] text-gray-500 capitalize">
                            {typeUtilisateur === 'artisan' ? 'Artisan' : 'Client'}
                          </p>
                        </div>

                        {elementsMenuProfil.map((element) => (
                          <Link
                            key={element.vers}
                            to={element.vers}
                            className="flex items-center gap-3 px-4 py-2.5 text-[11px] text-gray-700 hover:bg-[#D35400]/10 hover:text-[#D35400] transition-colors"
                          >
                            <element.icone className="w-3.5 h-3.5" />
                            {element.libelle}
                          </Link>
                        ))}

                        <div className="border-t border-gray-100 mt-1 pt-1">
                          <button
                            onClick={() => setAfficherModalDeconnexion(true)}
                            className="flex items-center gap-3 px-4 py-2.5 text-[11px] text-red-600 hover:bg-red-50 w-full transition-colors"
                          >
                            <LogOut className="w-3.5 h-3.5" />
                            Déconnexion
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            <button
              onClick={() => setEstMenuOuvert(!estMenuOuvert)}
              className="lg:hidden p-2 text-[#1B4F72] hover:text-[#D35400] rounded-lg transition-all"
            >
              {estMenuOuvert ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className={`lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl transition-all duration-300 ${estMenuOuvert ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}>
          <div className="px-4 py-4 space-y-2">
            <nav className="space-y-1">
              {liensNav.map((lien) => (
                <Link
                  key={lien.chemin}
                  to={lien.chemin}
                  className={`block px-4 py-2.5 rounded-lg text-[12px] font-medium transition-colors ${estActif(lien.chemin)
                    ? 'bg-[#D35400]/10 text-[#D35400]'
                    : 'text-[#1B4F72] hover:bg-gray-50'
                    }`}
                >
                  {lien.nom}
                </Link>
              ))}
            </nav>

            <div className="border-t border-gray-100 pt-3 mt-3">
              {!estAuthentifie ? (
                <div className="space-y-2">
                  <Link
                    to="/auth/login"
                    className="block w-full px-4 py-2.5 text-center text-[12px] font-semibold text-[#1B4F72] bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Se connecter
                  </Link>
                  <Link
                    to="/auth/register"
                    className="block w-full px-4 py-2.5 text-center text-[12px] font-semibold text-white bg-[#1B4F72] hover:bg-[#D35400] rounded-lg transition-colors"
                  >
                    S'inscrire
                  </Link>
                </div>
              ) : (
                <div className="space-y-1">
                  {elementsMenuProfil.map((element) => (
                    <Link
                      key={element.vers}
                      to={element.vers}
                      className="flex items-center gap-3 px-4 py-2.5 text-[#1B4F72] hover:bg-[#D35400]/10 rounded-lg"
                    >
                      <element.icone className="w-4 h-4" />
                      <span className="text-[12px]">{element.libelle}</span>
                    </Link>
                  ))}

                  <Link to="/messages" className="flex items-center gap-3 px-4 py-2.5 text-[#1B4F72] hover:bg-[#D35400]/10 rounded-lg">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-[12px]">Messages</span>
                    {messages > 0 && (
                      <span className="ml-auto px-2 py-0.5 bg-[#D35400] text-white text-[10px] rounded-full">
                        {messages}
                      </span>
                    )}
                  </Link>

                  <button
                    onClick={() => setAfficherModalDeconnexion(true)}
                    className="flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg w-full"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-[12px]">Déconnexion</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <LogoutModal
        estOuvert={afficherModalDeconnexion}
        surFermeture={() => setAfficherModalDeconnexion(false)}
        surConfirmation={gererDeconnexion}
        estEnChargement={estEnDeconnexion}
        nomUtilisateur={nomUtilisateur}
        variante="simple"
      />
    </>
  );
};

export default Header;