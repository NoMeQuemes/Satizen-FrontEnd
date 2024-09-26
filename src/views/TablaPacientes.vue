<template>
    <div class="patient-list-container">
        <Encabezado/>
        <BarraLateral/>
        <TablaPacient/>
    </div>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
  </template>
  
<script>
    import Encabezado from '@/components/Encabezado.vue';
    import BarraLateral from '@/components/BarraLateral.vue';
    import TablaPacient from '@/components/TablaPacient.vue';
    export default {
        components: { Encabezado, BarraLateral, TablaPacient},
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
</style>