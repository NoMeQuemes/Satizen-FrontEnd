<template>
    <div class="chat-view">
      <div class="chat-header">
        <h2>{{ currentChat.name }}</h2>
      </div>
      <div class="chat-messages">
        <div v-for="(message, index) in messages" :key="index" class="message">
          <div class="message-content">
            <p>{{ message.text }}</p>
          </div>
          <div class="message-time">{{ message.time }}</div>
        </div>
      </div>
      <div class="chat-input">
        <input type="text" v-model="newMessage" placeholder="Escribe un mensaje..." />
        <button @click="sendMessage">Enviar</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentChat: { name: 'Amilcar' },
        messages: [
          { text: 'Hola', time: '10:20 PM' },
          { text: '¿Cómo estás?', time: '10:25 PM' },
        ],
        newMessage: '',
      };
    },
    methods: {
      sendMessage() {
        if (this.newMessage) {
          this.messages.push({ text: this.newMessage, time: new Date().toLocaleTimeString() });
          this.newMessage = '';
        }
      },
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
  .message {
    margin-bottom: 15px;
  }
  .message-content {
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 10px;
  }
  .message-time {
    font-size: 0.8em;
    color: gray;
    text-align: right;
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
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    margin-left: 10px;
  }
  </style>
  