// ── lib/supabase/index.js ─────────────────────────────────────
//  Punto de entrada único para todos los servicios de Supabase.
//
//  Uso en cualquier componente:
//    import { login, getProducts, createOrder } from "@/lib/supabase";
// ─────────────────────────────────────────────────────────────

export { supabase }                          from "./Client.js";

export {
  register,
  login,
  logout,
  getSession,
  getCurrentUser,
  onAuthStateChange,
} from "./Authservice.js";

export {
  getProfile,
  updateProfile,
} from "./Profileservice.js";

export {
  getProducts,
  searchProducts,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./Productservice.js";

export {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
} from "./Orderservice.js";