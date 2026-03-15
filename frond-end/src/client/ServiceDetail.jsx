import React, { useState } from 'react';
import {
    ArrowLeft, Heart, MapPin, Star, Clock, Shield,
    MessageSquare, Calendar, X, ChevronLeft, ChevronRight
} from 'lucide-react';

const ServiceDetail = () => {
    const [isFav, setIsFav] = useState(false);
    const [showDemand, setShowDemand] = useState(false);
    const [selectedImg, setSelectedImg] = useState(null);
    const [imgIdx, setImgIdx] = useState(0);
    const [form, setForm] = useState({ desc: '', date: '', ville: '' });

    const service = {
        id: 1,
        title: "Réparation fuite d'eau - Intervention rapide",
        category: "Plomberie",
        icon: "🔧",
        description: "Intervention rapide pour toute fuite d'eau (évier, lavabo, douche, WC). Diagnostic complet et réparation durable. Garantie 6 mois sur toute intervention. Disponible 7j/7, urgences traitées sous 2h.",
        price: 350,
        priceType: "À partir de",
        location: "Casablanca et environs",
        duration: "1-2 heures",
        warranty: "6 mois",
        images: [
            "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
            "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800"
        ],
        artisan: {
            name: "Karim El Amrani",
            rating: 4.9,
            reviews: 127,
            jobs: 89,
            memberSince: "2022",
            verified: true,
            pro: true,
            phone: "06 12 34 56 78",
            email: "karim.plomberie@email.com",
            bio: "Plombier certifié avec 10 ans d'expérience. Spécialiste des urgences et rénovations."
        }
    };

    const nextImg = () => setImgIdx((i) => (i + 1) % service.images.length);
    const prevImg = () => setImgIdx((i) => (i - 1 + service.images.length) % service.images.length);

    const submit = (e) => {
        e.preventDefault();
        console.log("Demande:", form);
        setShowDemand(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 mt-20 pb-8">

            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="w-[90%] mx-auto px-4 py-4 flex items-center gap-3">
                    <button onClick={() => window.history.back()} className="p-2 hover:bg-gray-100">
                        <ArrowLeft className="w-5 h-5 text-[#1B4F72]" />
                    </button>
                    <div className="flex-1">
                        <h1 className="text-[16px] font-bold text-[#1B4F72] line-clamp-1">{service.title}</h1>
                        <p className="text-[11px] text-gray-500">{service.category}</p>
                    </div>
                    <button 
                        onClick={() => setIsFav(!isFav)}
                        className={`p-2 transition-colors ${isFav ? 'text-[#D35400]' : 'text-gray-400 hover:text-[#D35400]'}`}
                    >
                        <Heart className={`w-5 h-5 ${isFav && 'fill-current'}`} />
                    </button>
                </div>
            </header>

            <div className="w-[90%] mx-auto px-4 py-6 space-y-4">

                {/* Images Gallery */}
                <div className="bg-white border border-gray-200 overflow-hidden">
                    <div className="aspect-[16/9] bg-gray-100 cursor-pointer" onClick={() => setSelectedImg(0)}>
                        <img src={service.images[imgIdx]} alt={service.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="grid grid-cols-3 gap-0 border-t border-gray-200">
                        {service.images.map((img, i) => (
                            <div key={i} className="aspect-square bg-gray-100 border-r border-gray-200 last:border-r-0 cursor-pointer" onClick={() => {setImgIdx(i); setSelectedImg(i);}}>
                                <img src={img} alt="" className={`w-full h-full object-cover ${imgIdx === i ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Price & Action */}
                <div className="bg-white border border-gray-200 p-4 flex items-center justify-between">
                    <div>
                        <p className="text-[11px] text-gray-500">{service.priceType}</p>
                        <p className="text-[24px] font-bold text-[#D35400]">{service.price} DH</p>
                    </div>
                    <button 
                        onClick={() => setShowDemand(true)}
                        className="px-5 py-3 bg-[#1B4F72] hover:bg-[#D35400] text-white text-[13px] font-bold transition-colors"
                    >
                        Demander maintenant
                    </button>
                </div>

             
                
            </div>

            

          
        </div>
    );
};

export default ServiceDetail;