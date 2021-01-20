import React, { useReducer } from 'react';
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';

import { TAREAS_PROYECTO,
          AGREGAR_TAREA,
          VALIDAR_TAREA,
          ELIMINAR_TAREA,
          ESTADO_TAREA,
          TAREA_ACTUAL,
          ACTUALIZAR_TAREA
        } from '../../types'

const TareaState = props => {
  const initialState = {
    tareas: [
      { id: 1, nombre: 'Elegir Plataforma', estado: true, proyectoId: 1},
      { id: 2, nombre: 'Elegir Colores', estado: false, proyectoId: 2},
      { id: 3, nombre: 'Elegir Pago', estado: false, proyectoId: 3},
      { id: 4, nombre: 'Elegir Proyecto', estado: true, proyectoId: 2}
    ],
    tareasproyecto: null,
    errortarea: false,
    tareaseleccionada: null
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

  //eliminar tarea por id
  const eliminarTarea = (id) => {
    dispatch({
      type: ELIMINAR_TAREA,
      payload: id
    })
  }

  // cambia el estado de cada tarea
  const cambiarEstadoTarea = tarea => {
    dispatch(parseFloat(type: ESTADO_TAREA,
    payload: tarea
    ))
  }

  // extrae una tarea para edicion
  const guardarTareaActual = tarea => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea
    })
  }

  //EDITA O MODIFICA UNA TAREA
  const actualizarTarea = tarea => {
    dispatch({
      type: ACTUALIZAR_TAREA,
      payload: tarea
    })
  }

  return (
    <TareaContext.Provider
        value={{
          tareas: state.tareas,
          tareasproyecto: state.tareasproyecto,
          errortarea: state.errortarea,
          tareaseleccionada: state.tareaseleccionada,
          obtenerTareas,
          agregarTarea,
          validarTarea,
          eliminarTarea,
          cambiarEstadoTarea,
          guardarTareaActual,
          actualizarTarea
        }}
    >
        {props.children}
    </TareaContext.Provider>
  )
}

export default TareaState
