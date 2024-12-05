<template>
  <SideBar/>
  <div class="app-container">
    <div class="main-content">
      <EncabezadoPrincipal></EncabezadoPrincipal>
      <div class="chat-container">
        <ChatList />
        <ChatView />
      </div>
    </div>
  </div>
</template>

<script setup>
import EncabezadoPrincipal from '@/components/EncabezadoPrincipal.vue';
import SideBar from '@/components/SideBar.vue';
import ChatList from '@/components/ChatList.vue';
import ChatView from '@/components/ChatView.vue';


// export default {
//   components: { EncabezadoPrincipal ,BarraLateral, ChatList, ChatView },
//   name: "PatientList",
// };


</script>

<style scoped>
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