import React, { useReducer } from 'react'


import proyectoContext from './proyectoContext'
import proyectoReducer from './proyectoReducer'
import { FORMULARIO_PROYECTO,
         OBTENER_PROYECTOS,
         AGREGAR_PROYECTO,
         VALIDAR_FORMULARIO,
         PROYECTO_ACTUAL,
         ELIMINAR_PROYECTO } from '../../types'

import clienteAxios from '../../config/axios';

const ProyectoState = props => {

  const proyectos = [

  ]

  const initialState = {
    proyectos: [],
    formulario: false,
    errorformulario: false,
    proyecto: null
  }

  //Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(proyectoReducer, initialState)

  //serie de funciones para el crud
  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO
    })
  }

  //obtener los proyectos
  const obtenerProyectos = async () => {
      try {
        const resultado = await clienteAxios.get('/api/proyectos');
        console.log(resultado.data);
        dispatch({
          type: OBTENER_PROYECTOS,
          payload: resultado.data.peoyectos
        })
      } catch (e) {
        console.log(e);
      }
  }

  //agregar nuevo proyecto
  const agregarProyecto = async proyecto => {

    try {
      const resultado = await clienteAxios.post('/api/proyectos', proyecto)
      console.log(resultado);
      //insertar el proyecto en el state
      dispatch({
        type: AGREGAR_PROYECTO,
        payload: resultado.data
      })
    } catch (e) {
      console.log(e);
    }
  }

  //valida el formulario por erroes
  const mostrarError = () => {
    dispatch({
      type: VALIDAR_FORMULARIO
    })
  }

  //seleccionar el proyecto al que el usuario dio click
  const proyectoActual = proyectoId => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: proyectoId
    })
  }

  //elimina un proyecto
  const eliminarProyecto = proyectoId => {
    dispatch({
      type: ELIMINAR_PROYECTO,
      payload: proyectoId
    })
  }

  //nota: state se definen con una sola palabra y en minuscula,
  //las funciones se definen con dos palabras y la segunda en mayuscula

  return (
    <proyectoContext.Provider
        value={{
          proyectos: state.proyectos,
          formulario: state.formulario,
          errorformulario: state.errorformulario,
          proyecto: state.proyecto,
          mostrarFormulario,
          obtenerProyectos,
          agregarProyecto,
          mostrarError,
          proyectoActual,
          eliminarProyecto
        }}
    >
        {props.children}
    </proyectoContext.Provider>
  )
}

export default ProyectoState
