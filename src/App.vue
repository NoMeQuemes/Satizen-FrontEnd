<template>
  <router-view />
   <!-- <SessionWarningModal v-if="expirationSession.showModal"></SessionWarningModal> -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />

  <!-- Renderizar el ChatBot solo si no es la ruta 'login' -->
  <ChatBot v-if="!hideChatBot" />
</template>

<script setup>
// import SessionWarningModal from './components/SessionWarningModal.vue';
// import { useExpirationSession } from './store/expirationSession';
import ChatBot from '@/components/ChatBot.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

// Accede a la ruta actual
const route = useRoute();

// Computed para ocultar el ChatBot en rutas específicas
const hideChatBot = computed(() => {
  // Lista de nombres de rutas donde el ChatBot debe estar oculto
  const excludedRoutes = ['login', 'register', 'restaurarPassword', 'cambiarPassword'];
  return excludedRoutes.includes(route.name);
});


</script>

<style src="./assets/Css/Globals.css">

</style>
