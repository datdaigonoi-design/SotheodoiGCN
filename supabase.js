// js/supabase.js

const SUPABASE_URL = "https://xxxxx.supabase.co"
const SUPABASE_KEY = "anon-public-key"

window.supabaseClient = supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
)
