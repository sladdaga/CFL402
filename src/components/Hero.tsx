// Portada: título, texto de presentación, botones de acción e ilustración.
import ilustracion from '../assets/formacion-tecnologia.svg'

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__texto">
          <span className="hero__etiqueta">Inscripciones 2027</span>
          <h1>
            Formación laboral para <span className="hero__destacado">construir futuro</span>
          </h1>
          <p>
            Cursos de oficios, tecnología y gestión en el Centro de Formación Laboral 402,
            Coronel Vidal - Mar Chiquita.
          </p>
          <div className="hero__acciones">
            <a className="btn" href="#inscripcion">Inscribirme</a>
            <a className="btn btn--link" href="#cursos">Ver cursos →</a>
          </div>
        </div>
        <img
          className="hero__imagen"
          src={ilustracion}
          alt="Formación laboral en construcción con incorporación de tecnología"
        />
      </div>
    </section>
  )
}
