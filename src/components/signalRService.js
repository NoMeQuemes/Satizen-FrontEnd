import * as signalR from '@microsoft/signalr';
import {jwtDecode} from 'jwt-decode'; // Importa jwt-decode correctamente

let idAutor = null; // Variable para almacenar el nameidentifier
let connection;

// Función para obtener el token desde localStorage
const obtenerToken = async (timeout = 10000) => {
  const startTime = Date.now();
  while (!localStorage.getItem("token")) {
    if (Date.now() - startTime > timeout) {
      throw new Error("No se obtuvo el token dentro del tiempo permitido");
    }
    console.log("Esperando a que el token esté disponible...");
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  return localStorage.getItem("token");
};

// Función para inicializar la conexión de SignalR
const initializeSignalR = async () => {
  const token = await obtenerToken(); // Asegura que el token esté disponible antes de conectar

  // Decodificar el token para obtener el nameidentifier
  try {
    const decodedToken = jwtDecode(token);
    console.log("Contenido del token:", decodedToken);
    idAutor = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
  } catch (error) {
    console.error("Error al decodificar el token:", error);
  }

  // Crear y configurar la conexión
  connection = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:7298/chatHub', {
      accessTokenFactory: () => token
    })
    .configureLogging(signalR.LogLevel.Information)
    .build();

  // Iniciar la conexión
  startConnection();
};

// Función para intentar iniciar la conexión
const startConnection = async () => {
  if (connection.state === signalR.HubConnectionState.Disconnected) {
    try {
      await connection.start();
      console.log('Conexión SignalR establecida.');
    } catch (error) {
      console.error('Error al conectar con SignalR:', error);
      setTimeout(startConnection, 5000); // Reintentar en caso de error
    }
  } else {
    console.log('La conexión ya está establecida o en proceso.');
  }

  // Manejar eventos de cierre y reconexión
  connection.onclose(() => {
    console.warn("Conexión cerrada. Intentando reconectar...");
    startConnection();
  });

  connection.onreconnecting(() => {
    console.warn("Intentando reconectar...");
  });

  connection.onreconnected(() => {
    console.log("Reconexión exitosa.");
  });
};

// Función para enviar un mensaje privado
const sendPrivateMessage = async (userId, message) => {
  try {
    await connection.invoke('SendPrivateMessage', userId, message);
    console.log("Mensaje privado enviado a:", userId);
  } catch (error) {
    console.error("Error enviando mensaje privado:", error);
  }
};

// Función para enviar un mensaje a todos
const sendMessageToAll = async (message) => {
  try {
    await connection.invoke('SendMessage', message);
    console.log("Mensaje enviado a todos:", message);
  } catch (error) {
    console.error("Error enviando mensaje a todos:", error);
  }
};

// Exporta la conexión y las funciones, incluyendo idAutor
const getIdAutor = () => idAutor; // Función para obtener idAutor
export { initializeSignalR, sendPrivateMessage, sendMessageToAll, getIdAutor, startConnection, connection };
