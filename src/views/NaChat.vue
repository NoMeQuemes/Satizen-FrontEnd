<template>
  <div class="app-container">
    <BarraLateral />
    <div class="main-content">
      <EncabezadoPrincipal></EncabezadoPrincipal>
      <div class="chat-container">
        <ChatList />
        <ChatView />
      </div>
    </div>
  </div>
</template>

<script>
import EncabezadoPrincipal from '@/components/EncabezadoPrincipal.vue';
import BarraLateral from '@/components/BarraLateral.vue';
import ChatList from '@/components/ChatList.vue';
import ChatView from '@/components/ChatView.vue';
import EncabezadoPrincipal from '@/components/EncabezadoPrincipal.vue';
export default {
  components: { Encabezado, BarraLateral, ChatList, ChatView },
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
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.chat-container {
  display: flex;
  flex-grow: 1;
  overflow: hidden;
}

.main-content>.topbar {
  flex-shrink: 0;
}

.chat-container>* {
  flex-grow: 1;
  overflow-y: auto;
}
</style>