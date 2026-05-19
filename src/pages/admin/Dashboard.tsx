import { LayoutDashboard, Users, Briefcase, CalendarCheck, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useAllNurses } from '@/hooks/useNurses';
import { useAllServices } from '@/hooks/useServices';
import { useBookings, useBookingStats } from '@/hooks/useBookings';

const statusColors = {
    pending: 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/30',
    confirmed: 'bg-blue-500/15 text-blue-400 border border-blue-500/30',
    completed: 'bg-green-500/15 text-green-400 border border-green-500/30',
    cancelled: 'bg-red-500/15 text-red-400 border border-red-500/30',
};

export default function Dashboard() {
    const { data: nurses = [] } = useAllNurses();
    const { data: services = [] } = useAllServices();
    const { data: bookings = [] } = useBookings();
    const { data: stats } = useBookingStats();

    const availableNurses = nurses.filter(n => n.available).length;
    const activeServices = services.filter(s => s.active).length;
    const recent = bookings.slice(0, 5);

    const statCards = [
        { label: 'Total Nurses', value: nurses.length, sub: `${availableNurses} available`, icon: Users, color: 'from-violet-500/20 to-violet-500/5', iconColor: 'text-violet-400' },
        { label: 'Services', value: services.length, sub: `${activeServices} active`, icon: Briefcase, color: 'from-sky-500/20 to-sky-500/5', iconColor: 'text-sky-400' },
        { label: 'Total Bookings', value: stats?.total ?? 0, sub: `${stats?.pending ?? 0} pending`, icon: CalendarCheck, color: 'from-[#c9a96e]/20 to-[#c9a96e]/5', iconColor: 'text-[#c9a96e]' },
        { label: 'Completed', value: stats?.completed ?? 0, sub: `${stats?.cancelled ?? 0} cancelled`, icon: CheckCircle, color: 'from-emerald-500/20 to-emerald-500/5', iconColor: 'text-emerald-400' },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                    <LayoutDashboard className="w-6 h-6 text-[#c9a96e]" />
                    Dashboard
                </h1>
                <p className="text-[#8b9ab5] text-sm mt-1">Overview of Adelaide Medical Services</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {statCards.map(({ label, value, sub, icon: Icon, color, iconColor }) => (
                    <div key={label} className={`rounded-2xl bg-gradient-to-br ${color} border border-white/5 p-5`}>
                        <div className="flex items-start justify-between mb-3">
                            <Icon className={`w-5 h-5 ${iconColor}`} />
                        </div>
                        <p className="text-3xl font-bold text-white">{value}</p>
                        <p className="text-sm font-medium text-white/80 mt-0.5">{label}</p>
                        <p className="text-xs text-[#8b9ab5] mt-1">{sub}</p>
                    </div>
                ))}
            </div>

            {/* Recent Bookings */}
            <div className="bg-[#111827]/60 border border-white/5 rounded-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                    <h2 className="text-white font-semibold flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#c9a96e]" />
                        Recent Bookings
                    </h2>
                    <span className="text-[#8b9ab5] text-sm">{bookings.length} total</span>
                </div>
                {recent.length === 0 ? (
                    <div className="px-6 py-12 text-center text-[#8b9ab5]">No bookings yet</div>
                ) : (
                    <div className="divide-y divide-white/5">
                        {recent.map((b: any) => (
                            <div key={b.id} className="px-6 py-4 flex items-center gap-4 hover:bg-white/2 transition-colors">
                                <div className="flex-1 min-w-0">
                                    <p className="text-white font-medium text-sm truncate">{b.patient_name}</p>
                                    <p className="text-[#8b9ab5] text-xs mt-0.5 truncate">
                                        {b.service?.title ?? '—'} &bull; {b.nurse?.name ?? '—'}
                                    </p>
                                </div>
                                <div className="text-right shrink-0">
                                    <p className="text-[#8b9ab5] text-xs">{b.appointment_date}</p>
                                    <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[b.status as keyof typeof statusColors]}`}>
                                        {b.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Quick status breakdown */}
            {stats && stats.total > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                        { label: 'Pending', value: stats.pending, icon: Clock, cls: 'text-yellow-400' },
                        { label: 'Confirmed', value: stats.confirmed, icon: CalendarCheck, cls: 'text-blue-400' },
                        { label: 'Completed', value: stats.completed, icon: CheckCircle, cls: 'text-green-400' },
                        { label: 'Cancelled', value: stats.cancelled, icon: XCircle, cls: 'text-red-400' },
                    ].map(({ label, value, icon: Icon, cls }) => (
                        <div key={label} className="bg-[#111827]/40 border border-white/5 rounded-xl px-4 py-3 flex items-center gap-3">
                            <Icon className={`w-4 h-4 shrink-0 ${cls}`} />
                            <div>
                                <p className="text-white font-bold text-lg leading-none">{value}</p>
                                <p className="text-[#8b9ab5] text-xs mt-0.5">{label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
