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
      console.log(respuesta);

      disptach({
        type: REGISTRO_EXITOSO
      })
    } catch (e) {
      console.log(e);

      disptach({
        type: REGISTRO_ERROR
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
