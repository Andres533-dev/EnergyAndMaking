import { useState, useEffect } from "react";
import Header from "./HeaderFerreteria";
import HomeView from "./HomeViewFerreteria";
import AuthView from "./AuthView";
import CartView from "./CartView";
import ProductModal from "./ProductModal";
import Toast from "./Toast";
import { useAuth } from "./Useauth";
import { useProducts } from "./Useproducts";

import "./global.css";
import "./utilitiesFerreteria.css";
import "./headerFerreteria.css";
import "./homeFerreteria.css";
import "./productcardFerreteria.css";
import "./modalFerreteria.css";
import "./auth.css";
import "./cart.css";
import "./admin.css";

export default function Ferreteria() {
  const { user, profile, isAdmin, loading: authLoading, logout } = useAuth();
  const { products, loading: productsLoading, createProduct, updateProduct, deleteProduct, search, filterByCategory,fetchAll } = useProducts();

  const [view, setView] = useState("home");
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "default") => {
    setToast({ msg, type, key: Date.now() });
  };

  if (authLoading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>Cargando...</div>
      </div>
    );
  }

  const handleSaveProduct = async (form) => {
  if (!modal) return;
  try {
    if (modal.mode === "create") {
      const payload = {
        title: form.title,
        desc: form.desc,           
        price: parseFloat(form.price),
        category_id: form.category_id,
        imageUrl: form.imageUrl,   
      };
      const { error } = await createProduct(payload, user.id);
      if (error) showToast(`Error: ${error.message}`, "danger");
      else showToast("✅ Producto creado correctamente.", "success");
    } else {
      const updates = {
        title: form.title,
        desc: form.desc,          
        price: parseFloat(form.price),
        category_id: form.category_id,
        imageUrl: form.imageUrl,   
      };
      const { error } = await updateProduct(modal.product.id, updates);
      if (error) showToast(`Error: ${error.message}`, "danger");
      else showToast("✏️ Producto actualizado.", "success");
    }
  } catch (err) {
    showToast(`Error: ${err.message}`, "danger");
  }
  setModal(null);
};

  const handleDeleteProduct = async (id) => {
    const { error } = await deleteProduct(id);
    if (error) showToast(`Error: ${error.message}`, "danger");
    else {
      setCart((c) => c.filter((x) => x.id !== id));
      showToast("🗑️ Producto eliminado.", "danger");
    }
  };

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`🛒 ${product.title} agregado al carrito.`);
  };

  const handleQty = (id, qty) => {
    if (qty <= 0) return setCart((c) => c.filter((i) => i.id !== id));
    setCart((c) => c.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  const handleRemoveFromCart = (id) => setCart((c) => c.filter((i) => i.id !== id));
  const handleClearCart = () => setCart([]);

  const handleLoginSuccess = () => {
    setView("home");
    showToast(`👋 Bienvenido!`, "success");
  };

  const handleLogout = async () => {
    await logout();
    setView("home");
    showToast("Sesión cerrada.", "default");
  };

 const handleSearch = async (q, cat = null) => {
  setActiveQuery(q);
  setActiveCategory(cat);
  if (cat) await filterByCategory(cat);
  else if (q?.trim()) await search(q.trim());
  else await fetchAll();   // ← línea nueva: resetea al catálogo completo
};

  return (
    <div style={{ minHeight: "100vh" }}>
      <Header
        view={view}
        setView={setView}
        cart={cart}
        user={user}
        onLogout={handleLogout}
        onSearch={handleSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {isAdmin && view === "home" && (
        <div className="admin-banner">
          <div className="admin-banner_left">
            <i className="bx bx-shield-quarter" />
            Modo administrador — puedes crear, editar y eliminar productos.
          </div>
          <button className="btn btn-yellow btn-sm" onClick={() => setModal({ mode: "create", product: null })}>
            <i className="bx bx-plus" /> Nuevo producto
          </button>
        </div>
      )}

      {view === "home" && (
        <HomeView
          products={products}
          onAdd={handleAddToCart}
          isAdmin={isAdmin}
          onEdit={(p) => setModal(p ? { mode: "edit", product: p } : { mode: "create", product: null })}
          onDelete={handleDeleteProduct}
          activeQuery={activeQuery}
          activeCategory={activeCategory}
          setView={setView}
          onSearch={handleSearch}
          setSearchQuery={setSearchQuery}
        />
      )}

      {view === "auth" && <AuthView onLoginSuccess={handleLoginSuccess} />}

      {view === "cart" && (
        <CartView
          cart={cart}
          onQty={handleQty}
          onRemove={handleRemoveFromCart}
          onClear={handleClearCart}
          user={user}
          onOrderPlaced={() => showToast("Pedido guardado en tu historial.", "success")}
        />
      )}

      {modal && (
        <ProductModal
          initial={modal.mode === "edit" ? { ...modal.product, price: String(modal.product.price) } : null}
          onSave={handleSaveProduct}
          onClose={() => setModal(null)}
          userId={user?.id}
        />
      )}

      {toast && <Toast key={toast.key} msg={toast.msg} type={toast.type} onDone={() => setToast(null)} />}
    </div>
  );
}