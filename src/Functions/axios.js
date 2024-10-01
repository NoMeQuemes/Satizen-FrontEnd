// src/axios.js

import axios from 'axios';


const axiosFunction = axios.create({
  // baseURL: 'http://www.satizen.somee.com/api/'
  baseURL: 'http://localhost:7298/api/'
})

// Este interceptor se ejecuta antes de que una solicitud salga del cliente. 
// Se verifica si hay un token almacenado en localStorage. Si existe, se añade al 
// encabezado Authorization de la solicitud como un Bearer token. 
// Esto es esencial para las APIs que requieren autenticación.

axiosFunction.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

//Este interceptor evalua si está valido el token, sino lo está, hace una solicitud a la API para
//generar un nuevo token usando el refreshToken



export default axiosFunction;