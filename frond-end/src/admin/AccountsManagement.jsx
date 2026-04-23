import React, { useEffect, useState } from 'react';
import {
    ArrowRightLeft, Search, User, Briefcase, DollarSign,
    Calendar, CheckCircle, Clock, XCircle, RefreshCw,
    Eye, AlertTriangle, TrendingUp
} from 'lucide-react';
import axiosClient from '../api/axios-client';
import toast from 'react-hot-toast';

const PAYOUT_CFG = {
    pending: { cls: 'bg-yellow-50 text-yellow-700 border-yellow-200', label: 'En garantie' },
    released: { cls: 'bg-green-50 text-green-700 border-green-200', label: 'Libéré' },
    refunded: { cls: 'bg-gray-100 text-gray-600 border-gray-200', label: 'Remboursé' },
};

const PAYMENT_CFG = {
    paid: { cls: 'bg-green-100 text-green-700 border-green-200', label: 'Payé' },
    escrow: { cls: 'bg-blue-100 text-blue-700 border-blue-200', label: 'En séquestre' },
    pending: { cls: 'bg-blue-100 text-blue-700 border-blue-200', label: 'En cours' },
    disputed: { cls: 'bg-red-100 text-red-700 border-red-200', label: 'Litige' },
    refunded: { cls: 'bg-gray-100 text-gray-600 border-gray-200', label: 'Remboursé' },
};

const Badge = ({ cfg, fallback }) => {
    const { cls, label } = cfg ?? { cls: 'bg-gray-100 text-gray-500 border-gray-200', label: fallback ?? '—' };
    return (
        <span className={`inline-flex items-center px-2 py-0.5 text-[9px] font-semibold border rounded-full uppercase tracking-wide ${cls}`}>
            {label}
        </span>
    );
};

