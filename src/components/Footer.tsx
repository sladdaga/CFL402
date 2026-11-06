// Pie de página: íconos de redes sociales (datos en src/data/contacto.ts) y año actual.
import { redes } from '../data/contacto'

// Ícono SVG de cada red, indexado por el id de la red en contacto.ts.
const iconos: Record<string, React.ReactNode> = {
  facebook: <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />,
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.2" cy="6.8" r="1.2" />
    </>
  ),
  youtube: <path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23.5 12 31 31 0 0 0 23 7.2zM9.8 15.2V8.8l6 3.2z" />,
  x: <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23zm-1.16 17.52h1.83L7.08 4.13H5.12z" />,
}

// Año actual, para que el © se actualice solo.
const ANIO = new Date().getFullYear()

// Muestra las redes de un grupo ("cfl" o "fundacion") con su título. Los enlaces se abren en otra pestaña; noopener noreferrer es una medida de seguridad.
function Redes({ de, titulo }: { de: 'cfl' | 'fundacion'; titulo: string }) {
  return (
    <div className="redes__grupo">
      <span className="redes__titulo">{titulo}</span>
      <ul className="redes" aria-label={titulo}>
        {redes.filter((r) => r.de === de).map((r) => (
          <li key={r.id}>
            <a href={r.url} target="_blank" rel="noopener noreferrer" aria-label={`${r.nombre} - ${titulo}`} title={r.nombre}>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
                {iconos[r.id]}
              </svg>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="redes__fila">
          <Redes de="cfl" titulo="Seguinos en el CFL 402" />
          <Redes de="fundacion" titulo="Fundación UOCRA" />
        </div>
        {/* Enlace discreto a la página aparte de teléfonos de emergencia (emergencias.html). */}
        <a className="footer__enlace" href="emergencias.html">Teléfonos de emergencia</a>
        <span>© {ANIO} CFL 402 - Fundación UOCRA</span>
      </div>
    </footer>
  )
}
