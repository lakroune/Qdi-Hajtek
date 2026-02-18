import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Search, Bell, ChevronDown, LogOut, Settings, Heart } from 'lucide-react';
import Logo from '../logo/Logo';
import LogoutModal from '../models/LogoutModal';

const Header = ({ isAuthenticated = false, userType = 'client', userName = '', notifications = 0 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Artisans', path: '/artisans' },

  ];

  const isActive = (path) => location.pathname === path;
  const handleLogout = async () => {

    // api 
    setIsLoggingOut(true);
    setShowLogoutModal(false);
    setTimeout(() => {
      window.location.href = '/login';
    }, 1000);
  };
  return (
    <>
      <header style={{ backgroundImage: "url('/images/hero-x.webp')", backgroundSize: '6%', opacity: 0.89 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-3'
          : 'bg-white py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <Logo variant="dark" size="sm" />
            </Link>

            {/* Navigation Desktop */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors relative group ${isActive(link.path)
                    ? 'text-orange-600'
                    : 'text-gray-700 hover:text-orange-600'
                    }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-orange-600 transition-all duration-300 ${isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                </Link>
              ))}
            </nav>

            {/* Actions Desktop */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Search Button */}
              <button className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-all">
                <Search className="w-5 h-5" />
              </button>

              {!isAuthenticated ? (
                // Non connecté : boutons login/register
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className="px-5 py-2.5 text-sm font-semibold text-gray-700 hover:text-orange-600 transition-colors"
                  >
                    Se connecter
                  </Link>
                  <Link
                    to="/register"
                    className="px-5 py-2.5 text-sm font-semibold bg-gray-900 hover:bg-orange-600 text-white  transition-all "
                  >
                    S'inscrire
                  </Link>
                </div>
              ) : (
                // Connecté : notifications + profil
                <>
                  {/* Notifications */}
                  <button className="relative p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-all">
                    <Bell className="w-5 h-5" />
                    {notifications > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {notifications > 9 ? '9+' : notifications}
                      </span>
                    )}
                  </button>

                  {/* Favoris (client uniquement) */}
                  {userType === 'client' && (
                    <button className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-all">
                      <Heart className="w-5 h-5" />
                    </button>
                  )}

                  {/* Dropdown Profil */}
                  <div className="relative">
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center gap-3 pl-2 pr-4 py-2 rounded-full  transition-all  border-gray-200"
                    >
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-orange-600" />
                      </div>

                    </button>

                    {/* Menu Profil */}
                    {isProfileOpen && (
                      <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-semibold text-gray-900">{userName}</p>
                          <p className="text-xs text-gray-500 capitalize">{userType}</p>
                        </div>

                        <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                          <User className="w-4 h-4" />
                          Tableau de bord
                        </Link>
                        <Link to="/settings" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                          <Settings className="w-4 h-4" />
                          Paramètres
                        </Link>

                        <div className="border-t border-gray-100 mt-2 pt-2">
                          <button  onClick={() => setShowLogoutModal(true)} className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 w-full transition-colors">
                            <LogOut className="w-4 h-4"  />
                            Déconnexion
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu  */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}>
          <div className="px-4 py-6 space-y-4">
            {/* Mobile Navigation */}
            <nav className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${isActive(link.path)
                    ? 'bg-orange-50 text-orange-600'
                    : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="border-t border-gray-100 pt-4">
              {!isAuthenticated ? (
                <div className="space-y-3">
                  <Link
                    to="/login"
                    className="block w-full px-4 py-3 text-center text-base font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    Se connecter
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full px-4 py-3 text-center text-base font-semibold text-white bg-gray-900 hover:bg-orange-600 rounded-xl transition-colors"
                  >
                    S'inscrire
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl">
                    <User className="w-5 h-5" />
                    Mon compte
                  </Link>
                  <Link to="/settings" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl">
                    <Settings className="w-5 h-5" />
                    Paramètres
                  </Link>
                  <button  onClick={() => setShowLogoutModal(true)} className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl w-full">
                    <LogOut className="w-5 h-5" />
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        isLoading={isLoggingOut}
        userName="Ahmed Benali"
        variant="default"
      />

    </>
  );
};

export default Header;