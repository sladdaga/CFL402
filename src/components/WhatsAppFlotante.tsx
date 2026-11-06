// Botón verde de WhatsApp fijo en pantalla (posición y estilo en la clase .wsp de index.css). Abre un chat con un mensaje de consulta precargado.
import { enlaceWhatsApp } from '../data/contacto'

export default function WhatsAppFlotante() {
  return (
    <a
      className="wsp"
      href={enlaceWhatsApp('Hola! Quiero consultar por los cursos del CFL 402.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
    >
      <svg viewBox="0 0 32 32" width="30" height="30" fill="#fff" aria-hidden="true">
        <path d="M16 3C9 3 3.3 8.6 3.3 15.5c0 2.3.6 4.4 1.7 6.3L3 29l7.4-1.9c1.8 1 3.800 1.500 5.600 1.500 7 0 12.700-5.600 12.700-12.500S23 3 16 3zm0 22.900c-1.800 0-3.500-.5-5-1.400l-.4-.2-4.400 1.100 1.200-4.200-.3-.4a10.300 10.300 0 0 1-1.600-5.500C5.500 9.800 10.200 5.200 16 5.200s10.500 4.600 10.500 10.300S21.800 25.900 16 25.900zm5.700-7.700c-.3-.2-1.900-.9-2.200-1-.3-.1-.5-.2-.7.200-.2.300-.8 1-1 1.200-.2.200-.4.200-.7.100-.3-.2-1.400-.5-2.600-1.600-1-.9-1.600-1.900-1.800-2.200-.2-.3 0-.5.100-.7l.5-.6c.2-.2.200-.3.300-.5.100-.2.100-.4 0-.6l-1-2.300c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.100-.9.400-.3.300-1.200 1.200-1.200 2.800s1.200 3.300 1.400 3.500c.2.200 2.400 3.700 5.800 5.100.8.400 1.500.6 2 .7.8.3 1.600.2 2.200.1.700-.1 1.900-.8 2.200-1.500.3-.8.3-1.400.2-1.500-.1-.2-.3-.3-.6-.4z"/>
      </svg>
    </a>
  )
}
