<template>

<div>
      <input type="hidden" required v-model="idAutor" id="idAutor"  />
      <input type="hidden" required v-model="idReceptor" id="idReceptor" />

      <button @click="probar">probar</button>
      <ChatList @usuario-seleccionado="onUsuarioSeleccionado"/>
      
      <button @click="leaveChat">
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48">
      <g fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="4">
        <path d="M36 8H9C7.34315 8 6 9.34315 6 11V39C6 40.6569 7.34315 42 9 42H39C40.6569 42 42 40.6569 42 39V25V18" />
        <path d="M32.2427 12.4854L36.4853 8.24271L32.2427 4.00007" />
        <path d="M24 17V34" />
        <path d="M32 24V34" />
        <path d="M16 24V34" />
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
        <button @click="EnviarMensajes">  <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="1.2em" viewBox="1 3 19 19"><path fill="currentColor" d="M2.01 21L23 12L2.01 3L2 10l15 2l-15 2z"/></svg></button>

      
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
      const decodeJwt =ref(useDecodeJwT())
  
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
      if (!idAutor.value || !idReceptor.value) {
        console.error("ID Autor o ID Receptor no válidos:", { idAutor: idAutor.value, idReceptor: idReceptor.value });
        return;
      }
      
      const response = await axios.get(
        `https://localhost:7298/api/Mensajes/EntreUsuarios/${idAutor.value}/${idReceptor.value}`
      );
      listarMensajes.value = response.data;
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un código de estado fuera del rango de 2xx
        console.error("Error al obtener mensajes:", {
          status: error.response.status,
          data: error.response.data,
        });
      } else if (error.request) {
        // La solicitud fue realizada pero no se recibió respuesta
        console.error("No se recibió respuesta del servidor:", error.request);
      } else {
        // Algo ocurrió al configurar la solicitud
        console.error("Error al configurar la solicitud:", error.message);
      }
    }
  };
  
      const EnviarMensajes = async () => {
        await axios.post('https://localhost:7298/api/Mensajes', {
          idAutor: idAutor.value,
          idReceptor: idReceptor.value,
          contenidoMensaje: newMessage.value,
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
  console.log("Contenido de decodeJwt:", decodeJwt.value.dataUser.idUsuario);

  // Actualizamos idAutor y lo mostramos en la consola.
  idAutor.value = parseInt(decodeJwt.value.dataUser.idUsuario, 10);
  console.log("Nuevo valor de idAutor:", idAutor.value);
};

     
      const onUsuarioSeleccionado = async (idUsuario, nombreUsuario) => {
        activarWatch.value = false;
        nombreReceptor.value = nombreUsuario;
        idReceptor.value = idUsuario;
        await joinGroup(idAutor.value, idUsuario);
        await marcarMensajesComoVistos();
        activarWatch.value = true;
        await fetchMessages();
      };
  
      const marcarMensajesComoVistos = async () => {
  await axios.put(
    `https://localhost:7298/api/Mensajes/MarcarComoVisto/${idAutor.value}/${idReceptor.value}`
  );
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
            await marcarMensajesComoVistos();
            await fetchMessages();
            console.log(userCount.value)
          }
        }, 900);
      };
  
      onMounted(() => {
        startConnection();
        fetchUsuarios();
        probar();
        connection.on('ReceiveMessage', (idAutorMsg, idReceptorMsg, contenidoMensaje, timestamp, visto) => {
          const nuevoMensaje = { idAutor: idAutorMsg, idReceptor: idReceptorMsg, contenidoMensaje, timestamp, visto };
          listarMensajes.value.push(nuevoMensaje);
        });
        connection.on('UpdateGroupCount', (count) => {
          userCount.value = count;
        });
        iniciarVerificacionMensajesLoop();
      });
  
      onBeforeUnmount(() => {
        if (intervalId) {
          clearInterval(intervalId);
        }
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
        marcarMensajesComoVistos,
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

  .chat-messages {
    padding: 20px;
    flex-grow: 1;
    overflow-y: auto;
  }

  .message-content {
    padding: 10px;
    border-radius: 10px;
    margin: 5px 0;
    max-width: 80%;
  }

  .mensaje-izquierda {
    text-align: left; 
    background-color: #e0f7fa;
    padding: 10px;
    border-radius: 10px;
    margin: 10px;
    max-width: 70%;
    align-self: flex-start;
    word-wrap: break-word; /* Ajusta el contenido largo */
    margin-right: auto; /* Empuja hacia la izquierda */
  }

  .mensaje-derecha {
    text-align: right;
    background-color: #fce4ec;
    padding: 10px;
    border-radius: 10px;
    margin: 10px;
    max-width: 70%;
    align-self: flex-end;
    word-wrap: break-word; /* Ajusta el contenido largo */
    margin-left: auto; /* Empuja hacia la derecha */
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

  