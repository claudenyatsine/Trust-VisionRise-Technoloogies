import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const isUrlValid = supabaseUrl && supabaseUrl.startsWith('http');

if (!isUrlValid || !supabaseAnonKey || supabaseUrl.includes('your-supabase-project-url')) {
  console.warn(
    '⚠️ Supabase configuration is missing or invalid. \n' +
    'Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file. \n' +
    'The application may not function correctly without these variables.'
  );
}

// We still export the client, but we ensure it doesn't crash on initialization
// If the URL is invalid, createClient will throw, so we use a dummy URL to prevent startup crash if invalid
export const supabase = createClient(
  isUrlValid ? supabaseUrl : 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder'
);
