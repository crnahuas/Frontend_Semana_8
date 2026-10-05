export function Header({ cartCount }) {
  const cartLabel = `${cartCount} ${cartCount === 1 ? "producto" : "productos"}`;

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Navegación principal">
        <a className="brand" href="#inicio" aria-label="Pixel Store, inicio">
          <img src="./favicon.svg" width="34" height="34" alt="" />
          <span>Pixel<strong>Store</strong></span>
        </a>
        <div className="nav-links">
          <a href="#productos">Juegos</a>
          <a className="cart-link" href="#carrito" aria-label={`Carrito con ${cartLabel}`}>
            Carrito <span className="cart-badge">{cartCount}</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
