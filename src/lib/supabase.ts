import { createClient } from '@supabase/supabase-js'

const rawUrl = import.meta.env.VITE_SUPABASE_URL?.trim() ?? ''
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() ?? ''

const hasValidSupabaseConfig =
  rawUrl.length > 0 &&
  rawKey.length > 0 &&
  /^https?:\/\//i.test(rawUrl) &&
  !rawUrl.includes('your-project-id') &&
  !rawKey.includes('your-anon-key')

const url = hasValidSupabaseConfig ? rawUrl : 'https://example.supabase.co'
const key = hasValidSupabaseConfig ? rawKey : 'demo-anon-key-placeholder'

if (!hasValidSupabaseConfig) {
  console.warn(
    '[supabase] Missing or placeholder env values detected. Using a safe demo client so the app can still load. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local.',
  )
}

export const supabase = createClient(url, key, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
})
