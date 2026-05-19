import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { BookingInsert } from '@/types/database';

export function useBookings() {

    return useQuery({
        queryKey: ['bookings'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('bookings')
                .select(`
          *,
          nurse:nurses(id, name, qualifications),
          service:services(id, title)
        `)
                .order('created_at', { ascending: false });
            if (error) throw error;
            return data;
        },
    });
}

export function useCreateBooking() {

    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (booking: BookingInsert) => {
            const { data, error } = await supabase
                .from('bookings')
                .insert(booking)
                .select()
                .single();
            if (error) throw error;
            return data;
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: ['bookings'] }),
    });
}

export function useUpdateBookingStatus() {

    const qc = useQueryClient();
    return useMutation({
        mutationFn: async ({
            id,
            status,
        }: {
            id: string;
            status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
        }) => {
            const { data, error } = await supabase
                .from('bookings')
                .update({ status })
                .eq('id', id)
                .select()
                .single();
            if (error) throw error;
            return data;
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: ['bookings'] }),
    });
}

export function useBookingStats() {

    return useQuery({
        queryKey: ['bookings', 'stats'],
        queryFn: async () => {
            const { data, error } = await supabase.from('bookings').select('status');
            if (error) throw error;
            const total = data.length;
            const pending = data.filter(b => b.status === 'pending').length;
            const confirmed = data.filter(b => b.status === 'confirmed').length;
            const completed = data.filter(b => b.status === 'completed').length;
            const cancelled = data.filter(b => b.status === 'cancelled').length;
            return { total, pending, confirmed, completed, cancelled };
        },
    });
}
