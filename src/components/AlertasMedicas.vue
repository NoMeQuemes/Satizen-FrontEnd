<template>
  <div class="alertas" data-simplebar>
    <h2>Alertas Médicas</h2>
    <div class="cards-container">
      <div class="card-wrapper" v-for="(alert, index) in alerts" :key="index">
        <!-- Aplicar color dinámico a outer-card y card -->
        <div @click="asignarLlamado(alert.idLlamado)"  :class="['outer-card', alertLevelClass(alert.prioridadLlamado.toLowerCase())]">
          <div class="user-name">{{ alert.pacientes }}</div>

          <div :class="['card', alertLevelClass(alert.prioridadLlamado.toLowerCase())]">
            <div class="profile-pic"></div>
            <div class="card-content">
              <div class="card-details">
                <div>
                  <span>Personal a cargo: </span>
                  {{ alert.personals || "-"}}
                </div>
                <div>
                  <span>Dirección: </span>
                  {{ alert.direccion || "-"}}
                </div>
                <div>
                  <span>Celular:</span>
                  {{ alert.celular || "-" }}
                </div>
                <div>
                  <span>Observación:</span> <!-- Antes era diagnostico-->
                  {{ alert.observacion  || "-"}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="sinAlertas" class="sinAlertas"> No hay alertas en este momento</div>
    </div>
  </div>

  <!-- Modales -->
   <AsignarLlamadoModal v-if="modalCrearShow" :idLlamado="idLlamado" @actualizarLlamados="listarLlamados"></AsignarLlamadoModal>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import axiosFunction from '@/Functions/axios';
import * as signalR from '@microsoft/signalr';
import AsignarLlamadoModal from './Llamados/AsignarLlamadoModal.vue';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';


const alerts = ref([]);
let connection;
let modalCrearShow = ref(false);
let idLlamado = ref(0);
let sinAlertas = ref(false);

onMounted(() => {
  listarLlamados(),
  initializeSignalR()
})

function listarLlamados() {
  axiosFunction.get("Llamado/ListarLlamadosNoAsignados")
    .then(resultado => {
      alerts.value = resultado.data.resultado
      alerts.value.reverse();
      if(!alerts.value){
        sinAlertas.value = true;
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

function initializeSignalR() {
  connection = new signalR.HubConnectionBuilder()
    .withUrl('http://localhost:7298/alertaHub') // Aquí pones la URL del Hub en el backend
    .withAutomaticReconnect() // Configura la reconexión automática en caso de desconexiones
    .build();

  connection.start()
    .then(() => {
      console.log('SignalR Connected.');
      // Suscribirse al evento nuevoLlamado emitido por el servidor
      connection.on('nuevoLlamado', (alert) => {
        console.log('Nuevo llamado recibido:', alert);
        listarLlamados();
      });
    })
    .catch(err => console.error('SignalR Connection Error:', err));
}

function asignarLlamado(id) {
  modalCrearShow.value = true;
  idLlamado.value = id;
  nextTick(() => {
    const modal = new bootstrap.Modal(document.getElementById("staticBackdrop"));
    modal.show();
  })
  console.log("Id del llamado desde la vista: ", id)
}

// const alerts = ref([
//   {
//     userName: "Alex",
//     doctor: "Sanches Carlos",
//     address: "San Juan",
//     phone: "2645259424",
//     diagnosis: "Hepatitis",
//     level: "informativa",
//   },
//   {
//     userName: "Tony Stark",
//     doctor: "Pérez Juan",
//     address: "Buenos Aires",
//     phone: "2645111122",
//     diagnosis: "Anemia",
//     level: "media",
//   },
//   {
//     userName: "Fernando Muñoz",
//     doctor: "Pérez Juan",
//     address: "San Juan",
//     phone: "2645259424",
//     diagnosis: "Sida",
//     level: "baja",
//   },
// ]);

const alertLevelClass = (prioridadLlamado) => {
  switch (prioridadLlamado) {
    case "alta":
      return "alerta-alta";
    case "media":
      return "alerta-media";
    case "baja":
      return "alerta-baja";
    case "informativa":
      return "alerta-informativa";
    default:
      return "";
  }
};
</script>
<style scoped>
/* =====================CONTENEDOR PRINCIPAL====================== */
.alertas {
  padding: 30px;
  background-color: #ffffff;
  border-radius: 10px;
  max-height: 500px;
  min-height: 368px;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  width: 90%;
}

/* ======================TARJETAS DE ALERTAS======================= */
.alertas h2 {
  font-size: 22px;
  color: #333;
  margin-bottom: 15px;
}

.cards-container {
  display: flex;
  flex-direction: column;
  /* Hacer que las alertas se apilen verticalmente */
  gap: 10px;
  /* Espacio entre las tarjetas */
}

/* Mantener el resto del estilo igual */
.card-wrapper {
  position: relative;
  width: 100%;
}

.outer-card {
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .5);
  padding: 5px 0 0 0;
  overflow: hidden;
  border: none;
  margin-bottom: 20px;
  cursor: pointer;
}

.alerta-alta {
  background-color: #ff4c4c;
}

.alerta-media {
  background-color: #ffa500;
}

.alerta-baja {
  background-color: #ffe100;
}

.alerta-informativa {
  background-color: #5bc0de;
}

.user-name {
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 6px;
  margin-left: 80px;
}

.card {
  display: grid;
  grid-template-columns: 80px 1fr;
  border-radius: 8px;
  width: 100%;
  border: none;
}

.profile-pic {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #ccc;
  margin: 5px;
}

.card-content {
  background-color: #f9f9f9;
  padding: 6px;
  border-radius: 30px 0 0;
  border: none;
}

.card-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}

.card-details div {
  padding: 1px;
  border-radius: 5px;
  text-align: left;
  background-color: #f9f9f900;
  color: #555;
  margin-left: 5px;
}

.card-details div span {
  display: block;
  font-weight: bold;
  color: #333;
  font-size: 14px;
}

/* ======================MEDIAQUERY PARA MONITORES DE 20 PULGADAS PARA ABAJO======================= */

@media (max-width: 20in) {
  .alertas {
    padding: 20px;
  }

  .cards-container {
    gap: 5px;
    /* Espacio reducido para pantallas más pequeñas */
  }

  .card {
    grid-template-columns: 60px 1fr;
  }

  .profile-pic {
    width: 40px;
    height: 40px;
  }
}
</style>
