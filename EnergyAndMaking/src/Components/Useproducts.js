// ── hooks/useProducts.js ──────────────────────────────────────
//  Hook que gestiona el estado del catálogo de productos.
//  Sincroniza automáticamente con Supabase.
//  Normaliza los nombres de campos: snake_case (DB) ↔ camelCase (frontend)
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback, useRef } from "react";
import {
  getProducts,
  searchProducts      as sbSearch,
  getProductsByCategory,
  createProduct       as sbCreate,
  updateProduct       as sbUpdate,
  deleteProduct       as sbDelete,
} from "./Productservice.js";

// Función auxiliar para transformar producto de DB (snake_case) a frontend (camelCase)
const fromDB = (product) => ({
  ...product,
  imageUrl: product.image_url,
  desc: product.description,
  // Eliminar los campos originales para evitar duplicidad (opcional)
  // pero los dejamos por si otros componentes los necesitan.
});

// Función auxiliar para transformar payload de frontend (camelCase) a DB (snake_case)
const toDB = (payload) => ({
  title: payload.title,
  description: payload.desc,
  price: payload.price,
  category_id: payload.category_id,
  image_url: payload.imageUrl,
  stock: payload.stock ?? 0,
  // active, created_by etc. se manejan en el servicio
});

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);
  const fetchedRef = useRef(false);

  // ── Carga inicial ──────────────────────────────────────────
  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { products: data, error: err } = await getProducts();
    if (err) setError(err.message);
    else setProducts(data.map(fromDB));
    setLoading(false);
  }, []);

  // Cargar productos solo una vez al montar
  useEffect(() => {
    if (!fetchedRef.current) {
      fetchedRef.current = true;
      fetchAll();
    }
  }, [fetchAll]);

  // ── Búsqueda por texto ─────────────────────────────────────
  const search = useCallback(async (query) => {
    if (!query?.trim()) return fetchAll();
    setLoading(true);
    const { products: data, error: err } = await sbSearch(query.trim());
    if (err) setError(err.message);
    else setProducts(data.map(fromDB));
    setLoading(false);
  }, [fetchAll]);

  // ── Filtrar por categoría ──────────────────────────────────
  const filterByCategory = useCallback(async (categoryId) => {
    if (!categoryId) return fetchAll();
    setLoading(true);
    const { products: data, error: err } = await getProductsByCategory(categoryId);
    if (err) setError(err.message);
    else setProducts(data.map(fromDB));
    setLoading(false);
  }, [fetchAll]);

  // ── CRUD (solo admin) ──────────────────────────────────────

  const createProduct = useCallback(async (payload, adminId) => {
    const dbPayload = toDB(payload);
    const { product, error: err } = await sbCreate(dbPayload, adminId);
    if (err) return { error: err };
    const newProduct = fromDB(product);
    setProducts((prev) => [newProduct, ...prev]);
    return { product: newProduct, error: null };
  }, []);

  const updateProduct = useCallback(async (productId, updates) => {
    const dbUpdates = toDB(updates);
    const { product, error: err } = await sbUpdate(productId, dbUpdates);
    if (err) return { error: err };
    const updatedProduct = fromDB(product);
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, ...updatedProduct } : p))
    );
    return { product: updatedProduct, error: null };
  }, []);

  const deleteProduct = useCallback(async (productId) => {
    const { error: err } = await sbDelete(productId);
    if (err) return { error: err };
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    return { error: null };
  }, []);

  return {
    products,
    loading,
    error,
    fetchAll,
    search,
    filterByCategory,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}