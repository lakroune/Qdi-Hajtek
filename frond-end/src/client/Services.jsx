import React, { useState } from 'react';
import {
    Heart, MapPin, Star, DollarSign, Briefcase
} from 'lucide-react';

const Services = () => {
    const [favs, setFavs] = useState([1, 3]);

    const services = [
        { id: 1, t: "Réparation fuite d'eau", cat: "Plomberie", icon: "🔧", art: "Karim El Amrani", note: 4.9, prix: 350, loc: "Casablanca", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400" },
        { id: 2, t: "Installation électrique", cat: "Électricité", icon: "⚡", art: "Youssef Benali", note: 4.7, prix: 800, loc: "Rabat", img: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400" },
        { id: 3, t: "Menuiserie sur mesure", cat: "Menuiserie", icon: "🪚", art: "Mohamed Tazi", note: 4.5, prix: 2500, loc: "Casablanca", img: "https://images.unsplash.com/photo-1589939705384-5185138a04b9?w=400" },
        { id: 4, t: "Peinture intérieure", cat: "Peinture", icon: "🎨", art: "Sara Lahlou", note: 4.8, prix: 1800, loc: "Marrakech", img: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400" },
        { id: 5, t: "Climatisation split", cat: "Climatisation", icon: "❄️", art: "Youssef A.", note: 4.6, prix: 600, loc: "Casablanca", img: "https://images.unsplash.com/photo-1631545308772-81a0e0a3a7eb?w=400" },
        { id: 6, t: "Jardinage complet", cat: "Jardinage", icon: "🌿", art: "Ahmed B.", note: 4.4, prix: 400, loc: "Rabat", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" },
    ];

    const toggleFav = (id) => {
        setFavs(favs.includes(id) ? favs.filter(f => f !== id) : [...favs, id]);
    };

    return (
        <div className="min-h-screen bg-gray-50 mt-20 pb-8">

            {/* <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="w-[90%] mx-auto px-4 py-4 flex items-center gap-3">
                    <button onClick={() => window.history.back()} className="p-2 hover:bg-gray-100">
                        <ArrowLeft className="w-5 h-5 text-[#1B4F72]" />
                    </button>
                    <div>
                        <h1 className="text-[18px] font-bold text-[#1B4F72]">Services</h1>
                        <p className="text-[11px] text-gray-500">{services.length} services</p>
                    </div>
                </div>
            </header> */}

            <div className="w-[90%] mx-auto px-4 py-6">
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {services.map(x => (
                        <div key={x.id} className="bg-white border border-gray-200 overflow-hidden hover:border-[#1B4F72] transition-all group">
                            
                            <div className="relative h-40 bg-gray-100">
                                <img src={x.img} alt={x.t} className="w-full h-full object-cover" />
                                <button 
                                    onClick={() => toggleFav(x.id)}
                                    className={`absolute top-2 right-2 w-8 h-8 flex items-center justify-center transition-colors ${favs.includes(x.id) ? 'bg-[#D35400] text-white' : 'bg-white/90 text-gray-400 hover:text-[#D35400]'}`}
                                >
                                    <Heart className={`w-4 h-4 ${favs.includes(x.id) && 'fill-current'}`} />
                                </button>
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                                    <span className="text-white text-[11px] font-medium flex items-center gap-1">
                                        <span className="text-[14px]">{x.icon}</span> {x.cat}
                                    </span>
                                </div>
                            </div>

                          
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Services;