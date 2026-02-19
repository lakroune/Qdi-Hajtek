import React from 'react';
import { Link } from 'react-router-dom';
import { 
    AlertTriangle, Home, ArrowLeft, 
    Search, Wrench, Hammer 
} from 'lucide-react';

const NotFoundPage = () => {
    const suggestions = [
        { label: 'Plomberie', path: '/services/plomberie', icon: Wrench },
        { label: 'Électricité', path: '/services/electricite', icon: Hammer },
        { label: 'Menuiserie', path: '/services/menuiserie', icon: Wrench },
        { label: 'Peinture', path: '/services/peinture', icon: Hammer },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            
            

            <main className="flex-1 flex items-center justify-center  p-4">
                <div className="max-w-2xl w-full text-center">
                    
                    <div className="mb-8">
                        <div className="relative inline-block">
                            <div className="w-48 h-48 bg-[#1B4F72]/10 mx-auto mb-6 relative">
                                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#1B4F72]"></div>
                                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#1B4F72]"></div>
                                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#1B4F72]"></div>
                                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#1B4F72]"></div>
                                
                                {/* 404 Text */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-[72px] font-bold text-[#1B4F72] leading-none">404</span>
                                </div>
                                
                                {/* Alert icon */}
                                <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#D35400] flex items-center justify-center">
                                    <AlertTriangle className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </div>
                        
                        <h1 className="text-[20px] font-bold text-[#1B4F72] mb-2">
                            Page non trouvée
                        </h1>
                        <p className="text-[13px] text-gray-500 max-w-md mx-auto leading-relaxed">
                            Oups ! La page que vous recherchez semble introuvable. 
                            Elle a peut-être été déplacée, supprimée ou n'a jamais existé.
                        </p>
                    </div>

                    

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
                        <Link 
                            to="/"
                            className="flex items-center gap-2 px-6 py-3 bg-[#1B4F72] hover:bg-[#D35400] text-white text-[12px] font-medium transition-colors w-full sm:w-auto justify-center"
                        >
                            <Home className="w-4 h-4" />
                            Retour à l'accueil
                        </Link>
                        <button 
                            onClick={() => window.history.back()}
                            className="flex items-center gap-2 px-6 py-3 border border-gray-200 hover:border-[#1B4F72] text-[12px] text-gray-600 hover:text-[#1B4F72] transition-colors w-full sm:w-auto justify-center"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Page précédente
                        </button>
                    </div>

                   

                    <div className="mt-8 p-4 bg-gray-100 border border-gray-200">
                        <p className="text-[11px] text-gray-600">
                            Besoin d'aide ? Contactez notre support à{' '}
                            <a href="mailto:support@qdihajtek.ma" className="text-[#D35400] hover:underline">
                                support@qdihajtek.ma
                            </a>
                        </p>
                    </div>
                </div>
            </main>

            
        </div>
    );
};

export default NotFoundPage;