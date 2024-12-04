<template>
  <div class="app-container">
    <SideBar/>
    <div class="main-content">
      <div class="chat-container">
        <ChatList />
        <MyComponent />
      </div>
    </div>
  </div>
</template>

<script>
 // import Encabezado from '@/components/Encabezado.vue';
 // import BarraLateral from '@/components/BarraLateral.vue';
  import ChatList from '@/components/ChatList.vue';
  import MyComponent from '@/components/MyComponent.vue';
  import SideBar from '@/components/SideBar.vue';

  export default {
      components: {  SideBar,ChatList, MyComponent},
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
