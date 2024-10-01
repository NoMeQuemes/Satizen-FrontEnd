<template class="template">
  <!-- <spinner-component :isLoading="IsLoading" :can-cancel="false" :is-full-page="false"
  @update:isLoading="IsLoading = $event" /> -->
  
  <div class="contenedor">
    <div class="contenedorSideBar">
      <side-bar class="sideBar"></side-bar>
    </div>
    <div class="contenedorHome">
      <router-link :to="`/instituciones`">Hola</router-link>
    </div>

  </div>
    

</template>

<script>
// import Spinner from '@/components/Spinner.vue';
import axiosFunction from '@/Functions/axios';
import SideBar from '@/components/SideBar.vue';

export default {
  name: 'HomeView',
  data() {
    return {
      listarUsuarios: [],
      listarAsignaciones: [],
      // IsLoading: true,
      id: 0,
    }
  },
  components: {
    // 'spinner-component': Spinner,
    'side-bar': SideBar
  },
  mounted() {
    // this.usuarios()
  },
  methods: {
    // usuarios() {
    //   this.IsLoading = true;  // Activa el spinner
    //   axiosFunction.get("Usuarios/ListarUsuarios")
    //     .then(resultado => {
    //       this.listarUsuarios = resultado.data.resultado;
    //       this.IsLoading = false; // Desactiva el spinner
    //     })
    //     .catch(error => {
    //       console.error(error);
    //       this.IsLoading = false; // Desactiva el spinner en caso de error
    //     });
    // },
    asignaciones() {
      axiosFunction.get("Asignaciones/listarAsignaciones")
        .then(resultado => {
          this.listarAsignaciones = resultado.data.resultado;
          console.log("Asignaciones: ", this.listarAsignaciones);
        })
        .catch(error => {
          console.error(error);
        });
    },

  }
}
</script>

<style scoped>

.contenedor{
  display: flex
}

</style>
