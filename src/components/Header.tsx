// Barra superior: logos del CFL y de la Fundación, y menú de navegación con anclas a cada sección.
import { useEffect, useState, type MouseEvent } from 'react'
import { comportamientoScroll } from '../utils/movimiento'
import logoUocra from '../assets/logo-fundacion-uocra.png'

// El logo del CFL vive en public/logo-cfl402.png (una sola copia, también la usan emergencias.html y el service worker).
const logoCfl = `${import.meta.env.BASE_URL}logo-cfl402.png`

// Items del menú: id es el id de la sección a la que lleva (debe coincidir con el id de la <section>).
const enlaces = [
  { id: 'cursos', texto: 'Cursos', emoji: '📚' },
  { id: 'inscripcion', texto: 'Inscripción', emoji: '📝' },
  { id: 'nosotros', texto: 'Nosotros', emoji: '🏫' },
  { id: 'autoridades', texto: 'Autoridades', emoji: '🏛️' },
  { id: 'ubicacion', texto: 'Ubicación', emoji: '📍' },
  // Último ítem: no es una sección de esta página sino un enlace a la página aparte con los teléfonos de emergencia.
  { id: 'emergencias', texto: 'Emergencias', emoji: '🚨', pagina: 'emergencias.html' },
]

// Lleva al principio de la página: cancela la navegación normal del enlace (que recargaría), sube con animación
// y borra el #seccion de la dirección. Si el enlace se abre en otra pestaña (clic medio o Ctrl+clic) funciona normal.
function irAlInicio(e: MouseEvent<HTMLAnchorElement>) {
  if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return
  e.preventDefault()
  window.scrollTo({ top: 0, behavior: comportamientoScroll() })
  history.replaceState(null, '', window.location.pathname + window.location.search)
}

export default function Header() {
  // Id de la sección que se está viendo; sirve para resaltar su enlace en el menú.
  const [activo, setActivo] = useState('')

  useEffect(() => {
    // Busca en la página las secciones del menú (descarta las que no existan).
    const secciones = enlaces
      .map((e) => document.getElementById(e.id))
      .filter((s): s is HTMLElement => s !== null)
    // IntersectionObserver avisa cuando una sección entra en pantalla. rootMargin recorta la zona de detección a una franja
    // angosta (entre el 35% y el 45% de la altura de la ventana), así se marca solo la sección que está en el centro.
    const obs = new IntersectionObserver(
      (entradas) => {
        const visible = entradas.find((e) => e.isIntersecting)
        if (visible) setActivo(visible.target.id)
      },
      { rootMargin: '-35% 0px -55% 0px' },
    )
    secciones.forEach((s) => obs.observe(s))
    // Al desmontar el componente se deja de observar.
    return () => obs.disconnect()
  }, [])

  return (
    <header className="header">
      <div className="container header__inner">
        {/* Los logos son enlaces al inicio: al tocarlos la página vuelve arriba con desplazamiento suave (sin recargar). */}
        <a href="./" onClick={irAlInicio} aria-label="Ir al inicio - CFL 402">
          <img src={logoCfl} width="87" height="84" alt="" className="header__logo" />
        </a>
        <nav className="nav" aria-label="Principal">
          {enlaces.map((e) => (
            <a
              key={e.id}
              href={e.pagina ?? `#${e.id}`}
              className={e.pagina ? 'nav__emergencia' : undefined}
              aria-current={activo === e.id ? 'true' : undefined}
            >
              {/* El emoji solo se muestra en celular (por CSS) y se oculta a lectores de pantalla. */}
              <span className="nav__emoji" aria-hidden="true">{e.emoji}</span>
              <span>{e.texto}</span>
            </a>
          ))}
        </nav>
        <a href="./" onClick={irAlInicio} aria-label="Ir al inicio - Fundación UOCRA">
          <img src={logoUocra} width="215" height="68" alt="" className="header__logo header__logo--uocra" />
        </a>
      </div>
    </header>
  )
}
