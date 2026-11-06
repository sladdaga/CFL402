// Sección con la guía de inscripción en la Plataforma IPFL. El contenido se edita en src/data/guiaIpfl.ts.
import { Fragment, useRef, useState } from 'react'
import { etapas, PLATAFORMA_IPFL, REQUISITO_DNI } from '../data/guiaIpfl'
import { comportamientoScroll } from '../utils/movimiento'

/** Resalta los textos entre «comillas». */
// Divide el texto en partes; las que van entre «comillas» se muestran en negrita (nombres de botones u opciones). Se conservan las comillas.
function conResaltado(texto: string) {
  return texto.split(/(«[^»]+»)/g).map((parte, i) =>
    parte.startsWith('«') ? <strong key={i}>{parte}</strong> : <Fragment key={i}>{parte}</Fragment>,
  )
}

export default function GuiaIpfl() {
  // pista: la lista de etapas (en celular funciona como carrusel); actual: etapa visible, para marcar el punto activo.
  const pista = useRef<HTMLOListElement>(null)
  const [actual, setActual] = useState(0)

  // Espacio que el CSS reserva a la izquierda (scroll-padding): las tarjetas se enganchan a esa distancia del borde.
  // La posición de scroll de una tarjeta es su offsetLeft (medido desde la pista, que es position: relative) menos ese espacio.
  const margenIzquierdo = (el: HTMLElement) => parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0

  // Al deslizar, busca la tarjeta más cercana al borde izquierdo y marca su punto.
  const alDeslizar = () => {
    const el = pista.current
    if (!el) return
    const tarjetas = Array.from(el.querySelectorAll<HTMLElement>('.etapa'))
    let mejor = 0
    let distancia = Infinity
    tarjetas.forEach((t, i) => {
      const d = Math.abs(t.offsetLeft - margenIzquierdo(el) - el.scrollLeft)
      if (d < distancia) {
        distancia = d
        mejor = i
      }
    })
    setActual(mejor)
  }

  // Al tocar un punto, desliza el carrusel hasta esa etapa.
  const irA = (i: number) => {
    const el = pista.current
    const tarjeta = el?.querySelectorAll<HTMLElement>('.etapa')[i]
    if (el && tarjeta) el.scrollTo({ left: tarjeta.offsetLeft - margenIzquierdo(el), behavior: comportamientoScroll() })
  }

  return (
    <section id="guia" className="section">
      <div className="container">
        <span className="hero__etiqueta">Plataforma oficial</span>
        <h2>Cómo se realiza la inscripción</h2>
        <p className="form__intro">
          Guía rápida del Ministerio de Trabajo para el registro, la preinscripción y la inscripción de
          estudiantes en la Plataforma IPFL.
        </p>

        {/* Una tarjeta por etapa; entre una y otra se agrega una flecha (menos después de la última). */}
        {/* tabIndex={0}: en celular la lista se desplaza, y así también se puede mover con el teclado (flechas izquierda y derecha). */}
        <ol className="flujo" aria-label="Etapas de la inscripción" ref={pista} onScroll={alDeslizar} tabIndex={0}>
          {etapas.map((etapa, i) => (
            <Fragment key={etapa.id}>
              <li className="etapa">
                <div className="etapa__cabecera">
                  <span className="etapa__num" aria-hidden="true">{i + 1}</span>
                  <div>
                    <span className="etapa__rotulo">Etapa {i + 1}</span>
                    <h3>{etapa.titulo}</h3>
                  </div>
                </div>
                <p className="etapa__resumen">{etapa.resumen}</p>
                <ol className="pasos">
                  {etapa.pasos.map((paso) => (
                    <li key={paso}>{conResaltado(paso)}</li>
                  ))}
                </ol>
              </li>
              {i < etapas.length - 1 && <li className="flujo__flecha" aria-hidden="true">→</li>}
            </Fragment>
          ))}
        </ol>

        {/* Puntos del carrusel: solo se ven en celular (en computadora se ocultan por CSS). */}
        <div className="flujo__puntos" role="group" aria-label="Elegir etapa">
          {etapas.map((etapa, i) => (
            <button
              key={etapa.id}
              type="button"
              className="flujo__punto"
              aria-label={`Ir a la etapa ${i + 1}: ${etapa.titulo}`}
              aria-current={actual === i ? 'true' : undefined}
              onClick={() => irA(i)}
            />
          ))}
        </div>

        {/* Aviso destacado con el requisito del DNI. */}
        <aside className="requisito" role="note">
          <strong>Importante:</strong> {REQUISITO_DNI}
        </aside>

        <a className="btn guia__boton" href={PLATAFORMA_IPFL} target="_blank" rel="noopener noreferrer">
          Ir a la Plataforma IPFL
        </a>
      </div>
    </section>
  )
}
