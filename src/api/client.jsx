import { createClient } from "@supabase/supabase-js";

// const supabase = createClient(
//   import.meta.env.VITE_APP_SUPABASE_URL,
//   import.meta.env.VITE_APP_SUPABASE_ANON_KEY
// );

const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
