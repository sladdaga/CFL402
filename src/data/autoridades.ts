// Personas que se muestran en la sección Autoridades.
// Cómo editar: agregar otro objeto a la lista "autoridades" con id único, nombre, cargo y referencias (cada referencia es un punto de la lista).
// La foto es opcional: guardarla como src/assets/autoridades/<id>.jpg; si no existe, se muestran las iniciales.
export interface Autoridad {
  id: string
  nombre: string
  cargo: string
  /** Foto opcional: guardar en src/assets/autoridades/<id>.jpg */
  referencias: string[]
}

export const autoridades: Autoridad[] = [
  {
    id: 'pablo-laurenti',
    nombre: 'Pablo Laurenti',
    cargo: 'Director',
    referencias: [
      'Arquitecto en el sector privado.',
      'Profesor en la escuela secundaria ISSE de Coronel Vidal.',
      'Ayudante adscripto en la cátedra de Construcciones 2, Taller Vertical del Arq. Jorge Barroso, Facultad de Arquitectura.',
      'Colaborador en un proyecto de investigación del P.I.T. Maderas, Facultad de Arquitectura.',
    ],
  },
]
