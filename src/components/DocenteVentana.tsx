// Ventana emergente con la foto y las referencias del docente a cargo de un curso.
// Usa el elemento <dialog> del navegador: bloquea el fondo, atrapa el foco, se cierra con Esc y devuelve el foco al botón que la abrió.
import { useEffect, useRef } from 'react'
import type { Curso } from '../data/cursos'
import { docentes } from '../data/docentes'

// Fotos opcionales: src/assets/docentes/<id-del-curso>.(jpg|jpeg|png|webp)
const fotos = import.meta.glob<string>('../assets/docentes/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})

// Busca la foto cuyo nombre (sin extensión) coincide con el id del curso.
function fotoDe(id: string) {
  const clave = Object.keys(fotos).find((f) => f.split('/').pop()?.split('.')[0] === id)
  return clave ? fotos[clave] : undefined
}

// Primeras letras de las dos primeras palabras del nombre (se usan si no hay foto).
const iniciales = (nombre: string) => nombre.split(' ').map((p) => p[0]).slice(0, 2).join('')

interface Props {
  curso: Curso | null // curso elegido; null = ventana cerrada
  onCerrar: () => void
}

export default function DocenteVentana({ curso, onCerrar }: Props) {
  const ventana = useRef<HTMLDialogElement>(null)

  // Abre o cierra el <dialog> según haya un curso elegido.
  useEffect(() => {
    const el = ventana.current
    if (!el) return
    if (curso && !el.open) el.showModal()
    if (!curso && el.open) el.close()
  }, [curso])

  const docente = curso ? docentes[curso.id] : undefined
  const foto = curso ? fotoDe(curso.id) : undefined

  return (
    <dialog
      ref={ventana}
      className="docente"
      aria-labelledby="docente-titulo"
      // "close" se dispara también al apretar Esc: así el estado de React siempre queda sincronizado.
      onClose={onCerrar}
      // Un clic en el fondo oscuro (el propio <dialog>, fuera del contenido) cierra la ventana.
      onClick={(e) => {
        if (e.target === ventana.current) ventana.current?.close()
      }}
    >
      {curso && (
        <div className="docente__contenido">
          <button type="button" className="docente__cerrar" onClick={() => ventana.current?.close()} aria-label="Cerrar">
            ×
          </button>

          {/* Con foto: se muestra la imagen; sin foto: un círculo con las iniciales o, si no hay docente cargado, con un signo de pregunta. */}
          {foto ? (
            <img className="docente__foto" src={foto} alt="" />
          ) : (
            <div className="docente__foto docente__foto--iniciales" aria-hidden="true">
              {docente ? iniciales(docente.nombre) : '?'}
            </div>
          )}

          <span className="hero__etiqueta">Docente a cargo</span>
          <h2 id="docente-titulo">{docente ? docente.nombre : 'Información próximamente'}</h2>
          <p className="docente__curso">{curso.titulo}</p>

          {docente ? (
            <ul className="docente__referencias">
              {docente.referencias.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          ) : (
            <p>Pronto vas a poder ver acá la información del docente a cargo de este curso.</p>
          )}
        </div>
      )}
    </dialog>
  )
}
