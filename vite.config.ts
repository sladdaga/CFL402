// Configuración de Vite (la herramienta que arma y sirve el proyecto).
// Se usa el plugin de React para poder escribir JSX/TSX; la lista "plugins" de abajo es donde se activan las extensiones.
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// base './' permite publicar el sitio en la raíz o en una subcarpeta.
// El sitio tiene dos páginas HTML: la principal (index.html) y la de emergencias (emergencias.html);
// rollupOptions.input le indica a Vite que debe incluir ambas al hacer "npm run build".
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        emergencias: fileURLToPath(new URL('./emergencias.html', import.meta.url)),
      },
    },
  },
})
