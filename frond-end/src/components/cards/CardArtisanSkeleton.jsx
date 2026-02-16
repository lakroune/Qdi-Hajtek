import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, CheckCircle, Award, Briefcase } from 'lucide-react';

const CardArtisanSkeleton = ({ variant = 'default' }) => {
    if (variant === 'compact') {
        return (
            <div className="flex items-center gap-4 p-4 bg-white rounded-xl animate-pulse">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0"></div>
                <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="h-8 bg-gray-200 rounded w-16"></div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 rounded-2xl p-6 animate-pulse">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
            <div className="flex justify-center gap-2 mb-4">
                <div className="h-6 bg-gray-200 rounded w-16"></div>
                <div className="h-6 bg-gray-200 rounded w-16"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
    );
};

export default CardArtisanSkeleton;