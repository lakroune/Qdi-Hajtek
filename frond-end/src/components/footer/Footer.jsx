import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import Logo from '../logo/Logo';

const Footer = ({
    showContact = true,
}) => {

    const links = {



        help: [
            { name: 'Contact', to: '' },
            { name: 'Comment ça marche', to: '' },
            { name: 'Centre d\'aide', to: '' },
        ],
        legal: [
            { name: 'Conditions d\'utilisation', to: '' },
            { name: 'Confidentialité', to: '' },
            { name: 'Mentions légales', to: '' },
        ],
        company: [
            { name: 'À propos', to: '' },
        ]
    };






    return (
        <footer className={`bg-gray-900 text-gray-400 py-12  `}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 ">

                    <div className="lg:col-span-2">
                        <Logo size="md" variant="light" className="mb-4" />

                        <p className="text-sm mb-6 max-w-xs">
                            La plateforme de confiance pour trouver les meilleurs artisans au Maroc.
                            Des professionnels vérifiés pour tous vos travaux.
                        </p>

                        {showContact && (
                            <div className="space-y-3 mb-6">
                                <a href="mailto:contact@qdihajtek.ma" className={`flex items-center gap-2 text-sm hover:text-white transition-colors`}>
                                    <Mail className="w-4 h-4" />
                                    lakroune00@gmail.com
                                </a>
                                <a href="tel:+212520123456" className={`flex items-center gap-2 text-sm hover:text-white transition-colors`}>
                                    <Phone className="w-4 h-4" />
                                    +212 5 20 123 456
                                </a>
                                <p className="flex items-center gap-2 text-sm">
                                    <MapPin className="w-4 h-4" />
                                    Casablanca, Maroc
                                </p>
                            </div>
                        )}


                    </div>



                    <div>
                        <h4 className={`text-white font-semibold mb-4`}>Aide</h4>
                        <ul className="space-y-3 text-sm">
                            {links.help.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.to} className={`hover:text-white transition-colors`}>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className={`text-white font-semibold mb-4`}>Légal</h4>
                        <ul className="space-y-3 text-sm">
                            {links.legal.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.to} className={`hover:text-white transition-colors`}>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};


export default Footer;