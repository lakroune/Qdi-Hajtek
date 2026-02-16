import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import Logo from '../logo/Logo';

const Footer = ({ 
    variant = 'dark', // 'dark' | 'light'
    showNewsletter = false,
    showSocials = true,
    showContact = false,
    customLinks = null,
    className = ''
}) => {
    const currentYear = new Date().getFullYear();

    // Configuration des liens par défaut
    const defaultLinks = {
        services: [
            { name: 'Plomberie', to: '/services?category=plomberie' },
            { name: 'Électricité', to: '/services?category=electricite' },
            { name: 'Menuiserie', to: '/services?category=menuiserie' },
            { name: 'Peinture', to: '/services?category=peinture' },
            { name: 'Climatisation', to: '/services?category=climatisation' },
            { name: 'Jardinage', to: '/services?category=jardinage' },
        ],
        help: [
            { name: 'FAQ', to: '/faq' },
            { name: 'Contact', to: '/contact' },
            { name: 'Comment ça marche', to: '/how-it-works' },
            { name: 'Centre d\'aide', to: '/help' },
        ],
        legal: [
            { name: 'Conditions d\'utilisation', to: '/terms' },
            { name: 'Confidentialité', to: '/privacy' },
            { name: 'Cookies', to: '/cookies' },
            { name: 'Mentions légales', to: '/legal' },
        ],
        company: [
            { name: 'À propos', to: '/about' },
            { name: 'Carrières', to: '/careers' },
            { name: 'Presse', to: '/press' },
            { name: 'Blog', to: '/blog' },
        ]
    };

    const links = customLinks || defaultLinks;

    // Variantes de style
    const styles = {
        dark: {
            bg: 'bg-gray-900',
            text: 'text-gray-400',
            textHover: 'hover:text-white',
            border: 'border-gray-800',
            heading: 'text-white',
            logoVariant: 'light'
        },
        light: {
            bg: 'bg-white',
            text: 'text-gray-600',
            textHover: 'hover:text-orange-600',
            border: 'border-gray-200',
            heading: 'text-gray-900',
            logoVariant: 'default'
        }
    };

    const theme = styles[variant];

    return (
        <footer className={`${theme.bg} ${theme.text} py-12 ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Newsletter Section (optionnel) */}
                {showNewsletter && (
                    <div className={`mb-12 pb-12 ${theme.border} border-b`}>
                        <div className="max-w-2xl mx-auto text-center">
                            <h3 className={`text-2xl font-bold ${theme.heading} mb-3`}>
                                Restez informé
                            </h3>
                            <p className="mb-6">
                                Recevez nos meilleures offres et nouveautés directement dans votre boîte mail.
                            </p>
                            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                                <input
                                    type="email"
                                    placeholder="Votre email"
                                    className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                                />
                                <button className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition-colors">
                                    S'abonner
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
                    
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <Logo size="s-3" variant={theme.logoVariant} className="mb-4" />
                        <p className="text-sm mb-6 max-w-xs">
                            La plateforme de confiance pour trouver les meilleurs artisans au Maroc. 
                            Des professionnels vérifiés pour tous vos travaux.
                        </p>
                        
                        {/* Contact Info (optionnel) */}
                        {showContact && (
                            <div className="space-y-3 mb-6">
                                <a href="mailto:contact@qdihajtek.ma" className={`flex items-center gap-2 text-sm ${theme.textHover} transition-colors`}>
                                    <Mail className="w-4 h-4" />
                                    contact@qdihajtek.ma
                                </a>
                                <a href="tel:+212520123456" className={`flex items-center gap-2 text-sm ${theme.textHover} transition-colors`}>
                                    <Phone className="w-4 h-4" />
                                    +212 5 20 123 456
                                </a>
                                <p className="flex items-center gap-2 text-sm">
                                    <MapPin className="w-4 h-4" />
                                    Casablanca, Maroc
                                </p>
                            </div>
                        )}

                        {/* Social Links (optionnel) */}
                        {showSocials && (
                            <div className="flex gap-4">
                                {[
                                    { icon: Facebook, href: '#', label: 'Facebook' },
                                    { icon: Instagram, href: '#', label: 'Instagram' },
                                    { icon: Twitter, href: '#', label: 'Twitter' },
                                    { icon: Linkedin, href: '#', label: 'LinkedIn' },
                                ].map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        aria-label={social.label}
                                        className={`w-10 h-10 rounded-full bg-white/10 flex items-center justify-center ${theme.textHover} hover:bg-white/20 transition-all`}
                                    >
                                        <social.icon className="w-5 h-5" />
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Services Links */}
                    <div>
                        <h4 className={`${theme.heading} font-semibold mb-4`}>Services</h4>
                        <ul className="space-y-3 text-sm">
                            {links.services.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.to} className={`${theme.textHover} transition-colors`}>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Help Links */}
                    <div>
                        <h4 className={`${theme.heading} font-semibold mb-4`}>Aide</h4>
                        <ul className="space-y-3 text-sm">
                            {links.help.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.to} className={`${theme.textHover} transition-colors`}>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className={`${theme.heading} font-semibold mb-4`}>Légal</h4>
                        <ul className="space-y-3 text-sm">
                            {links.legal.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.to} className={`${theme.textHover} transition-colors`}>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className={`${theme.border} border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4`}>
                    <p className="text-sm">
                        © {currentYear} Qdi Hajtek. Tous droits réservés.
                    </p>
                    <div className="flex items-center gap-6 text-sm">
                        <Link to="/terms" className={`${theme.textHover} transition-colors`}>
                            CGU
                        </Link>
                        <Link to="/privacy" className={`${theme.textHover} transition-colors`}>
                            Confidentialité
                        </Link>
                        <Link to="/cookies" className={`${theme.textHover} transition-colors`}>
                            Cookies
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

// Version simplifiée (minimal)
export const FooterMinimal = ({ className = '' }) => {
    return (
        <footer className={`bg-gray-900 text-gray-400 py-6 ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <Logo size="s-2" variant="light" />
                <p className="text-sm">© {new Date().getFullYear()} Qdi Hajtek. Tous droits réservés.</p>
            </div>
        </footer>
    );
};

export default Footer;