// Punto de entrada de la aplicación: monta React en el div #root de index.html.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Estilos globales de toda la página.
import './index.css'
import App from './App.tsx'

// StrictMode: ayuda a detectar problemas en desarrollo (no cambia nada en producción).
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Registra el service worker (public/sw.js) solo en la versión publicada (PROD), no en desarrollo, y después de cargar la página.
// BASE_URL respeta la carpeta donde esté publicado el sitio.
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`))
}
