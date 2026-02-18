import React, { useState } from 'react';
import { 
    Star, MapPin, Phone, Mail, Clock, CheckCircle, 
    Award, Briefcase, Heart, Share2, Flag, Calendar,
    ChevronLeft, ChevronRight, Image as ImageIcon,
    MessageCircle, FileText, Shield, ThumbsUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/footer/Footer';

const ArtisanPortfolioPage = () => {
    const [activeTab, setActiveTab] = useState('services');
    const [isLiked, setIsLiked] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Données de l'artisan (simulation API)
    const artisan = {
        id: 1,
        name: 'Ahmed Benali',
        specialty: 'Plombier Expert',
        avatar: '/images/artisans/ahmed.jpg',
        coverImage: '/images/d.png',
        rating: 4.9,
        reviewsCount: 328, // Changé ici pour éviter le conflit
        completedJobs: 450,
        experience: '15 ans',
        location: 'Casablanca',
        address: '123 Boulevard Mohammed V, Casablanca',
        phone: '+212 6 12 34 56 78',
        email: 'ahmed.benali@email.com',
        isVerified: true,
        isOnline: true,
        about: `Plombier professionnel avec plus de 15 ans d'expérience dans la réparation et l'installation sanitaire. 
                Spécialisé dans les urgences (fuites, débouchage) et les rénovations complètes. 
                Intervention rapide 24/7 dans tout le Grand Casablanca.`,
        badges: ['Top Rated 2024', 'Urgence 24/7', 'Garantie 2 ans', 'Déplacement gratuit'],
        certifications: ['CAP Plomberie', 'Certification Gaz', 'Assurance Responsabilité Civile'],
        languages: ['Français', 'Arabe', 'Anglais'],
        availability: {
            lundi: '08:00 - 18:00',
            mardi: '08:00 - 18:00',
            mercredi: '08:00 - 18:00',
            jeudi: '08:00 - 18:00',
            vendredi: '08:00 - 12:00',
            samedi: 'Sur rendez-vous',
            dimanche: 'Fermé'
        },
        services: [
            {
                id: 1,
                title: 'Réparation fuite d\'eau',
                description: 'Détection et réparation de fuites sur toutes types de canalisations',
                price: 'À partir de 150 DH',
                duration: '30 min - 2h',
                image: '/images/services/fuite.jpg'
            },
            {
                id: 2,
                title: 'Débouchage canalisation',
                description: 'Débouchage évier, douche, WC avec matériel professionnel',
                price: 'À partir de 200 DH',
                duration: '1h - 3h',
                image: '/images/services/debouchage.jpg'
            },
            {
                id: 3,
                title: 'Installation sanitaire',
                description: 'Pose lavabo, douche, baignoire, WC suspendu',
                price: 'À partir de 500 DH',
                duration: '2h - 4h',
                image: '/images/services/installation.jpg'
            },
            {
                id: 4,
                title: 'Rénovation salle de bain',
                description: 'Rénovation complète plomberie salle de bain',
                price: 'Sur devis',
                duration: '1-3 jours',
                image: '/images/services/renovation.jpg'
            }
        ],
        portfolio: [
            { id: 1, src: '/images/portfolio/1.jpg', title: 'Rénovation complète appartement', category: 'Rénovation' },
            { id: 2, src: '/images/portfolio/2.jpg', title: 'Installation douche italienne', category: 'Installation' },
            { id: 3, src: '/images/portfolio/3.jpg', title: 'Réparation fuite complexe', category: 'Urgence' },
            { id: 4, src: '/images/portfolio/4.jpg', title: 'Salle de bain moderne', category: 'Rénovation' },
            { id: 5, src: '/images/portfolio/5.jpg', title: 'Installation cuisine', category: 'Installation' },
            { id: 6, src: '/images/portfolio/6.jpg', title: 'Débouchage industriel', category: 'Maintenance' }
        ],
        reviews: [
            {
                id: 1,
                author: 'Fatima Zahra',
                avatar: '/images/avatars/fatima.jpg',
                rating: 5,
                date: 'Il y a 2 jours',
                comment: 'Excellent travail ! Ahmed est arrivé en 20 minutes pour une fuite urgente. Très professionnel et prix correct. Je recommande vivement.',
                service: 'Réparation fuite d\'eau',
                verified: true
            },
            {
                id: 2,
                author: 'Karim Fassi',
                avatar: '/images/avatars/karim.jpg',
                rating: 5,
                date: 'Il y a 1 semaine',
                comment: 'Installation de ma salle de bain complète. Travail soigné, respect des délais et prix conforme au devis. Merci !',
                service: 'Rénovation salle de bain',
                verified: true
            },
            {
                id: 3,
                author: 'Sanaa Bennani',
                avatar: '/images/avatars/sanaa.jpg',
                rating: 4,
                date: 'Il y a 2 semaines',
                comment: 'Bon artisan, intervention rapide. Petit bémol sur le délai de réponse au téléphone.',
                service: 'Débouchage canalisation',
                verified: true
            }
        ],
        stats: {
            responseTime: '< 1h',
            completionRate: '98%',
            repeatCustomers: '45%'
        }
    };

    const tabs = [
        { id: 'services', label: 'Services', count: artisan.services.length },
        { id: 'portfolio', label: 'Portfolio', count: artisan.portfolio.length },
        { id: 'reviews', label: 'Avis', count: artisan.reviews.length },
        { id: 'about', label: 'À propos' }
    ];

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % artisan.portfolio.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + artisan.portfolio.length) % artisan.portfolio.length);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header isAuthenticated={true} userType="client" userName="Client" />

            {/* Cover Image */}
            <div className="relative h-60 md:h-80 sm:h-45 bg-white-900">
                <img 
                    src={artisan.coverImage} 
                    alt="Cover"
                    className=" h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 pb-12" >
                
                {/* Header Card */}
                <div className="bg-white  p-6 md:p-8 mb-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Avatar */}
                        <div className="relative">
                            <img 
                                src={artisan.avatar} 
                                alt={artisan.name}
                                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-lg"
                            />
                            {artisan.isOnline && (
                                <span className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></span>
                            )}
                            {/* {artisan.isVerified &&(
                                <div className="absolute top-2 right-0 bg-blue-500 text-white p-1.5 rounded-full shadow-md" title="Artisan vérifié">
                                    <CheckCircle className="w-4 h-4" />
                                </div>
                            )} */}
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                <div>
                                    <h1 className="text-2xl  font-bold text-gray-900">{artisan.name}</h1>
                                    <p className="text-orange-600 text-[12px] font-medium text-lg">{artisan.specialty}</p>
                                    
                                    <div className="flex items-center gap-4 mt-2 text-[12px] text-gray-600">
                                        <span className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                            <span className="font-semibold text-gray-900">{artisan.rating}</span>
                                            ({artisan.reviewsCount} avis)
                                        </span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            <Briefcase className="w-4 h-4" />
                                            {artisan.completedJobs} travaux
                                        </span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            {artisan.location}
                                        </span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3">
                                    <button 
                                        onClick={() => setIsLiked(!isLiked)}
                                        className={`p-3 rounded-xl transition-all ${
                                            isLiked ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                    >
                                        <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
                                    </button>
                                    <button className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors">
                                        <Share2 className="w-6 h-6" />
                                    </button>
                                    <button className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors">
                                        <Flag className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>

                            {/* Badges */}
                            <div className="flex flex-wrap gap-2 mt-4">
                                {artisan.badges.map((badge, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-orange-100 text-orange-700 text-sm font-medium rounded-full flex items-center gap-1">
                                        <Award className="w-3.5 h-3.5" />
                                        {badge}
                                    </span>
                                ))}
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-3 gap-4 mt-6 p-4 bg-gray-50 rounded-xl">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-gray-900">{artisan.stats.responseTime}</p>
                                    <p className="text-xs text-gray-500">Temps de réponse</p>
                                </div>
                                <div className="text-center border-x border-gray-200">
                                    <p className="text-2xl font-bold text-gray-900">{artisan.stats.completionRate}</p>
                                    <p className="text-xs text-gray-500">Travaux terminés</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-gray-900">{artisan.stats.repeatCustomers}</p>
                                    <p className="text-xs text-gray-500">Clients fidèles</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Card (Desktop) */}
                        <div className="hidden lg:block w-72 space-y-3">
                            <button className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
                                <MessageCircle className="w-5 h-5" />
                                Contacter
                            </button>
                            <button className="w-full py-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
                                <Calendar className="w-5 h-5" />
                                Prendre RDV
                            </button>
                            <div className="p-4 bg-gray-50 rounded-xl space-y-2">
                                <a href={`tel:${artisan.phone}`} className="flex items-center gap-3 text-gray-700 hover:text-orange-600">
                                    <Phone className="w-5 h-5" />
                                    <span className="text-sm">{artisan.phone}</span>
                                </a>
                                <a href={`mailto:${artisan.email}`} className="flex items-center gap-3 text-gray-700 hover:text-orange-600">
                                    <Mail className="w-5 h-5" />
                                    <span className="text-sm truncate">{artisan.email}</span>
                                </a>
                                <p className="flex items-center gap-3 text-gray-700 text-sm">
                                    <MapPin className="w-5 h-5 flex-shrink-0" />
                                    <span className="truncate">{artisan.address}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Contact Buttons */}
                    <div className="flex gap-3 mt-6 lg:hidden">
                        <button className="flex-1 py-3 bg-orange-600 text-white font-semibold rounded-xl">
                            Contacter
                        </button>
                        <button className="flex-1 py-3 bg-gray-900 text-white font-semibold rounded-xl">
                            RDV
                        </button>
                    </div>
                </div>

               
            </div>

            {/* Image Lightbox */}
            {selectedImage && artisan.portfolio.length > 0 && (
                <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
                    <button 
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-4 right-4 p-2 text-white/80 hover:text-white"
                    >
                        <span className="text-2xl">×</span>
                    </button>
                    <button 
                        onClick={prevImage}
                        className="absolute left-4 p-2 text-white/80 hover:text-white"
                    >
                        <span className="p-2 bg-white/10 rounded-full block"><ChevronLeft className="w-8 h-8" /></span>
                    </button>
                    <img 
                        src={artisan.portfolio[currentImageIndex].src} 
                        alt={artisan.portfolio[currentImageIndex].title}
                        className="max-w-full max-h-[80vh] object-contain rounded-lg"
                    />
                    <button 
                        onClick={nextImage}
                        className="absolute right-4 p-2 text-white/80 hover:text-white"
                    >
                        <span className="p-2 bg-white/10 rounded-full block"><ChevronRight className="w-8 h-8" /></span>
                    </button>
                    <div className="absolute bottom-4 left-0 right-0 text-center text-white">
                        <p className="font-medium">{artisan.portfolio[currentImageIndex].title}</p>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default ArtisanPortfolioPage;