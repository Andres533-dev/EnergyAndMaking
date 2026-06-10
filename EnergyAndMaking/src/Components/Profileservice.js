// ── lib/supabase/profileService.js ───────────────────────────
//  Operaciones CRUD sobre la tabla `profiles`.
// ─────────────────────────────────────────────────────────────

import { supabase } from "./Client";

// ── Obtener perfil por ID ─────────────────────────────────────
/**
 * Devuelve el perfil completo de un usuario.
 * @param {string} userId  UUID del usuario (auth.uid)
 * @returns {{ profile, error }}
 */
export async function getProfile(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, name, email, role, created_at")
    .eq("id", userId)
    .single();

  return { profile: data ?? null, error };
}

// ── Actualizar nombre del usuario ─────────────────────────────
/**
 * @param {string} userId
 * @param {{ name: string }} updates   Campos a actualizar
 * @returns {{ profile, error }}
 */
export async function updateProfile(userId, updates) {
  // Campos permitidos para actualización por el propio usuario
  const allowed = { name: updates.name };

  const { data, error } = await supabase
    .from("profiles")
    .update(allowed)
    .eq("id", userId)
    .select("id, name, email, role")
    .single();

  return { profile: data ?? null, error };
}

// ── Actualizar rol del usuario (ADMIN ONLY) ───────────────────
/**
 * Actualiza el rol de un usuario. 
 * NOTA: En producción, esto debe estar protegido por RLS.
 * @param {string} userId
 * @param {string} newRole  "user" | "admin"
 * @returns {{ profile, error }}
 */
export async function updateUserRole(userId, newRole) {
  const { data, error } = await supabase
    .from("profiles")
    .update({ role: newRole })
    .eq("id", userId)
    .select("id, name, email, role")
    .single();

  return { profile: data ?? null, error };
}