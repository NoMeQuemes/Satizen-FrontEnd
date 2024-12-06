<template>
  <div>

    <input type="text" v-model="idReceptor" placeholder="ID del receptor" />
    <input type="text" v-model="idAutor" placeholder="ID del receptor" />
    <button @click="fetchInvitados">Iniciar sesión</button>
    <button @click="disconnect">Desconectarse</button>

    <button v-if="userCount > 0" class="user-count-button">
      Usuarios conectados: {{ userCount }}
    </button>


    <ul>
      <li v-for="user in connectedUsers" :key="user.userId">
        <button @click="seleccionarUsuario(user.userId)" class="user-button">
          {{ user.nombre }} (ID: {{ user.userId }})
          <span v-if="user.userId === idAutor"> - Tú</span>
        </button>
      </li>
    </ul>

    <div v-if="nombre">
      <p>Conectado como: {{ nombre }}</p>
    </div>

    <!-- Listado de usuarios conectados -->
    <ul>
      <li v-for="user in connectedUsers" :key="user.userId">
        <span :class="{ 'yo': user.userId === idAutor }">
          {{ user.nombre }} (ID: {{ user.userId }})
          <span v-if="user.userId === idAutor"> - Tú</span>
        </span>
      </li>
    </ul>

    <div class="chat-view">
      <div class="chat-header">
        <div v-if="nombre">
          <p>Conectado como: {{ nombre }}:{{ idAutor }}</p>
        </div>
        <h4 v-if="nombreReceptor">{{ nombreReceptor }}</h4>
      </div>


      <div class="group-chat">
        <div class="chat-messages" style="max-height: 300px; overflow-y: auto;">
          <div v-for="lm in listarMensajes" :key="lm.id" :class="messageClass(lm)">
            <div class="message-content">
              <h3>{{ lm.contenidoMensaje }}</h3>
            </div>
            <div class="message-time">{{ lm.timestamp }}</div>
          </div>
        </div>
      </div>

      <!-- Chat privado -->
      <div class="private-chat">
        <div class="chat-messages" style="max-height: 300px; overflow-y: auto;">
        </div>
        <div class="chat-input">
          <input type="text" v-model="newMessage" placeholder="Escribe un mensaje privado..." />
          <button @click="EnviarMensajePrivado">Enviar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { initializeSignalR, sendMessageToAll, SendMessageToGroup, connection } from '@/components/signalRService.js';
import { useDecodeJwT } from '@/store/decodeJwt';
import axios from 'axios';

