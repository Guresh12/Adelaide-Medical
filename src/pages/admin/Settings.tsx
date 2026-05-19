import { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Save, Loader2, CheckCircle } from 'lucide-react';
import { useSettings, useUpdateSettings } from '@/hooks/useSettings';

const SETTING_FIELDS = [
    { key: 'company_name', label: 'Company Name', type: 'text' },
    { key: 'company_phone', label: 'Phone Number', type: 'text' },
    { key: 'company_email', label: 'Email Address', type: 'email' },
    { key: 'company_address', label: 'Address', type: 'text' },
    { key: 'hero_title', label: 'Hero Title', type: 'text' },
    { key: 'hero_subtitle', label: 'Hero Subtitle', type: 'text' },
];

export default function SettingsPage() {
    const { data: settings, isLoading } = useSettings();
    const updateSettings = useUpdateSettings();
    const [form, setForm] = useState<Record<string, string>>({});
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (settings) setForm(settings);
    }, [settings]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateSettings.mutateAsync(form);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    const inputCls = 'w-full h-10 px-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-[#4a5568] focus:outline-none focus:border-[#c9a96e]/60 focus:ring-1 focus:ring-[#c9a96e]/40 transition-all';

    return (
        <div className="space-y-6 max-w-2xl">
            <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                    <SettingsIcon className="w-6 h-6 text-[#c9a96e]" /> Settings
                </h1>
                <p className="text-[#8b9ab5] text-sm mt-1">Configure site-wide information</p>
            </div>

            <div className="bg-[#111827]/60 border border-white/5 rounded-2xl p-6">
                {isLoading ? (
                    <div className="py-16 flex justify-center"><Loader2 className="w-6 h-6 text-[#c9a96e] animate-spin" /></div>
                ) : (
                    <form onSubmit={handleSave} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {SETTING_FIELDS.map(({ key, label, type }) => (
                                <div key={key} className={key === 'company_address' || key === 'hero_subtitle' ? 'sm:col-span-2' : ''}>
                                    <label className="block text-xs text-[#8b9ab5] mb-1.5">{label}</label>
                                    <input
                                        id={`setting-${key}`}
                                        type={type}
                                        className={inputCls}
                                        value={form[key] ?? ''}
                                        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                                        placeholder={`Enter ${label.toLowerCase()}`}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="pt-2 flex items-center gap-3">
                            <button
                                id="save-settings-btn"
                                type="submit"
                                disabled={updateSettings.isPending}
                                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#c9a96e] to-[#b8965a] text-white rounded-xl font-medium text-sm hover:opacity-90 transition-all disabled:opacity-60"
                            >
                                {updateSettings.isPending
                                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</>
                                    : <><Save className="w-4 h-4" /> Save Changes</>}
                            </button>
                            {saved && (
                                <div className="flex items-center gap-1.5 text-green-400 text-sm animate-in fade-in">
                                    <CheckCircle className="w-4 h-4" /> Saved successfully
                                </div>
                            )}
                        </div>
                    </form>
                )}
            </div>

            <div className="bg-[#111827]/40 border border-white/5 rounded-2xl p-5">
                <h3 className="text-white font-medium mb-3 text-sm">Admin Account</h3>
                <p className="text-[#8b9ab5] text-xs leading-relaxed">
                    To change the admin email or password, go to your <span className="text-[#c9a96e]">Supabase Dashboard → Authentication → Users</span> and update the credentials there.
                </p>
            </div>
        </div>
    );
}
