import React, { useState } from 'react';
import { 
    Star, MapPin, Phone, Mail, Clock, CheckCircle,
    Award, Briefcase, Heart, Share2, Flag, Calendar,
    ChevronLeft, ChevronRight, MessageCircle
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
        about: `Plombier professionnel avec plus de 15 ans d'expérience dans la réparation et l'installation sanitaire.`,
        badges: ['Top Rated 2024', 'Urgence 24/7', 'Garantie 2 ans'],
        services: [
            {
                id: 1,
                title: 'Réparation fuite d\'eau',
                description: 'Détection et réparation de fuites sur toutes types de canalisations. Intervention rapide 24/7.',
                price: '150 DH',
                duration: '30 min - 2h',
                images: ['/images/d.png', '/images/d.png', '/images/d.png']
            },
            {
                id: 2,
                title: 'Débouchage canalisation',
                description: 'Débouchage évier, douche, WC avec matériel professionnel haute pression.',
                price: '200 DH',
                duration: '1h - 3h',
                images: ['/images/d.png', '/images/d.png']
            },
            {
                id: 3,
                title: 'Installation sanitaire',
                description: 'Pose lavabo, douche, baignoire, WC suspendu. Travail soigné garanti.',
                price: '500 DH',
                duration: '2h - 4h',
                images: ['/images/d.png', '/images/d.png', '/images/d.png', '/images/d.png']
            },
            {
                id: 4,
                title: 'Rénovation salle de bain',
                description: 'Rénovation complète plomberie salle de bain. Devis gratuit sur place.',
                price: 'Sur devis',
                duration: '1-3 jours',
                images: ['/images/d.png', '/images/d.png']
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
                rating: 5,
                date: 'Il y a 2 jours',
                comment: 'Excellent travail ! Intervention rapide et professionnelle.',
                service: 'Réparation fuite d\'eau',
                verified: true
            },
            {
                id: 2,
                author: 'Karim Fassi',
                rating: 5,
                date: 'Il y a 1 semaine',
                comment: 'Travail soigné, respect des délais. Je recommande !',
                service: 'Rénovation salle de bain',
                verified: true
            },
            {
                id: 3,
                author: 'Sanaa Bennani',
                rating: 4,
                date: 'Il y a 2 semaines',
                comment: 'Bon artisan, prix correct.',
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
        { id: 'portfolio', label: 'Portfolio & Services' },
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
            <Header isAuthenticated={true} userType="client" userName="Client" notifications={8} messages={2} />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pt-6 pb-12">
                
                
                <div className="border border-gray-200 p-4 mb-4">
                    <div className="flex gap-4">
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

                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                                <div>
                                    <h1 className="text-[15px] font-bold text-[#1B4F72] truncate">{artisan.name}</h1>
                                    <p className="text-[12px] text-[#D35400] font-medium">{artisan.specialty}</p>
                                    
                                    <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-600">
                                        <span className="flex items-center gap-0.5">
                                            <Star className="w-3 h-3 text-[#D35400] fill-current" />
                                            <span className="font-semibold text-[#1B4F72]">{artisan.rating}</span>
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

                                <div className="flex gap-1">
                                    <button
                                        onClick={() => setIsLiked(!isLiked)}
                                        className={`p-2 border transition-colors ${isLiked ? 'border-[#D35400] bg-[#D35400]/10 text-[#D35400]' : 'border-gray-200 text-gray-400 hover:text-gray-600'}`}
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
                                    <span key={idx} className="px-2 py-0.5 bg-[#1B4F72]/10 text-[#1B4F72] text-[10px] font-medium border border-[#1B4F72]/20">
                                        {badge}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
                        <a href={`tel:${artisan.phone}`} className="flex items-center gap-1.5 text-[12px] text-[#1B4F72] hover:text-[#D35400]">
                            <Phone className="w-3.5 h-3.5" />
                            {artisan.phone}
                        </a>
                        <span className="text-gray-300">|</span>
                        <a href={`mailto:${artisan.email}`} className="flex items-center gap-1.5 text-[12px] text-[#1B4F72] hover:text-[#D35400] truncate">
                            <Mail className="w-3.5 h-3.5" />
                            <span className="truncate">{artisan.email}</span>
                        </a>
                    </div>

                    <div className="flex gap-6 mt-3 pt-3 border-t border-gray-100">
                        <div>
                            <p className="text-[14px] font-bold text-[#1B4F72]">{artisan.stats.responseTime}</p>
                            <p className="text-[10px] text-gray-500">Réponse</p>
                        </div>
                        <div>
                            <p className="text-[14px] font-bold text-[#1B4F72]">{artisan.stats.completionRate}</p>
                            <p className="text-[10px] text-gray-500">Terminés</p>
                        </div>
                        <div>
                            <p className="text-[14px] font-bold text-[#1B4F72]">{artisan.stats.repeatCustomers}</p>
                            <p className="text-[10px] text-gray-500">Fidèles</p>
                        </div>
                    </div>

                    <div className="flex gap-2 mt-3">
                        <button className="flex-1 py-2.5 bg-[#D35400] hover:bg-[#A04000] text-white text-[12px] font-semibold transition-colors flex items-center justify-center gap-1.5">
                            <MessageCircle className="w-3.5 h-3.5" />
                            Contacter
                        </button>
                        <button className="flex-1 py-2.5 bg-[#1B4F72] hover:bg-[#154360] text-white text-[12px] font-semibold transition-colors flex items-center justify-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            Prendre RDV
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200 mb-4">
                    <div className="flex">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    px-4 py-3 text-[12px] font-medium transition-colors border-b-2
                                    ${activeTab === tab.id
                                        ? 'text-[#1B4F72] border-[#D35400]'
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

                {/* PORTFOLIO & SERVICES  */}
                {activeTab === 'portfolio' && (
                    <div className="grid md:grid-cols-2 gap-4">
                        {artisan.services.map((service) => (
                            <div key={service.id} className="border border-gray-200">
                                {/* Grande image principale */}
                                <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
                                    <img 
                                        src={service.images[0]} 
                                        alt={service.title}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                    {service.images.length > 1 && (
                                        <span className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-[10px]">
                                            +{service.images.length - 1} photos
                                        </span>
                                    )}
                                </div>

                                {/* les images */}
                                {service.images.length > 1 && (
                                    <div className="flex gap-1 p-2 border-t border-gray-100">
                                        {service.images.slice(1, 4).map((img, idx) => (
                                            <div key={idx} className="w-16 h-16 flex-shrink-0 border border-gray-200 overflow-hidden">
                                                <img 
                                                    src={img} 
                                                    alt=""
                                                    className="w-full h-full object-cover hover:opacity-80 transition-opacity cursor-pointer"
                                                    onClick={() => {
                                                        setCurrentImageIndex(idx);
                                                        setSelectedImage({ src: img, title: service.title });
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Info service */}
                                <div className="p-3 border-t border-gray-100">
                                    <h3 className="text-[13px] font-bold text-[#1B4F72] mb-1">{service.title}</h3>
                                    <p className="text-[11px] text-gray-600 line-clamp-2 mb-2">{service.description}</p>
                                    
                                    <div className="flex items-center gap-3 text-[10px] text-gray-500 mb-3">
                                        <span className="flex items-center gap-0.5">
                                            <Clock className="w-3 h-3" />
                                            {service.duration}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                        <p className="text-[16px] font-bold text-[#D35400]">{service.price}</p>
                                        <button className="px-4 py-2 bg-[#1B4F72] text-white text-[11px] font-medium hover:bg-[#154360] transition-colors">
                                            Demander
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* AVIS */}
                {activeTab === 'reviews' && (
                    <div className="space-y-3">
                        {artisan.reviews.map((review) => (
                            <div key={review.id} className="border border-gray-200 p-3">
                                <div className="flex items-start gap-2">
                                    <div className="w-8 h-8 bg-[#1B4F72] flex items-center justify-center text-[10px] font-bold text-white">
                                        {review.author.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-[11px] font-bold text-[#1B4F72]">{review.author}</h4>
                                            <span className="text-[9px] text-gray-400">{review.date}</span>
                                        </div>
                                        <div className="flex items-center gap-0.5 my-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star 
                                                    key={i} 
                                                    className={`w-3 h-3 ${i < review.rating ? 'text-[#D35400] fill-current' : 'text-gray-200'}`} 
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

            {/* Lightbox */}
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
                        src={artisan.portfolio[currentImageIndex]?.src || selectedImage.src}
                        alt={selectedImage.title}
                        className="max-w-full max-h-[85vh] object-contain"
                    />
                    <button
                        onClick={nextImage}
                        className="absolute right-4 p-2 text-white/80 hover:text-white"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                    <div className="absolute bottom-4 left-0 right-0 text-center">
                        <p className="text-white text-[12px]">{selectedImage.title}</p>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default ArtisanPortfolioPage;