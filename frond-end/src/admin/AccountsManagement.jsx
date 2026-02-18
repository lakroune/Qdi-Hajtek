import React, { useState } from 'react';
import { 
    DollarSign, Search, ArrowUpRight, ArrowDownRight, 
    Download, Filter, Calendar, CheckCircle, Clock,
    MoreHorizontal, Eye, User, Briefcase
} from 'lucide-react';

const AccountsManagement = () => {
    const [period, setPeriod] = useState('month');

    const transactions = [
        { id: 'TRX-001', type: 'commission', amount: 250, from: 'Karim Plombier', to: 'Platform', status: 'completed', date: '2024-01-15 14:30' },
        { id: 'TRX-002', type: 'payout', amount: 1200, from: 'Platform', to: 'Youssef Élec', status: 'pending', date: '2024-01-15 10:00' },
         ];

    const stats = {
        revenue: 45200,
        payouts: 28900,
        pending: 3400,
        balance: 12900
    };

    const getTypeIcon = (type) => {
        if (type === 'commission') return <ArrowUpRight className="w-4 h-4 text-green-500" />;
        if (type === 'payout') return <ArrowDownRight className="w-4 h-4 text-red-500" />;
        return <ArrowDownRight className="w-4 h-4 text-orange-500" />;
    };

    const getTypeLabel = (type) => {
        const labels = { commission: 'Commission', payout: 'Paiement', refund: 'Remboursement' };
        return labels[type];
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-[18px] font-bold text-[#1B4F72]">Comptes & Finances</h1>
                    <p className="text-[11px] text-gray-500">Suivi des transactions et revenus</p>
                </div>
                <div className="flex items-center gap-2">
                    <select 
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                        className="px-3 py-2 text-[12px] border border-gray-200 focus:border-[#1B4F72] focus:outline-none bg-white"
                    >
                        <option value="today">Aujourd'hui</option>
                        <option value="week">Cette semaine</option>
                        <option value="month">Ce mois</option>
                        <option value="year">Cette année</option>
                    </select>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 hover:border-[#1B4F72] text-[12px] text-gray-600 hover:text-[#1B4F72] transition-colors">
                        <Download className="w-4 h-4" />
                        Exporter
                    </button>
                </div>
            </div>

         
         

            {/* Transactions Table */}
            <div className="bg-white border border-gray-200">
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="text-[13px] font-bold text-[#1B4F72]">Transactions récentes</h3>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input 
                                type="text" 
                                placeholder="Rechercher..."
                                className="pl-9 pr-4 py-2 text-[12px] border border-gray-200 focus:border-[#1B4F72] focus:outline-none w-48"
                            />
                        </div>
                        <button className="p-2 border border-gray-200 hover:border-[#1B4F72] text-gray-400 hover:text-[#1B4F72] transition-colors">
                            <Filter className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600">ID</th>
                            <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600">Type</th>
                            <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600">Montant</th>
                            <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600">De</th>
                            <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600">Vers</th>
                            <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600">Date</th>
                            <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600">Statut</th>
                            <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {transactions.map((trx) => (
                            <tr key={trx.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-[11px] text-gray-500 font-mono">{trx.id}</td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        {getTypeIcon(trx.type)}
                                        <span className="text-[11px] text-gray-700">{getTypeLabel(trx.type)}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    <span className={`text-[12px] font-semibold ${trx.type === 'commission' ? 'text-green-600' : 'text-red-600'}`}>
                                        {trx.type === 'commission' ? '+' : '-'}{trx.amount} DH
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-[11px] text-gray-600">{trx.from}</td>
                                <td className="px-4 py-3 text-[11px] text-gray-600">{trx.to}</td>
                                <td className="px-4 py-3 text-[11px] text-gray-500">{trx.date}</td>
                                <td className="px-4 py-3">
                                    <span className={`
                                        px-2 py-0.5 text-[10px]
                                        ${trx.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}
                                    `}>
                                        {trx.status === 'completed' ? 'Complété' : 'En attente'}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <button className="p-1.5 text-gray-400 hover:text-[#1B4F72] hover:bg-[#1B4F72]/10 transition-colors">
                                        <Eye className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AccountsManagement;