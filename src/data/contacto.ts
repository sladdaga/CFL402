// Datos de contacto compartidos por todo el sitio.
// Cómo editar: si cambia el número, actualizar WHATSAPP (sin formato) y WHATSAPP_VISIBLE (como se muestra en pantalla).
/** Número de WhatsApp en formato internacional, sin +, espacios ni guiones. */
export const WHATSAPP = '5492235521188'
export const WHATSAPP_VISIBLE = '+54 9 2235 52-1188'

// Arma el enlace de WhatsApp (wa.me); si se pasa un mensaje, lo codifica para la URL y queda precargado en el chat.
export const enlaceWhatsApp = (mensaje?: string) =>
  `https://wa.me/${WHATSAPP}${mensaje ? `?text=${encodeURIComponent(mensaje)}` : ''}`

// Redes sociales que se muestran en el pie de página. "de" indica a qué grupo pertenece: el CFL ("cfl") o la Fundación ("fundacion").
// Para agregar una red nueva, además hay que sumar su ícono en Footer.tsx (con el mismo id).
export interface RedSocial { id: string; nombre: string; url: string; de: 'cfl' | 'fundacion' }

export const redes: RedSocial[] = [
  { id: 'facebook', nombre: 'Facebook', url: 'https://www.facebook.com/people/CFL-Nro-402-Fundaci%C3%B3n-UOCRA-Mar-Chiquita/100063630833235/', de: 'cfl' },
  { id: 'instagram', nombre: 'Instagram', url: 'https://www.instagram.com/centrodeformacionlaboral402/', de: 'cfl' },
  { id: 'youtube', nombre: 'YouTube', url: 'https://www.youtube.com/user/FundacionUOCRA', de: 'fundacion' },
  { id: 'x', nombre: 'X (Twitter)', url: 'https://x.com/fundacionuocra', de: 'fundacion' },
]
