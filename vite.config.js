import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Las rutas relativas permiten publicar el proyecto en cualquier repositorio de GitHub Pages.
  base: "./",
});
