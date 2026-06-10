// ── lib/supabase/client.js ────────────────────────────────────
//  Cliente singleton de Supabase.
//  Importar SIEMPRE desde aquí; nunca instanciar createClient
//  directamente en los módulos de servicio.
//
//  Variables de entorno requeridas en .env:
//    VITE_SUPABASE_URL=https://<tu-proyecto>.supabase.co
//    VITE_SUPABASE_ANON_KEY=<anon-public-key>
// ─────────────────────────────────────────────────────────────

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL      = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    "[supabase/client] Faltan variables de entorno.\n" +
    "Asegúrate de definir VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en tu archivo .env"
  );
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    // Persiste la sesión en localStorage automáticamente
    persistSession: true,
    autoRefreshToken: true,
  },
});