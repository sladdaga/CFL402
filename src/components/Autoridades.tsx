// Sección Autoridades: tarjeta por cada persona de src/data/autoridades.ts.
import { autoridades } from '../data/autoridades'

// Carga en el armado las fotos de src/assets/autoridades (si hay).
const fotos = import.meta.glob<string>('../assets/autoridades/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})

// Busca la foto cuyo nombre (sin extensión) coincide con el id de la persona.
const fotoDe = (id: string) => {
  const k = Object.keys(fotos).find((f) => f.split('/').pop()?.split('.')[0] === id)
  return k ? fotos[k] : undefined
}

// Primeras letras de las dos primeras palabras del nombre (se usan si no hay foto).
const iniciales = (nombre: string) =>
  nombre.split(' ').map((p) => p[0]).slice(0, 2).join('')

export default function Autoridades() {
  return (
    <section id="autoridades" className="section">
      <div className="container">
        <h2>Autoridades</h2>
        <div className="autoridades">
          {autoridades.map((a) => {
            const foto = fotoDe(a.id)
            return (
              <article key={a.id} className="autoridad">
                {/* Con foto: se muestra la imagen; sin foto: un recuadro con las iniciales. */}
                {foto ? (
                  <img className="autoridad__foto" src={foto} alt="" loading="lazy" />
                ) : (
                  <div className="autoridad__foto autoridad__foto--iniciales" aria-hidden="true">
                    {iniciales(a.nombre)}
                  </div>
                )}
                <div>
                  <span className="hero__etiqueta">{a.cargo}</span>
                  <h3>{a.nombre}</h3>
                  <ul>
                    {a.referencias.map((r) => <li key={r}>{r}</li>)}
                  </ul>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
