import React, { useState } from 'react';
import { 
    ArrowRightLeft, Search, Filter, Eye, 
    User, Briefcase, DollarSign, Calendar,
    CheckCircle, Clock, XCircle, Download
} from 'lucide-react';

const AccountsManagement = () => {
    const [filter, setFilter] = useState('all');
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    // Transactions Client → Admin → Artisan
    const transactions = [
        {
            id: 'TRX-001',
            type: 'service', // service | job
            serviceName: 'Réparation fuite d\'eau',
            
            // Client (payeur)
            client: {
                id: 101,
                name: 'Ahmed Benali',
                avatar: null,
                city: 'Casablanca'
            },
            
            // Artisan (receveur)
            artisan: {
                id: 201,
                name: 'Karim Plombier',
                specialty: 'Plomberie',
                avatar: null
            },
            
            // Montants
            amountTotal: 850,      // Ce que le client paie
            adminCommission: 85,   // 10% pour la plateforme
            artisanNet: 765,       // 90% pour l'artisan
            
            // Statuts
            status: 'completed',   // completed | pending | disputed | refunded
            paymentStatus: 'released', // held | released | refunded
            
            // Dates
            createdAt: '2024-01-15 09:30',
            paidAt: '2024-01-15 09:35',
            completedAt: '2024-01-15 14:00',
            releasedAt: '2024-01-15 16:30',
            
            // Détails
            description: 'Intervention urgente fuite sous évier cuisine'
        },
        {
            id: 'TRX-002',
            type: 'job',
            serviceName: 'Installation électrique complète',
            
            client: {
                id: 102,
                name: 'Sofia Alaoui',
                city: 'Rabat'
            },
            
            artisan: {
                id: 202,
                name: 'Youssef Élec',
                specialty: 'Électricité'
            },
            
            amountTotal: 3200,
            adminCommission: 320,
            artisanNet: 2880,
            
            status: 'in_progress',
            paymentStatus: 'held', // Argent encore chez admin
            
            createdAt: '2024-01-14 10:00',
            paidAt: '2024-01-14 10:05',
            completedAt: null,
            releasedAt: null,
            
            description: 'Tableau électrique + 12 prises + 5 luminaires'
        },
        {
            id: 'TRX-003',
            type: 'service',
            serviceName: 'Peinture salon 40m²',
            
            client: {
                id: 103,
                name: 'Mehdi Tazi',
                city: 'Marrakech'
            },
            
            artisan: {
                id: 203,
                name: 'Hassan Peintre',
                specialty: 'Peinture'
            },
            
            amountTotal: 2800,
            adminCommission: 280,
            artisanNet: 2520,
            
            status: 'disputed',
            paymentStatus: 'held',
            
            createdAt: '2024-01-13 11:00',
            paidAt: '2024-01-13 11:15',
            completedAt: '2024-01-13 18:00',
            releasedAt: null,
            
            disputeReason: 'Qualité insuffisante, traces visibles',
            
            description: 'Peinture murs + plafond, blanc cassé'
        },
        {
            id: 'TRX-004',
            type: 'service',
            serviceName: 'Débouchage canalisation',
            
            client: {
                id: 104,
                name: 'Fatima Benani',
                city: 'Tanger'
            },
            
            artisan: {
                id: 204,
                name: 'Omar Plombier',
                specialty: 'Plomberie'
            },
            
            amountTotal: 450,
            adminCommission: 45,
            artisanNet: 405,
            
            status: 'refunded',
            paymentStatus: 'refunded',
            
            createdAt: '2024-01-12 08:00',
            paidAt: '2024-01-12 08:10',
            completedAt: null,
            releasedAt: null,
            refundedAt: '2024-01-12 10:30',
            refundReason: 'Artisan non disponible, annulation client',
            
            description: 'Canalisation cuisine bouchée'
        }
    ];

    const filteredTransactions = transactions.filter(t => {
        if (filter === 'all') return true;
        if (filter === 'held') return t.paymentStatus === 'held';
        if (filter === 'released') return t.paymentStatus === 'released';
        if (filter === 'disputed') return t.status === 'disputed';
        if (filter === 'refunded') return t.status === 'refunded';
        return t.status === filter;
    });

    // Calculs totaux
    const totalHeld = transactions
        .filter(t => t.paymentStatus === 'held')
        .reduce((sum, t) => sum + t.amountTotal, 0);
    
    const totalReleased = transactions
        .filter(t => t.paymentStatus === 'released')
        .reduce((sum, t) => sum + t.artisanNet, 0);
    
    const totalCommission = transactions
        .reduce((sum, t) => sum + t.adminCommission, 0);

    const getStatusBadge = (status) => {
        const styles = {
            completed: 'bg-green-100 text-green-700 border-green-200',
            in_progress: 'bg-blue-100 text-blue-700 border-blue-200',
            disputed: 'bg-red-100 text-red-700 border-red-200',
            refunded: 'bg-gray-100 text-gray-700 border-gray-200'
        };
        const labels = {
            completed: 'Terminé',
            in_progress: 'En cours',
            disputed: 'Litige',
            refunded: 'Remboursé'
        };
        return (
            <span className={`px-2 py-0.5 text-[10px] font-medium border ${styles[status]}`}>
                {labels[status]}
            </span>
        );
    };

    const getPaymentBadge = (status) => {
        const styles = {
            held: 'bg-yellow-100 text-yellow-700 border-yellow-200',
            released: 'bg-green-100 text-green-700 border-green-200',
            refunded: 'bg-red-100 text-red-700 border-red-200'
        };
        const labels = {
            held: 'En garantie',
            released: 'Libéré',
            refunded: 'Remboursé'
        };
        return (
            <span className={`px-2 py-0.5 text-[10px] font-medium border ${styles[status]}`}>
                {labels[status]}
            </span>
        );
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-[18px] font-bold text-[#1B4F72]">Transactions Client-Artisan</h1>
                    <p className="text-[11px] text-gray-500">
                        Suivi des paiements et commissions plateforme
                    </p>
                </div>
                <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 hover:border-[#1B4F72] text-[11px] text-gray-600 hover:text-[#1B4F72] transition-colors">
                    <Download className="w-4 h-4" />
                    Exporter
                </button>
            </div>

            {/* Stats Cards - Flux d'argent */}
            <div className="grid grid-cols-4 gap-4">
                <div className="bg-white border border-gray-200 p-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-blue-100 flex items-center justify-center">
                            <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-500">Client a payé</p>
                            <p className="text-[18px] font-bold text-[#1B4F72]">
                                {transactions.reduce((sum, t) => sum + t.amountTotal, 0).toLocaleString()} DH
                            </p>
                        </div>
                    </div>
                    <p className="text-[10px] text-gray-400">{transactions.length} transactions</p>
                </div>

                <div className="bg-white border border-gray-200 p-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-yellow-100 flex items-center justify-center">
                            <Clock className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-500">En garantie (Admin)</p>
                            <p className="text-[18px] font-bold text-[#D35400]">
                                {totalHeld.toLocaleString()} DH
                            </p>
                        </div>
                    </div>
                    <p className="text-[10px] text-gray-400">
                        {transactions.filter(t => t.paymentStatus === 'held').length} transactions
                    </p>
                </div>

                <div className="bg-white border border-gray-200 p-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-green-100 flex items-center justify-center">
                            <Briefcase className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-500">Artisan reçu</p>
                            <p className="text-[18px] font-bold text-green-600">
                                {totalReleased.toLocaleString()} DH
                            </p>
                        </div>
                    </div>
                    <p className="text-[10px] text-gray-400">
                        {transactions.filter(t => t.paymentStatus === 'released').length} libérations
                    </p>
                </div>

                <div className="bg-white border border-gray-200 p-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-[#1B4F72]/10 flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-[#1B4F72]" />
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-500">Commission (10%)</p>
                            <p className="text-[18px] font-bold text-[#1B4F72]">
                                {totalCommission.toLocaleString()} DH
                            </p>
                        </div>
                    </div>
                    <p className="text-[10px] text-green-600">Revenu plateforme</p>
                </div>
            </div>

         
            {/* Filtres */}
            <div className="flex items-center gap-2">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-x-1/2 w-4 h-4 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Rechercher transaction..."
                        className="pl-9 pr-4 py-2 text-[12px] border border-gray-200 focus:border-[#1B4F72] focus:outline-none w-56"
                    />
                </div>
                <select 
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-3 py-2 text-[12px] border border-gray-200 focus:border-[#1B4F72] focus:outline-none bg-white"
                >
                    <option value="all">Toutes les transactions</option>
                    <option value="held">En garantie</option>
                    <option value="released">Terminées</option>
                    <option value="disputed">En litige</option>
                    <option value="refunded">Remboursées</option>
                </select>
            </div>

            {/* Table des transactions */}
            <div className="bg-white border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600">Transaction</th>
                                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600">Client →</th>
                                <th className="px-4 py-3 text-center text-[11px] font-semibold text-[#D35400]">Admin (10%)</th>
                                <th className="px-4 py-3 text-right text-[11px] font-semibold text-gray-600">→ Artisan</th>
                                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600">Statut</th>
                                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredTransactions.map((trx) => (
                                <tr key={trx.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3">
                                        <div>
                                            <p className="text-[11px] font-medium text-[#1B4F72]">{trx.serviceName}</p>
                                            <p className="text-[9px] text-gray-400">{trx.id} • {trx.type === 'service' ? 'Service' : 'Offre'}</p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-blue-100 flex items-center justify-center">
                                                <span className="text-[10px] font-bold text-blue-600">
                                                    {trx.client.name.charAt(0)}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-medium text-gray-700">{trx.client.name}</p>
                                                <p className="text-[10px] font-bold text-blue-600">{trx.amountTotal} DH</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <div className="bg-[#1B4F72]/10 px-3 py-2 border border-[#1B4F72]/20 inline-block">
                                            <p className="text-[12px] font-bold text-[#1B4F72]">{trx.adminCommission} DH</p>
                                            {getPaymentBadge(trx.paymentStatus)}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <div className="text-right">
                                                <p className="text-[11px] font-medium text-gray-700">{trx.artisan.name}</p>
                                                <p className="text-[10px] font-bold text-green-600">{trx.artisanNet} DH</p>
                                            </div>
                                            <div className="w-8 h-8 bg-green-100 flex items-center justify-center">
                                                <span className="text-[10px] font-bold text-green-600">
                                                    {trx.artisan.name.charAt(0)}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="space-y-1">
                                            {getStatusBadge(trx.status)}
                                            {trx.disputeReason && (
                                                <p className="text-[9px] text-red-500 max-w-[150px] truncate">
                                                    {trx.disputeReason}
                                                </p>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1">
                                            <button 
                                                onClick={() => setSelectedTransaction(trx)}
                                                className="p-1.5 text-gray-400 hover:text-[#1B4F72] hover:bg-[#1B4F72]/10"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            
                                            {/* Actions selon statut */}
                                            {trx.paymentStatus === 'held' && trx.status !== 'disputed' && (
                                                <>
                                                    <button 
                                                        className="p-1.5 text-green-500 hover:bg-green-50"
                                                        title="Libérer paiement artisan"
                                                    >
                                                        <CheckCircle className="w-4 h-4" />
                                                    </button>
                                                    <button 
                                                        className="p-1.5 text-red-500 hover:bg-red-50"
                                                        title="Rembourser client"
                                                    >
                                                        <XCircle className="w-4 h-4" />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Détail Transaction */}
            {selectedTransaction && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="bg-white w-full max-w-2xl border border-gray-200">
                        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                            <div>
                                <h3 className="text-[16px] font-bold text-[#1B4F72]">{selectedTransaction.serviceName}</h3>
                                <p className="text-[11px] text-gray-500">{selectedTransaction.id}</p>
                            </div>
                            <button 
                                onClick={() => setSelectedTransaction(null)}
                                className="text-gray-400 hover:text-[#D35400]"
                            >
                                <XCircle className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Schéma visuel de la transaction */}
                            <div className="bg-gray-50 p-4 border border-gray-200">
                                <h4 className="text-[12px] font-bold text-[#1B4F72] mb-4 text-center">Répartition des fonds</h4>
                                
                                <div className="relative">
                                    {/* Ligne de progression */}
                                    <div className="absolute top-8 left-0 right-0 h-1 bg-gray-200"></div>
                                    
                                    <div className="flex justify-between relative">
                                        {/* Étape 1: Client */}
                                        <div className="text-center w-1/3">
                                            <div className="w-16 h-16 bg-blue-100 border-2 border-blue-400 flex items-center justify-center mx-auto mb-2 relative z-10">
                                                <User className="w-8 h-8 text-blue-600" />
                                            </div>
                                            <p className="text-[11px] font-semibold text-[#1B4F72]">{selectedTransaction.client.name}</p>
                                            <p className="text-[10px] text-gray-500">Client</p>
                                            <p className="text-[14px] font-bold text-blue-600 mt-1">{selectedTransaction.amountTotal} DH</p>
                                            <p className="text-[9px] text-gray-400">Payé le {selectedTransaction.paidAt}</p>
                                        </div>

                                        {/* Étape 2: Admin */}
                                        <div className="text-center w-1/3">
                                            <div className={`
                                                w-16 h-16 border-2 flex items-center justify-center mx-auto mb-2 relative z-10
                                                ${selectedTransaction.paymentStatus === 'held' 
                                                    ? 'bg-[#D35400] border-[#D35400]' 
                                                    : 'bg-[#1B4F72] border-[#1B4F72]'}
                                            `}>
                                                <DollarSign className="w-8 h-8 text-white" />
                                            </div>
                                            <p className="text-[11px] font-semibold text-[#1B4F72]">Plateforme</p>
                                            <p className="text-[10px] text-gray-500">Garantie</p>
                                            <p className="text-[14px] font-bold text-[#D35400] mt-1">{selectedTransaction.adminCommission} DH</p>
                                            <p className="text-[9px] text-gray-400">Commission 10%</p>
                                        </div>

                                        {/* Étape 3: Artisan */}
                                        <div className="text-center w-1/3">
                                            <div className={`
                                                w-16 h-16 border-2 flex items-center justify-center mx-auto mb-2 relative z-10
                                                ${selectedTransaction.paymentStatus === 'released'
                                                    ? 'bg-green-100 border-green-400'
                                                    : 'bg-gray-100 border-gray-300'}
                                            `}>
                                                <Briefcase className={`w-8 h-8 ${selectedTransaction.paymentStatus === 'released' ? 'text-green-600' : 'text-gray-400'}`} />
                                            </div>
                                            <p className="text-[11px] font-semibold text-[#1B4F72]">{selectedTransaction.artisan.name}</p>
                                            <p className="text-[10px] text-gray-500">{selectedTransaction.artisan.specialty}</p>
                                            <p className={`
                                                text-[14px] font-bold mt-1
                                                ${selectedTransaction.paymentStatus === 'released' ? 'text-green-600' : 'text-gray-400'}
                                            `}>
                                                {selectedTransaction.artisanNet} DH
                                            </p>
                                            {selectedTransaction.releasedAt && (
                                                <p className="text-[9px] text-green-600">Reçu le {selectedTransaction.releasedAt}</p>
                                            )}
                                            {selectedTransaction.paymentStatus !== 'released' && (
                                                <p className="text-[9px] text-gray-400">En attente</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Timeline */}
                            <div>
                                <h4 className="text-[12px] font-bold text-[#1B4F72] mb-3">Chronologie</h4>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Calendar className="w-3.5 h-3.5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-medium text-gray-700">Demande créée</p>
                                            <p className="text-[10px] text-gray-400">{selectedTransaction.createdAt}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <DollarSign className="w-3.5 h-3.5 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-medium text-gray-700">Paiement client reçu</p>
                                            <p className="text-[10px] text-gray-400">{selectedTransaction.paidAt}</p>
                                        </div>
                                    </div>
                                    {selectedTransaction.completedAt && (
                                        <div className="flex items-start gap-3">
                                            <div className="w-6 h-6 bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <CheckCircle className="w-3.5 h-3.5 text-purple-600" />
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-medium text-gray-700">Service terminé</p>
                                                <p className="text-[10px] text-gray-400">{selectedTransaction.completedAt}</p>
                                            </div>
                                        </div>
                                    )}
                                    {selectedTransaction.releasedAt && (
                                        <div className="flex items-start gap-3">
                                            <div className="w-6 h-6 bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <ArrowRightLeft className="w-3.5 h-3.5 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-medium text-gray-700">Paiement libéré à l'artisan</p>
                                                <p className="text-[10px] text-gray-400">{selectedTransaction.releasedAt}</p>
                                            </div>
                                        </div>
                                    )}
                                    {selectedTransaction.refundedAt && (
                                        <div className="flex items-start gap-3">
                                            <div className="w-6 h-6 bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <XCircle className="w-3.5 h-3.5 text-red-600" />
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-medium text-gray-700">Remboursement client</p>
                                                <p className="text-[10px] text-gray-400">{selectedTransaction.refundedAt}</p>
                                                {selectedTransaction.refundReason && (
                                                    <p className="text-[10px] text-red-500 mt-1">Motif: {selectedTransaction.refundReason}</p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="border border-gray-200 p-3">
                                <p className="text-[10px] text-gray-500 mb-1">Description du service</p>
                                <p className="text-[12px] text-gray-700">{selectedTransaction.description}</p>
                            </div>

                            {/* Actions Admin */}
                            {selectedTransaction.paymentStatus === 'held' && selectedTransaction.status !== 'disputed' && (
                                <div className="flex gap-3 pt-4 border-t border-gray-200">
                                    <button className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white text-[12px] font-medium transition-colors flex items-center justify-center gap-2">
                                        <CheckCircle className="w-4 h-4" />
                                        Libérer paiement artisan ({selectedTransaction.artisanNet} DH)
                                    </button>
                                    <button className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white text-[12px] font-medium transition-colors flex items-center justify-center gap-2">
                                        <XCircle className="w-4 h-4" />
                                        Rembourser client ({selectedTransaction.amountTotal} DH)
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccountsManagement;