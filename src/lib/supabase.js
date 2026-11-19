import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://wjgopieoquteospbtslw.supabase.co/rest/v1/';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_uBdyBOvQOn9bK4KTNOqrkA_1hXufoqo';

export const isSupabaseConfigured = () => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes('https://wjgopieoquteospbtslw.supabase.co') &&
    !supabaseAnonKey.includes('sb_publishable_uBdyBOvQOn9bK4KTNOqrkA_1hXufoqo')
  );
};

// Create Supabase client (only valid config or null-safe placeholder client)
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;
