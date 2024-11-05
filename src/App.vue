<template>
  <router-view />
   <!-- <SessionWarningModal v-if="expirationSession.showModal"></SessionWarningModal> -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />

</template>

<script setup>
// import SessionWarningModal from './components/SessionWarningModal.vue';
// import { useExpirationSession } from './store/expirationSession';
import { useListarUsuario } from './store/listarUsuario';
import { onMounted } from 'vue';

// const expirationSession = useExpirationSession();
const listarUsuarioStore = useListarUsuario()

onMounted(() => {
  listarUsuarioStore.imagenPerfil();
})

</script>

<style src="./assets/Css/Globals.css">

</style>
