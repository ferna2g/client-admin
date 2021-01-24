import React, { useReducer } from 'react';
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';

import { TAREAS_PROYECTO,
          AGREGAR_TAREA,
          VALIDAR_TAREA,
          ELIMINAR_TAREA,
          ESTADO_TAREA,
          TAREA_ACTUAL,
          ACTUALIZAR_TAREA,
          LIMPIAR_TAREA
        } from '../../types'

import clienteAxios from '../../config/axios'

const TareaState = props => {
  const initialState = {
    tareas: [

    ],
    tareasproyecto: [],
    errortarea: false,
    tareaseleccionada: null
  }

  //crear el dispatch y state
  const [state, dispatch] = useReducer(TareaReducer, initialState);

  //crear las funciones


  //obtener las tareas de un proyecto
  const obtenerTareas = async proyecto => {

    try {
      const resultado = await clienteAxios.get('/api/tareas', {params: {proyecto}})
      console.log(resultado);
      dispatch({
        type: TAREAS_PROYECTO,
        payload: resultado.data.tareas
      })
    } catch (e) {
      console.log(e);
    }
  }

  //agregar una tarea al proyecto seleccionado
  const agregarTarea = async tarea => {

    try {
      const resultado = await clienteAxios.post('/api/tareas', tarea)
      console.log(resultado);
      dispatch({
        type: AGREGAR_TAREA,
        payload: tarea
      })

    } catch (e) {
      console.log(e);
    }
}

  //valida y muestra un error en caso sea necesario
  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA
    })
  }

  //eliminar tarea por id
  const eliminarTarea = async (id, proyecto) => {

    try {
      await clienteAxios.delete(`/api/tareas/${id}`, {params: {proyecto}})
      dispatch({
        type: ELIMINAR_TAREA,
        payload: id
      })

    } catch (e) {
      console.log(e);
    }
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

  //elimina la tareaseleccionada
  const limpiarTarea = () => {
    dispatch({
      type: LIMPIAR_TAREA
    })
  }

  return (
    <TareaContext.Provider
        value={{
          tareasproyecto: state.tareasproyecto,
          errortarea: state.errortarea,
          tareaseleccionada: state.tareaseleccionada,
          obtenerTareas,
          agregarTarea,
          validarTarea,
          eliminarTarea,
          cambiarEstadoTarea,
          guardarTareaActual,
          actualizarTarea,
          limpiarTarea
        }}
    >
        {props.children}
    </TareaContext.Provider>
  )
}

export default TareaState
