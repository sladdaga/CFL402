// Sección Nosotros: identidad, historia, misión, visión, valores y perfil de los estudiantes.
// Los textos están en src/data/nosotros.ts; acá solo se arma el diseño.
import { identidad, historia, mision, vision, valores, perfilIntro, perfil } from '../data/nosotros'

export default function Nosotros() {
  const [historiaCorta, ...historiaLarga] = historia
  return (
    <section id="nosotros" className="section section--alt">
      <div className="container">
        <h2>Nosotros</h2>

        {/* Identidad institucional */}
        <div className="nosotros__texto">
          {identidad.map((p) => <p key={p}>{p}</p>)}
        </div>

        {/* Historia: el primer párrafo siempre visible, el resto se despliega con "Leer más". */}
        <h3 className="nosotros__titulo">Nuestra historia</h3>
        <div className="nosotros__texto">
          <p>{historiaCorta}</p>
          <details className="nosotros__mas">
            <summary>Leer más</summary>
            {historiaLarga.map((p) => <p key={p}>{p}</p>)}
          </details>
        </div>

        {/* Misión y visión: dos tarjetas (una debajo de la otra en celular). */}
        <div className="nosotros__par">
          <article className="etapa">
            <h3>Misión</h3>
            {mision.map((p) => <p key={p}>{p}</p>)}
          </article>
          <article className="etapa">
            <h3>Visión</h3>
            {vision.map((p) => <p key={p}>{p}</p>)}
          </article>
        </div>

        <h3 className="nosotros__titulo">Valores institucionales</h3>
        <ul className="nosotros__lista">
          {valores.map((v) => <li key={v}>{v}</li>)}
        </ul>

        <h3 className="nosotros__titulo">¿A quién está dirigido?</h3>
        <p>{perfilIntro}</p>
        <ul className="nosotros__lista">
          {perfil.map((p) => <li key={p}>{p}</li>)}
        </ul>
      </div>
    </section>
  )
}
