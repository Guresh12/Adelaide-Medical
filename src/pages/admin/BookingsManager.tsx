import { useState } from 'react';
import { CalendarCheck, Loader2, Search, Eye, X, ChevronDown } from 'lucide-react';
import { useBookings, useUpdateBookingStatus } from '@/hooks/useBookings';

const STATUS_OPTIONS = ['pending', 'confirmed', 'completed', 'cancelled'] as const;
type Status = typeof STATUS_OPTIONS[number];

const statusColors: Record<Status, string> = {
    pending: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
    confirmed: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    completed: 'bg-green-500/15 text-green-400 border-green-500/30',
    cancelled: 'bg-red-500/15 text-red-400 border-red-500/30',
};

const TIME_LABELS = { morning: 'Morning (8am–12pm)', afternoon: 'Afternoon (12–5pm)', evening: 'Evening (5–9pm)' };

function BookingDetailModal({ booking, onClose }: { booking: any; onClose: () => void }) {
    const updateStatus = useUpdateBookingStatus();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-[#111827] border border-white/10 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                    <div>
                        <h2 className="text-white font-semibold">Booking Detail</h2>
                        <p className="text-[#c9a96e] text-xs font-mono mt-0.5">{booking.booking_ref}</p>
                    </div>
                    <button onClick={onClose} className="text-[#8b9ab5] hover:text-white"><X className="w-5 h-5" /></button>
                </div>
                <div className="px-6 py-5 space-y-4">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        {[
                            ['Patient', booking.patient_name],
                            ['Email', booking.patient_email],
                            ['Phone', booking.patient_phone],
                            ['Address', booking.patient_address],
                            ['Service', booking.service?.title ?? '—'],
                            ['Nurse', booking.nurse?.name ?? '—'],
                            ['Date', booking.appointment_date],
                            ['Time', TIME_LABELS[booking.time_slot as keyof typeof TIME_LABELS] ?? booking.time_slot],
                        ].map(([label, value]) => (
                            <div key={label}>
                                <p className="text-[#8b9ab5] text-xs mb-0.5">{label}</p>
                                <p className="text-white break-words">{value}</p>
                            </div>
                        ))}
                    </div>
                    {booking.notes && (
                        <div>
                            <p className="text-[#8b9ab5] text-xs mb-0.5">Notes</p>
                            <p className="text-white text-sm">{booking.notes}</p>
                        </div>
                    )}

                    <div>
                        <p className="text-[#8b9ab5] text-xs mb-2">Update Status</p>
                        <div className="grid grid-cols-2 gap-2">
                            {STATUS_OPTIONS.map(s => (
                                <button key={s} disabled={booking.status === s || updateStatus.isPending}
                                    onClick={() => updateStatus.mutate({ id: booking.id, status: s })}
                                    className={`h-9 rounded-lg border text-xs font-medium capitalize transition-all ${booking.status === s
                                            ? `${statusColors[s]} border opacity-100 cursor-default`
                                            : 'border-white/10 text-[#8b9ab5] hover:border-white/20 hover:text-white'
                                        }`}>
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function BookingsManager() {
    const { data: bookings = [], isLoading } = useBookings();
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<Status | 'all'>('all');
    const [selected, setSelected] = useState<any | null>(null);

    const filtered = bookings.filter((b: any) => {
        const matchStatus = statusFilter === 'all' || b.status === statusFilter;
        const q = search.toLowerCase();
        const matchSearch = !q || b.patient_name.toLowerCase().includes(q) || b.booking_ref.toLowerCase().includes(q) || b.patient_email.toLowerCase().includes(q);
        return matchStatus && matchSearch;
    });

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                    <CalendarCheck className="w-6 h-6 text-[#c9a96e]" /> Bookings
                </h1>
                <p className="text-[#8b9ab5] text-sm mt-1">{bookings.length} total bookings</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a5568]" />
                    <input
                        className="w-full h-10 pl-9 pr-4 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-[#4a5568] focus:outline-none focus:border-[#c9a96e]/50 transition-all"
                        placeholder="Search by name, email, ref…"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <div className="relative">
                    <select
                        className="h-10 pl-3 pr-8 bg-white/5 border border-white/10 rounded-xl text-white text-sm appearance-none focus:outline-none focus:border-[#c9a96e]/50 transition-all cursor-pointer"
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value as any)}
                    >
                        <option value="all">All Statuses</option>
                        {STATUS_OPTIONS.map(s => <option key={s} value={s} className="bg-[#111827] capitalize">{s}</option>)}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a5568] pointer-events-none" />
                </div>
            </div>

            <div className="bg-[#111827]/60 border border-white/5 rounded-2xl overflow-hidden">
                {isLoading ? (
                    <div className="py-20 flex justify-center"><Loader2 className="w-6 h-6 text-[#c9a96e] animate-spin" /></div>
                ) : filtered.length === 0 ? (
                    <div className="py-20 text-center text-[#8b9ab5]">No bookings found.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/5 text-[#8b9ab5] text-xs uppercase tracking-wide">
                                    <th className="text-left px-5 py-3">Ref</th>
                                    <th className="text-left px-5 py-3">Patient</th>
                                    <th className="text-left px-5 py-3 hidden md:table-cell">Service</th>
                                    <th className="text-left px-5 py-3 hidden lg:table-cell">Nurse</th>
                                    <th className="text-left px-5 py-3 hidden sm:table-cell">Date</th>
                                    <th className="text-center px-5 py-3">Status</th>
                                    <th className="text-right px-5 py-3">View</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filtered.map((b: any) => (
                                    <tr key={b.id} className="hover:bg-white/2 transition-colors">
                                        <td className="px-5 py-4 font-mono text-[#c9a96e] text-xs">{b.booking_ref}</td>
                                        <td className="px-5 py-4">
                                            <div>
                                                <p className="text-white font-medium">{b.patient_name}</p>
                                                <p className="text-[#8b9ab5] text-xs">{b.patient_email}</p>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-[#8b9ab5] hidden md:table-cell">{b.service?.title ?? '—'}</td>
                                        <td className="px-5 py-4 text-[#8b9ab5] hidden lg:table-cell">{b.nurse?.name ?? '—'}</td>
                                        <td className="px-5 py-4 text-[#8b9ab5] hidden sm:table-cell">{b.appointment_date}</td>
                                        <td className="px-5 py-4 text-center">
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium border capitalize ${statusColors[b.status as Status]}`}>
                                                {b.status}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-right">
                                            <button onClick={() => setSelected(b)}
                                                className="p-1.5 text-[#8b9ab5] hover:text-[#c9a96e] hover:bg-[#c9a96e]/10 rounded-lg transition-all">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {selected && <BookingDetailModal booking={selected} onClose={() => setSelected(null)} />}
        </div>
    );
}
