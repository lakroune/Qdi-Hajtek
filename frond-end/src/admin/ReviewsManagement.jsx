import React, { useState } from 'react';
import { 
    Star, Search, Flag, Eye, CheckCircle, 
    Trash2, MoreHorizontal, ThumbsUp, MessageSquare 
} from 'lucide-react';

const ReviewsManagement = () => {
    const [filterRating, setFilterRating] = useState('all');

    const reviews = [
        {
            id: 1,
            artisan: 'Karim Plombier',
            client: 'Ahmed Benali',
            rating: 5,
            comment: 'Excellent travail, très professionnel et ponctuel. Je recommande vivement !',
            date: '2024-01-15',
            status: 'approved',
            likes: 12,
            isReported: false
        }
       
    ];

    const renderStars = (count) => {
        return Array(5).fill(0).map((_, i) => (
            <Star 
                key={i} 
                className={`w-4 h-4 ${i < count ? 'text-[#D35400] fill-[#D35400]' : 'text-gray-300'}`} 
            />
        ));
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-[18px] font-bold text-[#1B4F72]">Avis & Commentaires</h1>
                    <p className="text-[11px] text-gray-500">Modérez les évaluations des clients</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Rechercher un avis..."
                            className="pl-9 pr-4 py-2 text-[12px] border border-gray-200 focus:border-[#1B4F72] focus:outline-none w-48"
                        />
                    </div>
                    <select 
                        value={filterRating}
                        onChange={(e) => setFilterRating(e.target.value)}
                        className="px-3 py-2 text-[12px] border border-gray-200 focus:border-[#1B4F72] focus:outline-none bg-white"
                    >
                        <option value="all">Toutes notes</option>
                        <option value="5">5 étoiles</option>
                        <option value="4">4 étoiles</option>
                        <option value="3">3 étoiles</option>
                        <option value="2">2 étoiles</option>
                        <option value="1">1 étoile</option>
                    </select>
                </div>
            </div>

            {/* Rating Distribution */}
            <div className="grid grid-cols-5 gap-3">
                {[5, 4, 3, 2, 1].map((rating) => (
                    <button 
                        key={rating}
                        onClick={() => setFilterRating(rating.toString())}
                        className={`
                            p-3 border text-center transition-colors
                            ${filterRating === rating.toString() 
                                ? 'border-[#D35400] bg-[#D35400]/5' 
                                : 'border-gray-200 hover:border-[#1B4F72]'}
                        `}
                    >
                        <div className="flex justify-center mb-1">
                            {renderStars(rating)}
                        </div>
                        <p className="text-[16px] font-bold text-[#1B4F72]">
                            {rating === 5 ? 45 : rating === 4 ? 32 : rating === 3 ? 15 : rating === 2 ? 5 : 3}%
                        </p>
                        <p className="text-[10px] text-gray-500">{rating} étoiles</p>
                    </button>
                ))}
            </div>

            {/* Reviews List */}
            <div className="space-y-3">
                {reviews.map((review) => (
                    <div 
                        key={review.id} 
                        className={`
                            bg-white border p-4 transition-colors
                            ${review.isReported ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-[#1B4F72]'}
                        `}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#1B4F72]/10 flex items-center justify-center">
                                    <span className="text-[14px] font-bold text-[#1B4F72]">
                                        {review.artisan.charAt(0)}
                                    </span>
                                </div>
                                <div>
                                    <h4 className="text-[12px] font-semibold text-[#1B4F72]">{review.artisan}</h4>
                                    <p className="text-[10px] text-gray-500">par {review.client}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {review.isReported && (
                                    <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-medium flex items-center gap-1">
                                        <Flag className="w-3 h-3" />
                                        Signalé
                                    </span>
                                )}
                                <span className={`
                                    px-2 py-0.5 text-[10px]
                                    ${review.status === 'approved' ? 'bg-green-100 text-green-600' : 
                                      review.status === 'flagged' ? 'bg-red-100 text-red-600' : 
                                      'bg-yellow-100 text-yellow-600'}
                                `}>
                                    {review.status === 'approved' ? 'Approuvé' : 
                                     review.status === 'flagged' ? 'Signalé' : 'En attente'}
                                </span>
                            </div>
                        </div>

                        <div className="mt-3 flex items-center gap-1">
                            {renderStars(review.rating)}
                            <span className="ml-2 text-[11px] text-gray-400">{review.date}</span>
                        </div>

                        <p className="mt-2 text-[12px] text-gray-700 leading-relaxed">
                            {review.comment}
                        </p>

                        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-4 text-[11px] text-gray-500">
                                <span className="flex items-center gap-1">
                                    <ThumbsUp className="w-3.5 h-3.5" />
                                    {review.likes} utiles
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <button className="p-1.5 text-gray-400 hover:text-[#1B4F72] hover:bg-[#1B4F72]/10 transition-colors">
                                    <Eye className="w-4 h-4" />
                                </button>
                                <button className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors">
                                    <CheckCircle className="w-4 h-4" />
                                </button>
                                <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewsManagement;