import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/** Public (anon) client — for public reads and booking inserts */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);



export const STORAGE_BUCKETS = {
  NURSE_PHOTOS: 'nurse-photos',
  SERVICE_IMAGES: 'service-images',
} as const;

/** Upload a file to Supabase Storage via the authenticated client */
export async function uploadFile(
  client: SupabaseClient<Database>,
  bucket: string,
  path: string,
  file: File
): Promise<string> {
  const { error } = await client.storage.from(bucket).upload(path, file, {
    upsert: true,
    contentType: file.type,
  });
  if (error) throw error;
  const { data } = client.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}
