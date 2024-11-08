import axios from "axios";
import router from "../router";




const axiosFunction = axios.create({
   baseURL: 'https://www.satizen.somee.com/api/'
  // baseURL: "http://localhost:7298/api/",  
});

// Este interceptor se ejecuta antes de que una solicitud salga del cliente.
// Se verifica si hay un token almacenado en localStorage. Si existe, se añade al
// encabezado Authorization de la solicitud como un Bearer token.
// Esto es esencial para las APIs que requieren autenticación.

axiosFunction.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

//Este interceptor evalua si está valido el token, sino lo está, hace una solicitud a la API para
//generar un nuevo token usando el refreshToken

axiosFunction.interceptors.response.use(
  (response) => {
    return response; // Si la solicitud HTTP es correcta simplemente la devuelve tal cual
  },
  async (error) => {
    const originalRequest = error.config; // Acá se guarda la configuración original de la solicitud que falló (URL, método, los headers y los datos de la solicitud)

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        //En este bloque se obtiene el refreshToken almacenado en el localStorage y se envía una
        //solicitud al servidor para obtener un nuevo token de acceso
        const credenciales = {
          token: localStorage.getItem("token"),
          refreshToken: localStorage.getItem("refreshToken")
        }
        // const response = await axios.post("http://localhost:7298/api/Acceso/RefreshToken", credenciales
          const response = await axios.post("https://www.satizen.somee.com/api/Acceso/RefreshToken", credenciales
        );
        const newToken = response.data.token;
        const newRefreshToken = response.data.refreshToken;

        localStorage.setItem("token", newToken); //Si la solicitud es exitosa se almacena el nuevo token en localStorage
        localStorage.setItem("refreshToken", newRefreshToken);

        axiosFunction.defaults.headers.common[ "Authorization" ] = `Bearer ${newToken}`;

        originalRequest.headers["Authorization"] = `Bearer ${newToken}`; // Se actualiza los headers de las solicitudes con el nuevo token
        return axiosFunction(originalRequest); // La solicitud original se reenvía
      } catch (err) {
        //Si hay un error al renovar el token (por ejemplo si el refrehToken también a expirado)
        //se eliminan ambos tokens del localStorage y se rediríge al usuario al login
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        router.push({ name: "login" });
      }
    }

    return Promise.reject(error);
  }
);

export default axiosFunction;
