<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <aside class="sidebar">
        <div class="logo-container">
          <img src="@/assets/Logo-satizen.png" alt="Satizen Logo" class="logo-img">
        </div>
        <nav>
          <ul class="menu">
            <li><i class="fas fa-home"></i> Inicio</li>
            <li><i class="fas fa-hospital"></i> Instituciones</li>
            <li class="active"><i class="fas fa-users"></i> Personal</li>
            <li><i class="fas fa-user"></i> Usuarios</li>
          </ul>
        </nav>
        <div class="settings">
          <button>Configuraciones</button>
          <button>Cerrar Sesión</button>
        </div>
      </aside>  
</template>

<script></script>

<style scoped>
  .sidebar {
    width: 210px;
    background-color: #ffffff;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 30px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.9);
    position: fixed;
    top: 80px;
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
  }
  .menu li {
    padding: 15px;
    cursor: pointer;
    font-size: 18px;
    display: flex;
    align-items: center;
  }
  
  .menu li i {
    margin-right: 10px;
  }
  
  .menu .active {
    background-color: #9b9b9b;
    color: rgb(44, 44, 44);
    border-radius: 8px;
  }
  
  .settings button {
    width: 100%;
    margin-top: 10px;
    padding: 12px;
    background-color: transparent;
    color: rgb(0, 0, 0);
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
</style>