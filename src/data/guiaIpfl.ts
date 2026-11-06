// Contenido de la sección "Cómo se realiza la inscripción" (guía de la Plataforma IPFL).
// PLATAFORMA_IPFL: dirección a la que lleva el botón "Ir a la Plataforma IPFL".
export const PLATAFORMA_IPFL = 'https://cursosipfl.trabajo.gba.gob.ar/'

// Aviso que se muestra en la guía y en el formulario de inscripción.
export const REQUISITO_DNI = 'Al momento de concretar la inscripción, deben llevar al centro una fotocopia del DNI.'

// Cada etapa tiene un id único, un título, un resumen y una lista de pasos (se numeran solos).
export interface Etapa {
  id: string
  titulo: string
  resumen: string
  pasos: string[]
}

// Cómo editar: para cambiar un paso, editar su texto; para agregar o quitar pasos o etapas, sumar o borrar líneas respetando las comillas y las comas.
// Las flechas entre etapas se generan solas.
/** Los textos entre «comillas» se muestran resaltados (nombres de botones u opciones). */
export const etapas: Etapa[] = [
  {
    id: 'registro',
    titulo: 'Registrar al estudiante',
    resumen: 'Alta de los datos personales en la plataforma.',
    pasos: [
      'Ingresar a la Plataforma IPFL.',
      'Ir a Administración de usuarios → Estudiantes.',
      'Presionar «Nuevo».',
      'Completar los datos personales.',
      'Validar RENAPER y correo.',
      'Presionar «Registrar».',
    ],
  },
  {
    id: 'preinscripcion',
    titulo: 'Preinscribir al curso',
    resumen: 'Asociar al estudiante registrado con el curso elegido.',
    pasos: [
      'Volver a Inicio.',
      'Buscar el curso correspondiente.',
      'Presionar «Preinscripción de Estudiante».',
      'Buscar al estudiante registrado.',
      'Seleccionar «Opción».',
      'Confirmar presionando «Aceptar».',
    ],
  },
  {
    id: 'confirmacion',
    titulo: 'Confirmar la inscripción',
    resumen: 'Cambiar el estado de la preinscripción a confirmada.',
    pasos: [
      'Ir a Administración → Planificación.',
      'Buscar el curso.',
      'Seleccionar «Inscripciones del estudiante» (tercera opción).',
      'Buscar y marcar al estudiante.',
      'En Estado, elegir «Inscripción confirmada».',
      'Presionar «Guardar».',
      'Confirmar la operación con «Aceptar».',
    ],
  },
]
