import React from 'react';
import { 
    MapPin, DollarSign, Clock, Calendar, User, 
    AlertTriangle, CheckCircle, XCircle, Eye, 
    Briefcase, Phone, Mail 
} from 'lucide-react';

const JobCard = ({ 
    job, 
    onApprove, 
    onReject, 
    onView, 
    showActions = true,
    layout = 'grid'
}) => {
    const getUrgencyColor = (urgency) => {
        if (urgency === 'urgent') return 'bg-red-500 text-white';
        if (urgency === 'standard') return 'bg-blue-500 text-white';
        return 'bg-gray-500 text-white';
    };

    const getUrgencyLabel = (urgency) => {
        if (urgency === 'urgent') return 'Urgent';
        if (urgency === 'standard') return 'Standard';
        return 'Planifié';
    };

    if (layout === 'list') {
        return (
            <div className={`flex items-center gap-4 p-4 bg-white border border-gray-200 hover:border-[#D35400] transition-colors ${job.urgency === 'urgent' && job.status === 'pending' ? 'bg-red-50/50' : ''}`}>
                {/* Urgency indicator */}
                <div className={`w-2 h-24 flex-shrink-0 ${getUrgencyColor(job.urgency)}`}></div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-[13px] font-semibold text-[#1B4F72] truncate">{job.title}</h3>
                                <span className={`px-2 py-0.5 text-[9px] font-bold ${getUrgencyColor(job.urgency)}`}>
                                    {getUrgencyLabel(job.urgency)}
                                </span>
                                {getStatusBadge(job.status)}
                            </div>
                            <p className="text-[11px] text-gray-500">{job.category} • {job.location}</p>
                        </div>
                        <span className="text-[14px] font-bold text-[#D35400]">{job.budget}</span>
                    </div>
                    
                    <p className="text-[11px] text-gray-600 mt-2 line-clamp-2">{job.description}</p>
                    
                    <div className="flex items-center gap-4 mt-3 text-[10px] text-gray-500">
                        <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5" />
                            {job.client.name}
                        </span>
                        <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            Pour le {job.preferredDate}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            Publié {job.publishedAt}
                        </span>
                    </div>
                </div>

                {/* Actions */}
                {showActions && job.status === 'pending' && (
                    <div className="flex items-center gap-1 flex-shrink-0">
                        <button 
                            onClick={() => onApprove(job.id)}
                            className="p-2 text-green-600 hover:bg-green-50 transition-colors"
                            title="Approuver"
                        >
                            <CheckCircle className="w-5 h-5" />
                        </button>
                        <button 
                            onClick={() => onReject(job.id)}
                            className="p-2 text-red-600 hover:bg-red-50 transition-colors"
                            title="Rejeter"
                        >
                            <XCircle className="w-5 h-5" />
                        </button>
                        <button 
                            onClick={() => onView(job)}
                            className="p-2 text-[#1B4F72] hover:bg-[#1B4F72]/10 transition-colors"
                            title="Voir détails"
                        >
                            <Eye className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
        );
    }

    // Grid layout
    return (
        <div className={`bg-white border border-gray-200 hover:border-[#D35400] transition-all group ${job.urgency === 'urgent' && job.status === 'pending' ? 'ring-2 ring-red-200' : ''}`}>
            {/* Header with urgency */}
            <div className={`h-2 ${getUrgencyColor(job.urgency)}`}></div>
            
            <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 text-[9px] font-bold ${getUrgencyColor(job.urgency)}`}>
                            {getUrgencyLabel(job.urgency)}
                        </span>
                        {getStatusBadge(job.status)}
                    </div>
                    <span className="text-[10px] text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {job.publishedAt}
                    </span>
                </div>

                <h3 className="text-[14px] font-semibold text-[#1B4F72] mb-2 line-clamp-2 group-hover:text-[#D35400] transition-colors">
                    {job.title}
                </h3>

                <p className="text-[11px] text-gray-600 mb-3 line-clamp-3">{job.description}</p>

                <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] text-[#D35400] font-medium px-2 py-0.5 bg-[#D35400]/10">
                        {job.category}
                    </span>
                    <span className="text-[10px] text-gray-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {job.location}
                    </span>
                </div>

                <div className="bg-gray-50 p-3 mb-3 border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-blue-100 flex items-center justify-center">
                            <span className="text-[12px] font-bold text-blue-600">
                                {job.client.name.charAt(0)}
                            </span>
                        </div>
                        <div>
                            <p className="text-[11px] font-medium text-gray-700">{job.client.name}</p>
                            <p className="text-[9px] text-gray-400">Client</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-gray-500">
                        <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {job.client.phone}
                        </span>
                        <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {job.preferredDate}
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div>
                        <span className="text-[10px] text-gray-400">Budget</span>
                        <p className="text-[16px] font-bold text-[#D35400]">{job.budget}</p>
                    </div>
                    
                    {showActions && job.status === 'pending' ? (
                        <div className="flex items-center gap-1">
                            <button 
                                onClick={() => onApprove(job.id)}
                                className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-[11px] font-medium transition-colors"
                            >
                                Approuver
                            </button>
                            <button 
                                onClick={() => onReject(job.id)}
                                className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-[11px] font-medium transition-colors"
                            >
                                Rejeter
                            </button>
                        </div>
                    ) : (
                        <button 
                            onClick={() => onView(job)}
                            className="px-4 py-2 bg-[#1B4F72] hover:bg-[#D35400] text-white text-[11px] font-medium transition-colors"
                        >
                            Voir détails
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const getStatusBadge = (status) => {
    const styles = {
        pending: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
        approved: 'bg-green-100 text-green-700 border border-green-200',
        rejected: 'bg-red-100 text-red-700 border border-red-200'
    };
    const labels = { pending: 'En attente', approved: 'Approuvée', rejected: 'Rejetée' };
    return (
        <span className={`px-2 py-0.5 text-[9px] font-medium ${styles[status]}`}>
            {labels[status]}
        </span>
    );
};

export default JobCard;