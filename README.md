# Pixel Store — Semana 8

Cristian Nahuas · Desarrollo Frontend I · PFY2201

Continuación del eCommerce desarrollado durante la Semana 7. Esta versión carga el catálogo desde un archivo JSON mediante `useEffect`, administra los estados de catálogo y carrito con `useState`, y utiliza renderizado condicional para representar la carga, los errores, el carrito vacío y los productos agregados.

## Ejecución local

Requiere Node.js 20 o superior.

```sh
npm install
npm run dev
```

Abrir la dirección indicada por Vite, normalmente `http://localhost:5173`.

Para comprobar la versión de producción:

```sh
npm run build
npm run preview
```

## Funcionalidades evaluadas

- Catálogo de nueve videojuegos cargado dinámicamente desde `public/data/products.json`.
- Vista de detalle para revisar descripción, plataformas, características y precios antes de agregar cada juego.
- Selector de plataforma en el detalle; el carrito conserva la versión elegida y permite comprar el mismo juego para plataformas diferentes.
- Estados de carga, éxito y error administrados con `useState`.
- Petición del catálogo ejecutada con `useEffect` y `fetch`.
- Búsqueda en tiempo real y filtro por plataforma.
- Carrito con funciones para agregar, aumentar, disminuir, eliminar y vaciar productos.
- Botón para realizar la compra simulada y restablecer el carrito.
- Contador de unidades y total calculado a partir del precio de oferta.
- Persistencia del carrito en `localStorage` mediante `useEffect`.
- Botón condicional que cambia de **Elegir plataforma** a **Elegir otra plataforma** cuando el juego ya tiene una versión en el carrito.
- Mensajes condicionales para catálogo en carga, error, búsqueda sin resultados y carrito vacío.
- Componentes reutilizables, diseño responsivo y controles accesibles.

## Estructura principal

```text
Frontend_Semana8/
├── capturas/
├── public/
│   ├── assets/img/
│   ├── data/products.json
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── CartItem.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── ProductList.jsx
│   │   └── ShoppingCart.jsx
│   ├── App.jsx
│   ├── main.jsx
│   ├── styles.css
│   └── utils.js
├── index.html
├── package.json
└── vite.config.js
```

`App.jsx` mantiene los estados compartidos y entrega los datos y controladores a los componentes mediante props. `ProductList` decide qué vista mostrar según el resultado de la carga, mientras `ProductCard` adapta el botón al estado del carrito.

## Evidencias incluidas

La carpeta `capturas/` contiene cuatro imágenes de evidencia para la entrega:

1. `01-catalogo-dinamico.png`: catálogo visible junto al mensaje “Catálogo cargado dinámicamente”.
2. `02-carrito-funcionando.png`: productos agregados, cantidades, contador y total.
3. `03-renderizado-condicional.png`: botones que distinguen juegos disponibles de aquellos con una plataforma ya agregada.
4. `04-detalle-producto.png`: vista intermedia con información completa y selección de plataforma.

## Publicación en GitHub Pages

El repositorio está configurado para publicar desde la raíz de la rama `gh_pages`.

1. Guardar y enviar los cambios del código fuente a la rama `main`.
2. Ejecutar `npm run deploy` desde esta carpeta.
3. El comando compila la aplicación y publica el contenido de `dist` en `gh_pages`.
4. Revisar la aplicación en `https://crnahuas.github.io/Frontend_Semana_8/`.
