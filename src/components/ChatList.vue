<template>
    <div class="chat-list">
      <ul>
        <li v-for="(chat, index) in chats" :key="index" class="chat-item">
          <div class="chat-avatar">
            <img src="user-avatar.png" alt="Avatar" />
          </div>
          <div class="chat-info">
            <h3>{{ chat.name }}</h3>
            <span class="status" :class="chat.status"></span>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        chats: [
          { name: 'Fernando', status: 'online' },
          { name: 'Agustin', status: 'online' },
          { name: 'Amilcar', status: 'offline' },

        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .chat-list {
    width: 250px;
    background-color: white;
    border-radius: 30px 0px 0px 30px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.9);
    position: fixed;
    top: 120px;
    bottom: 40px;
    left: 300px;
    padding: 10px;
  }
  .chat-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  .chat-avatar img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .chat-info {
    margin-left: 10px;
  }
  .status.online {
    background-color: green;
  }
  .status.offline {
    background-color: gray;
  }
  </style>
  