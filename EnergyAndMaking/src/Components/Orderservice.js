// ── lib/supabase/orderService.js ─────────────────────────────
//  Operaciones sobre `orders` y `order_items`.
//  Guarda el historial completo de productos comprados
//  por cada usuario.
// ─────────────────────────────────────────────────────────────

import { supabase } from "./Client";

// ── Crear una orden completa (orden + ítems en una tx) ────────
/**
 * Inserta la orden y todos sus ítems de forma atómica usando
 * una función RPC de Supabase (ver schema.sql: fn_create_order).
 * Si Supabase no tiene la función RPC, se hace en dos pasos.
 *
 * @param {string} userId
 * @param {Array<{
 *   id: string,
 *   title: string,
 *   image_url?: string,
 *   price: number,
 *   qty: number
 * }>} cartItems   Ítems del carrito al momento de pagar
 * @returns {{ order, error }}
 */
export async function createOrder(userId, cartItems) {
  // Calcular totales
  const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping  = subtotal > 200000 ? 0 : 15000;
  const total     = subtotal + shipping;

  // 1️⃣ Insertar cabecera de la orden
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id:  userId,
      status:   "pending",
      subtotal,
      shipping,
      total,
    })
    .select()
    .single();

  if (orderError) return { order: null, error: orderError };

  // 2️⃣ Insertar ítems de la orden (snapshot de precios)
  const items = cartItems.map((item) => ({
    order_id:   order.id,
    product_id: item.id,
    title:      item.title,
    image_url:  item.image_url ?? null,
    unit_price: item.price,
    quantity:   item.qty,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(items);

  if (itemsError) {
    // Intentar revertir la cabecera si fallan los ítems
    await supabase.from("orders").delete().eq("id", order.id);
    return { order: null, error: itemsError };
  }

  return { order, error: null };
}

// ── Historial de órdenes de un usuario ───────────────────────
/**
 * Devuelve todas las órdenes del usuario con sus ítems anidados.
 * @param {string} userId
 * @returns {{ orders, error }}
 */
export async function getUserOrders(userId) {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      id,
      status,
      subtotal,
      shipping,
      total,
      created_at,
      order_items (
        id,
        product_id,
        title,
        image_url,
        unit_price,
        quantity,
        subtotal
      )
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return { orders: data ?? [], error };
}

// ── Obtener una orden por ID ──────────────────────────────────
/**
 * @param {string} orderId  UUID
 * @returns {{ order, error }}
 */
export async function getOrderById(orderId) {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      id,
      user_id,
      status,
      subtotal,
      shipping,
      total,
      notes,
      created_at,
      order_items (
        id,
        product_id,
        title,
        image_url,
        unit_price,
        quantity,
        subtotal
      )
    `)
    .eq("id", orderId)
    .single();

  return { order: data ?? null, error };
}

// ── Actualizar estado de una orden (solo admin) ───────────────
/**
 * @param {string} orderId
 * @param {'pending'|'confirmed'|'shipped'|'delivered'|'cancelled'} status
 * @returns {{ order, error }}
 */
export async function updateOrderStatus(orderId, status) {
  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", orderId)
    .select()
    .single();

  return { order: data ?? null, error };
}

// ── Todas las órdenes (solo admin) ───────────────────────────
/**
 * @returns {{ orders, error }}
 */
export async function getAllOrders() {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      id,
      user_id,
      status,
      total,
      created_at,
      profiles ( name, email ),
      order_items ( id, title, quantity, unit_price, subtotal )
    `)
    .order("created_at", { ascending: false });

  return { orders: data ?? [], error };
}