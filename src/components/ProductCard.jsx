import { formatCurrency } from "../utils.js";

export function ProductCard({ product, isInCart, onDetails }) {
  const discount = Math.round((1 - product.offerPrice / product.normalPrice) * 100);

  return (
    <article className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.imageAlt} />
        <span className="discount-badge">-{discount}%</span>
      </div>
      <div className="product-body">
        <p className="platforms">{product.platforms}</p>
        <h3>{product.name}</h3>
        <p className="description">{product.description}</p>
        <div className="price-row" aria-label={`Precio oferta ${formatCurrency(product.offerPrice)}, precio normal ${formatCurrency(product.normalPrice)}`}>
          <strong>{formatCurrency(product.offerPrice)}</strong>
          <del>{formatCurrency(product.normalPrice)}</del>
        </div>
        <div className="product-actions">
          <button className="button button-secondary button-full" type="button" onClick={() => onDetails(product)}>
            Ver detalles
          </button>
          <button
            className="button button-primary button-full"
            type="button"
            onClick={() => onDetails(product)}
          >
            {isInCart ? "Elegir otra plataforma" : "Elegir plataforma"}
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </article>
  );
}
