import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export function useSettings() {

    return useQuery({
        queryKey: ['settings'],
        queryFn: async () => {
            const { data, error } = await supabase.from('site_settings').select('*');
            if (error) throw error;
            return Object.fromEntries(data.map(s => [s.key, s.value])) as Record<string, string>;
        },
    });
}

export function useUpdateSetting() {

    const qc = useQueryClient();
    return useMutation({
        mutationFn: async ({ key, value }: { key: string; value: string }) => {
            const { error } = await supabase
                .from('site_settings')
                .upsert({ key, value }, { onConflict: 'key' });
            if (error) throw error;
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: ['settings'] }),
    });
}

export function useUpdateSettings() {

    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (settings: Record<string, string>) => {
            const rows = Object.entries(settings).map(([key, value]) => ({ key, value }));
            const { error } = await supabase
                .from('site_settings')
                .upsert(rows, { onConflict: 'key' });
            if (error) throw error;
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: ['settings'] }),
    });
}
