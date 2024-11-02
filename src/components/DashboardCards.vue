<template>
  <div class="dashboard-container">
    <div class="dashboard-cards">
      <div class="card" v-for="card in cards" :key="card.title">
        <div class="card-info">
          <h3>{{ card.title }}</h3>
          <p>{{ card.count }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import axiosFunction from '@/Functions/axios';

let cards = reactive([
  {
    title: 'Instituciones',
    count: 0
  },
  {
    title: 'Personal',
    count: 0
  },
  {
    title: 'Pacientes',
    count: 0
  },
  {
    title: 'Usuarios',
    count: 0
  }
])
let cantidadInstituciones = ref(0);
let cantidadPersonal = ref(0);
let cantidadPacientes = ref(0);
let cantidadUsuarios = ref(0);

onMounted(() => {
  llenarCartas()
})

function llenarCartas() {
  axiosFunction.get("Institucion/ListarInstituciones")
    .then(respuesta => {
      cantidadInstituciones.value = respuesta.data.resultado;
      cards[0].count = cantidadInstituciones.value.length;
    })
    .catch((error) => {
      console.log(error);
    })

  axiosFunction.get("Personal/ListarPersonal")
    .then(respuesta => {
      cantidadPersonal.value = respuesta.data.resultado;
      cards[1].count = cantidadPersonal.value.length;
    })
    .catch((error) => {
      console.log(error);
    })

  axiosFunction.get("Pacientes/ListarPacientes")
    .then(respuesta => {
      cantidadPacientes.value = respuesta.data.resultado;
      cards[2].count = cantidadPacientes.value.length;
    })
    .catch((error) => {
      console.log(error);
    })

  axiosFunction.get("Usuarios/ListarUsuarios")
    .then(respuesta => {
      cantidadUsuarios.value = respuesta.data.resultado;
      cards[3].count = cantidadUsuarios.value.length;
    })
    .catch((error) => {
      console.log(error);
    })
}

// function listarPersonal() {
//   axiosFunction.get("Personal/ListarPersonal")
//     .then(resultado => {
//       cantidadPersonal.value = resultado.data.resultado
//       cards[1].count = cantidadPersonal.value.length;
//     })
//     .catch((error) => {
//       console.log(error)
//     })
// }
// function listarPacientes() {
//   axiosFunction.get("Pacientes/ListarPacientes")
//     .then(resultado => {
//       cantidadPacientes.value = resultado.data.resultado
//       cards[2].count = cantidadPacientes.value.length;
//     })
//     .catch((error) => {
//       console.log(error)
//     })
// }

</script>

<style scoped>
.dashboard-container {
  display: flex;
  justify-content: center;
  padding-top: 20px;
  background-color: #e0e0e000;
  border-radius: 10px;
  margin-bottom: 5px;
  width: 100%;
  /* Asegurarse de que ocupe el 100% del contenedor */
}

.dashboard-cards {
  display: flex;
  gap: 20px;
  padding: 20px;
  background-color: #f9f9f911;
  flex-wrap: wrap;
  /* Permite que las tarjetas se ajusten en múltiples filas si es necesario */
  justify-content: center;
  /* Centra las tarjetas dentro del contenedor */
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  width: 150px;
  cursor: pointer;
  text-align: center;
  transition: transform 0.2s ease-in-out;
  flex: 1 1 150px;
  /* Ajuste flexible para que las tarjetas se comporten mejor en distintas resoluciones */
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
}

.card-info h3 {
  font-size: 16px;
  color: #333;
}

.card-info p {
  font-size: 24px;
  color: #666;
  font-weight: bold;
}
</style>
