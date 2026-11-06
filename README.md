# CFL 402 - Fundación UOCRA

Landing institucional del Centro de Formación Laboral 402 (Coronel Vidal - Mar Chiquita). Es una web solo frontend, instalable como app (PWA), hecha con Vite, React, TypeScript y CSS propio.

## Comandos

- `npm install`: instala las dependencias (solo la primera vez).
- `npm run dev`: servidor de desarrollo en http://localhost:5173/ (se actualiza solo al guardar).
- `npm run build`: genera la versión para publicar en la carpeta `dist/`.
- `npm run preview`: prueba la versión publicada (acá sí funciona el service worker y la instalación como app).

## Dónde se edita cada cosa

| Qué | Dónde |
|---|---|
| Cursos y carga horaria | `src/data/cursos.ts` |
| Fotos de los cursos | `src/assets/cursos/<id-del-curso>.jpg` |
| Docentes a cargo (nombre y referencias) | `src/data/docentes.ts` (foto opcional en `src/assets/docentes/`) |
| Autoridades | `src/data/autoridades.ts` (foto opcional en `src/assets/autoridades/`) |
| WhatsApp y redes sociales | `src/data/contacto.ts` |
| Guía de inscripción (plataforma IPFL) y aviso del DNI | `src/data/guiaIpfl.ts` |
| Mensaje automático de WhatsApp de la ficha | `src/components/Inscripcion.tsx` |
| Teléfonos de emergencia | `emergencias.html` (página aparte, un `<li>` por número) |
| Colores y diseño | `src/index.css` (los colores están como variables al principio) |
| Logo del CFL | `public/logo-cfl402.png` (una sola copia; también la usa la página de emergencias) |
| Logo de la Fundación | `src/assets/logo-fundacion-uocra.png` |
| Mapa | `src/components/Ubicacion.tsx` |

Todos los archivos tienen comentarios en español que explican qué hace cada parte.

## Para publicar

1. Correr `npm run build`.
2. Subir el contenido de `dist/` al hosting. Tiene que servirse por **HTTPS** para que se pueda instalar como app.
3. Si cambia la lógica del service worker (`public/sw.js`), subir su `VERSION` para que los usuarios reciban la versión nueva.
