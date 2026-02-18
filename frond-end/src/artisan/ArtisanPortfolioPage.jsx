import React, { useState } from 'react';
import { 
    Star, MapPin, Phone, Mail, Clock, CheckCircle,
    Award, Briefcase, Heart, Share2, Flag, Calendar,
    ChevronLeft, ChevronRight, MessageCircle, FileText
} from 'lucide-react';
import Header from '../components/Header/Header';
import Footer from '../components/footer/Footer';

const ArtisanPortfolioPage = () => {
    const [activeTab, setActiveTab] = useState('portfolio');
    const [isLiked, setIsLiked] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const artisan = {
        id: 1,
        name: 'Ahmed Benali',
        specialty: 'Plombier Expert',
        avatar: '/images/artisans/ahmed.jpg',
        coverImage: '/images/d.png',
        rating: 4.9,
        reviewsCount: 328,
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
        services: [
            {
                id: 1,
                title: 'Réparation fuite d\'eau',
                description: 'Détection et réparation de fuites sur toutes types de canalisations',
                price: '150 DH',
                duration: '30 min - 2h',
                image: '/images/services/fuite.jpg'
            },
            {
                id: 2,
                title: 'Débouchage canalisation',
                description: 'Débouchage évier, douche, WC avec matériel professionnel',
                price: '200 DH',
                duration: '1h - 3h',
                image: '/images/services/debouchage.jpg'
            },
            {
                id: 3,
                title: 'Installation sanitaire',
                description: 'Pose lavabo, douche, baignoire, WC suspendu',
                price: '500 DH',
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
            { id: 1, src: '/images/d.png', title: 'Rénovation complète appartement', category: 'Rénovation' },
            { id: 2, src: '/images/d.png', title: 'Installation douche italienne', category: 'Installation' },
            { id: 3, src: '/images/d.png', title: 'Réparation fuite complexe', category: 'Urgence' },
            { id: 4, src: '/images/d.png', title: 'Salle de bain moderne', category: 'Rénovation' },
            { id: 5, src: '/images/d.png', title: 'Installation cuisine', category: 'Installation' },
            { id: 6, src: '/images/d.png', title: 'Débouchage industriel', category: 'Maintenance' }
        ],
        reviews: [
            {
                id: 1,
                author: 'Fatima Zahra',
                avatar: '/images/avatars/fatima.jpg',
                rating: 5,
                date: 'Il y a 2 jours',
                comment: 'Excellent travail ! Ahmed est arrivé en 20 minutes pour une fuite urgente. Très professionnel et prix correct.',
                service: 'Réparation fuite d\'eau',
                verified: true
            },
            {
                id: 2,
                author: 'Karim Fassi',
                avatar: '/images/avatars/karim.jpg',
                rating: 5,
                date: 'Il y a 1 semaine',
                comment: 'Installation de ma salle de bain complète. Travail soigné, respect des délais et prix conforme au devis.',
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
        { id: 'portfolio', label: 'Portfolio', count: artisan.portfolio.length },
        { id: 'services', label: 'Services', count: artisan.services.length },
        { id: 'reviews', label: 'Avis', count: artisan.reviews.length }
    ];

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % artisan.portfolio.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + artisan.portfolio.length) % artisan.portfolio.length);
    };

    return (
        <div className="min-h-screen bg-white">
            <Header isAuthenticated={true} userType="client" userName="Client" />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
                
                <div className="border border-gray-200 p-4 mb-4">
                    <div className="flex gap-4">
                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                            <img
                                src={artisan.avatar}
                                alt={artisan.name}
                                className="w-20 h-20 object-cover border border-gray-200"
                            />
                            {artisan.isOnline && (
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                                <div>
                                    <h1 className="text-[15px] font-bold text-[#1e3a5f] truncate">{artisan.name}</h1>
                                    <p className="text-[12px] text-[#1DA1F2] font-medium">{artisan.specialty}</p>
                                    
                                    <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-600">
                                        <span className="flex items-center gap-0.5">
                                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                            <span className="font-semibold text-[#1e3a5f]">{artisan.rating}</span>
                                            <span className="text-gray-400">({artisan.reviewsCount})</span>
                                        </span>
                                        <span className="text-gray-300">|</span>
                                        <span className="flex items-center gap-0.5">
                                            <Briefcase className="w-3 h-3" />
                                            {artisan.completedJobs} travaux
                                        </span>
                                        <span className="text-gray-300">|</span>
                                        <span className="flex items-center gap-0.5">
                                            <MapPin className="w-3 h-3" />
                                            {artisan.location}
                                        </span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-1">
                                    <button
                                        onClick={() => setIsLiked(!isLiked)}
                                        className={`p-2 border transition-colors ${isLiked ? 'border-red-200 bg-red-50 text-red-500' : 'border-gray-200 text-gray-400 hover:text-gray-600'}`}
                                    >
                                        <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                                    </button>
                                    <button className="p-2 border border-gray-200 text-gray-400 hover:text-gray-600 transition-colors">
                                        <Share2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-1.5 mt-2">
                                {artisan.badges.map((badge, idx) => (
                                    <span key={idx} className="px-2 py-0.5 bg-[#1DA1F2]/10 text-[#1e3a5f] text-[10px] font-medium border border-[#1DA1F2]/20">
                                        {badge}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
                        <a href={`tel:${artisan.phone}`} className="flex items-center gap-1.5 text-[12px] text-[#1e3a5f] hover:text-[#1DA1F2]">
                            <Phone className="w-3.5 h-3.5" />
                            {artisan.phone}
                        </a>
                        <span className="text-gray-300">|</span>
                        <a href={`mailto:${artisan.email}`} className="flex items-center gap-1.5 text-[12px] text-[#1e3a5f] hover:text-[#1DA1F2] truncate">
                            <Mail className="w-3.5 h-3.5" />
                            <span className="truncate">{artisan.email}</span>
                        </a>
                        <span className="text-gray-300">|</span>
                        <span className="flex items-center gap-1.5 text-[11px] text-gray-500">
                            <MapPin className="w-3.5 h-3.5" />
                            {artisan.address}
                        </span>
                    </div>

                    <div className="flex gap-6 mt-3 pt-3 border-t border-gray-100">
                        <div>
                            <p className="text-[14px] font-bold text-[#1e3a5f]">{artisan.stats.responseTime}</p>
                            <p className="text-[10px] text-gray-500">Réponse</p>
                        </div>
                        <div>
                            <p className="text-[14px] font-bold text-[#1e3a5f]">{artisan.stats.completionRate}</p>
                            <p className="text-[10px] text-gray-500">Terminés</p>
                        </div>
                        <div>
                            <p className="text-[14px] font-bold text-[#1e3a5f]">{artisan.stats.repeatCustomers}</p>
                            <p className="text-[10px] text-gray-500">Fidèles</p>
                        </div>
                    </div>

                    <div className="flex gap-2 mt-3">
                        <button className="flex-1 py-2.5 bg-[#1DA1F2] hover:bg-[#1a91da] text-white text-[12px] font-semibold transition-colors flex items-center justify-center gap-1.5">
                            <MessageCircle className="w-3.5 h-3.5" />
                            Contacter
                        </button>
                        <button className="flex-1 py-2.5 bg-[#1e3a5f] hover:bg-[#152942] text-white text-[12px] font-semibold transition-colors flex items-center justify-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            Prendre RDV
                        </button>
                    </div>
                </div>

                <div className="border-b border-gray-200 mb-4">
                    <div className="flex">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    px-4 py-3 text-[12px] font-medium transition-colors border-b-2
                                    ${activeTab === tab.id
                                        ? 'text-[#1e3a5f] border-[#1DA1F2]'
                                        : 'text-gray-500 border-transparent hover:text-gray-700'}
                                `}
                            >
                                {tab.label}
                                {tab.count && (
                                    <span className="ml-1.5 text-[10px] text-gray-400">
                                        ({tab.count})
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

            
                {activeTab === 'portfolio' && (
                    <div className="space-y-4">
                        {artisan.services.map((service) => (
                            <div key={service.id} className="border border-gray-200 p-3 hover:border-[#1DA1F2]/50 transition-colors">
                                <div className="flex gap-3">
                                   
                                    <div className="flex-shrink-0 w-32 space-y-1">
                                        <div className="aspect-square relative overflow-hidden border border-gray-100">
                                            <img 
                                                src={service.image} 
                                                alt={service.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                       
                                        <div className="grid grid-cols-3 gap-0.5">
                                            {artisan.portfolio.slice(0, 3).map((item, idx) => (
                                                <div 
                                                    key={idx}
                                                    className="aspect-square cursor-pointer hover:opacity-80 transition-opacity"
                                                    onClick={() => {
                                                        setCurrentImageIndex(idx);
                                                        setSelectedImage(item);
                                                    }}
                                                >
                                                    <img 
                                                        src={item.src} 
                                                        alt=""
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-[13px] font-bold text-[#1e3a5f] mb-1">{service.title}</h3>
                                        <p className="text-[11px] text-gray-600 line-clamp-2 mb-2">{service.description}</p>
                                        
                                        <div className="flex items-center gap-3 text-[10px] text-gray-500 mb-2">
                                            <span className="flex items-center gap-0.5">
                                                <Clock className="w-3 h-3" />
                                                {service.duration}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <p className="text-[15px] font-bold text-[#1DA1F2]">{service.price}</p>
                                            <button className="px-3 py-1.5 bg-[#1e3a5f] text-white text-[11px] font-medium hover:bg-[#152942] transition-colors">
                                                Demander
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'services' && (
                    <div className="space-y-3">
                        {artisan.services.map((service) => (
                            <div key={service.id} className="border border-gray-200 p-3 flex justify-between items-center">
                                <div className="flex-1">
                                    <h3 className="text-[12px] font-bold text-[#1e3a5f]">{service.title}</h3>
                                    <p className="text-[10px] text-gray-500">{service.duration}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[13px] font-bold text-[#1DA1F2]">{service.price}</p>
                                    <button className="mt-1 px-3 py-1 bg-[#1e3a5f] text-white text-[10px]">
                                        Voir
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div className="space-y-3">
                        {artisan.reviews.map((review) => (
                            <div key={review.id} className="border border-gray-200 p-3">
                                <div className="flex items-start gap-2">
                                    <div className="w-8 h-8 bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-600">
                                        {review.author.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-[11px] font-bold text-[#1e3a5f]">{review.author}</h4>
                                            <span className="text-[9px] text-gray-400">{review.date}</span>
                                        </div>
                                        <div className="flex items-center gap-1 my-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star 
                                                    key={i} 
                                                    className={`w-3 h-3 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-200'}`} 
                                                />
                                            ))}
                                        </div>
                                        <p className="text-[11px] text-gray-600">{review.comment}</p>
                                        {review.verified && (
                                            <span className="inline-flex items-center gap-0.5 mt-1 text-[9px] text-green-600">
                                                <CheckCircle className="w-3 h-3" />
                                                Achat vérifié
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

           
            {selectedImage && (
                <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl"
                    >
                        ×
                    </button>
                    <button
                        onClick={prevImage}
                        className="absolute left-4 p-2 text-white/80 hover:text-white"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <img
                        src={artisan.portfolio[currentImageIndex].src}
                        alt={artisan.portfolio[currentImageIndex].title}
                        className="max-w-full max-h-[85vh] object-contain"
                    />
                    <button
                        onClick={nextImage}
                        className="absolute right-4 p-2 text-white/80 hover:text-white"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                    <div className="absolute bottom-4 left-0 right-0 text-center">
                        <p className="text-white text-[12px]">{artisan.portfolio[currentImageIndex].title}</p>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default ArtisanPortfolioPage;