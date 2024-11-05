<template>
  <div class="layout">
    <!-- Encabezado -->
    <Header />

    <!-- Layout principal con la barra lateral y el contenido -->
    <div class="main-content">
      <!-- Barra lateral -->
      <Sidebar />

      <!-- Contenido principal (tarjetas + alertas) -->
      <div class="content">
        <div class="centered-content">
          <DashboardCards />
          <AlertasMedicas />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import AlertasMedicas from '../components/AlertasMedicas.vue';
import DashboardCards from '../components/DashboardCards.vue';
import Sidebar from '../components/BarraLateral.vue'; // Importa la barra lateral
import Header from '../components/EncabezadoPrincipal.vue'; // Importa el encabezado

export default {
  components: {
    AlertasMedicas,
    DashboardCards,
    Sidebar,
    Header, // Añade el encabezado
  }
}
</script>
<style scoped>
.layout {
  display: grid;
  grid-template-rows: auto 1fr; /* Encabezado y luego el contenido */
  grid-template-columns: 250px 1fr; /* Barra lateral y contenido principal */
  grid-template-areas:
    "header header"
    "sidebar content"; /* Define la estructura del grid */
  height: 100vh; /* Ocupa toda la altura de la pantalla */
}

/* Estilos del contenedor principal */
.main-content {
  display: grid;
  grid-area: content; /* Define que este componente ocupe el área de contenido principal */
  grid-template-columns: 1fr; /* Contenido a toda la pantalla */
  grid-template-rows: auto auto; /* Permite que los componentes se apilen verticalmente */
  gap: 20px; /* Añadir espacio entre el Dashboard y las alertas */
  padding: 20px;
  background-color: #f5f5f5;
}

.centered-content {
  display: flex;
  flex-direction: column; /* Asegura que el Dashboard y Alertas se apilen verticalmente */
  width: 100%; /* Ocupa todo el ancho disponible */
}

</style>
