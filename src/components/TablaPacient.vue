<template>
  <section class="main-content">
    <div class="headerTable">
      <h2>Lista de Pacientes</h2>
      <div class="search-bar">
        <input type="text" placeholder="Buscar..." class="search-input" />
        <button class="icon-button">
          <i class="fas fa-file-pdf"></i>
        </button>
        <button class="icon-button">
          <i class="fas fa-user-plus"></i>
        </button>
      </div>
    </div>
    <div class="table-container">
      <table class="patient-table">
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
              <button class="edit-button">
                <i class="fas fa-pencil-alt"></i>
              </button>
              <button class="delete-button">
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script></script>

<style scoped>
/* Flexbox para hacer el header de la tabla adaptable */
.headerTable {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

/* Flexbox para la barra de búsqueda */
.search-bar {
  display: flex;
  align-items: center;
}

.search-input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  flex-grow: 1; /* Hace que el input se ajuste al espacio disponible */
}

.icon-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
  margin-left: 10px;
}

/* Contenedor principal para hacer la tabla flexible */
.main-content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-top: 120px;
  margin-left: 290px;
  padding: 50px;
  border-radius: 30px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.9);
  background-color: white;
  margin-right: 20px;
  margin-bottom: 20px;
}

/* Flexbox para la tabla y su contenedor */
.table-container {
  display: flex;
  flex-grow: 1;
  overflow-x: auto; /* Permite que la tabla se despliegue horizontalmente si es necesario */
}

.patient-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 10px;
  flex-grow: 1;
}

.patient-table th,
.patient-table td {
  padding: 15px;
  text-align: center; /* Cambié el texto a centrado para una mejor alineación visual */
  border-bottom: 1px solid #eaeaea;
  white-space: nowrap; /* Evita que el contenido se ajuste en múltiples líneas */
}

.patient-table th {
  background-color: #f5f5f5;
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



/* ===================================== */
@media (max-width: 1920px) {
  .patient-table th,
  .patient-table td {
    font-size: 14px; 
    padding: 10px; 
  }

  .headerTable h2 {
    font-size: 24px; 
  }

  .search-input {
    font-size: 14px; 
  }

  .icon-button {
    font-size: 18px; 
  }

  .main-content {
    padding: 30px; 
  }

  .table-container {
    padding: 10px; 
  }
}



</style>
