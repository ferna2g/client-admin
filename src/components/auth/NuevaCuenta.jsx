import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alertaContext';

const Login = () => {

  //extraer los valores del context
  const alertaContext = useContext(AlertaContext);
  const {alerta, mostrarAlerta} = alertaContext

  //State para iniciar sesion
  const [ usuario, guardarUsuario ] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmar: ''
  })

  //extraer de usuario
  const { nombre, email, password, confirmar } = usuario;

  const onChange = e => {
      guardarUsuario({
        ...usuario,
        [e.target.name] : e.target.value
      })
  }

  //Cuando el usuario quiere iniciar sesion
  const onSubmit = e => {
    e.preventDefault();

    //validar que no haya campos vacios
    if (nombre.trim() === '' ||
        nombre.trim() === '' ||
        password.trim() === '' ||
        confirmar.trim() === '') {
        mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
    }

    // password minimo de 6 caracteres


    //los 2 passwords son iguales


  }

  return(
    <div className="form-usuario">
        { alerta ? (<div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>) : null}
        <div className="contenedor-form sombra-dark">
            <h1>Crear Cuenta</h1>

            <form
                onSubmit={onSubmit}
            >
            <div className="campo-form">
                <label htmlFor="nombre">Nombre</label>
                <input type="text"
                       id="nombre"
                       name="nombre"
                       value={nombre}
                       placeholder="Nombre"
                       onChange={onChange}
                       />
              </div>
              <div className="campo-form">
                  <label htmlFor="email">Email</label>
                  <input type="email"
                         id="email"
                         name="email"
                         value={email}
                         placeholder="Correo Electronico"
                         onChange={onChange}
                         />
              </div>
              <div className="campo-form">
                  <label htmlFor="password">Contrasena</label>
                  <input type="password"
                         id="password"
                         name="password"
                         value={password}
                         placeholder="Contrasena"
                         onChange={onChange}
                        />
                </div>
                <div className="campo-form">
                    <label htmlFor="confirmar">Confirmar Contrasena</label>
                    <input type="password"
                           id="confirmar"
                           name="confirmar"
                           value={confirmar}
                           placeholder="Confirmar Contrasena"
                           onChange={onChange}
                          />
                  </div>
                <div className="campo-form">
                    <input type="submit" className="btn btn-primario btn-block"
                    value="Registrarme" />
                </div>
            </form>

            <Link to={'/'} className="enlace-cuenta">
              Iniciar Sesion
            </Link>
        </div>
    </div>
  )
}

export default Login
