export function Hero() {
  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <h1 id="hero-title">Tu próximo mundo empieza <span>aquí.</span></h1>
        <p>
          Explora nuevos lanzamientos, clásicos imprescindibles y grandes ofertas para todas tus plataformas favoritas.
        </p>
        <a className="button button-primary" href="#productos">Explorar catálogo <span aria-hidden="true">↓</span></a>
      </div>
      <div className="hero-art" aria-hidden="true">
        <img src="./assets/img/no-mans-sky.jpg" alt="" />
        <div className="hero-offer"><strong>Oferta destacada</strong><span>No Man's Sky · $24.990</span></div>
      </div>
    </section>
  );
}
