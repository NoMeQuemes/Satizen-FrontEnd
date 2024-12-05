import * as signalR from '@microsoft/signalr';
import { jwtDecode } from 'jwt-decode'; 

let idAutor = null; 
let connection;

// Función para inicializar la conexión de SignalR
const initializeSignalR = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("El token no está disponible en localStorage. Asegúrate de almacenarlo antes de inicializar SignalR.");
    return;
  }

  // Decodificar el token para obtener el nameidentifier
  try {
    const decodedToken = jwtDecode(token);
    console.log("Contenido del token:", decodedToken);
    idAutor = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return;
  }

  // Crear y configurar la conexión
  connection = new signalR.HubConnectionBuilder()
    .withUrl('http://localhost:7298/chatHub', {
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
const SendMessageToGroup = async (userId, message) => {
  try {
    await connection.invoke('SendMessageToGroup', userId, message);
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

const getIdAutor = () => idAutor; 
export { initializeSignalR, sendMessageToAll, SendMessageToGroup, getIdAutor, startConnection, connection };
