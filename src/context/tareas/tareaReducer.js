import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA
} from '../../types'

export default (state, action) => {
  switch (action.type) {
    case TAREAS_PROYECTO:
      return {
        ...state,
        tareasproyecto: state.tareas.filter(tarea => tareas.proyectoId === action.payload)
      }

    case AGREGAR_TAREA:
      ...state,
      tareas: [...state.tareas, action.payload]
    default:
        return state;
  }
}
