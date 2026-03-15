import React, { useState } from 'react';
import {
    Bell, ArrowLeft, Briefcase, MessageSquare, 
    Star, CheckCircle2, DollarSign, AlertCircle, Clock
} from 'lucide-react';

const Notifications = () => {
    const [notifications] = useState([
        {
            id: 1,
            type: 'proposal',
            title: 'Nouvelle proposition reçue',
            message: 'Karim El Amrani a envoyé une proposition pour votre offre "Réparation fuite d\'eau" à 350 DH',
            date: 'Il y a 5 min',
            icon: Briefcase,
            color: 'bg-blue-500'
        },
        {
            id: 2,
            type: 'message',
            title: 'Nouveau message',
            message: 'Youssef Benali vous a envoyé un message concernant votre demande de peinture',
            date: 'Il y a 30 min',
            icon: MessageSquare,
            color: 'bg-green-500'
        },
        {
            id: 3,
            type: 'review',
            title: 'Avis laissé',
            message: 'Ahmed Benali a laissé un avis 5 étoiles sur votre service de plomberie',
            date: 'Il y a 2 heures',
            icon: Star,
            color: 'bg-yellow-500'
        },
        {
            id: 4,
            type: 'job',
            title: 'Offre approuvée',
            message: 'Votre offre "Installation climatiseur" a été approuvée et publiée avec succès',
            date: 'Il y a 3 heures',
            icon: CheckCircle2,
            color: 'bg-[#1B4F72]'
        },
        {
            id: 5,
            type: 'payment',
            title: 'Paiement reçu',
            message: 'Vous avez reçu un paiement de 450 DH pour la mission terminée avec succès',
            date: 'Il y a 1 jour',
            icon: DollarSign,
            color: 'bg-[#D35400]'
        },
        {
            id: 6,
            type: 'alert',
            title: 'Rappel',
            message: 'N\'oubliez pas de laisser un avis pour votre dernière mission de menuiserie',
            date: 'Il y a 2 jours',
            icon: AlertCircle,
            color: 'bg-amber-500'
        }
    ]);

    const getTypeLabel = (type) => {
        const labels = {
            proposal: 'Proposition',
            message: 'Message',
            review: 'Avis',
            job: 'Offre',
            payment: 'Paiement',
            alert: 'Rappel'
        };
        return labels[type] || 'Notification';
    };

    return (
        <div className="min-h-screen bg-gray-50 mt-20 pb-8">

            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="w-[90%] mx-auto px-4 py-4 flex items-center gap-3">
                    <button 
                        onClick={() => window.history.back()}
                        className="p-2 hover:bg-gray-100 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-[#1B4F72]" />
                    </button>
                    <div>
                        <h1 className="text-[18px] font-bold text-[#1B4F72]">Notifications</h1>
                        <p className="text-[11px] text-gray-500">{notifications.length} notifications</p>
                    </div>
                </div>
            </header>

            <div className="w-[90%] mx-auto px-4 py-6">
                <div className="space-y-3">
                    {notifications.map((notif) => {
                        const Icon = notif.icon;
                        return (
                            <div
                                key={notif.id}
                                className="bg-white border border-gray-200 p-4 hover:border-[#1B4F72] transition-colors"
                            >
                                <div className="flex items-start gap-3">
                                    <div className={`w-9 h-9 ${notif.color} flex items-center justify-center flex-shrink-0`}>
                                        <Icon className="w-4 h-4 text-white" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                       <div>
                                        
                                       </div>
                                        <h4 className="text-[13px] font-bold text-[#1B4F72] mb-1">
                                            {notif.title}
                                        </h4>
                                        <p className="text-[12px] text-gray-600 leading-relaxed">
                                            {notif.message}
                                        </p>
                                       
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {notifications.length === 0 && (
                    <div className="text-center py-16">
                        <div className="w-20 h-20 bg-gray-100 flex items-center justify-center mx-auto mb-4">
                            <Bell className="w-10 h-10 text-gray-300" />
                        </div>
                        <h3 className="text-[16px] font-bold text-[#1B4F72] mb-2">Aucune notification</h3>
                        <p className="text-[12px] text-gray-500">Vous n'avez pas encore de notifications</p>
                    </div>
                )}
            </div>

        </div>
    );
};

export default Notifications;