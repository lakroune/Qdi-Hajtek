import React, { useEffect, useState } from 'react';
import {
    Bell, ArrowLeft, Briefcase, MessageSquare,
    Star, CheckCircle2, DollarSign, AlertCircle, Clock, Loader2, ClipboardCheck, Wallet
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axios-client';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const getIconConfig = (type) => {
        const configs = {
            'App\\Notifications\\NewDemandeNotification': {
                icon: Briefcase,
                color: 'bg-blue-500',
                label: 'Nouvelle Demande'
            },
            'App\\Notifications\\NewPropositionNotification': {
                icon: MessageSquare,
                color: 'bg-indigo-500',
                label: 'Nouvelle Proposition'
            },
            'App\\Notifications\\PropositionAcceptedNotification': {
                icon: CheckCircle2,
                color: 'bg-green-600',
                label: 'Offre Acceptée'
            },
            'App\\Notifications\\MissionCompletedNotification': {
                icon: ClipboardCheck,
                color: 'bg-teal-500',
                label: 'Mission Terminée'
            },
            'App\\Notifications\\PaymentSuccessNotification': {
                icon: Wallet,
                color: 'bg-amber-500',
                label: 'Paiement Reçu'
            },
            'App\\Notifications\\PriceFixedNotification': {
                icon: DollarSign,
                color: 'bg-emerald-500',
                label: 'Prix Fixé'
            },
            'default': {
                icon: Bell,
                color: 'bg-gray-400',
                label: 'Notification'
            }
        };
        return configs[type] || configs['default'];
    };

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                setLoading(true);
                const response = await axiosClient.get('/notifications');
                setNotifications(response.data.notifications || []);
            } catch (error) {
                console.error('Erreur fetching notifications:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    const handleNotificationClick = async (notif) => {
        try {
            if (!notif.read_at) {
                await axiosClient.post(`/notifications/${notif.id}/read`);
                setNotifications(prev =>
                    prev.map(n => n.id === notif.id ? { ...n, read_at: new Date() } : n)
                );
            }

            const dataType = notif.data.type_data;

            switch (dataType) {
                case 'new_demande':
                    navigate(`/messages/${notif.data.conversation_id}`);
                    break;
                case 'new_proposition':
                     navigate(`/mes-offres/${notif.data.offre_id}`);
                    break;
                case 'proposition_accepted':
                    navigate(`/messages`);
                    break;
                case 'mission_completed':
                case 'payment_success':
                case 'price_fixed':
                    navigate(`/messages/${notif.data.conversation_id}`);
                    break;
                default:
                    navigate('/messages');
            }
        } catch (error) {
            console.error("Erreur d'action:", error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-[#1B4F72]" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 mt-20 pb-8 font-sans">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="w-[90%] mx-auto px-4 py-4 flex items-center gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 hover:bg-gray-100 transition-colors rounded-full"
                    >
                        <ArrowLeft className="w-5 h-5 text-[#1B4F72]" />
                    </button>
                    <div>
                        <h1 className="text-[18px] font-bold text-[#1B4F72]">Notifications</h1>
                        <p className="text-[11px] text-gray-500">
                            {notifications.filter(n => !n.read_at).length} non lues • {notifications.length} au total
                        </p>
                    </div>
                </div>
            </header>

            <div className="w-[90%] mx-auto px-4 py-6">
                <div className="space-y-3">
                    {notifications.map((notif) => {
                        const config = getIconConfig(notif.type);
                        const Icon = config.icon;
                        const isUnread = !notif.read_at;

                        return (
                            <div
                                key={notif.id}
                                onClick={() => handleNotificationClick(notif)}
                                className={`cursor-pointer bg-white border p-4 transition-all hover:shadow-md active:scale-[0.98] rounded-md  'border-gray-200 opacity-80
                                    }`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`w-10 h-10 ${config.color} flex items-center justify-center flex-shrink-0 rounded-lg shadow-inner`}>
                                        <Icon className="w-5 h-5 text-white" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className='flex justify-between items-start'>
                                            <p className="text-[10px] text-gray-400 uppercase font-extrabold tracking-wider">
                                                {config.label}
                                            </p>
                                            <div className="flex items-center gap-1 text-[10px] text-gray-400">
                                                <Clock className="w-3 h-3" />
                                                {new Date(notif.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                                            </div>
                                        </div>

                                        <p className={`text-[13px] mt-1    `}>
                                            {notif.data.message || notif.data.contenu || "Nouvelle mise à jour sur Qdi Hajtek"}
                                        </p>

                                        {notif.data.titre_offre && (
                                            <div className="mt-2 inline-block px-2 py-0.5  text-[10px] font-bold rounded-sm border border-blue-100">
                                                Projet: {notif.data.titre_offre}
                                            </div>
                                        )}
                                    </div>

                                    {isUnread && (
                                        <div className="w-2 h-2 bg-red-500 rounded-full mt-1"></div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {notifications.length === 0 && (
                    <div className="text-center py-24">
                        <div className="w-20 h-20 bg-gray-100 flex items-center justify-center mx-auto mb-4 rounded-full">
                            <Bell className="w-10 h-10 text-gray-300" />
                        </div>
                        <h3 className="text-[16px] font-bold text-[#1B4F72] mb-1">Aucune notification</h3>
                        <p className="text-[12px] text-gray-500">On vous tiendra au courant dès qu'il يy a du nouveau !</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notifications;