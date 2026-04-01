import React, { useEffect, useState, useMemo } from 'react';
import {
    Plus, Search, Edit2, Trash2, Banknote,
    AlertTriangle,
    AlertTriangleIcon,
    CassetteTape,
    TagIcon,
    HdIcon,
    TagsIcon
} from 'lucide-react';
import axiosClient from '../api/axios-client';
import toast from 'react-hot-toast';

const ManageCategories = () => {
    // States
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState('');
    const [editing, setEditing] = useState(null);

    const [form, setForm] = useState({ n: '', desc: '', icon: '', a: true });

    const fetchCategories = async () => {
        try {
            const response = await axiosClient.get('/categories');
            const mapped = response.data.data.map(c => ({
                id: c.id,
                n: c.nom_categorie,
                desc: c.description,
                icon: c.icon_url || '',
                a: c.is_active,
                sc: c.services_count
            }));
            setCategories(mapped);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const filtered = useMemo(() => {
        return categories.filter(c =>
            c.n.toLowerCase().includes(search.toLowerCase()) ||
            c.desc.toLowerCase().includes(search.toLowerCase())
        );
    }, [categories, search]);

    const activeCount = categories.filter(c => c.a).length;

    const openNew = () => {
        setForm({ n: '', desc: '', icon: '', a: true });
        setEditing({ isNew: true });
    };

    const openEdit = (category) => {
        setForm({ ...category });
        setEditing({ isNew: false, id: category.id });
    };

    const saveCategory = async (e) => {
        e.preventDefault();
        const payload = {
            nom_categorie: form.n,
            description: form.desc,
            icon: form.icon,
            is_active: form.a
        };

        try {
            if (editing.isNew) {
                const response = await axiosClient.post('/categories', payload);
                if (response.status === 201) {

                    toast.success("Categorie ajoute avec success");
                    fetchCategories();
                }
                else {
                    toast.error(" une erreur est survenue");
                }
            } else {
                const response = await axiosClient.put(`/categories/${editing.id}`, payload);
                if (response.status === 200) {
                    toast.success("Categorie modifie avec success");
                    fetchCategories();
                }
                else {
                    toast.error(" une erreur est survenue");
                }
            }

            setEditing(null);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                const validationErrors = error.response.data.errors;

                Object.values(validationErrors).forEach((errorMessages) => {
                    errorMessages.forEach((message) => {
                        toast.error(message);
                    });
                });
            } else {
                toast.error("Une erreur inattendue est survenue.");
            }
        }
    };



    const toggleStatus = async (id) => {
        const cat = categories.find(c => c.id === id);
        try {
            await axiosClient.patch(`/categories/${id}/toggle`, { is_active: !cat.a });
            setCategories(categories.map(c => c.id === id ? { ...c, a: !c.a } : c));
        } catch (error) {
            fetchCategories();
        }
    };

    return (
        <div className="min-h-screen max-h-screen relative bg-gray-50 w-full overflow-auto overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <header className="bg-white border-b px-6 py-2  sticky top-0   ">
                <div className="flex justify-between items-center">

                    <div className="mt-3 relative max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Rechercher..."
                            className="w-full pl-9 pr-3 py-2 text-[12px] border border-gray-200 outline-none focus:border-[#D35400]"
                        />
                    </div>
                    <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-[#D35400] text-white text-[12px] font-medium hover:bg-[#A04000] transition-colors">
                        <Plus className="w-4 h-4" /> Nouveau
                    </button>
                </div>


            </header>

            <div className="px-6 py-4">
                <div className="bg-white border border-gray-200 overflow-x-auto">
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
                        <tbody>
                            {filtered.map(c => (
                                <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                                    <td className="px-4 py-3 text-[11px] text-gray-400 font-mono">#{c.id}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <span className="text-[20px]">{c.icon}</span>
                                            <span className={`text-[13px] font-semibold ${c.a ? 'text-gray-800' : 'text-gray-400'}`}>
                                                {c.n}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-[11px] text-gray-600 truncate max-w-xs">
                                        {c.desc}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <span className="text-[13px] font-bold text-[#1B4F72]">{c.sc}</span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => toggleStatus(c.id)}
                                            className={`px-3 py-1 text-[10px] font-bold uppercase transition-colors ${c.a ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                        >
                                            {c.a ? 'Active' : 'Inactive'}
                                        </button>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex gap-1">
                                            <button onClick={() => openEdit(c)} className="p-2 hover:bg-gray-100 transition-colors">
                                                <Edit2 className="w-4 h-4 text-gray-400" />
                                            </button>

                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {!filtered.length && (
                        <div className="p-12 text-center text-[12px] text-gray-400">
                            Aucune catégorie trouvée
                        </div>
                    )}
                </div>
            </div>

            {editing && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={() => setEditing(null)} />
                    <div className="relative w-full max-w-sm bg-white shadow-2xl border border-gray-100 p-6 animate-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 bg-[#D35400]/10 flex items-center justify-center">
                                <TagsIcon className="w-5 h-5 text-[#D35400]" />
                            </div>
                            <div>
                                <h3 className="text-[14px] font-bold text-[#1B4F72]">
                                    {editing.isNew ? 'Nouvelle catégorie' : 'Modifier catégorie'}
                                </h3>
                                <p className="text-[11px] text-gray-400 leading-none mt-1">
                                    {editing.isNew ? 'Créer une nouvelle entrée' : 'Modification des données'}
                                </p>
                            </div>
                        </div>

                        <form onSubmit={saveCategory} className="space-y-3">
                            <div>
                                <label className="text-[11px] text-gray-500 mb-1 block">Nom de la catégorie  <span className="text-[#D35400]">*</span> </label>
                                <input
                                    required
                                    value={form.n}
                                    onChange={e => setForm({ ...form, n: e.target.value })}
                                    className="w-full border border-gray-300 p-1 text-[12px] focus:border-[#D35400] outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-[11px] text-gray-500 mb-1 block">Description <span className="text-[#D35400]"></span> <span className="text-[10px] text-gray-400">(Facultatif)</span></label>
                                <textarea
                                    value={form.desc}
                                    onChange={e => setForm({ ...form, desc: e.target.value })}
                                    rows={2}
                                    className="w-full border border-gray-300 p-2 text-[12px] focus:border-[#D35400] outline-none resize-none"
                                />
                            </div>
                            <div>
                                <label className="text-[11px] text-gray-500 mb-1 block">Icône <span className="text-[#D35400]">*</span>  <span className="text-[10px] text-gray-400">(nom de l'icône)</span> </label>
                                <input
                                    value={form.icon}
                                    onChange={e => setForm({ ...form, icon: e.target.value })}
                                    className="w-full border border-gray-300 p-1 text-[12px] focus:border-[#D35400] outline-none"
                                />
                            </div>
                            <label className="flex items-center gap-2 mt-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={form.a}
                                    onChange={e => setForm({ ...form, a: e.target.checked })}
                                    className="w-4 h-4 accent-[#D35400]"
                                />
                                <span className="text-[12px] text-gray-600">Catégorie active</span>
                            </label>

                            <div className="grid grid-cols-2 gap-3 mt-6">
                                <button type="button" onClick={() => setEditing(null)} className="py-2 text-[12px] text-gray-400 hover:text-gray-600 font-medium">
                                    Annuler
                                </button>
                                <button type="submit" className="py-2 bg-[#1B4F72] text-white text-[12px] font-bold hover:bg-[#D35400]">
                                    Confirmer
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