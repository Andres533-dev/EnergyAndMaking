import { useMemo } from "react";
import ProductCard from "./ProductCardFerreteria";
import { CATEGORIES } from "./categories";
import { getCatLabel, getCatIcon } from "./helpers";

function HomeView({ products, onAdd, isAdmin, onEdit, onDelete, activeQuery, activeCategory, setView, onSearch, setSearchQuery }) {
  const filtered = useMemo(() => {
    let list = [...products];
    if (activeCategory) list = list.filter((p) => p.category_id === activeCategory);
    if (activeQuery) {
      const q = activeQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.desc.toLowerCase().includes(q) ||
          getCatLabel(p.category_id).toLowerCase().includes(q)
      );
    }
    return list;
  }, [products, activeQuery, activeCategory]);

  const isFiltered = activeQuery || activeCategory;

  return (
    <>
      {!isFiltered && (
        <section className="home-hero">
          <div className="home-hero_label">La 24-7 Ferretería · Bogotá, Colombia</div>
          <h1 className="home-hero_title">
            Todo para tu <br /><em>proyecto</em>
          </h1>
          <p className="home-hero_sub">
            Tornillería, herramientas eléctricas, plomería, pinturas industriales y mucho más.
            Usa el buscador o explora por categoría.
          </p>
          <div className="home-hero_cats">
            {CATEGORIES.map((c) => (
              <div
                key={c.id}
                className="home-hero_cat"
                onClick={() => { onSearch("", c.id); setSearchQuery(""); }}
              >
                <span>{c.icon}</span> {c.label}
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="products-section">
        <div className="products-section_header">
          <div>
            <div className="products-section_title">
              {activeCategory
                ? `${getCatIcon(activeCategory)} ${getCatLabel(activeCategory)}`
                : activeQuery
                ? `Resultados: "${activeQuery}"`
                : "Todos los productos"}
            </div>
            {isFiltered && (
              <button
                className="btn btn-ghost btn-sm"
                style={{ marginTop: 8 }}
                onClick={() => { onSearch("", null); setSearchQuery(""); }}
              >
                <i className="bx bx-x" /> Limpiar filtro
              </button>
            )}
          </div>
          <span className="products-section_count">
            {filtered.length} producto{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="products-grid">
          {isAdmin && (
            <div
              className="prod-card"
              style={{ cursor: "pointer", alignItems: "center", justifyContent: "center", minHeight: 280, border: "2px dashed var(--border)" }}
              onClick={() => onEdit(null)}
            >
              <div style={{ textAlign: "center", color: "var(--muted)", padding: 24 }}>
                <i className="bx bx-plus-circle" style={{ fontSize: "2.5rem", display: "block", marginBottom: 10, color: "var(--yellow)" }} />
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "1rem", color: "var(--white)" }}>
                  Nuevo producto
                </div>
              </div>
            </div>
          )}

          {filtered.length === 0 && !isAdmin ? (
            <div className="no-results">
              <i className="bx bx-search-alt" />
              <div style={{ fontSize: "0.95rem" }}>
                {products.length === 0
                  ? "Aún no hay productos publicados. El administrador puede crear los primeros."
                  : "No se encontraron productos con ese criterio."}
              </div>
            </div>
          ) : (
            filtered.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAdd={onAdd}
                isAdmin={isAdmin}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </div>
      </section>
    </>
  );
}

export default HomeView;
