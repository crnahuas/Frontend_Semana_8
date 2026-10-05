import { useEffect, useMemo, useState } from "react";
import { Header } from "./components/Header.jsx";
import { Hero } from "./components/Hero.jsx";
import { ProductList } from "./components/ProductList.jsx";
import { ProductDetail } from "./components/ProductDetail.jsx";
import { ShoppingCart } from "./components/ShoppingCart.jsx";
import { Footer } from "./components/Footer.jsx";
import { getCartKey, getProductPlatforms, readStoredCart } from "./utils.js";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(readStoredCart);
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState("Todas");
  const [feedback, setFeedback] = useState("");
  const [catalogStatus, setCatalogStatus] = useState("loading");
  const [reloadCatalog, setReloadCatalog] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // useEffect simula una fuente externa cargando el catálogo desde un archivo JSON.
  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      setCatalogStatus("loading");

      try {
        const response = await fetch(`${import.meta.env.BASE_URL}data/products.json`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`No fue posible cargar el catálogo (${response.status}).`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("El catálogo no tiene el formato esperado.");
        }

        const hasIncompleteProducts = data.some((product) =>
          !product.id || !product.name || !product.description || !product.image
        );

        if (hasIncompleteProducts) {
          throw new Error("Hay productos sin nombre, descripción o imagen.");
        }

        setProducts(data);
        setCatalogStatus("success");
      } catch (error) {
        if (error.name !== "AbortError") {
          setProducts([]);
          setCatalogStatus("error");
        }
      }
    }

    loadProducts();
    return () => controller.abort();
  }, [reloadCatalog]);

  // useEffect mantiene el carrito al actualizar la página.
  useEffect(() => {
    localStorage.setItem("pixel-store-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (!feedback) return undefined;
    const timeoutId = window.setTimeout(() => setFeedback(""), 3200);
    return () => window.clearTimeout(timeoutId);
  }, [feedback]);

  // Filtra por texto y por cualquiera de las plataformas disponibles del producto.
  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("es");
    return products.filter((product) => {
      const matchesPlatform = platform === "Todas" || product.platforms.includes(platform);
      const searchableText = `${product.name} ${product.description} ${product.platforms}`.toLocaleLowerCase("es");
      return matchesPlatform && searchableText.includes(normalizedQuery);
    });
  }, [products, query, platform]);

  // El contador considera todas las unidades y el total utiliza el precio de oferta.
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.offerPrice * item.quantity, 0);
  const productsInCart = useMemo(() => new Set(cart.map((item) => item.id)), [cart]);
  const platformSelectionsInCart = useMemo(() => new Set(cart.map((item) => getCartKey(item))), [cart]);

  // Cada combinación de juego y plataforma se administra como un producto del carrito.
  function addToCart(product, selectedPlatform = getProductPlatforms(product)[0]) {
    const cartKey = getCartKey(product, selectedPlatform);
    setCart((currentCart) => {
      const existing = currentCart.find((item) => getCartKey(item) === cartKey);
      return existing
        ? currentCart.map((item) => getCartKey(item) === cartKey ? { ...item, quantity: item.quantity + 1 } : item)
        : [...currentCart, { ...product, selectedPlatform, cartKey, quantity: 1 }];
    });
    setFeedback(`${product.name} para ${selectedPlatform} se agregó al carrito.`);
  }

  // Actualiza cantidades sin modificar directamente el arreglo almacenado en el estado.
  function incrementQuantity(cartKey) {
    setCart((currentCart) => currentCart.map((item) =>
      getCartKey(item) === cartKey ? { ...item, quantity: item.quantity + 1 } : item
    ));
  }

  function decrementQuantity(cartKey) {
    setCart((currentCart) => currentCart
      .map((item) => getCartKey(item) === cartKey ? { ...item, quantity: item.quantity - 1 } : item)
      .filter((item) => item.quantity > 0));
  }

  // Permite eliminar un producto específico o restablecer completamente el carrito.
  function removeFromCart(cartKey) {
    setCart((currentCart) => currentCart.filter((item) => getCartKey(item) !== cartKey));
    setFeedback("Producto eliminado del carrito.");
  }

  function clearCart() {
    setCart([]);
    setFeedback("Carrito vaciado.");
  }

  // Finaliza la compra simulada y restablece el carrito.
  function checkout() {
    const purchasedItems = cartCount;
    setCart([]);
    setFeedback(`Compra realizada correctamente: ${purchasedItems} ${purchasedItems === 1 ? "producto" : "productos"}.`);
  }

  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido principal</a>
      <Header cartCount={cartCount} />
      <main id="contenido">
        <Hero />
        <section id="productos" className="catalog" aria-labelledby="catalog-title">
          <div className="section-heading catalog-heading">
            <div>
              <h2 id="catalog-title">Encuentra tu próximo juego</h2>
              <p className="section-intro">
                {catalogStatus === "success"
                  ? `${filteredProducts.length} de ${products.length} juegos disponibles.`
                  : "El catálogo se obtiene desde una fuente de datos local."}
              </p>
              <p className={`data-status data-status-${catalogStatus}`} role="status" aria-live="polite">
                {catalogStatus === "loading" && "Cargando productos desde JSON…"}
                {catalogStatus === "success" && "Catálogo cargado dinámicamente"}
                {catalogStatus === "error" && "No se pudo cargar el catálogo"}
              </p>
            </div>
            <div className="filters" aria-label="Filtros del catálogo">
              <label>
                <span>Buscar</span>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Nombre o plataforma"
                />
              </label>
              <label>
                <span>Plataforma</span>
                <select value={platform} onChange={(event) => setPlatform(event.target.value)}>
                  <option>Todas</option>
                  <option>PC</option>
                  <option>PlayStation</option>
                  <option>Xbox</option>
                  <option>Nintendo</option>
                </select>
              </label>
            </div>
          </div>
          <ProductList
            products={filteredProducts}
            productsInCart={productsInCart}
            status={catalogStatus}
            onDetails={setSelectedProduct}
            onRetry={() => setReloadCatalog((currentValue) => currentValue + 1)}
          />
        </section>

        <p className="feedback" role="status" aria-live="polite">{feedback}</p>
        <ShoppingCart
          cart={cart}
          count={cartCount}
          total={cartTotal}
          onIncrement={incrementQuantity}
          onDecrement={decrementQuantity}
          onRemove={removeFromCart}
          onClear={clearCart}
          onCheckout={checkout}
        />
      </main>
      <Footer />
      <ProductDetail
        product={selectedProduct}
        platformsInCart={platformSelectionsInCart}
        onAdd={addToCart}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}

export default App;
