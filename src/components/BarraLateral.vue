<template>
  <aside class="sidebar">
    <div class="logo-container">
      <img src="@/assets/Logo-satizen.png" alt="Satizen Logo" class="logo-img">
    </div>
    <nav>
      <ul class="menu">
        <router-link to="/inicio" custom v-slot="{ navigate }">
          <li @click="navigate">
            <i class="fas fa-home"></i>
            <span>Inicio</span>
          </li>
        </router-link>
        <router-link to="/instituciones" custom v-slot="{ navigate }">
          <li @click="navigate">
            <i class="fas fa-hospital"></i>
            <span>Instituciones</span>
          </li>
        </router-link>
        <router-link to="/pacientes" custom v-slot="{ navigate }">
          <li @click="navigate">
            <i class="fas fa-users"></i>
            <span>Personal</span>
          </li>
        </router-link>
        <router-link to="/usuarios" custom v-slot="{ navigate }">
          <li @click="navigate">
            <i class="fas fa-user"></i>
            <span>Usuarios</span>
          </li>
        </router-link>
      </ul>
    </nav>
    <div class="settings">
      <button><i class="fas fa-cog"></i><span>Configuraciones</span></button>
      <button><i class="fas fa-sign-out-alt"></i><span>Cerrar Sesión</span></button>
    </div>
  </aside>
</template>
<script>
export default {
  name: 'BarraLateral',
};
</script>

<style scoped>
.sidebar {
  width: 210px;
  background-color: #ffffff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; 
  border-radius: 30px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.9);
  position: fixed;
  top: 40px;
  bottom: 40px;
  left: 40px;
}

.logo-container {
  text-align: center;
  margin-bottom: 20px;
}

.logo-img {
  max-width: 150px;
  height: auto;
}

.menu {
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1; 
}

.menu li {
  padding: 15px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
}

.menu li i {
  margin-right: 10px;
  font-size: 20px;
}

.menu li:hover {
  background-color: #A1A1A1;
  border-radius: 8px;
  color: white;
}

.settings {
  display: flex;
  flex-direction: column;
  margin-top: auto; 
}

.settings button {
  width: 100%;
  margin-top: 10px;
  padding: 12px;
  display: flex;
  align-items: center;
  background-color: transparent;
  color: rgb(0, 0, 0);
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.settings button i {
  margin-right: 10px;
}

.settings button:hover {
  background-color: #f5f5f5;
  transition: background-color 0.3s ease;
}

@media (max-width: 1600px) {
  .menu li {
    font-size: 14px; 
    padding: 12px 15px; 
  }

  .menu li i {
    font-size: 16px; 
    margin-right: 8px; 
  }

  .settings button {
    font-size: 14px; 
    padding: 10px; 
  }

  .settings button i {
    margin-right: 8px; 
  }
}

</style>
