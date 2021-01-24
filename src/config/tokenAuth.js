import clienteAxios from './axios';

const tokenAuth = token => {
  if (token) {
    clienteAxios.default.headers.common['x-auth-token'] = token
  }else{
    delete clienteAxios.default.headers.common['x-auth-token'];
  }
}

export default tokenAuth;
