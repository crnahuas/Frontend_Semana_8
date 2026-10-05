import { formatCurrency, getCartKey } from "../utils.js";

export function CartItem({ item, onIncrement, onDecrement, onRemove }) {
  const cartKey = getCartKey(item);

  return (
    <li className="cart-item">
      <img src={item.image} alt="" />
      <div className="cart-item-copy">
        <strong>{item.name}</strong>
        <span className="cart-item-platform">Plataforma: {item.selectedPlatform}</span>
        <span>{formatCurrency(item.offerPrice)} c/u</span>
        <button type="button" className="remove-button" onClick={() => onRemove(cartKey)}>
          Eliminar
        </button>
      </div>
      <div className="quantity" aria-label={`Cantidad de ${item.name}`}>
        <button type="button" onClick={() => onDecrement(cartKey)} aria-label={`Quitar una unidad de ${item.name} para ${item.selectedPlatform}`}>−</button>
        <span aria-live="polite">{item.quantity}</span>
        <button type="button" onClick={() => onIncrement(cartKey)} aria-label={`Agregar una unidad de ${item.name} para ${item.selectedPlatform}`}>+</button>
      </div>
      <strong className="line-total">{formatCurrency(item.offerPrice * item.quantity)}</strong>
    </li>
  );
}
