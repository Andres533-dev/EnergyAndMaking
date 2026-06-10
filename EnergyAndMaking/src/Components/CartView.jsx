import { useState } from "react";
import { getCatLabel, getCatIcon, fmtPrice } from "./helpers";
import { useOrders } from "./Useorders";

function CartView({ cart, onQty, onRemove, onClear, user, onOrderPlaced }) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { placeOrder, error: orderError } = useOrders(user?.id);

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 200000 ? 0 : 15000;
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    if (!user) {
      alert("Debes iniciar sesión para proceder al pago.");
      return;
    }

    if (cart.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    setIsCheckingOut(true);
    const cartItems = cart.map((item) => ({
      id: item.id,
      title: item.title,
      image_url: item.imageUrl,
      price: item.price,
      qty: item.qty,
    }));

    const { order, error } = await placeOrder(cartItems);
    setIsCheckingOut(false);

    if (error) {
      alert(`Error al procesar el pedido: ${error.message}`);
    } else {
      alert(`✅ Pedido realizado exitosamente! ID: ${order.id}`);
      onClear();
      onOrderPlaced?.(order);
    }
  };
  

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-page_title"><i className="bx bx-cart" /> Mi carrito</div>
        <div className="cart-empty">
          <i className="bx bx-cart-alt" />
          <h3>Tu carrito está vacío</h3>
          <p style={{ fontSize: "0.9rem" }}>Explora los productos y agrega lo que necesites para tu proyecto.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-page_title">
        <i className="bx bx-cart" /> Mi carrito
        <span style={{ fontSize: "0.9rem", fontWeight: 400, color: "var(--muted)" }}>
          ({cart.reduce((s, i) => s + i.qty, 0)} artículo{cart.reduce((s, i) => s + i.qty, 0) !== 1 ? "s" : ""})
        </span>
      </div>

      <div className="cart-layout">
        <div className="cart-list">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="cart-item_img">
                {item.imageUrl ? <img src={item.imageUrl} alt={item.title} /> : <span>{getCatIcon(item.category_id)}</span>}
              </div>
              <div className="cart-item_info">
                <div className="cart-item_cat">{getCatLabel(item.category_id)}</div>
                <div className="cart-item_title">{item.title}</div>
                <div className="cart-item_price">{fmtPrice(item.price)} c/u</div>
              </div>
              <div className="cart-item_qty">
                <button className="qty-btn" onClick={() => onQty(item.id, item.qty - 1)}>−</button>
                <span className="qty-num">{item.qty}</span>
                <button className="qty-btn" onClick={() => onQty(item.id, item.qty + 1)}>+</button>
              </div>
              <div className="cart-item_total">{fmtPrice(item.price * item.qty)}</div>
              <button className="cart-item_del" onClick={() => onRemove(item.id)} title="Eliminar">
                <i className="bx bx-trash" />
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="cart-summary_title">Resumen del pedido</div>
          <div className="cart-summary_row">
            <span>Subtotal</span><span>{fmtPrice(subtotal)}</span>
          </div>
          <div className="cart-summary_row">
            <span>Envío</span>
            <span style={{ color: shipping === 0 ? "var(--success)" : "var(--text)" }}>
              {shipping === 0 ? "Gratis 🎉" : fmtPrice(shipping)}
            </span>
          </div>
          {shipping > 0 && (
            <div style={{ fontSize: "0.75rem", color: "var(--muted)", padding: "6px 0" }}>
              Envío gratis en pedidos mayores a {fmtPrice(200000)}
            </div>
          )}
          <div className="cart-summary_row" style={{ borderTop: "2px solid var(--yellow)", marginTop: 8, paddingTop: 14 }}>
            <span style={{ fontWeight: 700, color: "var(--text)" }}>Total</span>
            <span className="cart-summary_total">{fmtPrice(total)}</span>
          </div>
          <div className="cart-summary_cta">
            <button className="btn btn-yellow btn-full" onClick={handleCheckout} disabled={isCheckingOut}>
              <i className="bx bx-credit-card" /> {isCheckingOut ? "Procesando..." : "Proceder al pago"}
            </button>
            <button className="btn btn-ghost btn-sm btn-full" onClick={onClear}>
              <i className="bx bx-trash" /> Vaciar carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartView;
