import { createClient } from "@supabase/supabase-js";


// const options = {
//     db: {
//         schema: 'public',
//     },
//     auth: {
//         autoRefreshToken: true,
//         persistSession: true,
//         detectSessionInUrl: true
//     },
//     global: {
//         headers: { 'x-my-custom-header': 'my-app-name' },
//     },
// }

console.log('Created')

const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey, /*options*/);

export { supabase }
