import React, { useReducer } from 'react'
import uuid from 'uuid/v4';

import proyectoContext from './proyectoContext'
import proyectoReducer from './proyectoReducer'
import { FORMULARIO_PROYECTO,
         OBTENER_PROYECTOS,
         AGREGAR_PROYECTO,
         VALIDAR_FORMULARIO,
         PROYECTO_ACTUAL,
         ELIMINAR_PROYECTO } from '../../types'

const ProyectoState = props => {

  const proyectos = [
      {id:1, nombre: 'Tienda Virtual'},
      {id:2,nombre: 'Intranet'},
      {id:3, nombre: 'Diseno de Sitio Web'}
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
  const obtenerProyectos = () => {
    dispatch({
      type: OBTENER_PROYECTOS,
      payload: proyectos
    })
  }

  //agregar nuevo proyecto
  const agregarProyecto = proyecto => {
    proyecto.id = uuid.v4

    //insertar el proyecto en el state
    dispatch({
      type: AGREGAR_PROYECTO,
      payload: proyecto
    })
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
