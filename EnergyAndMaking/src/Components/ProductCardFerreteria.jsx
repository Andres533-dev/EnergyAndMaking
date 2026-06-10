import { getCatLabel, getCatIcon, fmtPrice } from "./helpers";

function ProductCard({ product, onAdd, isAdmin, onEdit, onDelete }) {
    console.log('Producto:', product);
console.log('imageUrl:', product.imageUrl);
  return (
    <div className="prod-card">
      <div className="prod-card_img">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.title} />
        ) : (
          <span>{getCatIcon(product.category_id)}</span>
        )}
      </div>
      <div className="prod-card_body">
        <div className="prod-card_cat">{getCatLabel(product.category_id)}</div>
        <div className="prod-card_title">{product.title}</div>
        <div className="prod-card_desc">{product.desc}</div>
        <div className="prod-card_footer">
          <div className="prod-card_price">{fmtPrice(product.price)}</div>
          <button className="prod-card_add" onClick={() => onAdd(product)} title="Agregar al carrito">+</button>
        </div>
        {isAdmin && (
          <div className="prod-card_admin">
            <button className="btn btn-ghost btn-sm" onClick={() => onEdit(product)} style={{ flex: 1 }}>
              <i className="bx bx-edit" /> Editar
            </button>
            <button className="btn btn-danger btn-sm" onClick={() => onDelete(product.id)}>
              <i className="bx bx-trash" />
            </button>
          </div>
        )}
      </div>
    </div>
    
  );
}

export default ProductCard;
