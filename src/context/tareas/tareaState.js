import React, { useReducer } from 'react';
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';

const TareaState = props => {
  const initialState = {
    tareas: [
      { nombre: 'Elegir Plataforma', estado: true, proyectoId: 1},
      { nombre: 'Elegir Colores', estado: false, proyectoId: 2},
      { nombre: 'Elegir Pago', estado: false, proyectoId: 3},
      { nombre: 'Elegir Proyecto', estado: true, proyectoId: 2}
    ],
  }

  //crear el dispatch y state
  const [state, dispatch] = useReducer(TareaReducer, initialState);

  return (
    <TareaContext.Provider
        value={{
          tareas: state.tareas
        }}
    >
        {props.children}
    </TareaContext.Provider>
  )
}

export default TareaState
