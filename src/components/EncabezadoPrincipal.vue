<template>
  <header class="top-bar">
    <div class="top-bar-container">
      <!-- <div class="menu-button">
        <i class="fas fa-bars"></i>
      </div> -->
      <div class="nombreUsuario">
        <p>¡Hola, <b>{{ usuario.nombreUsuario }}</b>!</p>
      </div>
      <div class="search-bar">
        <!-- <input type="text" placeholder="Buscar..." class="search-input" /> -->
        <!-- <i class="fas fa-search search-icon"></i> -->
      </div>
      <div class="profile-section">
        <!-- Icono de notificaciones -->
        <svg style="margin-right: 10px;" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
          <path fill="black" d="M8.645 20.5a3.502 3.502 0 0 0 6.71 0zM3 19.5h18v-3l-2-3v-5a7 7 0 1 0-14 0v5l-2 3z" />
        </svg>
        <!-- Icono de mensaje -->
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 20 20">
          <path fill="black" d="M0 8v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-10 4z" />
          <path fill="black" d="M2 2a2 2 0 0 0-2 2v2l10 4l10-4V4a2 2 0 0 0-2-2z" />
        </svg>
        <div class="profile-pic">
          <img v-if="usuario.imagenPerfilUrl" :src="getImageUrl(usuario.imagenPerfilUrl)" alt="Imagen de perfil"
            class="profile-img" />
          <img v-if="!usuario.imagenPerfilUrl" src="../assets/usuario.png" class="profile-img">
          <!-- <img  src="../assets/usuario.png" class="profile-img"> -->
          <!-- <img > -->
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import axiosFunction from '@/Functions/axios';
import { ref, onMounted } from 'vue';
import { useDecodeJwT } from '@/store/decodeJwt';


let dataUser = JSON.parse(localStorage.getItem('dataUser'));
let usuario = ref(dataUser);
const decodeJwtStore = useDecodeJwT();

onMounted(() => {
  traerUsuario()
})

function traerUsuario() {
  axiosFunction.get(`Usuarios/ListarPorId/${decodeJwtStore.dataUser.idUsuario}`)
    .then(resultado => {
      console.log("Resultado de traer al usuario: ", resultado);
      usuario.value = resultado.data.resultado;
      console.log("Arreglo de el usuario: ", usuario.value);
    })
    .catch((error) => {
      console.log(error)
    })
}

function getImageUrl(imageUrl) {
  // Si la URL es relativa, convierte a absoluta
  // return `http://localhost:7298/${imageUrl}` // Ajusta esto según la base de tu API
  return `https://www.satizen.somee.com/${imageUrl}`
}



</script>

<style scoped>
.top-bar {
  position: fixed;
  top: 10px;
  left: 20%;
  right: 0;
  height: auto;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  padding: 10px;
  max-width: 75%;
  z-index: 1;
}

.top-bar-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  /* Tres columnas: Menú, Buscador, Perfil */
  align-items: center;
  gap: 20px;
  /* Espacio entre los elementos */
  max-width: 1200px;
  /* Limita el ancho total del navbar */
  margin: 0 auto;
  /* Centra el contenido */
  width: 100%;
}

.menu-button i {
  font-size: 24px;
  cursor: pointer;
}

.nombreUsuario {
  margin-top: 10px;
  margin-left: 20px;
}

.search-bar {
  position: relative;
  display: flex;
  align-items: center;
  justify-self: start;
  /* Coloca el buscador más a la izquierda */
}

.search-input {
  width: 100%;
  padding: 8px 40px 8px 15px;
  /* Deja espacio para el ícono dentro del input */
  border: none;
  border-radius: 50px;
  font-size: 16px;
  background-color: #D9D9D9;
}

.search-icon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: #888;
  cursor: pointer;
}

.profile-section {
  display: flex;
  justify-self: end;
  /* Alinea el perfil a la derecha */
  align-items: center;
}

.profile-pic {
  margin-left: 20px;
  margin-right: 20px;
}

.profile-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

svg{
  opacity: .5;
}

</style>
