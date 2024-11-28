<template>
  <div>
    <!-- Inputs para ID del autor y receptor manual -->
    <input type="text" v-model="idReceptor" placeholder="ID del receptor" />
    <input type="text" v-model="idAutor" placeholder="ID del receptor" />
    <button @click="fetchInvitados">Iniciar sesión</button>
    <button @click="disconnect">Desconectarse</button>

    <div v-if="userCount > 0">
      <p>Usuarios conectados: {{ userCount }}</p>
    </div>

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

      <!-- Chat grupal -->
      <div class="group-chat">
        <h3>Chat Grupal</h3>
        <div class="chat-messages" style="max-height: 300px; overflow-y: auto;">
          <div v-for="lm in listarMensajes" :key="lm.id" :class="messageClass(lm)">
            <div class="message-content">
              <h3>{{ lm.contenidoMensaje }}</h3>
            </div>
            <p>{{ lm.visto ? "visto" : "" }}</p>
            <div class="message-time">{{ lm.timestamp }}</div>
          </div>
        </div>
        <div class="chat-input">
          <input type="text" v-model="newGroupMessage" placeholder="Escribe un mensaje grupal..." />
          <button @click="EnviarMensajeGrupal">Enviar</button>
        </div>
      </div>

      <div class="private-chat">
        <h3>Chat Privado</h3>
        <div class="chat-messages" style="max-height: 300px; overflow-y: auto;">
          <!-- Puedes agregar aquí también el chat privado si lo deseas -->
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
import { initializeSignalR, sendPrivateMessage, sendMessageToAll, connection } from '@/components/signalRService.js';
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

    const fetchInvitados = async () => {
      const response = await axios.get('http://localhost:7298/api/Mensajes/EntreUsuarios/3/2');
      console.log("Esto se ejecutó", response.data);
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
      if (connection) {
        await connection.stop();
        console.log("Desconectado");
        connectedUsers.value = [];
        listarMensajes.value = [];
        idAutor.value = '';
        idReceptor.value = '';
        nombre.value = '';
      }
    };

    const EnviarMensajePrivado = async () => {
      if (idReceptor.value && newMessage.value.trim()) {
        try {
          await sendPrivateMessage(idReceptor.value, newMessage.value);
          listarMensajes.value.push({
            idAutor: idAutor.value,
            contenidoMensaje: newMessage.value,
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

      connection.on('UpdateConnectedUsers', (users) => {
        connectedUsers.value = users;
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
        })
        .catch(err => console.error('Error al iniciar la conexión:', err));
    });

    onBeforeUnmount(() => {
      disconnect();
    });

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
      nombreReceptor,
      connectedUsers,
      disconnect,
      fetchInvitados,
      userCount, // Exponer el número de usuarios conectados
    };
  },
};
</script>

<style scoped>

.chat-messages {
  max-height: 300px; /* Puedes ajustar el valor dependiendo de lo que necesites */
  overflow-y: auto;  /* Hace que los mensajes puedan desplazarse si exceden el tamaño */
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