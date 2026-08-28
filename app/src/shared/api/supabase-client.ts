import { createClient } from '@supabase/supabase-js'

import type { Database } from '@/shared/api/database'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Copy app/.env.example to app/.env.local.',
  )
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
