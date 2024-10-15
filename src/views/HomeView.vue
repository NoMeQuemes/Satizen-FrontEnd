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
.body {
  display: flex;
  flex-direction: column;
}

.contenedor {
  display: flex
}
</style>
