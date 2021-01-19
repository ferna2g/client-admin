import React, { useReducer } from 'react';
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';

import { TAREAS_PROYECTO,
          AGREGAR_TAREA,
          VALIDAR_TAREA
        } from '../../types'

const TareaState = props => {
  const initialState = {
    tareas: [
      { nombre: 'Elegir Plataforma', estado: true, proyectoId: 1},
      { nombre: 'Elegir Colores', estado: false, proyectoId: 2},
      { nombre: 'Elegir Pago', estado: false, proyectoId: 3},
      { nombre: 'Elegir Proyecto', estado: true, proyectoId: 2}
    ],
    tareasproyecto: null,
    errortarea: false
  }

  //crear el dispatch y state
  const [state, dispatch] = useReducer(TareaReducer, initialState);

  //crear las funciones


  //obtener las tareas de un proyecto
  const obtenerTareas = proyectoId => {
    dispatch({
      type: TAREAS_PROYECTO,
      payload: proyectoId
    })
  }

  //agregar una tarea al proyecto seleccionado
  const agregarTarea = tarea => {
    dispatch({
      type: AGREGAR_TAREA,
      payload: tarea
    })
  }

  //valida y muestra un error en caso sea necesario
  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA
    })
  }

  return (
    <TareaContext.Provider
        value={{
          tareas: state.tareas,
          tareasproyecto: state.tareasproyecto,
          errortarea: state.errortarea,
          obtenerTareas,
          agregarTarea,
          validarTarea
        }}
    >
        {props.children}
    </TareaContext.Provider>
  )
}

export default TareaState
