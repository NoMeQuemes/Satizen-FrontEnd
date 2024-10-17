<template>
  <div class="chat-list">
    <ul>
      <li v-for="usuario in listardatos" :key="usuario.idUsuario" class="chat-item">
        <div class="btn-group">
          <button class="button" @click="seleccionarUsuario(usuario.idUsuario, usuario.nombreUsuario, usuario.idRoles)">
            <!-- Colocamos el nombre y la imagen en un mismo contenedor flex para que estén en línea -->
            <div class="chat-content">
              <div class="chat-avatar">
                <img :src="require('@/assets/Ellipse.png')" alt="" />
              </div>
              <span class="chat-username">{{ usuario.nombreUsuario }}</span>
            </div>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ChatList',
  data() {
    return {
      listardatos: [], 
    };
  },
  mounted() {
    this.fetchUsuarios();
  },
  methods: {
    async fetchUsuarios() {
      try {
        const response = await axios.get('https://localhost:7298/api/Usuarios/ListarUsuarios');
        if (response.data && response.data.resultado) {
          this.listardatos = response.data.resultado;
        }
      } catch (error) {
        console.error('Hubo un error al obtener los usuarios!', error);
      }
    },
    seleccionarUsuario(idUsuario, nombreUsuario, idRoles) {
      this.$emit('usuario-seleccionado', idUsuario, nombreUsuario, idRoles);
      console.log("se ejecuto seleccionarUsuario", idUsuario, nombreUsuario, idRoles)
    }
  } 
};
  </script>
  
  <style scoped>
  .chat-list {
  width: 260px;
  background-color: white;
  border-radius: 30px 0px 0px 30px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.9);
  position: fixed;
  top: 120px;
  bottom: 40px;
  left: 310px;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
  overflow-y: auto;
}

.chat-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.chat-content {
  display: flex;
  align-items: center; /* Alinea la imagen y el nombre en la misma línea */
}

.chat-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px; /* Añade un pequeño espacio entre la imagen y el nombre */
}
.chat-username {
  font-size: 15px;
}

.btn-group .button {
  background-color: white;
  border: 4px solid white;
  padding: 10px;
  text-align: left; /* Alinea el texto a la izquierda */
  text-decoration: none;
  font-size: 15px;
  cursor: pointer;
  width: 213px;
  display: flex; /* Añade flex para que el contenido del botón esté alineado horizontalmente */
  align-items: center; /* Alinea el contenido verticalmente en el centro */
}

.btn-group .button:hover {
  background-color: #54e2e2;
}

  </style>
  