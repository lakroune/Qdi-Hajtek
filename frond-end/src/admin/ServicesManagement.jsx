import React, { useState } from 'react';
import { 
    Briefcase, Search, Filter, Grid, List, 
    CheckCircle, XCircle, Eye, Download 
} from 'lucide-react';
import ServiceCard from '../components/cards/ServiceCard';

const ServicesManagement = () => {
    const [viewMode, setViewMode] = useState('grid'); // grid | list
    const [filter, setFilter] = useState('pending');
    const [selectedService, setSelectedService] = useState(null);

    const services = [
        {
            id: 'SRV-001',
            title: 'Réparation fuite d\'eau urgent - Plomberie professionnelle',
            category: 'Plomberie',
            description: 'Intervention rapide pour toute fuite d\'eau, disponible 24h/24. Diagnostic complet, réparation durable avec garantie 1 an sur les pièces et la main d\'œuvre.',
            price: 250,
            priceType: 'heure',
            duration: '1-2 heures',
            location: 'Casablanca et environs',
            images: ['/images/d.png', '/images/services/plombier2.jpg'],
            status: 'pending',
            submittedAt: '2024-01-15 09:30',
            
            artisan: {
                name: 'Karim Benali',
                specialty: 'Plomberie',
                rating: 4.8,
                reviews: 127,
                email: 'karim.plomberie@email.com',
                phone: '+212 6 12 34 56 78',
                cin: 'AB123456',
                experience: '8 ans',
                bio: 'Plombier professionnel certifié, spécialisé dans les urgences et rénovations.',
                documents: ['cin.pdf', 'diplome.pdf', 'assurance.pdf']
            },
            
            details: {
                materials: 'Fournis ( inclus dans le tarif )',
                warranty: '1 an',
                availability: 'Lun-Dim, 24h/24'
            }
        },
        {
            id: 'SRV-002',
            title: 'Installation électrique complète - Norme NFC 15-100',
            category: 'Électricité',
            description: 'Installation tableau électrique, mise aux normes, ajout de prises et luminaires. Devis gratuit, certification conformité fournie.',
            price: 300,
            priceType: 'heure',
            duration: 'Variable selon projet',
            location: 'Rabat, Salé, Témara',
            images: ['/images/services/electricien1.jpg'],
            status: 'approved',
            submittedAt: '2024-01-14 14:15',
            approvedAt: '2024-01-14 16:30',
            approvedBy: 'Admin',
            
            artisan: {
                name: 'Youssef Alaoui',
                specialty: 'Électricité',
                rating: 4.5,
                reviews: 89,
                email: 'youssef.elec@email.com',
                phone: '+212 6 23 45 67 89',
                cin: 'CD789012',
                experience: '5 ans',
                bio: 'Électricien qualifié, expert en installations résidentielles et commerciales.',
                documents: ['cin.pdf', 'qualification.pdf']
            },
            
            details: {
                materials: 'Non fournis (liste fournie)',
                warranty: '2 ans',
                availability: 'Lun-Sam, 8h-18h'
            }
        },
        {
            id: 'SRV-003',
            title: 'Peinture intérieure - Qualité professionnelle',
            category: 'Peinture',
            description: 'Peinture murs, plafonds, boiseries. Préparation des surfaces, application peinture premium finition impeccable.',
            price: 80,
            priceType: 'm²',
            duration: '2-3 jours selon surface',
            location: 'Marrakech',
            images: [],
            status: 'rejected',
            submittedAt: '2024-01-13 10:00',
            rejectedAt: '2024-01-13 15:45',
            rejectedBy: 'Admin',
            rejectionReason: 'Photos de réalisations manquantes, description insuffisante pour évaluer la qualité du service.',
            
            artisan: {
                name: 'Hassan Moussaoui',
                specialty: 'Peinture',
                rating: 3.2,
                reviews: 12,
                email: 'hassan.peinture@email.com',
                phone: '+212 6 34 56 78 90',
                cin: 'EF345678',
                experience: '2 ans',
                bio: 'Peintre en bâtiment, intérieur et extérieur.',
                documents: ['cin.pdf']
            },
            
            details: {
                materials: 'Fournis (peinture premium)',
                warranty: '6 mois',
                availability: 'Lun-Ven, 9h-17h'
            }
        }
    ];

    const filteredServices = services.filter(s => filter === 'all' || s.status === filter);

    const handleApprove = (id) => {
        console.log('Approuver service', id);
    };

    const handleReject = (id) => {
        console.log('Rejeter service', id);
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-[18px] font-bold text-[#1B4F72]">Gestion des Services</h1>
                    <p className="text-[11px] text-gray-500">
                        {services.filter(s => s.status === 'pending').length} service(s) en attente d'approbation
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Rechercher un service..."
                            className="pl-9 pr-4 py-2 text-[12px] border border-gray-200 focus:border-[#1B4F72] focus:outline-none w-64"
                        />
                    </div>
                    <select 
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-3 py-2 text-[12px] border border-gray-200 focus:border-[#1B4F72] focus:outline-none bg-white"
                    >
                        <option value="all">Tous les statuts</option>
                        <option value="pending">En attente</option>
                        <option value="approved">Approuvés</option>
                        <option value="rejected">Rejetés</option>
                    </select>
                    <div className="flex border border-gray-200">
                        <button 
                            onClick={() => setViewMode('grid')}
                            className={`p-2 ${viewMode === 'grid' ? 'bg-[#1B4F72] text-white' : 'text-gray-400 hover:text-[#1B4F72]'}`}
                        >
                            <Grid className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={() => setViewMode('list')}
                            className={`p-2 ${viewMode === 'list' ? 'bg-[#1B4F72] text-white' : 'text-gray-400 hover:text-[#1B4F72]'}`}
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
                {[
                    { label: 'En attente', value: services.filter(s => s.status === 'pending').length, color: 'bg-yellow-500', icon: 'pending' },
                    { label: 'Approuvés', value: services.filter(s => s.status === 'approved').length, color: 'bg-green-500', icon: 'approved' },
                    { label: 'Rejetés', value: services.filter(s => s.status === 'rejected').length, color: 'bg-red-500', icon: 'rejected' },
                    { label: 'Total', value: services.length, color: 'bg-[#1B4F72]', icon: 'total' }
                ].map((stat) => (
                    <div key={stat.label} className="bg-white border border-gray-200 p-4 flex items-center gap-3">
                        <div className={`w-10 h-10 ${stat.color} flex items-center justify-center`}>
                            <Briefcase className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-[20px] font-bold text-[#1B4F72]">{stat.value}</p>
                            <p className="text-[10px] text-gray-500">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Services Grid/List */}
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredServices.map((service) => (
                        <ServiceCard 
                            key={service.id}
                            service={service}
                            onApprove={handleApprove}
                            onReject={handleReject}
                            onView={setSelectedService}
                            layout="grid"
                        />
                    ))}
                </div>
            ) : (
                <div className="space-y-2">
                    {filteredServices.map((service) => (
                        <ServiceCard 
                            key={service.id}
                            service={service}
                            onApprove={handleApprove}
                            onReject={handleReject}
                            onView={setSelectedService}
                            layout="list"
                        />
                    ))}
                </div>
            )}

            {/* Detail Modal */}
            {selectedService && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
                    <div className="bg-white w-full max-w-4xl my-8 border border-gray-200">
                        {/* Modal content - similar to previous but with full details */}
                        <div className="p-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
                            <div>
                                <h3 className="text-[16px] font-bold text-[#1B4F72]">{selectedService.title}</h3>
                                <p className="text-[11px] text-gray-500">{selectedService.id}</p>
                            </div>
                            <button 
                                onClick={() => setSelectedService(null)}
                                className="p-2 text-gray-400 hover:text-[#D35400]"
                            >
                                <XCircle className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-0">
                            {/* Left: Images & Basic Info */}
                            <div className="p-4 space-y-4 border-r border-gray-200">
                                {/* Image gallery */}
                                <div className="space-y-2">
                                    <div className="h-64 bg-gray-100 relative">
                                        {selectedService.images?.[0] ? (
                                            <img 
                                                src={selectedService.images[0]} 
                                                alt={selectedService.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-[#1B4F72]/10 flex items-center justify-center">
                                                <Briefcase className="w-16 h-16 text-[#1B4F72]" />
                                            </div>
                                        )}
                                    </div>
                                    {selectedService.images?.length > 1 && (
                                        <div className="flex gap-2">
                                            {selectedService.images.slice(1).map((img, i) => (
                                                <div key={i} className="w-20 h-20 bg-gray-100">
                                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Price & Details */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-[#D35400]/10 p-3 border border-[#D35400]/20">
                                        <p className="text-[10px] text-gray-500">Tarif</p>
                                        <p className="text-[20px] font-bold text-[#D35400]">{selectedService.price} DH</p>
                                        <p className="text-[11px] text-gray-600">/{selectedService.priceType}</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 border border-gray-200">
                                        <p className="text-[10px] text-gray-500">Durée estimée</p>
                                        <p className="text-[14px] font-semibold text-[#1B4F72]">{selectedService.duration}</p>
                                    </div>
                                </div>

                                <div className="space-y-2 text-[11px]">
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="text-gray-500">Matériaux</span>
                                        <span className="font-medium text-[#1B4F72]">{selectedService.details?.materials}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="text-gray-500">Garantie</span>
                                        <span className="font-medium text-[#1B4F72]">{selectedService.details?.warranty}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="text-gray-500">Disponibilité</span>
                                        <span className="font-medium text-[#1B4F72]">{selectedService.details?.availability}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Artisan & Approval */}
                            <div className="p-4 space-y-4">
                                {/* Status */}
                                <div className={`
                                    p-3 border
                                    ${selectedService.status === 'pending' ? 'bg-yellow-50 border-yellow-200' : ''}
                                    ${selectedService.status === 'approved' ? 'bg-green-50 border-green-200' : ''}
                                    ${selectedService.status === 'rejected' ? 'bg-red-50 border-red-200' : ''}
                                `}>
                                    <p className="text-[12px] font-medium">
                                        Statut: <span className={
                                            selectedService.status === 'pending' ? 'text-yellow-700' :
                                            selectedService.status === 'approved' ? 'text-green-700' : 'text-red-700'
                                        }>
                                            {selectedService.status === 'pending' ? 'En attente d\'approbation' :
                                             selectedService.status === 'approved' ? `Approuvé le ${selectedService.approvedAt}` :
                                             `Rejeté le ${selectedService.rejectedAt}`}
                                        </span>
                                    </p>
                                    {selectedService.rejectionReason && (
                                        <p className="mt-2 text-[11px] text-red-600">
                                            Motif: {selectedService.rejectionReason}
                                        </p>
                                    )}
                                </div>

                                {/* Artisan Profile */}
                                <div className="border border-gray-200 p-4">
                                    <h4 className="text-[13px] font-bold text-[#1B4F72] mb-3">Profil Artisan</h4>
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="w-16 h-16 bg-[#1B4F72]/10 flex items-center justify-center">
                                            <span className="text-[20px] font-bold text-[#1B4F72]">
                                                {selectedService.artisan.name.charAt(0)}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-[14px] font-semibold text-[#1B4F72]">{selectedService.artisan.name}</p>
                                            <p className="text-[11px] text-[#D35400]">{selectedService.artisan.specialty}</p>
                                            <div className="flex items-center gap-1 mt-1">
                                                <Star className="w-4 h-4 text-[#D35400]" />
                                                <span className="text-[12px] font-medium">{selectedService.artisan.rating}</span>
                                                <span className="text-[10px] text-gray-400">({selectedService.artisan.reviews} avis)</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2 text-[11px] text-gray-600">
                                        <p className="flex items-center gap-2">
                                            <Briefcase className="w-4 h-4 text-gray-400" />
                                            {selectedService.artisan.experience} d'expérience
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <span className="text-gray-400">CIN:</span>
                                            {selectedService.artisan.cin}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <span className="text-gray-400">Email:</span>
                                            {selectedService.artisan.email}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <span className="text-gray-400">Tél:</span>
                                            {selectedService.artisan.phone}
                                        </p>
                                    </div>

                                    <div className="mt-3 p-3 bg-gray-50 border border-gray-200">
                                        <p className="text-[11px] text-gray-600 italic">"{selectedService.artisan.bio}"</p>
                                    </div>

                                    <div className="mt-3">
                                        <p className="text-[10px] text-gray-500 mb-2">Documents vérifiés:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedService.artisan.documents.map((doc, i) => (
                                                <span key={i} className="px-2 py-1 bg-[#1B4F72]/10 text-[10px] text-[#1B4F72]">
                                                    {doc}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="border border-gray-200 p-4">
                                    <h4 className="text-[12px] font-bold text-[#1B4F72] mb-2">Description du service</h4>
                                    <p className="text-[12px] text-gray-700 leading-relaxed">
                                        {selectedService.description}
                                    </p>
                                </div>

                                {/* Actions */}
                                {selectedService.status === 'pending' && (
                                    <div className="flex gap-3">
                                        <button 
                                            onClick={() => handleApprove(selectedService.id)}
                                            className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white text-[12px] font-medium transition-colors flex items-center justify-center gap-2"
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                            Approuver le service
                                        </button>
                                        <button 
                                            onClick={() => handleReject(selectedService.id)}
                                            className="flex-1 py-3 border border-red-500 text-red-500 hover:bg-red-50 text-[12px] font-medium transition-colors flex items-center justify-center gap-2"
                                        >
                                            <XCircle className="w-4 h-4" />
                                            Rejeter
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServicesManagement;