// ── hooks/useAuth.js ──────────────────────────────────────────
//  Hook de React que gestiona el estado de autenticación.
//  Escucha cambios de sesión en tiempo real y expone el perfil
//  completo del usuario (incluyendo su role).
//
//  Uso:
//    const { user, profile, loading, login, register, logout } = useAuth();
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback, useRef } from "react";
import {
  login        as sbLogin,
  register     as sbRegister,
  logout       as sbLogout,
  getSession,
  onAuthStateChange,
} from "./Authservice.js";
import { getProfile } from "./Profileservice.js";

export function useAuth() {
  const [user,    setUser]    = useState(null);   // objeto auth.users de Supabase
  const [profile, setProfile] = useState(null);   // fila de public.profiles
  const [loading, setLoading] = useState(true);   // true mientras se verifica la sesión inicial
  const initRef = useRef(false);

  // Cargar perfil completo cuando tengamos el user
  const loadProfile = useCallback(async (authUser) => {
    if (!authUser) {
      setProfile(null);
      return;
    }
    const { profile: p } = await getProfile(authUser.id);
    setProfile(p);
  }, []);

  // Sesión inicial al montar
  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;
    
    (async () => {
      const { session } = await getSession();
      const authUser = session?.user ?? null;
      setUser(authUser);
      await loadProfile(authUser);
      setLoading(false);
    })();
  }, [loadProfile]);

  // Escuchar cambios de sesión (login / logout / token refresh)
  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (_event, session) => {
      const authUser = session?.user ?? null;
      setUser(authUser);
      await loadProfile(authUser);
    });
    return unsubscribe;
  }, [loadProfile]);

  // ── Acciones expuestas ─────────────────────────────────────

  const login = useCallback(async (email, password) => {
    const { user: u, error } = await sbLogin(email, password);
    if (error) return { error };
    setUser(u);
    await loadProfile(u);
    return { error: null };
  }, [loadProfile]);

  const register = useCallback(async (name, email, password) => {
    const { user: u, error } = await sbRegister(name, email, password);
    if (error) return { error };
    // Supabase puede requerir confirmación de email;
    // si el usuario ya está confirmado, cargamos el perfil.
    if (u?.confirmed_at) {
      setUser(u);
      await loadProfile(u);
    }
    return { error: null };
  }, [loadProfile]);

  const logout = useCallback(async () => {
    await sbLogout();
    setUser(null);
    setProfile(null);
  }, []);

  return {
    user,                          // auth.User | null
    profile,                       // { id, name, email, role } | null
    isAdmin: profile?.role === "admin",
    isAuthenticated: !!user,
    loading,
    login,
    register,
    logout,
  };
}