export default {
  name: 'MyComponent',
  setup() {
    const listarMensajes = ref([]);
    const idAutor = ref('');
    const idReceptor = ref('');
    const newMessage = ref('');
    const newGroupMessage = ref('');
    const nombreReceptor = ref('');
    const decodeJwt = ref(useDecodeJwT());
    const nombre = ref('');
    const connectedUsers = ref([]);
    const userCount = ref(0); // Número de usuarios conectados

    const fetchInvitados = async (usuarioId2) => {
      const response = await axios.get(`https://satizenapi20241206024632.azurewebsites.net/Mensajes/EntreUsuarios/${idAutor.value}/${usuarioId2}`);
      // const response = await axios.get(`https://satizen.somee.com/api/Mensajes/EntreUsuarios/${idAutor.value}/${usuarioId2}`);
      console.log("Esto se ejecutó", response.data);
    };

    const seleccionarUsuario = async (idUsuario) => {
      console.log("usuarioId", idUsuario);
      idReceptor.value = idUsuario;
      console.log("idReceptor.value", idReceptor.value);
      const usuarioId2 = parseInt(idUsuario, 10);
      joinGroup(idAutor.value, usuarioId2);
      await fetchMensajesAntiguos(usuarioId2);
    };

    const fetchMensajesAntiguos = async (usuarioId2) => {
      try {
        const response = await axios.get(`https://satizenapi20241206024632.azurewebsites.net/Mensajes/EntreUsuarios/${idAutor.value}/${usuarioId2}`);
        // const response = await axios.get(`https://satizen.somee.com/api/Mensajes/EntreUsuarios/${idAutor.value}/${usuarioId2}`);
        console.log("Mensajes antiguos:", response.data);

        listarMensajes.value = response.data.map((mensaje) => ({
          idAutor: mensaje.idAutor,
          idReceptor: mensaje.idReceptor,
          contenidoMensaje: mensaje.contenidoMensaje,
          timestamp: new Date(mensaje.timestamp).toLocaleTimeString(), // Formatear para el frontend
        }));
      } catch (error) {
        console.error("Error al obtener mensajes antiguos:", error);
      }
    };

    const probar = () => {
      if (decodeJwt.value && decodeJwt.value.dataUser) {
        idAutor.value = parseInt(decodeJwt.value.dataUser.idUsuario);
        nombre.value = decodeJwt.value.dataUser.nombreUsuario;
        console.log("ID:", idAutor.value);
        console.log("Nombre:", nombre.value);
      } else {
        console.error("No se pudo obtener el ID o el nombre del usuario.");
      }
    };

    const disconnect = async () => {
      try {
        if (connection) {
          // Llama al método del servidor para manejar la desconexión
          await connection.invoke("Disconnect");
          console.log("Desconexión del servidor exitosa.");

          // Detén la conexión de SignalR
          await connection.stop();
          console.log("Conexión de SignalR detenida.");

          // Limpia los datos locales en el cliente
          connectedUsers.value = [];
          listarMensajes.value = [];
          idAutor.value = '';
          idReceptor.value = '';
          nombre.value = '';

          console.log("Datos locales limpiados. Usuario desconectado.");
        }
      } catch (error) {
        console.error("Error durante la desconexión:", error);
      }
    };




    const EnviarMensajePrivado = async () => {
      if (idReceptor.value && newMessage.value.trim()) {
        await SendMessageToGroup(idReceptor.value, newMessage.value);
        const mensaje = {
          idAutor: idAutor.value, // Asegúrate de que este valor esté asignado correctamente
          idReceptor: idReceptor.value,
          contenidoMensaje: newMessage.value,
          timestamp: new Date().toISOString(), // Formato ISO para el backend
        };

        try {
          // Realiza la solicitud POST al endpoint especificado
          // const response = await axios.post('https://satizen.somee.com/api/Mensajes', mensaje, {
          const response = await axios.post('https://satizenapi20241206024632.azurewebsites.net/api/Mensajes', mensaje, {
            headers: { 'Content-Type': 'application/json' },
          });

          console.log("Mensaje enviado desde el endpoint:", response.data);

          listarMensajes.value.push({
            ...mensaje,
            timestamp: new Date().toLocaleTimeString(),
          });

          newMessage.value = '';
        } catch (error) {
          console.error("Error enviando mensaje privado:", error);
        }
      } else {
        console.warn("Debes seleccionar un receptor y escribir un mensaje.");
      }
    };


    const joinGroup = async (idAutor, idReceptor) => {
      try {
        console.log("joinGroup", idAutor, idReceptor);
        // Invoca el método del servidor pasándole idAutor e idReceptor
        await connection.invoke('JoinGroup', idAutor, idReceptor);
        console.log(`Te has unido al grupo con ID: ${idAutor}-${idReceptor}`);
      } catch (error) {
        console.error(`Error al unirse al grupo ${idAutor}-${idReceptor}:`, error);
      }
    };

    const EnviarMensajeGrupal = async () => {
      if (newGroupMessage.value.trim()) {
        try {
          await sendMessageToAll(newGroupMessage.value);
          listarMensajes.value.push({
            idAutor: idAutor.value,
            contenidoMensaje: newGroupMessage.value,
            timestamp: new Date().toLocaleTimeString(),
          });
          newGroupMessage.value = '';
        } catch (error) {
          console.error("Error enviando mensaje grupal:", error);
        }
      } else {
        console.warn("Debes escribir un mensaje grupal.");
      }
    };

    const messageClass = (mensaje) => {
      return mensaje.idAutor === idAutor.value ? 'mensaje-derecha' : 'mensaje-izquierda';
    };

    const setupConnectionHandlers = () => {
      connection.on('ReceiveMessage', (userId, contenidoMensaje) => {
        listarMensajes.value.push({
          idAutor: userId,
          contenidoMensaje,
          timestamp: new Date().toLocaleTimeString(),
        });
      });

      connection.on('ReceivePrivateMessage', (userId, contenidoMensaje) => {
        listarMensajes.value.push({
          idAutor: userId,
          contenidoMensaje,
          timestamp: new Date().toLocaleTimeString(),
        });
      });

      connection.on('GroupJoined', (groupId) => {
        console.log(`Confirmación desde el servidor: te has unido al grupo ${groupId}`);
      });

      // Manejar mensajes recibidos en un grupo
      connection.on("ReceiveGroupMessage", (senderId, message) => {

        listarMensajes.value.push({
          idAutor: senderId,
          contenidoMensaje: message,
          timestamp: new Date().toLocaleTimeString(),
        });
        console.log(`Mensaje recibido de ${senderId}:`, message);
      });

      connection.on('NotifyMessageReceived', (senderId) => {
        console.log(`Has recibido un mensaje de ${senderId}`);
        // Aquí puedes agregar lógica para mostrar una notificación visual o alerta
        alert(`¡Nuevo mensaje de ${senderId}!`);
      });

      connection.on('UpdateConnectedUsers', (users) => {
        connectedUsers.value = users;
        console.log("connectedUsers")
      });

      connection.on('UpdateUserCount', (count) => {
        userCount.value = count; // Actualiza el número de usuarios conectados
      });
    };

    onMounted(() => {
      initializeSignalR()
        .then(() => {
          console.log('Conexión establecida');
          probar();
          setupConnectionHandlers();

          // Manejador para cerrar la conexión cuando se cierre la ventana
          window.addEventListener('beforeunload', handleBeforeUnload);
        })
        .catch(err => console.error('Error al iniciar la conexión:', err));
    });

    onBeforeUnmount(() => {
      disconnect();
      window.removeEventListener('beforeunload', handleBeforeUnload); // Limpieza
    });


    const handleBeforeUnload = () => {
      disconnect();
      console.log("Conexión cerrada debido al cierre de la ventana.");
    };

    return {
      listarMensajes,
      idAutor,
      idReceptor,
      newMessage,
      newGroupMessage,
      EnviarMensajePrivado,
      EnviarMensajeGrupal,
      messageClass,
      nombre,
      joinGroup,
      nombreReceptor,
      connectedUsers,
      disconnect,
      fetchInvitados,
      seleccionarUsuario,
      userCount, // Exponer el número de usuarios conectados
    };
  },
};
</script>
<style scoped>
.chat-messages {
  max-height: 300px;
  /* Puedes ajustar el valor dependiendo de lo que necesites */
  overflow-y: auto;
  /* Hace que los mensajes puedan desplazarse si exceden el tamaño */
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
}

