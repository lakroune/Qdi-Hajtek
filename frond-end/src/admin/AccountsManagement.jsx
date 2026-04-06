import React, { useEffect, useState } from 'react';
import {
    ArrowRightLeft, Search, 
    User, Briefcase, DollarSign, Calendar,
    CheckCircle, Clock, XCircle
} from 'lucide-react';
import axiosClient from '../api/axios-client';

const AccountsManagement = () => {
    const [filter, setFilter] = useState('all');
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchAmounts = async () => {
            try {
                const response = await axiosClient.get('/paiements');
                setTransactions(response.data.data);
            } catch (error) {
                console.error('Error fetching amounts:', error);
            }
        };
        fetchAmounts();
    }, []);

    const filteredTransactions = transactions.filter(t => {
        if (filter === 'all') return true;
        if (filter === 'held') return t.status.payout === 'pending';
        if (filter === 'released') return t.status.payout === 'released';
        if (filter === 'disputed') return t.status.payment === 'disputed';
        if (filter === 'refunded') return t.status.payment === 'refunded';
        return true;
    });

    const totalHeld = transactions
        .filter(t => t.status.payout === 'pending')
        .reduce((sum, t) => sum + t.finance.total, 0);

    const totalReleased = transactions
        .filter(t => t.status.payout === 'released')
        .reduce((sum, t) => sum + t.finance.net_artisan, 0);

    const totalCommission = transactions
        .reduce((sum, t) => sum + t.finance.commission, 0);

    const totalPaid = transactions
        .filter(t => t.status.payment === 'paid' || t.status.payment === 'escrow')
        .reduce((sum, t) => sum + t.finance.total, 0);

    const getPayoutBadge = (payout) => {
        const styles = {
            pending: 'text-yellow-700 border-yellow-200',
            released: 'text-green-700 border-green-200',
            refunded: 'text-red-700 border-red-200',
        };
        const labels = {
            pending: 'En garantie',
            released: 'Libéré',
            refunded: 'Remboursé',
        };
        return (
            <span className={`px-2 py-0.5 text-[10px] font-medium border ${styles[payout] || 'text-gray-600 border-gray-200'}`}>
                {labels[payout] || payout}
            </span>
        );
    };

    const getStatusBadge = (payment) => {
        const styles = {
            paid: 'bg-green-100 text-green-700 border-green-200',
            escrow: 'bg-blue-100 text-blue-700 border-blue-200',
            pending: 'bg-blue-100 text-blue-700 border-blue-200',
            disputed: 'bg-red-100 text-red-700 border-red-200',
            refunded: 'bg-gray-100 text-gray-700 border-gray-200',
        };
        const labels = {
            paid: 'Payé',
            escrow: 'En séquestre',
            pending: 'En cours',
            disputed: 'Litige',
            refunded: 'Remboursé',
        };
        return (
            <span className={`px-2 py-0.5 text-[10px] font-medium border ${styles[payment] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                {labels[payment] || payment}
            </span>
        );
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-[18px] font-bold text-[#1B4F72]">Transactions Client-Artisan</h1>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
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
            </div>

            <div className="grid grid-cols-4 gap-4">
                <div className="bg-white border border-gray-200 p-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-blue-100 flex items-center justify-center rounded-full">
                            <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-500">Client a payé</p>
                            <p className="text-[18px] font-bold text-[#1B4F72]">{totalPaid.toFixed(2)} MAD</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 p-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-yellow-100 flex items-center justify-center rounded-full">
                            <Clock className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-500">En garantie (Admin)</p>
                            <p className="text-[18px] font-bold text-[#D35400]">{totalHeld.toFixed(2)} MAD</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 p-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-green-100 flex items-center justify-center rounded-full">
                            <Briefcase className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-500">Artisan reçu</p>
                            <p className="text-[18px] font-bold text-green-600">{totalReleased.toFixed(2)} MAD</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 p-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-[#1B4F72]/10 flex items-center justify-center rounded-full">
                            <DollarSign className="w-5 h-5 text-[#1B4F72]" />
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-500">Commission (10%)</p>
                            <p className="text-[18px] font-bold text-[#1B4F72]">{totalCommission.toFixed(2)} MAD</p>
                        </div>
                    </div>
                </div>
            </div>

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
                                            <p className="text-[11px] font-medium text-[#1B4F72]">{trx.service_info.title}</p>
                                            <p className="text-[9px] text-gray-400">
                                                {trx.reference} • {trx.service_info.type}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-blue-100 flex items-center justify-center">
                                                <span className="text-[10px] font-bold text-blue-600">
                                                    {trx.client.name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-medium text-gray-700">{trx.client.name}</p>
                                                <p className="text-[10px] font-bold text-blue-600">{trx.finance.total} {trx.finance.currency}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <div className="px-3 py-2 inline-block">
                                            <p className="text-[12px] font-bold text-[#1B4F72]">{trx.finance.commission} {trx.finance.currency}</p>
                                            {getPayoutBadge(trx.status.payout)}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <div className="text-right">
                                                <p className="text-[11px] font-medium text-gray-700">{trx.artisan.name}</p>
                                                <p className="text-[10px] font-bold text-green-600">{trx.finance.net_artisan} {trx.finance.currency}</p>
                                            </div>
                                            <div className="w-8 h-8 bg-green-100 flex items-center justify-center">
                                                <span className="text-[10px] font-bold text-green-600">
                                                    {trx.artisan.name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="space-y-1">
                                            {getStatusBadge(trx.status.payment)}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => setSelectedTransaction(trx)}
                                                className="p-1.5 text-white bg-[#1B4F72] hover:bg-[#1B4F72]/90 text-[10px] font-semibold"
                                            >
                                                Voir
                                            </button>
                                            {trx.status.payout === 'pending' && trx.status.payment !== 'disputed' && (
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

            {selectedTransaction && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-auto pt-20">
                    <div className="bg-white w-full max-w-2xl border border-gray-200">
                        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                            <div>
                                <h3 className="text-[16px] font-bold text-[#1B4F72]">{selectedTransaction.service_info.title}</h3>
                                <p className="text-[11px] text-gray-500">{selectedTransaction.reference}</p>
                            </div>
                            <button
                                onClick={() => setSelectedTransaction(null)}
                                className="text-gray-400 hover:text-[#D35400]"
                            >
                                <XCircle className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="bg-gray-50 p-4 border border-gray-200">
                                <h4 className="text-[12px] font-bold text-[#1B4F72] mb-4 text-center">Répartition des fonds</h4>
                                <div className="relative">
                                    <div className="absolute top-8 left-0 right-0 h-1 bg-gray-200"></div>
                                    <div className="flex justify-between relative">
                                        <div className="text-center w-1/3">
                                            <div className="w-16 h-16 bg-blue-100 border-2 border-blue-400 flex items-center justify-center mx-auto mb-2 relative z-10">
                                                <User className="w-8 h-8 text-blue-600" />
                                            </div>
                                            <p className="text-[11px] font-semibold text-[#1B4F72]">{selectedTransaction.client.name}</p>
                                            <p className="text-[10px] text-gray-500">Client</p>
                                            <p className="text-[14px] font-bold text-blue-600 mt-1">
                                                {selectedTransaction.finance.total} {selectedTransaction.finance.currency}
                                            </p>
                                            <p className="text-[9px] text-gray-400">{selectedTransaction.dates.created_at}</p>
                                        </div>

                                        <div className="text-center w-1/3">
                                            <div className={`w-16 h-16 border-2 flex items-center justify-center mx-auto mb-2 relative z-10
                                                ${selectedTransaction.status.payout === 'pending'
                                                    ? 'bg-[#D35400] border-[#D35400]'
                                                    : 'bg-[#1B4F72] border-[#1B4F72]'}`}>
                                                <DollarSign className="w-8 h-8 text-white" />
                                            </div>
                                            <p className="text-[11px] font-semibold text-[#1B4F72]">Plateforme</p>
                                            <p className="text-[10px] text-gray-500">Garantie</p>
                                            <p className="text-[14px] font-bold text-[#D35400] mt-1">
                                                {selectedTransaction.finance.commission} {selectedTransaction.finance.currency}
                                            </p>
                                            <p className="text-[9px] text-gray-400">Commission 10%</p>
                                        </div>

                                        <div className="text-center w-1/3">
                                            <div className={`w-16 h-16 border-2 flex items-center justify-center mx-auto mb-2 relative z-10
                                                ${selectedTransaction.status.payout === 'released'
                                                    ? 'bg-green-100 border-green-400'
                                                    : 'bg-gray-100 border-gray-300'}`}>
                                                <Briefcase className={`w-8 h-8 ${selectedTransaction.status.payout === 'released' ? 'text-green-600' : 'text-gray-400'}`} />
                                            </div>
                                            <p className="text-[11px] font-semibold text-[#1B4F72]">{selectedTransaction.artisan.name}</p>
                                            <p className="text-[10px] text-gray-500">{selectedTransaction.artisan.city}</p>
                                            <p className={`text-[14px] font-bold mt-1 ${selectedTransaction.status.payout === 'released' ? 'text-green-600' : 'text-gray-400'}`}>
                                                {selectedTransaction.finance.net_artisan} {selectedTransaction.finance.currency}
                                            </p>
                                            <p className="text-[9px] text-gray-400">
                                                {selectedTransaction.status.payout === 'released' ? 'Reçu' : 'En attente'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-[12px] font-bold text-[#1B4F72] mb-3">Chronologie</h4>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Calendar className="w-3.5 h-3.5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-medium text-gray-700">Demande créée</p>
                                            <p className="text-[10px] text-gray-400">{selectedTransaction.dates.created_at} ({selectedTransaction.dates.human})</p>
                                        </div>
                                    </div>
                                    {(selectedTransaction.status.payment === 'paid' || selectedTransaction.status.payment === 'escrow') && (
                                        <div className="flex items-start gap-3">
                                            <div className="w-6 h-6 bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <DollarSign className="w-3.5 h-3.5 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-medium text-gray-700">Paiement client reçu</p>
                                                <p className="text-[10px] text-gray-400">{selectedTransaction.stripe_id}</p>
                                                {selectedTransaction.status.paid_at && (
                                                    <p className="text-[10px] text-gray-400">{selectedTransaction.status.paid_at}</p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    {selectedTransaction.status.payout === 'released' && (
                                        <div className="flex items-start gap-3">
                                            <div className="w-6 h-6 bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <ArrowRightLeft className="w-3.5 h-3.5 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-medium text-gray-700">Paiement libéré à l'artisan</p>
                                                <p className="text-[10px] text-gray-400">{selectedTransaction.finance.net_artisan} {selectedTransaction.finance.currency}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="border border-gray-200 p-3">
                                <p className="text-[10px] text-gray-500 mb-1">Type de service</p>
                                <p className="text-[12px] text-gray-700">{selectedTransaction.service_info.type}</p>
                            </div>

                            <div className="border border-gray-200 p-3">
                                <p className="text-[10px] text-gray-500 mb-1">Statut du service</p>
                                <p className="text-[12px] text-gray-700 capitalize">{selectedTransaction.service_info.status}</p>
                            </div>

                            {selectedTransaction.status.payout === 'pending' && selectedTransaction.status.payment !== 'disputed' && (
                                <div className="flex gap-3 pt-4 border-t border-gray-200">
                                    <button className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white text-[12px] font-medium transition-colors flex items-center justify-center gap-2">
                                        <CheckCircle className="w-4 h-4" />
                                        Libérer paiement artisan ({selectedTransaction.finance.net_artisan} {selectedTransaction.finance.currency})
                                    </button>
                                    <button className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white text-[12px] font-medium transition-colors flex items-center justify-center gap-2">
                                        <XCircle className="w-4 h-4" />
                                        Rembourser client ({selectedTransaction.finance.total} {selectedTransaction.finance.currency})
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