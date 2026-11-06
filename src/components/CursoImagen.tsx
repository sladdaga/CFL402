// Imagen de cada tarjeta de curso: una foto si existe, o una ilustración dibujada en SVG.
import type { ReactNode } from 'react'

// Fotos opcionales: src/assets/cursos/<id>.(jpg|jpeg|png|webp)
// import.meta.glob carga en el armado todas las imágenes de esa carpeta (eager = de una vez). Si la carpeta está vacía, no hay fotos.
const fotos = import.meta.glob<string>('../assets/cursos/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})

// Busca una foto cuyo nombre (sin extensión) coincida con el id del curso.
function fotoDe(id: string) {
  const clave = Object.keys(fotos).find((k) => k.split('/').pop()?.split('.')[0] === id)
  return clave ? fotos[clave] : undefined
}

/** Ilustraciones minimalistas por curso (trazo azul + acento amarillo). */
// Dibujos SVG por id de curso. Las clases "acento" (relleno amarillo) y "acento-linea" (trazo amarillo) se definen en index.css.
const dibujos: Record<string, ReactNode> = {
  'liquidacion-impuestos': (
    <>
      <rect x="38" y="14" width="44" height="62" rx="6" />
      <path d="M48 28h24M48 38h24M48 48h10" />
      <circle cx="74" cy="62" r="14" className="acento" />
      <path d="M68 68l12-12" />
      <circle cx="69" cy="57" r="1.5" /><circle cx="79" cy="67" r="1.5" />
    </>
  ),
  'programacion-web': (
    <>
      <rect x="18" y="16" width="84" height="58" rx="7" />
      <path d="M18 30h84" />
      <circle cx="27" cy="23" r="2" className="acento" /><circle cx="35" cy="23" r="2" /><circle cx="43" cy="23" r="2" />
      <path d="M50 44l-10 9 10 9M70 44l10 9-10 9" />
      <path d="M62 42l-4 22" className="acento-linea" />
    </>
  ),
  'gasista-unifuncionales': (
    <>
      <path d="M60 14c4 14 20 20 20 40a20 20 0 0 1-40 0c0-10 6-14 10-22 3 6 6 8 10 8-2-8-2-16 0-26z" className="acento" />
      <path d="M60 46c3 7 9 10 9 18a9 9 0 0 1-18 0c0-5 4-8 9-18z" />
      <path d="M30 80h60" />
    </>
  ),
  'componentes-metalicos': (
    <>
      <path d="M26 24h68M26 72h68M60 24v48" />
      <path d="M26 24v10M94 24v10M26 62v10M94 62v10" />
      <circle cx="44" cy="48" r="3" className="acento" /><circle cx="76" cy="48" r="3" className="acento" />
      <path d="M92 10l4 8M100 14l-6 6M84 12l2 8" className="acento-linea" />
    </>
  ),
  'electricista-inmuebles': (
    <>
      <path d="M66 12L38 52h20l-4 28 28-42H62z" className="acento" />
      <path d="M22 70h14M84 22h14M90 58h8" />
    </>
  ),
  'administracion-pymes': (
    <>
      <path d="M22 78h76" />
      <rect x="30" y="50" width="14" height="28" rx="2" />
      <rect x="53" y="36" width="14" height="42" rx="2" className="acento" />
      <rect x="76" y="22" width="14" height="56" rx="2" />
      <path d="M30 34l20-12 18 8 24-16" />
    </>
  ),
}

// Si hay foto se muestra; si no, el SVG del curso (viewBox define su sistema de coordenadas, 120x90).
export default function CursoImagen({ id }: { id: string }) {
  const foto = fotoDe(id)
  if (foto) return <img className="card__foto" src={foto} alt="" loading="lazy" />
  return (
    <svg className="card__img" viewBox="0 0 120 90" aria-hidden="true">
      {dibujos[id]}
    </svg>
  )
}
