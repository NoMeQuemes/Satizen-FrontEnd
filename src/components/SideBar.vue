<template>
    <div class="sidebar">
      <!-- Cabezera de la SideBar -->
      <div class="cabezera">
        <img src="../../public/logo.png" alt="" class="logoImagen">
      </div>
  
      <!-- Cuerpo de la SideBar -->
      <div class="cuerpo">
        <!-- Opción individual -->
        <router-link :to="{ name: 'home' }" class="opciones">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M20.25 10a1.25 1.25 0 1 0-2.5 0zm-14 0a1.25 1.25 0 1 0-2.5 0zm13.866 2.884a1.25 1.25 0 0 0 1.768-1.768zM12 3l.884-.884a1.25 1.25 0 0 0-1.768 0zm-9.884 8.116a1.25 1.25 0 0 0 1.768 1.768zM7 22.25h10v-2.5H7zM20.25 19v-9h-2.5v9zm-14 0v-9h-2.5v9zm15.634-7.884l-9-9l-1.768 1.768l9 9zm-10.768-9l-9 9l1.768 1.768l9-9zM17 22.25A3.25 3.25 0 0 0 20.25 19h-2.5a.75.75 0 0 1-.75.75zm-10-2.5a.75.75 0 0 1-.75-.75h-2.5A3.25 3.25 0 0 0 7 22.25z" />
          </svg>
          <div class="enlace">Inicio</div>
        </router-link>
  
        <!-- Opción Usuarios con Acordeón -->
        <div class="opciones" @click="toggleDropdown">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
              <circle cx="18" cy="15" r="3" />
              <circle cx="9" cy="7" r="4" />
              <path d="M10 15H6a4 4 0 0 0-4 4v2m19.7-4.6l-.9-.3m-5.6-2.2l-.9-.3m2.3 5.1l.3-.9m2.2-5.6l.3-.9m.2 7.4l-.4-1m-2.4-5.4l-.4-1m-2.1 5.3l1-.4m5.4-2.4l1-.4" />
            </g>
          </svg>
          <div class="enlace">Usuarios</div>
        </div>
  
        <!-- Acordeón de Usuarios -->
        <div v-if="dropdownVisible" class="dropdown">
          <a href="#" class="dropdown__item">Roles</a>
          <a href="#" class="dropdown__item">Permisos</a>
        </div>
  
        <!-- Opción individual -->
        <router-link :to="{ name: 'instituciones' }" class="opciones">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
              <path d="M12 6v4m2 4h-4m4 4h-4m4-10h-4m8 4h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2" />
              <path d="M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18" />
            </g>
          </svg>
          <div class="enlace">Instituciones</div>
        </router-link>
  
        <!-- Opción individual -->
        <div class="opciones">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 22v-1c0-1.87 0-2.804.402-3.5A3 3 0 0 1 5.5 16.402C6.196 16 7.13 16 9 16l3 4l3-4c1.87 0 2.804 0 3.5.402a3 3 0 0 1 1.098 1.098C20 18.196 20 19.13 20 21v1M15.937 8l1.018-4.136C17.188 2.917 16.483 2 15.523 2H8.477c-.96 0-1.665.917-1.432 1.864L8.063 8m7.874 0v2c0 2.209-1.762 4-3.937 4s-3.937-1.791-3.937-4V8m7.874 0H8.063M12 4v2m1-1h-2" />
          </svg>
          <div class="enlace">Personal</div>
        </div>
  
        <!-- Opción individual -->
        <div class="opciones">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 22v-1c0-1.87 0-2.804.402-3.5A3 3 0 0 1 5.5 16.402C6.196 16 7.13 16 9 16l3 4l3-4c1.87 0 2.804 0 3.5.402a3 3 0 0 1 1.098 1.098C20 18.196 20 19.13 20 21v1M15.937 8l1.018-4.136C17.188 2.917 16.483 2 15.523 2H8.477c-.96 0-1.665.917-1.432 1.864L8.063 8m7.874 0v2c0 2.209-1.762 4-3.937 4s-3.937-1.791-3.937-4V8m7.874 0H8.063M12 4v2m1-1h-2" />
          </svg>
          <div class="enlace">Pacientes</div>
        </div>
  
      </div>
  
      <!-- Pie de la SideBar -->
      <div class="pie">
        <div class="opciones" @click="logout">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z" />
          </svg>
          <div class="enlace">Cerrar Sesión</div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useLogoutStore } from '@/store/logout';
  
  const logoutStore = useLogoutStore();
  const dropdownVisible = ref(false);
  
  function toggleDropdown() {
    dropdownVisible.value = !dropdownVisible.value;
  }
  
  function logout() {
    logoutStore.logout();
  }
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap');
  
  a {
    text-decoration: none;
    color: inherit;
  }
  
  .sidebar {
    display: flex;
    flex-direction: column;
    width: 200px;
    min-height: 90vh;
    border-radius: 20px;
    padding: 1em;
    justify-content: space-between;
    -webkit-box-shadow: 13px 17px 22px -4px rgba(0, 0, 0, 0.48);
    -moz-box-shadow: 13px 17px 22px -4px rgba(0, 0, 0, 0.48);
    box-shadow: 13px 17px 22px -4px rgba(0, 0, 0, 0.48);
    background-color: white;
  }
  
  .cabezera {
    border-bottom: 1px solid #8F919D;
    display: flex;
    background-color: white;
    justify-content: center;
  }
  
  .cabezera img {
    width: 130px;
    height: auto;
    background-color: white;
  }
  
  .cuerpo {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    margin-top: 1em;
    border-bottom: 1px solid #8F919D;
    background-color: white;
  }
  
  .opciones {
    display: flex;
    align-items: center;
    margin: 5px 5px;
    background-color: white;
    border-radius: 5px;
  }
  
  svg {
    opacity: .5;
    margin-right: 3px;
    background-color: white;
  }
  
  .enlace {
    font-family: "Poppins", sans-serif;
    font-size: small;
    font-weight: 500;
    background-color: white;
  }
  
  .pie {
    display: flex;
    flex-direction: column;
    background-color: white;
  }
  
  .pie {
    margin-top: 1em;
  }
  
  /* ----- TRANSICIONES ----- */
  
  .opciones:hover {
    background-color: #A1A1A1;
  }
  
  .opciones:hover .enlace {
    background-color: #A1A1A1;
    color: white;
    font-weight: 600;
  }
  
  /* Estilo para el dropdown */
  .dropdown {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    margin-top: 5px;
  }
  
  .dropdown__item {
    padding: 5px 0;
    font-family: "Poppins", sans-serif;
    font-size: small;
    font-weight: 500;
    color: #333;
    cursor: pointer;
  }
  
  .dropdown__item:hover {
    color: #A1A1A1;
  }
  </style>
  