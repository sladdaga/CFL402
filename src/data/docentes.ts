// Docentes a cargo de cada curso (se muestran en la ventana que abre el botón "Ver docente a cargo").
// Cómo cargar un docente: agregar una entrada cuya clave sea el id del curso (el mismo de src/data/cursos.ts):
//
//   'programacion-web': {
//     nombre: 'Nombre Apellido',
//     referencias: ['Primera referencia.', 'Segunda referencia.'],
//   },
//
// Foto (opcional): guardarla en src/assets/docentes/<id-del-curso>.jpg (por ejemplo programacion-web.jpg).
// Si un curso todavía no tiene docente cargado, la ventana muestra un aviso de que la información se publicará pronto.
export interface Docente {
  nombre: string
  referencias: string[]
}

export const docentes: Record<string, Docente> = {
  // Pendiente de cargar: las referencias de cada instructor.
}
