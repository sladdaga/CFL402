// Ventana emergente de "Inscripciones" que aparece al entrar al sitio, una vez por sesión de navegación.
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

// Logo del CFL: archivo único en public/logo-cfl402.png.
const logoCfl = `${import.meta.env.BASE_URL}logo-cfl402.png`

// Clave con la que se recuerda en sessionStorage que el popup ya se mostró (se borra al cerrar la pestaña).
const CLAVE = 'cfl402-popup-inscripciones-2027'

// try/catch: algunos navegadores bloquean el almacenamiento; en ese caso se considera "no visto".
function yaVisto() {
  try {
    return sessionStorage.getItem(CLAVE) !== null
  } catch {
    return false
  }
}

function marcarVisto() {
  try {
    sessionStorage.setItem(CLAVE, '1')
  } catch {
    /* almacenamiento bloqueado: se mostrará de nuevo en la próxima carga */
  }
}

// Selector de los elementos que pueden recibir foco con el teclado (para mantener el foco dentro de la ventana).
const FOCUSABLES = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default function PopupInscripciones() {
  // Arranca abierto solo si todavía no se vio en esta sesión.
  const [abierto, setAbierto] = useState(() => !yaVisto())
  const dialogo = useRef<HTMLDivElement>(null)

  // Recuerda que ya se vio y lo cierra.
  const cerrar = useCallback(() => {
    marcarVisto()
    setAbierto(false)
  }, [])

  useEffect(() => {
    // Mientras está abierto: se guarda el elemento enfocado, se bloquea el resto de la página (inert), se enfoca el diálogo,
    // Escape lo cierra y Tab/Shift+Tab ciclan entre sus elementos (accesibilidad).
    if (!abierto) return
    const previo = document.activeElement as HTMLElement | null
    const raiz = document.getElementById('root')
    raiz?.setAttribute('inert', '')
    dialogo.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return cerrar()
      if (e.key !== 'Tab' || !dialogo.current) return
      const items = Array.from(dialogo.current.querySelectorAll<HTMLElement>(FOCUSABLES))
      if (items.length === 0) return
      const primero = items[0]
      const ultimo = items[items.length - 1]
      if (e.shiftKey && document.activeElement === primero) {
        e.preventDefault()
        ultimo.focus()
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault()
        primero.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    // Limpieza al cerrar: se quita el listener, se reactiva la página y se devuelve el foco a donde estaba.
    return () => {
      window.removeEventListener('keydown', onKey)
      raiz?.removeAttribute('inert')
      previo?.focus?.()
    }
  }, [abierto, cerrar])

  // createPortal dibuja el popup directamente en <body>, fuera de #root (que queda inert mientras está abierto).
  if (!abierto) return null

  // Un clic en el fondo oscuro cierra; el diálogo detiene la propagación para que los clics dentro no lo cierren.
  return createPortal(
    <div className="popup__overlay" onClick={cerrar}>
      <div
        ref={dialogo}
        tabIndex={-1}
        className="popup"
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-titulo"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="popup__cerrar" onClick={cerrar} aria-label="Cerrar">×</button>
        <div className="popup__imagen">
          <img src={logoCfl} width="200" height="193" alt="" />
        </div>
        <div className="popup__contenido">
          <span className="popup__etiqueta">Formación profesional</span>
          <h2 id="popup-titulo">Inscripciones 2027</h2>
          <p>Ya están abiertas las inscripciones en el Centro de Formación Laboral 402.</p>
          <a className="btn" href="#cursos" onClick={cerrar}>Ver oferta educativa</a>
        </div>
      </div>
    </div>,
    document.body,
  )
}
