<template>
    <button class="chat-toggle" @click="toggleChat">
      <img src="/Chatbot.svg" alt="Chat Icon" class="icon-image"/>
    </button>
    <div class="chat-container" :class="{ 'active': isChatVisible }">
      <div class="header">
        <span class="header-title">ChatBot</span>
        <span class="toggle-icon">{{ isChatVisible ? '−' : '+' }}</span>
      </div>
      
      <div ref="messagesContainer" class="messages" v-show="isChatVisible">
        <div
          v-for="(msg, index) in chatMessages"
          :key="index"
          :class="[msg.type, { 'bot-entrance': msg.animated }]">
          
          <div v-if="msg.type === 'bot'" class="bot-message">
            <img src="/Chatbot.svg" alt="Bot Icon" class="bot-avatar"/>
            <div class="message-content">
              <!-- Renderizar video de YouTube si el mensaje contiene un enlace -->
              <div v-if="msg.text.includes('youtube.com')">
                <iframe
                  :src="convertToEmbedUrl(msg.text)"
                  width="300"
                  height="180"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen>
                </iframe>
              </div>
              <!-- Renderizar texto normal si no contiene enlace -->
              <div v-else>{{ msg.text }}</div>
            </div>
          </div>
          
          <div v-else class="message-content">{{ msg.text }}</div>
        </div>
      </div>
      
      <div class="input-area" v-show="isChatVisible">
        <input v-model="userMessage" @keyup.enter="handleSendMessage" placeholder="Escribe tu mensaje..." class="input-field"/>
        <button @click="handleSendMessage" class="send-button">Enviar</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import axiosFunction from '@/Functions/axios';
  
  
  export default {
    name: 'ChatBot',
    setup() {
      const userMessage = ref('');
      const chatMessages = ref([]);
      const isChatVisible = ref(false);
      const messagesContainer = ref(null);
  
      const scrollToBottom = () => {
        if (messagesContainer.value) {
          messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
        }
      };
  
      const fetchData = async (url) => {
    try {
      const response = await axiosFunction.get(url); // Sin concatenar manualmente API_URL
      console.log("Response Data:", response.data); // Verifica la estructura aquí
      return response.data.resultado; // Asume que los datos están en "resultado"
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };
  
  
  
  
  const convertToEmbedUrl = (url) => {
    if (url.includes('youtube.com/watch')) {
      return url.replace('watch?v=', 'embed/') + '?modestbranding=1&controls=1&showinfo=0&rel=0';
    }
    return url;
  };
  
  
      const handleSendMessage = async () => {
    if (!userMessage.value.trim()) return;
  
    // Agregar el mensaje del usuario
    chatMessages.value.push({ type: 'user', text: userMessage.value });
  
    let responseText = "No encontré una respuesta para eso.";
    let videoLink = null;
  
    // Normalizar el texto del mensaje
    const normalizedMessage = normalizeText(userMessage.value);
  
    // Manejo de cantidad de pacientes
    if (/cuantos\s*pacientes\s*hay/i.test(normalizedMessage)) {
      const response = await fetchData('Pacientes/ListarPacientes');
      console.log("Pacientes Response:", response);
  
      let pacientesArray = null;
      if (Array.isArray(response)) {
        pacientesArray = response;
      } else if (response && Array.isArray(response.resultado)) {
        pacientesArray = response.resultado;
      }
  
      if (pacientesArray) {
        responseText = `Hay ${pacientesArray.length} pacientes en el sistema.`;
      } else {
        responseText = "No se encontró ningún paciente en el sistema.";
      }
  
    // Manejo del último paciente agregado
    } else if (/ultimo\s*paciente\s*agregado/i.test(normalizedMessage)) {
      const pacientes = await fetchData('Pacientes/ListarPacientes');
      if (pacientes && Array.isArray(pacientes) && pacientes.length > 0) {
        const ultimoPaciente = pacientes[pacientes.length - 1];
        responseText = `El último paciente agregado es ${ultimoPaciente.nombrePaciente} ${ultimoPaciente.apellido}, con DNI ${ultimoPaciente.dni}.`;
      } else {
        responseText = "No se encontró ningún paciente en el sistema.";
      }
  
    // Manejo de la consulta: Cómo agregar un paciente
    } else if (/como\s*agregar\s*paciente/i.test(normalizedMessage)) {
      responseText = "Para agregar un paciente, dirígete a la sección de Pacientes y haz clic en 'Agregar'. Asegúrate de llenar todos los campos en el formulario.";
      videoLink = "https://www.youtube.com/watch?v=bs4zucYabDU"; // Cambia este enlace por el video correcto
    } else if (/como\s*editar\s*paciente/i.test(normalizedMessage)) {
      responseText = "Para editar los datos de un paciente, dirígete a la sección de Pacientes. En la columna donde dice 'Acciones', selecciona el ícono de lápiz que está junto al nombre del paciente.";
      videoLink = "https://www.youtube.com/watch?v=0Srb5Hp1sBk"; // Cambia este enlace por el video correcto
    
    } else if (/como\s*resolver\s*alertas?/i.test(normalizedMessage)) {
      responseText = "Para resolver una alerta, simplemente haz clic en la alerta correspondiente. Te recomendamos priorizar las alertas más urgentes para garantizar una atención eficiente.";
      videoLink = "https://www.youtube.com/watch?v=90uGqRBEqE4"; // Enlace al video de demostración
    
  
      
    // Manejo de cantidad de personal
    } else if (/cuantos\s*(medicos|doctores|personal)\s*hay/i.test(normalizedMessage)) {
      const response = await fetchData('Personal/ListarPersonal');
      console.log("Personal Response:", response);
  
      let personalArray = null;
      if (Array.isArray(response)) {
        personalArray = response;
      } else if (response && Array.isArray(response.resultado)) {
        personalArray = response.resultado;
      }
  
      if (personalArray) {
        responseText = `Hay ${personalArray.length} miembros del personal en el sistema.`;
      } else {
        responseText = "No se encontró ningún miembro del personal en el sistema.";
      }
    }
  
    // Agregar la respuesta del bot
    chatMessages.value.push({
      type: 'bot',
      text: responseText,
      animated: true,
    });
  
    // Agregar el video si corresponde
    if (videoLink) {
      chatMessages.value.push({
        type: 'bot',
        text: videoLink,
        animated: true,
      });
    }
  
    userMessage.value = '';
    scrollToBottom();
  };
  
  
  // Función para normalizar texto: elimina tildes, mayúsculas y caracteres especiales
  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s]/gi, "");
  };
  
  
  const toggleChat = () => {
    isChatVisible.value = !isChatVisible.value;
  };
  
  return {
    userMessage,
    chatMessages,
    handleSendMessage,
    isChatVisible,
    toggleChat,
    convertToEmbedUrl,
  };
  
  
    },
  };
  </script>
  
  
  
  
  <style scoped>
  .chat-toggle {
    position: fixed;
    bottom: 60px;
    right: 100px;
    width: 70px;
    height: 70px;
    background-color: #ffffff;
    border: none;
    border-radius: 50%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: pulse 2s infinite;
    transition: transform 0.3s ease;
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }
    50% {
      transform: scale(1.1);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
    }
  }
  
  .chat-toggle:hover, .chat-toggle:focus {
    transform: scale(1.05);
    background-color: #0056b3;
    outline: none;
  }
  
  .icon-image {
    width: 100%;
    height: auto;
    border-radius: 50%;
    padding: 5px;
  }
  
  .chat-container {
    position: fixed;
    bottom: 20px;
    right: 200px;
    width: 400px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    background: #ffffff;
    transition: transform 0.4s ease, opacity 0.4s ease;
    transform: translateY(50px);
    opacity: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    z-index: 999;
  }
  
  .chat-container.active {
    transform: translateY(0);
    opacity: 1;
  }
  
  .header {
    background: linear-gradient(90deg, #6179FB, #7B61FB);
    color: white;
    padding: 10px 15px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .header-title {
    font-weight: 600;
    font-size: 1.1rem;
  }
  
  .toggle-icon {
    font-size: 1.5rem;
  }
  
  .messages {
    max-height: 300px;
    overflow-y: auto;
    padding: 8px;
  }
  
  .message {
    display: flex;
    align-items: flex-start;
    margin: 6px 0;
    padding: 8px;
    background-color: #f8f8f8;
    border-radius: 10px;
  }
  
  .user, .bot {
    padding: 8px;
    border-radius: 10px;
  }
  
  .user {
    background: linear-gradient(90deg, #6a79c9, #7B61FB);
    color: white;
    padding: 15px;
    margin: 10px 10px 10px auto;
    text-align: right;
    max-width: 60%;
    border-radius: 15px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .bot-message {
    display: flex;
    align-items: flex-start;
    max-width: 60%;
  }
  
  .bot-avatar {
    width: 30px;
    height: 30px;
    margin-right: 8px;
    border-radius: 50%;
  }
  
  .bot .message-content {
    background-color: #f1f1f1;
    color: #2c3e50;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .input-area {
    padding: 8px;
    border-top: 1px solid #ccc;
    display: flex;
    align-items: center;
  }
  
  .input-field {
    flex-grow: 1;
    margin-right: 8px;
    padding: 6px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
  }
  
  .send-button {
    background: linear-gradient(90deg, #6179FB, #7B61FB);
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 5px;
  }
  /* Animación para mensajes nuevos */
  @keyframes messageAppear {
    0% {
      transform: scale(0.9);
      opacity: 0;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.5;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  /* Añadir animación a los mensajes del bot */
  .bot-message .message-content {
    background-color: #f1f1f1;
    color: #2c3e50;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    animation: messageAppear 0.5s ease forwards;
  }
  
  /* Añadir animación a los mensajes del usuario */
  .user {
    background: linear-gradient(90deg, #6a79c9, #7B61FB);
    color: white;
    padding: 15px;
    margin: 10px 10px 10px auto;
    text-align: right;
    max-width: 60%;
    border-radius: 15px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    animation: messageAppear 0.5s ease forwards;
  }
  
  </style>