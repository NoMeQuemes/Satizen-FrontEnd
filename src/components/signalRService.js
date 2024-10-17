import * as signalR from '@microsoft/signalr';

// Crea una instancia de la conexión SignalR
const connection = new signalR.HubConnectionBuilder()
  .withUrl('https://localhost:7298/chatHub') // Reemplaza con la URL de tu hub SignalR
  .configureLogging(signalR.LogLevel.Information)
  .build();
  

// Función para iniciar la conexión
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
};

// Función para unirse a un grupo
const joinGroup = async (idAutor, idReceptor) => {
  try {
    await connection.invoke('JoinGroup', idAutor, idReceptor);
    console.log(`Unido al grupo ${idAutor}-${idReceptor}`);
  } catch (error) {
    console.error('Error al unirse al grupo:', error);
  }
};

 
const leaveGroup = async (idAutor, idReceptor) => {
  try {
    await connection.invoke('LeaveGroup', idAutor, idReceptor);
    console.log(`Salido del grupo ${idAutor}-${idReceptor}`);
  } catch (error) {
    console.error('Error al salir del grupo:', error);
  }
};

// Exporta la conexión y las funciones
export { connection, startConnection, joinGroup, leaveGroup };
