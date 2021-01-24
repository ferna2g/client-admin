import {
        REGISTRO_EXITOSO,
        REGISTRO_ERROR,
        OBTENER_USUARIO,
        LOGIN_EXITOSO,
        LOGIN_ERROR,
        CERRAR_SESION
      } from '../../types';

export default (state, action) => {
    switch(action.type) {

      case LOGIN_EXITOSO:
      case REGISTRO_EXITOSO:
        localStorage.setItem('token', action.payload.token)
        return {
          ...state,
          autenticado: true,
          mensaje: null
        }

      case OBTENER_USUARIO:
      return {
        ...state,
        autenticado: true,
        usuario: action.payload
      }

      case REGISTRO_ERROR:
        return {
          ...state,
          token: null,
          mensaje: action.payload
        }

      case CERRAR_SESION:
      case LOGIN_ERROR:
        localStorage.removeItem('token');
        return {
          ...state,
          token: null,
          usuario: null,
          autenticado: null,
          mensaje: action.payload
        }

      default:
          return state;
    }
}
