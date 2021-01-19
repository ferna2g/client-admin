import React, { useContext } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext';

const Tarea = ({tarea}) => {

  //extraer si un proyecto esta activo
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext

  //obtener la funcion del context de tarea
  const tareasContext = useContext(tareaContext)
  const { eliminarTarea, obtenerTareas, cambiarEstadoTarea } = tareasContext

  //extraer el proyecto
  const [proyectoActual] = proyecto;

//funcion que se ejecuta cuando el usuario presiona el boton de eleiminar tarea
  const tareaEliminar = id => {
    eliminarTarea(id);
    obtenerTareas(proyectoActual.id)
  }

  //funcion que modifica el estado de las tareas
  const cambiarEstado = tarea => {
    if (tarea.estado) {
      tarea.estado: false
    }else {
      tarea.estado: true
    }
    cambiarEstadoTarea(tarea);
  }

  return (
    <li className="tarea sombra">
      <p>{tarea.nombre}</p>

      <div className="estado">
        {tarea.estado
          ?
            (
              <button
                  type="button"
                  className="completo"
                  onClick={() => cambiarEstado(tarea)}
                >Completo</button>
            )
          :
            (
              <button
                  type="button"
                  className="incompleto"
                  onClick={() => cambiarEstado(tarea)}
                >Incompleto</button>
            )
        }
      </div>

      <div className="acciones">
          <button
                type="button"
                className="btn btn-primario"
            >Editar</button>

            <button
                  type="button"
                  className="btn btn-secundario"
                  onClick={() => tareaEliminar(tarea.id)}
              >Eliminarr</button>
      </div>
    </li>
  )
}

export default Tarea
