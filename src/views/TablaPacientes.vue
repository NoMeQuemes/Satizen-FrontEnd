<template>
    <div class="patient-list-container">
      <header class="top-bar">
        <div class="menu-button">
          <i class="fas fa-bars"></i>
        </div>
        <div class="search-bar">
          <input type="text" placeholder="Buscar..." class="search-input icon-button">
          <button class="icon-button">
            <i class="fas fa-search"></i>
          </button>
        </div>
        <div class="profile-section">
          <i class="fas fa-bell"></i>
          <div class="profile-pic">
            <img src="@/assets/Ellipse.png" alt="Perfil" class="profile-img">
          </div>
        </div>
      </header>
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
  
      <section class="main-content">
  
        <table class="patient-table">
          <div class="headerTable">
            <h2>Lista de Paciente</h2>
            <div class="search-bar">
              <input type="text" placeholder="Buscar..." class="search-input">
              <button class="icon-button">
                <i class="fas fa-file-pdf"></i>
              </button>
              <button class="icon-button">
                <i class="fas fa-user-plus"></i>
              </button>
            </div>
          </div>
  
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>DNI</th>
              <th>N° Habitación</th>
              <th>Usuario</th>
              <th>Fecha de Ingreso</th>
              <th>Observación</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Maira</td>
              <td>Cuello</td>
              <td>45654351</td>
              <td>54</td>
              <td>maira@salud.com</td>
              <td>18/06/2001</td>
              <td>Estable</td>
              <td class="activo">Activo</td>
              <td>
                <button class="edit-button"><i class="fas fa-pencil-alt"></i></button>
                <button class="delete-button"><i class="fas fa-trash-alt"></i></button>
              </td>
            </tr>
  
          </tbody>
        </table>
      </section>
    </div>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
  </template>
  
  <script>
  export default {
    name: "PatientList",
  };
  </script>
  
  <style scoped>
  * {
    font-family: 'Poppins', sans-serif; 
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    background-color: #c7c7c7;
    overflow-x: hidden;
  }
  
  .patient-list-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  
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
  
  .headerTable {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
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
  
  .top-bar {
    position: fixed;
    top: 20px;
    left: 300px;
    right: 20px;
    width: 80%;
    height: 80px;
    background-color: white;
    border-radius: 40px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    z-index: 10;
  }
  
  .menu-button i {
    font-size: 24px;
    cursor: pointer;
  }
  
  .search-bar {
    display: flex;
    align-items: center;
  }
  
  .search-input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .icon-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 20px;
    margin-left: 10px;
  }
  
  .profile-section {
    display: flex;
    align-items: center;
  }
  
  .profile-pic {
    margin-left: 20px;
  }
  
  .profile-img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
  
  .main-content {
    width: 81%;
    margin-top: 120px;
    margin-left: 290px;
    padding: 50px;
    border-radius: 30px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.9);
    background-color: white;
    margin-right: 20px;
    margin-bottom: 20px;
  }
  
  .patient-table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
  }
  
  .patient-table th,
  .patient-table td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #eaeaea;
  }
  
  .patient-table th {
    background-color: #f5f5f5;
  }
  
  .patient-table td {
    text-align: center;
  }
  
  .edit-button,
  .delete-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  
  .edit-button {
    color: #4caf50;
  }
  
  .delete-button {
    color: #f44336;
  }
  
  .activo {
    color: green;
  }
  
  .inactivo {
    color: red;
  }
  </style>