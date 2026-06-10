// ── lib/supabase/Contactservice.js ───────────────────────────
//  Guarda el formulario de contacto en Supabase.
//  Garantiza un único envío por email (UNIQUE constraint en DB).
// ─────────────────────────────────────────────────────────────

import { supabase } from "./Client";

/**
 * Intenta insertar la solicitud de contacto.
 * Si el email ya existe, Supabase lanza error de constraint UNIQUE
 * que interpretamos como "ya enviado".
 *
 * @param {{ name: string, email: string, phone: string, message: string }} data
 * @returns {{ ok: boolean, alreadySent: boolean, error: string|null }}
 */
export async function saveContactSubmission({ name, email, phone, message }) {
  const { error } = await supabase
    .from("contact_submissions")
    .insert({ name, email, phone, message });

  if (!error) return { ok: true, alreadySent: false, error: null };

  if (error.code === "23505") {
    return { ok: false, alreadySent: true, error: null };
  }

  return { ok: false, alreadySent: false, error: error.message };
}