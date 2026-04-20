import React, { useEffect, useState } from 'react';
import {
    User, Search, Eye, Ban, CheckCircle, XCircle,
    Shield, RefreshCw, Mail, Phone, MapPin,
    Calendar, Unlock, Wrench, UserCheck, Star
} from 'lucide-react';
import axiosClient from '../api/axios-client';
import toast from 'react-hot-toast';

const getImageUrl = (path) => {

    if (path) {
        return import.meta.env.VITE_API_URL_STORAGE + path;
    }
    return null;
}


const hasRole = (user, role) => user.roles?.some(r => r.name === role);
const isBanned = (user) => user.client?.statut === 'inactif';

const Avatar = ({ user, size = 'sm' }) => {
    const img = getImageUrl(user?.client?.avatar);
    const cls = size === 'lg' ? 'w-16 h-16 text-xl' : 'w-8 h-8 text-xs';
    return img
        ? <img src={img} alt="" className={`${cls} rounded-full object-cover flex-shrink-0`} />
        : <div className={`${cls} rounded-full bg-[#1B4F72]/10 flex items-center justify-center font-bold text-[#1B4F72] flex-shrink-0`}>
            {user?.firstname?.[0]}{user?.lastname?.[0]}
        </div>;
};

const RoleBadge = ({ role }) => {
    const map = {
        artisan: 'bg-[#1B4F72]/10 text-[#1B4F72] border-[#1B4F72]/20',
        client: 'bg-orange-50 text-orange-700 border-orange-200',
        admin: 'bg-purple-50 text-purple-700 border-purple-200',
    };
    const icons = {
        artisan: <Wrench className="w-2.5 h-2.5" />,
        client: <UserCheck className="w-2.5 h-2.5" />,
        admin: <Shield className="w-2.5 h-2.5" />,
    };
    return (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-semibold border rounded-full uppercase tracking-wide ${map[role] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
            {icons[role]} {role}
        </span>
    );
};

const StatusBadge = ({ user }) =>
    isBanned(user)
        ? <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-semibold bg-red-50 text-red-600 border border-red-200 rounded-full uppercase tracking-wide"><Ban className="w-2.5 h-2.5" />Banni</span>
        : <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-semibold bg-green-50 text-green-700 border border-green-200 rounded-full uppercase tracking-wide"><CheckCircle className="w-2.5 h-2.5" />Actif</span>;

const ReportsSkeleton = () => {
    return (
        <div className="animate-pulse">
            <div className="bg-white border border-gray-200 overflow-hidden">
                <div className="divide-y divide-gray-100">
                    {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                        <div key={i} className="px-4 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                                <div className='flex flex-col gap-2'>
                                    <div className="h-3 w-32 bg-gray-200 rounded"></div>
                                    <div className="h-1 w-18 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <div className="h-5 w-20 bg-gray-200 rounded-full"></div>
                            </div>
                            <div className="flex gap-2">
                                <div className="h-5 w-20 bg-gray-200 rounded-full"></div>
                            </div><div className="flex gap-2">
                                <div className="h-5 w-20 bg-gray-200 rounded-full"></div>
                            </div><div className="flex gap-2">
                                <div className="h-5 w-20 bg-gray-200 rounded-full"></div>
                            </div>
                            <div className="flex gap-2">
                                <div className="h-5 w-20 bg-gray-200 rounded-full"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
const ConfirmModal = ({ config, loading, onClose, onConfirm }) => {
    if (!config?.open) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white w-full max-w-sm border border-gray-200 shadow-xl rounded-lg">
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className={`w-10 h-10 ${config.iconBg} flex items-center justify-center rounded-lg`}>{config.icon}</div>
                        <div>
                            <h3 className="text-[14px] font-bold text-[#1B4F72]">{config.title}</h3>
                            <p className="text-[10px] text-gray-400 mt-0.5">{config.subtitle}</p>
                        </div>
                    </div>
                    <p className="text-[12px] text-gray-600 mb-6 leading-relaxed">{config.body}</p>
                    <div className="grid grid-cols-2 gap-3">
                        <button onClick={onClose} className="py-2 text-[12px] text-gray-400 hover:text-gray-600 border border-gray-200 hover:bg-gray-50 rounded transition-all">Annuler</button>
                        <button onClick={onConfirm} disabled={loading} className={`py-2 text-white text-[12px] font-bold rounded transition-colors flex items-center justify-center ${config.confirmStyle}`}>
                            {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : config.confirmLabel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const UsersManager = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedUser, setSelectedUser] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);
    const [banModal, setBanModal] = useState({ open: false, user: null });
    const [activateModal, setActivateModal] = useState({ open: false, user: null });
    const [roleModal, setRoleModal] = useState({ open: false, user: null, newRole: '' });

    useEffect(() => { fetchUsers(); }, []);

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const res = await axiosClient.get('/users');
            setUsers(res.data.data || res.data);
        } catch { toast.error("Erreur lors du chargement des utilisateurs"); }
        finally { setIsLoading(false); }
    };

    const patchUser = (id, fn) => {
        setUsers(prev => prev.map(u => u.id === id ? fn(u) : u));
        setSelectedUser(prev => prev?.id === id ? fn(prev) : prev);
    };

    const handleBan = async () => {
        setActionLoading(true);
        try {
            await axiosClient.patch(`/users/${banModal.user.id}/ban`);
            patchUser(banModal.user.id, u => ({ ...u, client: { ...u.client, statut: 'inactif' } }));
            toast.success("Utilisateur banni avec succès");
            setBanModal({ open: false, user: null });
        } catch { toast.error("Erreur lors du bannissement"); }
        finally { setActionLoading(false); }
    };

    const handleActivate = async () => {
        setActionLoading(true);
        try {
            await axiosClient.patch(`/users/${activateModal.user.id}/activate`);
            patchUser(activateModal.user.id, u => ({ ...u, client: { ...u.client, statut: 'actif' } }));
            toast.success("Utilisateur activé avec succès");
            setActivateModal({ open: false, user: null });
        } catch { toast.error("Erreur lors de l'activation"); }
        finally { setActionLoading(false); }
    };

    const handleRoleChange = async () => {
        setActionLoading(true);
        try {
            await axiosClient.patch(`/users/${roleModal.user.id}/role`, { role: roleModal.newRole });
            patchUser(roleModal.user.id, u => {
                const kept = u.roles.filter(r => r.name === 'admin');
                const next = roleModal.newRole === 'both'
                    ? [...kept, { id: 2, name: 'client' }, { id: 3, name: 'artisan' }]
                    : [...kept, { id: roleModal.newRole === 'client' ? 2 : 3, name: roleModal.newRole }];
                return { ...u, roles: next };
            });
            toast.success("Rôle mis à jour avec succès");
            setRoleModal({ open: false, user: null, newRole: '' });
        } catch { toast.error("Erreur lors du changement de rôle"); }
        finally { setActionLoading(false); }
    };

    const filteredUsers = users.filter(u => {
        const q = searchQuery.toLowerCase();
        const matchSearch =
            u.firstname?.toLowerCase().includes(q) ||
            u.lastname?.toLowerCase().includes(q) ||
            u.email?.toLowerCase().includes(q) ||
            u.city?.toLowerCase().includes(q);
        const matchRole =
            roleFilter === 'all' ? true :
                roleFilter === 'artisan' ? hasRole(u, 'artisan') :
                    roleFilter === 'client' ? hasRole(u, 'client') && !hasRole(u, 'artisan') :
                        roleFilter === 'admin' ? hasRole(u, 'admin') : true;
        const matchStatus =
            statusFilter === 'all' ? true :
                statusFilter === 'active' ? !isBanned(u) :
                    statusFilter === 'banned' ? isBanned(u) : true;
        return matchSearch && matchRole && matchStatus;
    });

    const stats = [
        { label: 'Total', value: users.length, color: 'bg-[#1B4F72]', Icon: User },
        { label: 'Actifs', value: users.filter(u => !isBanned(u)).length, color: 'bg-green-500', Icon: CheckCircle },
        { label: 'Bannis', value: users.filter(u => isBanned(u)).length, color: 'bg-red-500', Icon: Ban },
        { label: 'Artisans', value: users.filter(u => hasRole(u, 'artisan')).length, color: 'bg-[#D35400]', Icon: Wrench },
    ];

    const ROLE_OPTIONS = [
        { value: 'client', label: 'Client uniquement', Icon: UserCheck, color: 'text-orange-500' },
        { value: 'artisan', label: 'Artisan uniquement', Icon: Wrench, color: 'text-[#1B4F72]' },
        { value: 'both', label: 'Client + Artisan (les deux)', Icon: Shield, color: 'text-purple-500' },
    ];

    return (
        <div className="bg-gray-50 min-h-screen">

            <ConfirmModal
                config={banModal.open ? {
                    open: true, icon: <Ban className="w-5 h-5 text-red-500" />, iconBg: 'bg-red-50',
                    title: "Bannir l'utilisateur", subtitle: "Restriction d'accès",
                    body: `Voulez-vous vraiment bannir ${banModal.user?.firstname} ${banModal.user?.lastname} ? Il ne pourra plus accéder à la plateforme.`,
                    confirmLabel: 'Oui, bannir', confirmStyle: 'bg-red-500 hover:bg-red-600',
                } : null}
                loading={actionLoading}
                onClose={() => setBanModal({ open: false, user: null })}
                onConfirm={handleBan}
            />

            <ConfirmModal
                config={activateModal.open ? {
                    open: true, icon: <Unlock className="w-5 h-5 text-green-600" />, iconBg: 'bg-green-50',
                    title: "Activer l'utilisateur", subtitle: "Restauration de l'accès",
                    body: `Voulez-vous vraiment activer ${activateModal.user?.firstname} ${activateModal.user?.lastname} ?`,
                    confirmLabel: 'Oui, activer', confirmStyle: 'bg-green-500 hover:bg-green-600',
                } : null}
                loading={actionLoading}
                onClose={() => setActivateModal({ open: false, user: null })}
                onConfirm={handleActivate}
            />

            {roleModal.open && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-sm border border-gray-200 shadow-xl rounded-lg">
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-1">
                                <div className="w-10 h-10 bg-[#1B4F72]/10 flex items-center justify-center rounded-lg">
                                    <Shield className="w-5 h-5 text-[#1B4F72]" />
                                </div>
                                <div>
                                    <h3 className="text-[14px] font-bold text-[#1B4F72]">Changer le rôle</h3>
                                    <p className="text-[10px] text-gray-400 mt-0.5">{roleModal.user?.firstname} {roleModal.user?.lastname}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 mb-4 mt-3 flex-wrap">
                                <span className="text-[10px] text-gray-400 mr-1">Actuel :</span>
                                {roleModal.user?.roles?.map(r => <RoleBadge key={r.id} role={r.name} />)}
                            </div>
                            <div className="space-y-2 mb-5">
                                {ROLE_OPTIONS.map(opt => (
                                    <button key={opt.value} onClick={() => setRoleModal(p => ({ ...p, newRole: opt.value }))}
                                        className={`w-full flex items-center justify-between px-4 py-3 border rounded-lg text-[12px] transition-all ${roleModal.newRole === opt.value ? 'border-[#1B4F72] bg-[#1B4F72]/5' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}>
                                        <div className="flex items-center gap-2">
                                            <opt.Icon className={`w-4 h-4 ${opt.color}`} />
                                            <span className="font-medium text-gray-700">{opt.label}</span>
                                        </div>
                                        {roleModal.newRole === opt.value && <CheckCircle className="w-4 h-4 text-[#1B4F72]" />}
                                    </button>
                                ))}
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <button onClick={() => setRoleModal({ open: false, user: null, newRole: '' })} className="py-2 text-[12px] text-gray-400 hover:text-gray-600 border border-gray-200 hover:bg-gray-50 rounded transition-all">Annuler</button>
                                <button onClick={handleRoleChange} disabled={!roleModal.newRole || actionLoading} className="py-2 bg-[#1B4F72] hover:bg-[#D35400] disabled:opacity-40 text-white text-[12px] font-bold rounded transition-colors flex items-center justify-center">
                                    {actionLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : 'Confirmer'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="sticky -top-3 bg-white px-4 py-3 border-b border-gray-200 z-10">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                    <h1 className="text-[18px] font-bold text-[#1B4F72]">Gestion des Utilisateurs</h1>
                    <div className="flex items-center gap-2 flex-wrap">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input type="text" placeholder="Nom, email, ville..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                                className="pl-9 pr-8 py-2 text-[12px] border border-gray-200 rounded focus:border-[#1B4F72] focus:outline-none w-48 lg:w-64" />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    <XCircle className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </div>
                        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="px-3 py-2 text-[12px] border border-gray-200 rounded focus:border-[#1B4F72] focus:outline-none bg-white">
                            <option value="all">Tous les rôles</option>
                            <option value="artisan">Artisan</option>
                            <option value="client">Client</option>
                            <option value="admin">Admin</option>
                        </select>
                        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 text-[12px] border border-gray-200 rounded focus:border-[#1B4F72] focus:outline-none bg-white">
                            <option value="all">Tous les statuts</option>
                            <option value="actif">Actifs</option>
                            <option value="inactif">Bannis</option>
                        </select>
                        <button onClick={fetchUsers} className="p-2 border border-gray-200 rounded hover:bg-gray-50 text-gray-500 hover:text-[#1B4F72] transition-colors">
                            <RefreshCw className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-3 mt-3">
                    {stats.map(s => (
                        <div key={s.label} className="bg-white border border-gray-200 rounded-lg p-3 flex items-center gap-3">
                            <div className={`w-9 h-9 ${s.color} flex items-center justify-center rounded-full flex-shrink-0`}>
                                <s.Icon className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <p className="text-[18px] font-bold text-[#1B4F72] leading-none">{s.value}</p>
                                <p className="hidden lg:block text-[10px] text-gray-500 mt-0.5">{s.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white border border-gray-200 m-4 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600">Utilisateur</th>
                                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600">Email</th>
                                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600">Rôles</th>
                                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600">Statut</th>
                                <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600">Inscription</th>
                                <th className="px-4 py-3 text-right text-[11px] font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                <tr><td colSpan="6" className="">
                                    <ReportsSkeleton />
                                </td></tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr><td colSpan="6" className="px-4 py-12 text-center">
                                    <p className="text-[12px] text-gray-400">Aucun utilisateur trouvé.</p>
                                </td></tr>
                            ) : filteredUsers.map(user => (
                                <tr key={user.id} className={`hover:bg-gray-50 transition-colors ${isBanned(user) ? 'opacity-60' : ''}`}>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2.5">
                                            <Avatar user={user} />
                                            <div>
                                                <p className="text-[12px] font-semibold text-[#1B4F72]">{user.firstname} {user.lastname}</p>
                                                <p className="text-[10px] text-gray-400">{user.city || '—'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-[11px] text-gray-600 max-w-[160px] truncate">{user.email}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex flex-wrap gap-1">
                                            {user.roles?.map(r => <RoleBadge key={r.id} role={r.name} />)}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3"><StatusBadge user={user} /></td>
                                    <td className="px-4 py-3 text-[11px] text-gray-500">
                                        {new Date(user.created_at).toLocaleDateString('fr-FR')}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-end gap-0.5">
                                            <button onClick={() => setSelectedUser(user)} title="Voir le profil"
                                                className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-[#1B4F72] transition-colors">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            {!hasRole(user, 'admin') && (
                                                isBanned(user) ? (
                                                    <button onClick={() => setActivateModal({ open: true, user })} title="Activer"
                                                        className="p-1.5 rounded hover:bg-green-50 text-gray-400 hover:text-green-600 transition-colors">
                                                        <Unlock className="w-4 h-4" />
                                                    </button>
                                                ) : (
                                                    <button onClick={() => setBanModal({ open: true, user })} title="Bannir"
                                                        className="p-1.5 rounded hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                                                        <Ban className="w-4 h-4" />
                                                    </button>
                                                )
                                            )}
                                            {!hasRole(user, 'admin') && (
                                                <button onClick={() => setRoleModal({ open: true, user, newRole: '' })} title="Changer le rôle"
                                                    className="p-1.5 rounded hover:bg-[#1B4F72]/10 text-gray-400 hover:text-[#1B4F72] transition-colors">
                                                    <Shield className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto border border-gray-200 rounded-lg shadow-2xl">
                        <div className="p-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white rounded-t-lg z-10">
                            <h3 className="text-[14px] font-bold text-[#1B4F72]">Profil utilisateur</h3>
                            <button onClick={() => setSelectedUser(null)} className="text-gray-400 hover:text-[#D35400] transition-colors">
                                <XCircle className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-5 space-y-5">
                            <div className="flex items-start gap-4">
                                <Avatar user={selectedUser} size="lg" />
                                <div className="flex-1">
                                    <h4 className="text-[17px] font-bold text-[#1B4F72]">{selectedUser.firstname} {selectedUser.lastname}</h4>
                                    <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                                        {selectedUser.roles?.map(r => <RoleBadge key={r.id} role={r.name} />)}
                                        <StatusBadge user={selectedUser} />
                                    </div>
                                    <div className="flex items-center gap-3 mt-2 text-[11px] text-gray-400 flex-wrap">
                                        {selectedUser.city && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{selectedUser.city}</span>}
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />Inscrit le {new Date(selectedUser.created_at).toLocaleDateString('fr-FR')}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg">
                                    <p className="text-[10px] text-gray-400 flex items-center gap-1 mb-1"><Mail className="w-3 h-3" />Email</p>
                                    <p className="text-[12px] text-[#1B4F72] font-medium break-all">{selectedUser.email}</p>
                                </div>
                                <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg">
                                    <p className="text-[10px] text-gray-400 flex items-center gap-1 mb-1"><Phone className="w-3 h-3" />Téléphone</p>
                                    <p className="text-[12px] text-[#1B4F72] font-medium">{selectedUser.client?.phone || '—'}</p>
                                </div>
                                {selectedUser.client?.address && (
                                    <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg col-span-2">
                                        <p className="text-[10px] text-gray-400 flex items-center gap-1 mb-1"><MapPin className="w-3 h-3" />Adresse</p>
                                        <p className="text-[12px] text-[#1B4F72] font-medium">{selectedUser.client.address}</p>
                                    </div>
                                )}
                            </div>

                            {selectedUser.artisan && (
                                <div className="p-4 border border-[#1B4F72]/20 rounded-lg bg-[#1B4F72]/5 space-y-3">
                                    <p className="text-[11px] font-semibold text-[#1B4F72] flex items-center gap-1">
                                        <Wrench className="w-3.5 h-3.5" />Informations Artisan
                                    </p>
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[11px]">
                                        <div><span className="text-gray-400">Spécialité : </span><span className="text-gray-700 font-medium capitalize">{selectedUser.artisan.specialite || '—'}</span></div>
                                        <div><span className="text-gray-400">Expérience : </span><span className="text-gray-700 font-medium">{selectedUser.artisan.experience ?? '—'} ans</span></div>
                                        <div className="flex items-center gap-1"><span className="text-gray-400">Note : </span><Star className="w-3 h-3 text-yellow-400 fill-yellow-400 ml-1" /><span className="text-gray-700 font-medium">{selectedUser.artisan.note}</span></div>
                                        <div><span className="text-gray-400">Offres : </span><span className="text-gray-700 font-medium">{selectedUser.artisan.nb_offres}</span></div>
                                        <div><span className="text-gray-400">Vérifié : </span><span className={`font-medium ${selectedUser.artisan.is_verified ? 'text-green-600' : 'text-yellow-600'}`}>{selectedUser.artisan.is_verified ? 'Oui ✓' : 'Non'}</span></div>
                                        <div><span className="text-gray-400">Rayon : </span><span className="text-gray-700 font-medium">{selectedUser.artisan.rayon_action} km</span></div>
                                    </div>
                                    {selectedUser.artisan.bio && (
                                        <p className="text-[11px] text-gray-600 leading-relaxed border-t border-[#1B4F72]/10 pt-3">{selectedUser.artisan.bio}</p>
                                    )}
                                </div>
                            )}

                            {!hasRole(selectedUser, 'admin') && (
                                <div className="flex gap-2 pt-2 border-t border-gray-100 flex-wrap">
                                    {isBanned(selectedUser) ? (
                                        <button onClick={() => { setSelectedUser(null); setActivateModal({ open: true, user: selectedUser }); }}
                                            className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-[11px] font-semibold rounded transition-colors">
                                            <Unlock className="w-3.5 h-3.5" /> Activer
                                        </button>
                                    ) : (
                                        <button onClick={() => { setSelectedUser(null); setBanModal({ open: true, user: selectedUser }); }}
                                            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-[11px] font-semibold rounded transition-colors">
                                            <Ban className="w-3.5 h-3.5" /> Bannir
                                        </button>
                                    )}
                                    <button onClick={() => { setSelectedUser(null); setRoleModal({ open: true, user: selectedUser, newRole: '' }); }}
                                        className="flex items-center gap-2 px-4 py-2 bg-[#1B4F72] hover:bg-[#D35400] text-white text-[11px] font-semibold rounded transition-colors">
                                        <Shield className="w-3.5 h-3.5" /> Changer le rôle
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

export default UsersManager;