import React, { useReducer } from 'react'

import proyectoContext from './proyectoContext'
import proyectoReducer from './proyectoReducer'
import { FORMULARIO_PROYECTO } from '../../types'

const ProyectoState = props => {
  const initialState = {
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

  //nota: state se definen con una sola palabra y en minuscula,
  //las funciones se definen con dos palabras y la segunda en mayuscula

  return (
    <proyectoContext.Provider
        value={{
          formulario: state.formulario,
          mostrarFormulario
        }}
    >
        {props.children}
    </proyectoContext.Provider>
  )
}

export default ProyectoState
