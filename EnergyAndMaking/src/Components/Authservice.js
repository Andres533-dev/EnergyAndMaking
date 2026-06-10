// ── lib/supabase/authService.js ───────────────────────────────
//  Todas las operaciones de autenticación con Supabase Auth.
//  Exporta funciones puras; no guarda estado interno.
// ─────────────────────────────────────────────────────────────

import { supabase } from "./Client";

// ── Registrar nuevo usuario ───────────────────────────────────
/**
 * Crea una cuenta en Supabase Auth y, vía el trigger
 * `handle_new_user`, inserta un registro en `profiles`.
 *
 * @param {string} name      Nombre completo del usuario
 * @param {string} email
 * @param {string} password  Mínimo 6 caracteres
 * @returns {{ user, error }}
 */
export async function register(name, email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // Estos metadatos los recibe el trigger handle_new_user
      data: { name, role: "user" },
    },
  });

  return { user: data?.user ?? null, error };
}

// ── Iniciar sesión ────────────────────────────────────────────
/**
 * @returns {{ user, session, error }}
 */
export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return {
    user:    data?.user    ?? null,
    session: data?.session ?? null,
    error,
  };
}

// ── Cerrar sesión ─────────────────────────────────────────────
export async function logout() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

// ── Obtener sesión activa ─────────────────────────────────────
/**
 * Devuelve la sesión persistida en localStorage (si existe).
 * @returns {{ session, error }}
 */
export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  return { session: data?.session ?? null, error };
}

// ── Obtener usuario actual ────────────────────────────────────
/**
 * @returns {{ user, error }}
 */
export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  return { user: data?.user ?? null, error };
}

// ── Suscribirse a cambios de sesión ──────────────────────────
/**
 * Llama al callback cada vez que la sesión cambia
 * (login, logout, refresh de token, etc.)
 *
 * @param {(event: string, session: object|null) => void} callback
 * @returns {() => void}  Función para cancelar la suscripción
 */
export function onAuthStateChange(callback) {
  const { data: subscription } = supabase.auth.onAuthStateChange(callback);
  // Devuelve el unsubscribe para limpieza en useEffect
  return () => subscription.subscription.unsubscribe();
}