// Componente raíz: arma la página uniendo las secciones en orden. Para reordenar o quitar una sección, se edita la lista de abajo.
import Header from './components/Header'
import Hero from './components/Hero'
import Cursos from './components/Cursos'
import Inscripcion from './components/Inscripcion'
import GuiaIpfl from './components/GuiaIpfl'
import Nosotros from './components/Nosotros'
import Autoridades from './components/Autoridades'
import Ubicacion from './components/Ubicacion'
import Footer from './components/Footer'
import PopupInscripciones from './components/PopupInscripciones'
import WhatsAppFlotante from './components/WhatsAppFlotante'
import { useLayoutEffect } from 'react'
import { activarAparicion } from './utils/aparecerAlScroll'

export default function App() {
  // Activa la aparición animada de las secciones al hacer scroll (antes de que el navegador dibuje, para que no haya parpadeo).
  useLayoutEffect(() => activarAparicion(), [])

  return (
    <>
      {/* Barra superior de navegación (en celular la navegación pasa a una barra inferior). */}
      <Header />
      <main>
        {/* Secciones del contenido principal, en el orden en que se ven en la página. */}
        <Hero />
        <Cursos />
        <Inscripcion />
        <GuiaIpfl />
        <Nosotros />
        <Autoridades />
        <Ubicacion />
      </main>
      <Footer />
      {/* Elementos que flotan por encima de la página: botón de WhatsApp y ventana emergente de inscripciones. */}
      <WhatsAppFlotante />
      <PopupInscripciones />
    </>
  )
}
