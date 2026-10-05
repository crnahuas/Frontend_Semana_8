const currency = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

export function formatCurrency(value) {
  return currency.format(value);
}

export function getProductPlatforms(product) {
  if (!product) return [];
  if (Array.isArray(product.platformOptions)) return product.platformOptions;
  return String(product.platforms || "")
    .split("·")
    .map((platform) => platform.trim())
    .filter(Boolean);
}

export function getCartKey(product, platform = product?.selectedPlatform) {
  const resolvedPlatform = platform || getProductPlatforms(product)[0] || "Sin plataforma";
  return `${product.id}::${resolvedPlatform}`;
}

export function readStoredCart() {
  try {
    const storedCart = JSON.parse(localStorage.getItem("pixel-store-cart"));
    return Array.isArray(storedCart)
      ? storedCart.map((item) => {
        const selectedPlatform = item.selectedPlatform || getProductPlatforms(item)[0] || "Sin plataforma";
        return { ...item, selectedPlatform, cartKey: getCartKey(item, selectedPlatform) };
      })
      : [];
  } catch {
    return [];
  }
}
