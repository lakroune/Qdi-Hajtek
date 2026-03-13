import {
    MapPin, Clock, Calendar, User,
    Phone
} from 'lucide-react';

const JobCard = ({
    job,
    onApprove,
    onReject,
    onView,
    showActions = true,
    layout = 'grid'
}) => {
    const configUrgence = {
        urgent: { classe: 'bg-red-500 text-white', label: 'Urgent' },
        standard: { classe: 'bg-blue-500 text-white', label: 'Standard' },
        planifie: { classe: 'bg-gray-500 text-white', label: 'Planifié' }
    };

    const urgence = configUrgence[job.urgency] || configUrgence.planifie;

    const BadgeStatut = ({ status }) => {
        const styles = {
            pending: ' px-2 py-0.5  bg-yellow-100 text-yellow-700 border-yellow-200',
            approved: ' px-2 py-0.5 bg-green-100 text-green-700 border-green-200',
            rejected: ' px-2 py-0.5 bg-red-100 text-red-700 border-red-200'
        };
        const libelles = { pending: 'En attente', approved: 'Approuvée', rejected: 'Rejetée' };

        return (
            <span className={`px-2 py-0.5 text-[9px] font-medium border ${styles[status]}`}>
                {libelles[status]}
            </span>
        );
    };

    if (layout === 'list') {
        return (
            <div className={`flex items-center gap-4 p-4 bg-white border border-gray-200 hover:border-[#D35400] transition-colors ${job.urgency === 'urgent' && job.status === 'pending' ? 'bg-red-50/50' : ''}`}>
                <div className={`w-1.5 h-26 flex-shrink-0 ${urgence.classe}`}></div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-[13px] font-semibold text-[#1B4F72] truncate">{job.title}</h3>
                                <span className={`px-2 py-0.5 text-[9px] font-bold ${urgence.classe}`}>{urgence.label}</span>
                                <BadgeStatut status={job.status} />
                            </div>
                            <p className="text-[11px] text-gray-500">{job.category} • {job.location}</p>
                        </div>
                    </div>
                    <span className="text-[10px] font-bold text-[#D35400]">{job.budget}</span>

                    <div className="flex items-center gap-4 mt-2 text-[10px] text-gray-500">
                        <span className="flex items-center gap-1"><User className="w-3 h-3" /> {job.client.name}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {job.preferredDate}</span>
                    </div>
                </div>

                {showActions && job.status === 'pending' && (
                    <div className="flex flex-col items-center gap-1">
                        <button onClick={() => onApprove(job.id)} className="px-2.5 py-1 text-white bg-green-500 text-[10px]  transform hover:scale-105 ease-in-out  "> approver</button>
                        <button onClick={() => onReject(job.id)} className="px-4 py-1 text-white bg-red-500 text-[10px] transform hover:scale-105 ease-in-out "> rejeter</button>
                        <button onClick={() => onView(job)} className="px-5 py-1 text-white bg-[#1B4F72] text-[10px] transform hover:scale-105 ease-in-out  "> viser</button>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="bg-white border border-gray-200 hover:border-[#D35400] transition-all group overflow-hidden">
            <div className={`h-1.5 ${urgence.classe}`}></div>

            <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 text-[9px] font-bold ${urgence.classe}`}>{urgence.label}</span>
                        <BadgeStatut status={job.status} />
                    </div>
                    <span className="text-[10px] text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {job.publishedAt}
                    </span>
                </div>

                <h3 className="text-[14px] font-semibold text-[#1B4F72] mb-2 line-clamp-1 group-hover:text-[#D35400]">
                    {job.title}
                </h3>

                <p className="text-[11px] text-gray-600 mb-4 line-clamp-2 h-8">{job.description}</p>

                <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] text-[#D35400] font-medium px-2 py-0.5 bg-[#D35400]/5 border border-[#D35400]/10">
                        {job.category}
                    </span>
                    <span className="text-[10px] text-gray-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {job.location}
                    </span>
                </div>

                <div className="bg-gray-50 p-3 mb-4 rounded-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 bg-[#1B4F72] text-white flex items-center justify-center text-[10px] font-bold">
                            {job.client.name.charAt(0)}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-[11px] font-medium text-gray-700 truncate">{job.client.name}</p>
                            <p className="text-[9px] text-gray-400">Client</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3 text-[10px] text-gray-500">
                        <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {job.client.phone}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {job.preferredDate}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div>
                        <span className="text-[9px] text-gray-400 block uppercase tracking-wider">Budget</span>
                        <p className="text-[13px] font-bold text-[#D35400]">{job.budget}</p>
                    </div>

                    <div className="flex gap-1">
                        {showActions && job.status === 'pending' ? (
                            <>
                                <button onClick={() => onApprove(job.id)} className="px-3 py-1.5 bg-green-600  hover:bg-green-700 text-white text-[10px] font-medium transition-colors">
                                    Approuver
                                </button>
                                <button onClick={() => onReject(job.id)} className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-[10px] font-medium transition-colors">
                                    Rejeter
                                </button>
                            </>
                        ) : (
                            <button onClick={() => onView(job)} className="px-4 py-1.5 bg-[#1B4F72] hover:bg-[#2c7bb1] text-white text-[10px] font-medium transition-colors">
                                Détails
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobCard;