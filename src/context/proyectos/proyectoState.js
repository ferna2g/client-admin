import React, { useReducer } from 'react'

import proyectoContext from './proyectoContext'
import proyectoReducer from './proyectoReducer'
import { FORMULARIO_PROYECTO, OBTENER_PROYECTOS } from '../../types'

const ProyectoState = props => {

  const proyectos = [
      {id:1, nombre: 'Tienda Virtual'},
      {id:2,nombre: 'Intranet'},
      {id:3, nombre: 'Diseno de Sitio Web'}
  ]

  const initialState = {
    proyectos: [],
    formulario: false
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

  //nota: state se definen con una sola palabra y en minuscula,
  //las funciones se definen con dos palabras y la segunda en mayuscula

  return (
    <proyectoContext.Provider
        value={{
          proyectos: state.proyectos,
          formulario: state.formulario,
          mostrarFormulario,
          obtenerProyectos
        }}
    >
        {props.children}
    </proyectoContext.Provider>
  )
}

export default ProyectoState
