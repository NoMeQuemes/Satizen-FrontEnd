<template>

  <div class="contenedor">

    <div class="contenedorSideBar">
      <SideBar class="sideBar"></SideBar>
    </div>

    <div class="body">
      <Encabezado></Encabezado>
      <DashboardCards></DashboardCards>
      <AlertasMedicas></AlertasMedicas>
    </div>


  </div>


</template>

<script setup>
// import Spinner from '@/components/Spinner.vue';
import SideBar from '@/components/SideBar.vue';
import Encabezado from '@/components/Encabezado.vue';
import DashboardCards from '@/components/DashboardCards.vue';
import AlertasMedicas from '@/components/AlertasMedicas.vue';

</script>

<style scoped>
.contenedor {
  display: flex;
  height: 100vh; /* Asegurar que ocupe toda la pantalla */
}

.contenedorSideBar {
  width: 250px; /* Ancho fijo para la barra lateral */
  background-color: #f4f4f4; /* Puedes ajustar el color */
}

.body {
  flex: 1; /* Ocupa el resto del espacio disponible */
  display: flex;
  flex-direction: column;
  padding: 20px;
  padding-top: 100px; /* Añadir espacio desde el top para evitar que lo tape la barra de navegación */
  background-color: #f5f5f5;
  overflow-y: auto; /* Para hacer scroll si el contenido es muy largo */
}

</style>
