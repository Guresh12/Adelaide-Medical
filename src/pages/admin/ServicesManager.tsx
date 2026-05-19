import { useState, useRef } from 'react';
import { Briefcase, Plus, Pencil, Trash2, Loader2, Upload, X, ToggleLeft, ToggleRight } from 'lucide-react';
import { useAllServices, useCreateService, useUpdateService, useDeleteService } from '@/hooks/useServices';
import type { Service, ServiceInsert } from '@/types/database';

const ICONS = ['Stethoscope', 'Activity', 'HeartPulse', 'Heart', 'Pill', 'Home', 'Bandage'];

const BLANK: ServiceInsert = {
    title: '', description: '', features: [], icon_name: 'Stethoscope',
    image_url: null, active: true, sort_order: 0,
};

function ServiceModal({
    initial, onClose, onSave, saving,
}: {
    initial: ServiceInsert & { id?: string };
    onClose: () => void;
    onSave: (data: ServiceInsert, image?: File) => void;
    saving: boolean;
}) {
    const [form, setForm] = useState(initial);
    const [featureInput, setFeatureInput] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>((initial as any).image_url ?? null);
    const fileRef = useRef<HTMLInputElement>(null);

    const addFeature = () => {
        const v = featureInput.trim();
        if (v && !form.features.includes(v)) setForm(f => ({ ...f, features: [...f.features, v] }));
        setFeatureInput('');
    };

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const inputCls = 'w-full h-10 px-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-[#4a5568] focus:outline-none focus:border-[#c9a96e]/60 focus:ring-1 focus:ring-[#c9a96e]/40 transition-all';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-[#111827] border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                    <h2 className="text-white font-semibold">{initial.id ? 'Edit Service' : 'Add Service'}</h2>
                    <button onClick={onClose} className="text-[#8b9ab5] hover:text-white"><X className="w-5 h-5" /></button>
                </div>
                <form onSubmit={e => { e.preventDefault(); onSave(form, image ?? undefined); }} className="px-6 py-5 space-y-4">
                    {/* Image upload */}
                    <div>
                        <label className="block text-xs text-[#8b9ab5] mb-1">Service Image</label>
                        <div className="flex items-center gap-3">
                            {preview
                                ? <img src={preview} alt="preview" className="w-16 h-12 rounded-lg object-cover border border-white/10" />
                                : <div className="w-16 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#4a5568]"><Briefcase className="w-5 h-5" /></div>}
                            <button type="button" onClick={() => fileRef.current?.click()}
                                className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[#8b9ab5] hover:text-white text-xs transition-all">
                                <Upload className="w-3.5 h-3.5" /> Upload Image
                            </button>
                            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs text-[#8b9ab5] mb-1">Title *</label>
                        <input required className={inputCls} value={form.title}
                            onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Nursing & Clinical Care" />
                    </div>

                    <div>
                        <label className="block text-xs text-[#8b9ab5] mb-1">Description *</label>
                        <textarea required rows={3} className={`${inputCls} h-auto py-2`} value={form.description}
                            onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Short service description..." />
                    </div>

                    <div>
                        <label className="block text-xs text-[#8b9ab5] mb-1">Icon</label>
                        <select className={inputCls} value={form.icon_name}
                            onChange={e => setForm(f => ({ ...f, icon_name: e.target.value }))}>
                            {ICONS.map(i => <option key={i} value={i}>{i}</option>)}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs text-[#8b9ab5] mb-1">Sort Order</label>
                            <input type="number" min={0} className={inputCls} value={form.sort_order}
                                onChange={e => setForm(f => ({ ...f, sort_order: +e.target.value }))} />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs text-[#8b9ab5] mb-1">Features</label>
                        <div className="flex gap-2">
                            <input className={`${inputCls} flex-1`} value={featureInput}
                                onChange={e => setFeatureInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                                placeholder="Add feature and press Enter" />
                            <button type="button" onClick={addFeature}
                                className="px-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[#8b9ab5] hover:text-white transition-all">+</button>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                            {form.features.map(f => (
                                <span key={f} className="flex items-center gap-1 px-2 py-0.5 bg-sky-500/10 text-sky-400 text-xs rounded-full border border-sky-500/20">
                                    {f}
                                    <button type="button" onClick={() => setForm(frm => ({ ...frm, features: frm.features.filter(x => x !== f) }))}>
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <label className="flex items-center gap-3 cursor-pointer">
                        <button type="button" onClick={() => setForm(f => ({ ...f, active: !f.active }))}>
                            {form.active
                                ? <ToggleRight className="w-8 h-8 text-[#c9a96e]" />
                                : <ToggleLeft className="w-8 h-8 text-[#4a5568]" />}
                        </button>
                        <span className={`text-sm font-medium ${form.active ? 'text-[#c9a96e]' : 'text-[#8b9ab5]'}`}>
                            {form.active ? 'Active' : 'Inactive'}
                        </span>
                    </label>

                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={onClose}
                            className="flex-1 h-10 border border-white/10 rounded-xl text-[#8b9ab5] hover:text-white hover:border-white/20 text-sm transition-all">Cancel</button>
                        <button type="submit" disabled={saving}
                            className="flex-1 h-10 bg-gradient-to-r from-[#c9a96e] to-[#b8965a] text-white rounded-xl font-medium text-sm hover:opacity-90 flex items-center justify-center gap-2 disabled:opacity-60 transition-all">
                            {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</> : 'Save Service'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function ServicesManager() {
    const { data: services = [], isLoading } = useAllServices();
    const createSvc = useCreateService();
    const updateSvc = useUpdateService();
    const deleteSvc = useDeleteService();

    const [modal, setModal] = useState<null | 'create' | Service>(null);
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

    const handleSave = async (data: ServiceInsert, image?: File) => {
        if (modal === 'create') await createSvc.mutateAsync({ service: data, image });
        else if (modal && typeof modal === 'object') await updateSvc.mutateAsync({ id: modal.id, updates: data, image });
        setModal(null);
    };

    const saving = createSvc.isPending || updateSvc.isPending;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Briefcase className="w-6 h-6 text-[#c9a96e]" /> Services
                    </h1>
                    <p className="text-[#8b9ab5] text-sm mt-1">{services.length} services configured</p>
                </div>
                <button id="add-service-btn" onClick={() => setModal('create')}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#c9a96e] to-[#b8965a] text-white rounded-xl font-medium text-sm hover:opacity-90 transition-all">
                    <Plus className="w-4 h-4" /> Add Service
                </button>
            </div>

            <div className="bg-[#111827]/60 border border-white/5 rounded-2xl overflow-hidden">
                {isLoading ? (
                    <div className="py-20 flex justify-center"><Loader2 className="w-6 h-6 text-[#c9a96e] animate-spin" /></div>
                ) : services.length === 0 ? (
                    <div className="py-20 text-center text-[#8b9ab5]">No services yet.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/5 text-[#8b9ab5] text-xs uppercase tracking-wide">
                                    <th className="text-left px-5 py-3">Service</th>
                                    <th className="text-left px-5 py-3 hidden md:table-cell">Description</th>
                                    <th className="text-center px-5 py-3 hidden sm:table-cell">Features</th>
                                    <th className="text-center px-5 py-3">Status</th>
                                    <th className="text-right px-5 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {services.map(s => (
                                    <tr key={s.id} className="hover:bg-white/2 transition-colors">
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                {s.image_url
                                                    ? <img src={s.image_url} alt={s.title} className="w-10 h-8 rounded-md object-cover border border-white/10" />
                                                    : <div className="w-10 h-8 rounded-md bg-sky-500/10 border border-sky-500/20 flex items-center justify-center"><Briefcase className="w-4 h-4 text-sky-400" /></div>}
                                                <span className="text-white font-medium">{s.title}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-[#8b9ab5] hidden md:table-cell max-w-[240px] truncate">{s.description}</td>
                                        <td className="px-5 py-4 text-center text-[#8b9ab5] hidden sm:table-cell">{s.features.length}</td>
                                        <td className="px-5 py-4 text-center">
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${s.active ? 'bg-green-500/15 text-green-400 border border-green-500/30' : 'bg-[#4a5568]/20 text-[#8b9ab5] border border-white/10'}`}>
                                                {s.active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => setModal(s)}
                                                    className="p-1.5 text-[#8b9ab5] hover:text-[#c9a96e] hover:bg-[#c9a96e]/10 rounded-lg transition-all">
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => setConfirmDelete(s.id)}
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

            {modal !== null && (
                <ServiceModal
                    initial={modal === 'create' ? BLANK : { ...modal }}
                    onClose={() => setModal(null)}
                    onSave={handleSave}
                    saving={saving}
                />
            )}

            {confirmDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                    <div className="bg-[#111827] border border-white/10 rounded-2xl p-6 max-w-sm w-full">
                        <h3 className="text-white font-semibold mb-2">Delete Service?</h3>
                        <p className="text-[#8b9ab5] text-sm mb-5">Existing bookings referencing this service will still be retained.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setConfirmDelete(null)}
                                className="flex-1 h-10 border border-white/10 rounded-xl text-[#8b9ab5] hover:text-white text-sm">Cancel</button>
                            <button onClick={async () => { await deleteSvc.mutateAsync(confirmDelete!); setConfirmDelete(null); }}
                                disabled={deleteSvc.isPending}
                                className="flex-1 h-10 bg-red-500/80 hover:bg-red-500 text-white rounded-xl font-medium text-sm flex items-center justify-center gap-2">
                                {deleteSvc.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
