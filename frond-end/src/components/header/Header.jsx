import React, { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md relative">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        <div className="text-2xl font-bold text-blue-600 tracking-tight">
          Qdi <span className="text-slate-800">Hajtek</span>
        </div>

        <ul className={`
          fixed md:static top-[68px] left-0 w-full md:w-auto 
          bg-white md:bg-transparent shadow-lg md:shadow-none
          flex flex-col md:flex-row gap-6 p-6 md:p-0
          transition-all duration-300 ease-in-out
          ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 md:translate-x-0 md:opacity-100'}
        `}>
          <li><a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition">Accueil</a></li>
          <li><a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition">A propos</a></li>
          <li><a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition">Contact</a></li>
          <li><a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition">Connexion</a></li>
        </ul>

        <div 
          className="flex flex-col gap-1.5 cursor-pointer md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className={`h-1 w-7 bg-slate-800 rounded-full transition-all ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
          <span className={`h-1 w-7 bg-slate-800 rounded-full transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`h-1 w-7 bg-slate-800 rounded-full transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
        </div>

      </div>
    </header>
  );
};

export default Header;