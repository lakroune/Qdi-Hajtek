import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import Logo from '../logo/Logo';

const Footer = ({
    variant = 'dark', // 'dark' | 'light'

    showSocials = true,
    showContact = true,
    customLinks = null,
    className = ''
}) => {
    const currentYear = new Date().getFullYear();

    // Configuration des liens par défaut
    const defaultLinks = {
        services: [
            { name: 'Plomberie', to: '/services?category=plomberie' },
            { name: 'Électricité', to: '/services?category=electricite' }

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



                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">

                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <Logo size="md" variant={theme.logoVariant} className="mb-4" />
                        <p className="text-sm mb-6 max-w-xs">
                            La plateforme de confiance pour trouver les meilleurs artisans au Maroc.
                            Des professionnels vérifiés pour tous vos travaux.
                        </p>

                        {/* Contact Info   */}
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

                        {/* Social Links  */}
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
            </div>
        </footer>
    );
};


export default Footer;