import { useState, useRef, useEffect } from "react";
import { CATEGORIES } from "./categories";

function Header({ view, setView, cart, user, onLogout, onSearch, searchQuery, setSearchQuery }) {
  const [catOpen, setCatOpen] = useState(false);
  const ddRef = useRef(null);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  useEffect(() => {
    function handler(e) {
      if (ddRef.current && !ddRef.current.contains(e.target)) setCatOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
    setView("home");
  };

  return (
    <header className="hdr">
      {/* Logo */}
      <div className="hdr_logo" onClick={() => { setView("home"); setSearchQuery(""); onSearch(""); }}>
        <div className="hdr_logo-icon">E&M</div>
        <div className="hdr_logo-text">
          Ferretería
          <small>Energy &amp; Making</small>
        </div>
      </div>

      {/* Buscador */}
      <form className="hdr_search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Buscar productos, marcas, referencias..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="hdr_search-btn">
          <i className="bx bx-search" />
        </button>
      </form>

      {/* Nav */}
      <nav className="hdr_nav">
        {/* Categorías */}
        <div className="hdr_dropdown" ref={ddRef}>
          <button
            className={`hdr_nav-btn${catOpen ? " active" : ""}`}
            onClick={() => setCatOpen((v) => !v)}
          >
            <i className="bx bx-category" /> Categorías
            <i className={`bx bx-chevron-${catOpen ? "up" : "down"}`} style={{ fontSize: "0.9rem" }} />
          </button>
          {catOpen && (
            <div className="hdr_dropdown-menu">
              {CATEGORIES.map((c) => (
                <div
                  key={c.id}
                  className="hdr_dropdown-item"
                  onClick={() => {
                    onSearch("", c.id);
                    setView("home");
                    setCatOpen(false);
                    setSearchQuery("");
                  }}
                >
                  <span>{c.icon}</span> {c.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Ingresar / Usuario */}
        {user ? (
          <div className="user-chip" onClick={onLogout} title="Cerrar sesión">
            <div className="user-chip_avatar">{user.name ? user.name[0] : "U"}</div>
            {user.name ? user.name.split(" ")[0] : "Usuario"}
            <i className="bx bx-log-out" style={{ fontSize: "0.9rem", color: "var(--muted)" }} />
          </div>
        ) : (
          <button
            className={`hdr_nav-btn${view === "auth" ? " active" : ""}`}
            onClick={() => setView("auth")}
          >
            <i className="bx bx-user" /> Ingresar
          </button>
        )}

        {/* Carrito */}
        <button
          className={`hdr_nav-btn${view === "cart" ? " active" : ""}`}
          style={{ position: "relative" }}
          onClick={() => setView("cart")}
        >
          <i className="bx bx-cart" /> Compras
          {cartCount > 0 && <span className="hdr_cart-badge">{cartCount}</span>}
        </button>
      </nav>
    </header>
  );
}

export default Header;