.yo {
  font-weight: bold;
  color: green;
}

.chat-view {
  width: 50%;
  display: flex;
  flex-direction: column;
  border-radius: 30px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.9);
  position: fixed;
  top: 120px;
  bottom: 40px;
  left: 600px;
  background-color: white;
}

.chat-header {
  padding: 20px;
  background-color: #f4f4f4;
  border-bottom: 1px solid #ccc;
}

.chat-messages {
  padding: 20px;
  flex-grow: 1;
  overflow-y: auto;
}

.mensaje-izquierda {
  text-align: left;
  background-color: #e0f7fa;
  padding: 10px;
  border-radius: 10px;
  margin: 10px;
  max-width: 70%;
  align-self: flex-start;
  word-wrap: break-word;
}

.mensaje-derecha {
  text-align: right;
  background-color: #fce4ec;
  padding: 10px;
  border-radius: 10px;
  margin: 10px;
  max-width: 70%;
  align-self: flex-end;
  word-wrap: break-word;
}

.message-time {
  font-size: 0.8em;
  color: gray;
  text-align: right;
  margin-top: 5px;
}

.chat-input {
  display: flex;
  padding: 10px;
  background-color: #f4f4f4;
}

.chat-input input {
  flex-grow: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
}

.chat-input button {
  background-color: #54e2e2;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  margin-left: 10px;
}
</style>