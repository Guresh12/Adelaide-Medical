import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadFile, STORAGE_BUCKETS } from '@/lib/supabase';
import { supabase } from '@/lib/supabase';
import type { Service, ServiceInsert, ServiceUpdate } from '@/types/database';

export function useServices(activeOnly = false) {

    return useQuery<Service[]>({
        queryKey: ['services', activeOnly],
        queryFn: async () => {
            let query = supabase.from('services').select('*').order('sort_order', { ascending: true });
            if (activeOnly) query = query.eq('active', true);
            const { data, error } = await query;
            if (error) throw error;
            return data as Service[];
        },
    });
}

export function useAllServices() {

    return useQuery<Service[]>({
        queryKey: ['services', 'all'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('services')
                .select('*')
                .order('sort_order', { ascending: true });
            if (error) throw error;
            return data as Service[];
        },
    });
}

export function useCreateService() {

    const qc = useQueryClient();
    return useMutation({
        mutationFn: async ({ service, image }: { service: ServiceInsert; image?: File }) => {
            let imageUrl: string | undefined;
            if (image) {
                const path = `${Date.now()}-${image.name.replace(/\s/g, '_')}`;
                imageUrl = await uploadFile(supabase, STORAGE_BUCKETS.SERVICE_IMAGES, path, image);
            }
            const { data, error } = await supabase
                .from('services')
                .insert({ ...service, image_url: imageUrl ?? null })
                .select()
                .single();
            if (error) throw error;
            return data;
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: ['services'] }),
    });
}

export function useUpdateService() {

    const qc = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, updates, image }: { id: string; updates: ServiceUpdate; image?: File }) => {
            let imageUrl = updates.image_url;
            if (image) {
                const path = `${id}-${Date.now()}-${image.name.replace(/\s/g, '_')}`;
                imageUrl = await uploadFile(supabase, STORAGE_BUCKETS.SERVICE_IMAGES, path, image);
            }
            const { data, error } = await supabase
                .from('services')
                .update({ ...updates, image_url: imageUrl ?? null })
                .eq('id', id)
                .select()
                .single();
            if (error) throw error;
            return data;
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: ['services'] }),
    });
}

export function useDeleteService() {

    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase.from('services').delete().eq('id', id);
            if (error) throw error;
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: ['services'] }),
    });
}
