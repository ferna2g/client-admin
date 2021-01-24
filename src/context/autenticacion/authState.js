import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

import clienteAxios from '../../config/axios';

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
        msg: error.response.data.msg,
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
      //funcion para enviar el token por header TODO
    }

    try {
      const respuesta = await clienteAxios.get('/api/auth');
      console.log(respuesta);
    } catch (e) {
        console.log(e);
        disptach({
          type: LOGIN_ERROR
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
          registrarUsuario
        }}
      >{props.children}
      </AuthContext>
    }

}

export default AuthState;
