import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth'

import {
        REGISTRO_EXITOSO,
        REGISTRO_ERROR,
        OBTENER_USUARIO,
        LOGIN_EXITOSO,
        LOGIN_ERROR,
        CERRAR_SESION
} from '../../types';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'), //almacenamos el token en localstorage
    autenticado: null,
    usuario: null,
    mensaje: null
  }

  const [state, disptach] = useReducer(AuthReducer, initialState);

  //las funciones
  const registrarUsuario = async datos => {
    try {
      const respuesta = await clienteAxios.post('/api/usuarios', datos);
      console.log(respuesta.data);

      disptach({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data
      });

      //obtener el usuario
      usuarioAutenticado();
    } catch (e) {
      console.log(e.response.data.msg);

      const alerta = {
        msg: e.response.data.msg,
        categoria: 'alerta-error'
      }
      disptach({
        type: REGISTRO_ERROR,
        payload: alerta
      })
    }
  }

  //retorna el usuario autenticado
  const usuarioAutenticado = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      //TODO: funcion para enviar el token por header
      tokenAuth(token);
    }

    try {
      const respuesta = await clienteAxios.get('/api/auth');
      console.log(respuesta);

      disptach({
        type: OBTENER_USUARIO,
        payload: respuesta.data.usuario
      })
    } catch (e) {
        console.log(e.response);
        disptach({
          type: LOGIN_ERROR
        })
    }
  }

  // cuando el usuario inicia sesion
  const iniciarSesion = async datos => {
    try {
      const respuesta = await clienteAxios.post('/api/auth', datos);
      console.log(respuesta);

      disptach({
        type: LOGIN_EXITOSO,
        payload: respuesta.data
      })

      // obtener el usuario
      usuarioAutenticado()
      
    } catch (error) {
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'alerta-error'
      }

      disptach({
        type: LOGIN_ERROR,
        payload: alerta
      })
    }
  }

    return {
      <AuthContext.Provider
        value={{
          token: state.token,
          autenticado: state.autenticado,
          usuario: state.usuario,
          mensaje: state.mensaje,
          registrarUsuario,
          iniciarSesion
        }}
      >{props.children}
      </AuthContext>
    }

}

export default AuthState;
