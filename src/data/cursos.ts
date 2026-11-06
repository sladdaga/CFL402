// Lista de cursos que se muestra en la sección Cursos y en el desplegable del formulario.
// Cómo editar: para agregar un curso, sumar una línea más a la lista "cursos" con un id único (en minúsculas y con guiones);
// para quitarlo, borrar su línea; para cambiar textos, editar titulo y descripcion.
// Opcional: foto en src/assets/cursos/<id>.jpg (si no hay, se usa la ilustración de CursoImagen.tsx).
export interface Curso {
  id: string
  titulo: string
  descripcion: string
  /** Carga horaria en horas; undefined = a definir */
  cargaHoraria?: number
}

export const cursos: Curso[] = [
  { id: 'liquidacion-impuestos', titulo: 'Liquidación de Impuestos', descripcion: 'Cálculo y presentación de obligaciones impositivas.', cargaHoraria: 100 },
  { id: 'programacion-web', titulo: 'Programación Web', descripcion: 'Desarrollo de sitios y aplicaciones web.', cargaHoraria: 308 },
  { id: 'gasista-unifuncionales', titulo: 'Gasista de Unidades Unifuncionales', descripcion: 'Instalación de gas en unidades unifuncionales.', cargaHoraria: 607 },
  { id: 'componentes-metalicos', titulo: 'Armador/a y Montador/a de Componentes Metálicos Livianos', descripcion: 'Armado y montaje de estructuras metálicas livianas.', cargaHoraria: 360 },
  { id: 'electricista-inmuebles', titulo: 'Electricista en Inmuebles', descripcion: 'Instalaciones eléctricas domiciliarias y seguridad.', cargaHoraria: 660 },
  { id: 'administracion-pymes', titulo: 'Administración de Pymes', descripcion: 'Gestión administrativa y contable de pequeñas empresas.', cargaHoraria: 350 },
]
