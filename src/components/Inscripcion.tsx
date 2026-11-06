import { useState, type ChangeEvent, type FormEvent } from 'react'
import { cursos } from '../data/cursos'
import { enlaceWhatsApp, WHATSAPP_VISIBLE } from '../data/contacto'
import { REQUISITO_DNI } from '../data/guiaIpfl'

// Formulario de inscripción: no guarda nada en un servidor; arma un mensaje y abre WhatsApp con el texto listo para enviar.
interface Datos { nombre: string; apellido: string; localidad: string; email: string; curso: string }
const vacio: Datos = { nombre: '', apellido: '', localidad: '', email: '', curso: '' }
// Patrón que exige al menos un carácter que no sea espacio.
const NO_VACIO = '.*\\S.*' // rechaza campos de solo espacios

export default function Inscripcion() {
  // datos: lo que el usuario va escribiendo; enviado: indica si se debe mostrar el aviso de éxito.
  const [datos, setDatos] = useState<Datos>(vacio)
  const [enviado, setEnviado] = useState(false)

  // Devuelve un manejador para cada campo: actualiza solo ese campo y oculta el aviso de éxito anterior.
  const cambiar = (campo: keyof Datos) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEnviado(false)
    setDatos((d) => ({ ...d, [campo]: e.target.value }))
  }

  // Al enviar: evita recargar la página, arma el mensaje con los datos, abre WhatsApp en otra pestaña (noopener evita que esa pestaña controle esta) y limpia el formulario.
  const enviar = (e: FormEvent) => {
    e.preventDefault()
    const mensaje =
      `Hola Maria! Quiero inscribirme al curso "${datos.curso}" (Inscripciones 2027 - CFL 402).\n` +
      `Mi nombre es: ${datos.nombre.trim()} ${datos.apellido.trim()}\n` +
      `Soy de la localidad de: ${datos.localidad.trim()}\n` +
      `Mi Email es: ${datos.email.trim()}`
    window.open(enlaceWhatsApp(mensaje), '_blank', 'noopener,noreferrer')
    setDatos(vacio)
    setEnviado(true)
  }

  return (
    <section id="inscripcion" className="section section--alt">
      <div className="container">
        <h2>Ficha de inscripción 2027</h2>
        <p className="form__intro">
          Completá tus datos y se abrirá WhatsApp con el mensaje listo para enviar al {WHATSAPP_VISIBLE}.
        </p>
        {/* required, maxLength y pattern son validaciones nativas del navegador; autoComplete ayuda a autocompletar los datos. */}
        <form className="form" onSubmit={enviar}>
          <label>Nombre *
            <input required maxLength={60} pattern={NO_VACIO} value={datos.nombre} onChange={cambiar('nombre')} autoComplete="given-name" />
          </label>
          <label>Apellido *
            <input required maxLength={60} pattern={NO_VACIO} value={datos.apellido} onChange={cambiar('apellido')} autoComplete="family-name" />
          </label>
          <label>Localidad *
            <input required maxLength={60} pattern={NO_VACIO} value={datos.localidad} onChange={cambiar('localidad')} autoComplete="address-level2" />
          </label>
          <label>Email *
            <input required type="email" maxLength={100} value={datos.email} onChange={cambiar('email')} autoComplete="email" />
          </label>
          <label className="form__full">Curso *
            {/* Las opciones salen de src/data/cursos.ts; el valor enviado es el título del curso. */}
            <select required value={datos.curso} onChange={cambiar('curso')}>
              <option value="">Elegí un curso…</option>
              {cursos.map((c) => <option key={c.id} value={c.titulo}>{c.titulo}</option>)}
            </select>
          </label>
          <button type="submit" className="btn form__full">Enviar inscripción por WhatsApp</button>
          <p className="requisito form__full">
            <strong>Importante:</strong> {REQUISITO_DNI}
          </p>
          <p className="form__nota">
            Tus datos se envían por WhatsApp al centro y se usan solo para gestionar tu inscripción.
          </p>
          {enviado && (
            <p className="form__ok" role="status">
              Se abrió WhatsApp con tu mensaje. Recordá enviarlo para completar la inscripción.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