const ConfirmModal = ({ open, type, trx, loading, onClose, onConfirm }) => {
    if (!open || !trx) return null;
    const isRelease = type === 'release';
    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" role="dialog" aria-modal="true">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />
            <div className="relative w-full max-w-xs bg-white shadow-2xl border border-gray-100 rounded-lg">
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isRelease ? 'bg-green-50' : 'bg-red-50'}`}>
                            {isRelease
                                ? <CheckCircle className="w-5 h-5 text-green-600" />
                                : <XCircle className="w-5 h-5 text-red-500" />}
                        </div>
                        <div>
                            <h3 className="text-[14px] font-bold text-[#1B4F72]">
                                {isRelease ? 'Libérer le paiement' : 'Rembourser le client'}
                            </h3>
                            <p className="text-[10px] text-gray-400 mt-0.5">
                                {isRelease
                                    ? `${trx.finance.net_artisan} ${trx.finance.currency} → ${trx.artisan.name}`
                                    : `${trx.finance.total} ${trx.finance.currency} → ${trx.client.name}`}
                            </p>
                        </div>
                    </div>
                    <p className="text-[12px] text-gray-600 mb-5 leading-relaxed">
                        {isRelease
                            ? `Confirmer la libération du paiement de ${trx.finance.net_artisan} ${trx.finance.currency} à l'artisan ${trx.artisan.name} ?`
                            : `Confirmer le remboursement de ${trx.finance.total} ${trx.finance.currency} au client ${trx.client.name} ?`}
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                        <button onClick={onClose} className="py-2 text-[12px] text-gray-400 hover:text-gray-600 border border-gray-200 hover:bg-gray-50 rounded transition-all">
                            Annuler
                        </button>
                        <button onClick={onConfirm} disabled={loading} className={`py-2 text-white text-[12px] font-bold rounded flex items-center justify-center transition-colors ${isRelease ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}>
                            {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : isRelease ? 'Libérer' : 'Rembourser'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TableSkeleton = () => (
    <div className="animate-pulse divide-y divide-gray-100">
        {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="px-4 flex gap-4">
                <div className="flex flex-col gap-2 flex-1">
                    <div className="h-3 w-40 bg-gray-200 rounded" />
                    <div className="h-2 w-24 bg-gray-200 rounded" />
                </div>
                <div className="h-5 w-20 bg-gray-200 rounded-full" />
                <div className="h-5 w-20 bg-gray-200 rounded-full" />
                <div className="h-5 w-20 bg-gray-200 rounded-full" />
                <div className="h-5 w-16 bg-gray-200 rounded-full" />
                <div className="h-6 w-14 bg-gray-200 rounded" />
            </div>
        ))}
    </div>
);

const AccountsManagement = () => {
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [confirm, setConfirm] = useState({ open: false, type: null, trx: null });
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const fetchTransactions = async () => {
            setLoading(true);
            try {
                const res = await axiosClient.get('/paiements');
                setTransactions(res.data.data);
            } catch {
                toast.error('Erreur de chargement des transactions');
            } finally {
                setLoading(false);
            }
        };
        fetchTransactions();
    }, []);

    const patchTransaction = (id, updates) => {
        const patch = t => t.id === id ? { ...t, ...updates } : t;
        setTransactions(prev => prev.map(patch));
        setSelectedTransaction(prev => prev?.id === id ? patch(prev) : prev);
    };

    const handleRelease = async (trx) => {
        setIsProcessing(true);
        try {
            await axiosClient.patch(`/paiements/${trx.id}/release`);
            patchTransaction(trx.id, { status: { ...trx.status, payout: 'released' } });
            toast.success('Paiement libéré à l\'artisan avec succès');
            setConfirm({ open: false, type: null, trx: null });
        } catch {
            toast.error('Erreur lors de la libération du paiement');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleRefund = async (trx) => {
        setIsProcessing(true);
        try {
            await axiosClient.patch(`/paiements/${trx.id}/refund`);
            patchTransaction(trx.id, { status: { ...trx.status, payout: 'refunded', payment: 'refunded' } });
            toast.success('Client remboursé avec succès');
            setConfirm({ open: false, type: null, trx: null });
        } catch {
            toast.error('Erreur lors du remboursement');
        } finally {
            setIsProcessing(false);
        }
    };

    const filteredTransactions = transactions.filter(t => {
        const q = searchQuery.toLowerCase();
        const matchSearch =
            !q ||
            t.service_info?.title?.toLowerCase().includes(q) ||
            t.reference?.toLowerCase().includes(q) ||
            t.client?.name?.toLowerCase().includes(q) ||
            t.artisan?.name?.toLowerCase().includes(q);

        const matchFilter =
            filter === 'all' ? true :
                filter === 'held' ? t.status.payout === 'pending' :
                    filter === 'released' ? t.status.payout === 'released' :
                        filter === 'disputed' ? t.status.payment === 'disputed' :
                            filter === 'refunded' ? t.status.payment === 'refunded' : true;

        return matchSearch && matchFilter;
    });

    const totalPaid = transactions.filter(t => t.status.payment === 'paid' || t.status.payment === 'escrow').reduce((s, t) => s + t.finance.total, 0);
    const totalHeld = transactions.filter(t => t.status.payout === 'pending').reduce((s, t) => s + t.finance.total, 0);
    const totalReleased = transactions.filter(t => t.status.payout === 'released').reduce((s, t) => s + t.finance.net_artisan, 0);
    const totalCommission = transactions.reduce((s, t) => s + t.finance.commission, 0);

    const summaryCards = [
        { label: 'Client a payé', value: totalPaid, color: 'bg-blue-100', iconColor: 'text-blue-600', textColor: 'text-[#1B4F72]', Icon: User },
        { label: 'En garantie', value: totalHeld, color: 'bg-yellow-100', iconColor: 'text-yellow-600', textColor: 'text-[#D35400]', Icon: Clock },
        { label: 'Artisan reçu', value: totalReleased, color: 'bg-green-100', iconColor: 'text-green-600', textColor: 'text-green-600', Icon: Briefcase },
        { label: 'Commission (2.5%)', value: totalCommission, color: 'bg-[#1B4F72]/10', iconColor: 'text-[#1B4F72]', textColor: 'text-[#1B4F72]', Icon: TrendingUp },
    ];

    return (
        <div className="space-y-4">

            <ConfirmModal
                open={confirm.open}
                type={confirm.type}
                trx={confirm.trx}
                loading={isProcessing}
                onClose={() => setConfirm({ open: false, type: null, trx: null })}
                onConfirm={() =>
                    confirm.type === 'release'
                        ? handleRelease(confirm.trx)
                        : handleRefund(confirm.trx)
                }
            />

            <div className="sticky -top-3 bg-white px-4 py-3 border-b border-gray-200 z-10 -mx-4">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                    <h1 className="text-[18px] font-bold text-[#1B4F72]">Transactions Client-Artisan</h1>
                    <div className="flex items-center gap-2 flex-wrap">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                placeholder="Référence, client, artisan..."
                                className="pl-9 pr-4 py-2 text-[12px] border border-gray-200 focus:border-[#1B4F72] focus:outline-none w-56 rounded"
                            />
                        </div>
                        <select
                            value={filter}
                            onChange={e => setFilter(e.target.value)}
                            className="px-3 py-2 text-[12px] border border-gray-200 focus:border-[#1B4F72] focus:outline-none bg-white rounded"
                        >
                            <option value="all">Toutes les transactions</option>
                            <option value="held">En garantie</option>
                            <option value="released">Terminées</option>
                            <option value="disputed">En litige</option>
                            <option value="refunded">Remboursées</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-3 mt-3">
                    {summaryCards.map(c => (
                        <div key={c.label} className="bg-white border border-gray-200 rounded-lg p-3 flex items-center gap-3">
                            <div className={`w-9 h-9 ${c.color} flex items-center justify-center rounded-full flex-shrink-0`}>
                                <c.Icon className={`w-4 h-4 ${c.iconColor}`} />
                            </div>
                            <div>
                                <p className={`text-[16px] font-bold leading-none ${c.textColor}`}>
                                    {loading ? '—' : `${c.value.toFixed(2)}`}
                                </p>
                                <p className="text-[9px] text-gray-400 mt-0.5">{c.label} · MAD</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600">Transaction</th>
                                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600">Client →</th>
                                <th className="px-4 py-3 text-center text-[11px] font-semibold text-[#D35400]">Admin (2.5%)</th>
                                <th className="px-4 py-3 text-right text-[11px] font-semibold text-gray-600">→ Artisan</th>
                                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600">Statut</th>
                                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading && (
                                <tr>
                                    <td colSpan={6} className="p-0">
                                        <TableSkeleton />
                                    </td>
                                </tr>
                            )}

                            {!loading && filteredTransactions.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-4 py-12 text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <ArrowRightLeft className="w-8 h-8 text-gray-300" />
                                            <p className="text-[12px] text-gray-400">Aucune transaction trouvée.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}

                            {!loading && filteredTransactions.map(trx => (
                                <tr key={trx.id} className={`hover:bg-gray-50 transition-colors ${trx.status.payment === 'disputed' ? 'bg-red-50/40' : ''}`}>
                                    <td className="px-4 py-3">
                                        <p className="text-[11px] font-semibold text-[#1B4F72] leading-tight">{trx.service_info.title}</p>
                                        <p className="text-[9px] text-gray-400 mt-0.5">{trx.reference} · {trx.service_info.type}</p>
                                        {trx.status.payment === 'disputed' && (
                                            <span className="inline-flex items-center gap-0.5 text-[9px] text-red-600 font-semibold mt-0.5">
                                                <AlertTriangle className="w-2.5 h-2.5" /> Litige
                                            </span>
                                        )}
                                    </td>

                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-[10px] font-bold text-blue-600">{trx.client.name.charAt(0).toUpperCase()}</span>
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-medium text-gray-700">{trx.client.name}</p>
                                                <p className="text-[10px] font-bold text-blue-600">{trx.finance.total} {trx.finance.currency}</p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-4 py-3 text-center">
                                        <p className="text-[12px] font-bold text-[#1B4F72]">{trx.finance.commission} {trx.finance.currency}</p>
                                        <Badge cfg={PAYOUT_CFG[trx.status.payout]} fallback={trx.status.payout} />
                                    </td>

                                    <td className="px-4 py-3 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <div className="text-right">
                                                <p className="text-[11px] font-medium text-gray-700">{trx.artisan.name}</p>
                                                <p className="text-[10px] font-bold text-green-600">{trx.finance.net_artisan} {trx.finance.currency}</p>
                                            </div>
                                            <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-[10px] font-bold text-green-600">{trx.artisan.name.charAt(0).toUpperCase()}</span>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-4 py-3">
                                        <Badge cfg={PAYMENT_CFG[trx.status.payment]} fallback={trx.status.payment} />
                                    </td>

                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => setSelectedTransaction(trx)}
                                                title="Voir les détails"
                                                className="p-1.5 bg-[#1B4F72] hover:bg-[#D35400] text-white rounded transition-colors"
                                            >
                                                <Eye className="w-3.5 h-3.5" />
                                            </button>
                                            {trx.status.payout === 'pending' && trx.status.payment !== 'disputed' && (
                                                <>
                                                    <button
                                                        onClick={() => setConfirm({ open: true, type: 'release', trx })}
                                                        title="Libérer paiement artisan"
                                                        className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"
                                                    >
                                                        <CheckCircle className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button
                                                        onClick={() => setConfirm({ open: true, type: 'refund', trx })}
                                                        title="Rembourser client"
                                                        className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors"
                                                    >
                                                        <XCircle className="w-3.5 h-3.5" />
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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-auto">
                    <div className="bg-white w-full max-w-2xl border border-gray-200 rounded-lg shadow-2xl my-8">

                        <div className="p-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white rounded-t-lg z-10">
                            <div>
                                <h3 className="text-[15px] font-bold text-[#1B4F72]">{selectedTransaction.service_info.title}</h3>
                                <p className="text-[10px] text-gray-400 mt-0.5">{selectedTransaction.reference}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge cfg={PAYMENT_CFG[selectedTransaction.status.payment]} fallback={selectedTransaction.status.payment} />
                                <button onClick={() => setSelectedTransaction(null)} className="p-1.5 text-gray-400 hover:text-[#D35400] transition-colors">
                                    <XCircle className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">

                            <div className="bg-gray-50 p-5 border border-gray-200 rounded-lg">
                                <h4 className="text-[11px] font-bold text-[#1B4F72] mb-4 text-center uppercase tracking-wide">Répartition des fonds</h4>
                                <div className="relative">
                                    <div className="absolute top-8 left-[16.67%] right-[16.67%] h-0.5 bg-gray-200 z-0" />
                                    <div className="flex justify-between relative z-10">

                                        <div className="text-center w-1/3 px-2">
                                            <div className="w-14 h-14 bg-blue-100 border-2 border-blue-300 rounded-full flex items-center justify-center mx-auto mb-2">
                                                <User className="w-7 h-7 text-blue-600" />
                                            </div>
                                            <p className="text-[11px] font-semibold text-[#1B4F72] truncate">{selectedTransaction.client.name}</p>
                                            <p className="text-[9px] text-gray-400">Client</p>
                                            <p className="text-[15px] font-bold text-blue-600 mt-1">{selectedTransaction.finance.total}</p>
                                            <p className="text-[9px] text-gray-400">{selectedTransaction.finance.currency}</p>
                                        </div>

                                        <div className="text-center w-1/3 px-2">
                                            <div className={`w-14 h-14 border-2 rounded-full flex items-center justify-center mx-auto mb-2 ${selectedTransaction.status.payout === 'pending' ? 'bg-orange-100 border-[#D35400]' : 'bg-[#1B4F72]/10 border-[#1B4F72]'}`}>
                                                <DollarSign className={`w-7 h-7 ${selectedTransaction.status.payout === 'pending' ? 'text-[#D35400]' : 'text-[#1B4F72]'}`} />
                                            </div>
                                            <p className="text-[11px] font-semibold text-[#1B4F72]">Plateforme</p>
                                            <p className="text-[9px] text-gray-400">Commission</p>
                                            <p className="text-[15px] font-bold text-[#D35400] mt-1">{selectedTransaction.finance.commission}</p>
                                            <p className="text-[9px] text-gray-400">{selectedTransaction.finance.currency}</p>
                                        </div>

                                        <div className="text-center w-1/3 px-2">
                                            <div className={`w-14 h-14 border-2 rounded-full flex items-center justify-center mx-auto mb-2 ${selectedTransaction.status.payout === 'released' ? 'bg-green-100 border-green-400' : 'bg-gray-100 border-gray-300'}`}>
                                                <Briefcase className={`w-7 h-7 ${selectedTransaction.status.payout === 'released' ? 'text-green-600' : 'text-gray-400'}`} />
                                            </div>
                                            <p className="text-[11px] font-semibold text-[#1B4F72] truncate">{selectedTransaction.artisan.name}</p>
                                            <p className="text-[9px] text-gray-400">{selectedTransaction.artisan.city}</p>
                                            <p className={`text-[15px] font-bold mt-1 ${selectedTransaction.status.payout === 'released' ? 'text-green-600' : 'text-gray-400'}`}>
                                                {selectedTransaction.finance.net_artisan}
                                            </p>
                                            <p className="text-[9px] text-gray-400">
                                                {selectedTransaction.status.payout === 'released' ? 'Reçu ✓' : 'En attente'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-[12px] font-bold text-[#1B4F72] mb-3">Chronologie</h4>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Calendar className="w-3 h-3 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-semibold text-gray-700">Demande créée</p>
                                            <p className="text-[10px] text-gray-400">{selectedTransaction.dates.created_at} · {selectedTransaction.dates.human}</p>
                                        </div>
                                    </div>
                                    {(selectedTransaction.status.payment === 'paid' || selectedTransaction.status.payment === 'escrow') && (
                                        <div className="flex items-start gap-3">
                                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <DollarSign className="w-3 h-3 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-semibold text-gray-700">Paiement client reçu</p>
                                                {selectedTransaction.stripe_id && <p className="text-[10px] text-gray-400 font-mono">{selectedTransaction.stripe_id}</p>}
                                                {selectedTransaction.status.paid_at && <p className="text-[10px] text-gray-400">{selectedTransaction.status.paid_at}</p>}
                                            </div>
                                        </div>
                                    )}
                                    {selectedTransaction.status.payout === 'released' && (
                                        <div className="flex items-start gap-3">
                                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <ArrowRightLeft className="w-3 h-3 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-semibold text-gray-700">Paiement libéré à l'artisan</p>
                                                <p className="text-[10px] text-gray-400">{selectedTransaction.finance.net_artisan} {selectedTransaction.finance.currency}</p>
                                            </div>
                                        </div>
                                    )}
                                    {selectedTransaction.status.payment === 'disputed' && (
                                        <div className="flex items-start gap-3">
                                            <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <AlertTriangle className="w-3 h-3 text-red-600" />
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-semibold text-red-600">Litige en cours</p>
                                                <p className="text-[10px] text-gray-400">Le paiement est bloqué pendant la résolution</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-[11px]">
                                <div className="border border-gray-200 rounded-lg p-3">
                                    <p className="text-[10px] text-gray-400 mb-1">Type de service</p>
                                    <p className="text-gray-700 font-medium">{selectedTransaction.service_info.type}</p>
                                </div>
                                <div className="border border-gray-200 rounded-lg p-3">
                                    <p className="text-[10px] text-gray-400 mb-1">Statut du service</p>
                                    <p className="text-gray-700 font-medium capitalize">{selectedTransaction.service_info.status}</p>
                                </div>
                            </div>

                            {/* Actions */}
                            {selectedTransaction.status.payout === 'pending' && selectedTransaction.status.payment !== 'disputed' && (
                                <div className="flex gap-3 pt-2 border-t border-gray-200">
                                    <button
                                        onClick={() => {
                                            setSelectedTransaction(null);
                                            setConfirm({ open: true, type: 'release', trx: selectedTransaction });
                                        }}
                                        className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white text-[12px] font-semibold rounded transition-colors flex items-center justify-center gap-2"
                                    >
                                        <CheckCircle className="w-4 h-4" />
                                        Libérer paiement ({selectedTransaction.finance.net_artisan} {selectedTransaction.finance.currency})
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedTransaction(null);
                                            setConfirm({ open: true, type: 'refund', trx: selectedTransaction });
                                        }}
                                        className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white text-[12px] font-semibold rounded transition-colors flex items-center justify-center gap-2"
                                    >
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