// ── hooks/useOrders.js ────────────────────────────────────────
//  Hook que gestiona órdenes: crear desde el carrito y
//  consultar historial del usuario.
//
//  Uso:
//    const { orders, loading, placeOrder, fetchOrders } = useOrders(userId);
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback } from "react";
import {
  createOrder   as sbCreateOrder,
  getUserOrders as sbGetUserOrders,
} from "./Orderservice.js";

/**
 * @param {string|null} userId  UUID del usuario autenticado
 */
export function useOrders(userId) {
  const [orders,  setOrders]  = useState([]);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  // ── Cargar historial ───────────────────────────────────────
  const fetchOrders = useCallback(async () => {
    if (!userId) { setOrders([]); return; }
    setLoading(true);
    setError(null);
    const { orders: data, error: err } = await sbGetUserOrders(userId);
    if (err) setError(err.message);
    else setOrders(data);
    setLoading(false);
  }, [userId]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  // ── Crear orden desde el carrito ───────────────────────────
  /**
   * @param {Array<{ id, title, image_url, price, qty }>} cartItems
   * @returns {{ order, error }}
   */
  const placeOrder = useCallback(async (cartItems) => {
    if (!userId) return { order: null, error: { message: "Debes iniciar sesión para comprar." } };
    if (!cartItems?.length) return { order: null, error: { message: "El carrito está vacío." } };

    setLoading(true);
    const { order, error: err } = await sbCreateOrder(userId, cartItems);
    setLoading(false);

    if (err) { setError(err.message); return { order: null, error: err }; }

    // Agregar la nueva orden al estado local sin re-fetch
    setOrders((prev) => [order, ...prev]);
    return { order, error: null };
  }, [userId]);

  return {
    orders,
    loading,
    error,
    fetchOrders,
    placeOrder,
  };
}