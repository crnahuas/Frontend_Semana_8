import { useEffect, useState } from "react";
import { formatCurrency, getCartKey, getProductPlatforms } from "../utils.js";

export function ProductDetail({ product, platformsInCart, onAdd, onClose }) {
  const [selectedPlatform, setSelectedPlatform] = useState("");

  useEffect(() => {
    setSelectedPlatform(getProductPlatforms(product)[0] || "");
  }, [product]);

  useEffect(() => {
    if (!product) return undefined;

    function closeWithEscape(event) {
      if (event.key === "Escape") onClose();
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeWithEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeWithEscape);
    };
  }, [product, onClose]);

  if (!product) return null;

  const discount = Math.round((1 - product.offerPrice / product.normalPrice) * 100);
  const platformOptions = getProductPlatforms(product);
  const activePlatform = platformOptions.includes(selectedPlatform) ? selectedPlatform : platformOptions[0];
  const selectedVersionInCart = platformsInCart.has(getCartKey(product, activePlatform));

  return (
    <div className="detail-overlay" onClick={onClose}>
      <section
        className="product-detail"
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="detail-close" type="button" onClick={onClose} aria-label="Cerrar detalle" autoFocus>
          ×
        </button>

        <div className="detail-image">
          <img src={product.image} alt={product.imageAlt} />
          <span className="discount-badge">-{discount}%</span>
        </div>

        <div className="detail-copy">
          <p className="platforms">{product.platforms}</p>
          <h2 id="detail-title">{product.name}</h2>
          <p className="detail-description">{product.description}</p>

          <fieldset className="platform-selector">
            <legend>Selecciona la plataforma</legend>
            <div className="platform-options" role="radiogroup" aria-label="Plataformas disponibles">
              {platformOptions.map((platform) => (
                <button
                  className={platform === activePlatform ? "platform-option platform-option-active" : "platform-option"}
                  type="button"
                  key={platform}
                  role="radio"
                  aria-checked={platform === activePlatform}
                  onClick={() => setSelectedPlatform(platform)}
                >
                  {platform}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="detail-information">
            <div>
              <span>Categoría</span>
              <strong>{product.category}</strong>
            </div>
            <div>
              <span>Disponibilidad</span>
              <strong>Entrega digital</strong>
            </div>
          </div>

          {product.highlights?.length > 0 && (
            <div className="detail-highlights">
              <h3>Características destacadas</h3>
              <ul>
                {product.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
              </ul>
            </div>
          )}

          <div className="detail-purchase">
            <div className="price-row" aria-label={`Precio oferta ${formatCurrency(product.offerPrice)}, precio normal ${formatCurrency(product.normalPrice)}`}>
              <strong>{formatCurrency(product.offerPrice)}</strong>
              <del>{formatCurrency(product.normalPrice)}</del>
            </div>

            {selectedVersionInCart ? (
              <a className="button button-primary" href="#carrito" onClick={onClose}>Ir al carrito</a>
            ) : (
              <button className="button button-primary" type="button" onClick={() => onAdd(product, activePlatform)}>
                Agregar al carrito <span aria-hidden="true">+</span>
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
