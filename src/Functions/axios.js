// src/axios.js

import axios from 'axios';
import router from '../router';


const axiosFunction = axios.create({
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

axiosFunction.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {

        const datosAcceso = {
          token: originalRequest.headers.Authorization,
          refreshToken: localStorage.getItem('refreshToken')
        }
        
        const response = await axiosFunction.post('Acceso/RefreshToken', datosAcceso);
        const newToken = response.data.token;

        localStorage.setItem('token', newToken); //Si la solicitud es exitosa se almacena el nuevo token en localStorage

        axiosFunction.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`; // Se actualiza los headers de las colicitudes con el nuevo token
        return axiosFunction(originalRequest);// La solicitud original se reenvía 

      } catch (err) {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        router.push({ name: 'login' });
      }
    }
    return Promise.reject(error);
  }
);




export default axiosFunction;