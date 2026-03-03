import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Bell, ChevronDown, LogOut, Settings, Heart, MessageCircle, Briefcase, Calendar } from 'lucide-react';
import Logo from '../logo/Logo';
import LogoutModal from '../models/LogoutModal';

const Header = ({ 
  isAuthenticated = false, 
  userType = 'client', // 'client' | 'artisan'
  userName = '', 
  notifications = 0, 
  messages = 0,
  pendingBookings = 0  
}) => {
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

  // Links dial site (commun)
  const publicLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Artisans', path: '/artisans' },
  ];

  // Links bach ybano ghir l'Artisan
  const artisanLinks = [
    { name: 'Tableau de bord', path: '/artisan/dashboard' },
    { name: 'Mes services', path: '/artisan/services' },
    { name: 'Réservations', path: '/artisan/bookings' },
    { name: 'Disponibilités', path: '/artisan/availability' },
  ];

  // Links bach ybano ghir l'Client
  const clientLinks = [
    { name: 'Mes réservations', path: '/client/bookings' },
    { name: 'Favoris', path: '/client/favorites' },
  ];

  // Khali navLinks yetbadlo 7sab type
  const getNavLinks = () => {
    if (!isAuthenticated) return publicLinks;
    if (userType === 'artisan') return artisanLinks;
    return [...publicLinks, ...clientLinks]; // Client ychof public + li m3a9din
  };

  const navLinks = getNavLinks();

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setShowLogoutModal(false);
    setTimeout(() => {
      window.location.href = '/login';
    }, 1000);
  };

  // Menu items dial profile - yetbadlo 7sab type
  const getProfileMenuItems = () => {
    if (userType === 'artisan') {
      return [
        { to: '/artisan/dashboard', icon: User, label: 'Mon atelier' },
        { to: '/artisan/services', icon: Briefcase, label: 'Mes services' },
        { to: '/artisan/bookings', icon: Calendar, label: 'Réservations' },
        { to: '/artisan/settings', icon: Settings, label: 'Paramètres' },
      ];
    }
    return [
      { to: '/client/dashboard', icon: User, label: 'Mon compte' },
      { to: '/client/bookings', icon: Calendar, label: 'Mes réservations' },
      { to: '/client/favorites', icon: Heart, label: 'Favoris' },
      { to: '/client/settings', icon: Settings, label: 'Paramètres' },
    ];
  };

  const profileMenuItems = getProfileMenuItems();

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm py-2'
            : 'bg-white py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <Logo size="sm" />
            </Link>

            {/* Navigation Desktop */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[11px] font-medium transition-colors relative group uppercase tracking-wide ${
                    isActive(link.path)
                      ? 'text-[#D35400]'
                      : 'text-[#1B4F72] hover:text-[#D35400]'
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#D35400] transition-all duration-300 ${
                    isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              ))}
            </nav>

            {/* Actions Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              {!isAuthenticated ? (
                // Non connecté
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-[11px] font-semibold text-[#1B4F72] hover:text-[#D35400] transition-colors"
                  >
                    Se connecter
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-[11px] font-semibold bg-[#1B4F72] hover:bg-[#D35400] text-white transition-all"
                  >
                    S'inscrire
                  </Link>
                </div>
              ) : (
                // Connecté
                <>
                  {/* Messages */}
                  <button className="relative p-2 text-[#1B4F72] hover:text-[#D35400] hover:bg-[#D35400]/10 rounded-full transition-all">
                    <MessageCircle className="w-4 h-4" />
                    {messages > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#D35400] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                        {messages > 9 ? '9+' : messages}
                      </span>
                    )}
                  </button>

                  {/* Notifications */}
                  <button className="relative p-2 text-[#1B4F72] hover:text-[#D35400] hover:bg-[#D35400]/10 rounded-full transition-all">
                    <Bell className="w-4 h-4" />
                    {notifications > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#D35400] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                        {notifications > 9 ? '9+' : notifications}
                      </span>
                    )}
                  </button>

                  {/* Favoris - ghir Client */}
                  {userType === 'client' && (
                    <button className="p-2 text-[#1B4F72] hover:text-[#D35400] hover:bg-[#D35400]/10 rounded-full transition-all">
                      <Heart className="w-4 h-4" />
                    </button>
                  )}

                  {/* Réservations en attente - ghir Artisan */}
                  {userType === 'artisan' && (
                    <button className="relative p-2 text-[#1B4F72] hover:text-[#D35400] hover:bg-[#D35400]/10 rounded-full transition-all">
                      <Calendar className="w-4 h-4" />
                      {pendingBookings > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-green-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                          {pendingBookings > 9 ? '9+' : pendingBookings}
                        </span>
                      )}
                    </button>
                  )}

                  {/* Dropdown Profil */}
                  <div className="relative">
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center gap-2 pl-2 pr-3 py-1.5     transition-all"
                    >
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                        userType === 'artisan' ? 'bg-[#D35400]/10' : 'bg-[#1B4F72]/10'
                      }`}>
                        <User className={`w-4 h-4 ${
                          userType === 'artisan' ? 'text-[#D35400]' : 'text-[#1B4F72]'
                        }`} />
                      </div>
                      
                    </button>

                    {/* Menu Profil */}
                    {isProfileOpen && (
                      <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-[12px] font-semibold text-[#1B4F72]">{userName}</p>
                          <p className="text-[10px] text-gray-500 capitalize">
                            {userType === 'artisan' ? 'Artisan' : 'Client'}
                          </p>
                        </div>

                        {profileMenuItems.map((item) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            className="flex items-center gap-3 px-4 py-2.5 text-[11px] text-gray-700 hover:bg-[#D35400]/10 hover:text-[#D35400] transition-colors"
                          >
                            <item.icon className="w-3.5 h-3.5" />
                            {item.label}
                          </Link>
                        ))}

                        <div className="border-t border-gray-100 mt-1 pt-1">
                          <button
                            onClick={() => setShowLogoutModal(true)}
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-[#1B4F72] hover:text-[#D35400] rounded-lg transition-all"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}>
          <div className="px-4 py-4 space-y-2">
            <nav className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-2.5 rounded-lg text-[12px] font-medium transition-colors ${
                    isActive(link.path)
                      ? 'bg-[#D35400]/10 text-[#D35400]'
                      : 'text-[#1B4F72] hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="border-t border-gray-100 pt-3 mt-3">
              {!isAuthenticated ? (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    className="block w-full px-4 py-2.5 text-center text-[12px] font-semibold text-[#1B4F72] bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Se connecter
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full px-4 py-2.5 text-center text-[12px] font-semibold text-white bg-[#1B4F72] hover:bg-[#D35400] rounded-lg transition-colors"
                  >
                    S'inscrire
                  </Link>
                </div>
              ) : (
                <div className="space-y-1">
                  {profileMenuItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="flex items-center gap-3 px-4 py-2.5 text-[#1B4F72] hover:bg-[#D35400]/10 rounded-lg"
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="text-[12px]">{item.label}</span>
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
                    onClick={() => setShowLogoutModal(true)}
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
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        isLoading={isLoggingOut}
        userName={userName}
        variant="simple"
      />
    </>
  );
};

export default Header;