<template>
    <div class="app-container">
      <BarraLateral />
      <div class="main-content">
        <Encabezado />
        <div class="chat-container">
          <ChatList />
          <ChatView />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Encabezado from '@/components/Encabezado.vue';
    import BarraLateral from '@/components/BarraLateral.vue';
import ChatList from '@/components/ChatList.vue';
import ChatView from '@/components/ChatView.vue';
    export default {
        components: { Encabezado, BarraLateral, ChatList, ChatView},
        name: "PatientList",
    };
  </script>
  
  <style>
  .app-container {
  display: flex;
  height: 100vh; 
  overflow: hidden; 
}

.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.chat-container {
  display: flex;
  flex-grow: 1;
  overflow: hidden;
}

.main-content > .topbar {
  flex-shrink: 0;
}

.chat-container > * {
  flex-grow: 1;
  overflow-y: auto;
}
  </style>
  