import React, { useEffect, useState, useMemo } from 'react';
import {
    Plus, Search, Edit2, Trash2, Tags,
    CheckCircle, XCircle, RefreshCw, LayoutGrid
} from 'lucide-react';
import axiosClient from '../api/axios-client';
import toast from 'react-hot-toast';

const DeleteModal = ({ open, category, loading, onClose, onConfirm }) => {
    if (!open || !category) return null;
    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />
            <div className="relative w-full max-w-xs bg-white shadow-2xl border border-gray-100 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Trash2 className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                        <h3 className="text-[14px] font-bold text-[#1B4F72]">Supprimer la catégorie</h3>
                        <p className="text-[10px] text-gray-400 mt-0.5">Action irréversible</p>
                    </div>
                </div>
                <p className="text-[12px] text-gray-600 mb-5 leading-relaxed">
                    Voulez-vous vraiment supprimer <span className="font-semibold text-[#1B4F72]">« {category.n} »</span> ?
                    {category.sc > 0 && (
                        <span className="block mt-1 text-red-500 text-[11px]">
                            ⚠ Cette catégorie contient {category.sc} service(s).
                        </span>
                    )}
                </p>
                <div className="grid grid-cols-2 gap-3">
                    <button onClick={onClose} className="py-2 text-[12px] text-gray-400 hover:text-gray-600 border border-gray-200 hover:bg-gray-50 rounded transition-all">
                        Annuler
                    </button>
                    <button onClick={onConfirm} disabled={loading} className="py-2 bg-red-500 hover:bg-red-600 text-white text-[12px] font-bold rounded flex items-center justify-center transition-colors">
                        {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : 'Supprimer'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const TableSkeleton = () => (
    <div className="animate-pulse divide-y divide-gray-100">
        {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="px-4 py-3 flex items-center gap-4 justify-between">
                <div className="w-8 h-3 bg-gray-200 rounded" />

                <div className="w-8 h-3 bg-gray-200 rounded" />
                <div className="w-8 h-3 bg-gray-200 rounded" />
                <div className="w-8 h-3 bg-gray-200 rounded" />
                <div className="w-8 h-3 bg-gray-200 rounded" />
                <div className="w-8 h-3 bg-gray-200 rounded" />
                <div className="w-8 h-3 bg-gray-200 rounded" />

            </div>
        ))}
    </div>
);

const ManageCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ n: '', desc: '', icon: '', a: true });
    const [formLoading, setFormLoading] = useState(false);
    const [deleteModal, setDeleteModal] = useState({ open: false, category: null });
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [toggleLoadingId, setToggleLoadingId] = useState(null);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const res = await axiosClient.get('/categories');
            setCategories(res.data.data.map(c => ({
                id: c.id,
                n: c.nom_categorie,
                desc: c.description ?? '',
                icon: c.icon_url ?? '',
                a: c.is_active,
                sc: c.services_count ?? 0,
            })));
        } catch {
            toast.error('Erreur de chargement des catégories');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchCategories(); }, []);

    const filtered = useMemo(() =>
        categories.filter(c =>
            c.n.toLowerCase().includes(search.toLowerCase()) ||
            c.desc.toLowerCase().includes(search.toLowerCase())
        ),
        [categories, search]
    );

    const activeCount = categories.filter(c => c.a).length;
    const inactiveCount = categories.length - activeCount;

    const openNew = () => {
        setForm({ n: '', desc: '', icon: '', a: true });
        setEditing({ isNew: true });
    };

    const openEdit = (cat) => {
        setForm({ n: cat.n, desc: cat.desc, icon: cat.icon, a: cat.a });
        setEditing({ isNew: false, id: cat.id });
    };

    const saveCategory = async (e) => {
        e.preventDefault();
        setFormLoading(true);
        const payload = {
            nom_categorie: form.n,
            description: form.desc,
            icon: form.icon,
            is_active: form.a,
        };

        try {
            if (editing.isNew) {
                const res = await axiosClient.post('/categories', payload);
                const c = res.data.data ?? res.data;
                setCategories(prev => [...prev, {
                    id: c.id, n: c.nom_categorie, desc: c.description ?? '',
                    icon: c.icon_url ?? '', a: c.is_active, sc: 0,
                }]);
                toast.success('Catégorie ajoutée avec succès');
            } else {
                await axiosClient.put(`/categories/${editing.id}`, payload);
                setCategories(prev => prev.map(c =>
                    c.id === editing.id
                        ? { ...c, n: form.n, desc: form.desc, icon: form.icon, a: form.a }
                        : c
                ));
                toast.success('Catégorie modifiée avec succès');
            }
            setEditing(null);
        } catch (err) {
            const errors = err.response?.data?.errors;
            if (errors) {
                Object.values(errors).flat().forEach(msg => toast.error(msg));
            } else {
                toast.error('Une erreur inattendue est survenue');
            }
        } finally {
            setFormLoading(false);
        }
    };

    const toggleStatus = async (id) => {
        setToggleLoadingId(id);
        const cat = categories.find(c => c.id === id);
        try {
            await axiosClient.patch(`/categories/${id}/toggle`, { is_active: !cat.a });
            setCategories(prev => prev.map(c => c.id === id ? { ...c, a: !c.a } : c));
        } catch {
            toast.error('Erreur lors du changement de statut');
        } finally {
            setToggleLoadingId(null);
        }
    };

    const handleDelete = async () => {
        setDeleteLoading(true);
        try {
            await axiosClient.delete(`/categories/${deleteModal.category.id}`);
            setCategories(prev => prev.filter(c => c.id !== deleteModal.category.id));
            toast.success('Catégorie supprimée avec succès');
            setDeleteModal({ open: false, category: null });
        } catch {
            toast.error('Erreur lors de la suppression');
        } finally {
            setDeleteLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">

            <DeleteModal
                open={deleteModal.open}
                category={deleteModal.category}
                loading={deleteLoading}
                onClose={() => setDeleteModal({ open: false, category: null })}
                onConfirm={handleDelete}
            />

            <div className="sticky -top-3 bg-white px-6 py-3 border-b border-gray-200 z-10">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                    <h1 className="text-[18px] font-bold text-[#1B4F72]">Gestion des Catégories</h1>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Rechercher une catégorie..."
                                className="pl-9 pr-4 py-2 text-[12px] border border-gray-200 focus:border-[#1B4F72] focus:outline-none rounded w-56"
                            />
                        </div>
                        <button
                            onClick={openNew}
                            className="flex items-center gap-2 px-4 py-2 bg-[#D35400] hover:bg-[#A04000] text-white text-[12px] font-semibold rounded transition-colors"
                        >
                            <Plus className="w-4 h-4" /> Nouvelle catégorie
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-3">
                    {[
                        { label: 'Total', value: categories.length, color: 'bg-[#1B4F72]', Icon: LayoutGrid },
                        { label: 'Actives', value: activeCount, color: 'bg-green-500', Icon: CheckCircle },
                        { label: 'Inactives', value: inactiveCount, color: 'bg-gray-400', Icon: XCircle },
                    ].map(s => (
                        <div key={s.label} className="bg-white border border-gray-200 rounded-lg p-3 flex items-center gap-3">
                            <div className={`w-9 h-9 ${s.color} flex items-center justify-center rounded-full flex-shrink-0`}>
                                <s.Icon className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <p className="text-[18px] font-bold text-[#1B4F72] leading-none">{s.value}</p>
                                <p className="text-[10px] text-gray-500 mt-0.5">{s.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="px-6 py-4">
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-[12px]">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    {['ID', 'Catégorie', 'Description', 'Services', 'Statut', 'Actions'].map(h => (
                                        <th key={h} className="px-4 py-3 text-left text-[10px] font-bold text-gray-600 uppercase tracking-wide">
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading && (
                                    <tr><td colSpan={6} className="p-0"><TableSkeleton /></td></tr>
                                )}

                                {!loading && filtered.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-4 py-12 text-center">
                                            <div className="flex flex-col items-center gap-2">
                                                <Tags className="w-8 h-8 text-gray-300" />
                                                <p className="text-[12px] text-gray-400">Aucune catégorie trouvée.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}

                                {!loading && filtered.map(c => (
                                    <tr key={c.id} className={`hover:bg-gray-50 transition-colors ${!c.a ? 'opacity-60' : ''}`}>
                                        <td className="px-4 py-3 text-[11px] text-gray-400 font-mono">#{c.id}</td>

                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-[#1B4F72]/10 rounded-full flex items-center justify-center text-[18px] flex-shrink-0">
                                                    {c.icon || <Tags className="w-4 h-4 text-[#1B4F72]" />}
                                                </div>
                                                <span className="text-[13px] font-semibold text-gray-800">{c.n}</span>
                                            </div>
                                        </td>

                                        <td className="px-4 py-3 text-[11px] text-gray-500 max-w-xs truncate">
                                            {c.desc || <span className="italic text-gray-300">—</span>}
                                        </td>

                                        <td className="px-4 py-3 text-center">
                                            <span className="text-[13px] font-bold text-[#1B4F72]">{c.sc}</span>
                                        </td>

                                        <td className="px-4 py-3">
                                            <button
                                                onClick={() => toggleStatus(c.id)}
                                                disabled={toggleLoadingId === c.id}
                                                className={`inline-flex items-center gap-1 px-3 py-1 text-[10px] font-bold uppercase rounded-full transition-colors ${c.a
                                                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {toggleLoadingId === c.id
                                                    ? <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                                                    : c.a
                                                        ? <><CheckCircle className="w-2.5 h-2.5" /> Actif</>
                                                        : <><XCircle className="w-2.5 h-2.5" /> Inactif</>
                                                }
                                            </button>
                                        </td>

                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => openEdit(c)}
                                                    title="Modifier"
                                                    className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-[#1B4F72] transition-colors"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => setDeleteModal({ open: true, category: c })}
                                                    title="Supprimer"
                                                    className="p-1.5 rounded hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {editing && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={() => setEditing(null)} />
                    <div className="relative w-full max-w-sm bg-white shadow-2xl border border-gray-100 rounded-lg p-6">

                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 bg-[#D35400]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Tags className="w-5 h-5 text-[#D35400]" />
                            </div>
                            <div>
                                <h3 className="text-[14px] font-bold text-[#1B4F72]">
                                    {editing.isNew ? 'Nouvelle catégorie' : 'Modifier la catégorie'}
                                </h3>
                                <p className="text-[10px] text-gray-400 mt-0.5">
                                    {editing.isNew ? 'Créer une nouvelle entrée' : 'Mise à jour des données'}
                                </p>
                            </div>
                        </div>

                        <form onSubmit={saveCategory} className="space-y-3">
                            <div>
                                <label className="text-[11px] text-gray-500 mb-1 block">
                                    Nom <span className="text-red-500">*</span>
                                </label>
                                <input
                                    required
                                    value={form.n}
                                    onChange={e => setForm({ ...form, n: e.target.value })}
                                    placeholder="Ex: Plomberie"
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-[12px] focus:border-[#1B4F72] focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="text-[11px] text-gray-500 mb-1 block">
                                    Description <span className="text-[10px] text-gray-400">(facultatif)</span>
                                </label>
                                <textarea
                                    value={form.desc}
                                    onChange={e => setForm({ ...form, desc: e.target.value })}
                                    rows={2}
                                    placeholder="Courte description..."
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-[12px] focus:border-[#1B4F72] focus:outline-none resize-none"
                                />
                            </div>

                            <div>
                                <label className="text-[11px] text-gray-500 mb-1 block">
                                    Icône <span className="text-[10px] text-gray-400">(emoji ou URL)</span>
                                </label>
                                <div className="flex gap-2 items-center">
                                    <input
                                        value={form.icon}
                                        onChange={e => setForm({ ...form, icon: e.target.value })}
                                        placeholder="🔧"
                                        className="flex-1 border border-gray-300 rounded px-3 py-2 text-[12px] focus:border-[#1B4F72] focus:outline-none"
                                    />
                                    {form.icon && (
                                        <div className="w-9 h-9 bg-gray-100 rounded flex items-center justify-center text-[20px] flex-shrink-0">
                                            {form.icon}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <label className="flex items-center gap-2 cursor-pointer mt-1">
                                <input
                                    type="checkbox"
                                    checked={form.a}
                                    onChange={e => setForm({ ...form, a: e.target.checked })}
                                    className="w-4 h-4 accent-[#D35400]"
                                />
                                <span className="text-[12px] text-gray-600">Catégorie active</span>
                            </label>

                            <div className="grid grid-cols-2 gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setEditing(null)}
                                    className="py-2 text-[12px] text-gray-400 hover:text-gray-600 border border-gray-200 hover:bg-gray-50 rounded transition-all"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    disabled={formLoading}
                                    className="py-2 bg-[#1B4F72] hover:bg-[#D35400] text-white text-[12px] font-bold rounded transition-colors flex items-center justify-center"
                                >
                                    {formLoading
                                        ? <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                        : editing.isNew ? 'Créer' : 'Enregistrer'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageCategories;