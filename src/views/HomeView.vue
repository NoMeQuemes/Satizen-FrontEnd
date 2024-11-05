<template>

  <div class="contenedor">

    <div class="contenedorSideBar">
      <SideBar class="sideBar"></SideBar>
    </div>

    <div class="body">
      <EncabezadoPrincipal></EncabezadoPrincipal>
      <DashboardCards></DashboardCards>
      <AlertasMedicas></AlertasMedicas>
    </div>


  </div>


</template>

<script setup>
import SideBar from '@/components/SideBar.vue';
import EncabezadoPrincipal from '@/components/EncabezadoPrincipal.vue';
import DashboardCards from '@/components/DashboardCards.vue';
import AlertasMedicas from '@/components/AlertasMedicas.vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { toast } from "vue3-toastify";
import { useDecodeJwT } from '@/store/decodeJwt';

const route = useRoute();
const router = useRouter();
const decodeJwtStore = useDecodeJwT();

onMounted(() => {
  if (route.query.toast === 'success') {
    toast.success(`Bienvenido ${decodeJwtStore.dataUser.nombreUsuario}`, {
      autoClose: 5000,
      position: toast.POSITION.BOTTOM_RIGHT
    });
    setTimeout(() => {
      router.replace({ query: { ...route.query, toast: undefined } });
    }, 6000);

  }
})



</script>

<style scoped>
.contenedor {
  display: flex;
  height: 100vh;
  /* Asegurar que ocupe toda la pantalla */
}

.contenedorSideBar {
  width: 250px;
  /* Ancho fijo para la barra lateral */
  background-color: #f4f4f4;
  /* Puedes ajustar el color */
}

.body {
  flex: 1;
  /* Ocupa el resto del espacio disponible */
  display: flex;
  flex-direction: column;
  padding: 20px;
  padding-top: 60px;
  /* Añadir espacio desde el top para evitar que lo tape la barra de navegación */
  background-color: #f5f5f5;
  overflow-y: auto;
  /* Para hacer scroll si el contenido es muy largo */
  align-items: center;
}
</style>
