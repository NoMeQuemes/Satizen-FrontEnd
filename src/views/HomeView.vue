<template>
  <div class="container">
    <h1>Hola soy Home</h1>
    <h2>Bienvenido {{ nombreUsuario }}</h2>
    <h2>{{ exp }}</h2>


    <div class="row">
      <div class="col">
        <!-- ------------------------ Usuarios -------------------------- -->
        <h2>Pacientes</h2>
        <div class="list">
          <table class="table table-striped">
            <spinner-component
              :isLoading="IsLoading"
              :can-cancel="false"
              :is-full-page="false"
              @update:isLoading="IsLoading = $event"
            />
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre de Usuario</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="usuario in listarUsuarios" :key="usuario.idUsuario">
                <th> {{ usuario.idUsuario }} </th>
                <th> {{ usuario.nombreUsuario }} </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col">
        <!-- ------------------------ Asignaciones -------------------------- -->
        <h2>Asignaciones</h2>
      </div>
    </div>

    <div class="botones">
      <button class="btn btn-primary" @click="logout()">Cerrar Sesión</button>
      <button class="btn btn-primary" @click="asignaciones()">Mostrar Asignaciones</button>
      <button class="btn btn-primary" @click="info()">Mostrar Info</button>
    </div>
  </div>

  <session-warning-modal></session-warning-modal>

</template>

<script>
import Spinner from '@/components/Spinner.vue';
import axiosFunction from '@/Functions/axios';
import SessionWarningModal from '@/components/SessionWarningModal.vue';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logout from '@/Functions/logout';

export default {
  name: 'HomeView',
  data() {
    return {
      listarUsuarios: [],
      listarAsignaciones: [],
      IsLoading: true,
      nombreUsuario: "",
      exp: 0,
      id: 0
    }
  },
  components: {
    'spinner-component': Spinner,
    'session-warning-modal': SessionWarningModal
  },
  mounted() {
    this.usuarios(),
    this.info()
  },
  methods: {
    usuarios() {
      this.IsLoading = true;  // Activa el spinner
      axiosFunction.get("Usuarios/ListarUsuarios")
        .then(resultado => {
          this.listarUsuarios = resultado.data.resultado;
          this.IsLoading = false; // Desactiva el spinner
        })
        .catch(error => {
          console.error(error);
          this.IsLoading = false; // Desactiva el spinner en caso de error
        });
    },
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
    info(){
      const infoUser = JSON.parse(localStorage.getItem('dataUser'));
      this.nombreUsuario = infoUser.nombreUsuario;

      const expirationTime = infoUser.expToken * 1000;
      const warningTime = expirationTime - 4 * 60 * 1000;
      const currentTime = Date.now();

      if(currentTime < warningTime){
        setTimeout(() => {
           const modal = new bootstrap.Modal(document.getElementById('staticBackdrop'))
           modal.show();
        }, warningTime - currentTime);
      } else if( currentTime >= warningTime && currentTime < expirationTime ){
        const modal = new bootstrap.Modal(document.getElementById('staticBackdrop'))
        modal.show();
      }

      if(currentTime > expirationTime){
        this.exp = "Token Vencido"
      } else if( currentTime < expirationTime ){
        this.exp = "Token Valido"
      }
    },

    logout() {
      logout()
    }

  }
}
</script>

<style>
h1 {
  text-align: center;
  margin-top: 10px;
}

.col {
  border: 1px solid black;
  border-radius: 20px;
  margin: 20px;
}

.btn {
  margin: 5px;
}
</style>
