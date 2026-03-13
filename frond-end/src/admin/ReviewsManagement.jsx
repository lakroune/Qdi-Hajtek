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
                className={`w-3 h-3 ${i < count ? 'text-[#D35400] fill-[#D35400]' : 'text-gray-300'}`}
            />
        ));
    };

    return (
        <div className="space-y-4">

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-[18px] font-bold text-[#1B4F72]">Avis & Commentaires</h1>
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

            <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-3 bg-white rounded-lg">
                {[5, 4, 3, 2, 1].map((rating) => (
                    <button
                        key={rating}
                        onClick={() => setFilterRating(rating.toString())}
                        className={`
                            p-3 border text-center transition-colors
                            border-gray-200 hover:border-[#1B4F72] rounded-lg
                        `}
                    >
                        <div className="flex justify-center mb-1">
                            {renderStars(rating)}
                        </div>
                        <p className="text-[16px] font-bold text-[#1B4F72]">
                            {rating === 5 ? 45 : rating === 4 ? 32 : rating === 3 ? 15 : rating === 2 ? 5 : 3}%
                        </p>
                    </button>
                ))}
            </div>

            <div className="space-y-3">
                {reviews.map((review) => (
                    <div
                        key={review.id}
                        className={`
                            bg-white border p-3 transition-colors flex w-full justify-between
                            ${review.isReported ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-[#1B4F72]'}
                        `}
                    >

                        <div>
                            <div className="flex  items-start  ">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[#1B4F72]/10 flex items-center justify-center rounded-full">
                                        <span className="text-[14px] font-bold  text-[#1B4F72]">
                                            {review.artisan.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="text-[12px] font-semibold text-[#1B4F72]">{review.artisan}</h4>
                                        <p className="text-[10px] text-gray-500">par {review.client}</p>
                                    </div>
                                    <div className="mt-3 flex items-center gap-1">
                                        {renderStars(review.rating)}
                                        <span className="ml-2 text-[11px] text-gray-400">{review.date}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {review.isReported && (
                                        <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-medium flex items-center gap-1">
                                            <Flag className="w-3 h-3" />
                                            Signalé
                                        </span>
                                    )}

                                </div>
                            </div>



                            <p className="mt-2 text-[12px] text-gray-700 leading-relaxed">
                                {review.comment}
                            </p>
                        </div>
                        <div className="flex flex-col items-center gap-1 flex-shrink-0">
                            <button
                                onClick={() => onApprove(service.id)}
                                className=" w-full p-1.5 text-white bg-green-600 text-[10px]  hover:bg-green-800 transition-colors"
                                title="Approuver"
                            >
                                approuver
                            </button>
                            <button
                                onClick={() => onReject(service.id)}
                                className="w-full p-1.5 text-white bg-red-600 text-[10px] hover:bg-red-800 transition-colors"
                                title="Rejeter"
                            >
                                rejeter
                            </button>
                            <button
                                onClick={() => onView(service)}
                                className="w-full p-1.5 text-white bg-gray-600 text-[10px] hover:bg-gray-800 transition-colors"
                                title="Voir détails"
                            >
                                Voir
                            </button>
                        </div>


                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewsManagement;