// ── lib/supabase/productService.js ────────────────────────
//  Operaciones CRUD y búsqueda sobre la tabla `products`.
//  Sincroniza con el esquema Supabase actualizado:
//  - Usa `active` (BOOLEAN) en lugar de `deleted_at`
//  - Incluye campos: stock, active, created_by
//  - Los timestamps (created_at, updated_at) se manejan automáticamente
// ─────────────────────────────────────────────────────────

import { supabase } from "./Client";

// ── Obtener todos los productos ────────────────────────────
/**
 * Devuelve todos los productos activos (no eliminados).
 * @returns {{ products, error }}
 */
export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("id, title, description, price, category_id, image_url, stock, active, created_at, created_by")
    .eq("active", true)
    .order("created_at", { ascending: false });

  return { products: data ?? [], error };
}

// ── Buscar productos por texto ─────────────────────────────
/**
 * Busca en título y descripción.
 * @param {string} query
 * @returns {{ products, error }}
 */
export async function searchProducts(query) {
  const { data, error } = await supabase
    .from("products")
    .select("id, title, description, price, category_id, image_url, stock, active, created_at, created_by")
    .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
    .eq("active", true)
    .order("created_at", { ascending: false });

  return { products: data ?? [], error };
}

// ── Obtener productos por categoría ────────────────────────
/**
 * @param {string} categoryId
 * @returns {{ products, error }}
 */
export async function getProductsByCategory(categoryId) {
  const { data, error } = await supabase
    .from("products")
    .select("id, title, description, price, category_id, image_url, stock, active, created_at, created_by")
    .eq("category_id", categoryId)
    .eq("active", true)
    .order("created_at", { ascending: false });

  return { products: data ?? [], error };
}

// ── Crear un producto (solo admin) ─────────────────────────
/**
 * @param {{ title, description, price, category_id, image_url, stock }} payload
 * @param {string} adminId  UUID del admin que crea
 * @returns {{ product, error }}
 */
export async function createProduct(payload, adminId) {
  const { data, error } = await supabase
    .from("products")
    .insert({
      title: payload.title,
      description: payload.description,
      price: payload.price,
      category_id: payload.category_id,
      image_url: payload.image_url ?? null,
      stock: payload.stock ?? 0,
      active: true,
      created_by: adminId,
    })
    .select()
    .single();

  return { product: data ?? null, error };
}

// ── Actualizar un producto (solo admin) ────────────────────
/**
 * @param {string} productId  UUID
 * @param {{ title?, description?, price?, category_id?, image_url?, stock? }} updates
 * @returns {{ product, error }}
 */
export async function updateProduct(productId, updates) {
  const payload = {};
  if (updates.title !== undefined) payload.title = updates.title;
  if (updates.description !== undefined) payload.description = updates.description;
  if (updates.price !== undefined) payload.price = updates.price;
  if (updates.category_id !== undefined) payload.category_id = updates.category_id;
  if (updates.image_url !== undefined) payload.image_url = updates.image_url;
  if (updates.stock !== undefined) payload.stock = updates.stock;

  const { data, error } = await supabase
    .from("products")
    .update(payload)
    .eq("id", productId)
    .select()
    .single();

  return { product: data ?? null, error };
}

// ── Archivar un producto (soft delete) ───────────────────────
/**
 * Marca como inactivo sin borrar la fila (preserva referencias).
 * @param {string} productId  UUID
 * @returns {{ error }}
 */
export async function deleteProduct(productId) {
  const { error } = await supabase
    .from("products")
    .update({ active: false })
    .eq("id", productId);

  return { error };
}