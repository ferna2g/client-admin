import React, { Fragment, useState, useContext } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'

const NuevoProyecto = () => {

  //obtener el state del formulario
  const proyectosContext = useContext(proyectoContext)
  const { formulario } = proyectosContext

  //State para proyecto
  const [ proyecto, guardarProyecto ] = useState({
    nombre:''
  })

  //extraer nombre del proyecto
  const { nombre } = proyecto

  //Lee los contenidos del input
  const onChangeProyecto = e => {
    guardarProyecto({
      ...proyecto,
      [e.target.name] : e.target.value
    })
  }

  //Cuando el usuario envia un proyecto
  const onSubmitProyecto = e => {
    e.preventDefault()
  }

  return (
    <Fragment>
        <button
            type="button"
            className="btn btn-block btn-primario"
        >Nuevo Proyecto</button>

        {
          formulario
          ?
          (
          <form className="formulario-nuevo-proyecto"
                onSubmit={onChangeProyecto}>
            <input
                type="text"
                className="input-text"
                placeholder="Nombre Proyecto"
                name="nombre"
                value={nombre}
                onChange={onChangeProyecto}
             />
             <input
                type="submit"
                className="btn btn-block btn-primario"
                value="Agregar Proyecto"
                />
          </form>
        )
          :
          null
        }
  </Fragment>
  )
}

export default NuevoProyecto
