<!-- eslint-disable vue/multi-word-component-names -->
 <template>
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
 </template>

 <script></script>

 <style scoped>

.headerTable {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
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

  .patient-list-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
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