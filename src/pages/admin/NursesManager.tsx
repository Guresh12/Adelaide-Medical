import { useState, useRef } from 'react';
import { Users, Plus, Pencil, Trash2, Loader2, Upload, X, Star, ToggleLeft, ToggleRight } from 'lucide-react';
import { useAllNurses, useCreateNurse, useUpdateNurse, useDeleteNurse } from '@/hooks/useNurses';
import type { Nurse, NurseInsert } from '@/types/database';

const BLANK: NurseInsert = {
    name: '', qualifications: '', experience: 0, rating: 5.0,
    reviews: 0, specialty: [], available: true, bio: '', photo_url: null,
};

function NurseModal({
    initial,
    onClose,
    onSave,
    saving,
}: {
    initial: NurseInsert & { id?: string };
    onClose: () => void;
    onSave: (data: NurseInsert, photo?: File) => void;
    saving: boolean;
}) {
    const [form, setForm] = useState(initial);
    const [specialtyInput, setSpecialtyInput] = useState('');
    const [photo, setPhoto] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>((initial as any).photo_url ?? null);
    const fileRef = useRef<HTMLInputElement>(null);

    const addSpecialty = () => {
        const v = specialtyInput.trim();
        if (v && !form.specialty.includes(v)) {
            setForm(f => ({ ...f, specialty: [...f.specialty, v] }));
        }
        setSpecialtyInput('');
    };

    const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setPhoto(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(form, photo ?? undefined);
    };

    const inputCls = 'w-full h-10 px-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-[#4a5568] focus:outline-none focus:border-[#c9a96e]/60 focus:ring-1 focus:ring-[#c9a96e]/40 transition-all';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-[#111827] border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                    <h2 className="text-white font-semibold">{initial.id ? 'Edit Nurse' : 'Add Nurse'}</h2>
                    <button onClick={onClose} className="text-[#8b9ab5] hover:text-white"><X className="w-5 h-5" /></button>
                </div>
                <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                    {/* Photo upload */}
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center">
                            {preview
                                ? <img src={preview} alt="preview" className="w-full h-full object-cover" />
                                : <Users className="w-8 h-8 text-[#4a5568]" />}
                        </div>
                        <button type="button" onClick={() => fileRef.current?.click()}
                            className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[#8b9ab5] hover:text-white text-xs transition-all">
                            <Upload className="w-3.5 h-3.5" /> Upload Photo
                        </button>
                        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="col-span-2">
                            <label className="block text-xs text-[#8b9ab5] mb-1">Full Name *</label>
                            <input required className={inputCls} value={form.name}
                                onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Sarah Johnson, RN" />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xs text-[#8b9ab5] mb-1">Qualifications *</label>
                            <input required className={inputCls} value={form.qualifications}
                                onChange={e => setForm(f => ({ ...f, qualifications: e.target.value }))} placeholder="e.g. Registered Nurse, BSN" />
                        </div>
                        <div>
                            <label className="block text-xs text-[#8b9ab5] mb-1">Experience (yrs)</label>
                            <input type="number" min={0} className={inputCls} value={form.experience}
                                onChange={e => setForm(f => ({ ...f, experience: +e.target.value }))} />
                        </div>
                        <div>
                            <label className="block text-xs text-[#8b9ab5] mb-1">Rating (0–5)</label>
                            <input type="number" min={0} max={5} step={0.1} className={inputCls} value={form.rating}
                                onChange={e => setForm(f => ({ ...f, rating: +e.target.value }))} />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs text-[#8b9ab5] mb-1">Bio</label>
                        <textarea rows={3} className={`${inputCls} h-auto py-2`} value={form.bio ?? ''}
                            onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} placeholder="Short bio..." />
                    </div>

                    <div>
                        <label className="block text-xs text-[#8b9ab5] mb-1">Specialties</label>
                        <div className="flex gap-2">
                            <input className={`${inputCls} flex-1`} value={specialtyInput}
                                onChange={e => setSpecialtyInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSpecialty())}
                                placeholder="Type and press Enter" />
                            <button type="button" onClick={addSpecialty}
                                className="px-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[#8b9ab5] hover:text-white transition-all">+</button>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                            {form.specialty.map(s => (
                                <span key={s} className="flex items-center gap-1 px-2 py-0.5 bg-[#c9a96e]/10 text-[#c9a96e] text-xs rounded-full border border-[#c9a96e]/20">
                                    {s}
                                    <button type="button" onClick={() => setForm(f => ({ ...f, specialty: f.specialty.filter(x => x !== s) }))}>
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <label className="flex items-center gap-3 cursor-pointer">
                        <button type="button" onClick={() => setForm(f => ({ ...f, available: !f.available }))}>
                            {form.available
                                ? <ToggleRight className="w-8 h-8 text-[#c9a96e]" />
                                : <ToggleLeft className="w-8 h-8 text-[#4a5568]" />}
                        </button>
                        <span className={`text-sm font-medium ${form.available ? 'text-[#c9a96e]' : 'text-[#8b9ab5]'}`}>
                            {form.available ? 'Available' : 'Unavailable'}
                        </span>
                    </label>

                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={onClose}
                            className="flex-1 h-10 border border-white/10 rounded-xl text-[#8b9ab5] hover:text-white hover:border-white/20 text-sm transition-all">
                            Cancel
                        </button>
                        <button type="submit" disabled={saving}
                            className="flex-1 h-10 bg-gradient-to-r from-[#c9a96e] to-[#b8965a] text-white rounded-xl font-medium text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-60">
                            {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</> : 'Save Nurse'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function NursesManager() {
    const { data: nurses = [], isLoading } = useAllNurses();
    const createNurse = useCreateNurse();
    const updateNurse = useUpdateNurse();
    const deleteNurse = useDeleteNurse();

    const [modal, setModal] = useState<null | 'create' | Nurse>(null);
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

    const handleSave = async (data: NurseInsert, photo?: File) => {
        if (modal === 'create') {
            await createNurse.mutateAsync({ nurse: data, photo });
        } else if (modal && typeof modal === 'object') {
            await updateNurse.mutateAsync({ id: modal.id, updates: data, photo });
        }
        setModal(null);
    };

    const handleDelete = async (id: string) => {
        await deleteNurse.mutateAsync(id);
        setConfirmDelete(null);
    };

    const saving = createNurse.isPending || updateNurse.isPending;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Users className="w-6 h-6 text-[#c9a96e]" /> Nurses
                    </h1>
                    <p className="text-[#8b9ab5] text-sm mt-1">{nurses.length} nurses registered</p>
                </div>
                <button id="add-nurse-btn" onClick={() => setModal('create')}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#c9a96e] to-[#b8965a] text-white rounded-xl font-medium text-sm hover:opacity-90 transition-all">
                    <Plus className="w-4 h-4" /> Add Nurse
                </button>
            </div>

            <div className="bg-[#111827]/60 border border-white/5 rounded-2xl overflow-hidden">
                {isLoading ? (
                    <div className="py-20 flex justify-center"><Loader2 className="w-6 h-6 text-[#c9a96e] animate-spin" /></div>
                ) : nurses.length === 0 ? (
                    <div className="py-20 text-center text-[#8b9ab5]">No nurses yet. Add one above.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/5 text-[#8b9ab5] text-xs uppercase tracking-wide">
                                    <th className="text-left px-5 py-3">Nurse</th>
                                    <th className="text-left px-5 py-3 hidden md:table-cell">Qualifications</th>
                                    <th className="text-center px-5 py-3 hidden sm:table-cell">Exp</th>
                                    <th className="text-center px-5 py-3 hidden lg:table-cell">Rating</th>
                                    <th className="text-center px-5 py-3">Status</th>
                                    <th className="text-right px-5 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {nurses.map(n => (
                                    <tr key={n.id} className="hover:bg-white/2 transition-colors">
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                {n.photo_url
                                                    ? <img src={n.photo_url} alt={n.name} className="w-9 h-9 rounded-full object-cover border border-white/10" />
                                                    : <div className="w-9 h-9 rounded-full bg-[#c9a96e]/10 border border-[#c9a96e]/20 flex items-center justify-center text-[#c9a96e] font-bold text-sm">{n.name[0]}</div>}
                                                <span className="text-white font-medium">{n.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-[#8b9ab5] hidden md:table-cell">{n.qualifications}</td>
                                        <td className="px-5 py-4 text-center text-[#8b9ab5] hidden sm:table-cell">{n.experience}y</td>
                                        <td className="px-5 py-4 hidden lg:table-cell">
                                            <div className="flex items-center justify-center gap-1">
                                                <Star className="w-3.5 h-3.5 fill-[#c9a96e] text-[#c9a96e]" />
                                                <span className="text-white text-sm">{n.rating}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-center">
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${n.available ? 'bg-green-500/15 text-green-400 border border-green-500/30' : 'bg-[#4a5568]/20 text-[#8b9ab5] border border-white/10'}`}>
                                                {n.available ? 'Available' : 'Unavailable'}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => setModal(n)}
                                                    className="p-1.5 text-[#8b9ab5] hover:text-[#c9a96e] hover:bg-[#c9a96e]/10 rounded-lg transition-all">
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => setConfirmDelete(n.id)}
                                                    className="p-1.5 text-[#8b9ab5] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal */}
            {modal !== null && (
                <NurseModal
                    initial={modal === 'create' ? BLANK : { ...modal }}
                    onClose={() => setModal(null)}
                    onSave={handleSave}
                    saving={saving}
                />
            )}

            {/* Delete confirm */}
            {confirmDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                    <div className="bg-[#111827] border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                        <h3 className="text-white font-semibold mb-2">Delete Nurse?</h3>
                        <p className="text-[#8b9ab5] text-sm mb-5">This action cannot be undone. Existing bookings will retain the reference.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setConfirmDelete(null)}
                                className="flex-1 h-10 border border-white/10 rounded-xl text-[#8b9ab5] hover:text-white text-sm transition-all">Cancel</button>
                            <button onClick={() => handleDelete(confirmDelete)} disabled={deleteNurse.isPending}
                                className="flex-1 h-10 bg-red-500/80 hover:bg-red-500 text-white rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2">
                                {deleteNurse.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
