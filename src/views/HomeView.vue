<template>
  <div class="container">
    <h1>Hola soy Home</h1>


    <div class="row">
      <div class="col">
        <!-- ------------------------ Pacientes -------------------------- -->
        <h2>Pacientes</h2>
        <div class="list">
          <table class="table table-striped">
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
      <button class="btn btn-primary" @click="jwt()">Mostrar info Usuario</button>
    </div>
  </div>
</template>

<script>

import axiosFunction from '@/Functions/axios';
import decodeJwt from '@/Functions/decodeJwt';

export default {
  name: 'HomeView',
  data() {
    return {
      listarUsuarios: [],
      listarAsignaciones: []
    }
  },
  mounted: function () {
    this.usuarios()
    // this.asignaciones()
  },
  methods: {

    usuarios() {
      axiosFunction.get("Usuarios/ListarUsuarios")
        .then(resultado => {
          this.listarUsuarios = resultado.data.resultado
        })
    },
    asignaciones(){
      // const token = localStorage.getItem('token');
      axiosFunction.get("Asignaciones/listarAsignaciones")
        .then(resultado => {
          this.listarAsignaciones = resultado.data.resultado
          console.log("Asignaciones: ",this.listarAsignaciones);
        })
    },

    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      this.$router.push({ name: 'login' });
    },

    jwt() {
      decodeJwt()
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

.btn{
  margin: 5px;
}
</style>
