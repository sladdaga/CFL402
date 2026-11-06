// Sección Cursos: una tarjeta por cada curso de src/data/cursos.ts (para cambiar los cursos se edita ese archivo).
import { useState } from 'react'
import { cursos, type Curso } from '../data/cursos'
import CursoImagen from './CursoImagen'
import DocenteVentana from './DocenteVentana'

export default function Cursos() {
  // Curso cuyo docente se está viendo en la ventana emergente (null = ventana cerrada).
  const [elegido, setElegido] = useState<Curso | null>(null)

  return (
    <section id="cursos" className="section">
      <div className="container">
        <h2>Cursos</h2>
        <div className="grid">
          {cursos.map((c, i) => (
            <article key={c.id} className="card">
              <CursoImagen id={c.id} />
              {/* Número correlativo con dos cifras (01, 02, ...). */}
              <span className="card__num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{c.titulo}</h3>
              <p>{c.descripcion}</p>
              {/* Si el curso no tiene cargaHoraria cargada, muestra "a definir". */}
              <small>Carga horaria: {c.cargaHoraria ? `${c.cargaHoraria} hs` : 'a definir'}</small>
              {/* Abre la ventana con la foto y las referencias del docente (datos en src/data/docentes.ts). */}
              <button
                type="button"
                className="card__docente"
                onClick={() => setElegido(c)}
                aria-haspopup="dialog"
                aria-label={`Ver docente a cargo de ${c.titulo}`}
              >
                Ver docente a cargo
              </button>
            </article>
          ))}
        </div>
      </div>

      {/* Una sola ventana compartida por todos los cursos: muestra los datos del curso elegido. */}
      <DocenteVentana curso={elegido} onCerrar={() => setElegido(null)} />
    </section>
  )
}
