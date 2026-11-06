// Sección Ubicación: mapa de Google Maps incrustado. Para cambiar el lugar, reemplazar la dirección "src" del iframe (Google Maps > Compartir > Insertar mapa).
export default function Ubicacion() {
  return (
    <section id="ubicacion" className="section">
      <div className="container">
        <h2>Ubicación</h2>
        {/* Atributos de seguridad y rendimiento del mapa: sandbox limita lo que puede hacer el contenido externo, loading="lazy" lo carga al acercarse, referrerPolicy limita la información que se envía a Google. */}
        <iframe
          title="Mapa del Centro de Formación Laboral 402"
          className="map"
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          referrerPolicy="strict-origin-when-cross-origin"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3167.6121918578324!2d-57.7314686!3d-37.4462652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959ae1cc2f02c0d7%3A0x139f55ae5a969f12!2sCentro%20de%20Formaci%C3%B3n%20Laboral%20402%20-%20UOCRA%20-%20Mar%20Chiquita!5e0!3m2!1ses!2sar!4v1793981807475!5m2!1ses!2sar"
        />
      </div>
    </section>
  )
}
