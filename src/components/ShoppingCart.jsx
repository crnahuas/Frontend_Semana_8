import { CartItem } from "./CartItem.jsx";
import { formatCurrency, getCartKey } from "../utils.js";

export function ShoppingCart({ cart, count, total, onIncrement, onDecrement, onRemove, onClear, onCheckout }) {
  return (
    <section id="carrito" className="cart-section" aria-labelledby="cart-title">
      <div className="section-heading">
        <div>
          <h2 id="cart-title">Tu carrito</h2>
        </div>
        {cart.length > 0 && (
          <button type="button" className="button button-secondary" onClick={onClear}>Vaciar carrito</button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart" role="status">
          <span className="empty-cart-icon" aria-hidden="true">□</span>
          <div><h3>Tu carrito está vacío</h3><p>Agrega un juego del catálogo para comenzar.</p></div>
          <a className="button button-secondary" href="#productos">Ver juegos</a>
        </div>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((item) => (
              <CartItem
                key={getCartKey(item)}
                item={item}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
                onRemove={onRemove}
              />
            ))}
          </ul>
          <div className="cart-summary" aria-live="polite">
            <p><span>{count === 1 ? "Producto" : "Productos"}</span><strong>{count}</strong></p>
            <p className="summary-total"><span>Total</span><strong>{formatCurrency(total)}</strong></p>
            <button type="button" className="button button-primary checkout-button" onClick={onCheckout}>
              Realizar compra
            </button>
          </div>
        </>
      )}
    </section>
  );
}
