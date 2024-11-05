<template>
  <div>
    <input type="hidden" required v-model="idAutor" id="idAutor" />
    <input type="hidden" required v-model="idReceptor" id="idReceptor" />
  
    <ChatList @usuario-seleccionado="onUsuarioSeleccionado" />
  
    <button @click="leaveChat">
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48">
        <g fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"><path d="M36 8H9C7.34315 8 6 9.34315 6 11V39C6 40.6569 7.34315 42 9 42H39C40.6569 42 42 40.6569 42 39V25V18" /><path d="M32.2427 12.4854L36.4853 8.24271L32.2427 4.00007" /><path d="M24 17V34" /><path d="M32 24V34" /><path d="M16 24V34" />
        </g>
      </svg>
    </button>
    <ChatList @usuario-seleccionado="onUsuarioSeleccionado"/>
  </div>

  <div class="chat-view">
    <div class="chat-header">
      <div v-if="nombreReceptor">
        <h4>{{ nombreReceptor }} </h4>
      </div>
    </div>
    <div class="chat-messages">
      <div v-for="lm in listarMensajes" :key="lm.id" :class="messageClass(lm)">
        <div class="message-content">
          <h3>{{ lm.contenidoMensaje }}</h3>
        </div>
        <p>{{ lm.visto ? "visto" : "" }}</p>
        <div class="message-time">{{ lm.timestamp }}</div>
      </div>
    </div>
    <div class="chat-input">
      <input type="text" v-model="newMessage" placeholder="Escribe un mensaje..." />
      <button @click="EnviarMensajes"> 
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="1.2em" viewBox="1 3 19 19">
          <path fill="currentColor" d="M2.01 21L23 12L2.01 3L2 10l15 2l-15 2z"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import ChatList from '@/components/ChatList';
import { connection, startConnection, joinGroup, leaveGroup } from '@/components/signalRService.js';
import axios from 'axios';
import { useDecodeJwT } from '@/store/decodeJwt';

export default {
  name: 'MyComponent',
  components: {
    ChatList,
  },
  setup() {
    const listarMensajes = ref([]);
    const idAutor = ref('');
    const idReceptor = ref('');
    const nombreReceptor = ref('');
    const newMessage = ref('');
    const activarWatch = ref(false);
    const enGrupo = ref(false);
    const mensajeNuevo = ref(false);
    const userCount = ref(0);
    let intervalId = null;
    const decodeJwt = ref(useDecodeJwT());

    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('https://localhost:7298/api/Usuarios/ListarUsuarios');
        return response.data.resultado || [];
      } catch (error) {
        console.error('Hubo un error al obtener los usuarios!', error);
      }
    };

    const fetchMessages = async () => {
      try {   
        const response = await axios.get(
          `https://localhost:7298/api/Mensajes/EntreUsuarios/${idAutor.value}/${idReceptor.value}`
        );
        listarMensajes.value = response.data;
      } catch (error) {
        console.error("Error al obtener mensajes:", error);
      }
    };

    const EnviarMensajes = async () => {
      await axios.post('https://localhost:7298/api/Mensajes', {
        idAutor: idAutor.value,
        idReceptor: idReceptor.value,
        contenidoMensaje: newMessage.value,
        timestamp: new Date().toLocaleTimeString(),
        visto: false,
      });

      newMessage.value = '';
    };

    const router = useRouter();

    const leaveChat = async () => {
      activarWatch.value = false;
      enGrupo.value = false;
      await leaveGroup(idAutor.value, idReceptor.value);
      listarMensajes.value = [];
      idReceptor.value = '';
      nombreReceptor.value = '';
      router.push({ name: 'home' });
    };

    const probar = () => {
      idAutor.value = parseInt(decodeJwt.value.dataUser.idUsuario, 10);
    };

    const onUsuarioSeleccionado = async (idUsuario, nombreUsuario) => {
      if (idReceptor.value === idUsuario) {
        return; // No hacer nada si ya estamos en el chat con este usuario
      }

      nombreReceptor.value = nombreUsuario;
      idReceptor.value = idUsuario;

      await joinGroup(idAutor.value, idReceptor.value);

      // Establecer el estado para activar la visualización de mensajes
      activarWatch.value = true;
      await fetchMessages();
    };

    const messageClass = (mensaje) => {
      return mensaje.idAutor === idAutor.value ? 'mensaje-derecha' : 'mensaje-izquierda';
    };

    const iniciarVerificacionMensajesLoop = () => {
      intervalId = setInterval(async () => {
        if (activarWatch.value) {
          await fetchMessages();
        }
        if (userCount.value === 2 && activarWatch.value) {
          await fetchMessages();
        }
      }, 900);
    };

    onMounted(() => {
      startConnection();
      fetchUsuarios();
      probar();

      connection.on('UpdateGroupCount', (count) => {
        userCount.value = count;
      });

      iniciarVerificacionMensajesLoop();

      // Escuchar el evento `beforeunload` para cuando el usuario cierre la pestaña o ventana
      window.addEventListener('beforeunload', leaveChat);

      // Escuchar el evento `visibilitychange` para cuando la página pierda visibilidad
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          leaveChat();
        }
      });
    });

    onBeforeUnmount(() => {
      // Limpiar el intervalo
      if (intervalId) {
        clearInterval(intervalId);
      }

      // Limpiar los eventos antes de que el componente se destruya
      window.removeEventListener('beforeunload', leaveChat);
      document.removeEventListener('visibilitychange', leaveChat);
    });

    return {
      listarMensajes,
      idAutor,
      idReceptor,
      nombreReceptor,
      newMessage,
      mensajeNuevo,
      userCount,
      fetchUsuarios,
      fetchMessages,
      EnviarMensajes,
      leaveChat,
      onUsuarioSeleccionado,
      messageClass,
    };
  },
};
</script>

<style scoped>
.chat-view {
  width: 50%;
  display: flex;
  border-radius: 0px 30px 30px 0px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.9);
  position: fixed;
  top: 120px;
  bottom: 40px;
  left: 600px;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
}

.chat-header {
  padding: 20px;
  background-color: #f4f4f4;
  border-bottom: 1px solid #ccc;
}

.message-content {
  font-size: 0.9em; /* Makes the text smaller */
  padding: 6px; /* Adjusts padding for a smaller box */
  border-radius: 8px;
  margin: 10px 0; /* Increases spacing between messages */
  max-width: 60%;
}

.mensaje-izquierda {
  text-align: left;
  background-color: #e0f7fa;
  padding: 8px;
  border-radius: 10px;
  font-size: 0.85em;
  margin-bottom: 10px;
  max-width: 60%;
}

.mensaje-derecha {
  text-align: left; /* Ensure left alignment for text within the bubble */
  background-color: #ebad9c;
  padding: 8px;
  border-radius: 10px;
  font-size: 0.85em;
  margin-bottom: 10px;
  max-width: 60%;
  margin-left: auto; /* Pushes the message bubble to the right */
}

.message-time {
  font-size: 0.75em; /* Makes timestamp smaller */
  color: #666; /* Gray color for the timestamp */
  margin-top: 2px;
}

.chat-input {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f9;
}
</style>
