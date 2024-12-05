<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <button 
        class="navbar-toggler" 
        type="button" 
        @click="toggleNavbar" 
        aria-controls="navbarTogglerDemo01" 
        :aria-expanded="isNavbarOpen" 
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div :class="['collapse navbar-collapse', { show: isNavbarOpen }]" id="navbarTogglerDemo01">
        <img src="../assets/logo.png" class="imgLogo">
        <a class="navbar-brand" href="#">Satizen</a>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <!-- <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li> -->
          <li @click="cerrarSesion" class="nav-item">
            <a class="nav-link" href="#">Logout</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" aria-disabled="true">Nachat</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { useLogoutStore } from '@/store/logout';

const logoutStore = useLogoutStore();
const isNavbarOpen = ref(false);

function toggleNavbar() {
  isNavbarOpen.value = !isNavbarOpen.value;
}

function cerrarSesion(){
  logoutStore.logout();
}
</script>

<style scoped>
.imgLogo{
  height: 53px;
  padding-top: 3px;
}

</style>