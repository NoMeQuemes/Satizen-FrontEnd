<template>
  <router-view />
   <SessionWarningModal v-if="expirationSession.showModal"></SessionWarningModal>
</template>

<script setup>
import SessionWarningModal from './components/SessionWarningModal.vue';
import { useExpirationSession } from './store/expirationSession';

const expirationSession = useExpirationSession();

</script>

<style src="./assets/Css/Globals.css">

</style>
