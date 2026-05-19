import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadFile, STORAGE_BUCKETS } from '@/lib/supabase';
import { supabase } from '@/lib/supabase';
import type { NurseInsert, NurseUpdate } from '@/types/database';

export function useNurses(includeUnavailable = false) {

    return useQuery({
        queryKey: ['nurses', includeUnavailable],
        queryFn: async () => {
            let query = supabase.from('nurses').select('*').order('created_at', { ascending: false });
            if (!includeUnavailable) query = query.eq('available', true);
            const { data, error } = await query;
            if (error) throw error;
            return data;
        },
    });
}

export function useAllNurses() {

    return useQuery({
        queryKey: ['nurses', 'all'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('nurses')
                .select('*')
                .order('created_at', { ascending: false });
            if (error) throw error;
            return data;
        },
    });
}

export function useCreateNurse() {

    const qc = useQueryClient();
    return useMutation({
        mutationFn: async ({ nurse, photo }: { nurse: NurseInsert; photo?: File }) => {
            let photoUrl: string | undefined;
            if (photo) {
                const path = `${Date.now()}-${photo.name.replace(/\s/g, '_')}`;
                photoUrl = await uploadFile(supabase, STORAGE_BUCKETS.NURSE_PHOTOS, path, photo);
            }
            const { data, error } = await supabase
                .from('nurses')
                .insert({ ...nurse, photo_url: photoUrl ?? null })
                .select()
                .single();
            if (error) throw error;
            return data;
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: ['nurses'] }),
    });
}

export function useUpdateNurse() {

    const qc = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, updates, photo }: { id: string; updates: NurseUpdate; photo?: File }) => {
            let photoUrl = updates.photo_url;
            if (photo) {
                const path = `${id}-${Date.now()}-${photo.name.replace(/\s/g, '_')}`;
                photoUrl = await uploadFile(supabase, STORAGE_BUCKETS.NURSE_PHOTOS, path, photo);
            }
            const { data, error } = await supabase
                .from('nurses')
                .update({ ...updates, photo_url: photoUrl ?? null })
                .eq('id', id)
                .select()
                .single();
            if (error) throw error;
            return data;
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: ['nurses'] }),
    });
}

export function useDeleteNurse() {

    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase.from('nurses').delete().eq('id', id);
            if (error) throw error;
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: ['nurses'] }),
    });
}
